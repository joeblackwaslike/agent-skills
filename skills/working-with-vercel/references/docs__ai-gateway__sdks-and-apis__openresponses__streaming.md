---
title: OpenResponses Streaming with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Stream responses token by token using the OpenResponses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "a2c2dce84ba41a81885d9c26444a40add34302591ada72122f89cc3285f9ecf1"
---

# OpenResponses Streaming with AI Gateway

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) supports streaming to receive tokens as they're generated instead of waiting for the complete response. Set `stream: true` in your request, then read the response body as a stream of server-sent events. Each event contains a response chunk that you can display incrementally.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Responses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream tokens as they are generated with the OpenAI Responses API through AI Gateway.
- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how to use the AI SDK to stream LLM responses.
- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=related)
- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=related)
- [OpenAI Chat Completions Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream OpenAI Chat Completions responses token by token as they are generated through AI Gateway.
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [Streaming](https://vercel.com/docs/functions/streaming-functions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how to stream responses from Vercel Functions.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/streaming.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstreaming&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="stream.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'google/gemini-3.1-pro-preview',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Write a haiku about debugging code.',
      },
    ],
    stream: true,
  }),
});

if (!response.ok || !response.body) throw new Error(await response.text());
const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });

  // Keep the trailing fragment in the buffer: a read can end mid-line, and
  // parsing a half-received event throws.
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';

  for (const line of lines) {
    if (!line.startsWith('data:')) continue;
    const data = line.slice(5).trim();
    if (!data || data === '[DONE]') continue;

    const event = JSON.parse(data);
    if (event.type === 'response.output_text.delta') {
      process.stdout.write(event.delta);
    }
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
    model='google/gemini-3.1-pro-preview',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': 'Write a haiku about debugging code.',
        },
    ],
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
    "model": "google/gemini-3.1-pro-preview",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "Write a haiku about debugging code."
      }
    ],
    "stream": true
  }'
```

## Streaming events

- `response.created` - Response initialized
- `response.output_text.delta` - Text chunk received
- `response.output_text.done` - Text generation complete
- `response.completed` - Full response complete with usage stats


---

[View full sitemap](/docs/sitemap)
