---
title: Streaming
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming"
last_updated: 2026-07-27
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
summary: Stream OpenAI Chat Completions responses token by token as they are generated.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "ccd9f01560c1f34e9c75e74973faaaf085f352a6168f5d1eecd3375cab9866dc"
---

# Streaming

Set `stream: true` on a [chat completion](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions) request to receive tokens as the model produces them, instead of waiting for the complete response.

Create a streaming chat completion that streams tokens as they are generated.

#### cURL

```bash filename="stream.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Write a one-sentence bedtime story about a unicorn."
      }
    ],
    "stream": true
  }'
```

#### TypeScript

```typescript filename="streaming-chat.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'Write a one-sentence bedtime story about a unicorn.',
    },
  ],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

#### Python

```python filename="streaming-chat.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'Write a one-sentence bedtime story about a unicorn.'
        }
    ],
    stream=True,
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end='', flush=True)
```

## Streaming response format

Streaming responses are sent as [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), a web standard for real-time data streaming over HTTP. Each event contains a JSON object with the partial response data.

The response format follows the OpenAI streaming specification:

```http
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"anthropic/claude-opus-5","choices":[{"index":0,"delta":{"content":"Once"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"anthropic/claude-opus-5","choices":[{"index":0,"delta":{"content":" upon"},"finish_reason":null}]}

data: [DONE]
```

**Key characteristics:**

- Each line starts with `data:` followed by JSON
- Content is delivered incrementally in the `delta.content` field
- The stream ends with `data: [DONE]`
- Empty lines separate events

**SSE Parsing Libraries:**

If you're building custom SSE parsing (instead of using the OpenAI SDK), these libraries can help:

- **JavaScript/TypeScript**: [`eventsource-parser`](https://www.npmjs.com/package/eventsource-parser) - Robust SSE parsing with support for partial events
- **Python**: [`httpx-sse`](https://pypi.org/project/httpx-sse/) - SSE support for HTTPX, or [`sseclient-py`](https://pypi.org/project/sseclient-py/) for requests

For more details about the SSE specification, see the [W3C specification](https://html.spec.whatwg.org/multipage/server-sent-events.html).

## Next steps

- [Tool calling](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling) - Stream a response that calls your functions
- [Reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning) - Control how much a model thinks before answering
- [Advanced](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced) - Provider options and prompt caching


---

[View full sitemap](/docs/sitemap)
