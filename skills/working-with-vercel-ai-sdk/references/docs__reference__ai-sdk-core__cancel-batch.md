---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/cancel-batch.md"
fetched_at: "2026-09-14T09:43:19.624Z"
sha256: "599e0f80a6e80d2ccd4e1677e8b402e113c07c3618c42e7f2a35042ba78f0364"
---

# `experimental_cancelBatch()`

<Note type="warning">
  Batch support is experimental and the API may change in patch releases.
</Note>

Requests cancellation of an asynchronous batch. A successful call means that
the provider accepted the cancellation request, not that cancellation has
finished. For a complete guide to the batch lifecycle, see
[Batch](/docs/ai-sdk-core/batch).

```ts
import { experimental_cancelBatch as cancelBatch } from 'ai';

const result = await cancelBatch({
  provider,
  batch,
});

console.log(result.providerMetadata);
```

## Import

<Snippet
  text={`import { experimental_cancelBatch } from "ai"`}
  prompt={false}
/>

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'provider',
      type: 'Experimental_BatchProvider',
      isOptional: true,
      description:
        'The provider used to access the batch. Defaults to the global provider, or the AI Gateway when no global provider is configured.',
    },
    {
      name: 'batch',
      type: 'Experimental_BatchReference',
      description:
        'The serializable reference returned by experimental_startBatch.',
    },
    {
      name: 'providerOptions',
      type: 'ProviderOptions',
      isOptional: true,
      description:
        'Additional provider-specific options for the cancellation request.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description: 'An optional abort signal to cancel the API request.',
    },
    {
      name: 'timeout',
      type: 'number | { totalMs?: number }',
      isOptional: true,
      description: 'Maximum time allowed for the cancellation request.',
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
      name: 'providerMetadata',
      type: 'ProviderMetadata',
      isOptional: true,
      description: 'Provider-specific metadata from the cancellation response.',
    },
  ]}
/>

Calling this function with a provider that does not support batch cancellation
throws an `UnsupportedFunctionalityError`.


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
