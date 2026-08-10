---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/default-instructions-middleware.md"
fetched_at: "2026-08-10T05:31:58.738Z"
sha256: "48e8b519106b1578d715559dda4b54a2cd5cd610bedec794e0198738d6d9eec2"
---

# `defaultInstructionsMiddleware()`

`defaultInstructionsMiddleware` applies default instructions to language model
calls that do not already contain a system message. This is useful for
configuring reusable model behavior while allowing call-level `instructions` to
take precedence.

## Import

<Snippet
  text={`import { defaultInstructionsMiddleware } from "ai"`}
  prompt={false}
/>

## API Signature

```ts
function defaultInstructionsMiddleware(options: {
  instructions: Instructions;
}): LanguageModelMiddleware;
```

### Parameters

<PropertiesTable
  content={[
    {
      name: 'instructions',
      type: 'string | SystemModelMessage | Array<SystemModelMessage>',
      isOptional: false,
      description:
        'Default instructions to prepend when a call does not already contain a system message.',
    },
  ]}
/>

### Returns

Returns a
[LanguageModelMiddleware](/docs/ai-sdk-core/middleware) that:

- Prepends the configured instructions to calls without a system message.
- Preserves instruction-level `providerOptions`.
- Leaves calls containing any system message unchanged, so call-level
  instructions take precedence.
- Applies to both non-streaming and streaming language model calls.

## Usage Example

```ts
import {
  defaultInstructionsMiddleware,
  generateText,
  wrapLanguageModel,
} from 'ai';

const model = wrapLanguageModel({
  model: __MODEL__,
  middleware: defaultInstructionsMiddleware({
    instructions: 'You are a concise technical assistant.',
  }),
});

const defaultResult = await generateText({
  model,
  prompt: 'Explain HTTP caching.',
});

const overriddenResult = await generateText({
  model,
  instructions: 'Explain concepts for a complete beginner.',
  prompt: 'Explain HTTP caching.',
});
```

You can attach provider options to default instructions by using a
`SystemModelMessage`:

```ts
const model = wrapLanguageModel({
  model: __MODEL__,
  middleware: defaultInstructionsMiddleware({
    instructions: {
      role: 'system',
      content: 'You are a concise technical assistant.',
      providerOptions: {
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    },
  }),
});
```

<Note>
  This middleware provides defaults, not enforced instructions. Any system
  message in the normalized prompt suppresses the defaults. Only use
  `allowSystemInMessages` with trusted message histories, because an untrusted
  system message could override the configured defaults.
</Note>


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
