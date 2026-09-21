---
title: AI Gateway Service Tiers
product: vercel
url: /docs/ai-gateway/models-and-providers/service-tiers
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers"
last_updated: 2026-09-10
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/observability-and-spend/logs
summary: Control processing priority and cost for OpenAI, Google AI Studio, Google Vertex AI, and SpaceXAI models using service tiers through AI Gateway,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "6e5b81631f10a8f2f5961148eaa12d077bc029c069e731cdbddec46c728410ea"
---

# AI Gateway Service Tiers

OpenAI, Google AI Studio, Google Vertex AI, and SpaceXAI offer different processing tiers that trade off latency, availability, and cost. You can request a service tier through AI Gateway and AI Gateway adjusts pricing based on the tier the provider actually served.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Service tiers now available on AI Gateway](https://vercel.com/changelog/service-tiers-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related)
- [AI Gateway Provider Filtering, Ordering, and Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Control AI Gateway provider routing with order, only, and sort. Set preferences, restrict providers, and rank them by co
- [Call AI Gateway Chat Completions with REST](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Use AI Gateway API directly without client libraries using curl and fetch.
- [AI Gateway Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [AI Gateway App Attribution](https://vercel.com/docs/ai-gateway/ecosystem/app-attribution?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Attribute your requests so Vercel can identify and feature your app on AI Gateway pages.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/service-tiers.graph.md](/docs/ai-gateway/models-and-providers/service-tiers.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Service tiers are supported for OpenAI, Google AI Studio, Google Vertex AI,
> and SpaceXAI models. Setting a service tier on a model that doesn't support it
> has no effect. Tier availability varies by model and provider, so check the
> provider's pricing page for which models offer which tiers.

## Supported values

| Value      | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `default`  | Standard processing tier                                    |
| `priority` | Higher availability and faster processing at increased cost |
| `flex`     | Lower cost with potentially higher latency                  |

If you don't specify a service tier, requests use the standard tier.

SpaceXAI supports `priority` as an alternative to the standard tier. Setting the unified `gateway.serviceTier` to `flex` on a SpaceXAI model has no effect. The per-provider `spacexai.serviceTier` and `xai.serviceTier` options accept `default` or `priority`. SpaceXAI service tiers require AI SDK 6 or later when using the AI SDK.

## Best-effort routing

Service tier is a best-effort routing hint, not a hard guarantee. If the provider serving a request doesn't support service tiers, the tier is ignored and the request runs on the default tier. A provider can serve a request at the default tier when it doesn't grant the requested tier. Check the applied tier in the response or request logs. Service-tier settings don't prevent provider errors or guarantee that a request succeeds.

The `gateway.serviceTier` option accepts `flex`, `priority`, or `fast`. AI Gateway treats `fast` as an alias for `priority` and rejects other values. Per-provider options have their own accepted values and validation.

## Setting the service tier

You can set the service tier in two ways:

- `providerOptions.gateway.serviceTier`: A unified option that AI Gateway translates to the matching per-provider field. The examples below use it with AI SDK 7, the Python beta, Chat Completions, Messages, and Responses / OpenResponses.
- Per-provider options: Set the tier directly on the provider namespace when you need provider-specific behavior.

### Using `gateway.serviceTier`

The example below applies to any provider that serves the model and supports the requested tier. If the gateway falls back to another provider for the same model, you still receive the requested tier when that provider supports it.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="service-tiers.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'google/gemini-3.5-flash-lite',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      serviceTier: 'priority',
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="service-tiers_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("google/gemini-3.5-flash-lite")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}}
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

```typescript filename="service-tiers-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'google/gemini-3.5-flash-lite',
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
        serviceTier: 'priority',
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="service-tiers_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="google/gemini-3.5-flash-lite",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="service-tiers-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "google/gemini-3.5-flash-lite",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "serviceTier": "priority"
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="service-tiers-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'google/gemini-3.5-flash-lite',
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
        serviceTier: 'priority',
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="service-tiers_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="google/gemini-3.5-flash-lite",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="service-tiers-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "google/gemini-3.5-flash-lite",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "serviceTier": "priority"
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="service-tiers-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'google/gemini-3.5-flash-lite',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        serviceTier: 'priority',
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="service-tiers_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="google/gemini-3.5-flash-lite",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}},
)

print(response.output_text)
```

#### cURL

```bash filename="service-tiers-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "google/gemini-3.5-flash-lite",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "serviceTier": "priority"
    }
  }
}'
```

### Using per-provider options

You can also set the tier directly on the provider namespace. The supported keys are:

- OpenAI: `openai.serviceTier` (or `service_tier` for the raw Chat Completions and OpenAI Responses APIs)
- Google AI Studio: `google.serviceTier`
- Google Vertex AI: `vertex.sharedRequestType`
- SpaceXAI: `spacexai.serviceTier` or `xai.serviceTier`

For SpaceXAI requests, AI Gateway merges `providerOptions.spacexai` into `providerOptions.xai`. If both set the same option, the `xai` value takes precedence. The unified `gateway.serviceTier` overrides either per-provider tier. Use `spacexai` for model and routing slugs; the AI SDK package and import remain [`@ai-sdk/xai` and `xai`](https://ai-sdk.dev/providers/ai-sdk-providers/xai).

The AI SDK returns SpaceXAI provider-specific metadata under `providerMetadata.xai` for either request namespace. Read `providerMetadata.xai.serviceTier` for the reported tier, including `default`.

#### OpenAI

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, usage, providerMetadata } = await generateText({
  model: 'openai/gpt-6-astra',
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
  model: 'google/gemini-3.5-flash-lite',
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
  model: 'google/gemini-3.5-flash-lite',
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

#### SpaceXAI

```typescript filename="app/api/chat/route.ts"
import { generateText } from 'ai';

const { text, usage, providerMetadata } = await generateText({
  model: 'spacexai/grok-4.5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      only: ['spacexai'],
    },
    spacexai: {
      serviceTier: 'priority',
    },
  },
});

console.log(text);
console.log('Applied tier:', providerMetadata?.xai?.serviceTier);
console.log('Usage:', usage);
```

## Reading the applied service tier

The AI SDK exposes the applied tier as `providerMetadata.gateway.serviceTier`. Chat Completions, Messages, and OpenResponses responses expose AI Gateway metadata under `provider_metadata.gateway.serviceTier`; OpenAI-compatible responses can also include `service_tier`. The Python beta may omit routing metadata, so inspect [request logs](/docs/ai-gateway/observability-and-spend/logs) when it is unavailable. AI Gateway only sets this field when the request was served at `flex` or `priority`. If the provider reports the standard tier, AI Gateway omits this field. If your client omits provider metadata, use request logs to confirm the applied tier.

```typescript
const { providerMetadata } = await generateText({
  model: 'google/gemini-3.5-flash-lite',
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

#### AI SDK

#### TypeScript

```typescript filename="service-tier-stream.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'google/gemini-3.5-flash-lite',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      serviceTier: 'priority',
    },
  },
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

#### Python (beta)

```python filename="service-tier-stream_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("google/gemini-3.5-flash-lite")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}}
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

```typescript filename="service-tier-stream-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'google/gemini-3.5-flash-lite',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  ...{
    providerOptions: {
      gateway: {
        serviceTier: 'priority',
      },
    },
  },
  stream: true,
});

for await (const event of response) {
  process.stdout.write(event.choices[0]?.delta.content ?? '');
}
```

#### Python

```python filename="service-tier-stream_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="google/gemini-3.5-flash-lite",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}},
    stream=True,
)

for event in response:
    if event.choices:
        print(event.choices[0].delta.content or "", end="", flush=True)
```

#### cURL

```bash filename="service-tier-stream-chat.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "google/gemini-3.5-flash-lite",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "serviceTier": "priority"
    }
  },
  "stream": true
}'
```

#### Messages API

#### TypeScript

```typescript filename="service-tier-stream-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'google/gemini-3.5-flash-lite',
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
        serviceTier: 'priority',
      },
    },
  },
  stream: true,
});

for await (const event of response) {
  if (
    event.type === 'content_block_delta' &&
    event.delta.type === 'text_delta'
  ) {
    process.stdout.write(event.delta.text);
  }
}
```

#### Python

```python filename="service-tier-stream_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="google/gemini-3.5-flash-lite",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}},
    stream=True,
)

for event in response:
    if event.type == "content_block_delta" and event.delta.type == "text_delta":
        print(event.delta.text, end="", flush=True)
```

#### cURL

```bash filename="service-tier-stream-messages.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "google/gemini-3.5-flash-lite",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "serviceTier": "priority"
    }
  },
  "stream": true
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="service-tier-stream-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'google/gemini-3.5-flash-lite',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        serviceTier: 'priority',
      },
    },
  },
  stream: true,
});

for await (const event of response) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  }
}
```

#### Python

```python filename="service-tier-stream_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="google/gemini-3.5-flash-lite",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"serviceTier": "priority"}}},
    stream=True,
)

for event in response:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
```

#### cURL

```bash filename="service-tier-stream-responses.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "google/gemini-3.5-flash-lite",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "serviceTier": "priority"
    }
  },
  "stream": true
}'
```

## Pricing

AI Gateway adjusts pricing based on the service tier the provider actually served. For current per-tier rates, refer to each provider's pricing page:

- [OpenAI pricing](https://openai.com/api/pricing/)
- [Google AI Studio pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Google Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing)
- [SpaceXAI pricing](https://docs.x.ai/docs/pricing)


---

[View full sitemap](/docs/sitemap)
