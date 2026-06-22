---
title: Embeddings
product: vercel
url: /docs/ai-gateway/modalities/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/embeddings"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings
summary: Learn about embeddings on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/embeddings.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "7465ae6190ecc3d6806a4eb8606ba0ed72514c6bd154115bc17aeb46b268cc84"
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
