---
title: Provider Filtering, Ordering & Sorting
product: vercel
url: /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering"
last_updated: 2026-04-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/sdks-and-apis/rest-api
summary: Control which providers handle your requests, in what order, and how they are ranked using order, only, and sort options.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "72cdfa8092abe774fbb0e4c6b7de4071d1b80c39799d7718d47a33baa56be642"
---

# Provider Filtering, Ordering & Sorting

By default, AI Gateway dynamically chooses providers based on recent uptime and latency. You can override this behavior to control which providers handle your requests and in what order using `order`, `only`, and `sort` in `providerOptions.gateway`.

## Provider ordering

Use the `order` array to specify the sequence in which providers should be attempted. Providers are specified using their `slug` string. You can find the slugs in the [table of available providers](/docs/ai-gateway/models-and-providers/provider-options#available-providers).

You can also copy the provider slug using the copy button next to a provider's name on a model's detail page:

**Through the Vercel Dashboard:**

1. Click the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) tab
2. Click [**Model List**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fmodels\&title=Go+to+Model+List) on the left
3. Click a model entry in the list

**Through the AI Gateway site:**

Visit a model's page on the [AI Gateway models page](https://vercel.com/ai-gateway/models) (e.g., [Claude Sonnet 4.6](https://vercel.com/ai-gateway/models/claude-sonnet-4.6)).

The bottom section of the page lists the available providers for that model. The copy button next to a provider's name will copy their slug for pasting.

### Getting started

- ### Install the AI SDK package
  First, ensure you have the necessary package installed:
  ```bash filename="Terminal"
  pnpm install ai
  ```

- ### Configure the provider order in your request
  Use the `providerOptions.gateway.order` configuration:
  ```typescript filename="app/api/chat/route.ts" {7-11}
  import { streamText } from 'ai';

  export async function POST(request: Request) {
    const { prompt } = await request.json();

    const result = streamText({
      model: 'anthropic/claude-sonnet-4.6',
      prompt,
      providerOptions: {
        gateway: {
          order: ['bedrock', 'anthropic'], // Try Amazon Bedrock first, then Anthropic
        },
      },
    });

    return result.toUIMessageStreamResponse();
  }
  ```
  In this example:
  - The gateway will first attempt to use Amazon Bedrock to serve the Claude 4 Sonnet model
  - If Amazon Bedrock is unavailable or fails, it will fall back to Anthropic
  - Other providers (like Vertex AI) are still available but will only be used after the specified providers

- ### Test the routing behavior
  You can monitor which provider you used by checking the provider metadata in the response.
  ```typescript filename="app/api/chat/route.ts" {16-17}
  import { streamText } from 'ai';

  export async function POST(request: Request) {
    const { prompt } = await request.json();

    const result = streamText({
      model: 'anthropic/claude-sonnet-4.6',
      prompt,
      providerOptions: {
        gateway: {
          order: ['bedrock', 'anthropic'],
        },
      },
    });

    // Log which provider was actually used
    console.log(JSON.stringify(await result.providerMetadata, null, 2));

    return result.toUIMessageStreamResponse();
  }
  ```

### Provider metadata output

```json
{
  "anthropic": {},
  "gateway": {
    "routing": {
      "originalModelId": "anthropic/claude-sonnet-4.6",
      "resolvedProvider": "anthropic",
      "resolvedProviderApiModelId": "claude-sonnet-4.6",
      "fallbacksAvailable": ["bedrock", "vertex"],
      "planningReasoning": "System credentials planned for: anthropic. Total execution order: anthropic(system)",
      "canonicalSlug": "anthropic/claude-sonnet-4.6",
      "finalProvider": "anthropic",
      "modelAttemptCount": 1,
      "modelAttempts": [
        {
          "modelId": "anthropic:claude-sonnet-4.6",
          "canonicalSlug": "anthropic/claude-sonnet-4.6",
          "success": true,
          "providerAttemptCount": 1,
          "providerAttempts": [
            {
              "provider": "anthropic",
              "providerApiModelId": "claude-sonnet-4.6",
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

The `gateway.cost` value is the inference cost for this request, returned as a decimal string. It does not include other charges that may apply (for example, Custom Reporting writes or Zero Data Retention surcharges). The `gateway.marketCost` represents the market rate cost for the inference. The `gateway.generationId` is a unique identifier for this generation that can be used with the [Generation Lookup API](/docs/ai-gateway/sdks-and-apis/rest-api#look-up-a-generation). For more on pricing see .

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

```typescript filename="app/api/chat/route.ts" {9-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
    prompt,
    providerOptions: {
      gateway: {
        only: ['bedrock', 'anthropic'], // Only consider these providers.
        // This model is also available via 'vertex', but it won't be considered.
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

In this example:

- **Restriction**: Only `bedrock` and `anthropic` will be considered for routing and fallbacks.
- **Error on mismatch**: If none of the specified providers are available for the model, the request fails with an error indicating the allowed providers.

### Using `only` together with `order`

When both `only` and `order` are provided, the `only` filter is applied first to define the allowed set, and then `order` defines the priority within that filtered set. Practically, the end result is the same as taking your `order` list and intersecting it with the `only` list.

```typescript filename="app/api/chat/route.ts" {9-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
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

```typescript filename="app/api/chat/route.ts" {9-11}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
    prompt,
    providerOptions: {
      gateway: {
        sort: 'cost', // Use the lowest cost provider first
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

### Sort by latency

```typescript filename="app/api/chat/route.ts" {9-11}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
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

```typescript filename="app/api/chat/route.ts" {9-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
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

```json
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


---

[View full sitemap](/docs/sitemap)
