---
title: Embeddings
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings"
last_updated: 2026-03-07
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Generate vector embeddings from input text for semantic search, similarity matching, and RAG applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "9e253434d616e2eeafd98dd8d170dce2409fa43d3f24bc10e600f9a3e6fe27e9"
---

# Embeddings

Generate vector embeddings from input text for semantic search, similarity matching, and retrieval-augmented generation (RAG).

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

#### TypeScript

```typescript filename="embeddings-dimensions.ts"
const response = await openai.embeddings.create({
  model: 'openai/text-embedding-3-small',
  input: 'Sunny day at the beach',
  dimensions: 768,
});
```

#### Python

```python filename="embeddings-dimensions.py"
response = client.embeddings.create(
    model='openai/text-embedding-3-small',
    input='Sunny day at the beach',
    dimensions=768,
)
```


---

[View full sitemap](/docs/sitemap)
