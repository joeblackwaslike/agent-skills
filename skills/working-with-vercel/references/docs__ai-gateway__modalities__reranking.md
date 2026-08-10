---
title: Reranking
product: vercel
url: /docs/ai-gateway/modalities/reranking
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/reranking"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/cohere-rerank
summary: Rerank documents by relevance to a search query for improved retrieval-augmented generation (RAG) pipelines through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/reranking.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "a589d2266cc7fc0ec4cb8c2600257775e1d235e86493047859c0e72e37f0551c"
---

# Reranking

Rerank documents by relevance to a search query. Reranking is useful for improving search results in retrieval-augmented generation (RAG) pipelines by re-scoring candidate documents after an initial retrieval step.

To see which models AI Gateway supports for reranking, use the **Reranking** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=reranking).

> **💡 Note:** Reranking is also available through the Cohere-compatible [Cohere Rerank
> API](/docs/ai-gateway/sdks-and-apis/cohere-rerank) (`/v1/rerank` and
> `/v2/rerank`), for use with the Cohere SDK or plain HTTP.

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

> **💡 Note:** Reranking is available through the AI SDK and through the Cohere-compatible
> `/v1/rerank` and `/v2/rerank` REST endpoints. It is not supported through the
> OpenAI-compatible or Anthropic-compatible endpoints.

> **💡 Note:** Amazon Bedrock reranking requires SigV4 credentials (`accessKeyId` and
> `secretAccessKey`) and does not accept API keys. If you BYOK and plan to use
> reranking models through Bedrock, you must use SigV4 credentials.


---

[View full sitemap](/docs/sitemap)
