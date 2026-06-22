---
title: Anthropic
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/anthropic
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/anthropic"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  []
summary: Learn about anthropic on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/anthropic.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "1da0bdb8a433e2432f207e9c03fe8e947a48cbef062c7d4e9a8af943657ab1ea"
---

# Anthropic Reasoning

Anthropic Claude models support thinking, which lets the model reason through complex problems before producing a final answer. Claude 4.6 introduced adaptive thinking, where Claude dynamically decides when and how much to think based on an effort level. Claude Opus 4.7 and later require adaptive thinking — the legacy fixed-budget API is no longer accepted.

## Two thinking modes

- **Adaptive thinking** — Set `thinking: { type: 'adaptive' }`. Claude dynamically decides when and how much to think based on the `effort` parameter. Available on Claude 4.6 and later. Required on Claude Opus 4.7 and later.
- **Extended thinking with a token budget** — Set `thinking: { type: 'enabled', budgetTokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier. Deprecated on Claude 4.6. **Removed on Claude Opus 4.7 and later**: requests with `type: 'enabled'` return a 400 error. Migrate to adaptive thinking.

By default, no thinking happens. Send the `thinking` field explicitly to enable either mode.

## Supported models

| Model series                                          | Adaptive thinking | Extended thinking (token budget) |
| ----------------------------------------------------- | ----------------- | -------------------------------- |
| Claude Opus 4.7 and later                             | ✓                 | — (returns 400)                  |
| Claude 4.6 (`opus-4.6`, `sonnet-4.6`)                 | ✓                 | ✓ (deprecated)                   |
| Claude 4.5 (`opus-4.5`, `sonnet-4.5`), Claude Haiku 4.5 | —                 | ✓                                |
| Claude 4 / 4.1 (`opus-4`, `opus-4.1`, `sonnet-4`)     | —                 | ✓                                |

### Effort levels (adaptive thinking)

When you enable adaptive thinking, set the `effort` parameter to control depth. Each model defines its own effort vocabulary and default:

| Model                         | Effort levels                             | Default |
| ----------------------------- | ----------------------------------------- | ------- |
| `anthropic/claude-opus-4.7`   | `low`, `medium`, `high`, `xhigh`, `max`   | `high`  |
| `anthropic/claude-opus-4.6`   | `low`, `medium`, `high`, `max`            | `high`  |
| `anthropic/claude-sonnet-4.6` | `low`, `medium`, `high`                   | `high`  |

| Level    | Description                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| `max`    | Absolute maximum capability. Claude Opus models only.                         |
| `xhigh`  | Above `high` but below `max`. Claude Opus 4.7 and later only.                 |
| `high`   | High capability (default). Complex reasoning, difficult coding, agentic tasks |
| `medium` | Balanced speed, cost, and performance.                                        |
| `low`    | Most efficient. Best for simpler tasks and latency-sensitive workloads.       |

> **💡 Note:** Requests using an unsupported effort level for a model return an error. For
> example, `max` on Claude Sonnet 4.6 and `xhigh` on Claude Opus 4.6 both
> return 400.

For more details, see the [Anthropic extended thinking docs](https://platform.claude.com/docs/en/build-with-claude/extended-thinking), [adaptive thinking docs](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking), and [effort parameter docs](https://platform.claude.com/docs/en/build-with-claude/effort).

## Getting started

### Adaptive thinking (Claude 4.6 and later)

Configure adaptive thinking through `providerOptions`. Claude dynamically decides when and how much to think:

```typescript filename="adaptive-thinking.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.6',
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

On Claude Opus 4.7, set `display: 'summarized'` to receive reasoning text — it's omitted by default. See [Thinking display](#thinking-display-claude-opus-47-and-later).

```typescript filename="stream-adaptive.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-4.7',
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

## Parameters

### Adaptive thinking (Claude 4.6 and later)

| Parameter | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| `type`    | string | Set to `'adaptive'`                                                          |
| `effort`  | string | One of `'low'`, `'medium'`, `'high'`, `'xhigh'`, or `'max'` (see the effort levels table for which levels each model accepts) |
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
  model: 'anthropic/claude-opus-4.7',
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

Without `display: 'summarized'`, `result.reasoningText` is empty on Opus 4.7. You're still billed for thinking tokens whether or not they're returned.

This applies to Claude Opus 4.7 only. Claude Opus 4.6 and Claude Sonnet 4.6 continue to return reasoning text by default.

## Interleaved thinking

Interleaved thinking lets Claude think between tool calls, producing better reasoning in multi-step workflows.

- **Claude Opus 4.6 and later**: Automatically enabled with adaptive thinking. No header needed.
- **Earlier models with extended thinking** (Claude Sonnet 4.6, Claude 4.5, Claude 4, Claude 4.1): Pass the `interleaved-thinking-2025-05-14` beta header when `type: 'enabled'` is set.

```typescript filename="interleaved-thinking.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.6',
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

Claude 4 models return **summarized** thinking output, not full thinking tokens. You're charged for the full thinking tokens, but the response contains a condensed summary. Claude Sonnet 3.7 returns full thinking output.


---

[View full sitemap](/docs/sitemap)
