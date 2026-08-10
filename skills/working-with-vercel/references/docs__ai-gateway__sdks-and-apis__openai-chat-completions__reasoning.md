---
title: Reasoning
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
summary: Control how much a model thinks before answering with the OpenAI Chat Completions API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "178fe94207257561835a25bfbae9f89c91df6e4427e8bfea46afbbf8acf94c13"
---

# Reasoning

Reasoning models work through a problem before answering. Configure that with the `reasoning` object on a [chat completion](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions) request, which controls how many reasoning tokens the model generates and whether they come back in the response.

Anthropic calls the same capability extended thinking: see [Extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) for the Anthropic-shaped equivalent, or [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) for the cross-provider reference.

The `reasoning` object works with any reasoning model, not just OpenAI models. AI Gateway maps it to the target provider's native reasoning configuration.

Example request

#### cURL

```bash filename="reasoning.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life? Think before answering."
      }
    ],
    "stream": false,
    "reasoning": {
      "effort": "medium"
    }
  }'
```

#### TypeScript

```typescript filename="reasoning-openai-sdk.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - reasoning parameter not yet in OpenAI types
const completion = await openai.chat.completions.create({
  model: 'openai/gpt-5.6-sol',
  messages: [
    {
      role: 'user',
      content: 'What is the meaning of life? Think before answering.',
    },
  ],
  stream: false,
  reasoning: {
    effort: 'medium',
  },
});

// @ts-expect-error - reasoning is not yet in the OpenAI response types
console.log('Reasoning:', completion.choices[0].message.reasoning);
console.log('Answer:', completion.choices[0].message.content);
console.log(
  'Reasoning tokens:',
  completion.usage?.completion_tokens_details?.reasoning_tokens,
);
```

#### Python

```python filename="reasoning.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='openai/gpt-5.6-sol',
    messages=[
        {
            'role': 'user',
            'content': 'What is the meaning of life? Think before answering.'
        }
    ],
    stream=False,
    extra_body={
        'reasoning': {
            'effort': 'medium'
        }
    }
)

print('Reasoning:', completion.choices[0].message.reasoning)
print('Answer:', completion.choices[0].message.content)
print('Reasoning tokens:', completion.usage.completion_tokens_details.reasoning_tokens)
```

## Reasoning parameters

The `reasoning` object supports the following parameters:

- **`enabled`** (boolean, optional): Enable reasoning output. When `true`, the model will provide its reasoning process.

- **`max_tokens`** (number, optional): Maximum number of tokens to allocate for reasoning. This helps control costs and response times. Cannot be used with `effort`.

- **`effort`** (string, optional): Control reasoning effort level. Accepts:

  - `'none'` - Disables reasoning
  - `'minimal'` - ~10% of max\_tokens
  - `'low'` - ~20% of max\_tokens
  - `'medium'` - ~50% of max\_tokens
  - `'high'` - ~80% of max\_tokens
  - `'xhigh'` - ~95% of max\_tokens

  Cannot be used with `max_tokens`.

- **`exclude`** (boolean, optional): When `true`, excludes reasoning content from the response but still generates it internally. Useful for reducing response payload size.

> **💡 Note:** **Mutually exclusive parameters:** You cannot specify both `effort` and
> `max_tokens` in the same request. Choose one based on your use case.

## Anthropic models on this surface

The `reasoning` object maps onto Anthropic's `thinking` parameter, and how it maps depends on the model generation:

| Anthropic model              | `reasoning.effort`         | `reasoning.max_tokens`    |
| ---------------------------- | -------------------------- | ------------------------- |
| Claude Sonnet 4.6 and earlier | Works                      | Works                     |
| Claude Opus 4.7 and later, Claude 5 | Returns no reasoning tokens | Rejected with a 400 error |

Claude Opus 4.7 introduced adaptive thinking, where the model decides its own thinking budget and `effort` is set through Anthropic's separate `output_config` field. The Chat Completions `reasoning` object does not currently reach that field, so neither parameter turns thinking on for those models.

To use extended thinking with Claude Opus 4.7 or later, call the [Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) surface instead, which exposes `thinking` and `output_config` directly.

### Token budgets on earlier Anthropic models

On Claude Sonnet 4.6 and earlier, `max_tokens` caps the thinking budget directly:

```typescript filename="reasoning-budget.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - reasoning parameter not yet in OpenAI types
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [{ role: 'user', content: 'What is the meaning of life?' }],
  reasoning: {
    max_tokens: 2000,
    enabled: true,
  },
});
```

## Response format with reasoning

When reasoning is enabled, the response includes reasoning content:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "openai/gpt-5.6-sol",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The meaning of life is a deeply personal question...",
        "reasoning": "Let me think about this carefully. The question asks about..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 150,
    "total_tokens": 165,
    "completion_tokens_details": {
      "reasoning_tokens": 50
    }
  }
}
```

## Streaming with reasoning

Reasoning content is streamed incrementally in the `delta.reasoning` field:

#### cURL

```bash filename="reasoning-streaming.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life? Think before answering."
      }
    ],
    "stream": true,
    "reasoning": {
      "effort": "medium"
    }
  }'
```

#### TypeScript

```typescript filename="reasoning-streaming.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - reasoning parameter not yet in OpenAI types
const stream = await openai.chat.completions.create({
  model: 'openai/gpt-5.6-sol',
  messages: [
    {
      role: 'user',
      content: 'What is the meaning of life? Think before answering.',
    },
  ],
  stream: true,
  reasoning: {
    effort: 'medium',
  },
});

// Reasoning and content each arrive as many small deltas, so label each
// section once rather than once per chunk.
let section: 'reasoning' | 'content' | null = null;

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta;

  if (delta?.reasoning) {
    if (section !== 'reasoning') {
      process.stdout.write('\n[Reasoning] ');
      section = 'reasoning';
    }
    process.stdout.write(delta.reasoning);
  }

  if (delta?.content) {
    if (section !== 'content') {
      process.stdout.write('\n[Answer] ');
      section = 'content';
    }
    process.stdout.write(delta.content);
  }
}
```

#### Python

```python filename="reasoning-streaming.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='openai/gpt-5.6-sol',
    messages=[
        {
            'role': 'user',
            'content': 'What is the meaning of life? Think before answering.'
        }
    ],
    stream=True,
    extra_body={
        'reasoning': {
            'effort': 'medium'
        }
    }
)

# Reasoning and content each arrive as many small deltas, so label each
# section once rather than once per chunk.
section = None

for chunk in stream:
    if chunk.choices and chunk.choices[0].delta:
        delta = chunk.choices[0].delta

        if getattr(delta, 'reasoning', None):
            if section != 'reasoning':
                print('\n[Reasoning] ', end='', flush=True)
                section = 'reasoning'
            print(delta.reasoning, end='', flush=True)

        if getattr(delta, 'content', None):
            if section != 'content':
                print('\n[Answer] ', end='', flush=True)
                section = 'content'
            print(delta.content, end='', flush=True)
```

## Preserving reasoning details across providers

The AI Gateway preserves reasoning details from models across interactions,
normalizing the different formats used by OpenAI, Anthropic, and other providers into a consistent structure.
This allows you to switch between models without rewriting your conversation management logic.

This is particularly useful during tool calling workflows where the model needs to
resume its thought process after receiving tool results.

**Controlling reasoning details**

When `reasoning.enabled` is `true` (or when `reasoning.exclude` is not set),
responses include a `reasoning_details` array alongside the standard `reasoning` text field.
This structured field captures cryptographic signatures, encrypted content, and other verification
data that providers include with their reasoning output.

Each detail object contains:

- **`type`**: one or more of the below, depending on the provider and model
  - `'reasoning.text'`: Contains the actual reasoning content as plain text in the `text` field. May include a `signature` field (Anthropic models) for cryptographic verification.
  - `'reasoning.encrypted'`: Contains encrypted or redacted reasoning content in the `data` field. Used by OpenAI models when reasoning is protected, or by Anthropic models when thinking is redacted. Preserves the encrypted payload for verification purposes.
  - `'reasoning.summary'`: Contains a condensed version of the reasoning process in the `summary` field. Used by OpenAI models to provide a readable summary alongside encrypted reasoning.
- **`id`** (optional): Unique identifier for the reasoning block, used for tracking and correlation
- **`format`**: Provider format identifier - `'openai-responses-v1'`, `'anthropic-claude-v1'`, or `'unknown'`
- **`index`** (optional): Position in the reasoning sequence (for responses with multiple reasoning blocks)

**Example response with reasoning details**

For Anthropic models:

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
        "content": "The meaning of life is a deeply personal question...",
        "reasoning": "Let me think about this carefully. The question asks about...",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Let me think about this carefully. The question asks about...",
            "signature": "anthropic-signature-xyz",
            "format": "anthropic-claude-v1",
            "index": 0
          }
        ]
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 150,
    "total_tokens": 165,
    "completion_tokens_details": {
      "reasoning_tokens": 50
    }
  }
}
```

For OpenAI models (returns both summary and encrypted):

```json
{
  "id": "chatcmpl-456",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "openai/gpt-5.6-sol",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The answer is 42.",
        "reasoning": "Let me calculate this step by step...",
        "reasoning_details": [
          {
            "type": "reasoning.summary",
            "summary": "Let me calculate this step by step...",
            "format": "openai-responses-v1",
            "index": 0
          },
          {
            "type": "reasoning.encrypted",
            "data": "encrypted_reasoning_content_xyz",
            "format": "openai-responses-v1",
            "index": 1
          }
        ]
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 150,
    "total_tokens": 165,
    "completion_tokens_details": {
      "reasoning_tokens": 50
    }
  }
}
```

**Streaming reasoning details**

When streaming, reasoning details are delivered incrementally in `delta.reasoning_details`:

For Anthropic models:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion.chunk",
  "created": 1677652288,
  "model": "anthropic/claude-opus-5",
  "choices": [
    {
      "index": 0,
      "delta": {
        "reasoning": "Let me think.",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Let me think.",
            "signature": "anthropic-signature-xyz",
            "format": "anthropic-claude-v1",
            "index": 0
          }
        ]
      },
      "finish_reason": null
    }
  ]
}
```

For OpenAI models (summary chunks during reasoning, then encrypted at end):

```json
{
  "id": "chatcmpl-456",
  "object": "chat.completion.chunk",
  "created": 1677652288,
  "model": "openai/gpt-5.6-sol",
  "choices": [
    {
      "index": 0,
      "delta": {
        "reasoning": "Step 1:",
        "reasoning_details": [
          {
            "type": "reasoning.summary",
            "summary": "Step 1:",
            "format": "openai-responses-v1",
            "index": 0
          }
        ]
      },
      "finish_reason": null
    }
  ]
}
```

## Provider-specific behavior

The AI Gateway automatically maps reasoning parameters to each provider's native format:

- **OpenAI**: Maps `effort` to `reasoningEffort` and controls summary detail
- **Anthropic**: Maps `max_tokens` to thinking budget tokens
- **Google**: Maps to `thinkingConfig` with budget and visibility settings
- **Groq**: Maps `exclude` to control reasoning format (hidden/parsed)
- **xAI**: Maps `effort` to reasoning effort levels
- **Other providers**: Generic mapping applied for compatibility

> **💡 Note:** **Automatic extraction:** For models that don't natively support reasoning
> output, the gateway automatically extracts reasoning
> from `<think>` tags in the response.

## Next steps

- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) - Per-provider effort levels and model support
- [Advanced](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced) - Provider options and prompt caching


---

[View full sitemap](/docs/sitemap)
