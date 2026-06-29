---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/provider-registry.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "2303c648b2cf91b2f9886374dd4877ba2dbcde1f4beea0615623b30aa4370335"
---

# `createProviderRegistry()`

When you work with multiple providers and models, it is often desirable to manage them
in a central place and access the models through simple string ids.

`createProviderRegistry` lets you create a registry with multiple providers that you
can access by their ids in the format `providerId:modelId`.

In TypeScript, registry model IDs are inferred from the registered provider IDs.
When a provider exposes literal model ID types, editors can suggest the combined
`providerId:modelId` values.

### Setup

You can create a registry with multiple providers and models using `createProviderRegistry`.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createProviderRegistry } from 'ai';

export const registry = createProviderRegistry({
  // register provider with prefix and default setup:
  anthropic,

  // register provider with prefix and custom setup:
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
});
```

### Custom Separator

By default, the registry uses `:` as the separator between provider and model IDs. You can customize this separator by passing a `separator` option:

```ts
const registry = createProviderRegistry(
  {
    anthropic,
    openai,
  },
  { separator: ' > ' },
);

// Now you can use the custom separator
const model = registry.languageModel('anthropic > claude-3-opus-20240229');
```

### Language models

You can access language models by using the `languageModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { generateText } from 'ai';
import { registry } from './registry';

const { text } = await generateText({
  model: registry.languageModel('openai:gpt-4.1'),
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

### Text embedding models

You can access text embedding models by using the `.embeddingModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { embed } from 'ai';
import { registry } from './registry';

const { embedding } = await embed({
  model: registry.embeddingModel('openai:text-embedding-3-small'),
  value: 'sunny day at the beach',
});
```

### Image models

You can access image models by using the `imageModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { generateImage } from 'ai';
import { registry } from './registry';

const { image } = await generateImage({
  model: registry.imageModel('openai:dall-e-3'),
  prompt: 'A beautiful sunset over a calm ocean',
});
```

### Video models

You can access video models by using the `videoModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"7"}
import { fal } from '@ai-sdk/fal';
import { createProviderRegistry, experimental_generateVideo } from 'ai';

const registry = createProviderRegistry({ fal });

const { videos } = await experimental_generateVideo({
  model: registry.videoModel('fal:luma-dream-machine/ray-2'),
  prompt: 'A cat walking on a beach at sunset',
});
```

### Files and skills

You can access a provider's files and skills interfaces by calling
`registry.files(providerId)` and `registry.skills(providerId)`.

## Import

<Snippet text={`import { createProviderRegistry } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'providers',
      type: 'Record<string, Provider>',
      description:
        'The unique identifier for the provider. It should be unique within the registry.',
      properties: [
        {
          type: 'Provider',
          parameters: [
            {
              name: 'languageModel',
              type: '(id: string) => LanguageModel',
              description:
                'A function that returns a language model by its id.',
            },
            {
              name: 'embeddingModel',
              type: '(id: string) => EmbeddingModel<string>',
              description:
                'A function that returns a text embedding model by its id.',
            },
            {
              name: 'imageModel',
              type: '(id: string) => ImageModel',
              description: 'A function that returns an image model by its id.',
            },
            {
              name: 'transcriptionModel',
              type: '(id: string) => TranscriptionModel',
              isOptional: true,
              description:
                'A function that returns a transcription model by its id.',
            },
            {
              name: 'speechModel',
              type: '(id: string) => SpeechModel',
              isOptional: true,
              description: 'A function that returns a speech model by its id.',
            },
            {
              name: 'rerankingModel',
              type: '(id: string) => RerankingModel',
              isOptional: true,
              description:
                'A function that returns a reranking model by its id.',
            },
            {
              name: 'videoModel',
              type: '(id: string) => VideoModelV4',
              isOptional: true,
              description: 'A function that returns a video model by its id.',
            },
            {
              name: 'files',
              type: '() => FilesV4',
              isOptional: true,
              description:
                'A function that returns the provider files API interface.',
            },
            {
              name: 'skills',
              type: '() => SkillsV4',
              isOptional: true,
              description:
                'A function that returns the provider skills API interface.',
            },
          ],
        },
      ],
    },
    {
      name: 'options',
      type: 'object',
      isOptional: true,
      description: 'Optional configuration for the registry.',
      properties: [
        {
          type: 'Options',
          parameters: [
            {
              name: 'separator',
              type: 'string',
              isOptional: true,
              description:
                'Custom separator between provider and model IDs. Defaults to ":".',
            },
            {
              name: 'languageModelMiddleware',
              type: 'LanguageModelMiddleware | LanguageModelMiddleware[]',
              isOptional: true,
              description:
                'Middleware to wrap all language models obtained from the registry.',
            },
            {
              name: 'imageModelMiddleware',
              type: 'ImageModelMiddleware | ImageModelMiddleware[]',
              isOptional: true,
              description:
                'Middleware to wrap all image models obtained from the registry.',
            },
          ],
        },
      ],
    },
  ]}
/>

### Returns

The `createProviderRegistry` function returns a `Provider` instance. It has the following methods:

<PropertiesTable
  content={[
    {
      name: 'languageModel',
      type: '(id: string) => LanguageModel',
      description:
        'A function that returns a language model by its id (format: providerId:modelId)',
    },
    {
      name: 'embeddingModel',
      type: '(id: string) => EmbeddingModel<string>',
      description:
        'A function that returns a text embedding model by its id (format: providerId:modelId)',
    },
    {
      name: 'imageModel',
      type: '(id: string) => ImageModel',
      description:
        'A function that returns an image model by its id (format: providerId:modelId)',
    },
    {
      name: 'transcriptionModel',
      type: '(id: string) => TranscriptionModel',
      description:
        'A function that returns a transcription model by its id (format: providerId:modelId)',
    },
    {
      name: 'speechModel',
      type: '(id: string) => SpeechModel',
      description:
        'A function that returns a speech model by its id (format: providerId:modelId)',
    },
    {
      name: 'rerankingModel',
      type: '(id: string) => RerankingModel',
      description:
        'A function that returns a reranking model by its id (format: providerId:modelId)',
    },
    {
      name: 'videoModel',
      type: '(id: string) => VideoModelV4',
      description:
        'A function that returns a video model by its id (format: providerId:modelId)',
    },
    {
      name: 'files',
      type: '(providerId: string) => FilesV4',
      description:
        'A function that returns a provider files API interface by provider id.',
    },
    {
      name: 'skills',
      type: '(providerId: string) => SkillsV4',
      description:
        'A function that returns a provider skills API interface by provider id.',
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
