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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "b4a4dc036c6b335364dd58b1e8ce9ee7ee6adc384fcdb2e5c48a5f5dc452bc74"
---

# OpenResponses Streaming with AI Gateway

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) supports streaming to receive tokens as they're generated instead of waiting for the complete response. Set `stream: true` in your request, then read the response body as a stream of server-sent events. Each event contains a response chunk that you can display incrementally.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Responses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming) — Stream tokens as they are generated with the OpenAI Responses API through AI Gateway.
- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway)
- [OpenAI Chat Completions Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming) — Stream OpenAI Chat Completions responses token by token as they are generated through AI Gateway.
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [Anthropic Messages Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming) — Stream Anthropic Messages API responses token by token as they are generated through AI Gateway.
- [OpenResponses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation) — Generate text responses using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/streaming.graph.md)
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
