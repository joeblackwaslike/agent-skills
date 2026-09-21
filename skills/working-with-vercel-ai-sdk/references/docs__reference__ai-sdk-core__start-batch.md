---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/start-batch.md"
fetched_at: "2026-09-21T09:43:58.833Z"
sha256: "778924d6b088bb628c5963b43ad1bdf56fed2c2f962bb62dc31a6ab34fb341f4"
---

# `experimental_startBatch()`

<Note type="warning">
  Batch support is experimental and the API may change in patch releases.
</Note>

Starts an asynchronous batch of text or image generation requests. For a complete guide to the batch lifecycle, see
[Batch](/docs/ai-sdk-core/batch).

```ts
import { experimental_startBatch as startBatch } from 'ai';

const batch = await startBatch({
  requests: [
    {
      id: 'france',
      type: 'text',
      model: 'gpt-4.1-nano',
      prompt: 'What is the capital of France?',
    },
  ],
});
```

## Import

<Snippet text={`import { experimental_startBatch } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'provider',
      type: 'Experimental_BatchProvider',
      isOptional: true,
      description:
        'The provider to use. Defaults to the global provider, or the AI Gateway when no global provider is configured.',
    },
    {
      name: 'requests',
      type: 'Array<Experimental_BatchRequest>',
      description:
        'The independent requests to process. Each request must have a unique, non-empty id, a supported type, and type-specific properties such as model and prompt or messages for text requests.',
    },
    {
      name: 'providerOptions',
      type: 'ProviderOptions',
      isOptional: true,
      description: 'Additional provider-specific options for the batch.',
    },
    {
      name: 'webhookUrl',
      type: 'string',
      isOptional: true,
      description:
        'URL to notify when the batch reaches a terminal state. Support and payloads are provider-specific.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description:
        'An optional abort signal to cancel the request that starts the batch.',
    },
    {
      name: 'timeout',
      type: 'number | { totalMs?: number }',
      isOptional: true,
      description: 'Maximum time allowed for the batch creation request.',
    },
    {
      name: 'headers',
      type: 'Record<string, string | undefined>',
      isOptional: true,
      description: 'Additional HTTP headers for the request.',
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'version',
      type: '2',
      description: 'Version of the serializable batch reference.',
    },
    {
      name: 'id',
      type: 'string',
      description: 'Provider batch identifier.',
    },
    {
      name: 'provider',
      type: 'string',
      description: 'Provider identifier for the batch.',
    },
    {
      name: 'status',
      type: "'pending' | 'completed' | 'failed'",
      description: 'Initial normalized batch status.',
    },
    {
      name: 'rawStatus',
      type: 'string',
      isOptional: true,
      description: 'The provider-specific batch status, when available.',
    },
    {
      name: 'requestCounts',
      type: '{ total: number; pending: number; completed: number; failed: number }',
      isOptional: true,
      description: 'Provider-reported request counts.',
    },
    {
      name: 'error',
      type: 'Experimental_BatchError',
      isOptional: true,
      description: 'Error details when the batch fails.',
    },
    {
      name: 'createdAt',
      type: 'string',
      isOptional: true,
      description: 'Creation timestamp, when provided by the provider.',
    },
    {
      name: 'expiresAt',
      type: 'string',
      isOptional: true,
      description: 'Expiration timestamp, when provided by the provider.',
    },
    {
      name: 'providerMetadata',
      type: 'ProviderMetadata',
      isOptional: true,
      description: 'Provider-specific metadata for the batch.',
    },
    {
      name: 'warnings',
      type: 'Warning[]',
      description: 'Warnings returned while starting the batch.',
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
- [experimental_streamTranscribe](/docs/reference/ai-sdk-core/stream-transcribe)
- [experimental_streamTranslate](/docs/reference/ai-sdk-core/stream-translate)
- [transcribe](/docs/reference/ai-sdk-core/transcribe)
- [generateSpeech](/docs/reference/ai-sdk-core/generate-speech)
- [experimental_generateVideo](/docs/reference/ai-sdk-core/generate-video)
- [experimental_evaluate](/docs/reference/ai-sdk-core/evaluate)
- [uploadFile](/docs/reference/ai-sdk-core/upload-file)
- [uploadSkill](/docs/reference/ai-sdk-core/upload-skill)
- [Agent (Interface)](/docs/reference/ai-sdk-core/agent)
- [ToolLoopAgent](/docs/reference/ai-sdk-core/tool-loop-agent)
- [createAgentUIStream](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [createAgentUIStreamResponse](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [pipeAgentUIStreamToResponse](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)
- [experimental_startBatch](/docs/reference/ai-sdk-core/start-batch)
- [tool](/docs/reference/ai-sdk-core/tool)
- [experimental_getBatchStatus](/docs/reference/ai-sdk-core/get-batch-status)
- [dynamicTool](/docs/reference/ai-sdk-core/dynamic-tool)
- [experimental_getBatchResults](/docs/reference/ai-sdk-core/get-batch-results)
- [experimental_cancelBatch](/docs/reference/ai-sdk-core/cancel-batch)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)
- [experimental_getRealtimeToolDefinitions](/docs/reference/ai-sdk-core/get-realtime-tool-definitions)
- [toolSearch](/docs/reference/ai-sdk-core/tool-search)
- [experimental_listBatches](/docs/reference/ai-sdk-core/list-batches)
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
- [defaultInstructionsMiddleware](/docs/reference/ai-sdk-core/default-instructions-middleware)
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
