---
title: OpenAI Chat Completions Reasoning with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers/reasoning/anthropic
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
summary: Control how much a model thinks before answering with the OpenAI Chat Completions API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "09f31f2e9aeced5bc13b6bdd374ea3d393ff32e151e4dd9fd0aad08a50678dc5"
---

# OpenAI Chat Completions Reasoning with AI Gateway

Reasoning models work through a problem before answering. Configure that with the `reasoning` object on a [chat completion](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions) request, which controls how many reasoning tokens the model generates and whether they come back in the response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Freasoning&source_site=vercel-docs&relationship=related)
- [OpenResponses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Freasoning&source_site=vercel-docs&relationship=related) — Control how much a reasoning model thinks before answering with the OpenResponses API through AI Gateway.
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Freasoning&source_site=vercel-docs&relationship=related)
- [AI Gateway OpenAI Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Freasoning&source_site=vercel-docs&relationship=related) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
- [OpenAI Responses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Freasoning&source_site=vercel-docs&relationship=related) — Control how much a model thinks before answering with the OpenAI Responses API through AI Gateway.
- [AI Gateway Amazon Bedrock Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Freasoning&source_site=vercel-docs&relationship=related) — Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Freasoning&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Anthropic calls the same capability extended thinking: see [Extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) for the Anthropic-shaped equivalent, or [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) for the cross-provider reference.

The `reasoning` object works across supported reasoning models, including models from other providers. AI Gateway maps it to the target provider's native reasoning configuration.

Use [catalog discovery](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) to find reasoning models and their supported controls. For effort-based models, the standard `reasoning_effort` field is an alias for `reasoning.effort`. If both are present, the nested value takes precedence. See the [cross-format quick start](/docs/ai-gateway/models-and-providers/reasoning#quick-start) for TypeScript, Python, and cURL examples.

Example request

#### TypeScript

```typescript filename="reasoning-openai-sdk.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'What is the meaning of life? Think before answering.',
    },
  ],
  stream: false,
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    reasoning: {
      effort: 'medium',
    },
  },
});

const message = completion.choices[0].message;
console.log(
  'Reasoning:',
  'reasoning' in message ? message.reasoning : undefined,
);
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
    model='openai/gpt-6-astra',
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

#### cURL

```bash filename="reasoning.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
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

## Reasoning parameters

The `reasoning` object supports these parameters:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `enabled` | boolean | Request reasoning on or off. Some models require reasoning and can't disable it. This doesn't guarantee visible reasoning text. |
| `effort` | string | The request schema accepts `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, or `max`. Choose a value supported by the model's [catalog entry](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support). Can't be combined with `max_tokens`. |
| `max_tokens` | number | Request a thinking-token budget. Can't be combined with `effort`. Check the model's `budget_tokens` control and bounds. |
| `exclude` | boolean | When `true`, omit reasoning content from the response. It doesn't turn off internal reasoning. |

The `reasoning` object is a Gateway extension to the OpenAI Chat Completions API. Python clients send it through `extra_body`; TypeScript clients can spread the extension into the request, as shown above. Use the standard `reasoning_effort` field when you only need effort.

Effort is relative; it isn't a universal percentage of output tokens. AI Gateway translates it according to the model and serving provider. `max` can map to `xhigh` on cross-provider routes; native Anthropic adaptive thinking can retain `max`. See [reasoning mappings](/docs/ai-gateway/models-and-providers/reasoning#how-reasoning-is-mapped).

## Anthropic models on this surface

AI Gateway translates shared effort to adaptive thinking on supported Claude models. On Claude Opus 4.7 and later, reasoning text can be omitted even when thinking runs. Missing reasoning text doesn't establish that the model ignored effort. Check usage when available, or request `thinking.display: 'summarized'` through [provider options](/docs/ai-gateway/models-and-providers/reasoning/anthropic#thinking-display-claude-opus-47-and-later).

Legacy `reasoning.max_tokens` requests use fixed-budget thinking, which newer adaptive-only Claude models reject. Use shared effort for those models. See [Anthropic thinking modes](/docs/ai-gateway/models-and-providers/reasoning/anthropic#two-thinking-modes).

### Token budgets on earlier Anthropic models

On Claude Sonnet 4.6 and earlier, `max_tokens` caps the thinking budget directly:

```typescript filename="reasoning-budget.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'What is the meaning of life?',
    },
  ],
  ...{
    reasoning: {
      max_tokens: 2000,
      enabled: true,
    },
  },
});
```

## Response format with reasoning

When the provider returns reasoning content, AI Gateway includes it in the response:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "openai/gpt-6-astra",
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

#### TypeScript

```typescript filename="reasoning-streaming.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await openai.chat.completions.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'What is the meaning of life? Think before answering.',
    },
  ],
  stream: true,
  ...{
    reasoning: {
      effort: 'medium',
    },
  },
});

// Reasoning and content each arrive as many small deltas, so label each
// section once rather than once per chunk.
let section: 'reasoning' | 'content' | null = null;

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta;

  if (delta && 'reasoning' in delta && typeof delta.reasoning === 'string') {
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
    model='openai/gpt-6-astra',
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

#### cURL

```bash filename="reasoning-streaming.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
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
  "model": "openai/gpt-6-astra",
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
  "model": "openai/gpt-6-astra",
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
- **Anthropic**: Maps effort to adaptive thinking on supported models, or `max_tokens` to legacy thinking budgets
- **Google**: Maps to `thinkingConfig` with budget and visibility settings
- **Groq**: Maps `exclude` to control reasoning format (hidden/parsed)
- **SpaceXAI**: Maps `effort` to reasoning effort levels
- **Other providers**: Generic mapping applied for compatibility

> **💡 Note:** **Automatic extraction:** For models that don't natively support reasoning
> output, the gateway automatically extracts reasoning
> from `<think>` tags in the response.

## Next steps

- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) - Model discovery and API-format mappings
- [Advanced](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced) - Provider options and prompt caching


---

[View full sitemap](/docs/sitemap)
