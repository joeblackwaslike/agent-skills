---
title: Cohere Rerank API
product: vercel
url: /docs/ai-gateway/sdks-and-apis/cohere-rerank
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/cohere-rerank"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/modalities/reranking
summary: Use the Cohere-compatible Rerank API with AI Gateway to reorder documents by relevance with the Cohere SDK or plain HTTP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/cohere-rerank.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6d469e297e21f95f555d1d85e31a22b71c00ac96266d66ab2f5fc8d4fa864185"
---

# Cohere Rerank API

AI Gateway provides Cohere-compatible Rerank API endpoints, so you can use the [Cohere SDK](https://docs.cohere.com/reference/about) or plain HTTP requests to rerank documents through a unified gateway with only a URL change.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reranking](https://ai-sdk.dev/docs/ai-sdk-core/reranking?from=related)
- [rerank](https://ai-sdk.dev/docs/reference/ai-sdk-core/rerank?from=related)
- [Cohere](https://ai-sdk.dev/providers/ai-sdk-providers/cohere?from=related)
- [Voyage AI](https://ai-sdk.dev/providers/ai-sdk-providers/voyage?from=related)
- [Together.ai](https://ai-sdk.dev/providers/ai-sdk-providers/togetherai?from=related)
- [Models & Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related) — Work with models and providers in AI Gateway: provider routing and fallbacks, filtering, timeouts, caching, service tier
- [Filtering, Ordering & Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related) — Control which providers handle your requests, in what order, and how they are ranked using order, only, and sort options

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/cohere-rerank.graph.md](/docs/ai-gateway/sdks-and-apis/cohere-rerank.graph.md)
<!-- /docsgraph:related -->

Reranking reorders a list of documents by their relevance to a query. It is commonly used to improve results in retrieval-augmented generation (RAG) pipelines after an initial retrieval step. To see which models support reranking, use the **Reranking** filter on the [models page](/ai-gateway/models?capabilities=reranking).

The Rerank API implements the same specification as the [Cohere Rerank API](https://docs.cohere.com/reference/rerank).

## Base URL

The Rerank API is available at the following base URL:

```
https://ai-gateway.vercel.sh
```

The Cohere SDK appends the version path (`/v1/rerank` or `/v2/rerank`) to this base URL, so configure the SDK with the bare host.

## Authentication

The Rerank API supports the same authentication methods as the main AI Gateway:

- **API key**: Use your AI Gateway API key with the `Authorization: Bearer <token>` header
- **OIDC token**: Use your Vercel OIDC token with the `Authorization: Bearer <token>` header

You only need one of these. If an API key is specified it takes precedence over any OIDC token, even if the API key is invalid.

## Supported endpoints

The AI Gateway supports both versions of the Cohere Rerank API:

- `POST /v2/rerank` - The current Cohere Rerank API dialect. This is what the Cohere v2 SDK clients use.
- `POST /v1/rerank` - The earlier Cohere Rerank API dialect. It additionally supports object documents, `rank_fields`, and `return_documents`.

Both endpoints accept the same model slugs and return the same response shape.

## Parameters

### Required parameters

- `model` (string): The reranking model to use (for example, `cohere/rerank-v3.5`)
- `query` (string): The search query to rank documents against
- `documents` (array): The documents to rank. On `/v2/rerank` these are strings. On `/v1/rerank` they can be strings or objects.

### Optional parameters

- `top_n` (integer): The number of top results to return. Defaults to returning all documents.
- `max_tokens_per_doc` (integer): Long documents are truncated to this many tokens.
- `return_documents` (boolean, `/v1/rerank`): When `true`, each result includes the original document. Defaults to `false`.
- `rank_fields` (array of strings, `/v1/rerank`): For object documents, the fields to rank on, in order. Defaults to the `text` field.

## Response

The response contains a ranked list of results, ordered by relevance:

```json
{
  "id": "gen_01J...",
  "results": [
    { "index": 1, "relevance_score": 0.999071 },
    { "index": 0, "relevance_score": 0.32713068 }
  ],
  "meta": {
    "api_version": { "version": "2" },
    "billed_units": { "search_units": 1 }
  }
}
```

- `results[].index` (integer): The position of the document in the original `documents` array
- `results[].relevance_score` (number): A relevance score normalized to the range `[0, 1]`. The scale is not linear: a score of 0.9 does not mean a document is twice as relevant as one scored 0.45.
- `results[].document` (object): The original document, included only when `return_documents` is `true` on `/v1/rerank`
- `meta.billed_units.search_units` (number): The number of billed search units. One search unit covers up to 100 documents.

## Example request

#### cURL

```bash filename="rerank.sh"
curl https://ai-gateway.vercel.sh/v2/rerank \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "cohere/rerank-v3.5",
    "query": "What is the capital of the United States?",
    "documents": [
      "Carson City is the capital city of the American state of Nevada.",
      "Washington, D.C. is the capital of the United States.",
      "Capital punishment has existed in the United States since before it was a country."
    ],
    "top_n": 2
  }'
```

#### TypeScript

```typescript filename="rerank.ts"
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.AI_GATEWAY_API_KEY,
  environment: 'https://ai-gateway.vercel.sh',
});

const response = await cohere.v2.rerank({
  model: 'cohere/rerank-v3.5',
  query: 'What is the capital of the United States?',
  documents: [
    'Carson City is the capital city of the American state of Nevada.',
    'Washington, D.C. is the capital of the United States.',
    'Capital punishment has existed in the United States since before it was a country.',
  ],
  topN: 2,
});

console.log(response.results);
```

#### Python

```python filename="rerank.py"
import os
import cohere

co = cohere.ClientV2(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh',
)

response = co.rerank(
    model='cohere/rerank-v3.5',
    query='What is the capital of the United States?',
    documents=[
        'Carson City is the capital city of the American state of Nevada.',
        'Washington, D.C. is the capital of the United States.',
        'Capital punishment has existed in the United States since before it was a country.',
    ],
    top_n=2,
)

print(response.results)
```

## Object documents and `return_documents`

The `/v1/rerank` endpoint accepts object documents. Use `rank_fields` to choose which fields to rank on, and `return_documents` to echo the original documents back in the response:

```bash filename="rerank-v1.sh"
curl https://ai-gateway.vercel.sh/v1/rerank \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "cohere/rerank-v3.5",
    "query": "What is the capital of the United States?",
    "documents": [
      { "title": "Nevada", "text": "Carson City is the capital city of Nevada." },
      { "title": "USA", "text": "Washington, D.C. is the capital of the United States." }
    ],
    "rank_fields": ["title", "text"],
    "return_documents": true,
    "top_n": 2
  }'
```

## Provider routing

You can control which provider serves the request with `providerOptions.gateway`, the same way as other AI Gateway APIs. For example, restrict the request to a specific provider:

```json
{
  "model": "cohere/rerank-v3.5",
  "query": "What is the capital of the United States?",
  "documents": ["..."],
  "providerOptions": {
    "gateway": {
      "only": ["bedrock"]
    }
  }
}
```

See [provider options](/docs/ai-gateway/models-and-providers/provider-options) for the full list, including provider filtering, ordering, and model fallbacks.

> **💡 Note:** To rank with an Amazon Bedrock reranking model using your own credentials
> (BYOK), use SigV4 credentials (`accessKeyId` and `secretAccessKey`). The
> Bedrock rerank API uses the `bedrock-agent-runtime` endpoint, which does not
> accept Bedrock API keys.

## Using the AI SDK instead

If you use the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk), call reranking models with the `rerank` function instead of the REST API. See [Reranking](/docs/ai-gateway/modalities/reranking) for details.

## Error handling

The API returns standard HTTP status codes. Errors follow the Cohere error format:

```json
{
  "message": "invalid request: query: too_small"
}
```

### Common error codes

- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Invalid or missing authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Model or endpoint not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error


---

[View full sitemap](/docs/sitemap)
