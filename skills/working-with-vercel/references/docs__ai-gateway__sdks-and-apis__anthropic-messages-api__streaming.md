---
title: Streaming
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced
summary: Stream Anthropic Messages API responses token by token as they are generated.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4015ecba499b3114f240124482d895041a9c0d3be2e98fa7877fec2e3be53df4"
---

# Streaming

Set `stream: true` on a [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages) request to receive tokens as the model produces them, instead of waiting for the complete response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related) — Learn how to use the AI SDK to stream LLM responses.
- [Streaming in web applications](https://vercel.com/kb/guide/what-is-streaming?from=related) — Learn how streaming works in web applications. Explore benefits, use cases, and implementation details with Vercel Funct
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming?from=related) — Stream OpenAI Chat Completions responses token by token as they are generated.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related) — Stream responses token by token using the OpenResponses API.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related) — Stream tokens as they are generated with the OpenAI Responses API.
- [Streaming](https://chat-sdk.dev/docs/streaming?from=related) — Stream real-time text responses from AI models and other async sources to chat platforms.
- [Processing Data Chunks](https://vercel.com/kb/guide/processing-data-chunks?from=related) — Learn how to create an API endpoint that processes data chunks.
- [Stream Protocols](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol?from=related)
- [Streaming](https://vercel.com/docs/functions/streaming-functions?from=related) — Learn how to stream responses from Vercel Functions.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming.graph.md)
<!-- /docsgraph:related -->

Create a streaming message that delivers tokens as they are generated.

#### cURL

```bash filename="stream.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "max_tokens": 150,
    "messages": [
      {
        "role": "user",
        "content": "Write a one-sentence bedtime story about a unicorn."
      }
    ],
    "temperature": 0.7,
    "stream": true
  }'
```

#### TypeScript

```typescript filename="stream.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const stream = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 150,
  messages: [
    {
      role: 'user',
      content: 'Write a one-sentence bedtime story about a unicorn.',
    },
  ],
  temperature: 0.7,
  stream: true,
});

for await (const event of stream) {
  if (event.type === 'content_block_delta') {
    if (event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text);
    }
  }
}
```

#### Python

```python filename="stream.py"
import os
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

with client.messages.stream(
    model='anthropic/claude-opus-5',
    max_tokens=150,
    messages=[
        {
            'role': 'user',
            'content': 'Write a one-sentence bedtime story about a unicorn.'
        }
    ],
    temperature=0.7,
) as stream:
    for text in stream.text_stream:
        print(text, end='', flush=True)
```

## Streaming event types

Streaming responses use [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events). The key event types are:

- `message_start` - Initial message metadata
- `content_block_start` - Start of a content block (text, tool use, etc.)
- `content_block_delta` - Incremental content updates
- `content_block_stop` - End of a content block
- `message_delta` - Final message metadata (stop reason, usage)
- `message_stop` - End of the message

## Next steps

- [Tool calling](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling) - Stream a response that calls your functions
- [Extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) - Configure how much Claude thinks before answering
- [Advanced](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced) - Web search, provider timeouts, and automatic caching


---

[View full sitemap](/docs/sitemap)
