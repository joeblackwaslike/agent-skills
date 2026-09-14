---
title: AI Gateway Fast Mode
product: vercel
url: /docs/ai-gateway/models-and-providers/fast-mode
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/coding-agents/claude-code
summary: Request the faster serving path for supported models through AI Gateway using the `speed` option or the fast model slug, with automatic fallback to...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "dc250652aa5a00e7fb2e9a8a18ce91dbb7e2d0977b62003bbc844af9c61a9c67"
---

# AI Gateway Fast Mode

Some models expose a faster serving path that trades a higher per-token cost for lower latency. You can request this fast tier through AI Gateway with the unified `gateway.speed` option or by using a fast slug.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway adds unified fast mode support](https://vercel.com/changelog/ai-gateway-adds-unified-fast-mode-support?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Ffast-mode&source_site=vercel-docs&relationship=related)
- [Opus 4.6 Fast Mode available on AI Gateway](https://vercel.com/changelog/opus-4-6-fast-mode-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Ffast-mode&source_site=vercel-docs&relationship=related)
- [Fast mode for Opus 4.7 available on AI Gateway](https://vercel.com/changelog/fast-mode-for-opus-4-7-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Ffast-mode&source_site=vercel-docs&relationship=related)
- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Ffast-mode&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [Service tiers now available on AI Gateway](https://vercel.com/changelog/service-tiers-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Ffast-mode&source_site=vercel-docs&relationship=related)
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Ffast-mode&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/fast-mode.graph.md](/docs/ai-gateway/models-and-providers/fast-mode.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Ffast-mode&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Requesting `speed: 'fast'` on a model that has no fast tier has no effect. The request runs at standard speed. See the supported models below for the current list.

## Supported models

Fast mode is available for a growing set of models. Find the supported fast mode models in the [AI Gateway models list](/ai-gateway/models?features=fast). Use a model's fast slug, or set `speed: 'fast'` on the base model.

## Requesting the fast tier

There are two ways to request fast mode, and they produce the same result:

- `gateway.speed: 'fast'`: A unified option that upgrades the primary model to its fast serving path when one is routable. For example, `anthropic/claude-opus-5` with `speed: 'fast'` behaves like calling `anthropic/claude-opus-5-fast`, and `moonshotai/kimi-k2.7-code` with `speed: 'fast'` routes to that model's fast slug.
- An explicit fast slug: Address the fast variant directly using its fast slug. This is the same as setting `speed: 'fast'` on the base model.

Use the `speed` option when you want one configuration that stays on the base model ID and falls back to standard speed if fast mode is not available. Use an explicit fast slug when you want to name the fast variant directly, such as in a `gateway.models` fallback list.

### Using the `speed` option

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="fast-mode.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      speed: 'fast',
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="fast-mode_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-opus-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"speed": "fast"}}}
    )
    async with ai.stream(model, messages, params=params) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="fast-mode-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        speed: 'fast',
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="fast-mode_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-opus-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"speed": "fast"}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="fast-mode-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-opus-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "speed": "fast"
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="fast-mode-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  max_tokens: 1024,
  ...{
    providerOptions: {
      gateway: {
        speed: 'fast',
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="fast-mode_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-opus-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"speed": "fast"}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="fast-mode-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-opus-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "speed": "fast"
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="fast-mode-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-opus-5',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        speed: 'fast',
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="fast-mode_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-opus-5",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"speed": "fast"}}},
)

print(response.output_text)
```

#### cURL

```bash filename="fast-mode-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-opus-5",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "speed": "fast"
    }
  }
}'
```

### Using an explicit fast slug

Use any fast slug from the [supported models list](/ai-gateway/models?features=fast).

#### AI SDK

#### TypeScript

```typescript filename="fast-slug.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: "anthropic/claude-opus-5-fast",
  prompt: "Explain quantum computing in two sentences.",
});

console.log(text);
```

#### Python (beta)

```python filename="fast-slug_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-opus-5-fast")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="fast-slug-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-opus-5-fast',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="fast-slug_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-opus-5-fast",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="fast-slug-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-opus-5-fast",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ]
}'
```

#### Messages API

#### TypeScript

```typescript filename="fast-slug-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'anthropic/claude-opus-5-fast',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  max_tokens: 1024,
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="fast-slug_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-opus-5-fast",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="fast-slug-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-opus-5-fast",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="fast-slug-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: "anthropic/claude-opus-5-fast",
  input: "Explain quantum computing in two sentences.",
});

console.log(response.output_text);
```

#### Python

```python filename="fast-slug_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-opus-5-fast",
    input="Explain quantum computing in two sentences.",
)

print(response.output_text)
```

#### cURL

```bash filename="fast-slug-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-opus-5-fast",
  "input": "Explain quantum computing in two sentences."
}'
```

## Falling back to the base model

By default, a fast-tier request automatically falls back to the base model when the fast tier is exhausted. For a model served by more than one provider, AI Gateway first tries the fast tier on every provider that supports it, and only then falls back to the base model on the providers that serve it. This base fallback is tried before any explicit `gateway.models` fallbacks and is de-duplicated against them.

Set `gateway.allowFallbackFromFast: false` to opt out and get fast-or-fail behavior, where the request errors instead of falling back to standard speed.

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, providerMetadata } = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      speed: 'fast',
      // Do not fall back to standard speed if the fast tier is unavailable.
      allowFallbackFromFast: false,
    },
  },
});

console.log(text);
const routing = providerMetadata?.gateway?.routing;
console.log('Served speed:',
  typeof routing === 'object' && routing !== null && !Array.isArray(routing)
    ? routing.speed
    : undefined,
);
```

## Reading the served speed

The tier the provider actually served appears on the response as `providerMetadata.gateway.routing.speed` in the AI SDK, or `provider_metadata.gateway.routing.speed` on Chat Completions, OpenAI Responses, and Anthropic Messages responses. AI Gateway only sets this field to `fast` when the request was genuinely served fast, not merely routed to a fast variant slug. If the request was served at standard speed (for example, after falling back to the base model), the field is omitted, so a missing value is an honest signal that you weren't billed at the fast rate.

```typescript
const { providerMetadata } = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Hello',
  providerOptions: {
    gateway: {
      speed: 'fast',
    },
  },
});

// 'fast' if served fast, undefined otherwise.
console.log(providerMetadata?.gateway?.routing?.speed);
```

## Streaming

Fast mode works the same way with streaming. Read `providerMetadata.gateway.routing.speed` from the awaited result once the stream completes.

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      speed: 'fast',
    },
  },
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}

const [usage, providerMetadata] = await Promise.all([result.usage, result.providerMetadata]);
const routing = providerMetadata?.gateway?.routing;
console.log('Served speed:',
  typeof routing === 'object' && routing !== null && !Array.isArray(routing)
    ? routing.speed
    : undefined,
);
console.log('Usage:', usage);
```

## Using fast mode in coding agents

### Claude Code

For models native to Claude Code (Anthropic Opus), you can toggle fast mode interactively with `/fast` after completing the setup in [Claude Code](/docs/ai-gateway/coding-agents/claude-code#enabling-fast-mode).

### Other coding agents

For non-Anthropic models, or if you prefer not to configure Claude Code's fast mode settings, select the fast variant in your agent's model configuration. Use a fast slug from the [supported models list](/ai-gateway/models?features=fast), such as `anthropic/claude-opus-5-fast`, `zai/glm-5.2-fast`, or `moonshotai/kimi-k2.7-code-highspeed`.

## Pricing

AI Gateway adjusts pricing based on the speed the provider actually served. For current fast mode rates, refer to the [AI Gateway models list](/ai-gateway/models).


---

[View full sitemap](/docs/sitemap)
