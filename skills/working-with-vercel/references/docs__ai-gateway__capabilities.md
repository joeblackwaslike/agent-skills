---
title: Capabilities
product: vercel
url: /docs/ai-gateway/capabilities
canonical_url: "https://vercel.com/docs/ai-gateway/capabilities"
last_updated: 2026-05-11
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/capabilities/custom-reporting
  - /docs/ai-gateway/capabilities/reasoning
  - /docs/ai-gateway/capabilities/image-generation
  - /docs/ai-gateway/capabilities/video-generation
  - /docs/ai-gateway/capabilities/web-search
summary: Explore AI Gateway capabilities including reasoning, image generation, video generation, web search, embeddings, reranking, observability, usage...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/capabilities.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "9d911487389618e11c313ebaec5cb6c5ee1cf81e2bf5d34c424c1741fe21d737"
---

# Capabilities

In addition to text generation, you can use AI Gateway to enable reasoning, generate images, generate videos, search the web, track requests with observability, monitor usage, and enforce data retention policies. These features work across providers through a unified API, so you don't need separate integrations for each provider.

## What you can build

- **Custom reporting**: Query usage data by model, user, tag, provider, or credential type with the [Custom Reporting API](/docs/ai-gateway/capabilities/custom-reporting)
- **Complex problem solving**: Enable models to think step-by-step for coding, math, and analysis with [Reasoning](/docs/ai-gateway/capabilities/reasoning)
- **Visual content apps**: Generate product images, marketing assets, or UI mockups with [Image Generation](/docs/ai-gateway/capabilities/image-generation)
- **Video content**: Create videos from text prompts, images, or video input with [Video Generation](/docs/ai-gateway/capabilities/video-generation)
- **Research assistants**: Give models access to current information with [Web Search](/docs/ai-gateway/capabilities/web-search)
- **Semantic search**: Generate vector embeddings for search, similarity matching, and RAG with [Embeddings](/docs/ai-gateway/capabilities/embeddings)
- **Improved retrieval**: Re-score candidate documents by relevance for better RAG results with [Reranking](/docs/ai-gateway/capabilities/reranking)
- **Production dashboards**: Monitor costs, latency, and usage across all your AI requests with [Observability](/docs/ai-gateway/capabilities/observability)
- **Compliant applications**: Meet data privacy requirements with [Zero Data Retention](/docs/ai-gateway/capabilities/zdr)
- **Data protection**: Prevent providers from using your prompts for model training with [Disallow Prompt Training](/docs/ai-gateway/capabilities/disallow-prompt-training)
- **Usage tracking**: Check credit balances and look up generation details with the [Usage API](/docs/ai-gateway/capabilities/usage)
- **Flexible processing**: Get faster processing or optimize costs for OpenAI models with [Service Tiers](/docs/ai-gateway/capabilities/service-tiers)

## Capabilities overview

| Capability                                                                         | What it does                              | Key features                                                                   |
| ---------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| [Custom Reporting](/docs/ai-gateway/capabilities/custom-reporting)                 | Query usage data with flexible grouping   | Group by model, user, tag, provider; filter by date, user, tags                |
| [Reasoning](/docs/ai-gateway/capabilities/reasoning)                               | Enable step-by-step thinking              | OpenAI, Anthropic, Google, Vertex, Bedrock; normalized across providers        |
| [Image Generation](/docs/ai-gateway/capabilities/image-generation)                 | Create images from text prompts           | Multi-provider support, edit existing images, multiple output formats          |
| [Video Generation](/docs/ai-gateway/capabilities/video-generation)                 | Create videos from text, images, or video | Text-to-video, image-to-video, video-to-video, resolution and duration control |
| [Web Search](/docs/ai-gateway/capabilities/web-search)                             | Access real-time web information          | Provider-agnostic search for any model, native provider search tools           |
| [Embeddings](/docs/ai-gateway/capabilities/embeddings)                             | Generate vector representations of text   | Semantic search, similarity matching, RAG pipelines                            |
| [Reranking](/docs/ai-gateway/capabilities/reranking)                               | Re-score documents by relevance           | Improve RAG retrieval accuracy, multi-provider support                         |
| [Observability](/docs/ai-gateway/capabilities/observability)                       | Monitor and debug AI requests             | Request traces, token counts, latency metrics, spend tracking                  |
| [Zero Data Retention](/docs/ai-gateway/capabilities/zdr)                           | Ensure data privacy compliance            | Default ZDR policy, per-request enforcement, provider agreements               |
| [Disallow Prompt Training](/docs/ai-gateway/capabilities/disallow-prompt-training) | Prevent prompt data from training models  | Per-request enforcement, provider agreements                                   |
| [Usage & Billing](/docs/ai-gateway/capabilities/usage)                             | Track credits and generations             | Credit balance API, generation lookup, cost tracking                           |
| [Service Tiers](/docs/ai-gateway/capabilities/service-tiers)                       | Control processing priority and cost      | Processing tiers for OpenAI models                                             |

## Custom reporting

The Custom Reporting API lets you break down costs and token consumption by model, user, tag, provider, or credential type. Filter by date range, specific users, models, and tags to understand exactly where your AI spend is going.

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&group_by=model" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Attach `user` and `tags` to your requests to enable per-user and per-tag reporting. See the [Custom Reporting docs](/docs/ai-gateway/capabilities/custom-reporting) for the full API reference.

## Reasoning

Reasoning models can think through problems before responding, producing higher-quality answers for complex tasks. AI Gateway supports reasoning across OpenAI, Anthropic, Google, Vertex AI, and Amazon Bedrock, normalizing the different formats so you can switch providers without rewriting your code.

```typescript
import { generateText } from 'ai';

const { text, reasoning } = await generateText({
  model: 'openai/gpt-5.5',
  prompt: 'Explain the Monty Hall problem step by step.',
  providerOptions: {
    openai: { reasoningSummary: 'detailed' },
  },
});
```

Each provider has its own configuration. See the [Reasoning docs](/docs/ai-gateway/capabilities/reasoning) for provider-specific setup and examples.

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

Supported providers include OpenAI (GPT Image), Google (Imagen), and multimodal LLMs with image capabilities. See the [Image Generation docs](/docs/ai-gateway/capabilities/image-generation) for implementation details.

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

Supported providers include Google (Veo 3.1), KlingAI (motion control), and Wan. See the [Video Generation docs](/docs/ai-gateway/capabilities/video-generation) for implementation details.

## Web search

Enable AI models to search the web during conversations. This capability helps answer questions about current events, recent developments, or any topic requiring up-to-date information.

Two approaches are supported:

- **[Perplexity Search](/docs/ai-gateway/capabilities/web-search#using-perplexity-search)**: Add web search to any model, regardless of provider
- **Native provider tools**: Use search capabilities built into [Anthropic](/docs/ai-gateway/capabilities/web-search#anthropic-web-search), [OpenAI](/docs/ai-gateway/capabilities/web-search#openai-web-search), and [Google](/docs/ai-gateway/capabilities/web-search#google-web-search) models

## Observability

AI Gateway automatically logs every request with metrics you can view in the Vercel dashboard:

- **Requests by model**: See which models your application uses most
- **Time to first token (TTFT)**: Monitor response latency
- **Token counts**: Track input and output token usage
- **Spend**: View costs broken down by model and time period

Access these metrics from the [Observability tab](/docs/ai-gateway/capabilities/observability#observability-tab) at both team and project levels.

## Zero data retention

AI Gateway uses zero data retention by default—it permanently deletes your prompts and responses after requests complete. For applications with strict compliance requirements, you can also enforce ZDR at the provider level:

```typescript
const result = await streamText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'Analyze this sensitive data...',
  providerOptions: {
    gateway: { zeroDataRetention: true },
  },
});
```

When `zeroDataRetention` is enabled, requests only route to providers with verified ZDR agreements. See the [ZDR documentation](/docs/ai-gateway/capabilities/zdr) for the list of compliant providers.

## Next steps

- [Query usage data](/docs/ai-gateway/capabilities/custom-reporting) with the Custom Reporting API
- [Enable reasoning](/docs/ai-gateway/capabilities/reasoning) for complex problem solving
- [Generate your first image](/docs/ai-gateway/capabilities/image-generation)
- [Generate your first video](/docs/ai-gateway/capabilities/video-generation)
- [Enable web search](/docs/ai-gateway/capabilities/web-search) in your AI application
- [Generate embeddings](/docs/ai-gateway/capabilities/embeddings) for semantic search and RAG
- [Rerank documents](/docs/ai-gateway/capabilities/reranking) to improve retrieval accuracy
- [View your observability dashboard](/docs/ai-gateway/capabilities/observability) to monitor usage


---

[View full sitemap](/docs/sitemap)
