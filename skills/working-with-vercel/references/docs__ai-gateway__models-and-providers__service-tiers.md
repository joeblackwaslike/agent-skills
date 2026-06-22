---
title: Service Tiers
product: vercel
url: /docs/ai-gateway/models-and-providers/service-tiers
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  []
summary: Learn about service tiers on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "8758e870ca82645a347afdd769e9f11daafeb36a84b38458a707e223f918e472"
---

# Service Tiers

OpenAI, Google AI Studio, and Google Vertex AI offer different processing tiers that trade off latency, availability, and cost. You can request a service tier through AI Gateway and AI Gateway adjusts pricing based on the tier the provider actually served.

> **💡 Note:** Service tiers are supported for OpenAI, Google AI Studio, and Google Vertex AI models. Setting a service tier on a model that doesn't support it has no effect. Tier availability varies by model and provider, so check the provider's pricing page for which models offer which tiers.

## Supported values

| Value      | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `default`  | Standard processing tier                                    |
| `priority` | Higher availability and faster processing at increased cost |
| `flex`     | Lower cost with potentially higher latency                  |

If you don't specify a service tier, requests use the standard tier.

## Setting the service tier

You can set the service tier in two ways:

- `gateway.serviceTier` (AI SDK v6 and v7): a unified option that AI Gateway translates to the right per-provider field. Use this when you want one configuration that works across OpenAI, Google AI Studio, and Google Vertex AI.
- Per-provider options: set the tier directly on the provider namespace. Use these for direct REST API calls, for AI SDK v5, or when you need provider-specific behavior.

### Using `gateway.serviceTier`

The example below applies to any provider that serves the model and supports the requested tier. If the gateway falls back to another provider for the same model, you still receive the requested tier when that provider supports it.

#### AI SDK v6 and v7

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, usage, providerMetadata } = await generateText({
  model: 'google/gemini-2.5-flash',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      serviceTier: 'priority',
    },
  },
});

console.log(text);
console.log('Applied tier:', providerMetadata?.gateway?.serviceTier);
console.log('Usage:', usage);
```

#### Chat Completions

```typescript filename="service-tier.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// You can also pass `providerOptions: { gateway: { serviceTier: 'priority' } }`
// in the body instead of the top-level `service_tier` if you prefer.
const response = await client.chat.completions.create({
  model: 'openai/gpt-5.5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  service_tier: 'priority',
});

const gatewayMetadata = (response.choices[0].message as any).provider_metadata
  ?.gateway;

console.log(response.choices[0].message.content);
console.log('Applied tier:', gatewayMetadata?.serviceTier);
console.log('Usage:', response.usage);
```

#### OpenAI Responses

```typescript filename="service-tier.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// You can also pass `providerOptions: { gateway: { serviceTier: 'priority' } }`
// in the body instead of the top-level `service_tier` if you prefer.
const response = await client.responses.create({
  model: 'openai/gpt-5.5',
  input: 'Explain quantum computing in two sentences.',
  service_tier: 'priority',
});

const gatewayMetadata = (response as any).provider_metadata?.gateway;

console.log(response.output_text);
console.log('Applied tier:', gatewayMetadata?.serviceTier);
console.log('Usage:', response.usage);
```

#### Anthropic Messages

```typescript filename="service-tier.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await client.messages.create({
  model: 'google/gemini-2.5-flash',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  providerOptions: {
    gateway: {
      serviceTier: 'priority',
    },
  },
});

const gatewayMetadata = (message as any).provider_metadata?.gateway;

console.log(message.content[0].text);
console.log('Applied tier:', gatewayMetadata?.serviceTier);
console.log('Usage:', message.usage);
```

### Using per-provider options

You can also set the tier directly on the provider namespace. The supported keys are:

- OpenAI: `openai.serviceTier` (or `service_tier` for the raw Chat Completions and OpenAI Responses APIs)
- Google AI Studio: `google.serviceTier`
- Google Vertex AI: `vertex.sharedRequestType`

#### OpenAI

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, usage, providerMetadata } = await generateText({
  model: 'openai/gpt-5.5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    openai: {
      serviceTier: 'flex',
    },
  },
});

console.log(text);
console.log('Service tier:', providerMetadata?.openai?.serviceTier);
console.log('Usage:', usage);
```

#### Google AI Studio

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, usage, providerMetadata } = await generateText({
  model: 'google/gemini-2.5-flash',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      only: ['google'],
    },
    google: {
      serviceTier: 'priority',
    },
  },
});

console.log(text);
console.log('Applied tier:', providerMetadata?.gateway?.serviceTier);
console.log('Usage:', usage);
```

#### Google Vertex AI

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, usage, providerMetadata } = await generateText({
  model: 'google/gemini-2.5-flash',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      only: ['vertex'],
    },
    vertex: {
      sharedRequestType: 'flex',
    },
  },
});

console.log(text);
console.log('Applied tier:', providerMetadata?.gateway?.serviceTier);
console.log('Usage:', usage);
```

## Reading the applied service tier

The tier the provider actually served appears on the response as `providerMetadata.gateway.serviceTier`. AI Gateway only sets this field when the request was served at `flex` or `priority`. If the provider downgraded to standard, the field is omitted, so a missing value is an honest signal that you weren't billed at the requested tier.

```typescript
const { providerMetadata } = await generateText({
  model: 'google/gemini-2.5-flash',
  prompt: 'Hello',
  providerOptions: {
    gateway: {
      only: ['google'],
      serviceTier: 'priority',
    },
  },
});

// 'priority' if served at priority, 'flex' if served at flex, undefined otherwise.
console.log(providerMetadata?.gateway?.serviceTier);
```

AI Gateway bills the request at the tier the provider actually served, not the tier you requested.

## Streaming

Service tiers work the same way with streaming. Read `providerMetadata.gateway.serviceTier` from the awaited result once the stream completes.

#### AI SDK v6 and v7

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      serviceTier: 'priority',
    },
  },
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}

const { usage, providerMetadata } = await result;
console.log('Applied tier:', providerMetadata?.gateway?.serviceTier);
console.log('Usage:', usage);
```

#### Chat Completions

#### TypeScript

```typescript filename="service-tier-streaming.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await client.chat.completions.create({
  model: 'openai/gpt-5.5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  stream: true,
  service_tier: 'priority',
});

let gatewayMetadata: any;
for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta;
  if (delta?.content) process.stdout.write(delta.content);
  const metadata = (delta as any)?.provider_metadata;
  if (metadata?.gateway) gatewayMetadata = metadata.gateway;
}

console.log('\nApplied tier:', gatewayMetadata?.serviceTier);
```

#### Python

```python filename="service-tier-streaming.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='openai/gpt-5.5',
    messages=[
        {
            'role': 'user',
            'content': 'Explain quantum computing in two sentences.'
        }
    ],
    stream=True,
    service_tier='priority'
)

gateway_metadata = None
for chunk in stream:
    delta = chunk.choices[0].delta
    if delta.content:
        print(delta.content, end='', flush=True)
    if hasattr(delta, 'provider_metadata') and delta.provider_metadata:
        gateway_metadata = delta.provider_metadata.get('gateway')

print('\nApplied tier:', (gateway_metadata or {}).get('serviceTier'))
```

#### OpenAI Responses

#### TypeScript

```typescript filename="service-tier-streaming.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await client.responses.create({
  model: 'openai/gpt-5.5',
  input: 'Explain quantum computing in two sentences.',
  stream: true,
  service_tier: 'priority',
});

let gatewayMetadata: any;
for await (const event of stream) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  } else if (event.type === 'response.completed') {
    gatewayMetadata = (event.response as any).provider_metadata?.gateway;
  }
}

console.log('\nApplied tier:', gatewayMetadata?.serviceTier);
```

#### Python

```python filename="service-tier-streaming.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.responses.create(
    model='openai/gpt-5.5',
    input='Explain quantum computing in two sentences.',
    stream=True,
    service_tier='priority'
)

gateway_metadata = None
for event in stream:
    if event.type == 'response.output_text.delta':
        print(event.delta, end='', flush=True)
    elif event.type == 'response.completed':
        if hasattr(event.response, 'provider_metadata') and event.response.provider_metadata:
            gateway_metadata = event.response.provider_metadata.get('gateway')

print('\nApplied tier:', (gateway_metadata or {}).get('serviceTier'))
```

#### Anthropic Messages

#### TypeScript

```typescript filename="service-tier-streaming.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const stream = await client.messages.create({
  model: 'openai/gpt-5.5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  stream: true,
  providerOptions: {
    openai: {
      serviceTier: 'priority',
    },
  },
});

let gatewayMetadata: any;
for await (const event of stream) {
  if (event.type === 'content_block_delta') {
    if (event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text);
    }
  } else if (event.type === 'message_delta') {
    const metadata = (event as any).provider_metadata;
    if (metadata?.gateway) gatewayMetadata = metadata.gateway;
  }
}

console.log('\nApplied tier:', gatewayMetadata?.serviceTier);
```

#### Python

```python filename="service-tier-streaming.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

with client.messages.stream(
    model='openai/gpt-5.5',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': 'Explain quantum computing in two sentences.'
        }
    ],
    extra_body={
        'providerOptions': {
            'openai': {
                'serviceTier': 'priority'
            }
        }
    }
) as stream:
    for text in stream.text_stream:
        print(text, end='', flush=True)
    final_message = stream.get_final_message()

gateway_metadata = None
if hasattr(final_message, 'provider_metadata') and final_message.provider_metadata:
    gateway_metadata = final_message.provider_metadata.get('gateway')
print('\nApplied tier:', (gateway_metadata or {}).get('serviceTier'))
```

## Pricing

AI Gateway adjusts pricing based on the service tier the provider actually served. For current per-tier rates, refer to each provider's pricing page:

- [OpenAI pricing](https://openai.com/api/pricing/)
- [Google AI Studio pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Google Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing)


---

[View full sitemap](/docs/sitemap)
