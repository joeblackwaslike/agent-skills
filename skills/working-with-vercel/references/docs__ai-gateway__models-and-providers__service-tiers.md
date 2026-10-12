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
  - /docs/ai-gateway/sdks-and-apis/responses/websockets
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/observability-and-spend/logs
summary: Control processing priority and cost for OpenAI, Google AI Studio, Google Vertex AI, and SpaceXAI models using service tiers through AI Gateway,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "7b986c148ebfce64af1cd737eb083abf66b8242e5b98a68ba5a8e33458df2126"
---

# AI Gateway Service Tiers

OpenAI, Google AI Studio, Google Vertex AI, and SpaceXAI offer different processing tiers that trade off latency, availability, and cost. You can request a service tier through AI Gateway and AI Gateway adjusts pricing based on the tier the provider actually served.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Ultrafast mode now available on AI Gateway](https://vercel.com/changelog/openai-ultrafast-mode-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related)
- [Service tiers now available on AI Gateway](https://vercel.com/changelog/service-tiers-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related)
- [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Learn how to use the OpenAI provider for the AI SDK.
- [Azure OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/azure?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Learn how to use the Azure OpenAI provider for the AI SDK.
- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Learn how to use the AI Gateway provider with the AI SDK.
- [AI Gateway](https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=related) — Vercel MCP tools for ai gateway.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/service-tiers.graph.md](/docs/ai-gateway/models-and-providers/service-tiers.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fservice-tiers&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Service tiers are supported for OpenAI, Google AI Studio, Google Vertex AI,
> and SpaceXAI models. Setting a service tier on a model that doesn't support it
> has no effect. Tier availability varies by model and provider, so check the
> provider's pricing page for which models offer which tiers.

## Supported values

| Value       | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `default`   | Standard processing tier                                    |
| `priority`  | Higher availability and faster processing at increased cost |
| `flex`      | Lower cost with potentially higher latency                  |
| `ultrafast` | OpenAI's fastest tier, at a significantly higher cost       |

If you don't specify a service tier, requests use the standard tier.

SpaceXAI supports `priority` as an alternative to the standard tier. Setting the unified `gateway.serviceTier` to `flex` on a SpaceXAI model has no effect. The per-provider `spacexai.serviceTier` and `xai.serviceTier` options accept `default` or `priority`. SpaceXAI service tiers require AI SDK 6 or later when using the AI SDK.

### Ultrafast

`ultrafast` is an OpenAI-only tier, currently available for GPT-6 Astra. Set it with `openai.serviceTier` (AI SDK 6 or later) or `service_tier` on Chat Completions, Responses, and [Responses WebSocket](/docs/ai-gateway/sdks-and-apis/responses/websockets) requests. OpenAI recommends WebSocket mode for ultrafast because a persistent connection keeps per-turn overhead low. The unified `gateway.serviceTier` option doesn't accept `ultrafast`. Ultrafast is limited to US and global processing, so requests pinned to other regions run at the default tier.

Set `AI_GATEWAY_API_KEY` before running these examples. Install `ai` for the AI SDK example and `openai` for the Python examples. The WebSocket examples list their additional dependencies below. Python SDKs use `/v1` as the base URL, then add the endpoint path.

#### AI SDK

```typescript filename="ultrafast-ai-sdk.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Investigate the failing tests and propose a fix.',
  providerOptions: {
    openai: { serviceTier: 'ultrafast' },
    gateway: { only: ['openai'] },
  },
});

console.log(text);
```

#### Responses API

```python filename="ultrafast-responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ['AI_GATEWAY_API_KEY'],
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-6-astra',
    input='Investigate the failing tests and propose a fix.',
    service_tier='ultrafast',
    extra_body={'providerOptions': {'gateway': {'only': ['openai']}}},
)
print(response.output_text)
```

#### Chat Completions

```python filename="ultrafast-chat-completions.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ['AI_GATEWAY_API_KEY'],
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.chat.completions.create(
    model='openai/gpt-6-astra',
    messages=[
        {'role': 'user', 'content': 'Investigate the failing tests and propose a fix.'}
    ],
    service_tier='ultrafast',
    extra_body={'providerOptions': {'gateway': {'only': ['openai']}}},
)
print(response.choices[0].message.content)
```

#### Responses WebSocket

Install `ws`, `@types/ws`, and `tsx`, then run this TypeScript example with `tsx`. The second turn reuses the connection and the first response's context:

```typescript filename="ultrafast-websocket.ts"
import WebSocket from 'ws';

const ws = new WebSocket('wss://ai-gateway.vercel.sh/v1/responses', {
  headers: { Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}` },
});
const send = (input: string, previousResponseId?: string) =>
  ws.send(
    JSON.stringify({
      type: 'response.create',
      model: 'openai/gpt-6-astra',
      service_tier: 'ultrafast',
      input,
      previous_response_id: previousResponseId,
    }),
  );

let turnsCompleted = 0;
ws.on('open', () => send('Investigate the failing tests.'));
ws.on('message', (data) => {
  const event = JSON.parse(data.toString());
  if (event.type === 'response.output_text.delta') process.stdout.write(event.delta);
  if (event.type === 'response.completed') {
    console.log();
    if (++turnsCompleted === 1) send('Suggest a fix.', event.response.id);
    else ws.close();
  }
  if (['error', 'response.failed', 'response.incomplete'].includes(event.type)) {
    console.error(event);
    ws.close();
  }
});
ws.on('error', console.error);
```

Send `service_tier` on every `response.create` frame, not just the first turn.

#### AI SDK over WebSocket

Install `@ai-sdk/openai` and `@vercel/ai-sdk-openai-websocket-fetch` alongside `ai`. Configure the WebSocket endpoint separately from the OpenAI provider's HTTP base URL. These requests reuse the connection but have independent prompts:

```typescript filename="ultrafast-ai-sdk-websocket.ts"
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createWebSocketFetch } from '@vercel/ai-sdk-openai-websocket-fetch';

const wsFetch = createWebSocketFetch({
  url: 'wss://ai-gateway.vercel.sh/v1/responses',
});
const openai = createOpenAI({
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  apiKey: process.env.AI_GATEWAY_API_KEY,
  fetch: wsFetch,
});

try {
  for (const prompt of ['Investigate the failing tests.', 'Suggest a fix.']) {
    const result = streamText({
      model: openai.responses('openai/gpt-6-astra'),
      prompt,
      providerOptions: { openai: { serviceTier: 'ultrafast' } },
    });
    console.log(await result.text);
  }
} finally {
  wsFetch.close();
}
```

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

The AI SDK exposes the applied tier as `providerMetadata.gateway.serviceTier`. Chat Completions, Messages, and OpenResponses responses expose AI Gateway metadata under `provider_metadata.gateway.serviceTier`; OpenAI-compatible responses can also include `service_tier`. The Python beta may omit routing metadata, so inspect [request logs](/docs/ai-gateway/observability-and-spend/logs) when it is unavailable. AI Gateway only sets this field when the request was served at `flex`, `priority`, or `ultrafast`. If the provider reports the standard tier, AI Gateway omits this field. If your client omits provider metadata, use request logs to confirm the applied tier.

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
