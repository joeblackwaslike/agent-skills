---
title: AI Gateway Embeddings
product: vercel
url: /docs/ai-gateway/modalities/embeddings
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/embeddings"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings
  - /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
summary: Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG) through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/embeddings.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "b4c13c44f819c053ec7ff24dd48068c629180f10095eea7adbb9778b9f845394"
---

# AI Gateway Embeddings

Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation (RAG).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Image Generation](https://vercel.com/docs/ai-gateway/modalities/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fembeddings&source_site=vercel-docs&relationship=related) — Generate and edit images using AI models through Vercel AI Gateway with support for multiple providers and modalities.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fembeddings&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fembeddings&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fembeddings&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [AI Gateway Framework Integrations](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fembeddings&source_site=vercel-docs&relationship=related) — Connect LangChain, LiteLLM, LlamaIndex, Mastra, Pydantic AI, TanStack AI, and other frameworks to Vercel AI Gateway with

Full cross-link map for this page: [/docs/ai-gateway/modalities/embeddings.graph.md](/docs/ai-gateway/modalities/embeddings.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fembeddings&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To see which models AI Gateway supports for embeddings, use the **Embedding** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=embedding).

Use AI SDK 7, the AI SDK for Python beta, [TanStack AI](#tanstack-ai), or the [OpenAI-compatible Embeddings API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings). Embeddings use `/v1/embeddings`; Chat Completions, Messages, and Responses don't accept embedding requests. Set `AI_GATEWAY_API_KEY` before running the examples.

## Single value

For SDK options and result types, see [AI SDK embeddings](https://ai-sdk.dev/docs/ai-sdk-core/embeddings) and [Python embeddings](https://ai-python.dev/docs/basics/model-operations#embed-text).

#### AI SDK

#### TypeScript

```typescript filename="app/api/embed/route.ts" {5-6}
import { embed } from 'ai';

export async function GET() {
  const result = await embed({
    model: 'openai/text-embedding-3-small',
    value: 'Sunny day at the beach',
  });

  return Response.json(result);
}
```

#### Python (beta)

```python filename="embed.py" {6-7}
import asyncio
import ai

async def main():
    result = await ai.ops.embed(
        ai.get_model('openai/text-embedding-3-small'),
        ["Sunny day at the beach"],
    )
    print(result.value)

asyncio.run(main())
```

#### OpenAI Embeddings

#### TypeScript

```typescript filename="embed-rest.ts" {8-9}
const response = await fetch('https://ai-gateway.vercel.sh/v1/embeddings', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/text-embedding-3-small',
    input: ['Sunny day at the beach'],
  }),
});
if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
```

#### Python

```python filename="embed-rest.py" {7}
import json
import os
import urllib.request

request = urllib.request.Request(
    "https://ai-gateway.vercel.sh/v1/embeddings",
    data=json.dumps({"model": "openai/text-embedding-3-small", "input": ["Sunny day at the beach"]}).encode(),
    headers={
        'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"],
        'Content-Type': "application/json"
    },
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="embed-rest.sh" {5-8}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/embeddings \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "openai/text-embedding-3-small",
  "input": [
    "Sunny day at the beach"
  ]
}'
```

## Multiple values

#### AI SDK

#### TypeScript

```typescript filename="app/api/embed/route.ts" {5-6}
import { embedMany } from 'ai';

export async function GET() {
  const result = await embedMany({
    model: 'openai/text-embedding-3-small',
    values: ['Sunny day at the beach', 'Cloudy city skyline'],
  });

  return Response.json(result);
}
```

#### Python (beta)

```python filename="embed-many.py" {6-7}
import asyncio
import ai

async def main():
    result = await ai.ops.embed(
        ai.get_model('openai/text-embedding-3-small'),
        ["Sunny day at the beach", "Cloudy city skyline"],
    )
    print(result.value)

asyncio.run(main())
```

#### OpenAI Embeddings

#### TypeScript

```typescript filename="embed-many-rest.ts" {8-9}
const response = await fetch('https://ai-gateway.vercel.sh/v1/embeddings', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/text-embedding-3-small',
    input: ['Sunny day at the beach', 'Cloudy city skyline'],
  }),
});
if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
```

#### Python

```python filename="embed-many-rest.py" {7}
import json
import os
import urllib.request

request = urllib.request.Request(
    "https://ai-gateway.vercel.sh/v1/embeddings",
    data=json.dumps({"model": "openai/text-embedding-3-small", "input": ["Sunny day at the beach", "Cloudy city skyline"]}).encode(),
    headers={
        'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"],
        'Content-Type': "application/json"
    },
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="embed-many-rest.sh" {5-9}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/embeddings \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "openai/text-embedding-3-small",
  "input": [
    "Sunny day at the beach",
    "Cloudy city skyline"
  ]
}'
```

## Gateway provider instance

Alternatively, if you're using the Gateway provider instance, specify embedding models with `gateway.textEmbeddingModel(...)`.

```typescript filename="app/api/embed/route.ts" {6-7}
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

## TanStack AI

Use TanStack AI's `embed` function with `vercelGatewayEmbedding` from `@tanstack/ai-vercel-gateway` to generate embeddings. The adapter reads `AI_GATEWAY_API_KEY`, or uses `VERCEL_OIDC_TOKEN` when the API key is absent.

Follow the [TanStack AI setup guide](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) for installation and authentication, then use the [embedding example](/kb/guide/tanstack-ai-vercel-ai-gateway#generate-embeddings). See the [TanStack AI adapter reference](https://tanstack.com/ai/latest/docs/adapters/vercel-gateway#embeddings) for the API and result shape.


---

[View full sitemap](/docs/sitemap)
