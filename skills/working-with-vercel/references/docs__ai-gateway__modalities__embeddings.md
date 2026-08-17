---
title: Embeddings
product: vercel
url: /docs/ai-gateway/modalities/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/embeddings"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings
summary: Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG) through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/embeddings.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "cb72fe5026b788f0debcae4fe5dfaf470f65aa95d746f167a0b22754ee338ebb"
---

# Embeddings

Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Embeddings](https://ai-sdk.dev/docs/ai-sdk-core/embeddings?from=related)
- [Image Generation](https://vercel.com/docs/ai-gateway/modalities/image-generation?from=related) — Generate and edit images using AI models through Vercel AI Gateway with support for multiple providers and modalities.
- [Models & Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related) — Work with models and providers in AI Gateway: provider routing and fallbacks, filtering, timeouts, caching, service tier
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [Getting Started](https://vercel.com/docs/ai-gateway/getting-started?from=related) — Get started with AI Gateway by generating text, images, video, speech, or transcriptions, or by building realtime voice
- [Adding a Model](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-model?from=related) — Learn how to add a new AI model to your Vercel projects

Full cross-link map for this page: [/docs/ai-gateway/modalities/embeddings.graph.md](/docs/ai-gateway/modalities/embeddings.graph.md)
<!-- /docsgraph:related -->

To see which models AI Gateway supports for embeddings, use the **Embedding** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=embedding).

The examples below use the AI SDK. If you call AI Gateway through the OpenAI-compatible REST API instead, see [Embeddings with the OpenAI-Compatible API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings).

## Single value

```typescript filename="app/api/embed/route.ts" {5-7}
import { embed } from 'ai';

export async function GET() {
  const result = await embed({
    model: 'openai/text-embedding-3-small',
    value: 'Sunny day at the beach',
  });

  return Response.json(result);
}
```

## Multiple values

```typescript filename="app/api/embed/route.ts" {5-7}
import { embedMany } from 'ai';

export async function GET() {
  const result = await embedMany({
    model: 'openai/text-embedding-3-small',
    values: ['Sunny day at the beach', 'Cloudy city skyline'],
  });

  return Response.json(result);
}
```

## Gateway provider instance

Alternatively, if you're using the Gateway provider instance, specify embedding models with `gateway.textEmbeddingModel(...)`.

```typescript filename="app/api/embed/route.ts" {2,6}
import { embed } from 'ai';
import { gateway } from '@ai-sdk/gateway';

export async function GET() {
  const result = await embed({
    model: gateway.textEmbeddingModel('openai/text-embedding-3-small'),
    value: 'Sunny day at the beach',
  });

  return Response.json(result);
}
```


---

[View full sitemap](/docs/sitemap)
