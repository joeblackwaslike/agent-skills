---
title: Embeddings
product: vercel
url: /docs/ai-gateway/capabilities/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/capabilities/embeddings"
last_updated: 2026-04-15
type: conceptual
prerequisites:
  - /docs/ai-gateway/capabilities
  - /docs/ai-gateway
related:
  []
summary: Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG) through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/capabilities/embeddings.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5a1d76da7fc91d2b18be1625a178f8f2e49c0d9fce31e3211ad8f2897a074f93"
---

# Embeddings

Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG).

To see which models AI Gateway supports for embeddings, use the **Embedding** filter at the [AI Gateway Models page](https://vercel.com/ai-gateway/models?capabilities=embedding).

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
