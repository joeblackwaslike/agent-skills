---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-skill.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "0d9fe9455a3ff6c0030b04cf3c979fb7417df2e6603c6ff8ab3ea82554910a5c"
---

# `uploadSkill()`

Uploads a skill (a bundle of files) to a provider and returns a `ProviderReference` that can be used in subsequent inference calls.

```ts
import { uploadSkill } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { readFileSync } from 'fs';

const { providerReference } = await uploadSkill({
  api: anthropic.skills(),
  files: [
    {
      path: 'my-skill/SKILL.md',
      content: readFileSync('./SKILL.md'),
    },
  ],
  displayTitle: 'My Skill',
});
```

## Import

<Snippet text={`import { uploadSkill } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'api',
      type: 'SkillsV4 | ProviderV4',
      description:
        'The skills API interface to use for uploading. Can be a `SkillsV4` instance (e.g. `anthropic.skills()`) or a provider instance directly (e.g. `anthropic`), in which case `.skills()` is called automatically.',
    },
    {
      name: 'files',
      type: 'SkillsV4File[]',
      description:
        'The files that make up the skill. Each file has a relative `path` and `content` (either a `Uint8Array` or a base64-encoded string).',
    },
    {
      name: 'displayTitle',
      type: 'string',
      isOptional: true,
      description: 'Human-readable title for the skill.',
    },
    {
      name: 'providerOptions',
      type: 'ProviderOptions',
      isOptional: true,
      description: 'Additional provider-specific options.',
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'providerReference',
      type: 'ProviderReference',
      description:
        'A `Record<string, string>` mapping provider names to provider-specific skill identifiers. Pass this when referencing the skill in inference calls.',
    },
    {
      name: 'displayTitle',
      type: 'string',
      isOptional: true,
      description:
        'Human-readable title returned by the provider (if supported).',
    },
    {
      name: 'name',
      type: 'string',
      isOptional: true,
      description:
        'Skill name inferred by the provider from the uploaded files.',
    },
    {
      name: 'description',
      type: 'string',
      isOptional: true,
      description:
        'Skill description inferred by the provider from the uploaded files.',
    },
    {
      name: 'latestVersion',
      type: 'string',
      isOptional: true,
      description: 'Latest version identifier assigned by the provider.',
    },
    {
      name: 'providerMetadata',
      type: 'ProviderMetadata',
      isOptional: true,
      description:
        'Additional provider-specific metadata returned from the upload.',
    },
    {
      name: 'warnings',
      type: 'Warning[]',
      description: 'Warnings from the provider (e.g. unsupported settings).',
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
