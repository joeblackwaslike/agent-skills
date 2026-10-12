---
title: createProviderRegistry
description: Registry for managing multiple providers and models (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/provider-registry"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/provider-registry.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "43090cf8f97ba17083a112ebe7c31509d3ee8530670e25e172c8ca8eed1cb9f1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

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

```ts {5}
import { generateText } from 'ai';
import { registry } from './registry';

const { text } = await generateText({
  model: registry.languageModel('openai:gpt-6-astra'),
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

### Text embedding models

You can access text embedding models by using the `.embeddingModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts {5}
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

```ts {5}
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

```ts {7}
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

```
import { createProviderRegistry } from "ai"
```

## API Signature

### Parameters

- `providers` (`Record<string, Provider>`): The unique identifier for the provider. It should be unique within the registry.
  - `Provider`
    - `languageModel` (`(id: string) => LanguageModel`): A function that returns a language model by its id.
    - `embeddingModel` (`(id: string) => EmbeddingModel<string>`): A function that returns a text embedding model by its id.
    - `imageModel` (`(id: string) => ImageModel`): A function that returns an image model by its id.
    - `transcriptionModel?` (`(id: string) => TranscriptionModel`): A function that returns a transcription model by its id.
    - `speechModel?` (`(id: string) => SpeechModel`): A function that returns a speech model by its id.
    - `rerankingModel?` (`(id: string) => RerankingModel`): A function that returns a reranking model by its id.
    - `videoModel?` (`(id: string) => VideoModelV4`): A function that returns a video model by its id.
    - `files?` (`() => FilesV4`): A function that returns the provider files API interface.
    - `skills?` (`() => SkillsV4`): A function that returns the provider skills API interface.
- `options?` (`object`): Optional configuration for the registry.
  - `Options`
    - `separator?` (`string`): Custom separator between provider and model IDs. Defaults to ":".
    - `languageModelMiddleware?` (`LanguageModelMiddleware | LanguageModelMiddleware[]`): Middleware to wrap all language models obtained from the registry.
    - `imageModelMiddleware?` (`ImageModelMiddleware | ImageModelMiddleware[]`): Middleware to wrap all image models obtained from the registry.

### Returns

The `createProviderRegistry` function returns a `Provider` instance. It has the following methods:

- `languageModel` (`(id: string) => LanguageModel`): A function that returns a language model by its id (format: providerId:modelId)
- `embeddingModel` (`(id: string) => EmbeddingModel<string>`): A function that returns a text embedding model by its id (format: providerId:modelId)
- `imageModel` (`(id: string) => ImageModel`): A function that returns an image model by its id (format: providerId:modelId)
- `transcriptionModel` (`(id: string) => TranscriptionModel`): A function that returns a transcription model by its id (format: providerId:modelId)
- `speechModel` (`(id: string) => SpeechModel`): A function that returns a speech model by its id (format: providerId:modelId)
- `rerankingModel` (`(id: string) => RerankingModel`): A function that returns a reranking model by its id (format: providerId:modelId)
- `videoModel` (`(id: string) => VideoModelV4`): A function that returns a video model by its id (format: providerId:modelId)
- `files` (`(providerId: string) => FilesV4`): A function that returns a provider files API interface by provider id.
- `skills` (`(providerId: string) => SkillsV4`): A function that returns a provider skills API interface by provider id.

## Experimental decision models

The inferred return type also exposes `decisionModel('providerId:modelId')`,
returning `Experimental_DecisionModelV4`. The provider must expose an
`decisionModel` factory. Custom separators and model ID
inference work as they do for video models. Language and image middleware do not
wrap decision models. `ProviderRegistryProvider` remains a stable interface;
use the inferred return type or `Experimental_DecisionProviderRegistry` to
retain experimental decision access.

Unavailable decision capabilities or models throw `NoSuchModelError` with
`modelType: 'decisionModel'`; unknown registry providers throw
`NoSuchProviderError`. These capabilities are structural extensions and are not
added to the stable `ProviderV4` contract. Direct decision string IDs default
to Gateway when no default provider is configured.
See [Decisions](/docs/ai-sdk-core/decisions#model-aliases-and-registries)
for runnable usage patterns.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)