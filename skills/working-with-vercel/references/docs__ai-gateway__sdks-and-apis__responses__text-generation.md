---
title: OpenAI Responses Text Generation with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/text-generation
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Generate text responses with the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "9e0ed2cf8172ccac75d0c08227caaf27a2358d05d75f7045ee31698819b6e18b"
---

# OpenAI Responses Text Generation with AI Gateway

Set your SDK's base URL to AI Gateway and use your API key for authentication:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api)
- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway)
- [OpenResponses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation) — Generate text responses using the OpenResponses API through AI Gateway.
- [OpenResponses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [OpenAI Responses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming) — Stream tokens as they are generated with the OpenAI Responses API through AI Gateway.
- [AI Gateway Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text) — Generate and stream text responses using AI Gateway.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/text-generation.graph.md](/docs/ai-gateway/sdks-and-apis/responses/text-generation.graph.md)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="basic.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'What is the capital of France?',
});

console.log(response.output_text);
```

#### Python

```python filename="basic.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='anthropic/claude-sonnet-5',
    input='What is the capital of France?',
)

print(response.output_text)
```

#### cURL

```bash filename="basic.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "input": "What is the capital of France?"
  }'
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
