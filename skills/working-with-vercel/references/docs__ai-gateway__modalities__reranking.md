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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "0a0d134f558630573ec1203223936c208f254d50a76770ad06a6fab01914985c"
---

# Reranking

Rerank documents by relevance to a search query. Reranking is useful for improving search results in retrieval-augmented generation (RAG) pipelines by re-scoring candidate documents after an initial retrieval step.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Production architecture for a RAG chatbot on Vercel](https://vercel.com/kb/guide/rag-chatbot-production-architecture-on-vercel?from=related) — Architect a production RAG chatbot on Vercel Functions with Fluid compute, AI Gateway, and a region-pinned vector store.
- [Reranking](https://ai-sdk.dev/docs/ai-sdk-core/reranking?from=related)
- [rerank](https://ai-sdk.dev/docs/reference/ai-sdk-core/rerank?from=related)
- [Cohere Rerank API](https://vercel.com/docs/ai-gateway/sdks-and-apis/cohere-rerank?from=related) — Use the Cohere-compatible Rerank API with AI Gateway to reorder documents by relevance with the Cohere SDK or plain HTTP
- [Cohere](https://ai-sdk.dev/providers/ai-sdk-providers/cohere?from=related)
- [Voyage AI](https://ai-sdk.dev/providers/ai-sdk-providers/voyage?from=related)
- [Together.ai](https://ai-sdk.dev/providers/ai-sdk-providers/togetherai?from=related)
- [Routing Rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules?from=related) — Define team-wide rules that rewrite requests from one model to another or deny specific models in AI Gateway.
- [Embeddings](https://vercel.com/docs/ai-gateway/modalities/embeddings?from=related) — Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation \(RAG\) through
- [Filtering, Ordering & Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related) — Control which providers handle your requests, in what order, and how they are ranked using order, only, and sort options
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced?from=related) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching.

Full cross-link map for this page: [/docs/ai-gateway/modalities/reranking.graph.md](/docs/ai-gateway/modalities/reranking.graph.md)
<!-- /docsgraph:related -->

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
