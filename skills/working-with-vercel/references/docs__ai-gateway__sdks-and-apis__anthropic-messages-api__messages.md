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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "8147963484970a1159b502cb999614ff5004ae5d17743b285fc186a0c815e176"
---

# Anthropic Messages Requests with AI Gateway

Create messages using the Anthropic Messages API format.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Anthropic Messages Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images) — Send images and PDF documents as part of your Anthropic API message requests through AI Gateway.
- [Anthropic Messages Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling) — Use function calling with the Anthropic Messages API to allow models to call tools and functions through AI Gateway.
- [Anthropic Messages Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching through AI Gateway.
- [OpenAI Responses Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming) — Stream tokens as they are generated with the OpenAI Responses API through AI Gateway.
- [Go with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/go) — Use AI Gateway from any Go application with the OpenAI or Anthropic Go SDKs, including model fallbacks, cost tracking, a

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.graph.md)
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
