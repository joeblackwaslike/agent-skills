---
title: AI Gateway Reranking
product: vercel
url: /docs/ai-gateway/modalities/reranking
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/reranking"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/cohere-rerank
summary: Rerank documents by relevance to a search query for improved retrieval-augmented generation (RAG) pipelines through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/reranking.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "beff44b5619da86dcf0f16b7dfa112ca0a65209bf0a68777b9e256bc1958bff7"
---

# AI Gateway Reranking

Rerank documents by relevance to a search query. Reranking is useful for improving search results in retrieval-augmented generation (RAG) pipelines by re-scoring candidate documents after an initial retrieval step.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Production architecture for a RAG chatbot on Vercel](https://vercel.com/kb/guide/rag-chatbot-production-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related) — Architect a production RAG chatbot on Vercel Functions with Fluid compute, AI Gateway, and a region-pinned vector store.
- [Cohere Rerank API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/cohere-rerank?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related) — Use the Cohere-compatible Rerank API with AI Gateway to reorder documents by relevance with the Cohere SDK or plain HTTP
- [rerank](https://ai-sdk.dev/docs/reference/ai-sdk-core/rerank?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related)
- [Cohere](https://ai-sdk.dev/providers/ai-sdk-providers/cohere?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related)
- [Voyage AI](https://ai-sdk.dev/providers/ai-sdk-providers/voyage?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related)
- [Together.ai](https://ai-sdk.dev/providers/ai-sdk-providers/togetherai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related)
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/modalities/reranking.graph.md](/docs/ai-gateway/modalities/reranking.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Freranking&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To see which models AI Gateway supports for reranking, use the **Reranking** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=reranking).

> **💡 Note:** Reranking is also available through the Cohere-compatible [Cohere Rerank
> API](/docs/ai-gateway/sdks-and-apis/cohere-rerank) (`/v1/rerank` and
> `/v2/rerank`), for use with the Cohere SDK or plain HTTP.

## Basic usage

For SDK options and result types, see [AI SDK reranking](https://ai-sdk.dev/docs/ai-sdk-core/reranking) and [Python reranking](https://ai-python.dev/docs/basics/model-operations#rerank-documents).

#### AI SDK

#### TypeScript

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

#### Python (beta)

```python filename="rerank.py"
import asyncio
import ai

async def main():
    result = await ai.ops.rerank(
        ai.get_model('cohere/rerank-v3.5'),
        ["Paris is the capital of France.", "Berlin is the capital of Germany.", "Madrid is the capital of Spain."],
        'What is the capital of France?',
        params=ai.ops.RerankParams(top_n=2),
    )
    print(result.value)

asyncio.run(main())
```

#### Cohere Rerank

#### TypeScript

```typescript filename="rerank-rest.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v2/rerank', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'cohere/rerank-v3.5',
    query: 'What is the capital of France?',
    documents: [
      'Paris is the capital of France.',
      'Berlin is the capital of Germany.',
      'Madrid is the capital of Spain.',
    ],
    top_n: 2,
  }),
});
if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
```

#### Python

```python filename="rerank-rest.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    "https://ai-gateway.vercel.sh/v2/rerank",
    data=json.dumps({"model": "cohere/rerank-v3.5", "query": "What is the capital of France?", "documents": ["Paris is the capital of France.", "Berlin is the capital of Germany.", "Madrid is the capital of Spain."], "top_n": 2}).encode(),
    headers={
        'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"],
        'Content-Type': "application/json"
    },
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="rerank-rest.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v2/rerank \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "cohere/rerank-v3.5",
  "query": "What is the capital of France?",
  "documents": [
    "Paris is the capital of France.",
    "Berlin is the capital of Germany.",
    "Madrid is the capital of Spain."
  ],
  "top_n": 2
}'
```

The `rerank` function returns a `ranking` array sorted by relevance score, along with the `rerankedDocuments` in order:

```typescript
// result.ranking
[
  { originalIndex: 0, score: 0.89, document: 'Paris is the capital of France.' },
  { originalIndex: 2, score: 0.15, document: 'Madrid is the capital of Spain.' },
];

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
