---
title: Anthropic Messages Streaming with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced
summary: Stream Anthropic Messages API responses token by token as they are generated through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "af2b97d171e4297cc6466d0d9353397c352b70a563ca9a9583ef94214499ca89"
---

# Anthropic Messages Streaming with AI Gateway

Set `stream: true` on a [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages) request to receive tokens as the model produces them, instead of waiting for the complete response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how to use the AI SDK to stream LLM responses.
- [Streaming in web applications](https://vercel.com/kb/guide/what-is-streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how streaming works in web applications. Explore benefits, use cases, and implementation details with Vercel Funct
- [OpenAI Chat Completions Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream OpenAI Chat Completions responses token by token as they are generated through AI Gateway.
- [OpenResponses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream responses token by token using the OpenResponses API through AI Gateway.
- [OpenAI Responses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=related) — Stream tokens as they are generated with the OpenAI Responses API through AI Gateway.
- [Anthropic Messages Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=related) — Send images and PDF documents as part of your Anthropic API message requests through AI Gateway.
- [Streaming](https://vercel.com/docs/functions/streaming-functions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=related) — Learn how to stream responses from Vercel Functions.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstreaming&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Create a streaming message that delivers tokens as they are generated.

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
