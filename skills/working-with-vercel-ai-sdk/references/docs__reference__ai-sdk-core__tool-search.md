---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-search.md"
fetched_at: "2026-09-21T09:43:58.833Z"
sha256: "4d4e2eaaa98dca8f87ddbd0189ca21320ef834c95af3f16e30f7cb6abe59b68a"
---

# `toolSearch()`

Creates a tool that searches the surrounding generation's deferred tools by name
and description. The factory takes no arguments. Use it with `generateText`,
`streamText`, `ToolLoopAgent`, or `WorkflowAgent` from `@ai-sdk/workflow`.
`WorkflowAgent` supports direct tool calling. The other APIs also support code
mode configured with `toolDiscovery: 'conversation'`.

```ts
import { toolSearch } from 'ai';

const search = toolSearch();
```

See the [Tool Search guide](/docs/ai-sdk-core/tool-search) for direct-calling and
code mode examples, including how code mode preserves the tool-definition cache.

## Model Input

The model supplies the following input to the search tool:

```json
{ "query": "weather forecast" }
```

`query` is a required, nonempty string of search keywords. Search is local and
case-insensitive, matching words in tool names and descriptions. Camel-case names
are split into words. Name matches rank above description matches; equal scores
preserve registration order. Function descriptions are resolved with the current
tool context and sandbox. No embedding service or additional model call is used.

## Output

```ts
{
  tools: [
    { name: 'getForecast', description: 'Get the weather forecast for a city.' },
  ],
}
```

Results contain at most five matching tools, with their names and optional
descriptions. They do not include schemas. No matches returns `{ tools: [] }`.
Every returned match is queued for discovery. Newly discovered tools can only be
called on the next model step, after their definitions have been provided. A
parallel call in the same response as the search cannot use a newly discovered
tool. For code mode, finish the current execution and wait for the capability
update.

## Discovery Lifecycle

Before the next model step, the SDK makes discovered tools available through
their configured callers:

- **Direct calling:** the provider receives the updated tool definitions.
- **Code mode:** the SDK appends a user message containing the updated capability
  catalog. The provider-visible code mode definition stays unchanged. Existing
  catalogs remain in the conversation; the latest catalog describes the complete
  currently available tool set.

Actual prompt-cache reuse depends on the provider. Code mode search still requires
`toolDiscovery: 'conversation'`; description discovery and provider callers are
not supported.

Discovered tools remain loaded for the rest of the generation, subject to
`activeTools`. Search cannot discover tools excluded by `activeTools`. Discovery
state is isolated between generation calls, including calls that reuse the same
agent or tool instances.

Set a multi-step `stopWhen` condition with `generateText` and `streamText` so the
model can search, use the discovered tools, and answer.


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
