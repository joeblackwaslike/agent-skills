---
title: Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning"
last_updated: 2026-07-28
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ff8521380e9d1f8863112a38609f10b6ef63f55439cad30acba55553dfd4e74f"
---

# Reasoning

Reasoning models can "think" before responding, producing higher-quality answers for complex tasks like coding, math, and multi-step analysis. AI Gateway supports reasoning across multiple providers, including OpenAI, Anthropic, Google, Vertex AI, and Amazon Bedrock. To see every model that supports reasoning, use the **Reasoning** filter on the [AI Gateway models page](https://vercel.com/ai-gateway/models?capabilities=reasoning).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related)
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related)
- [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic?from=related)
- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning?from=related) — Control how much a reasoning model thinks before answering with the OpenResponses API.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/reasoning.graph.md](/docs/ai-gateway/models-and-providers/reasoning.graph.md)
<!-- /docsgraph:related -->

There are two ways to configure reasoning with the [AI SDK](https://ai-sdk.dev):

- **Top-level `reasoning` option**: Set a single effort level that works across providers. The AI SDK translates it to each provider's native reasoning API. Available in AI SDK 7 and later.
- **Provider-specific `providerOptions`**: Pass each provider's native reasoning configuration directly. Use this when you need provider-specific features like exact token budgets or reasoning summaries.

## Quick start

Set the `reasoning` option to control reasoning depth with one line. It works with any supported provider, so you can switch models without rewriting your reasoning configuration:

#### streamText

```typescript filename="reasoning.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Explain the Monty Hall problem step by step.',
  reasoning: 'high',
});

for await (const part of result.stream) {
  if (part.type === 'reasoning-delta') {
    process.stdout.write(part.text);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.text);
  }
}
```

#### generateText

```typescript filename="reasoning.ts"
import { generateText } from 'ai';

const { text, reasoningText } = await generateText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Explain the Monty Hall problem step by step.',
  reasoning: 'high',
});

console.log('Reasoning:', reasoningText);
console.log('Answer:', text);
```

### AI SDK 6

The top-level `reasoning` option and the `stream` property require AI SDK 7 or later. On AI SDK 6, configure reasoning through [provider options](#provider-specific-configuration) and iterate `result.fullStream` (renamed to `stream` in AI SDK 7):

```typescript filename="reasoning-v6.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Explain the Monty Hall problem step by step.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
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

## Reasoning levels

The `reasoning` option accepts these values:

| Value                | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| `'provider-default'` | Use the provider's default reasoning behavior. This is the default when unset.       |
| `'none'`             | Turn reasoning off.                                                                  |
| `'minimal'`          | Bare-minimum reasoning. Best for latency-sensitive workloads.                        |
| `'low'`              | Fast, concise reasoning for simpler tasks.                                           |
| `'medium'`           | Balanced reasoning for most tasks.                                                   |
| `'high'`             | Thorough reasoning for complex tasks.                                                |
| `'xhigh'`            | Maximum reasoning depth.                                                             |

The AI SDK maps the level to each provider's native configuration:

- **Effort-based providers** (like OpenAI and Anthropic) receive the level directly. If a model supports fewer levels, the AI SDK coerces the value to the nearest supported level and emits a warning.
- **Budget-based providers** (like Google Gemini 2.5) map the level to a percentage of the model's maximum output tokens.
- **Providers without reasoning support** (like Mistral, Perplexity, and Cohere) ignore the option and emit an `unsupported` warning.

## Provider-specific configuration

For finer control, pass each provider's native reasoning configuration through `providerOptions`. This unlocks provider-specific features like exact token budgets, reasoning summaries, and thinking display modes:

```typescript filename="reasoning-provider-options.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Explain the Monty Hall problem step by step.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'detailed',
    },
  },
});
```

See the provider pages for each provider's full configuration reference:

| Provider                                                                          | Models                                                       | Configuration                                                                                          |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| [OpenAI](/docs/ai-gateway/models-and-providers/reasoning/openai)                  | GPT-5 series, o-series                                       | `reasoningEffort` + `reasoningSummary`                                                                 |
| [Anthropic](/docs/ai-gateway/models-and-providers/reasoning/anthropic)            | Claude 4 series and later                                    | `thinking`: adaptive (Claude 4.6 and later) or token budget (Claude 4.5 and earlier)                   |
| [Google / Vertex](/docs/ai-gateway/models-and-providers/reasoning/google)         | Gemini 2.5 and later series, Gemma 4 (Google AI + Vertex)    | `thinkingLevel` (Gemini 3 and later), `thinkingBudget` (Gemini 2.5), or `chat_template_kwargs` (Gemma) |
| [Amazon Bedrock](/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock)  | Anthropic Claude models via Bedrock                          | `reasoningConfig`: adaptive (Claude 4.6 and later) or token budget (Claude 4.5 and earlier)            |

### Precedence

The top-level `reasoning` option and reasoning-related provider options are never merged. If you set a reasoning-related option in `providerOptions` (like `reasoningEffort`, `thinking`, or `thinkingConfig`), it takes full precedence and the top-level `reasoning` value is ignored:

```typescript filename="reasoning-precedence.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Explain the Monty Hall problem step by step.',
  reasoning: 'low', // Ignored: providerOptions takes precedence
  providerOptions: {
    openai: {
      reasoningEffort: 'high', // This wins
    },
  },
});
```

When migrating to the top-level option, remove overlapping reasoning settings from `providerOptions` so they don't silently override your configuration. Non-reasoning provider options (like `reasoningSummary` for OpenAI or `includeThoughts` for Google) can coexist with the top-level `reasoning` option.

## Good to know

- **Reasoning vs. reasoning text**: A model can reason internally without producing visible thinking or reasoning text in the response. Whether reasoning text is returned depends on the model and provider configuration.
- **Reasoning token usage**: Some providers report reasoning tokens separately in usage metrics (e.g., OpenAI includes `reasoning_tokens` in `completion_tokens_details`), but not all do. Anthropic counts thinking tokens as output tokens with no separate breakdown.
- **Streaming reasoning to the UI**: If you use `useChat` from the AI SDK, reasoning text is streamed to the client by default. You can disable this with the `sendReasoning` option. See the [AI SDK `useChat` transport docs](https://ai-sdk.dev/docs/reference/ai-sdk-ui/direct-chat-transport#send-reasoning) for details.

## Reasoning with provider fallbacks

Models like `anthropic/claude-opus-5` are available through multiple providers (Anthropic, Amazon Bedrock, Google Vertex). When you combine reasoning with [provider routing](/docs/ai-gateway/models-and-providers/provider-options), AI Gateway routes to the first available provider.

The top-level `reasoning` option is the simplest way to configure reasoning with fallbacks. Whichever provider serves the request, the AI SDK translates the level to that provider's native format:

```typescript filename="reasoning-with-fallbacks.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Prove that there are infinitely many primes.',
  reasoning: 'high', // Works whether Anthropic, Bedrock, or Vertex serves the request
});
```

If you need provider-specific reasoning features, set an entry in `providerOptions` for each provider the request can route to. The provider that handles the request uses its matching entry:

```typescript filename="reasoning-with-fallbacks-provider-options.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-5',
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

## Reasoning across API formats

You don't need the AI SDK to use reasoning through AI Gateway. The [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), and [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) API formats each accept their own reasoning parameter.

Each format's reasoning parameter works with any reasoning model, not just models from the provider that defined the format. AI Gateway maps the parameter to the target provider's native configuration. For example, you can set the OpenAI-style `reasoning` object on a request to an Anthropic model, or the Anthropic-style `thinking` parameter on a request to an OpenAI model.

### OpenAI Chat Completions

Set the `reasoning` object on requests to `/v1/chat/completions`:

#### TypeScript

```typescript filename="reasoning-chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - reasoning parameter not yet in OpenAI types
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5', // Mapped to Anthropic's thinking config
  messages: [
    { role: 'user', content: 'Explain the Monty Hall problem step by step.' },
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
    model='anthropic/claude-opus-5',  # Mapped to Anthropic's thinking config
    messages=[
        {
            'role': 'user',
            'content': 'Explain the Monty Hall problem step by step.'
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
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Explain the Monty Hall problem step by step."
      }
    ],
    "reasoning": {
      "effort": "high"
    }
  }'
```

### OpenAI Responses

Set the `reasoning` object on requests to `/v1/responses`:

#### TypeScript

```typescript filename="reasoning-responses.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await openai.responses.create({
  model: 'anthropic/claude-sonnet-5', // Mapped to Anthropic's thinking config
  input: 'Explain the Monty Hall problem step by step.',
  reasoning: {
    effort: 'high',
  },
  max_output_tokens: 2048,
});

console.log(response.output_text);
```

#### Python

```python filename="reasoning_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.responses.create(
    model='anthropic/claude-sonnet-5',  # Mapped to Anthropic's thinking config
    input='Explain the Monty Hall problem step by step.',
    reasoning={
        'effort': 'high'
    },
    max_output_tokens=2048,
)

print(response.output_text)
```

#### cURL

```bash filename="reasoning-responses.sh"
curl https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "input": "Explain the Monty Hall problem step by step.",
    "reasoning": {
      "effort": "high"
    },
    "max_output_tokens": 2048
  }'
```

### Anthropic Messages

Set the `thinking` parameter on requests to `/v1/messages`:

#### TypeScript

```typescript filename="reasoning-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'openai/gpt-5.6-sol', // Mapped to OpenAI's reasoning config
  max_tokens: 2048,
  thinking: {
    type: 'enabled',
    budget_tokens: 5000,
  },
  messages: [
    {
      role: 'user',
      content: 'Explain the Monty Hall problem step by step.',
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

```python filename="reasoning_messages.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='openai/gpt-5.6-sol',  # Mapped to OpenAI's reasoning config
    max_tokens=2048,
    thinking={
        'type': 'enabled',
        'budget_tokens': 5000,
    },
    messages=[
        {
            'role': 'user',
            'content': 'Explain the Monty Hall problem step by step.'
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

```bash filename="reasoning-messages.sh"
curl https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "max_tokens": 2048,
    "thinking": {
      "type": "enabled",
      "budget_tokens": 5000
    },
    "messages": [
      {
        "role": "user",
        "content": "Explain the Monty Hall problem step by step."
      }
    ]
  }'
```

### How reasoning is mapped

Whichever format you use, AI Gateway normalizes your reasoning configuration into one of two shapes, then converts it to what the target model's provider expects:

- **An effort level** (`none`, `minimal`, `low`, `medium`, `high`, or `xhigh`) comes from the AI SDK top-level `reasoning` option, or the `reasoning.effort` field in the Chat Completions and Responses formats.
- **A token budget** comes from the `reasoning.max_tokens` field in the Chat Completions format, or the `thinking.budget_tokens` field in the Anthropic Messages format.

Effort levels are applied to each provider like this:

| Target model                     | Native configuration       | How the effort level is applied                                                                        |
| -------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
| OpenAI reasoning models          | `reasoningEffort`          | Passed through directly. Levels the model doesn't support are coerced to the nearest supported level.  |
| Anthropic Claude 4.6 and later   | Adaptive thinking `effort` | Passed through directly as the adaptive thinking effort level.                                          |
| Anthropic Claude 4.5 and earlier | `budgetTokens`             | Converted to a thinking budget sized as a share of the maximum output tokens.                           |
| Google Gemini 3 and later        | `thinkingLevel`            | Mapped to the closest supported thinking level.                                                         |
| Google Gemini 2.5                | `thinkingBudget`           | Converted to a thinking budget sized as a share of the maximum output tokens.                           |
| Amazon Bedrock (Claude models)   | `reasoningConfig`          | Same as Anthropic: adaptive effort on Claude 4.6 and later, thinking budget on earlier models.          |

For budget-based configurations, each effort level corresponds to a share of the model's maximum output tokens:

| Effort level | Share of maximum output tokens |
| ------------ | ------------------------------ |
| `none`       | Reasoning disabled             |
| `minimal`    | ~10%                           |
| `low`        | ~20%                           |
| `medium`     | ~50%                           |
| `high`       | ~80%                           |
| `xhigh`      | ~95%                           |

Token budgets flow the other way too. When the target model uses budget-based thinking (like Gemini 2.5 or Claude 4.5 and earlier), the budget is passed through directly. When the target model uses effort-based reasoning (like OpenAI models or Claude 4.6 and later), AI Gateway converts the budget to an equivalent effort level.

For the full reasoning parameter reference for each API format, see:

- [Chat Completions reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning#reasoning-parameters) for the `reasoning` object (`enabled`, `effort`, `max_tokens`, `exclude`)
- [Responses API reasoning](/docs/ai-gateway/sdks-and-apis/responses/reasoning) for the `reasoning` object (`effort`, plus `summary` on OpenAI models)
- [Anthropic Messages API extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) for the `thinking` parameter


---

[View full sitemap](/docs/sitemap)
