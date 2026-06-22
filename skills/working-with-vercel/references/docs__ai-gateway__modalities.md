---
title: Modalities
product: vercel
url: /docs/ai-gateway/modalities
canonical_url: "https://vercel.com/docs/ai-gateway/modalities"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/modalities/text-generation
  - /docs/ai-gateway/modalities/image-generation
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities/realtime
summary: Learn about modalities on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "5d042bd0e4a9957beadac4e7dc1c0f4fe1e11cada810302382bc17cbafd11ec8"
---

# Modalities

Modalities are the kinds of input and output models work with. Through AI Gateway you can generate text, images, and video, transcribe and synthesize speech, hold realtime voice conversations, create embeddings, and rerank documents, all through a unified API so you don't need separate integrations for each provider. For cross-cutting abilities like reasoning and web search, see [Models & Providers](/docs/ai-gateway/models-and-providers).

## What you can build

- **Text apps**: Generate and stream text for chat, content, and agents with [Text Generation](/docs/ai-gateway/modalities/text-generation)
- **Visual content apps**: Generate product images, marketing assets, or UI mockups with [Image Generation](/docs/ai-gateway/modalities/image-generation)
- **Video content**: Create videos from text prompts, images, or video input with [Video Generation](/docs/ai-gateway/modalities/video-generation)
- **Voice agents**: Build low-latency, two-way voice conversations with [Realtime](/docs/ai-gateway/modalities/realtime)
- **Transcription**: Turn recorded audio into text with [Speech to Text](/docs/ai-gateway/modalities/speech-to-text)
- **Spoken audio**: Generate voiceovers and spoken responses from text with [Text to Speech](/docs/ai-gateway/modalities/text-to-speech)
- **Semantic search**: Generate vector embeddings for search, similarity matching, and RAG with [Embeddings](/docs/ai-gateway/modalities/embeddings)
- **Improved retrieval**: Re-score candidate documents by relevance for better RAG results with [Reranking](/docs/ai-gateway/modalities/reranking)

## Modalities overview

| Modality                                                          | What it does                              | Key features                                                                   |
| ----------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| [Text Generation](/docs/ai-gateway/modalities/text-generation)    | Generate and stream text                  | Hundreds of models, streaming, tool calling, structured output                 |
| [Image Generation](/docs/ai-gateway/modalities/image-generation)  | Create images from text prompts           | Multi-provider support, edit existing images, multiple output formats          |
| [Video Generation](/docs/ai-gateway/modalities/video-generation)  | Create videos from text, images, or video | Text-to-video, image-to-video, video-to-video, resolution and duration control |
| [Realtime](/docs/ai-gateway/modalities/realtime)                  | Hold live, two-way voice conversations    | Low-latency speech-to-speech, browser and Node.js, session config and limits   |
| [Speech to Text](/docs/ai-gateway/modalities/speech-to-text)      | Transcribe recorded audio into text       | OpenAI transcription models, timestamped segments, language detection          |
| [Text to Speech](/docs/ai-gateway/modalities/text-to-speech)      | Generate spoken audio from text           | OpenAI speech models, multiple voices and formats, speed and tone control      |
| [Embeddings](/docs/ai-gateway/modalities/embeddings)              | Generate vector representations of text   | Semantic search, similarity matching, RAG pipelines                            |
| [Reranking](/docs/ai-gateway/modalities/reranking)                | Re-score documents by relevance           | Improve RAG retrieval accuracy, multi-provider support                         |

## Text generation

Generate and stream text from hundreds of models through a single API. Text is the default modality, with support for tool calling and structured output.

```typescript
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-5.5',
  prompt: 'What is the capital of France?',
});
```

See the [Text Generation docs](/docs/ai-gateway/modalities/text-generation) for streaming, tool calling, and structured output.

## Image generation

Generate images using AI models through a single API. Requests route to the best available provider, with authentication and response formatting handled automatically.

```typescript
import { gateway } from '@ai-sdk/gateway';
import { experimental_generateImage as generateImage } from 'ai';

const { image } = await generateImage({
  model: gateway.imageModel('openai/gpt-image-2'),
  prompt: 'A serene mountain landscape at sunset',
});
```

Supported providers include OpenAI (GPT Image), Google (Imagen), and multimodal LLMs with image capabilities. See the [Image Generation docs](/docs/ai-gateway/modalities/image-generation) for implementation details.

## Video generation

Generate videos from text prompts, images, or video input using AI models through a single API. Control resolution, duration, aspect ratio, and audio generation across providers.

```typescript
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: 'A serene mountain landscape at sunset with clouds drifting by',
  aspectRatio: '16:9',
  resolution: '1920x1080',
  duration: 8,
});
```

Supported providers include Google (Veo 3.1), KlingAI (motion control), and Wan. See the [Video Generation docs](/docs/ai-gateway/modalities/video-generation) for implementation details.

## Audio: speech and voice

AI Gateway works with audio three ways, and they do different jobs. Use this table to pick the one that matches what you have and what you want to produce:

| Capability                                                   | Input and output            | Use it for                                                                              | Mode                           |
| ------------------------------------------------------------ | --------------------------- | --------------------------------------------------------------------------------------- | ------------------------------ |
| [Speech to Text](/docs/ai-gateway/modalities/speech-to-text) | Recorded audio in, text out | Transcribing files you already have, such as voice notes, call recordings, and podcasts | Batch, single response         |
| [Text to Speech](/docs/ai-gateway/modalities/text-to-speech) | Text in, audio file out     | Voiceovers, audio versions of written content, and spoken responses                     | Batch, single response         |
| [Realtime](/docs/ai-gateway/modalities/realtime)             | Live audio in and out       | Two-way voice agents and live conversation                                              | Streaming, low-latency session |

Speech to Text and Text to Speech process recorded or generated audio in a single request. Realtime handles live conversation, so reach for it when you need a back-and-forth voice session rather than a transcript or a finished audio file.

## Embeddings and reranking

Generate vector embeddings for semantic search, similarity matching, and RAG, then re-score candidate documents by relevance to improve retrieval accuracy. See the [Embeddings docs](/docs/ai-gateway/modalities/embeddings) and [Reranking docs](/docs/ai-gateway/modalities/reranking) for implementation details.

## Next steps

- [Generate text](/docs/ai-gateway/modalities/text-generation) for chat, content, and agents
- [Generate your first image](/docs/ai-gateway/modalities/image-generation)
- [Generate your first video](/docs/ai-gateway/modalities/video-generation)
- [Build a voice agent](/docs/ai-gateway/modalities/realtime) with Realtime
- [Transcribe audio](/docs/ai-gateway/modalities/speech-to-text) with Speech to Text
- [Generate speech](/docs/ai-gateway/modalities/text-to-speech) with Text to Speech
- [Generate embeddings](/docs/ai-gateway/modalities/embeddings) for semantic search and RAG
- [Rerank documents](/docs/ai-gateway/modalities/reranking) to improve retrieval accuracy

For cross-cutting abilities, see [Models & Providers](/docs/ai-gateway/models-and-providers). For monitoring and spend, see [Observability and Spend](/docs/ai-gateway/observability-and-spend). For data privacy and governance, see [Security and Compliance](/docs/ai-gateway/security-and-compliance).


---

[View full sitemap](/docs/sitemap)
