---
title: Streaming
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Stream responses token by token using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d94aec25945e08e0a3d6971259fc33e4d251d1efb56da53f237fe9acc027952e"
---

# Streaming

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) supports streaming to receive tokens as they're generated instead of waiting for the complete response. Set `stream: true` in your request, then read the response body as a stream of server-sent events. Each event contains a response chunk that you can display incrementally.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related) — Stream tokens as they are generated with the OpenAI Responses API.
- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related) — Learn how to use the AI SDK to stream LLM responses.
- [Streaming in web applications](https://vercel.com/kb/guide/what-is-streaming?from=related) — Learn how streaming works in web applications. Explore benefits, use cases, and implementation details with Vercel Funct
- [Processing Data Chunks](https://vercel.com/kb/guide/processing-data-chunks?from=related) — Learn how to create an API endpoint that processes data chunks.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming?from=related) — Stream Anthropic Messages API responses token by token as they are generated.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming?from=related) — Stream OpenAI Chat Completions responses token by token as they are generated.
- [Streaming](https://vercel.com/docs/functions/streaming-functions?from=related) — Learn how to stream responses from Vercel Functions.
- [OpenAI Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/streaming.graph.md)
<!-- /docsgraph:related -->

#### \['cURL'

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

#### 'TypeScript'

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

#### 'Python']

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

## Streaming events

- `response.created` - Response initialized
- `response.output_text.delta` - Text chunk received
- `response.output_text.done` - Text generation complete
- `response.completed` - Full response complete with usage stats


---

[View full sitemap](/docs/sitemap)
