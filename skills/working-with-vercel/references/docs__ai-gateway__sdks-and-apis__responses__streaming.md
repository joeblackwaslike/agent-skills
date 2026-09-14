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
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "5c482301323f027ca9a9e15b7086ae4c933a8e39329ea87705785a90c550bafd"
---

# OpenAI Responses Streaming with AI Gateway

Set `stream: true` to receive tokens as they're generated. The SDK returns an async iterator of server-sent events:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenResponses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream responses token by token using the OpenResponses API through AI Gateway.
- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how to use the AI SDK to stream LLM responses.
- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related)
- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related)
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [OpenResponses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/responses/streaming.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=graph)
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
