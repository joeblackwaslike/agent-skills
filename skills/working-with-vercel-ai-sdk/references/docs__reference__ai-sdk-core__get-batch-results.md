---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-batch-results.md"
fetched_at: "2026-09-21T09:43:58.833Z"
sha256: "ef17d7db77e82bf28a0d1f9b0e8c73b91e492a318e2903d04df0cf6f8f846e82"
---

# `experimental_getBatchResults()`

<Note type="warning">
  Batch support is experimental and the API may change in patch releases.
</Note>

Returns an async iterable of terminal results for the requests in an
asynchronous batch. For a complete guide to the batch lifecycle, see
[Batch](/docs/ai-sdk-core/batch).

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { experimental_getBatchResults as getBatchResults } from 'ai';

for await (const item of getBatchResults({ provider: anthropic, batch })) {
  if (item.status === 'succeeded') {
    console.log(item.id, item.text);
  } else {
    console.error(item.id, item.error);
  }
}
```

## Import

<Snippet
  text={`import { experimental_getBatchResults } from "ai"`}
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
      name: 'tools',
      type: 'ToolSet',
      isOptional: true,
      description:
        'The client-defined tools provided on requests in the batch. Used to validate and normalize returned tool calls; execute functions are never invoked.',
    },
    {
      name: 'providerOptions',
      type: 'ProviderOptions',
      isOptional: true,
      description: 'Additional provider-specific options for result retrieval.',
    },
    {
      name: 'maxRetries',
      type: 'number',
      isOptional: true,
      description:
        'Maximum number of retries for result retrieval. Set to 0 to disable retries. Default: 2.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description: 'An optional abort signal to cancel result retrieval.',
    },
    {
      name: 'timeout',
      type: 'number | { totalMs?: number }',
      isOptional: true,
      description: 'Maximum time allowed for result retrieval.',
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

An `AsyncIterableStream<Experimental_BatchItemResult>` of succeeded,
failed, cancelled, or expired request results. You can consume the stream as
either an async iterable or a `ReadableStream`.

Successful items contain `id`, `status: 'succeeded'`, `text`, normalized
`content` (including text, reasoning, sources, files, tool calls, and tool
results),
`finishReason`, `usage`, and optional response and provider metadata. `text` is
the concatenation of text parts and can be an empty string when a result
contains no text parts.
Failed, cancelled, and expired items contain the request `id`, their terminal
status, and optional error details.


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
