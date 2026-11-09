---
title: OpenAI Responses Streaming with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Stream tokens as they are generated with the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "453554f57933240254db7f9134774cdee7b8bb5a046bdd90a3a391b987a110cd"
---

# OpenAI Responses Streaming with AI Gateway

Set `stream: true` to receive tokens as they're generated. The SDK returns an async iterator of server-sent events:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenResponses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming) — Stream responses token by token using the OpenResponses API through AI Gateway.
- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway)
- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api)
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [OpenResponses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [OpenAI Chat Completions Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming) — Stream OpenAI Chat Completions responses token by token as they are generated through AI Gateway.
- [AI Gateway OIDC Authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc) — Authenticate AI Gateway requests from Vercel deployments with OIDC tokens. Configure the AI SDK or send bearer tokens di

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/responses/streaming.graph.md)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="stream.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: 'Write a haiku about programming.',
  stream: true,
});

for await (const event of stream) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  }
}
```

#### Python

```python filename="stream.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

stream = client.responses.create(
    model='openai/gpt-6-astra',
    input='Write a haiku about programming.',
    stream=True,
)

for event in stream:
    if event.type == 'response.output_text.delta':
        print(event.delta, end='', flush=True)
```

#### cURL

```bash filename="stream.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": "Write a haiku about programming.",
    "stream": true
  }'
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
