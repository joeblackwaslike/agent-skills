---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/language-model-v2-middleware.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "633e76853d218938a18ed94c03814daedcef95b4516949479db4039b4662c385"
---

# `LanguageModelV4Middleware`

<Note type="warning">
  Language model middleware is an experimental feature.
</Note>

Language model middleware provides a way to enhance the behavior of language models
by intercepting and modifying the calls to the language model. It can be used to add
features like guardrails, RAG, caching, and logging in a language model agnostic way.

See [Language Model Middleware](/docs/ai-sdk-core/middleware) for more information.

## Import

<Snippet
  text={`import { LanguageModelV4Middleware } from "ai"`}
  prompt={false}
/>

## API Signature

<PropertiesTable
  content={[
    {
      name: 'specificationVersion',
      type: "'v3'",
      description: 'The specification version of the middleware. Must be "v3".',
    },
    {
      name: 'transformParams',
      type: '({ type: "generate" | "stream", params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4CallOptions>',
      isOptional: true,
      description:
        'Transforms the parameters before they are passed to the language model.',
    },
    {
      name: 'wrapGenerate',
      type: '({ doGenerate: () => PromiseLike<LanguageModelV4GenerateResult>, doStream: () => PromiseLike<LanguageModelV4StreamResult>, params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4GenerateResult>',
      isOptional: true,
      description:
        'Wraps the generate operation of the language model. Receives both doGenerate and doStream functions.',
    },
    {
      name: 'wrapStream',
      type: '({ doGenerate: () => PromiseLike<LanguageModelV4GenerateResult>, doStream: () => PromiseLike<LanguageModelV4StreamResult>, params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4StreamResult>',
      isOptional: true,
      description:
        'Wraps the stream operation of the language model. Receives both doGenerate and doStream functions.',
    },
    {
      name: 'overrideProvider',
      type: '(options: { model: LanguageModelV4 }) => string',
      isOptional: true,
      description: 'Override the provider ID of the model.',
    },
    {
      name: 'overrideModelId',
      type: '(options: { model: LanguageModelV4 }) => string',
      isOptional: true,
      description: 'Override the model ID of the model.',
    },
    {
      name: 'overrideSupportedUrls',
      type: '(options: { model: LanguageModelV4 }) => PromiseLike<Record<string, RegExp[]>> | Record<string, RegExp[]>',
      isOptional: true,
      description: 'Override the supported URLs for the model.',
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
