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
  - /docs/ai-gateway/models-and-providers/automatic-caching
summary: Restrict AI Gateway routing to models that have specific capabilities using the has option.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/model-filtering.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "ab9b71262338e095419c421cbb68a4be3d847a1da5d02b3b151f15ad86b395b1"
---

# Model Filtering

[Provider filtering, ordering, and sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) controls *which providers* serve a request. Model filtering instead constrains routing by a capability of the *model itself* using `has` in `providerOptions.gateway`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Model fallbacks now available in Vercel AI Gateway](https://vercel.com/changelog/model-fallbacks-now-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related)
- [Team-wide provider allowlist on AI Gateway](https://vercel.com/changelog/team-wide-provider-allowlist-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related)
- [Provider Options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway
- [Model Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/model-allowlist?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Restrict which AI models your team can use through AI Gateway. Available on Pro and Enterprise.
- [Provider Options](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API.
- [Provider Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/provider-allowlist?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Restrict which AI providers your team can route through AI Gateway. Available on Pro and Enterprise.
- [Model Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Configure model-level failover to try backup models when the primary model is unavailable

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/model-filtering.graph.md](/docs/ai-gateway/models-and-providers/model-filtering.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=graph)
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
> require explicit caching, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).

## Combining with provider filtering

`has` composes with the provider-level [`order`, `only`, and `sort`](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) options. The model-capability filter and the provider filters are both applied, so the request is routed only to providers that satisfy your provider constraints *and* whose model has the required capabilities.

## Quick reference

| Option | Type                        | Description                                                       |
| ------ | --------------------------- | ---------------------------------------------------------------- |
| `has`  | `Array<'implicit-caching'>` | Restrict routing to models that have all of the given capabilities |

This option is set under `providerOptions.gateway` in the AI SDK, or under `providerOptions` in the REST API / OpenAI-compatible Chat Completions API.


---

[View full sitemap](/docs/sitemap)
