---
title: Messages
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming
summary: Create messages using the Anthropic Messages API format with support for streaming.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "2eaaac21a92210c8ecd94ec885900f9a8992ff9ca42205fce3a3aa96aac4bf49"
---

# Messages

Create messages using the Anthropic Messages API format.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Messages](https://eve.dev/docs/guides/client/messages?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Send text, full turn payloads, client context, attachments, and HITL responses with eve/client.
- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Learn how to use the AI SDK to stream LLM responses.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Stream tokens as they are generated with the OpenAI Responses API.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Stream responses token by token using the OpenResponses API.
- [File Attachments](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Send images and PDF documents as part of your Anthropic API message requests.
- [Sign a message](https://vercel.com/docs/rest-api/kms/sign-a-message?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/message — Sign a raw message with a KMS issuer's active signing key. Authenticate t
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fmessages&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Endpoint

```
POST /v1/messages
```

### Basic message

Create a non-streaming message.

Example request

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

console.log('Response:', message.content[0].text);
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

print('Response:', message.content[0].text)
print('Usage:', message.usage)
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
