---
title: AI Gateway Google and Vertex Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/google
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/google"
last_updated: 2026-09-08
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
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "bb9db3e3c970ce3df4b95c9ea6206af8738de129881e324aec07b309c469c953"
---

# AI Gateway Google and Vertex Reasoning

Gemini 2.5 and later models use an internal "thinking process" that improves their reasoning and multi-step planning abilities, making them effective for complex tasks like coding, advanced mathematics, and data analysis.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fgoogle&source_site=vercel-docs&relationship=related)
- [Gemini 3.5 Flash on AI Gateway](https://vercel.com/changelog/gemini-3-5-flash-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fgoogle&source_site=vercel-docs&relationship=related)
- [Gemini CLI](https://ai-sdk.dev/providers/community-providers/gemini-cli?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fgoogle&source_site=vercel-docs&relationship=related)
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fgoogle&source_site=vercel-docs&relationship=related)
- [Gemini 3.1 Pro is live on AI Gateway](https://vercel.com/changelog/gemini-3-1-pro-is-live-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fgoogle&source_site=vercel-docs&relationship=related)
- [AI Gateway OpenAI Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fgoogle&source_site=vercel-docs&relationship=related) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/reasoning/google.graph.md](/docs/ai-gateway/models-and-providers/reasoning/google.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fgoogle&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

These models are available through both Google AI and Google Vertex AI providers. The thinking configuration is the same. The only difference is using `providerOptions.vertex` instead of `providerOptions.google`. To route through Vertex, configure [Vertex AI credentials](/docs/ai-gateway/authentication-and-byok/byok) and set the provider order to prefer `vertex`.

- **Gemini 3 and later**: Use `thinkingLevel` to control the depth of reasoning
- **Gemini 2.5**: Use `thinkingBudget` to set a token limit for thinking

## Supported models

See the [AI SDK Google provider reference](https://ai-sdk.dev/providers/ai-sdk-providers/google) for supported reasoning options and response metadata.

To see the current list of Google reasoning models, use the **Reasoning** filter on the [AI Gateway models page](https://vercel.com/ai-gateway/models?capabilities=reasoning\&providers=google,vertex).

### Thinking levels (Gemini 3 and later)

The `thinkingLevel` parameter controls reasoning behavior:

| Thinking level | Description                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `minimal`      | Matches "no thinking" for most queries. The model may still think minimally for complex coding tasks. Best for latency-sensitive workloads. |
| `low`          | Minimizes latency and cost. Use for instruction following and chat with low reasoning requirements.                                                                 |
| `medium`       | Balanced thinking for most tasks.                                                                                                           |
| `high`         | Maximizes reasoning depth. The model may take significantly longer to reach a first output token.                                           |

Select the exact model in [`GET /v1/models`](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) and read the `effort` values in `reasoning_options`. Don't infer a new Flash or Pro model's supported levels or default from an older generation. The catalog doesn't expose a structured default; consult the [Google thinking documentation](https://ai.google.dev/gemini-api/docs/thinking) for model-specific behavior.

The shared effort mapping and native `thinkingLevel` can differ. AI Gateway's cross-provider translation maps `low` to `low` and other effort levels to `high` on Gemini 3-family models. To request a native `minimal` or `medium` level listed in the catalog, use the serving provider's `thinkingConfig.thinkingLevel` option and verify support.

### Thinking budgets (Gemini 2.5)

The `thinkingBudget` parameter sets a specific number of thinking tokens. Set `thinkingBudget` to `0` to disable thinking, or `-1` to enable dynamic thinking (the model adjusts based on request complexity).

> **💡 Note:** Use `thinkingLevel` with Gemini 3 and later models. While `thinkingBudget` is accepted for backwards compatibility, using it with Gemini 3 and later models may result in unexpected performance.

For an exact budget, check the model's `budget_tokens` entry in [catalog discovery](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support). Apply `min` and `max` when present; missing bounds don't mean an unlimited budget. The [Google thinking documentation](https://ai.google.dev/gemini-api/docs/thinking) describes disabling thinking and dynamic budgets for each model.

## Getting started

### Top-level reasoning option

The AI SDK 7 top-level [`reasoning` option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) works across Gemini models without provider-specific configuration. On Gemini 3 and later it maps to `thinkingLevel`; on Gemini 2.5, AI Gateway maps effort to a thinking-token budget:

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

Check the [catalog](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) and the serving provider before configuring Gemma reasoning. The model's `reasoning` tag alone doesn't establish support for `chat_template_kwargs` or guarantee reasoning deltas. AI Gateway's shared reasoning translation currently treats Gemma as unsupported. For native provider options, verify both successful stream completion and reasoning output before relying on them.

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

const completion = await openai.chat.completions.create({
  model: 'google/gemini-3.6-flash',
  messages: [
    {
      role: 'user',
      content: 'What is the sum of the first 10 prime numbers?',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    reasoning: {
      effort: 'high',
    },
  },
});

const message = completion.choices[0].message;
console.log(
  'Reasoning:',
  'reasoning' in message ? message.reasoning : undefined,
);
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

Native `chat_template_kwargs` support depends on the serving provider. See [Gemma 4 models](#gemma-4-models) before using this configuration; it isn't a shared AI Gateway reasoning control.

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
