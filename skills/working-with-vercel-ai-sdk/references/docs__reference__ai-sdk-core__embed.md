---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/embed.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "7677a41c2c7a01677fcf60859df43734e8e07c7bf595c449970a3139ef5df94e"
---

# `embed()`

Generate an embedding for a single value using an embedding model.

This is ideal for use cases where you need to embed a single value to e.g. retrieve similar items or to use the embedding in a downstream task.

```ts
import { embed } from 'ai';

const { embedding } = await embed({
  model: 'openai/text-embedding-3-small',
  value: 'sunny day at the beach',
});
```

## Import

<Snippet text={`import { embed } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'EmbeddingModel',
      description:
        "The embedding model to use. Example: openai.embeddingModel('text-embedding-3-small')",
    },
    {
      name: 'value',
      type: 'VALUE',
      description: 'The value to embed. The type depends on the model.',
    },
    {
      name: 'maxRetries',
      type: 'number',
      isOptional: true,
      description:
        'Maximum number of retries. Set to 0 to disable retries. Default: 2.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description:
        'An optional abort signal that can be used to cancel the call.',
    },
    {
      name: 'headers',
      type: 'Record<string, string>',
      isOptional: true,
      description:
        'Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.',
    },
    {
      name: 'providerOptions',
      type: 'ProviderOptions',
      isOptional: true,
      description:
        'Provider-specific options that are passed through to the provider.',
    },
    {
      name: 'telemetry',
      type: 'TelemetryOptions',
      isOptional: true,
      description: 'Telemetry configuration.',
      properties: [
        {
          type: 'TelemetryOptions',
          parameters: [
            {
              name: 'isEnabled',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable telemetry. Enabled by default. Set to `false` to opt out.',
            },
            {
              name: 'recordInputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable input recording. Enabled by default.',
            },
            {
              name: 'recordOutputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable output recording. Enabled by default.',
            },
            {
              name: 'functionId',
              type: 'string',
              isOptional: true,
              description:
                'Identifier for this function. Used to group telemetry data by function.',
            },
            {
              name: 'integrations',
              isOptional: true,
              type: 'Telemetry | Telemetry[]',
              description:
                'Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call.',
            },
          ],
        },
      ],
    },
    {
      name: 'onStart',
      type: '(event: EmbedStartEvent) => PromiseLike<void> | void',
      isOptional: true,
      description:
        'Callback that is called when the embed operation begins, before the embedding model is called. Errors thrown in this callback are silently caught and do not break the embedding flow.',
      properties: [
        {
          type: 'EmbedStartEvent',
          parameters: [
            {
              name: 'callId',
              type: 'string',
              description: 'Unique identifier for this embed call.',
            },
            {
              name: 'operationId',
              type: 'string',
              description: "Identifies the operation type ('ai.embed').",
            },
            {
              name: 'model',
              type: '{ provider: string; modelId: string }',
              description: 'The embedding model being used.',
            },
            {
              name: 'value',
              type: 'string | Array<string>',
              description: 'The value being embedded.',
            },
            {
              name: 'maxRetries',
              type: 'number',
              description: 'Maximum number of retries for failed requests.',
            },
            {
              name: 'abortSignal',
              type: 'AbortSignal | undefined',
              description: 'Abort signal for cancelling the operation.',
            },
            {
              name: 'headers',
              type: 'Record<string, string | undefined> | undefined',
              description: 'Additional HTTP headers sent with the request.',
            },
            {
              name: 'providerOptions',
              type: 'ProviderOptions | undefined',
              description: 'Additional provider-specific options.',
            },
          ],
        },
      ],
    },
    {
      name: 'onEnd',
      type: '(event: EmbedEndEvent) => PromiseLike<void> | void',
      isOptional: true,
      description:
        'Callback that is called when the embed operation completes, after the embedding model returns. Errors thrown in this callback are silently caught and do not break the embedding flow.',
      properties: [
        {
          type: 'EmbedEndEvent',
          parameters: [
            {
              name: 'callId',
              type: 'string',
              description: 'Unique identifier for this embed call.',
            },
            {
              name: 'operationId',
              type: 'string',
              description: "Identifies the operation type ('ai.embed').",
            },
            {
              name: 'model',
              type: '{ provider: string; modelId: string }',
              description: 'The embedding model that was used.',
            },
            {
              name: 'value',
              type: 'string | Array<string>',
              description: 'The value that was embedded.',
            },
            {
              name: 'embedding',
              type: 'Embedding | Array<Embedding>',
              description: 'The resulting embedding vector.',
            },
            {
              name: 'usage',
              type: 'EmbeddingModelUsage',
              description: 'Token usage for the embedding operation.',
            },
            {
              name: 'warnings',
              type: 'Array<Warning>',
              description: 'Warnings from the embedding model.',
            },
            {
              name: 'providerMetadata',
              type: 'ProviderMetadata | undefined',
              description: 'Optional provider-specific metadata.',
            },
            {
              name: 'response',
              type: '{ headers?: Record<string, string>; body?: unknown } | undefined',
              description: 'Optional response data including headers and body.',
            },
          ],
        },
      ],
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'value',
      type: 'VALUE',
      description: 'The value that was embedded.',
    },
    {
      name: 'embedding',
      type: 'number[]',
      description: 'The embedding of the value.',
    },
    {
      name: 'usage',
      type: 'EmbeddingModelUsage',
      description: 'The token usage for generating the embeddings.',
      properties: [
        {
          type: 'EmbeddingModelUsage',
          parameters: [
            {
              name: 'tokens',
              type: 'number',
              description: 'The number of tokens used in the embedding.',
            },
          ],
        },
      ],
    },
    {
      name: 'warnings',
      type: 'Warning[]',
      description:
        'Warnings from the model provider (e.g. unsupported settings).',
    },
    {
      name: 'response',
      type: 'Response',
      isOptional: true,
      description: 'Optional response data.',
      properties: [
        {
          type: 'Response',
          parameters: [
            {
              name: 'headers',
              isOptional: true,
              type: 'Record<string, string>',
              description: 'Response headers.',
            },
            {
              name: 'body',
              type: 'unknown',
              isOptional: true,
              description: 'The response body.',
            },
          ],
        },
      ],
    },
    {
      name: 'providerMetadata',
      type: 'ProviderMetadata | undefined',
      isOptional: true,
      description:
        'Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.',
    },
  ]}
/>


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
- [uploadFile](/docs/reference/ai-sdk-core/upload-file)
- [uploadSkill](/docs/reference/ai-sdk-core/upload-skill)
- [Agent (Interface)](/docs/reference/ai-sdk-core/agent)
- [ToolLoopAgent](/docs/reference/ai-sdk-core/tool-loop-agent)
- [createAgentUIStream](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [createAgentUIStreamResponse](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [pipeAgentUIStreamToResponse](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)
- [tool](/docs/reference/ai-sdk-core/tool)
- [dynamicTool](/docs/reference/ai-sdk-core/dynamic-tool)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)
- [experimental_getRealtimeToolDefinitions](/docs/reference/ai-sdk-core/get-realtime-tool-definitions)
- [MCP Apps](/docs/reference/ai-sdk-core/mcp-apps)
- [Experimental_StdioMCPTransport](/docs/reference/ai-sdk-core/mcp-stdio-transport)
- [jsonSchema](/docs/reference/ai-sdk-core/json-schema)
- [zodSchema](/docs/reference/ai-sdk-core/zod-schema)
- [valibotSchema](/docs/reference/ai-sdk-core/valibot-schema)
- [Output](/docs/reference/ai-sdk-core/output)
- [filterActiveTools](/docs/reference/ai-sdk-core/filter-active-tools)
- [ModelMessage](/docs/reference/ai-sdk-core/model-message)
- [UIMessage](/docs/reference/ai-sdk-core/ui-message)
- [validateUIMessages](/docs/reference/ai-sdk-core/validate-ui-messages)
- [safeValidateUIMessages](/docs/reference/ai-sdk-core/safe-validate-ui-messages)
- [Experimental_SandboxSession](/docs/reference/ai-sdk-core/sandbox)
- [createProviderRegistry](/docs/reference/ai-sdk-core/provider-registry)
- [customProvider](/docs/reference/ai-sdk-core/custom-provider)
- [cosineSimilarity](/docs/reference/ai-sdk-core/cosine-similarity)
- [wrapLanguageModel](/docs/reference/ai-sdk-core/wrap-language-model)
- [wrapImageModel](/docs/reference/ai-sdk-core/wrap-image-model)
- [LanguageModelV4Middleware](/docs/reference/ai-sdk-core/language-model-v2-middleware)
- [extractReasoningMiddleware](/docs/reference/ai-sdk-core/extract-reasoning-middleware)
- [simulateStreamingMiddleware](/docs/reference/ai-sdk-core/simulate-streaming-middleware)
- [defaultSettingsMiddleware](/docs/reference/ai-sdk-core/default-settings-middleware)
- [addToolInputExamplesMiddleware](/docs/reference/ai-sdk-core/add-tool-input-examples-middleware)
- [extractJsonMiddleware](/docs/reference/ai-sdk-core/extract-json-middleware)
- [isStepCount](/docs/reference/ai-sdk-core/is-step-count)
- [hasToolCall](/docs/reference/ai-sdk-core/has-tool-call)
- [isLoopFinished](/docs/reference/ai-sdk-core/loop-finished)
- [simulateReadableStream](/docs/reference/ai-sdk-core/simulate-readable-stream)
- [smoothStream](/docs/reference/ai-sdk-core/smooth-stream)
- [generateId](/docs/reference/ai-sdk-core/generate-id)
- [createIdGenerator](/docs/reference/ai-sdk-core/create-id-generator)
- [DefaultGeneratedFile](/docs/reference/ai-sdk-core/default-generated-file)


[Full Sitemap](/sitemap.md)
