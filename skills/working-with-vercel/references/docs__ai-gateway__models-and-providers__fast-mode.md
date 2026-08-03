---
title: Fast Mode
product: vercel
url: /docs/ai-gateway/models-and-providers/fast-mode
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/coding-agents/claude-code
summary: Request the faster serving path for supported models through AI Gateway using the `speed` option or the fast model slug, with automatic fallback to...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/fast-mode.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "75cf784aa8c3b3b7b541934b554dc460009c49738228042512eb935cba756d93"
---

# Fast Mode

Some models expose a faster serving path that trades a higher per-token cost for lower latency. You can request this fast tier through AI Gateway with the unified `gateway.speed` option or by using a fast slug.

> **💡 Note:** Requesting `speed: 'fast'` on a model that has no fast tier has no effect — the request runs at standard speed. See the supported models below for the current list.

## Supported models

Fast mode is available for a growing set of models. Find the supported fast mode models in the [AI Gateway models list](/ai-gateway/models?features=fast). Use a model's fast slug, or set `speed: 'fast'` on the base model.

## Requesting the fast tier

There are two ways to request fast mode, and they produce the same result:

- `gateway.speed: 'fast'` — a unified option that upgrades the primary model to its fast serving path when one is routable. For example, `anthropic/claude-opus-5` with `speed: 'fast'` behaves like calling `anthropic/claude-opus-5-fast`, and `moonshotai/kimi-k2.7-code` with `speed: 'fast'` routes to that model's fast slug.
- An explicit fast slug — address the fast variant directly using its fast slug. This is the same as setting `speed: 'fast'` on the base model.

Use the `speed` option when you want one configuration that stays on the base model ID and falls back to standard speed if fast mode is not available. Use an explicit fast slug when you want to name the fast variant directly, such as in a `gateway.models` fallback list.

### Using the `speed` option

#### AI SDK

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, providerMetadata } = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      speed: 'fast',
    },
  },
});

console.log(text);
console.log('Served speed:', providerMetadata?.gateway?.routing?.speed);
```

#### Chat Completions

#### TypeScript

```typescript filename="fast-mode.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - providerOptions is a gateway extension
const response = await client.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  providerOptions: {
    gateway: {
      speed: 'fast',
    },
  },
});

const gatewayMetadata = (response.choices[0].message as any).provider_metadata
  ?.gateway;

console.log(response.choices[0].message.content);
console.log('Served speed:', gatewayMetadata?.routing?.speed);
console.log('Usage:', response.usage);
```

#### Python

```python filename="fast-mode.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-opus-5",
    messages=[
        {
            "role": "user",
            "content": "Explain quantum computing in two sentences.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {"speed": "fast"}
        }
    },
)

gateway_metadata = getattr(
    response.choices[0].message, "provider_metadata", {}
).get("gateway", {})

print(response.choices[0].message.content)
print("Served speed:", gateway_metadata.get("routing", {}).get("speed"))
print("Usage:", response.usage)
```

#### OpenAI Responses

```typescript filename="fast-mode.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - providerOptions is a gateway extension
const response = await client.responses.create({
  model: 'anthropic/claude-opus-5',
  input: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      speed: 'fast',
    },
  },
});

const gatewayMetadata = (response as any).provider_metadata?.gateway;

console.log(response.output_text);
console.log('Served speed:', gatewayMetadata?.routing?.speed);
console.log('Usage:', response.usage);
```

#### Anthropic Messages

#### TypeScript

```typescript filename="fast-mode.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await client.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  // @ts-expect-error - providerOptions is a gateway extension
  providerOptions: {
    gateway: {
      speed: 'fast',
    },
  },
});

const gatewayMetadata = (message as any).provider_metadata?.gateway;

console.log(message.content[0].text);
console.log('Served speed:', gatewayMetadata?.routing?.speed);
console.log('Usage:', message.usage);
```

#### Python

```python filename="fast-mode.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh",
)

message = client.messages.create(
    model="anthropic/claude-opus-5",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "Explain quantum computing in two sentences.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {"speed": "fast"}
        }
    },
)

gateway_metadata = getattr(message, "provider_metadata", {}).get("gateway", {})

print(message.content[0].text)
print("Served speed:", gateway_metadata.get("routing", {}).get("speed"))
print("Usage:", message.usage)
```

### Using an explicit fast slug

Use any fast slug from the [supported models list](/ai-gateway/models?features=fast).

#### AI SDK

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

// Equivalent to setting `speed: 'fast'` on `anthropic/claude-opus-5`.
const { text, providerMetadata } = await generateText({
  model: 'anthropic/claude-opus-5-fast',
  prompt: 'Explain quantum computing in two sentences.',
});

console.log(text);
console.log('Served speed:', providerMetadata?.gateway?.routing?.speed);
```

#### Chat Completions

#### TypeScript

```typescript filename="fast-mode.ts"
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

const gatewayMetadata = (response.choices[0].message as any).provider_metadata
  ?.gateway;

console.log(response.choices[0].message.content);
console.log('Served speed:', gatewayMetadata?.routing?.speed);
console.log('Usage:', response.usage);
```

#### Python

```python filename="fast-mode.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-opus-5-fast",
    messages=[
        {
            "role": "user",
            "content": "Explain quantum computing in two sentences.",
        }
    ],
)

gateway_metadata = getattr(
    response.choices[0].message, "provider_metadata", {}
).get("gateway", {})

print(response.choices[0].message.content)
print("Served speed:", gateway_metadata.get("routing", {}).get("speed"))
print("Usage:", response.usage)
```

#### OpenAI Responses

```typescript filename="fast-mode.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-opus-5-fast',
  input: 'Explain quantum computing in two sentences.',
});

const gatewayMetadata = (response as any).provider_metadata?.gateway;

console.log(response.output_text);
console.log('Served speed:', gatewayMetadata?.routing?.speed);
console.log('Usage:', response.usage);
```

#### Anthropic Messages

#### TypeScript

```typescript filename="fast-mode.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await client.messages.create({
  model: 'anthropic/claude-opus-5-fast',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
});

const gatewayMetadata = (message as any).provider_metadata?.gateway;

console.log(message.content[0].text);
console.log('Served speed:', gatewayMetadata?.routing?.speed);
console.log('Usage:', message.usage);
```

#### Python

```python filename="fast-mode.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh",
)

message = client.messages.create(
    model="anthropic/claude-opus-5-fast",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "Explain quantum computing in two sentences.",
        }
    ],
)

gateway_metadata = getattr(message, "provider_metadata", {}).get("gateway", {})

print(message.content[0].text)
print("Served speed:", gateway_metadata.get("routing", {}).get("speed"))
print("Usage:", message.usage)
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
console.log('Served speed:', providerMetadata?.gateway?.routing?.speed);
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

const { usage, providerMetadata } = await result;
console.log('Served speed:', providerMetadata?.gateway?.routing?.speed);
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
