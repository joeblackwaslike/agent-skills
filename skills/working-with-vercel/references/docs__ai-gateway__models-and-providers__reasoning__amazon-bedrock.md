---
title: Amazon Bedrock Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock"
last_updated: 2026-07-20
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/models-and-providers/reasoning
summary: Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "30afdf2f48e86b11664283c1a03361499609c01fd0ae1e5d3b38c97dfe2aca16"
---

# Amazon Bedrock Reasoning

Amazon Bedrock exposes Anthropic Claude reasoning through model-creator-specific provider options. Configuration depends on the model:

- **Adaptive reasoning**: Set `reasoningConfig: { type: 'adaptive', maxReasoningEffort }`. Available on Claude 4.6 and later. Required on Claude Opus 4.7 and later, where the legacy `type: 'enabled'` mode returns a 400 error.
- **Manual reasoning**: Set `reasoningConfig: { type: 'enabled', budgetTokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier (deprecated on 4.6, removed on Claude Opus 4.7 and later).

## Supported models

To see the current list of reasoning models served through Bedrock, use the **Reasoning** filter on the [AI Gateway models page](https://vercel.com/ai-gateway/models?capabilities=reasoning\&providers=bedrock). Which reasoning mode a model accepts follows its series:

| Model series                                          | Adaptive reasoning | Manual reasoning (token budget) |
| ----------------------------------------------------- | ------------------ | ------------------------------- |
| Claude Opus 4.7 and later                             | ✓                  | — (returns 400)                 |
| Claude 4.6 (`opus-4.6`, `sonnet-4.6`)                 | ✓                  | ✓ (deprecated)                  |
| Claude 4.5 and earlier (`sonnet-4.5`, etc.)           | —                  | ✓                               |

## Getting started

### Top-level reasoning option

The AI SDK 7 top-level [`reasoning` option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) works with Bedrock-hosted Claude models without provider-specific configuration. On Claude 4.6 and later it maps to adaptive reasoning at the corresponding effort level:

```typescript filename="top-level-reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'How many "r"s are in the word "strawberry"?',
  reasoning: 'high',
});

console.log(result.text);
```

This is especially useful with [provider fallbacks](/docs/ai-gateway/models-and-providers/reasoning#reasoning-with-provider-fallbacks): the same setting applies whether Anthropic, Bedrock, or Vertex serves the request. Use `providerOptions.bedrock` when you need an exact token budget on older models. If you set `reasoningConfig` in `providerOptions`, it takes precedence over the top-level `reasoning` value.

### Adaptive reasoning (Claude 4.6 and later)

```typescript filename="bedrock-adaptive.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'How many "r"s are in the word "strawberry"?',
  providerOptions: {
    bedrock: {
      reasoningConfig: { type: 'adaptive', maxReasoningEffort: 'max' },
    },
  },
});

console.log(result.reasoningText);
console.log(result.text);
```

### Manual reasoning (Claude 4.6 and earlier)

For pre-4.7 models, use `type: 'enabled'` with a `budgetTokens` value. This is the only reasoning mode supported on Claude 4.5 and earlier; on Claude 4.6 it works but is deprecated; on Claude Opus 4.7 and later it returns a 400 error.

```typescript filename="bedrock-manual.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.5',
  prompt: 'How many people will live in the world in 2040?',
  providerOptions: {
    bedrock: {
      reasoningConfig: { type: 'enabled', budgetTokens: 2048 },
    },
  },
});

console.log(result.reasoningText);
console.log(result.text);
```

### Other API formats

You can configure reasoning without the AI SDK through the gateway's [OpenAI-compatible endpoints](/docs/ai-gateway/models-and-providers/reasoning#reasoning-across-api-formats). Use `providerOptions.gateway.order` to route the request to Bedrock; AI Gateway maps the `reasoning` effort level to Bedrock's reasoning configuration:

#### TypeScript

```typescript filename="reasoning-chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - reasoning and providerOptions parameters not yet in OpenAI types
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'How many "r"s are in the word "strawberry"?',
    },
  ],
  reasoning: {
    effort: 'high',
  },
  providerOptions: {
    gateway: {
      order: ['bedrock'],
    },
  },
});

console.log('Reasoning:', completion.choices[0].message.reasoning);
console.log('Answer:', completion.choices[0].message.content);
```

#### Python

```python filename="reasoning_chat_completions.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'How many "r"s are in the word "strawberry"?'
        }
    ],
    extra_body={
        'reasoning': {
            'effort': 'high'
        },
        'providerOptions': {
            'gateway': {
                'order': ['bedrock']
            }
        }
    }
)

print('Reasoning:', completion.choices[0].message.reasoning)
print('Answer:', completion.choices[0].message.content)
```

#### cURL

```bash filename="reasoning-chat-completions.sh"
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "How many \"r\"s are in the word \"strawberry\"?"
      }
    ],
    "reasoning": {
      "effort": "high"
    },
    "providerOptions": {
      "gateway": {
        "order": ["bedrock"]
      }
    }
  }'
```

## Parameters

### Adaptive reasoning (Claude 4.6 and later)

| Parameter            | Type   | Description                                             |
| -------------------- | ------ | ------------------------------------------------------- |
| `type`               | string | Set to `'adaptive'`                                     |
| `maxReasoningEffort` | string | Effort level: `'low'`, `'medium'`, `'high'`, `'xhigh'` (Claude Opus 4.7 and later only), or `'max'` (Claude Opus only) |

### Manual reasoning (Claude 4.6 and earlier)

| Parameter      | Type   | Description                                                 |
| -------------- | ------ | ----------------------------------------------------------- |
| `type`         | string | Set to `'enabled'`                                          |
| `budgetTokens` | number | Token budget for reasoning. Minimum: 1,024. Maximum: 64,000 |


---

[View full sitemap](/docs/sitemap)
