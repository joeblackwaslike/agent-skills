---
title: customProvider
description: Custom provider that uses models from a different provider (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/custom-provider"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/custom-provider.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "3cab4ef609b7fdcbb75c6174a44a4d228f10f2a90c9a179a427558faa64b24b3"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

With a custom provider, you can map ids to any model.
This allows you to set up custom model configurations, alias names, and more.
The custom provider also supports a fallback provider, which is useful for
wrapping existing providers and adding additional functionality. Custom
providers can expose language, embedding, image, transcription, speech,
reranking, video, files, and skills capabilities.

### Example: custom model settings

You can create a custom provider using `customProvider`.

```ts
import { openai } from '@ai-sdk/openai';
import { customProvider } from 'ai';

// custom provider with different model settings:
export const myOpenAI = customProvider({
  languageModels: {
    // replacement model with custom settings:
    'gpt-6-astra': wrapLanguageModel({
      model: openai('gpt-6-astra'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
    // alias model with custom settings:
    'gpt-6-astra-reasoning-high': wrapLanguageModel({
      model: openai('gpt-6-astra'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
  },
  fallbackProvider: openai,
});
```

## Import

```
import { customProvider } from "ai"
```

## API Signature

### Parameters

- `languageModels?` (`Record<string, LanguageModel>`): A record of language models, where keys are model IDs and values are LanguageModel instances.
- `embeddingModels?` (`Record<string, EmbeddingModel<string>>`): A record of text embedding models, where keys are model IDs and values are EmbeddingModel\<string> instances.
- `imageModels?` (`Record<string, ImageModel>`): A record of image models, where keys are model IDs and values are image model instances.
- `transcriptionModels?` (`Record<string, TranscriptionModel>`): A record of transcription models, where keys are model IDs and values are TranscriptionModel instances.
- `speechModels?` (`Record<string, SpeechModel>`): A record of speech models, where keys are model IDs and values are SpeechModel instances.
- `rerankingModels?` (`Record<string, RerankingModel>`): A record of reranking models, where keys are model IDs and values are RerankingModel instances.
- `videoModels?` (`Record<string, VideoModel>`): A record of video models, where keys are model IDs and values are VideoModel instances.
- `files?` (`FilesV4`): A files API interface to expose through the custom provider.
- `skills?` (`SkillsV4`): A skills API interface to expose through the custom provider.
- `fallbackProvider?` (`Provider`): An optional fallback provider to use when a requested model or capability is not found in the custom provider.

### Returns

The `customProvider` function returns a `Provider` instance. It has the following methods:

- `languageModel` (`(id: string) => LanguageModel`): A function that returns a language model by its custom provider model ID.
- `embeddingModel` (`(id: string) => EmbeddingModel<string>`): A function that returns a text embedding model by its custom provider model ID.
- `imageModel` (`(id: string) => ImageModel`): A function that returns an image model by its custom provider model ID.
- `transcriptionModel` (`(id: string) => TranscriptionModel`): A function that returns a transcription model by its custom provider model ID.
- `speechModel` (`(id: string) => SpeechModel`): A function that returns a speech model by its custom provider model ID.
- `rerankingModel` (`(id: string) => RerankingModel`): A function that returns a reranking model by its custom provider model ID.
- `videoModel` (`(id: string) => VideoModelV4`): A function that returns a video model by its custom provider model ID.
- `files?` (`() => FilesV4`): A function that returns the custom provider files API interface, when configured directly or inherited from the fallback provider.
- `skills?` (`() => SkillsV4`): A function that returns the custom provider skills API interface, when configured directly or inherited from the fallback provider.

## Experimental decision models

Pass `decisionModels: Record<string, Experimental_DecisionModel>` to define
aliases for decision model instances or string IDs. The returned provider adds
`decisionModel(alias): Experimental_DecisionModelV4`. String aliases resolve
through Gateway by default, or an explicitly configured default provider with
a `decisionModel` method. Unknown aliases use the fallback provider's decision
factory when available; model failures and unsupported questions do not trigger
substitution.

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