---
title: Google and Vertex Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/google
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/google"
last_updated: 2026-07-20
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/models-and-providers/reasoning
summary: Configure thinking for Google Gemini and Gemma models with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/google.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "8daf69b3d68f894fa20cb421c2aa96fe2104b718790dc2b70c541597c1e6e63f"
---

# Google and Vertex Reasoning

Gemini 2.5 and later models use an internal "thinking process" that improves their reasoning and multi-step planning abilities, making them effective for complex tasks like coding, advanced mathematics, and data analysis.

These models are available through both Google AI and Google Vertex AI providers. The thinking configuration is the same. The only difference is using `providerOptions.vertex` instead of `providerOptions.google`. To route through Vertex, configure [Vertex AI credentials](/docs/ai-gateway/authentication-and-byok/byok) and set the provider order to prefer `vertex`.

- **Gemma 4**: Use `chat_template_kwargs` with `enable_thinking: true` to enable reasoning
- **Gemini 3 and later**: Use `thinkingLevel` to control the depth of reasoning
- **Gemini 2.5**: Use `thinkingBudget` to set a token limit for thinking

## Supported models

To see the current list of Google reasoning models, use the **Reasoning** filter on the [AI Gateway models page](https://vercel.com/ai-gateway/models?capabilities=reasoning\&providers=google,vertex).

### Thinking levels (Gemini 3 and later)

The `thinkingLevel` parameter controls reasoning behavior:

| Thinking level | Description                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `minimal`      | Matches "no thinking" for most queries. The model may still think minimally for complex coding tasks. Best for latency-sensitive workloads. |
| `low`          | Minimizes latency and cost. Best for simple instruction following and chat.                                                                 |
| `medium`       | Balanced thinking for most tasks.                                                                                                           |
| `high`         | Maximizes reasoning depth. The model may take significantly longer to reach a first output token.                                           |

Not every level is available on every model, and defaults vary. Pro models don't support `minimal` and default to `high`; Flash models default to `high` on Gemini 3 and `medium` on Gemini 3.5; Flash-Lite models default to `minimal`. Requests using an unsupported level return an error naming the supported values.

### Thinking budgets (Gemini 2.5)

The `thinkingBudget` parameter sets a specific number of thinking tokens. Set `thinkingBudget` to `0` to disable thinking, or `-1` to enable dynamic thinking (the model adjusts based on request complexity).

> **💡 Note:** Use `thinkingLevel` with Gemini 3 and later models. While `thinkingBudget` is accepted for backwards compatibility, using it with Gemini 3 and later models may result in unexpected performance.

| Model                 | Default | Range      | Disable thinking    | Dynamic thinking               |
| --------------------- | ------- | ---------- | ------------------- | ------------------------------ |
| Gemini 2.5 Pro        | Dynamic | 128–32,768 | Not supported       | `thinkingBudget: -1` (default) |
| Gemini 2.5 Flash      | Dynamic | 0–24,576   | `thinkingBudget: 0` | `thinkingBudget: -1` (default) |
| Gemini 2.5 Flash Lite | Off     | 512–24,576 | `thinkingBudget: 0` | `thinkingBudget: -1`           |

## Getting started

### Top-level reasoning option

The AI SDK 7 top-level [`reasoning` option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) works across Gemini models without provider-specific configuration. On Gemini 3 and later it maps to `thinkingLevel`; on Gemini 2.5 it maps to a thinking budget sized as a percentage of the model's maximum output tokens:

```typescript filename="top-level-reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'google/gemini-3.6-flash',
  prompt: 'What is the sum of the first 10 prime numbers?',
  reasoning: 'high',
});

console.log(result.text);
```

Use `providerOptions` when you need an exact `thinkingBudget`, `includeThoughts`, or Gemma's `chat_template_kwargs`. If you set `thinkingConfig` in `providerOptions`, it takes precedence over the top-level `reasoning` value.

### Gemma 4 models

Gemma 4 models support reasoning through `chat_template_kwargs`. Pass `enable_thinking: true` in the provider options for the provider serving the model (such as `parasail` or `novita`):

#### AI SDK 7

```typescript filename="gemma-4-thinking.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'google/gemma-4-31b-it',
  prompt: 'Tell me the history of the San Francisco Mission-style burrito.',
  providerOptions: {
    parasail: {
      chat_template_kwargs: { enable_thinking: true },
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

```typescript filename="gemma-4-thinking.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'google/gemma-4-31b-it',
  prompt: 'Tell me the history of the San Francisco Mission-style burrito.',
  providerOptions: {
    parasail: {
      chat_template_kwargs: { enable_thinking: true },
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

### Gemini 3 and later models

Use the `thinkingLevel` parameter to control the depth of reasoning:

```typescript filename="gemini-3-thinking.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'google/gemini-3.6-flash',
  prompt: 'What is the sum of the first 10 prime numbers?',
  providerOptions: {
    vertex: { // use vertex or google
      thinkingConfig: {
        thinkingLevel: 'high',
        includeThoughts: true,
      },
    },
  },
});

console.log(result.text);
console.log(result.reasoningText);
```

### Gemini 2.5 models

Use the `thinkingBudget` parameter to control the number of thinking tokens:

```typescript filename="gemini-25-thinking.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'google/gemini-2.5-flash',
  prompt: 'What is the sum of the first 10 prime numbers?',
  providerOptions: {
    vertex: { // use vertex or google
      thinkingConfig: {
        thinkingBudget: 8192,
        includeThoughts: true,
      },
    },
  },
});

console.log(result.text);
console.log(result.reasoningText);
```

### Streaming

When streaming, thinking tokens are emitted as `reasoning-delta` stream parts:

#### AI SDK 7

```typescript filename="gemini-stream-thinking.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'google/gemini-2.5-flash',
  prompt: 'Explain quantum computing in simple terms.',
  providerOptions: {
    vertex: { // use vertex or google
      thinkingConfig: {
        thinkingBudget: 2048,
        includeThoughts: true,
      },
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

```typescript filename="gemini-stream-thinking.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'google/gemini-2.5-flash',
  prompt: 'Explain quantum computing in simple terms.',
  providerOptions: {
    vertex: { // use vertex or google
      thinkingConfig: {
        thinkingBudget: 2048,
        includeThoughts: true,
      },
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

### Other API formats

You can configure thinking without the AI SDK through the gateway's [OpenAI-compatible endpoints](/docs/ai-gateway/models-and-providers/reasoning#reasoning-across-api-formats). AI Gateway maps the `reasoning` effort level to the model's native thinking configuration:

#### TypeScript

```typescript filename="thinking-chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - reasoning parameter not yet in OpenAI types
const completion = await openai.chat.completions.create({
  model: 'google/gemini-3.6-flash',
  messages: [
    {
      role: 'user',
      content: 'What is the sum of the first 10 prime numbers?',
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

```python filename="thinking_chat_completions.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='google/gemini-3.6-flash',
    messages=[
        {
            'role': 'user',
            'content': 'What is the sum of the first 10 prime numbers?'
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

```bash filename="thinking-chat-completions.sh"
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-3.6-flash",
    "messages": [
      {
        "role": "user",
        "content": "What is the sum of the first 10 prime numbers?"
      }
    ],
    "reasoning": {
      "effort": "high"
    }
  }'
```

## Parameters

### Gemma 4 thinking config

| Parameter                              | Type    | Description                                            |
| -------------------------------------- | ------- | ------------------------------------------------------ |
| `chat_template_kwargs`                 | object  | Template arguments passed to the model's chat template |
| `chat_template_kwargs.enable_thinking` | boolean | Set to `true` to enable the model's reasoning mode     |

### Gemini 3 and later thinking config

| Parameter         | Type    | Description                                                    |
| ----------------- | ------- | -------------------------------------------------------------- |
| `thinkingLevel`   | string  | Depth of reasoning: `'minimal'`, `'low'`, `'medium'`, `'high'` |
| `includeThoughts` | boolean | Include thinking content in the response                       |

### Gemini 2.5 thinking config

| Parameter         | Type    | Description                                       |
| ----------------- | ------- | ------------------------------------------------- |
| `thinkingBudget`  | number  | Maximum number of tokens to allocate for thinking |
| `includeThoughts` | boolean | Include thinking content in the response          |

For more details, see the [Google AI thinking docs](https://ai.google.dev/gemini-api/docs/thinking) and [Vertex AI thinking docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/thinking).


---

[View full sitemap](/docs/sitemap)
