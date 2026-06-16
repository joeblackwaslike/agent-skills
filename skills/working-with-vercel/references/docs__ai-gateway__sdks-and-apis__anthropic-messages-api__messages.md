---
title: Messages
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages"
last_updated: 2026-05-11
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Create messages using the Anthropic Messages API format with support for streaming.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "b2672a81bf70b96d4d9c3ed2543fdfcb429b909328b3473b44c7e177159f7b10"
---

# Messages

Create messages using the Anthropic Messages API format.

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
  model: 'anthropic/claude-opus-4.7',
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
    model='anthropic/claude-opus-4.7',
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
  "model": "anthropic/claude-opus-4.7",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 15,
    "output_tokens": 28
  }
}
```

### Streaming messages

Create a streaming message that delivers tokens as they are generated.

Example request

#### TypeScript

```typescript filename="stream.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const stream = await anthropic.messages.create({
  model: 'anthropic/claude-opus-4.7',
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
    model='anthropic/claude-opus-4.7',
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

#### Streaming event types

Streaming responses use [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events). The key event types are:

- `message_start` - Initial message metadata
- `content_block_start` - Start of a content block (text, tool use, etc.)
- `content_block_delta` - Incremental content updates
- `content_block_stop` - End of a content block
- `message_delta` - Final message metadata (stop reason, usage)
- `message_stop` - End of the message


---

[View full sitemap](/docs/sitemap)
