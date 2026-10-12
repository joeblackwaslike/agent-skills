---
title: Lifecycle Callbacks
description: Observe AI SDK lifecycle events in generateText, streamText, embed, embedMany, rerank, and experimental_decide calls
url: "https://ai-sdk.dev/docs/ai-sdk-core/lifecycle-callbacks"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/ai-sdk-core/lifecycle-callbacks.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "df2ef52f7f4d788cd14ba32696bee4a979d22dba722a8711c193871fd67b1d77"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Event callbacks let you run your own code at important points in an AI SDK call.
You can attach them directly to `generateText`, `streamText`, `embed`, `embedMany`, `rerank`, and `experimental_decide` calls to observe what happened, record usage, debug multi-step generations, and monitor tool execution.

They are especially useful when you want application-specific logic close to the call site:

- Log which model, prompt shape, and settings were used for a request.
- Record token usage, latency, finish reasons, and warnings for analytics or billing.
- Understand how a multi-step tool call moved from model response to tool execution to final answer.
- Track tool inputs, tool outputs, execution time, and errors.
- Attach your own request, user, tenant, or workflow identifiers through `runtimeContext` and `toolsContext`.

For automatic OpenTelemetry instrumentation across your application, use [Telemetry](/docs/ai-sdk-core/telemetry).
Use event callbacks when you want to run custom code for a specific AI SDK call.

## Basic Usage

Pass callbacks as options to the AI SDK function you are calling:

```tsx {8-18}
import { generateText } from 'ai';

const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'What is the weather in San Francisco?',

  onStart({ callId, modelId }) {
    console.log('Generation started', { callId, modelId });
  },

  onEnd({ callId, usage, finishReason }) {
    console.log('Generation finished', {
      callId,
      finishReason,
      totalTokens: usage.totalTokens,
    });
  },
});
```

Callbacks can be synchronous or asynchronous. If a callback throws, the error is caught internally and the AI SDK call continues.
Because callbacks run as part of the lifecycle, keep them fast or enqueue expensive work in a background system.

## Use Cases

### Request Logging

Use `onStart` and `onEnd` to record one application log for the beginning and end of a call.
The `callId` is available across lifecycle events, so you can correlate logs from the same request.

```tsx {8-23}
import { generateText } from 'ai';

const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Write a short product description for a camping mug.',

  onStart({ callId, provider, modelId }) {
    logger.info('ai.request.started', {
      callId,
      provider,
      modelId,
    });
  },

  onEnd({ callId, finishReason, usage, warnings }) {
    logger.info('ai.request.finished', {
      callId,
      finishReason,
      usage,
      warningCount: warnings?.length ?? 0,
    });
  },
});
```

This pattern works well for audit logs, internal dashboards, and tracking usage for a particular feature.

### Measuring Model Performance

`onLanguageModelCallEnd` runs after a provider response has been normalized and parsed.
For `streamText`, the event also includes streaming-specific timing data such as time to first output and gaps between output chunks.

```tsx {8-19}
import { streamText } from 'ai';

const result = streamText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Explain partial prerendering in two paragraphs.',

  onLanguageModelCallEnd({
    callId,
    modelId,
    usage,
    performance,
    providerMetadata,
  }) {
    metrics.histogram('ai.model.response_time_ms', performance.responseTimeMs, {
      callId,
      modelId,
    });

    metrics.gauge('ai.model.tokens_per_second', {
      output: performance.outputTokensPerSecond,
      total: performance.effectiveTotalTokensPerSecond,
      tokens: usage.totalTokens,
    });

    logger.info('ai.model.provider_metadata', {
      callId,
      providerMetadata,
    });
  },
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
```

Use model-call events when you want to measure provider work specifically.
Use step events when you want timing that includes SDK-managed work such as local tool execution.

### Debugging Multi-Step Tool Calls

When you use tools with `generateText` or `streamText`, a single user request can involve multiple model calls.
Each model call is a step. The model may call a tool in one step, receive the tool result, and then produce a final answer in the next step.

```tsx {17-31}
import { generateText, isStepCount, tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  stopWhen: isStepCount(5),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => getWeather(location),
    }),
  },

  onStepStart({ stepNumber, messages, steps }) {
    console.log(`Step ${stepNumber} started`, {
      messageCount: messages.length,
      previousSteps: steps.length,
    });
  },

  onStepEnd({ stepNumber, finishReason, toolCalls, usage, performance }) {
    console.log(`Step ${stepNumber} finished`, {
      finishReason,
      toolCalls: toolCalls.map(toolCall => toolCall.toolName),
      totalTokens: usage.totalTokens,
      stepTimeMs: performance.stepTimeMs,
    });
  },
});
```

This helps answer questions such as:

- Did the model call a tool or answer directly?
- How many steps did the request take?
- Which step used the most tokens?
- Did time go to the model response or to local tool execution?

### Monitoring Tool Execution

Tool execution callbacks run around the tool's `execute` function.
Use them to record tool usage, latency, successful results, and tool errors.

```tsx {19-36}
import { generateText, tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Find flights from SFO to JFK tomorrow morning.',
  tools: {
    searchFlights: tool({
      description: 'Search available flights',
      inputSchema: z.object({
        origin: z.string(),
        destination: z.string(),
      }),
      execute: async input => searchFlights(input),
    }),
  },

  onToolExecutionStart({ callId, toolCall }) {
    logger.info('ai.tool.started', {
      callId,
      toolCallId: toolCall.toolCallId,
      toolName: toolCall.toolName,
      input: toolCall.input,
    });
  },

  onToolExecutionEnd({ callId, toolCall, toolExecutionMs, toolOutput }) {
    logger.info('ai.tool.finished', {
      callId,
      toolCallId: toolCall.toolCallId,
      toolName: toolCall.toolName,
      durationMs: toolExecutionMs,
      success: toolOutput.type === 'tool-result',
    });
  },
});
```

`toolOutput` is a discriminated union. When `toolOutput.type` is `'tool-result'`, the output is available on `toolOutput.output`. When it is `'tool-error'`, the error is available on `toolOutput.error`.

### Observing Embeddings and Reranking

Embedding and reranking callbacks are simpler: they expose `onStart` and `onEnd` around the operation.
This is useful for retrieval pipelines where you want to understand how often you are embedding, how many values you embed, and how reranking changes result sets.

```tsx {10-24,32-37}
import { embedMany, rerank } from 'ai';
import { cohere } from '@ai-sdk/cohere';

const values = ['sunny day at the beach', 'rainy afternoon in the city'];

const { embeddings } = await embedMany({
  model: 'openai/text-embedding-3-small',
  values,

  onStart({ callId, operationId, modelId, value }) {
    logger.info('ai.embedding.started', {
      callId,
      operationId,
      modelId,
      valueCount: Array.isArray(value) ? value.length : 1,
    });
  },

  onEnd({ callId, usage }) {
    logger.info('ai.embedding.finished', {
      callId,
      tokens: usage.tokens,
    });
  },
});

const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: values,
  query: 'talk about rain',

  onEnd({ callId, ranking }) {
    logger.info('ai.rerank.finished', {
      callId,
      topResult: ranking[0],
    });
  },
});
```

## Generation Lifecycle

`generateText` and `streamText` expose the richest lifecycle because they can involve prompts, model calls, tool calls, and multiple steps.

A typical single-step generation runs in this order:

1. `onStart`
2. `onStepStart`
3. `onLanguageModelCallStart`
4. `onLanguageModelCallEnd`
5. `onStepEnd`
6. `onEnd`

A multi-step generation with local tool execution usually runs like this:

1. `onStart`
2. `onStepStart`
3. `onLanguageModelCallStart`
4. `onLanguageModelCallEnd`
5. `onToolExecutionStart`
6. `onToolExecutionEnd`
7. `onStepEnd`
8. Repeat step callbacks until the stop condition is met
9. `onEnd`

`onStepStart` and `onStepEnd` describe the full step.
`onLanguageModelCallStart` and `onLanguageModelCallEnd` describe only the model call inside that step.
This distinction matters when the step includes local tool execution: the step duration can be longer than the model response duration.

## Runtime and Tool Context

Generation and step lifecycle callbacks receive the full `runtimeContext` and
`toolsContext` values that flow through the call. Tool-execution callbacks receive
the scoped `toolContext` for the tool being executed. This makes callbacks useful
for attaching application context without changing prompts or tool inputs.

```tsx {8-24,26-39}
import { generateText, tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Check the order status.',
  runtimeContext: {
    requestId: 'req_123',
    tenantId: 'tenant_abc',
  },
  tools: {
    getOrderStatus: tool({
      inputSchema: z.object({ orderId: z.string() }),
      contextSchema: z.object({ region: z.string() }),
      execute: async ({ orderId }, { context }) =>
        getOrderStatus(orderId, context.region),
    }),
  },
  toolsContext: {
    getOrderStatus: {
      region: 'us-east-1',
    },
  },

  onStart({ callId, runtimeContext }) {
    logger.info('ai.request.started', {
      callId,
      requestId: runtimeContext.requestId,
      tenantId: runtimeContext.tenantId,
    });
  },

  onToolExecutionStart({ toolCall, toolContext }) {
    logger.info('ai.tool.started', {
      toolName: toolCall.toolName,
      region: toolContext.region,
    });
  },
});
```

Telemetry integrations can filter `runtimeContext` and `toolsContext` before
exporting them. Generation and step callbacks receive the full context
objects; tool-execution callbacks receive scoped tool context. Be careful not
to log secrets or sensitive user data from callbacks.

## Available Callbacks

### `generateText` and `streamText`

- `onStart` (`(event: GenerateTextStartEvent) => void | Promise<void>`): Called once when the generation operation begins, before any model calls.
- `onStepStart` (`(event: GenerateTextStepStartEvent) => void | Promise<void>`): Called before each generation step. Each step represents one model call and any SDK-managed work around it.
- `onLanguageModelCallStart` (`(event: LanguageModelCallStartEvent) => void | Promise<void>`): Called immediately before the provider model call begins. Scoped to model work only.
- `onLanguageModelCallEnd` (`(event: LanguageModelCallEndEvent) => void | Promise<void>`): Called after the model response has been normalized and parsed, before local tool execution begins.
- `onToolExecutionStart` (`(event: ToolExecutionStartEvent) => void | Promise<void>`): Called before a local tool's \`execute\` function runs.
- `onToolExecutionEnd` (`(event: ToolExecutionEndEvent) => void | Promise<void>`): Called after a local tool's \`execute\` function completes or errors.
- `onStepEnd` (`(event: GenerateTextStepEndEvent) => void | Promise<void>`): Called after each generation step completes. Receives the step result, including usage and performance.
- `onEnd` (`(event: GenerateTextEndEvent) => void | Promise<void>`): Called once when the full generation completes. Receives final output and aggregated usage across all steps.

`onStepFinish`

is deprecated. Use

`onStepEnd`

for new code.

### `embed` and `embedMany`

- `onStart` (`(event: EmbedStartEvent) => void | Promise<void>`): Called when the embedding operation begins, before the embedding model is called.
- `onEnd` (`(event: EmbedEndEvent) => void | Promise<void>`): Called when the embedding operation completes, after the embedding model returns.

### `rerank`

- `onStart` (`(event: RerankStartEvent) => void | Promise<void>`): Called when the reranking operation begins, before the reranking model is called.
- `onEnd` (`(event: RerankEndEvent) => void | Promise<void>`): Called when the reranking operation completes, after the reranking model returns.

### `experimental_decide`

- `onStart` (`(event: Experimental_DecideStartEvent) => void | Promise<void>`): Called when the decision operation begins, before the decision model is called.
- `onEnd` (`(event: Experimental_DecideEndEvent) => void | Promise<void>`): Called when the decision operation completes successfully.

## Event Data Reference

The exact event data depends on the callback. The tables below summarize the fields you will most commonly use.

### Text Generation Events

#### onStart

Called once before any model calls are made.

- `callId` (`string`): Unique identifier for this generation call.
- `operationId` (`string`): Operation type, such as 'ai.generateText' or 'ai.streamText'.
- `provider` (`string`): Provider identifier for the resolved model.
- `modelId` (`string`): Model identifier for the resolved model.
- `messages` (`Array<ModelMessage>`): Messages for this generation.
- `instructions` (`Instructions | undefined`): Instructions provided to the model.
- `tools` (`ToolSet | undefined`): Tools available for this generation.
- `toolChoice` (`ToolChoice | undefined`): Tool choice strategy for this generation.
- `activeTools` (`ActiveTools<TOOLS>`): Limits which tools are available for the model to call.
- `maxRetries` (`number`): Maximum number of retries for failed requests.
- `timeout` (`TimeoutConfiguration | undefined`): Timeout configuration for the generation.
- `headers` (`Record<string, string | undefined> | undefined`): Additional HTTP headers sent with the request.
- `providerOptions` (`ProviderOptions | undefined`): Provider-specific options.
- `runtimeContext` (`CONTEXT`): User-defined runtime context for the generation.
- `toolsContext` (`InferToolSetContext<TOOLS>`): Per-tool context map passed via \`toolsContext\`.

#### onStepStart

Called before each step begins.

- `callId` (`string`): Unique identifier for this generation call.
- `stepNumber` (`number`): Zero-based index of the current step.
- `provider` (`string`): Provider identifier for the resolved model.
- `modelId` (`string`): Model identifier for the resolved model.
- `messages` (`Array<ModelMessage>`): Messages that will be sent to the model for this step.
- `tools` (`ToolSet | undefined`): Tools available for this generation.
- `activeTools` (`ActiveTools<TOOLS>`): Limits which tools are available for this step.
- `steps` (`ReadonlyArray<StepResult>`): Results from previous steps. Empty for the first step.
- `providerOptions` (`ProviderOptions | undefined`): Provider-specific options for this step.
- `runtimeContext` (`CONTEXT`): Runtime context for this step. May be updated from \`prepareStep\` between steps.
- `toolsContext` (`InferToolSetContext<TOOLS>`): Per-tool context map for this step. May be updated from \`prepareStep\` between steps.

#### onLanguageModelCallStart

Called immediately before the provider model call begins.

- `callId` (`string`): Unique identifier for this generation call.
- `provider` (`string`): Provider identifier for this model call.
- `modelId` (`string`): Model identifier for this model call.
- `instructions` (`Instructions | undefined`): Instructions that will be sent to the model.
- `messages` (`Array<ModelMessage>`): Messages that will be sent to the model.
- `tools` (`ReadonlyArray<Record<string, unknown>> | undefined`): Prepared tool definitions for the model call, if any.

#### onLanguageModelCallEnd

Called after the provider response has been normalized and parsed, before local tool execution begins.

- `callId` (`string`): Unique identifier for this generation call.
- `provider` (`string`): Provider identifier for this model call.
- `modelId` (`string`): Provider-returned model identifier for this model call.
- `finishReason` (`FinishReason`): Unified reason why the model call finished.
- `usage` (`LanguageModelUsage`): Token usage reported by the model call.
- `content` (`ReadonlyArray<ContentPart<TOOLS>>`): Content parts produced by the model call.
- `responseId` (`string`): Provider-returned response ID for this model call.
- `providerMetadata` (`ProviderMetadata | undefined`): Provider-specific metadata for this model call, when returned by the provider.
- `performance` (`LanguageModelCallPerformance`): Timing and throughput metrics, including response time, tokens per second, and streaming timing when available.

#### onToolExecutionStart

Called before a local tool's `execute` function runs.

- `callId` (`string`): Unique identifier for this generation call.
- `toolCall` (`TypedToolCall`): The tool call that is about to execute, including \`toolCallId\`, \`toolName\`, and \`input\`.
- `messages` (`Array<ModelMessage>`): Messages sent to the model to initiate the response that contained the tool call. Does not include the system prompt or the assistant response that contained the tool call.
- `toolContext` (`InferToolContext<TOOLS[toolName]>`): Tool-specific context object for the tool call.

#### onToolExecutionEnd

Called after a local tool's `execute` function completes or errors.

- `callId` (`string`): Unique identifier for this generation call.
- `toolCall` (`TypedToolCall`): The tool call that completed.
- `toolExecutionMs` (`number`): Execution time of the tool call in milliseconds.
- `messages` (`Array<ModelMessage>`): Messages sent to the model to initiate the response that contained the tool call. Does not include the system prompt or the assistant response that contained the tool call.
- `toolContext` (`InferToolContext<TOOLS[toolName]>`): Tool-specific context object for the completed tool call.
- `toolOutput` (`{ type: 'tool-result'; output: unknown } | { type: 'tool-error'; error: unknown }`): Discriminated union representing either a successful tool result or a tool error.

#### onStepEnd

Called after each step completes. The event is the full `StepResult` for that step.

- `callId` (`string`): Unique identifier for this generation call.
- `stepNumber` (`number`): Zero-based index of the completed step.
- `model` (`{ provider: string; modelId: string }`): Information about the model that produced this step.
- `content` (`Array<ContentPart>`): Content generated in this step.
- `text` (`string`): Text generated in this step.
- `toolCalls` (`Array<TypedToolCall>`): Tool calls made in this step.
- `toolResults` (`Array<TypedToolResult>`): Tool results produced in this step.
- `finishReason` (`FinishReason`): Unified reason why the step finished.
- `usage` (`LanguageModelUsage`): Token usage for this step.
- `performance` (`StepResultPerformance`): Timing and throughput metrics for this step, including model response time and tool execution time.
- `warnings` (`CallWarning[] | undefined`): Warnings from the model provider.
- `request` (`LanguageModelRequestMetadata`): Request metadata, including request body and request messages when included.
- `response` (`LanguageModelResponseMetadata`): Response metadata, including response headers, body, and messages when included.
- `runtimeContext` (`CONTEXT`): Runtime context for this step.
- `toolsContext` (`InferToolSetContext<TOOLS>`): Per-tool context map for this step.

#### onEnd

Called once when the full generation completes.

- `callId` (`string`): Unique identifier for this generation call.
- `steps` (`Array<StepResult>`): Results from all steps in the generation.
- `finalStep` (`StepResult`): The final step. This is a shortcut for \`steps.at(-1)\`.
- `responseMessages` (`Array<ResponseMessage>`): Response messages generated during the call.
- `content` (`Array<ContentPart>`): Content generated across all steps.
- `text` (`string`): Text generated in the final step.
- `toolCalls` (`Array<TypedToolCall>`): Tool calls made across all steps.
- `toolResults` (`Array<TypedToolResult>`): Tool results produced across all steps.
- `finishReason` (`FinishReason`): Unified reason why the final step finished.
- `usage` (`LanguageModelUsage`): Aggregated token usage across all steps.
- `warnings` (`CallWarning[] | undefined`): Warnings from the model provider across all steps.

### Embedding Events

`embed` and `embedMany` share the same event interfaces.
Use `operationId` to distinguish `'ai.embed'` from `'ai.embedMany'`.
For `embed`, `value` is a single string. For `embedMany`, `value` is an array of strings.

#### onStart

- `callId` (`string`): Unique identifier for this embedding call.
- `operationId` (`string`): Operation type, such as 'ai.embed' or 'ai.embedMany'.
- `provider` (`string`): Provider identifier for the embedding model.
- `modelId` (`string`): Embedding model identifier.
- `value` (`string | Array<string>`): Value or values being embedded.
- `maxRetries` (`number`): Maximum number of retries for failed requests.
- `headers` (`Record<string, string | undefined> | undefined`): Additional HTTP headers sent with the request.
- `providerOptions` (`ProviderOptions | undefined`): Provider-specific options.

#### onEnd

- `callId` (`string`): Unique identifier for this embedding call.
- `operationId` (`string`): Operation type, such as 'ai.embed' or 'ai.embedMany'.
- `provider` (`string`): Provider identifier for the embedding model.
- `modelId` (`string`): Embedding model identifier.
- `value` (`string | Array<string>`): Value or values that were embedded.
- `embedding` (`Embedding | Array<Embedding>`): Resulting embedding or embeddings.
- `usage` (`EmbeddingModelUsage`): Token usage for the embedding operation.
- `warnings` (`Array<Warning>`): Warnings from the embedding model.
- `providerMetadata` (`ProviderMetadata | undefined`): Optional provider-specific metadata.
- `response` (`{ headers?: Record<string, string>; body?: unknown } | Array<{ headers?: Record<string, string>; body?: unknown } | undefined> | undefined`): Response data. For \`embedMany\`, this can be one response per chunk.

### Rerank Events

#### onStart

- `callId` (`string`): Unique identifier for this rerank call.
- `operationId` (`string`): Operation type, 'ai.rerank'.
- `provider` (`string`): Provider identifier for the reranking model.
- `modelId` (`string`): Reranking model identifier.
- `documents` (`Array<JSONObject | string>`): Documents being reranked.
- `query` (`string`): Query to rerank the documents against.
- `topN` (`number | undefined`): Number of top documents to return.
- `maxRetries` (`number`): Maximum number of retries for failed requests.
- `headers` (`Record<string, string | undefined> | undefined`): Additional HTTP headers sent with the request.
- `providerOptions` (`ProviderOptions | undefined`): Provider-specific options.

#### onEnd

- `callId` (`string`): Unique identifier for this rerank call.
- `operationId` (`string`): Operation type, 'ai.rerank'.
- `provider` (`string`): Provider identifier for the reranking model.
- `modelId` (`string`): Reranking model identifier.
- `documents` (`Array<JSONObject | string>`): Documents that were reranked.
- `query` (`string`): Query the documents were reranked against.
- `ranking` (`Array<{ originalIndex: number; score: number; document: JSONObject | string }>`): Reranked results sorted by relevance score in descending order.
- `warnings` (`Array<Warning>`): Warnings from the reranking model.
- `providerMetadata` (`ProviderMetadata | undefined`): Optional provider-specific metadata.
- `response` (`{ id?: string; timestamp: Date; modelId: string; headers?: Record<string, string>; body?: unknown }`): Response data including headers and body.

### Decision Events

Decision callbacks are experimental. Their exported types are
`Experimental_DecideStartEvent` and `Experimental_DecideEndEvent`.

#### onStart

- `callId` (`string`): Unique identifier for this decision call.
- `operationId` (`'ai.decide'`): Decision operation identifier.
- `runtimeContext` (`RUNTIME_CONTEXT`): Full user-defined runtime context.
- `provider` (`string`): Provider identifier for the decision model.
- `modelId` (`string`): Decision model identifier.
- `state` (`string | object | array`): Shared state used to make decisions.
- `questions` (`Readonly<Record<string, Experimental_DecisionQuestion>>`): Questions to decide against the shared state.
- `maxRetries` (`number`): Maximum number of retries for the model call.
- `headers` (`Record<string, string> | undefined`): Additional HTTP headers sent with the request.
- `providerOptions` (`ProviderOptions`): Provider-specific options.

#### onEnd

Includes every `onStart` field plus:

- `answers` (`Record<string, Experimental_DecisionAnswer>`): Exactly one typed answer per question ID.
- `usage` (`{ inputTokens: number | undefined; outputTokens: number | undefined; totalTokens: number | undefined }`): Token usage for the decision operation.
- `warnings` (`Array<Warning>`): Warnings from the decision model.
- `rounding` (`{ probabilityDecimals?: number; scoreDecimals?: number } | undefined`): Provider-declared decimal precision for probabilities and scores.
- `providerMetadata` (`ProviderMetadata | undefined`): Optional provider-specific metadata.
- `response` (`{ id?: string; timestamp: Date; modelId: string; headers?: Record<string, string>; body?: unknown }`): Response metadata including the resolved model and timestamp.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)