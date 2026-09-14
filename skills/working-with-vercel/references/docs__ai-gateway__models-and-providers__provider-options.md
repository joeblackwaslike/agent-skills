---
title: AI Gateway Provider Routing and Fallbacks
product: vercel
url: /docs/ai-gateway/models-and-providers/provider-options
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-options"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/automatic-caching
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/models-and-providers/model-fallbacks
summary: Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-options.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "444854d44b0316e923a74263deaa37d2b6658372918b5605c6cd0be7cdb95f40"
---

# AI Gateway Provider Routing and Fallbacks

AI Gateway can route your AI model requests across multiple AI providers. Each provider offers different models, pricing, and performance characteristics. By default, Vercel AI Gateway dynamically chooses the default providers to give you the best experience based on a combination of recent uptime and latency.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related)
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related)
- [Providers and Models](https://ai-sdk.dev/docs/foundations/providers-and-models?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related)
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related)
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [Hermes with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/hermes?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related) — Connect Hermes to AI Gateway with the Vercel CLI or manual provider configuration. Set your API key, discover models, an
- [AI Gateway Custom Reporting API](https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related) — Query AI Gateway usage data grouped by model, user, tag, provider, or credential type using the Custom Reporting API.
- [AI Gateway Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/provider-options.graph.md](/docs/ai-gateway/models-and-providers/provider-options.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-options&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Use `providerOptions.gateway` to control provider order and fallback behavior.

> **💡 Note:** If you want to customize individual AI model provider settings rather than
> general AI Gateway behavior, please refer to the model-specific provider
> options in the [AI SDK
> documentation](https://ai-sdk.dev/docs/foundations/prompts#provider-options).

## Provider filtering, ordering, and sorting

You can use `order`, `only`, and `sort` in `providerOptions.gateway` to control which providers handle your requests, in what order, and how they are ranked.

```typescript
providerOptions: {
  gateway: {
    order: ['bedrock', 'anthropic'], // Try Bedrock first, then Anthropic
    only: ['bedrock', 'anthropic'],  // Only allow these two providers
  },
},
```

You can also use `sort` to rank providers by a performance or cost metric. The gateway sorts providers by the chosen metric and tries them in that order:

```typescript
providerOptions: {
  gateway: {
    sort: 'cost', // Sort by cost, latency ('ttft'), or throughput ('tps')
  },
},
```

For full details, examples, and provider metadata output, see [Provider Filtering, Ordering & Sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering).

## Automatic caching

You can use `caching: 'auto'` in `providerOptions.gateway` to let AI Gateway automatically apply the appropriate caching strategy based on the provider. This is useful for providers like Anthropic and MiniMax that require explicit cache markers.

```typescript
providerOptions: {
  gateway: {
    caching: 'auto',
  },
},
```

For full details, supported providers, and examples across all APIs, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).

Clients on the [Responses API](/docs/ai-gateway/sdks-and-apis/responses) can also set these top-level request fields:

- `cache_anchor_items` pins a cache marker at a known-stable prefix position. See [Cache anchor](/docs/ai-gateway/models-and-providers/automatic-caching#cache-anchor).
- `cache_ttl` selects a five-minute or one-hour cache lifetime. See [Cache lifetime](/docs/ai-gateway/models-and-providers/automatic-caching#cache-lifetime).

These fields belong at the top level of the Responses API request, not inside `providerOptions.gateway`.

## Provider timeouts

You can set per-provider timeouts to trigger fast failover when a provider is slow to respond. See the dedicated [Provider Timeouts](/docs/ai-gateway/models-and-providers/provider-timeouts) documentation.

## Model fallbacks

For model-level failover strategies that try backup models when your primary model fails or is unavailable, see the dedicated [Model Fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks) documentation.

## Advanced configuration

### Combining AI Gateway provider options with provider-specific options

You can combine AI Gateway provider options with provider-specific options. This allows you to control both the routing behavior and provider-specific settings in the same request:

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

See the [AI SDK Gateway provider-options reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#gateway-provider-options) for SDK configuration and usage.

```typescript filename="provider-options.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      order: ['anthropic', 'bedrock'],
    },
    anthropic: {
      thinking: {
        type: 'adaptive',
      },
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="provider-options_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"order": ["anthropic", "bedrock"]}, "anthropic": {"thinking": {"type": "adaptive"}}}}
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

```typescript filename="provider-options-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
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
        order: ['anthropic', 'bedrock'],
      },
      anthropic: {
        thinking: {
          type: 'adaptive',
        },
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="provider-options_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"order": ["anthropic", "bedrock"]}, "anthropic": {"thinking": {"type": "adaptive"}}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="provider-options-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "anthropic": {"thinking": {"type": "adaptive"}},
    "gateway": {
      "order": [
        "anthropic",
        "bedrock"
      ]
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="provider-options-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'anthropic/claude-sonnet-5',
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
        order: ['anthropic', 'bedrock'],
      },
      anthropic: {
        thinking: {
          type: 'adaptive',
        },
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="provider-options_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"order": ["anthropic", "bedrock"]}, "anthropic": {"thinking": {"type": "adaptive"}}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="provider-options-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "anthropic": {"thinking": {"type": "adaptive"}},
    "gateway": {
      "order": [
        "anthropic",
        "bedrock"
      ]
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="provider-options-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        order: ['anthropic', 'bedrock'],
      },
      anthropic: {
        thinking: {
          type: 'adaptive',
        },
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="provider-options_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"order": ["anthropic", "bedrock"]}, "anthropic": {"thinking": {"type": "adaptive"}}}},
)

print(response.output_text)
```

#### cURL

```bash filename="provider-options-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "anthropic": {"thinking": {"type": "adaptive"}},
    "gateway": {
      "order": [
        "anthropic",
        "bedrock"
      ]
    }
  }
}'
```

The `gateway.order` option selects the provider sequence. The `anthropic.thinking` option requests adaptive thinking from Claude Sonnet 5. See [Anthropic reasoning](/docs/ai-gateway/models-and-providers/reasoning/anthropic) for supported models and [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for extension fields.

### Request-scoped BYOK

You can pass your own provider credentials on a per-request basis using the `byok` option in `providerOptions.gateway`. This allows you to use your existing provider accounts for specific requests without configuring credentials in the dashboard.

```typescript filename="app/api/chat/route.ts" {9-13}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5',
    prompt,
    providerOptions: {
      gateway: {
        byok: {
          anthropic: [{ apiKey: process.env.ANTHROPIC_API_KEY }],
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

For detailed information about credential structures, multiple credentials, and usage with the Chat Completions API, see the [BYOK documentation](/docs/ai-gateway/authentication-and-byok/byok#request-scoped-byok).

### Reasoning

For models that support reasoning (also known as "thinking"), you can use
`providerOptions` to configure reasoning behavior. The example below shows
how to request high reasoning effort and a detailed summary for OpenAI's `gpt-oss-120b` model. Providers can differ in which options they honor; setting `reasoningSummary` doesn't guarantee a summary. See [OpenAI reasoning](/docs/ai-gateway/models-and-providers/reasoning/openai) for model and provider differences.

For more details on reasoning support across different models and providers, see the [AI SDK providers documentation](https://ai-sdk.dev/providers/ai-sdk-providers), including [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#reasoning), [DeepSeek](https://ai-sdk.dev/providers/ai-sdk-providers/deepseek#reasoning), and [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#reasoning).

```typescript filename="app/api/chat/route.ts" {9-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-oss-120b',
    prompt,
    providerOptions: {
      openai: {
        reasoningEffort: 'high',
        reasoningSummary: 'detailed',
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

For `openai/gpt-6-astra`, enable reasoning with a non-`none` effort and request a summary with `reasoningSummary`. Supported effort values and summary formats depend on the model. See [OpenAI reasoning](/docs/ai-gateway/models-and-providers/reasoning/openai) for model-specific options.

```typescript
providerOptions: {
  openai: {
    reasoningEffort: 'high', // or 'low', 'medium', 'xhigh', 'max'
    reasoningSummary: 'detailed', // or 'auto', 'concise'
  },
}
```

## Available providers

You can view the available models for a provider
in the [**Model List**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fmodels\&title=Go+to+Model+List) section under
the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in your Vercel dashboard sidebar
or in the public [models page](/ai-gateway/models).

Slug

Name

Website

alibaba

Alibaba Cloud

alibabacloud.com

anthropic

Anthropic

anthropic.com

arcee-ai

Arcee AI

arcee.ai

azure

Azure

ai.azure.com

baseten

Baseten

baseten.co

bedrock

Bedrock

aws.amazon.com

bfl

Black Forest Labs

bfl.ai

blackbox

Blackbox AI

blackbox.ai

bytedance

ByteDance

byteplus.com

cerebras

Cerebras

cerebras.ai

claudeaws

Claude Platform on AWS

aws.amazon.com

cohere

Cohere

cohere.com

crusoe

Crusoe

crusoe.ai

deepinfra

DeepInfra

deepinfra.com

deepseek

DeepSeek

deepseek.com

digitalocean

DigitalOcean

digitalocean.com

exa

Exa

exa.ai

fireworks

Fireworks

fireworks.ai

fish-audio

Fish Audio

fish.audio

friendli

FriendliAI

friendli.ai

gmicloud

GMICloud

gmicloud.ai

google

Google

ai.google.dev

groq

Groq

groq.com

inception

Inception

inceptionlabs.ai

inceptron

Inceptron

inceptron.io

interfaze

Interfaze

interfaze.ai

klingai

Kling AI

klingai.com

meta

Meta

meta.ai

minimax

MiniMax

minimax.io

mistral

Mistral

mistral.ai

modal

Modal

modal.com

moonshotai

Moonshot AI

moonshot.ai

morph

Morph

morphllm.com

nebius

Nebius

nebius.com

novita

Novita AI

novita.ai

openai

OpenAI

openai.com

parallel

Parallel AI

parallel.ai

parasail

Parasail

parasail.io

particle

Particle.AI

particle.ai

perplexity

Perplexity

perplexity.ai

poolside

Poolside

poolside.ai

prodia

Prodia

prodia.com

quiverai

QuiverAI

quiver.ai

recraft

Recraft

recraft.ai

relace

Relace

relace.ai

runinfra

RunInfra

runinfra.ai

runware

Runware

runware.ai

sakana

Sakana AI

sakana.ai

sambanova

SambaNova

sambanova.ai

stepfun

StepFun

platform.stepfun.com

streamlake

StreamLake

streamlake.ai

tako

Tako

tako.com

tencent

Tencent Cloud

tencentcloud.com

thinkingmachines

Thinking Machines

thinkingmachines.ai

togetherai

Together AI

together.ai

vertex

Google Vertex AI

cloud.google.com

voyage

Voyage AI by MongoDB

voyageai.com

wafer

Wafer

wafer.ai

xai

xAI

x.ai

xiaomi

Xiaomi

mimo.xiaomi.com

zai

Z.AI

z.ai

> **💡 Note:** Provider availability may vary by model. Some models may only be available
> through specific providers or may have different capabilities depending on the
> provider used.


---

[View full sitemap](/docs/sitemap)
