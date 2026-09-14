---
title: AI Gateway Provider Filtering, Ordering, and Sorting
product: vercel
url: /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/model-filtering
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/pricing
summary: Control AI Gateway provider routing with order, only, and sort. Set preferences, restrict providers, and rank them by cost, latency, or throughput.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "2a736dc2abea33febce3b0ae0f759cb873c66274291d9ec89d5d28d3aebf43a6"
---

# AI Gateway Provider Filtering, Ordering, and Sorting

By default, AI Gateway dynamically chooses providers based on recent uptime and latency. You can override this behavior to control which providers handle your requests and in what order using `order`, `only`, and `sort` in `providerOptions.gateway`. To instead filter by a capability of the model itself, see [Model Filtering](/docs/ai-gateway/models-and-providers/model-filtering).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=related)
- [Sort providers by cost, latency, or throughput on AI Gateway](https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=related)
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=related)
- [AI Gateway Service Tiers](https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=related) — Control processing priority and cost for OpenAI, Google AI Studio, Google Vertex AI, and SpaceXAI models using service t
- [Call AI Gateway Chat Completions with REST](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=related) — Use AI Gateway API directly without client libraries using curl and fetch.
- [OpenAI Chat Completions Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching through AI Gateway.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering.graph.md](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-filtering-and-ordering&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Provider ordering

Use the `order` array to specify the sequence in which providers should be attempted. Provider ordering works with a model served by more than one provider, such as `anthropic/claude-sonnet-5`.

Providers are specified using their `slug` string. You can find the slugs in the [table of available providers](/docs/ai-gateway/models-and-providers/provider-options#available-providers). To find which providers serve a model programmatically, [get its provider endpoints](/docs/ai-gateway/sdks-and-apis/rest-api#get-model-endpoints).

You can also copy the provider slug using the copy button next to a provider's name on a model's detail page:

**Through the Vercel Dashboard:**

1. Click the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) tab
2. Click [**Model List**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fmodels\&title=Go+to+Model+List) on the left
3. Click a model entry in the list

**Through the AI Gateway site:**

Visit a model's page on the [AI Gateway models page](/ai-gateway/models) (e.g., [Claude Sonnet 5](/ai-gateway/models/claude-sonnet-5)).

The bottom section of the page lists the available providers for that model. The copy button next to a provider's name will copy their slug for pasting.

### Getting started

- ### Install the AI SDK package
  First, ensure you have the necessary package installed:
  ```bash filename="Terminal"
  pnpm install ai@latest
  ```

- ### Configure the provider order in your request
  Use the `providerOptions.gateway.order` configuration:

  These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.
  #### AI SDK
  #### TypeScript
  See the [AI SDK routing-options reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#gateway-provider-options) for SDK configuration and usage.
  ```typescript filename="provider-ordering.ts" {8}
  import { streamText } from 'ai';

  const result = streamText({
    model: 'anthropic/claude-sonnet-5',
    prompt: 'Explain quantum computing in two sentences.',
    providerOptions: {
      gateway: {
        order: ['bedrock', 'anthropic'],
      },
    },
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
  ```
  #### Python (beta)
  ```python filename="provider-ordering_ai.py" {8}
  import asyncio
  import ai

  async def main():
      model = ai.get_model("anthropic/claude-sonnet-5")
      messages = [ai.user_message("Explain quantum computing in two sentences.")]
      params = ai.InferenceRequestParams(
          extra_body={"providerOptions": {"gateway": {"order": ["bedrock", "anthropic"]}}}
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
  ```typescript filename="provider-ordering-chat.ts" {20}
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
          order: ['bedrock', 'anthropic'],
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
  ```python filename="provider-ordering_chat.py" {12}
  import os
  from openai import OpenAI

  client = OpenAI(
      api_key=os.environ["AI_GATEWAY_API_KEY"],
      base_url="https://ai-gateway.vercel.sh/v1",
  )

  response = client.chat.completions.create(
      model="anthropic/claude-sonnet-5",
      messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
      extra_body={"providerOptions": {"gateway": {"order": ["bedrock", "anthropic"]}}},
      stream=True,
  )

  for event in response:
      if event.choices:
          print(event.choices[0].delta.content or "", end="", flush=True)
  ```
  #### cURL
  ```bash filename="provider-ordering-chat.sh" {14-17}
  curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/chat/completions \
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
      "gateway": {
        "order": [
          "bedrock",
          "anthropic"
        ]
      }
    },
    "stream": true
  }'
  ```
  #### Messages API
  #### TypeScript
  ```typescript filename="provider-ordering-messages.ts" {20}
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
          order: ['bedrock', 'anthropic'],
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
  ```python filename="provider-ordering_messages.py" {13}
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
      extra_body={"providerOptions": {"gateway": {"order": ["bedrock", "anthropic"]}}},
      stream=True,
  )

  for event in response:
      if event.type == "content_block_delta" and event.delta.type == "text_delta":
          print(event.delta.text, end="", flush=True)
  ```
  #### cURL
  ```bash filename="provider-ordering-messages.sh" {16-19}
  curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/messages \
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
      "gateway": {
        "order": [
          "bedrock",
          "anthropic"
        ]
      }
    },
    "stream": true
  }'
  ```
  #### Responses / OpenResponses
  #### TypeScript
  ```typescript filename="provider-ordering-responses.ts" {14}
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
          order: ['bedrock', 'anthropic'],
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
  ```python filename="provider-ordering_responses.py" {12}
  import os
  from openai import OpenAI

  client = OpenAI(
      api_key=os.environ["AI_GATEWAY_API_KEY"],
      base_url="https://ai-gateway.vercel.sh/v1",
  )

  response = client.responses.create(
      model="anthropic/claude-sonnet-5",
      input="Explain quantum computing in two sentences.",
      extra_body={"providerOptions": {"gateway": {"order": ["bedrock", "anthropic"]}}},
      stream=True,
  )

  for event in response:
      if event.type == "response.output_text.delta":
          print(event.delta, end="", flush=True)
  ```
  #### cURL
  ```bash filename="provider-ordering-responses.sh" {9-12}
  curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/responses \
    -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
    "model": "anthropic/claude-sonnet-5",
    "input": "Explain quantum computing in two sentences.",
    "providerOptions": {
      "gateway": {
        "order": [
          "bedrock",
          "anthropic"
        ]
      }
    },
    "stream": true
  }'
  ```
  In this example:
  - AI Gateway will first attempt to use Amazon Bedrock to serve the Claude Sonnet 5 model
  - If Amazon Bedrock is unavailable or fails, it will fall back to Anthropic
  - Other providers (like Vertex AI) are still available but will only be used after the specified providers

- ### Test the routing behavior
  Read `providerMetadata.gateway.routing.finalProvider` to print the provider that served the response:
  ```typescript filename="provider-ordering-result.ts" {8,13-18}
  import { generateText } from 'ai';

  const result = await generateText({
    model: 'anthropic/claude-sonnet-5',
    prompt: 'Explain quantum computing in two sentences.',
    providerOptions: {
      gateway: {
        order: ['bedrock', 'anthropic'],
      },
    },
  });

  const gatewayMetadata = result.providerMetadata?.gateway as
    | { routing?: { finalProvider?: string } }
    | undefined;

  console.log(result.text);
  console.log('Provider:', gatewayMetadata?.routing?.finalProvider ?? 'unknown');
  ```

### Provider metadata output

```json {9}
{
  "anthropic": {},
  "gateway": {
    "routing": {
      "originalModelId": "anthropic/claude-sonnet-5",
      "resolvedProvider": "anthropic",
      "resolvedProviderApiModelId": "claude-sonnet-5",
      "fallbacksAvailable": ["bedrock", "vertex"],
      "planningReasoning": "System credentials planned for: anthropic. Total execution order: anthropic(system)",
      "canonicalSlug": "anthropic/claude-sonnet-5",
      "finalProvider": "anthropic",
      "modelAttemptCount": 1,
      "modelAttempts": [
        {
          "modelId": "anthropic:claude-sonnet-5",
          "canonicalSlug": "anthropic/claude-sonnet-5",
          "success": true,
          "providerAttemptCount": 1,
          "providerAttempts": [
            {
              "provider": "anthropic",
              "providerApiModelId": "claude-sonnet-5",
              "credentialType": "system",
              "success": true,
              "startTime": 458753.407267,
              "endTime": 459891.705775
            }
          ]
        }
      ],
      "totalProviderAttemptCount": 1
    },
    "cost": "0.0045405",
    "marketCost": "0.0045405",
    "generationId": "gen_01A2B3C4D5E6F7G8H9J0K1L2M"
  }
}
```

The `gateway.cost` value is the inference cost for this request, returned as a decimal string. It does not include other charges that may apply (for example, Custom Reporting writes or Zero Data Retention surcharges). The `gateway.marketCost` represents the market rate cost for the inference. The `gateway.generationId` is a unique identifier for this generation that can be used with the [Generation Lookup API](/docs/ai-gateway/sdks-and-apis/rest-api#look-up-a-generation). For more on pricing see [Pricing](/docs/ai-gateway/pricing).

In cases where your request encounters issues with one or more providers or if your BYOK credentials fail, you'll find error detail in the `providerAttempts` array within each entry of `modelAttempts`:

```json
"modelAttempts": [
  {
    "modelId": "novita:zai-org/glm-5",
    "canonicalSlug": "zai/glm-5",
    "success": true,
    "providerAttemptCount": 2,
    "providerAttempts": [
      {
        "provider": "novita",
        "providerApiModelId": "zai-org/glm-5",
        "credentialType": "byok",
        "success": false,
        "error": "Unauthorized",
        "startTime": 1754639042520,
        "endTime": 1754639042710
      },
      {
        "provider": "novita",
        "providerApiModelId": "zai-org/glm-5",
        "credentialType": "system",
        "success": true,
        "startTime": 1754639042710,
        "endTime": 1754639043353
      }
    ]
  }
]
```

## Provider filtering

### Restrict providers with the `only` filter

Use the `only` array to restrict routing to a specific subset of providers. Providers are specified by their slug and are matched against the model's available providers.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="provider-filtering.ts" {8}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      only: ['bedrock', 'anthropic'],
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="provider-filtering_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"only": ["bedrock", "anthropic"]}}}
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

```typescript filename="provider-filtering-chat.ts" {19}
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
  ...{
    providerOptions: {
      gateway: {
        only: ['bedrock', 'anthropic'],
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="provider-filtering_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"only": ["bedrock", "anthropic"]}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="provider-filtering-chat.sh" {14-17}
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
    "gateway": {
      "only": [
        "bedrock",
        "anthropic"
      ]
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="provider-filtering-messages.ts" {20}
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
        only: ['bedrock', 'anthropic'],
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="provider-filtering_messages.py" {13}
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
    extra_body={"providerOptions": {"gateway": {"only": ["bedrock", "anthropic"]}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="provider-filtering-messages.sh" {16-19}
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
    "gateway": {
      "only": [
        "bedrock",
        "anthropic"
      ]
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="provider-filtering-responses.ts" {14}
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
        only: ['bedrock', 'anthropic'],
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="provider-filtering_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"only": ["bedrock", "anthropic"]}}},
)

print(response.output_text)
```

#### cURL

```bash filename="provider-filtering-responses.sh" {9-12}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "only": [
        "bedrock",
        "anthropic"
      ]
    }
  }
}'
```

In this example:

- **Restriction**: Only `bedrock` and `anthropic` will be considered for routing and fallbacks.
- **Error on mismatch**: If none of the specified providers are available for the model, the request fails with an error indicating the allowed providers.

### Using `only` together with `order`

When both `only` and `order` are provided, the `only` filter is applied first to define the allowed set, and then `order` defines the priority within that filtered set. Practically, the end result is the same as taking your `order` list and intersecting it with the `only` list.

```typescript filename="app/api/chat/route.ts" {11-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-5',
    prompt,
    providerOptions: {
      gateway: {
        only: ['anthropic', 'vertex'],
        order: ['vertex', 'bedrock', 'anthropic'],
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

The final order will be `vertex → anthropic` (providers listed in `order` but not in `only` are ignored).

## Provider sorting

Use the `sort` option to rank providers by a performance or cost metric. The gateway sorts the available providers by the chosen metric and tries them in that order, falling back through the list if a provider fails.

| Value    | Description                                     | Direction            |
| -------- | ----------------------------------------------- | -------------------- |
| `'cost'` | Sort by estimated cost                          | Lowest cost first    |
| `'ttft'` | Sort by time to first token (median, in ms)     | Lowest latency first |
| `'tps'`  | Sort by tokens per second throughput (median)    | Highest first        |

### Sort by cost

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="provider-sorting.ts" {8}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      sort: 'cost',
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="provider-sorting_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"sort": "cost"}}}
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

```typescript filename="provider-sorting-chat.ts" {19}
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
  ...{
    providerOptions: {
      gateway: {
        sort: 'cost',
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="provider-sorting_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"sort": "cost"}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="provider-sorting-chat.sh" {14}
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
    "gateway": {
      "sort": "cost"
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="provider-sorting-messages.ts" {20}
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
        sort: 'cost',
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="provider-sorting_messages.py" {13}
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
    extra_body={"providerOptions": {"gateway": {"sort": "cost"}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="provider-sorting-messages.sh" {16}
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
    "gateway": {
      "sort": "cost"
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="provider-sorting-responses.ts" {14}
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
        sort: 'cost',
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="provider-sorting_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"sort": "cost"}}},
)

print(response.output_text)
```

#### cURL

```bash filename="provider-sorting-responses.sh" {9}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "sort": "cost"
    }
  }
}'
```

### Sort by latency

```typescript filename="app/api/chat/route.ts" {11}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-5',
    prompt,
    providerOptions: {
      gateway: {
        sort: 'ttft', // Use the fastest provider first
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

### Combining `sort` with `order` and `only`

You can combine `sort` with `order` and `only`. When combined with `order`, the providers you specify in `order` are promoted to the front of the list, while the remaining providers follow the sorted order. When combined with `only`, sorting is applied within the restricted set of providers.

```typescript filename="app/api/chat/route.ts" {11-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-5',
    prompt,
    providerOptions: {
      gateway: {
        only: ['anthropic', 'bedrock', 'vertex'],
        sort: 'tps', // Among these three, try the fastest throughput first
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

### Sort metadata

When `sort` is active, the response's provider metadata includes a `sort` object inside `gateway.routing`:

```json {4-13}
{
  "gateway": {
    "routing": {
      "sort": {
        "option": "cost",
        "executionOrder": ["anthropic", "bedrock", "vertex"],
        "metrics": {
          "anthropic": 0.003,
          "bedrock": 0.003,
          "vertex": 0.005
        },
        "deprioritizedProviders": []
      }
    }
  }
}
```

| Field                     | Description                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
| `option`                  | The sort metric used (`cost`, `ttft`, or `tps`)                            |
| `executionOrder`          | Providers in the order they were attempted after sorting                    |
| `metrics`                 | Per-provider metric values used for ranking (`null` if no data available)   |
| `deprioritizedProviders`  | Providers that were penalized due to degraded health                        |

### How sort interacts with provider health

The gateway uses provider health status as a guard rail when sorting:

- **Healthy** providers are sorted purely by the chosen metric.
- **Degraded** or **recovering** providers receive a penalty to their metric score, pushing them lower in the sort order.
- **Down** providers are always sorted last, regardless of their metric values.

This means sort optimizes for your chosen metric while still avoiding unhealthy providers.

## Quick reference

| Option  | Type                           | Description                                                    |
| ------- | ------------------------------ | -------------------------------------------------------------- |
| `order` | `string[]`                     | Provider slugs in the order they should be attempted           |
| `only`  | `string[]`                     | Restrict routing to only these provider slugs                  |
| `sort`  | `'cost'` | `'ttft'` | `'tps'` | Sort providers by cost, time to first token, or tokens per second |

All options are set under `providerOptions.gateway` in the AI SDK, or under `providerOptions` in the REST API / OpenAI-compatible Chat Completions API. The Chat Completions API also accepts a top-level `provider` shorthand (e.g., `"provider": { "sort": "tps" }`). See [Available Providers](/docs/ai-gateway/models-and-providers/provider-options#available-providers) for the full list of provider slugs.

To filter by a capability of the model itself (rather than by provider), see [Model Filtering](/docs/ai-gateway/models-and-providers/model-filtering).


---

[View full sitemap](/docs/sitemap)
