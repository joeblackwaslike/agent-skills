---
title: Model Filtering
product: vercel
url: /docs/ai-gateway/models-and-providers/model-filtering
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/model-filtering"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/authentication-and-byok
summary: Learn about model filtering on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/model-filtering.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "3032a94dc3befb092d5616ccada1690f48b63ce979aa21c1dfb4bd2743c37ceb"
---

# Model Filtering

[Provider filtering, ordering, and sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) controls *which providers* serve a request. Model filtering instead constrains routing by a capability of the *model itself* using `has` in `providerOptions.gateway`.

## Require model capabilities with `has`

Use the `has` array to restrict routing to provider models that have all of the given capabilities. Because a capability is a property of the model rather than the credential, this filter applies to both system and [BYOK](/docs/ai-gateway/authentication-and-byok) credentials.

The following capabilities are supported:

| Capability         | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `implicit-caching` | Models that perform automatic (implicit) prompt caching |

```typescript filename="app/api/chat/route.ts" {9-11}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'deepseek/deepseek-v4-flash',
    prompt,
    providerOptions: {
      gateway: {
        has: ['implicit-caching'], // Only route to providers whose model caches automatically
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

In this example:

- **Restriction**: Only provider models with the `implicit-caching` capability are eligible for routing and fallbacks. The filter applies to both system and BYOK credentials.
- **All capabilities required**: When you list more than one capability, a model must have every one to be eligible.
- **Error on mismatch**: If no provider model for the requested model has the capabilities, the request fails. Unsupported values are rejected.

> **💡 Note:** `has: ['implicit-caching']` ensures you only route to models that cache
> automatically. To instead let AI Gateway add cache markers for providers that
> require explicit caching, see .

## Combining with provider filtering

`has` composes with the provider-level [`order`, `only`, and `sort`](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) options. The model-capability filter and the provider filters are both applied, so the request is routed only to providers that satisfy your provider constraints *and* whose model has the required capabilities.

## Quick reference

| Option | Type                        | Description                                                       |
| ------ | --------------------------- | ---------------------------------------------------------------- |
| `has`  | `Array<'implicit-caching'>` | Restrict routing to models that have all of the given capabilities |

This option is set under `providerOptions.gateway` in the AI SDK, or under `providerOptions` in the REST API / OpenAI-compatible Chat Completions API.


---

[View full sitemap](/docs/sitemap)
