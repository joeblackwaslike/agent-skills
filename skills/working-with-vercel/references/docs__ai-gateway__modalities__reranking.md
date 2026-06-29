---
title: Reranking
product: vercel
url: /docs/ai-gateway/modalities/reranking
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/reranking"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  []
summary: Rerank documents by relevance to a search query for improved retrieval-augmented generation (RAG) pipelines through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/reranking.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "137b4b28d5fe2618a9a3e9d9c7fefbcdc12ee2cf4d195aee4d2729300662e46a"
---

# Reranking

Rerank documents by relevance to a search query. Reranking is useful for improving search results in retrieval-augmented generation (RAG) pipelines by re-scoring candidate documents after an initial retrieval step.

To see which models AI Gateway supports for reranking, use the **Reranking** filter at the [AI Gateway Models page](https://vercel.com/ai-gateway/models?capabilities=reranking).

## Basic usage

```typescript filename="app/api/rerank/route.ts" {5-12}
import { rerank } from 'ai';

export async function GET() {
  const result = await rerank({
    model: 'cohere/rerank-v3.5',
    query: 'What is the capital of France?',
    documents: [
      'Paris is the capital of France.',
      'Berlin is the capital of Germany.',
      'Madrid is the capital of Spain.',
    ],
    topN: 2,
  });

  return Response.json(result.ranking);
}
```

The `rerank` function returns a `ranking` array sorted by relevance score, along with the `rerankedDocuments` in order:

```typescript
// result.ranking
[
  { originalIndex: 0, score: 0.89, document: 'Paris is the capital of France.' },
  { originalIndex: 2, score: 0.15, document: 'Madrid is the capital of Spain.' },
]

// result.rerankedDocuments
['Paris is the capital of France.', 'Madrid is the capital of Spain.']
```

## Gateway provider instance

If you're using the Gateway provider instance, specify reranking models with `gateway.rerankingModel(...)`.

```typescript filename="app/api/rerank/route.ts" {2,6}
import { rerank } from 'ai';
import { gateway } from '@ai-sdk/gateway';

export async function GET() {
  const result = await rerank({
    model: gateway.rerankingModel('cohere/rerank-v3.5'),
    query: 'What is the capital of France?',
    documents: [
      'Paris is the capital of France.',
      'Berlin is the capital of Germany.',
      'Madrid is the capital of Spain.',
    ],
    topN: 2,
  });

  return Response.json(result.ranking);
}
```

> **💡 Note:** Reranking models are available through the AI SDK only. They are not supported
> through the OpenAI-compatible or Anthropic-compatible endpoints.


---

[View full sitemap](/docs/sitemap)
