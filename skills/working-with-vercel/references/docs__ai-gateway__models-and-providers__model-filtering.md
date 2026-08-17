---
title: Model Filtering
product: vercel
url: /docs/ai-gateway/models-and-providers/model-filtering
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/model-filtering"
last_updated: 2026-06-26
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/authentication-and-byok
summary: Restrict AI Gateway routing to models that have specific capabilities using the has option.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/model-filtering.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1b7a2ccb0ff57dd74366a2e2f4021dbaf2bb94db87306cb4a95457ed516bd7b0"
---

# Model Filtering

[Provider filtering, ordering, and sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) controls *which providers* serve a request. Model filtering instead constrains routing by a capability of the *model itself* using `has` in `providerOptions.gateway`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Provider Options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway
- [Model Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/model-allowlist?from=related) — Restrict which AI models your team can use through AI Gateway. Available on Pro and Enterprise.
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API.
- [Provider Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/provider-allowlist?from=related) — Restrict which AI providers your team can route through AI Gateway. Available on Pro and Enterprise.
- [Model Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks?from=related) — Configure model-level failover to try backup models when the primary model is unavailable

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/model-filtering.graph.md](/docs/ai-gateway/models-and-providers/model-filtering.graph.md)
<!-- /docsgraph:related -->

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
