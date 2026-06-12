---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/loop-finished.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "03c561bd0da810ad08d39a39a034aec1cf3b9fd186a93415ba9a42f963945130"
---

# `isLoopFinished()`

Creates a stop condition that never triggers, letting the agent loop run until it naturally finishes (i.e., the model stops making tool calls).

By default, `ToolLoopAgent` uses `stepCountIs(20)` as a safety measure to prevent runaway loops that could result in excessive API calls and costs. If you are confident that your agent will terminate naturally or you are less concerned about costs, `isLoopFinished()` removes that limit and lets the agent run until the model is truly done.

```ts
import { ToolLoopAgent, isLoopFinished } from 'ai';
__PROVIDER_IMPORT__;

const agent = new ToolLoopAgent({
  model: __MODEL__,
  tools: {
    // your tools
  },
  stopWhen: isLoopFinished(),
});

const result = await agent.generate({
  prompt: 'Analyze this dataset and create a summary report',
});
```

## Import

<Snippet text={`import { isLoopFinished } from "ai"`} prompt={false} />

## API Signature

### Parameters

This function takes no parameters.

### Returns

A `StopCondition` function that always returns `false`, meaning it never triggers the stop condition. The agent loop will only stop through its natural termination conditions:

- The model stops making tool calls, or
- A tool without an `execute` function is called, or
- A tool call needs approval

## Examples

### Basic Usage

Let the agent run until it's finished:

```ts
import { ToolLoopAgent, isLoopFinished } from 'ai';

const agent = new ToolLoopAgent({
  model: yourModel,
  tools: yourTools,
  stopWhen: isLoopFinished(),
});
```

### Combining with Other Conditions

You can combine `isLoopFinished()` with other conditions. Since `isLoopFinished()` never triggers, the other conditions still apply:

```ts
import { ToolLoopAgent, isLoopFinished, hasToolCall } from 'ai';

const agent = new ToolLoopAgent({
  model: yourModel,
  tools: yourTools,
  stopWhen: [isLoopFinished(), hasToolCall('finalAnswer')],
});
```

In practice, this does not make much sense in this context, since you could just omit `isLoopFinished()`.

## See also

- [`stepCountIs()`](/docs/reference/ai-sdk-core/step-count-is)
- [`hasToolCall()`](/docs/reference/ai-sdk-core/has-tool-call)
- [`ToolLoopAgent`](/docs/reference/ai-sdk-core/tool-loop-agent)


## Navigation

- [generateText](/docs/reference/ai-sdk-core/generate-text)
- [streamText](/docs/reference/ai-sdk-core/stream-text)
- [embed](/docs/reference/ai-sdk-core/embed)
- [embedMany](/docs/reference/ai-sdk-core/embed-many)
- [rerank](/docs/reference/ai-sdk-core/rerank)
- [generateImage](/docs/reference/ai-sdk-core/generate-image)
- [transcribe](/docs/reference/ai-sdk-core/transcribe)
- [generateSpeech](/docs/reference/ai-sdk-core/generate-speech)
- [experimental_generateVideo](/docs/reference/ai-sdk-core/generate-video)
- [Agent (Interface)](/docs/reference/ai-sdk-core/agent)
- [ToolLoopAgent](/docs/reference/ai-sdk-core/tool-loop-agent)
- [createAgentUIStream](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [createAgentUIStreamResponse](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [pipeAgentUIStreamToResponse](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)
- [tool](/docs/reference/ai-sdk-core/tool)
- [dynamicTool](/docs/reference/ai-sdk-core/dynamic-tool)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)
- [Experimental_StdioMCPTransport](/docs/reference/ai-sdk-core/mcp-stdio-transport)
- [jsonSchema](/docs/reference/ai-sdk-core/json-schema)
- [zodSchema](/docs/reference/ai-sdk-core/zod-schema)
- [valibotSchema](/docs/reference/ai-sdk-core/valibot-schema)
- [Output](/docs/reference/ai-sdk-core/output)
- [ModelMessage](/docs/reference/ai-sdk-core/model-message)
- [UIMessage](/docs/reference/ai-sdk-core/ui-message)
- [validateUIMessages](/docs/reference/ai-sdk-core/validate-ui-messages)
- [safeValidateUIMessages](/docs/reference/ai-sdk-core/safe-validate-ui-messages)
- [createProviderRegistry](/docs/reference/ai-sdk-core/provider-registry)
- [customProvider](/docs/reference/ai-sdk-core/custom-provider)
- [cosineSimilarity](/docs/reference/ai-sdk-core/cosine-similarity)
- [wrapLanguageModel](/docs/reference/ai-sdk-core/wrap-language-model)
- [wrapImageModel](/docs/reference/ai-sdk-core/wrap-image-model)
- [LanguageModelV3Middleware](/docs/reference/ai-sdk-core/language-model-v2-middleware)
- [extractReasoningMiddleware](/docs/reference/ai-sdk-core/extract-reasoning-middleware)
- [simulateStreamingMiddleware](/docs/reference/ai-sdk-core/simulate-streaming-middleware)
- [defaultSettingsMiddleware](/docs/reference/ai-sdk-core/default-settings-middleware)
- [addToolInputExamplesMiddleware](/docs/reference/ai-sdk-core/add-tool-input-examples-middleware)
- [extractJsonMiddleware](/docs/reference/ai-sdk-core/extract-json-middleware)
- [stepCountIs](/docs/reference/ai-sdk-core/step-count-is)
- [hasToolCall](/docs/reference/ai-sdk-core/has-tool-call)
- [isLoopFinished](/docs/reference/ai-sdk-core/loop-finished)
- [simulateReadableStream](/docs/reference/ai-sdk-core/simulate-readable-stream)
- [smoothStream](/docs/reference/ai-sdk-core/smooth-stream)
- [generateId](/docs/reference/ai-sdk-core/generate-id)
- [createIdGenerator](/docs/reference/ai-sdk-core/create-id-generator)
- [DefaultGeneratedFile](/docs/reference/ai-sdk-core/default-generated-file)


[Full Sitemap](/sitemap.md)
