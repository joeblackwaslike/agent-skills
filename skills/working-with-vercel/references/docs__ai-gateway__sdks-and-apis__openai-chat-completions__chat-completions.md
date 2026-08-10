---
title: Chat Completions
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions"
last_updated: 2026-07-28
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/images
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs
summary: Create chat completions using the Chat Completions API with support for streaming, image attachments, and PDF documents.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "445407578ad719a690748915f23266428840fcb5c8666a2cc30dfd0f62a82e74"
---

# Chat Completions

Create chat completions using various AI models available through the AI Gateway.

Endpoint

```
POST /chat/completions
```

### Basic chat completion

Create a non-streaming chat completion.

Example request

#### cURL

```bash filename="chat-completion.sh"
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
    "stream": false
  }'
```

#### TypeScript

```typescript filename="chat-completion.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'Write a one-sentence bedtime story about a unicorn.',
    },
  ],
  stream: false,
});

console.log('Assistant:', completion.choices[0].message.content);
console.log('Tokens used:', completion.usage);
```

#### Python

```python filename="chat-completion.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'Write a one-sentence bedtime story about a unicorn.'
        }
    ],
    stream=False,
)

print('Assistant:', completion.choices[0].message.content)
print('Tokens used:', completion.usage)
```

Response format

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "anthropic/claude-opus-5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Once upon a time, a gentle unicorn with a shimmering silver mane danced through moonlit clouds, sprinkling stardust dreams upon sleeping children below."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 28,
    "total_tokens": 43
  }
}
```

### Streaming chat completion

Set `stream: true` to receive tokens as they are generated. See [Streaming](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming) for the full example and the server-sent event format.

### File attachments

Send images and PDF documents by using an array of content parts in place of a plain string. See [File attachments](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images) for the full examples and supported types.

### Parameters

The chat completions endpoint supports the following parameters:

#### Required parameters

- `model` (string): The model to use for the completion (e.g., `anthropic/claude-opus-5`)
- `messages` (array): Array of message objects with `role` and `content` fields

#### Optional parameters

- `stream` (boolean): Whether to stream the response. Defaults to `false`
- `temperature` (number): Controls randomness in the output. Range: 0-2
- `max_tokens` (integer): Maximum number of tokens to generate
- `top_p` (number): Nucleus sampling parameter. Range: 0-1
- `frequency_penalty` (number): Penalty for frequent tokens. Range: -2 to 2
- `presence_penalty` (number): Penalty for present tokens. Range: -2 to 2
- `stop` (string or array): Stop sequences for the generation
- `tools` (array): Array of tool definitions for function calling
- `tool_choice` (string or object): Controls which tools are called (`auto`, `none`, or specific function)
- `providerOptions` (object): [Provider routing and configuration options](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced#provider-options)
- `provider` (object): Shorthand for provider routing. Supports `sort` (`'cost'`, `'ttft'`, `'tps'`). Equivalent to setting `providerOptions.gateway.sort`. See [Provider sorting](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced#provider-sorting)
- `response_format` (object): Controls the format of the model's response
  - For OpenAI standard format: `{ type: "json_schema", json_schema: { name, schema, strict?, description? } }`
  - For legacy format: `{ type: "json", schema?, name?, description? }`
  - For plain text: `{ type: "text" }`
  - See [Structured outputs](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs) for detailed examples

### Message format

Messages support different content types:

#### Text messages

```json
{
  "role": "user",
  "content": "Hello, how are you?"
}
```

#### Multimodal messages

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "What's in this image?" },
    {
      "type": "image_url",
      "image_url": {
        "url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
      }
    }
  ]
}
```

#### File messages

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "Summarize this document" },
    {
      "type": "file",
      "file": {
        "data": "JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PAovVHlwZSAvUGFnZQo...",
        "media_type": "application/pdf",
        "filename": "document.pdf"
      }
    }
  ]
}
```


---

[View full sitemap](/docs/sitemap)
