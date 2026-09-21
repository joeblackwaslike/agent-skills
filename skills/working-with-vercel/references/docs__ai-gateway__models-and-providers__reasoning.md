---
title: AI Gateway Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/observability-and-spend/logs
summary: Discover model reasoning capabilities and configure effort across AI SDK, Chat Completions, Messages, and Responses with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "02e7d31c7e582669f174e1721c554e65d6642369ced19c2cc4744d2f324aca80"
---

# AI Gateway Reasoning

Control how much a model reasons before answering. Use the [model catalog](https://ai-gateway.vercel.sh/v1/models) to discover reasoning support and available controls, then set effort in your preferred API format.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related)
- [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related)
- [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related)
- [Cohere](https://ai-sdk.dev/providers/ai-sdk-providers/cohere?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related)
- [Moonshot AI](https://ai-sdk.dev/providers/ai-sdk-providers/moonshotai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related)
- [OpenResponses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related) — Control how much a reasoning model thinks before answering with the OpenResponses API through AI Gateway.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/reasoning.graph.md](/docs/ai-gateway/models-and-providers/reasoning.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Use a shared effort setting for routine requests. Use provider-specific options for exact token budgets, reasoning summaries, thinking display, or a native level that your SDK's shared option doesn't expose. The [AI SDK reasoning guide](https://ai-sdk.dev/docs/ai-sdk-core/reasoning) explains how to read reasoning output.

## Discover model reasoning support

Fetch `GET /v1/models` to find current model IDs and reasoning capabilities. This public endpoint requires no API key and works independently of the API format you use for generation.

- `tags` containing `reasoning` identify reasoning models.
- `reasoning_options` describes the available controls. An `effort` entry lists allowed `values`; `budget_tokens` can include `min` and `max`; `toggle` identifies an on/off control.
- `supported_parameters` lists broad parameter support. It doesn't replace the model's `reasoning_options` or the request format's parameter schema.

A model can list more than one control. Missing `reasoning_options` means the catalog doesn't specify the controls; it doesn't mean the model can't reason. The catalog doesn't expose a structured reasoning default. Set an effort explicitly when it matters, or consult the model provider's documentation for defaults.

These examples print each reasoning model's ID and its catalog controls. Run TypeScript with `node discover-reasoning.ts` on Node.js 24 or later, Python with `python3 discover_reasoning.py`, or the shell example with `bash discover-reasoning.sh` and `jq` installed:

#### TypeScript

```typescript filename="discover-reasoning.ts" {1,10-14,18-20}
const response = await fetch('https://ai-gateway.vercel.sh/v1/models');
if (!response.ok) {
  throw new Error(`Model discovery failed: ${response.status}`);
}

const { data: models }: {
  data: Array<{
    id: string;
    tags?: string[];
    reasoning_options?: Array<
      | { type: 'effort'; values: string[] }
      | { type: 'budget_tokens'; min?: number; max?: number }
      | { type: 'toggle' }
    >;
  }>;
} = await response.json();

for (const model of models) {
  if (model.tags?.includes('reasoning') || model.reasoning_options?.length) {
    console.log(model.id, model.reasoning_options ?? 'Controls not specified');
  }
}
```

#### Python

```python filename="discover_reasoning.py" {4,8-10}
import json
from urllib.request import urlopen

with urlopen("https://ai-gateway.vercel.sh/v1/models", timeout=30) as response:
    models = json.load(response)["data"]

for model in models:
    options = model.get("reasoning_options")
    if "reasoning" in model.get("tags", []) or options:
        print(model["id"], options if options is not None else "Controls not specified")
```

#### cURL

```bash filename="discover-reasoning.sh" {2-5}
set -o pipefail
curl --fail-with-body --silent --show-error https://ai-gateway.vercel.sh/v1/models | jq '
  .data[]
  | select(((.tags // []) | index("reasoning")) or ((.reasoning_options // []) | length > 0))
  | {id, reasoning_options: (.reasoning_options // "Controls not specified")}
'
```

Choose a level from the model's `effort.values` that your request format accepts. Don't copy a catalog value into an SDK option without checking the [format mapping](#reasoning-levels). If a model only lists a toggle or token budget, use that control instead of inventing an effort level.

See the [models REST reference](/docs/ai-gateway/sdks-and-apis/rest-api#list-models) for field definitions and [model endpoints](/docs/ai-gateway/sdks-and-apis/rest-api#get-model-endpoints) for serving providers. You can also browse the [Reasoning filter](/ai-gateway/models?capabilities=reasoning). This discovery flow includes new models as the catalog adds them.

## Quick start

See the [AI SDK reasoning guide](https://ai-sdk.dev/docs/ai-sdk-core/reasoning) for reasoning output, streaming, and provider configuration.

Choose a model and supported effort from the catalog, then use the corresponding request field below. These examples request `low` effort from Claude Sonnet 5 and print the answer; cURL prints the full JSON response:

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="reasoning.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  reasoning: 'low',
  model: "anthropic/claude-sonnet-5",
  prompt: "What is 17 times 24? Explain briefly.",
});

console.log(text);
```

#### Python (beta)

```python filename="reasoning_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("What is 17 times 24? Explain briefly.")]
    params = ai.InferenceRequestParams(reasoning=ai.ReasoningParams(effort="low"))
    async with ai.stream(model, messages, params=params) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="reasoning-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  reasoning_effort: "low",
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "What is 17 times 24? Explain briefly." }],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="reasoning_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    reasoning_effort="low",
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "What is 17 times 24? Explain briefly."}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="reasoning-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "What is 17 times 24? Explain briefly."
    }
  ],
  "reasoning_effort": "low"
}'
```

#### Messages API

#### TypeScript

```typescript filename="reasoning-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  thinking: { "type": "adaptive" },
  output_config: { "effort": "low" },
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "What is 17 times 24? Explain briefly." }],
  max_tokens: 1024,
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="reasoning_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    thinking={"type": "adaptive"},
    output_config={"effort": "low"},
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "What is 17 times 24? Explain briefly."}],
    max_tokens=1024,
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="reasoning-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "What is 17 times 24? Explain briefly."
    }
  ],
  "max_tokens": 1024,
  "thinking": {
    "type": "adaptive"
  },
  "output_config": {
    "effort": "low"
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="reasoning-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  reasoning: { "effort": "low" },
  model: "anthropic/claude-sonnet-5",
  input: "What is 17 times 24? Explain briefly.",
});

console.log(response.output_text);
```

#### Python

```python filename="reasoning_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    reasoning={"effort": "low"},
    model="anthropic/claude-sonnet-5",
    input="What is 17 times 24? Explain briefly.",
)

print(response.output_text)
```

#### cURL

```bash filename="reasoning-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "What is 17 times 24? Explain briefly.",
  "reasoning": {
    "effort": "low"
  }
}'
```

The TypeScript `reasoning` shorthand belongs to AI SDK 7. The Python beta uses `ReasoningParams(effort=...)`. Chat Completions uses `reasoning_effort`, Messages uses `thinking` and `output_config.effort`, and Responses uses `reasoning.effort`. The request format determines the field; the model and serving provider determine how it applies.

### AI SDK 6

The top-level `reasoning` option and the `stream` property require AI SDK 7 or later. On AI SDK 6, configure reasoning through [provider options](#provider-specific-configuration) and iterate `result.fullStream` (renamed to `stream` in AI SDK 7):

```typescript filename="reasoning-v6.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-6-astra',
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

AI SDK 7's TypeScript `reasoning` option accepts these values. They describe relative effort, not a fixed token count or the complete set of native levels for every model:

| Value                | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| `'provider-default'` | Use the provider's default reasoning behavior. This is the default when unset.       |
| `'none'`             | Request that reasoning be turned off, where the model supports it.                                                                  |
| `'minimal'`          | Bare-minimum reasoning. Best for latency-sensitive workloads.                        |
| `'low'`              | Fast, concise reasoning for simpler tasks.                                           |
| `'medium'`           | Balanced reasoning for most tasks.                                                   |
| `'high'`             | Thorough reasoning for complex tasks.                                                |
| `'xhigh'`            | Highest effort exposed by the AI SDK 7 shorthand.                                                             |

Use the setting for your API format:

| Format | Effort setting | Format-specific behavior |
| ------ | -------------- | ------------------------ |
| AI SDK 7 TypeScript | `reasoning: 'high'` | Accepts `provider-default`, `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. It doesn't accept `max`. |
| AI SDK Python (beta) | `ai.ReasoningParams(effort="high")` | The beta maps OpenAI and Claude effort to provider options; other models use shared effort. Use a supported string for the selected model. See the [Python reasoning parameters](https://ai-python.dev/docs/reference/ai#request-params). |
| Chat Completions | `reasoning_effort: "high"` or `reasoning: { effort: "high" }` | The nested `reasoning.effort` takes precedence when both are present. The nested object is a Gateway extension in OpenAI clients. |
| Messages API | `thinking: { type: "adaptive" }` and `output_config: { effort: "high" }` | Adaptive thinking applies to supported Claude models. Legacy token-budget thinking uses a different shape. See [Messages reasoning](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning). |
| Responses / OpenResponses | `reasoning: { effort: "high" }` | Native OpenAI routing and cross-provider OpenResponses can apply different model-specific mappings. See [Responses routing](/docs/ai-gateway/sdks-and-apis/responses). |

The HTTP Chat Completions and Responses schemas also accept `max`. AI SDK 7's shorthand doesn't. AI Gateway's cross-provider translation can map `max` to `xhigh`; Anthropic adaptive thinking can retain native `max`. A catalog value describes a model capability, not a guarantee that every SDK or routing path forwards the value unchanged.

AI Gateway maps shared effort to the serving provider's configuration. Some providers use named levels, others use token budgets, and some models don't let you disable reasoning. Use [provider-specific configuration](#provider-specific-configuration) when exact native behavior matters. A successful request alone doesn't prove that a provider honored an effort level.

## Verify reasoning behavior

Check both the response and the configuration when testing a model or changing API formats:

- Confirm the request field and level match the [format mapping](#reasoning-levels), and wait for the response or stream to finish.
- Inspect reasoning-token usage when the provider reports it: `usage.outputTokenDetails.reasoningTokens` in AI SDK 7, `usage.reasoning_tokens` in the Python beta, `usage.completion_tokens_details.reasoning_tokens` in Chat Completions, or `usage.output_tokens_details.reasoning_tokens` in Responses.
- In Messages, inspect returned thinking blocks and the provider's available usage metadata. Request summarized display on supported Claude models when you need visible thinking text.

Positive reasoning-token usage or thinking content shows that reasoning occurred. It doesn't prove an exact effort level or token budget. Missing text can reflect a display setting, and missing usage can reflect provider reporting. Check [request logs](/docs/ai-gateway/observability-and-spend/logs) and provider-specific documentation when the response doesn't establish the behavior you need.

## Provider-specific configuration

The catalog covers reasoning models across creators, including Grok, DeepSeek, Qwen, Kimi, MiniMax, and GLM. The guides below describe native API differences; they are not an exhaustive model list. Use [catalog discovery](#discover-model-reasoning-support) for current capabilities.

For finer control, pass each provider's native reasoning configuration through `providerOptions`. This unlocks provider-specific features like exact token budgets, reasoning summaries, and thinking display modes:

```typescript filename="reasoning-provider-options.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-6-astra',
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
| [Anthropic](/docs/ai-gateway/models-and-providers/reasoning/anthropic)            | Claude 4 series and later                                    | `thinking`: adaptive on Claude 4.6 and later; token budget on Claude 4.5 and earlier, with deprecated support on Claude 4.6 |
| [Google / Vertex](/docs/ai-gateway/models-and-providers/reasoning/google)         | Gemini reasoning models    | `thinkingLevel` or `thinkingBudget`, with `includeThoughts` for summaries |
| [Amazon Bedrock](/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock)  | Anthropic Claude models via Bedrock                          | `reasoningConfig`: adaptive on Claude 4.6 and later; token budget on Claude 4.5 and earlier, with deprecated support on Claude 4.6 |

### Precedence

The top-level `reasoning` option and reasoning-related provider options are never merged. If you set a reasoning-related option in `providerOptions` (like `reasoningEffort`, `thinking`, or `thinkingConfig`), it takes full precedence and the top-level `reasoning` value is ignored:

```typescript filename="reasoning-precedence.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-6-astra',
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

Use the top-level `reasoning` option to configure shared effort with fallbacks. AI Gateway translates the level for the serving provider. Check the supported controls for each fallback model:

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

Each format's reasoning parameter works across supported reasoning models, including models from other providers. AI Gateway maps the parameter to the target provider's native configuration. For example, you can set the OpenAI-style `reasoning` object on a request to an Anthropic model, or the Anthropic-style `thinking` parameter on a request to an OpenAI model.

### OpenAI Chat Completions

Set the `reasoning` object on requests to `/v1/chat/completions`:

#### TypeScript

```typescript filename="reasoning-chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5', // Mapped to Anthropic's thinking config
  messages: [
    {
      role: 'user',
      content: 'Explain the Monty Hall problem step by step.',
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
  model: 'openai/gpt-6-astra', // Mapped to OpenAI's reasoning config
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
    model='openai/gpt-6-astra',  # Mapped to OpenAI's reasoning config
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
    "model": "openai/gpt-6-astra",
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

### How reasoning is mapped

For cross-provider requests, AI Gateway translates shared reasoning controls for the serving provider:

- **An effort level** comes from the SDK or HTTP fields in [Reasoning levels](#reasoning-levels). The HTTP formats can accept levels, such as `max`, that the AI SDK 7 shorthand doesn't expose.
- **An on/off control** comes from `reasoning.enabled` in Chat Completions or `thinking.type` in Messages. Some models require reasoning and cannot turn it off.
- **A token budget** comes from the `reasoning.max_tokens` field in the Chat Completions format, or the `thinking.budget_tokens` field in the Anthropic Messages format.

The following mappings describe AI Gateway's shared effort translation. Explicit native provider options and native OpenAI Responses routing can behave differently:

| Target model                     | Native configuration                  | How the effort level is applied                                                                                                                            |
| -------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI reasoning models          | `reasoningEffort`                     | AI Gateway sends named effort. The shared translation maps `max` to `xhigh` and adjusts some unsupported values; native routes can retain native levels.                                                      |
| Anthropic Claude 4.7 and later   | Adaptive thinking `effort`            | AI Gateway sets adaptive thinking. `minimal` maps to `low`; `max` maps to `xhigh`. Other enabled effort levels pass through.                                                                                              |
| Anthropic Claude 4.6             | Adaptive thinking `effort`            | AI Gateway sets adaptive thinking. `minimal` maps to `low`; `xhigh` and `max` map to `max`. Other enabled effort levels pass through. Token-budget configurations are deprecated.                                                       |
| Anthropic Claude 4.5 and earlier | `budgetTokens`                        | Converted to a thinking budget sized as a share of the maximum output tokens.                                                                               |
| Google Gemini 3 and later        | `thinkingLevel`                       | `low` maps to `low`; all other effort levels map to `high`.                                                                                                             |
| Google Gemini 2.5                | `thinkingBudget`                      | Fixed budgets: `none` sets `thinkingBudget: 0`; `minimal` uses the model-specific minimum; `low` uses 1,024 tokens; `medium` uses 8,192; and `high`, `xhigh`, or `max` uses 24,576.                                                                               |
| Amazon Bedrock (Claude models)   | `reasoningConfig`                     | Uses adaptive effort on Claude 4.6 and later. Claude 4.6 also accepts deprecated token budgets, while earlier models use token budgets only.                 |

To request a native Anthropic effort without shared translation, set `providerOptions.anthropic.effort` in the AI SDK or `output_config.effort` in the Messages API. Native `max` remains `max` when the serving model supports it. See [Anthropic reasoning](/docs/ai-gateway/models-and-providers/reasoning/anthropic) for model-specific support.

For Anthropic's budget-based configurations, each effort level corresponds to a share of the request's maximum output tokens, clamped between 1,024 and 64,000 tokens:

| Effort level | Share of maximum output tokens |
| ------------ | ------------------------------ |
| `none`       | Reasoning disabled             |
| `minimal`    | ~10%                           |
| `low`        | ~20%                           |
| `medium`     | ~50%                           |
| `high`       | ~80%                           |
| `xhigh`      | ~80%                           |

Token budgets flow the other way too. AI Gateway passes the budget through directly when the target model accepts budget-based thinking, such as Gemini 2.5 and Claude models with a catalog `budget_tokens` control. For OpenAI reasoning models, AI Gateway translates a token-budget request to a named effort level; this doesn't enforce an exact reasoning-token cap. Claude 4.7 and later don't accept token-budget configurations.

For the full reasoning parameter reference for each API format, see:

- [Chat Completions reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning#reasoning-parameters) for the `reasoning` object (`enabled`, `effort`, `max_tokens`, `exclude`)
- [Anthropic Messages API extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) for `thinking` and `output_config.effort`
- [Responses API reasoning](/docs/ai-gateway/sdks-and-apis/responses/reasoning) for the `reasoning` object (`effort`, plus `summary` on supported models)


---

[View full sitemap](/docs/sitemap)
