---
title: Embeddings with the OpenAI-Compatible API
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/modalities/embeddings
summary: Generate vector embeddings with the OpenAI-compatible /embeddings endpoint through Vercel AI Gateway, including the dimensions parameter and response...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "77ed1805fee793e1e201ea8b3ddb94e93b86c489450c21538b631769cf46f585"
---

# Embeddings with the OpenAI-Compatible API

Generate vector embeddings from input text using the OpenAI-compatible `/embeddings` endpoint, for semantic search, similarity matching, and retrieval-augmented generation (RAG).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Embeddings](https://ai-sdk.dev/docs/ai-sdk-core/embeddings?from=related)
- [OpenResponses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses?from=related) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [Images](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [Images](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related) — Send images and PDF documents for analysis using the OpenResponses API.
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings.graph.md)
<!-- /docsgraph:related -->

For an overview of embedding models and the AI SDK (`embed`, `embedMany`), see [Embeddings](/docs/ai-gateway/modalities/embeddings). This page covers the OpenAI-compatible REST endpoint.

Endpoint

```
POST /embeddings
```

Example request

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

Response format

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [-0.0038, 0.021, ...]
    },
  ],
  "model": "openai/text-embedding-3-small",
  "usage": {
    "prompt_tokens": 6,
    "total_tokens": 6
  },
  "providerMetadata": {
    "gateway": {
      "routing": { ... }, // Detailed routing info
      "cost": "0.00000012"
    }
  }
}
```

Dimensions parameter

You can set the root-level `dimensions` field (from the [OpenAI Embeddings API spec](https://platform.openai.com/docs/api-reference/embeddings/create)) and the gateway will auto-map it to each provider's expected field; `providerOptions.[provider]` still passes through as-is and isn't required for `dimensions` to work.

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


---

[View full sitemap](/docs/sitemap)
