---
title: ToolLoopAgent
description: API Reference for the ToolLoopAgent class.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "39ff5fbe5ec6cdbac7494a12333732098f605bee2e02a37f44f17589d15227de"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Creates a reusable AI agent capable of generating text, streaming responses, and using tools over multiple steps (a reasoning-and-acting loop). `ToolLoopAgent` is ideal for building autonomous, multi-step agents that can take actions, call tools, and reason over the results until a stop condition is reached.

Unlike single-step calls like `generateText()`, an agent can iteratively invoke tools, collect tool results, and decide next actions until completion or user approval is required.

```ts
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  instructions: 'You are a helpful assistant.',
  tools: {
    weather: weatherTool,
    calculator: calculatorTool,
  },
});

const result = await agent.generate({
  prompt: 'What is the weather in NYC?',
});

console.log(result.text);
```

For agents, `runtimeContext` is the shared runtime state that flows through the
loop. For guidance on `runtimeContext`, `toolsContext`, tool `context`, and
sensitive context filtering, see [Runtime and Tool
Context](/docs/ai-sdk-core/runtime-and-tool-context).
Pass `experimental_sandbox` to `generate()` or `stream()` when tools need access to a command
or code execution environment.

To see `ToolLoopAgent` in action, check out [these examples](#examples).

## Import

```
import { ToolLoopAgent } from "ai"
```

## Constructor

### Parameters

- `model` (`LanguageModel`): The language model instance to use (e.g., from a provider).
- `instructions?` (`Instructions`): Instructions for the agent, usually used for system prompt/context.
- `allowSystemInMessages?` (`boolean`): Whether \`role: "system"\` messages are allowed in the \`prompt\` or \`messages\` fields. When unset, system messages are rejected because they can create a prompt injection attack risk. Ideally, use the \`instructions\` option instead. Set to \`true\` to allow system messages, or \`false\` to explicitly reject them.
- `tools?` (`Record<string, Tool>`): A set of tools the agent can call. Keys are tool names. Tools require the underlying model to support tool calling.
- `toolChoice?` (`ToolChoice`): Tool call selection strategy. Options: 'auto' | 'none' | 'required' | \{ type: 'tool', toolName: string }. Default: 'auto'.
- `stopWhen?` (`StopCondition | StopCondition[]`): Condition(s) for ending the agent loop. Default: isStepCount(20). Use \`isLoopFinished()\` to let the agent run until all tool calls have completed, but beware of potential runaway loops. See https\://ai-sdk.dev/v7/docs/reference/ai-sdk-core/loop-finished#isloopfinished.
- `activeTools?` (`ActiveTools<TOOLS>`): Limits the tools that are available for the model to call without changing the tool call and result types in the result. All tools are active by default. Tool names are restricted to the string keys of the tool set.
- `toolOrder?` (`ToolOrder<TOOLS>`): Controls the order in which tools are sent to the provider. The list can be partial. Tools not listed in \`toolOrder\` are sent after the listed tools, sorted alphabetically. Tool names are restricted to the string keys of the tool set.
- `toolApproval?` (`ToolApprovalConfiguration<TOOLS, RUNTIME_CONTEXT>`): Approval configuration for the agent. Pass a \`GenericToolApprovalFunction\` to handle all tool calls in one callback with \`toolCall\`, \`tools\`, \`toolsContext\`, \`messages\`, and \`runtimeContext\`, or pass a per-tool object where each key can be a status (\`'not-applicable'\`, \`'approved'\`, \`'denied'\`, or \`'user-approval'\`), an object form such as \`\{ type: 'denied', reason: 'blocked by policy' }\`, or a \`SingleToolApprovalFunction\` that receives the tool input and options \`toolCallId\`, \`messages\`, \`toolContext\`, and \`runtimeContext\` (same shape as tool execution options without \`abortSignal\`, with \`context\` renamed to \`toolContext\`). The \`RUNTIME\_CONTEXT\` type parameter matches the agent's \`runtimeContext\`. A \`GenericToolApprovalFunction\` or \`SingleToolApprovalFunction\` may return \`undefined\` for the same effect as \`'not-applicable'\`. \`'not-applicable'\` is the default execution path and runs the tool without approval metadata. Use \`'approved'\`, \`'denied'\`, or their object forms when you want explicit automatic approval request/response parts in the output. Object statuses can include a \`reason\`: automatic approvals and denials forward it to the approval response, while manual user approvals forward it to the approval request for the human approver. This setting takes precedence over a tool's \`needsApproval\` default.
- `experimental_toolCallers?` (`Experimental_ToolCallers<TOOLS>`): Configures which caller tools may invoke each tool. Pass an object keyed by callee tool name whose values list caller-capable tool names. Include \`DIRECT\_TOOL\_CALL\` from \`@ai-sdk/code-mode\` to keep a configured tool directly callable by the model. Local-only callees are hidden from direct model calls and bound to their local caller for each agent step. Provider caller names are translated to provider-native allowed-caller options.
- `output?` (`Output`): Optional structured output specification, for parsing responses into typesafe data.
- `prepareStep?` (`PrepareStepFunction`): Optional function to mutate step settings or inject state for each agent step, including per-step model call settings such as temperature, maxOutputTokens, sampling controls, penalties, stop sequences, seed, and reasoning. Model call setting overrides apply only to the current step.
- `include?` (`{ requestBody?: boolean; requestMessages?: boolean; responseBody?: boolean; rawChunks?: boolean }`): Settings for controlling what data is included in step results. requestBody, requestMessages, and responseBody apply to generate(); requestBody, requestMessages, and rawChunks apply to stream().
- `repairToolCall?` (`ToolCallRepairFunction`): Optional callback to attempt automatic recovery when a tool call cannot be parsed.
- `experimental_refineToolInput?` (`ToolInputRefinement<TOOLS>`): Optional mapping of tool names to functions that refine parsed tool inputs. Each function receives the typed input for its tool and must return the same input type shape. The refined input is used for tool execution, output parts, lifecycle callbacks, and telemetry in both \`generate()\` and \`stream()\`.
- `onStart?` (`GenerateTextOnStartCallback`): Callback that is called when the agent operation begins, before any LLM calls are made. Useful for logging, analytics, or initializing state. If also specified in \`generate()\` or \`stream()\`, both callbacks are called (constructor first).
  - `GenerateTextStartEvent`
    - `provider` (`string`): The provider identifier (e.g., "openai", "anthropic").
    - `modelId` (`string`): The specific model identifier (e.g., "gpt-6-astra").
    - `instructions` (`Instructions | undefined`): The instructions provided to the model.
    - `messages` (`Array<ModelMessage>`): The messages for this generation.
    - `tools` (`TOOLS | undefined`): The tools available for this generation.
    - `toolChoice` (`ToolChoice<TOOLS> | undefined`): The tool choice strategy for this generation.
    - `activeTools` (`ActiveTools<TOOLS>`): Limits which tools are available for the model to call.
    - `toolOrder` (`ToolOrder<TOOLS>`): Controls the order in which tools are sent to the provider.
    - `maxOutputTokens` (`number | undefined`): Maximum number of tokens to generate.
    - `temperature` (`number | undefined`): Sampling temperature for generation.
    - `topP` (`number | undefined`): Top-p (nucleus) sampling parameter.
    - `topK` (`number | undefined`): Top-k sampling parameter.
    - `presencePenalty` (`number | undefined`): Presence penalty for generation.
    - `frequencyPenalty` (`number | undefined`): Frequency penalty for generation.
    - `stopSequences` (`string[] | undefined`): Sequences that will stop generation.
    - `seed` (`number | undefined`): Random seed for reproducible generation.
    - `maxRetries` (`number`): Maximum number of retries for failed requests.
    - `timeout` (`number | { totalMs?: number; stepMs?: number; firstChunkMs?: number; chunkMs?: number } | undefined`): Timeout configuration for the generation. firstChunkMs and chunkMs are only enforced by stream().
    - `headers` (`Record<string, string | undefined> | undefined`): Additional HTTP headers sent with the request.
    - `providerOptions` (`ProviderOptions | undefined`): Additional provider-specific options.
    - `output` (`OUTPUT | undefined`): The output specification for structured outputs, if configured.
    - `abortSignal` (`AbortSignal | undefined`): Abort signal for cancelling the operation.
    - `include` (`{ requestBody?: boolean; requestMessages?: boolean; responseBody?: boolean } | undefined`): Settings for controlling what data is included in step results.
    - `runtimeContext` (`CONTEXT`): User-defined shared runtime context object that flows through the entire generation lifecycle.
    - `toolsContext` (`InferToolSetContext<TOOLS>`): Per-tool context map passed via \`toolsContext\`, keyed by tool name.
- `onStepStart?` (`GenerateTextOnStepStartCallback`): Callback that is called when a step (LLM call) begins, before the provider is called. Each step represents a single LLM invocation. If also specified in \`generate()\` or \`stream()\`, both callbacks are called (constructor first).
  - `GenerateTextStepStartEvent`
    - `provider` (`string`): The provider identifier (e.g., "openai", "anthropic").
    - `modelId` (`string`): The specific model identifier (e.g., "gpt-6-astra").
    - `instructions` (`Instructions | undefined`): The instructions provided to the model for this step.
    - `messages` (`Array<ModelMessage>`): The messages that will be sent to the model for this step.
    - `tools` (`TOOLS | undefined`): The tools available for this generation.
    - `toolChoice` (`LanguageModelV4ToolChoice | undefined`): The tool choice configuration for this step.
    - `activeTools` (`ActiveTools<TOOLS>`): Limits which tools are available for this step.
    - `toolOrder` (`ToolOrder<TOOLS>`): Controls the order in which tools are sent to the provider for this step.
    - `steps` (`ReadonlyArray<StepResult<TOOLS>>`): Array of results from previous steps (empty for first step).
    - `providerOptions` (`ProviderOptions | undefined`): Additional provider-specific options for this step.
    - `timeout` (`number | { totalMs?: number; stepMs?: number; firstChunkMs?: number; chunkMs?: number } | undefined`): Timeout configuration for the generation. firstChunkMs and chunkMs are only enforced by stream().
    - `headers` (`Record<string, string | undefined> | undefined`): Additional HTTP headers sent with the request.
    - `stopWhen` (`StopCondition<TOOLS> | Array<StopCondition<TOOLS>> | undefined`): Condition(s) for stopping the generation.
    - `output` (`OUTPUT | undefined`): The output specification for structured outputs, if configured.
    - `abortSignal` (`AbortSignal | undefined`): Abort signal for cancelling the operation.
    - `include` (`{ requestBody?: boolean; requestMessages?: boolean; responseBody?: boolean } | undefined`): Settings for controlling what data is included in step results.
    - `runtimeContext` (`CONTEXT`): User-defined shared runtime context object. May be updated from prepareStep between steps.
    - `toolsContext` (`InferToolSetContext<TOOLS>`): Per-tool context map. May be updated from prepareStep between steps.
- `onToolExecutionStart?` (`OnToolExecutionStartCallback`): Callback that is called right before a tool's execute function runs. If also specified in \`generate()\` or \`stream()\`, both callbacks are called (constructor first).
  - `ToolExecutionStartEvent`
    - `callId` (`string`): Unique identifier for this generation call, used to correlate events.
    - `toolCall` (`TypedToolCall<TOOLS>`): The full tool call object containing toolName, toolCallId, input, and metadata.
    - `messages` (`Array<ModelMessage>`): Messages that were sent to the language model to initiate the response that contained the tool call. Does not include the system prompt nor the assistant response that contained the tool call.
    - `toolContext` (`InferToolContext<TOOLS[toolName]>`): Tool-specific context object for the tool call that is about to execute. Narrowed to the context type of the individual tool, not the entire tool set.
- `onToolExecutionEnd?` (`OnToolExecutionEndCallback`): Callback that is called right after a tool's execute function completes (or errors). The \`toolOutput\` field is a discriminated union: when \`toolOutput.type\` is \`'tool-result'\`, the \`output\` field contains the tool result; when \`toolOutput.type\` is \`'tool-error'\`, the \`error\` field contains the error. If also specified in \`generate()\` or \`stream()\`, both callbacks are called (constructor first).
  - `ToolExecutionEndEvent`
    - `callId` (`string`): Unique identifier for this generation call, used to correlate events.
    - `toolCall` (`TypedToolCall<TOOLS>`): The full tool call object containing toolName, toolCallId, input, and metadata.
    - `toolExecutionMs` (`number`): The wall-clock duration of the tool execution in milliseconds.
    - `messages` (`Array<ModelMessage>`): Messages that were sent to the language model to initiate the response that contained the tool call. Does not include the system prompt nor the assistant response that contained the tool call.
    - `toolContext` (`InferToolContext<TOOLS[toolName]>`): Tool-specific context object for the tool call that just completed. Narrowed to the context type of the individual tool, not the entire tool set.
    - `toolOutput` (`ToolOutput<TOOLS>`): Discriminated union representing the tool execution result. When \`type\` is \`'tool-result'\`, the \`output\` field contains the tool's return value. When \`type\` is \`'tool-error'\`, the \`error\` field contains the error.
- `onStepEnd?` (`GenerateTextOnStepEndCallback`): Callback invoked after each agent step (LLM/tool call) completes. If also specified in \`generate()\` or \`stream()\`, both callbacks are called (constructor first).
- `onStepFinish?` (`GenerateTextOnStepFinishCallback`): Deprecated. Use \`onStepEnd\` instead. This alias is only used as a fallback when \`onStepEnd\` is not provided.
- `onEnd?` (`GenerateTextOnEndCallback`): Callback that is called when all agent steps are finished and the response is complete. Receives step results, total usage, shared \`runtimeContext\`, and \`toolsContext\`. If also specified in \`generate()\` or \`stream()\`, both callbacks are called (constructor first).
- `onFinish?` (`GenerateTextOnEndCallback`): Deprecated alias for \`onEnd\`.
- `runtimeContext?` (`CONTEXT`): User-defined shared runtime context object passed to \`prepareStep\` and lifecycle callbacks.
- `toolsContext` (`InferToolSetContext<TOOLS>`): Per-tool context map keyed by tool name. Required when at least one tool defines \`contextSchema\`; not accepted when no tools need context.
- `telemetry?` (`TelemetryOptions`): Optional telemetry configuration.
  - `TelemetryOptions`
    - `includeRuntimeContext?` (`{ [KEY in keyof CONTEXT]?: boolean }`): Top-level runtime context properties that should be included in telemetry. Runtime context properties are excluded unless they are explicitly set to \`true\`. Lifecycle callbacks and returned results still receive the full \`runtimeContext\`.
    - `includeToolsContext?` (`{ [TOOL_NAME in keyof InferToolSetContext<TOOLS>]?: { [KEY in keyof InferToolSetContext<TOOLS>[TOOL_NAME]]?: boolean } }`): Top-level tool context properties that should be included in telemetry, configured per tool. Tool context properties are excluded unless they are explicitly set to \`true\`. Lifecycle callbacks and returned results still receive the full \`toolsContext\`.
- `experimental_download?` (`DownloadFunction | undefined`): Experimental: Custom download function for fetching files/URLs for tool or model use. By default, files are downloaded if the model does not support the URL for a given media type.
- `maxOutputTokens?` (`number`): Maximum number of tokens the model is allowed to generate.
- `temperature?` (`number`): Sampling temperature, controls randomness. Passed through to the model.
- `topP?` (`number`): Top-p (nucleus) sampling parameter. Passed through to the model.
- `topK?` (`number`): Top-k sampling parameter. Passed through to the model.
- `presencePenalty?` (`number`): Presence penalty parameter. Passed through to the model.
- `frequencyPenalty?` (`number`): Frequency penalty parameter. Passed through to the model.
- `stopSequences?` (`string[]`): Custom token sequences which stop the model output. Passed through to the model.
- `seed?` (`number`): Seed for deterministic generation (if supported).
- `maxRetries?` (`number`): How many times to retry on failure. Default: 2.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific configuration.
- `headers?` (`Record<string, string | undefined>`): Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.
- `callOptionsSchema?` (`FlexibleSchema<CALL_OPTIONS>`): Optional schema for custom call options that can be passed when calling generate() or stream().
- `prepareCall?` (`PrepareCallFunction`): Optional function to prepare call-specific settings based on the call options.
- `id?` (`string`): Custom agent identifier.

## Properties

- `tools` (`Record<string, Tool>`): The tool set configured for this agent. Read-only.
- `id` (`string | undefined`): The agent identifier, if one was provided in the constructor.

## Methods

### `generate()`

Generates a response and triggers tool calls as needed, running the agent loop and returning the final result. Returns a promise resolving to a `GenerateTextResult`.

```ts
const result = await agent.generate({
  prompt: 'What is the weather like?',
});
```

- `prompt` (`string | Array<ModelMessage>`): A text prompt or message array.
- `messages` (`Array<ModelMessage>`): A full conversation history as a list of model messages.
- `abortSignal?` (`AbortSignal`): An optional abort signal that can be used to cancel the call.
- `timeout?` (`number | { totalMs?: number; stepMs?: number; firstChunkMs?: number; chunkMs?: number }`): Timeout in milliseconds. Can be specified as a number or as an object with totalMs, stepMs, firstChunkMs, and/or chunkMs properties. firstChunkMs and chunkMs have no effect on generate(); they are streaming-only and are enforced by stream(). Can be used alongside abortSignal.
- `experimental_sandbox?` (`Experimental_SandboxSession`): Experimental sandbox environment that is passed through to \`prepareStep\`, tool description functions, and tool execution. Tools can access it from their description function options and execution options.
- `options?` (`CALL_OPTIONS`): Custom call options when the agent is configured with a callOptionsSchema.
- `onStart?` (`GenerateTextOnStartCallback`): Callback that is called when the agent operation begins, before any LLM calls are made. If also specified in the constructor, both callbacks are called (constructor first).
- `onStepStart?` (`GenerateTextOnStepStartCallback`): Callback that is called when a step (LLM call) begins, before the provider is called. If also specified in the constructor, both callbacks are called (constructor first).
- `onToolExecutionStart?` (`OnToolExecutionStartCallback`): Callback that is called right before a tool's execute function runs. If also specified in the constructor, both callbacks are called (constructor first).
- `onToolExecutionEnd?` (`OnToolExecutionEndCallback`): Callback that is called right after a tool's execute function completes (or errors). If also specified in the constructor, both callbacks are called (constructor first).
- `onStepEnd?` (`GenerateTextOnStepEndCallback`): Callback invoked after each agent step (LLM/tool call) completes. If also specified in the constructor, both callbacks are called (constructor first, then this one).
- `onStepFinish?` (`GenerateTextOnStepFinishCallback`): Deprecated. Use \`onStepEnd\` instead. This alias is only used as a fallback when \`onStepEnd\` is not provided.
- `onEnd?` (`GenerateTextOnEndCallback`): Callback that is called when all agent steps are finished and the response is complete. If also specified in the constructor, both callbacks are called (constructor first, then this one).
- `onFinish?` (`GenerateTextOnEndCallback`): Deprecated alias for \`onEnd\`.

#### Returns

The `generate()` method returns a `GenerateTextResult` object (see [`generateText`](/docs/reference/ai-sdk-core/generate-text#returns) for details).

### `stream()`

Streams a response from the agent, including agent reasoning and tool calls, as they occur. Returns a `StreamTextResult`.

```ts
const stream = agent.stream({
  prompt: 'Tell me a story about a robot.',
});

for await (const chunk of stream.textStream) {
  console.log(chunk);
}
```

- `prompt` (`string | Array<ModelMessage>`): A text prompt or message array.
- `messages` (`Array<ModelMessage>`): A full conversation history as a list of model messages.
- `abortSignal?` (`AbortSignal`): An optional abort signal that can be used to cancel the call.
- `timeout?` (`number | { totalMs?: number; stepMs?: number; firstChunkMs?: number; chunkMs?: number }`): Timeout in milliseconds. Can be specified as a number or as an object with totalMs, stepMs, firstChunkMs, and/or chunkMs properties. firstChunkMs limits the wait for the first content-bearing output in each model-call step. chunkMs limits gaps between later content-bearing output chunks. Can be used alongside abortSignal.
- `experimental_sandbox?` (`Experimental_SandboxSession`): Experimental sandbox environment that is passed through to \`prepareStep\`, tool description functions, and tool execution. Tools can access it from their description function options and execution options.
- `options?` (`CALL_OPTIONS`): Custom call options when the agent is configured with a callOptionsSchema.
- `experimental_transform?` (`StreamTextTransform | Array<StreamTextTransform>`): Optional stream transformation(s). They are applied in the order provided and must maintain the stream structure. See \`streamText\` docs for details.
- `onStart?` (`GenerateTextOnStartCallback`): Callback that is called when the agent operation begins, before any LLM calls are made. If also specified in the constructor, both callbacks are called (constructor first).
- `onStepStart?` (`GenerateTextOnStepStartCallback`): Callback that is called when a step (LLM call) begins, before the provider is called. If also specified in the constructor, both callbacks are called (constructor first).
- `onToolExecutionStart?` (`OnToolExecutionStartCallback`): Callback that is called right before a tool's execute function runs. If also specified in the constructor, both callbacks are called (constructor first).
- `onToolExecutionEnd?` (`OnToolExecutionEndCallback`): Callback that is called right after a tool's execute function completes (or errors). If also specified in the constructor, both callbacks are called (constructor first).
- `onStepEnd?` (`GenerateTextOnStepEndCallback`): Callback invoked after each agent step (LLM/tool call) completes. If also specified in the constructor, both callbacks are called (constructor first, then this one).
- `onStepFinish?` (`GenerateTextOnStepFinishCallback`): Deprecated. Use \`onStepEnd\` instead. This alias is only used as a fallback when \`onStepEnd\` is not provided.
- `onEnd?` (`GenerateTextOnEndCallback`): Callback that is called when all agent steps are finished and the response is complete. If also specified in the constructor, both callbacks are called (constructor first, then this one).
- `onFinish?` (`GenerateTextOnEndCallback`): Deprecated alias for \`onEnd\`.

#### Returns

The `stream()` method returns a `StreamTextResult` object (see [`streamText`](/docs/reference/ai-sdk-core/stream-text#returns) for details).

## Types

### `ActiveTools`

```ts
type ActiveTools<TOOLS extends ToolSet> =
  | ReadonlyArray<keyof TOOLS & string>
  | undefined;
```

Limits an agent step to the listed tool names. `undefined` means no tool restriction is applied.

### `InferAgentUIMessage`

Infers the UI message type for the given agent instance. Useful for type-safe UI and message exchanges.

#### Basic Example

```ts
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

const weatherAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  tools: { weather: weatherTool },
});

type WeatherAgentUIMessage = InferAgentUIMessage<typeof weatherAgent>;
```

#### Example with Message Metadata

You can provide a second type argument to customize the metadata for each message. This is useful for tracking rich metadata returned by the agent (such as createdAt, tokens, finish reason, etc.).

```ts
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';
import { z } from 'zod';

// Example schema for message metadata
const exampleMetadataSchema = z.object({
  createdAt: z.number().optional(),
  model: z.string().optional(),
  totalTokens: z.number().optional(),
  finishReason: z.string().optional(),
});
type ExampleMetadata = z.infer<typeof exampleMetadataSchema>;

// Define agent as usual
const metadataAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  // ...other options
});

// Type-safe UI message type with custom metadata
type MetadataAgentUIMessage = InferAgentUIMessage<
  typeof metadataAgent,
  ExampleMetadata
>;
```

## Examples

### Basic Agent with Tools

```ts
import { ToolLoopAgent, isStepCount } from 'ai';
import { weatherTool, calculatorTool } from './tools';

const assistant = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  instructions: 'You are a helpful assistant.',
  tools: {
    weather: weatherTool,
    calculator: calculatorTool,
  },
  stopWhen: isStepCount(3),
});

const result = await assistant.generate({
  prompt: 'What is the weather in NYC and what is 100 * 25?',
});

console.log(result.text);
console.log(result.steps); // Array of all steps taken by the agent
```

### Streaming Agent Response

```ts
const agent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  instructions: 'You are a creative storyteller.',
});

const stream = agent.stream({
  prompt: 'Tell me a short story about a time traveler.',
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}
```

### Agent with Output Parsing

```ts
import { z } from 'zod';

const analysisAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  output: {
    schema: z.object({
      sentiment: z.enum(['positive', 'negative', 'neutral']),
      score: z.number(),
      summary: z.string(),
    }),
  },
});

const result = await analysisAgent.generate({
  prompt: 'Analyze this review: "The product exceeded my expectations!"',
});

console.log(result.output);
// Typed as { sentiment: 'positive' | 'negative' | 'neutral', score: number, summary: string }
```

### Example: Approved Tool Execution

```ts
import { ToolLoopAgent, ModelMessage, ToolApprovalResponse, tool } from 'ai';
import { z } from 'zod';

const agent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  instructions: 'You are an agent with access to a weather API.',
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string(),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72,
      }),
    }),
  },
  toolApproval: {
    weather: 'user-approval',
  },
});

const messages: ModelMessage[] = [
  { role: 'user', content: 'Is it raining in Paris today?' },
];

const result = await agent.generate({ messages });
const approvals: ToolApprovalResponse[] = [];

for (const part of result.content) {
  if (part.type === 'tool-approval-request') {
    approvals.push({
      type: 'tool-approval-response',
      approvalId: part.approvalId,
      approved: true,
    });
  }
}

messages.push(...result.responseMessages);
messages.push({ role: 'tool', content: approvals });

const approvedResult = await agent.generate({ messages });
console.log(approvedResult.text);
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)