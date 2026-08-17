---
title: Streaming
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming"
last_updated: 2026-07-28
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1a22be53acec24ab80a0c82355f2791300091024b26bc087daa4cca194136a8d"
---

# Streaming

Set `stream: true` on a [chat completion](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions) request to receive tokens as the model produces them, instead of waiting for the complete response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related) — Learn how to use the AI SDK to stream LLM responses.
- [Streaming in web applications](https://vercel.com/kb/guide/what-is-streaming?from=related) — Learn how streaming works in web applications. Explore benefits, use cases, and implementation details with Vercel Funct
- [Streaming](https://chat-sdk.dev/docs/streaming?from=related) — Stream real-time text responses from AI models and other async sources to chat platforms.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming?from=related) — Stream Anthropic Messages API responses token by token as they are generated.
- [Stream Protocols](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol?from=related)
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related) — Stream responses token by token using the OpenResponses API.
- [Stream Text with Chat Prompt](https://ai-sdk.dev/cookbook/next/stream-text-with-chat-prompt?from=related)
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related) — Stream tokens as they are generated with the OpenAI Responses API.
- [Streaming](https://vercel.com/docs/functions/streaming-functions?from=related) — Learn how to stream responses from Vercel Functions.
- [Structured Outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs?from=related) — Generate structured JSON responses that conform to a specific schema using the Chat Completions API.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming.graph.md)
<!-- /docsgraph:related -->

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
