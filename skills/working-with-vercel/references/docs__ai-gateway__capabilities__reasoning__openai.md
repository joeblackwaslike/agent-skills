---
title: OpenAI Reasoning
product: vercel
url: /docs/ai-gateway/capabilities/reasoning/openai
canonical_url: "https://vercel.com/docs/ai-gateway/capabilities/reasoning/openai"
last_updated: 2026-05-11
type: reference
prerequisites:
  - /docs/ai-gateway/capabilities/reasoning
  - /docs/ai-gateway/capabilities
related:
  []
summary: Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/capabilities/reasoning/openai.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1ab094f8422d1b40c20c80bda95af51b8132380f213bdf99da98a4c8f15a0f23"
---

# OpenAI Reasoning

OpenAI reasoning models can think through problems before responding. You can control the depth of reasoning and receive summaries of the model's thought process. Each model supports different effort levels and defaults.

## Supported models

### GPT-5 series

| Model                  | Effort levels                            | Default  |
| ---------------------- | ---------------------------------------- | -------- |
| `openai/gpt-5.5`       | `none`, `low`, `medium`, `high`, `xhigh` | `none`   |
| `openai/gpt-5.4`       | `none`, `low`, `medium`, `high`, `xhigh` | `none`   |
| `openai/gpt-5.3-codex` | `low`, `medium`, `high`, `xhigh`         | `low`    |
| `openai/gpt-5.2-codex` | `low`, `medium`, `high`, `xhigh`         | `low`    |
| `openai/gpt-5.2`       | `none`, `low`, `medium`, `high`, `xhigh` | `none`   |
| `openai/gpt-5.1-codex` | `low`, `medium`, `high`                  | `low`    |
| `openai/gpt-5.1`       | `none`, `low`, `medium`, `high`          | `none`   |
| `openai/gpt-5`         | `minimal`, `low`, `medium`, `high`       | `medium` |
| `openai/gpt-5-mini`    | `minimal`, `low`, `medium`, `high`       | `medium` |
| `openai/gpt-5-nano`    | `minimal`, `low`, `medium`, `high`       | `medium` |

### o-series

| Model            | Effort levels           | Default  |
| ---------------- | ----------------------- | -------- |
| `openai/o3`      | `low`, `medium`, `high` | `medium` |
| `openai/o3-mini` | `low`, `medium`, `high` | `medium` |
| `openai/o4-mini` | `low`, `medium`, `high` | `medium` |

For more details on each model, see the [OpenAI model documentation](https://developers.openai.com/api/docs/models).

## Getting started

### Streaming with reasoning summaries

Set `reasoningSummary` to receive the model's thought process as it streams. Different models support different summarizers. For example, o4-mini supports detailed summaries.

```typescript filename="stream-reasoning.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.5',
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
  model: 'openai/gpt-5.5',
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

## Parameters

### Reasoning summary

| Value      | Description                     |
| ---------- | ------------------------------- |
| `auto`     | Condensed reasoning summary     |
| `detailed` | Comprehensive reasoning summary |
| `concise`  | Brief reasoning summary         |

> **💡 Note:** Some models default to `none` for reasoning effort, meaning reasoning is
> disabled unless you explicitly set an effort level. Check the [supported models
> table](#supported-models) for each model's default.

For more details, see the [OpenAI reasoning docs](https://developers.openai.com/api/docs/guides/reasoning/).


---

[View full sitemap](/docs/sitemap)
