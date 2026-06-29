---
title: Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning"
last_updated: 2026-06-20
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/reasoning/openai
  - /docs/ai-gateway/models-and-providers/reasoning/anthropic
  - /docs/ai-gateway/models-and-providers/reasoning/google
  - /docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock
  - /docs/ai-gateway/models-and-providers/provider-options
summary: Enable reasoning and extended thinking across providers with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "9aae3760c85e014247f16752a22f12d9db0a449a278ffc121d2da89618105282"
---

# Reasoning

Reasoning models can "think" before responding, producing higher-quality answers for complex tasks like coding, math, and multi-step analysis. AI Gateway supports reasoning across multiple providers, including OpenAI, Anthropic, Google, Vertex AI, and Amazon Bedrock. When you use the AI SDK, each provider's native reasoning configuration is passed through `providerOptions`, and the AI SDK normalizes the output into a consistent format so you can switch providers without rewriting your code.

## Quick start

Enable reasoning with the [AI SDK](https://ai-sdk.dev) and AI Gateway in a few lines:

```typescript filename="reasoning.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.5',
  prompt: 'Explain the Monty Hall problem step by step.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'detailed',
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

## Good to know

- **Reasoning vs. reasoning text**: A model can reason internally without producing visible thinking or reasoning text in the response. Whether reasoning text is returned depends on the model and provider configuration.
- **Reasoning token usage**: Some providers report reasoning tokens separately in usage metrics (e.g., OpenAI includes `reasoning_tokens` in `completion_tokens_details`), but not all do. Anthropic counts thinking tokens as output tokens with no separate breakdown.
- **Streaming reasoning to the UI**: If you use `useChat` from the AI SDK, reasoning text is streamed to the client by default. You can disable this with the `sendReasoning` option. See the [AI SDK `useChat` transport docs](https://ai-sdk.dev/docs/reference/ai-sdk-ui/direct-chat-transport#send-reasoning) for details.

## Supported providers

| Provider                                                                 | Models                                         | Configuration                                                 |
| ------------------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------- |
| [OpenAI](/docs/ai-gateway/models-and-providers/reasoning/openai)                 | GPT-5 series, o-series                         | `reasoningEffort` + `reasoningSummary`                        |
| [Anthropic](/docs/ai-gateway/models-and-providers/reasoning/anthropic)           | Claude 4.6, Claude 4–4.5 series                | Extended thinking: adaptive mode (4.6) or manual mode (older) |
| [Google / Vertex](/docs/ai-gateway/models-and-providers/reasoning/google)        | Gemini 3.1, 3, 2.5 series (Google AI + Vertex) | `thinkingLevel` (Gemini 3+) or `thinkingBudget` (2.5)         |
| [Amazon Bedrock](/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock) | Anthropic models via Bedrock                   | Adaptive (4.6) or `budgetTokens` (older)                      |

## Reasoning with provider fallbacks

Models like `anthropic/claude-opus-4.7` are available through multiple providers (Anthropic, Amazon Bedrock, Google Vertex). When you combine reasoning with [provider routing](/docs/ai-gateway/models-and-providers/provider-options), AI Gateway routes to the first available provider.

Each provider has its own reasoning configuration format. Set the provider-specific options in `providerOptions`, and the provider that handles the request uses its matching entry:

```typescript filename="reasoning-with-fallbacks.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'Prove that there are infinitely many primes.',
  providerOptions: {
    anthropic: {
      thinking: { type: 'adaptive' },
    },
    bedrock: {
      reasoningConfig: { type: 'adaptive' },
    },
  },
});
```


---

[View full sitemap](/docs/sitemap)
