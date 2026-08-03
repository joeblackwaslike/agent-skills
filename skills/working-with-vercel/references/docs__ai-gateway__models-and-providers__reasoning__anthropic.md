---
title: Anthropic Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/anthropic
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/anthropic"
last_updated: 2026-07-27
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/models-and-providers/reasoning
summary: Configure adaptive and extended thinking for Anthropic Claude models with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/anthropic.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "0e52c4edf7694b76a58a348d1bc0d258d3d54ea656fa8c33890e934d758db77d"
---

# Anthropic Reasoning

Anthropic Claude models support thinking, which lets the model reason through complex problems before producing a final answer. Claude 4.6 introduced adaptive thinking, where Claude dynamically decides when and how much to think based on an effort level. On Claude Opus 4.7 and later and the Claude 5 models (Claude Opus 5, Claude Sonnet 5, Claude Fable 5), adaptive thinking is the only way to turn thinking on. The legacy fixed-budget API is no longer accepted on those models.

## Two thinking modes

- **Adaptive thinking**: Set `thinking: { type: 'adaptive' }`. Claude dynamically decides when and how much to think based on the `effort` parameter. Available on Claude 4.6 and later. The only way to turn thinking on for Claude Opus 4.7 and later and the Claude 5 models.
- **Extended thinking with a token budget**: Set `thinking: { type: 'enabled', budgetTokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier. Deprecated on Claude 4.6. **Removed on Claude Opus 4.7 and later and the Claude 5 models**: requests with `type: 'enabled'` return a 400 error. Migrate to adaptive thinking.

### What happens when you leave `thinking` unset

The default flips at Claude 5, not at Claude Opus 4.7:

| Models                                                        | Thinking when `thinking` is unset |
| ------------------------------------------------------------- | --------------------------------- |
| Claude Opus 5, Claude Sonnet 5, Claude Fable 5                | Runs adaptive thinking            |
| Claude Opus 4.8, Claude Opus 4.7, Claude 4.6 and earlier      | No thinking                       |

If you're migrating off `budgetTokens`, set `thinking: { type: 'adaptive' }` explicitly on Claude Opus 4.7 and 4.8. Dropping the parameter turns thinking off on those models rather than falling back to adaptive.

To turn thinking off, set `thinking: { type: 'disabled' }`. Two exceptions: Claude Fable 5 can't turn thinking off at all, and Claude Opus 5 accepts `disabled` only at an `effort` of `high` or lower. Pairing it with `xhigh` or `max` returns a 400.

## Supported models

To see the current list of Anthropic reasoning models, use the **Reasoning** filter on the [AI Gateway models page](https://vercel.com/ai-gateway/models?capabilities=reasoning\&providers=anthropic). Which thinking mode a model accepts follows its series:

| Model series                                          | Adaptive thinking | Extended thinking (token budget) |
| ----------------------------------------------------- | ----------------- | -------------------------------- |
| Claude 5 (`opus-5`, `fable-5`, `sonnet-5`)            | ✓ (default)       | — (returns 400)                  |
| Claude Opus 4.7, Claude Opus 4.8                      | ✓                 | — (returns 400)                  |
| Claude 4.6 (`opus-4.6`, `sonnet-4.6`)                 | ✓                 | ✓ (deprecated)                   |
| Claude 4.5 (`opus-4.5`, `sonnet-4.5`), Claude Haiku 4.5 | —                 | ✓                                |
| Claude 4 / 4.1 (`opus-4`, `opus-4.1`, `sonnet-4`)     | —                 | ✓                                |

### Effort levels (adaptive thinking)

When you enable adaptive thinking, set the `effort` parameter to control depth. The supported levels and default follow the model series:

| Model series                        | Effort levels                           | Default |
| ----------------------------------- | --------------------------------------- | ------- |
| Claude 5, Claude Opus 4.8, Claude Opus 4.7 | `low`, `medium`, `high`, `xhigh`, `max` | `high`  |
| Claude Opus 4.6                     | `low`, `medium`, `high`, `max`          | `high`  |
| Claude Sonnet 4.6                   | `low`, `medium`, `high`                 | `high`  |

| Level    | Description                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| `max`    | Absolute maximum capability. Not supported on Claude Sonnet 4.6.              |
| `xhigh`  | Above `high` but below `max`. Not supported on Claude 4.6 models.             |
| `high`   | High capability (default). Complex reasoning, difficult coding, agentic tasks |
| `medium` | Balanced speed, cost, and performance.                                        |
| `low`    | Most efficient. Best for simpler tasks and latency-sensitive workloads.       |

> **💡 Note:** Requests using an unsupported effort level for a model return an error. For
> example, `max` on Claude Sonnet 4.6 and `xhigh` on Claude Opus 4.6 both
> return 400.

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
