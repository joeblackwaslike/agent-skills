---
title: Streaming
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Stream tokens as they are generated with the OpenAI Responses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "74b426099d78c6f6b57edad962666e998c307afaea6402a336d237fea5e929e9"
---

# Streaming

Set `stream: true` to receive tokens as they're generated. The SDK returns an async iterator of server-sent events:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream responses token by token using the OpenResponses API.
- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how to use the AI SDK to stream LLM responses.
- [Streaming in web applications](https://vercel.com/kb/guide/what-is-streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how streaming works in web applications. Explore benefits, use cases, and implementation details with Vercel Funct
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream Anthropic Messages API responses token by token as they are generated.
- [An Introduction to Streaming on the Web](https://vercel.com/blog/an-introduction-to-streaming-on-the-web?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related)
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream OpenAI Chat Completions responses token by token as they are generated.
- [Streaming](https://vercel.com/docs/functions/streaming-functions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how to stream responses from Vercel Functions.
- [OpenResponses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/responses/streaming.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstreaming&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### cURL

```bash filename="stream.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "input": "Write a haiku about programming.",
    "stream": true
  }'
```

#### TypeScript

```typescript filename="stream.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await client.responses.create({
  model: 'openai/gpt-5.6-sol',
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
    model='openai/gpt-5.6-sol',
    input='Write a haiku about programming.',
    stream=True,
)

for event in stream:
    if event.type == 'response.output_text.delta':
        print(event.delta, end='', flush=True)
```


---

[View full sitemap](/docs/sitemap)
