---
title: OpenAI-Compatible Embeddings API with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/modalities/embeddings
summary: Generate vector embeddings with the OpenAI-compatible /embeddings endpoint through Vercel AI Gateway, including the dimensions parameter and response...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "f51d739264e87da0faa5faa69a4c144d5b10832469fc99d5e144b9809ec57626"
---

# OpenAI-Compatible Embeddings API with AI Gateway

Generate vector embeddings from input text using the OpenAI-compatible `/embeddings` endpoint, for semantic search, similarity matching, and retrieval-augmented generation (RAG).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Embeddings](https://ai-sdk.dev/docs/ai-sdk-core/embeddings?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fembeddings&source_site=vercel-docs&relationship=related)
- [OpenResponses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fembeddings&source_site=vercel-docs&relationship=related) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fembeddings&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fembeddings&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fembeddings&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fembeddings&source_site=vercel-docs&relationship=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fembeddings&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For an overview of embedding models and the AI SDK (`embed`, `embedMany`), see [Embeddings](/docs/ai-gateway/modalities/embeddings). This page covers the OpenAI-compatible REST endpoint.

Endpoint

```
POST /embeddings
```

Example request

#### TypeScript

```typescript filename="embeddings.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await openai.embeddings.create({
  model: 'openai/text-embedding-3-small',
  input: 'Sunny day at the beach',
});

console.log(response.data[0].embedding);
```

#### Python

```python filename="embeddings.py"
import os
from openai import OpenAI

api_key = os.getenv("AI_GATEWAY_API_KEY") or os.getenv("VERCEL_OIDC_TOKEN")

client = OpenAI(
    api_key=api_key,
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.embeddings.create(
    model="openai/text-embedding-3-small",
    input="Sunny day at the beach",
)

print(response.data[0].embedding)
```

#### cURL

```bash filename="embeddings.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/embeddings" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/text-embedding-3-small",
    "input": "Sunny day at the beach"
  }'
```

Response format

The following response truncates the embedding vector for readability:

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [-0.0038, 0.021]
    }
  ],
  "model": "openai/text-embedding-3-small",
  "usage": {
    "prompt_tokens": 6,
    "total_tokens": 6
  },
  "providerMetadata": {
    "gateway": {
      "routing": {},
      "cost": "0.00000012"
    }
  }
}
```

Dimensions parameter

You can set the root-level `dimensions` field (from the [OpenAI Embeddings API spec](https://platform.openai.com/docs/api-reference/embeddings/create)) and the gateway will auto-map it to each provider's expected field; `providerOptions.[provider]` still passes through as-is and isn't required for `dimensions` to work.

#### TypeScript

```typescript filename="embeddings-dimensions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await openai.embeddings.create({
  model: 'openai/text-embedding-3-small',
  input: 'Sunny day at the beach',
  dimensions: 768,
});
```

#### Python

```python filename="embeddings-dimensions.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.embeddings.create(
    model='openai/text-embedding-3-small',
    input='Sunny day at the beach',
    dimensions=768,
)
```

#### cURL

```bash filename="embeddings-dimensions.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/embeddings" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/text-embedding-3-small",
    "input": "Sunny day at the beach",
    "dimensions": 768
  }'
```


---

[View full sitemap](/docs/sitemap)
