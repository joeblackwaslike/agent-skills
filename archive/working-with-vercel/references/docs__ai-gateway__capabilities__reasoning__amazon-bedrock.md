---
title: Amazon Bedrock Reasoning
product: vercel
url: /docs/ai-gateway/capabilities/reasoning/amazon-bedrock
canonical_url: "https://vercel.com/docs/ai-gateway/capabilities/reasoning/amazon-bedrock"
last_updated: 2026-05-11
type: reference
prerequisites:
  - /docs/ai-gateway/capabilities/reasoning
  - /docs/ai-gateway/capabilities
related:
  []
summary: Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/capabilities/reasoning/amazon-bedrock.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1ac943cb97c77b50c3dfddeb32e78085b585a23db44e3fa2d09f08986f5a8e6e"
---

# Amazon Bedrock Reasoning

Amazon Bedrock exposes Anthropic Claude reasoning through model-creator-specific provider options. Configuration depends on the model:

- **Adaptive reasoning** — Set `reasoningConfig: { type: 'adaptive', maxReasoningEffort }`. Available on Claude 4.6 and later. Required on Claude Opus 4.7 and later — the legacy `type: 'enabled'` mode returns a 400 error.
- **Manual reasoning** — Set `reasoningConfig: { type: 'enabled', budgetTokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier (deprecated on 4.6, removed on Claude Opus 4.7 and later).

## Supported models

| Model series                                          | Adaptive reasoning | Manual reasoning (token budget) |
| ----------------------------------------------------- | ------------------ | ------------------------------- |
| Claude Opus 4.7 and later                             | ✓                  | — (returns 400)                 |
| Claude 4.6 (`opus-4.6`, `sonnet-4.6`)                 | ✓                  | ✓ (deprecated)                  |
| Claude 4.5 and earlier (`sonnet-4.5`, etc.)           | —                  | ✓                               |

## Getting started

### Adaptive reasoning (Claude 4.6 and later)

```typescript filename="bedrock-adaptive.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'How many "r"s are in the word "strawberry"?',
  providerOptions: {
    bedrock: {
      reasoningConfig: { type: 'adaptive', maxReasoningEffort: 'max' },
    },
  },
});

console.log(result.reasoning);
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

console.log(result.reasoning);
console.log(result.text);
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
