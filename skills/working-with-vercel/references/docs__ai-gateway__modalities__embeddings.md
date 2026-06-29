---
title: Embeddings
product: vercel
url: /docs/ai-gateway/modalities/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/embeddings"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings
summary: Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG) through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/embeddings.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "767e869f88c3fa34b5e513517ef456991e2cd9b0526afb4fd7c1813d3a52615e"
---

# Embeddings

Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG).

To see which models AI Gateway supports for embeddings, use the **Embedding** filter at the [AI Gateway Models page](https://vercel.com/ai-gateway/models?capabilities=embedding).

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
