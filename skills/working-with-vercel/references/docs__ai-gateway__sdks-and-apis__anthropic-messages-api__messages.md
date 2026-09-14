---
title: Anthropic Messages Requests with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming
summary: Create messages using the Anthropic Messages API format with support for streaming through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "7780ee12841aa3687708743a0ca425ef84d73fe8d4b76f2852cc0b700bd736f9"
---

# Anthropic Messages Requests with AI Gateway

Create messages using the Anthropic Messages API format.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Anthropic Messages Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Send images and PDF documents as part of your Anthropic API message requests through AI Gateway.
- [Anthropic Messages Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Use function calling with the Anthropic Messages API to allow models to call tools and functions through AI Gateway.
- [OpenAI Responses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Stream tokens as they are generated with the OpenAI Responses API through AI Gateway.
- [Anthropic Messages Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching through AI Gateway.
- [OpenResponses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Stream responses token by token using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Endpoint

```
POST /v1/messages
```

### Basic message

Create a non-streaming message.

Example request

#### TypeScript

```typescript filename="generate.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 150,
  messages: [
    {
      role: 'user',
      content: 'Write a one-sentence bedtime story about a unicorn.',
    },
  ],
  temperature: 0.7,
});

for (const block of message.content) {
  if (block.type === 'text') console.log('Response:', block.text);
}
console.log('Usage:', message.usage);
```

#### Python

```python filename="generate.py"
import os
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=150,
    messages=[
        {
            'role': 'user',
            'content': 'Write a one-sentence bedtime story about a unicorn.'
        }
    ],
    temperature=0.7,
)

for block in message.content:
    if block.type == "text":
        print('Response:', block.text)
print('Usage:', message.usage)
```

#### cURL

```bash filename="generate.sh"
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
    "temperature": 0.7
  }'
```

Response format

```json
{
  "id": "msg_123",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Once upon a time, a gentle unicorn with a shimmering silver mane danced through moonlit clouds, sprinkling stardust dreams upon sleeping children below."
    }
  ],
  "model": "anthropic/claude-opus-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 15,
    "output_tokens": 28
  }
}
```

### Streaming messages

Set `stream: true` to receive tokens as they are generated. See [Streaming](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming) for the full example and the list of server-sent event types.


---

[View full sitemap](/docs/sitemap)
