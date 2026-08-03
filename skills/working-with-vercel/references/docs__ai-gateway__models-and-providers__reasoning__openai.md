---
title: OpenAI Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/openai
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai"
last_updated: 2026-07-27
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/responses/reasoning
summary: Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "89bb6d805047e3bdc94679e033ca97c60b9a171b8f043a9715c271c54b5f6b00"
---

# OpenAI Reasoning

OpenAI reasoning models can think through problems before responding. You can control the depth of reasoning and receive summaries of the model's thought process. Each model supports different effort levels and defaults.

## Supported models

To see the current list of OpenAI reasoning models, use the **Reasoning** filter on the [AI Gateway models page](https://vercel.com/ai-gateway/models?capabilities=reasoning\&providers=openai).

Supported effort levels and defaults follow the model family:

| Model family                                             | Effort levels                            | Default  |
| -------------------------------------------------------- | ---------------------------------------- | -------- |
| GPT-5.2 and later (including the GPT-5.6 series)         | `none`, `low`, `medium`, `high`, `xhigh` | `none`   |
| Codex models (GPT-5.2 Codex and later)                   | `low`, `medium`, `high`, `xhigh`         | `low`    |
| GPT-5.1 Codex                                            | `low`, `medium`, `high`                  | `low`    |
| Pro models (GPT-5.5 Pro)                                 | `medium`, `high`, `xhigh`                | `medium` |
| GPT-5, GPT-5 mini, GPT-5 nano                            | `minimal`, `low`, `medium`, `high`       | `medium` |
| o-series (o3, o3-mini, o4-mini)                          | `low`, `medium`, `high`                  | `medium` |

If you request a level a model doesn't support, the provider returns an error naming the supported values. For more details on each model, see the [OpenAI model documentation](https://developers.openai.com/api/docs/models).

## Getting started

### Setting reasoning effort

The simplest way to set reasoning effort is the AI SDK 7 top-level [`reasoning` option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels), which maps directly to OpenAI's effort levels:

```typescript filename="reasoning-effort.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  reasoning: 'high',
});

console.log(result.text);
```

Use `providerOptions.openai` when you need OpenAI-specific features like reasoning summaries. If you set `reasoningEffort` in `providerOptions`, it takes precedence over the top-level `reasoning` value.

### Streaming with reasoning summaries

Set `reasoningSummary` to receive the model's thought process as it streams. Different models support different summarizers. For example, o4-mini supports detailed summaries.

#### AI SDK 7

```typescript filename="stream-reasoning.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'detailed', // 'auto' for condensed or 'detailed' for comprehensive
    },
  },
});

for await (const part of result.stream) {
  if (part.type === 'reasoning-delta') {
    process.stdout.write(part.text);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.text);
  }
}
```

#### AI SDK 6

```typescript filename="stream-reasoning.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'detailed', // 'auto' for condensed or 'detailed' for comprehensive
    },
  },
});

for await (const part of result.fullStream) {
  if (part.type === 'reasoning-delta') {
    process.stdout.write(part.text);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.text);
  }
}
```

### Non-streaming

For non-streaming calls, reasoning summaries are available in the `reasoning` field:

```typescript filename="generate-reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'auto',
    },
  },
});

console.log('Reasoning:', result.reasoningText);
```

### Other API formats

You can set reasoning effort without the AI SDK through the gateway's [OpenAI-compatible endpoints](/docs/ai-gateway/models-and-providers/reasoning#reasoning-across-api-formats):

#### TypeScript

```typescript filename="reasoning-chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - reasoning parameter not yet in OpenAI types
const completion = await openai.chat.completions.create({
  model: 'openai/gpt-5.6-sol',
  messages: [
    {
      role: 'user',
      content: 'Tell me about the Mission burrito debate in San Francisco.',
    },
  ],
  reasoning: {
    effort: 'high',
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
    model='openai/gpt-5.6-sol',
    messages=[
        {
            'role': 'user',
            'content': 'Tell me about the Mission burrito debate in San Francisco.'
        }
    ],
    extra_body={
        'reasoning': {
            'effort': 'high'
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
    "model": "openai/gpt-5.6-sol",
    "messages": [
      {
        "role": "user",
        "content": "Tell me about the Mission burrito debate in San Francisco."
      }
    ],
    "reasoning": {
      "effort": "high"
    }
  }'
```

The [Responses API](/docs/ai-gateway/sdks-and-apis/responses/reasoning) also supports the `reasoning` object, including the `summary` option for reasoning summaries.

## Parameters

### Reasoning effort

Set `reasoningEffort` in `providerOptions.openai` (or use the top-level `reasoning` option) to control how much the model thinks before responding. Each model family supports a different set of effort levels and defaults. See [Supported models](#supported-models) for which levels each family accepts.

| Value     | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| `none`    | Disables reasoning. Not supported on Codex, pro, or o-series models. |
| `minimal` | Minimal reasoning. GPT-5, GPT-5 mini, and GPT-5 nano only.     |
| `low`     | Fast, concise reasoning.                                       |
| `medium`  | Balanced reasoning.                                            |
| `high`    | Thorough reasoning.                                            |
| `xhigh`   | Maximum reasoning depth. GPT-5.2 and later only.               |

### Reasoning summary

| Value      | Description                     |
| ---------- | ------------------------------- |
| `auto`     | Condensed reasoning summary     |
| `detailed` | Comprehensive reasoning summary |
| `concise`  | Brief reasoning summary         |

> **💡 Note:** Some models default to `none` for reasoning effort, meaning reasoning is
> disabled unless you explicitly set an effort level. Check [Supported
> models](#supported-models) for each model family's default.

For more details, see the [OpenAI reasoning docs](https://developers.openai.com/api/docs/guides/reasoning/).


---

[View full sitemap](/docs/sitemap)
