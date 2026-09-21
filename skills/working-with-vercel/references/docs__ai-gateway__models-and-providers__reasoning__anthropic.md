---
title: AI Gateway Anthropic Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/anthropic
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/anthropic"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/models-and-providers/reasoning
summary: Configure adaptive and extended thinking for Anthropic Claude models with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/anthropic.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "878597f007fd188b398bdc4ef4adf24134bbaa81cfda390695144bfa54b366ee"
---

# AI Gateway Anthropic Reasoning

Anthropic Claude models support thinking, which lets the model reason through complex problems before producing a final answer. Claude 4.6 introduced adaptive thinking, where Claude dynamically decides when and how much to think based on an effort level. On Claude Opus 4.7 and later and the Claude 5 models (Claude Opus 5, Claude Sonnet 5, Claude Fable 5), adaptive thinking is the only way to turn thinking on. The legacy fixed-budget API is no longer accepted on those models.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Anthropic Messages Extended Thinking with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related) — Configure how much Claude thinks before answering, using the Anthropic Messages API thinking parameter through AI Gatewa
- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related)
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related)
- [Use Claude Opus 4.6 on AI Gateway](https://vercel.com/changelog/claude-opus-4.6-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related)
- [Get started with Claude 4](https://ai-sdk.dev/cookbook/guides/claude-4?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related)
- [Get started with Claude 3.7 Sonnet](https://ai-sdk.dev/cookbook/guides/sonnet-3-7?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related)
- [Claude Opus 4.7 on AI Gateway](https://vercel.com/changelog/opus-4.7-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related)
- [AI Gateway Amazon Bedrock Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=related) — Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/reasoning/anthropic.graph.md](/docs/ai-gateway/models-and-providers/reasoning/anthropic.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Fanthropic&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Two thinking modes

See the [AI SDK Anthropic provider reference](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic) for supported reasoning options and response metadata.

- **Adaptive thinking**: Set `thinking: { type: 'adaptive' }`. Claude dynamically decides when and how much to think based on the `effort` parameter. Available on Claude 4.6 and later. The only way to turn thinking on for Claude Opus 4.7 and later and the Claude 5 models.
- **Extended thinking with a token budget**: Set `thinking: { type: 'enabled', budgetTokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier. Deprecated on Claude 4.6. **Removed on Claude Opus 4.7 and later and the Claude 5 models**: requests with `type: 'enabled'` return a 400 error. Migrate to adaptive thinking.

### What happens when you leave `thinking` unset

Set `thinking: { type: 'adaptive' }` explicitly when you want adaptive thinking. Omitting `thinking` delegates to the model's default; it doesn't mean the same thing as enabling or disabling thinking. Check the [Anthropic adaptive thinking documentation](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking) for defaults when migrating between models.

To turn thinking off, set `thinking: { type: 'disabled' }`. Two exceptions: Claude Fable 5 can't turn thinking off at all, and Claude Opus 5 accepts `disabled` only at an `effort` of `high` or lower. Pairing it with `xhigh` or `max` returns a 400.

## Supported models

Use [`GET /v1/models`](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) to find Anthropic models and their `reasoning_options`. Use `effort.values` for named levels and a `budget_tokens` entry for explicit budgets. See [Two thinking modes](#two-thinking-modes) for the native adaptive and legacy request shapes.

### Effort levels (adaptive thinking)

When you enable adaptive thinking, set `providerOptions.anthropic.effort` in the AI SDK or `output_config.effort` in the Messages API. Choose a value from the model's [catalog entry](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) that your client accepts. Don't assume a newer Claude model shares an older model's effort levels or default.

Use the [shared effort option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) for portable configuration. AI SDK 7's shorthand stops at `xhigh`; native Anthropic `max` requires a provider-specific option or an HTTP format that accepts it.

For more details, see the [Anthropic extended thinking docs](https://platform.claude.com/docs/en/build-with-claude/extended-thinking), [adaptive thinking docs](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking), and [effort parameter docs](https://platform.claude.com/docs/en/build-with-claude/effort).

## Getting started

### Top-level reasoning option

On Claude 4.6 and later, the AI SDK 7 top-level [`reasoning` option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) enables adaptive thinking at the corresponding effort level, so you don't need provider-specific configuration for the common case:

```typescript filename="top-level-reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum entanglement in simple terms.',
  reasoning: 'high', // Adaptive thinking with effort: 'high'
});

console.log('Thinking:', result.reasoningText);
console.log('Response:', result.text);
```

Use `providerOptions.anthropic` when you need Anthropic-specific features like a fixed token budget on older models, the `display` parameter, or interleaved thinking beta headers. If you set `thinking` in `providerOptions`, it takes precedence over the top-level `reasoning` value.

### Adaptive thinking (Claude 4.6 and later)

Configure adaptive thinking through `providerOptions`. Claude dynamically decides when and how much to think:

```typescript filename="adaptive-thinking.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum entanglement in simple terms.',
  providerOptions: {
    anthropic: {
      thinking: { type: 'adaptive' },
    },
  },
});

console.log('Thinking:', result.reasoningText);
console.log('Response:', result.text);
```

### Streaming with adaptive thinking

On Claude Opus 4.7 and later, set `display: 'summarized'` to receive reasoning text, which is omitted by default. See [Thinking display](#thinking-display-claude-opus-47-and-later).

#### AI SDK 7

```typescript filename="stream-adaptive.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Explain quantum entanglement in simple terms.',
  providerOptions: {
    anthropic: {
      thinking: { type: 'adaptive', display: 'summarized' },
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

```typescript filename="stream-adaptive.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Explain quantum entanglement in simple terms.',
  providerOptions: {
    anthropic: {
      thinking: { type: 'adaptive', display: 'summarized' },
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

### Extended thinking (Claude 4.6 and earlier)

For pre-4.7 models, use `type: 'enabled'` with a `budgetTokens` value. This is the only thinking mode supported on Claude 4, 4.1, 4.5, and Haiku 4.5; on Claude 4.6 it works but is deprecated; on Claude Opus 4.7 and later it returns a 400 error.

```typescript filename="extended-thinking.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-4',
  prompt: 'Explain quantum entanglement in simple terms.',
  providerOptions: {
    anthropic: {
      thinking: {
        type: 'enabled',
        budgetTokens: 5000,
      },
    },
  },
});

console.log('Thinking:', result.reasoningText);
console.log('Response:', result.text);
```

### Other API formats

You can configure thinking without the AI SDK through the gateway's `/v1/messages` endpoint using the Anthropic SDK in any language. The [OpenAI-compatible formats](/docs/ai-gateway/models-and-providers/reasoning#reasoning-across-api-formats) also work with Claude models: their `reasoning` parameter is mapped to Claude's thinking configuration.

#### TypeScript

```typescript filename="thinking-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-4.5',
  max_tokens: 8192,
  thinking: {
    type: 'enabled',
    budget_tokens: 5000,
  },
  messages: [
    {
      role: 'user',
      content: 'Explain quantum entanglement in simple terms.',
    },
  ],
});

for (const block of message.content) {
  if (block.type === 'thinking') {
    console.log('Thinking:', block.thinking);
  } else if (block.type === 'text') {
    console.log('Response:', block.text);
  }
}
```

#### Python

```python filename="thinking_messages.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-sonnet-4.5',
    max_tokens=8192,
    thinking={
        'type': 'enabled',
        'budget_tokens': 5000,
    },
    messages=[
        {
            'role': 'user',
            'content': 'Explain quantum entanglement in simple terms.'
        }
    ],
)

for block in message.content:
    if block.type == 'thinking':
        print('Thinking:', block.thinking)
    elif block.type == 'text':
        print('Response:', block.text)
```

#### cURL

```bash filename="thinking-messages.sh"
curl https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4.5",
    "max_tokens": 8192,
    "thinking": {
      "type": "enabled",
      "budget_tokens": 5000
    },
    "messages": [
      {
        "role": "user",
        "content": "Explain quantum entanglement in simple terms."
      }
    ]
  }'
```

## Parameters

### Adaptive thinking (Claude 4.6 and later)

| Parameter | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| `type`    | string | Set to `'adaptive'`                                                          |
| `effort`  | string | A model-supported value from `reasoning_options` in the [catalog](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support); set it as `providerOptions.anthropic.effort` |
| `display` | string | `'summarized'` to include reasoning text in the response, `'omitted'` (default on Claude Opus 4.7 and later) for empty thinking blocks. See [Thinking display](#thinking-display-claude-opus-47-and-later). |

### Extended thinking (Claude 4.6 and earlier)

| Parameter      | Type   | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| `type`         | string | Set to `'enabled'`                                |
| `budgetTokens` | number | Maximum number of tokens to allocate for thinking |

## Thinking display (Claude Opus 4.7 and later)

Starting with Claude Opus 4.7, thinking content is **omitted from the response by default**. Thinking blocks are still present in the stream, but their `text` is empty. To receive the model's reasoning output, set `display: 'summarized'`:

```typescript filename="opus-4-7-summarized.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Explain quantum entanglement in simple terms.',
  providerOptions: {
    anthropic: {
      thinking: { type: 'adaptive', display: 'summarized' },
    },
  },
});

console.log('Thinking:', result.reasoningText); // populated
console.log('Response:', result.text);
```

Without `display: 'summarized'`, `result.reasoningText` is empty on Claude Opus 4.7 and later. You're still billed for thinking tokens whether or not they're returned.

This applies to Claude Opus 4.7 and later and the Claude 5 models (Claude Sonnet 5, Claude Fable 5). Claude Opus 4.6 and Claude Sonnet 4.6 continue to return reasoning text by default.

## Interleaved thinking

Interleaved thinking lets Claude think between tool calls, producing better reasoning in multi-step workflows.

- **Claude Opus 4.6 and later**: Automatically enabled with adaptive thinking. No header needed.
- **Earlier models with extended thinking** (Claude Sonnet 4.6, Claude 4.5, Claude 4, Claude 4.1): Pass the `interleaved-thinking-2025-05-14` beta header when `type: 'enabled'` is set.

```typescript filename="interleaved-thinking.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Search for the weather and summarize it.',
  providerOptions: {
    anthropic: {
      thinking: { type: 'enabled', budgetTokens: 5000 },
      headers: {
        'anthropic-beta': 'interleaved-thinking-2025-05-14',
      },
    },
  },
  tools: {
    // your tools here
  },
});
```

With interleaved thinking, `budgetTokens` can exceed the model's max output tokens since it represents the total budget across all thinking blocks in a single turn.

For more details, see the [Anthropic extended thinking docs](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#interleaved-thinking).

## Summarized vs. full thinking

Claude 4 and later models return **summarized** thinking output, not full thinking tokens. You're charged for the full thinking tokens, but the response contains a condensed summary.


---

[View full sitemap](/docs/sitemap)
