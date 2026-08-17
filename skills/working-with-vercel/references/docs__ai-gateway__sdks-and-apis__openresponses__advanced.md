---
title: Provider Options
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/advanced
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/models-and-providers/automatic-caching
summary: Configure provider routing, fallbacks, and restrictions using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a3b1e4d70505380e69745fe1150fd8a1706207ca75f05d8abb40799cc56baba6"
---

# Provider Options

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) lets you configure AI Gateway behavior using `providerOptions`. The `gateway` namespace gives you control over provider routing, fallbacks, and restrictions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related)
- [Provider Options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway
- [Provider & Model Management](https://ai-sdk.dev/docs/ai-sdk-core/provider-management?from=related)
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced?from=related) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching.
- [Models & Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related) — Work with models and providers in AI Gateway: provider routing and fallbacks, filtering, timeouts, caching, service tier
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching.
- [Filtering, Ordering & Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related) — Control which providers handle your requests, in what order, and how they are ranked using order, only, and sort options

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/advanced.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/advanced.graph.md)
<!-- /docsgraph:related -->

## Model fallbacks

Set up automatic fallbacks so if your primary model is unavailable, requests route to backup models in order. Use the `models` array to specify the fallback chain.

```typescript filename="fallbacks.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-opus-5',
    input: [{ type: 'message', role: 'user', content: 'Tell me a fun fact about octopuses.' }],
    providerOptions: {
      gateway: {
        models: ['anthropic/claude-opus-5', 'openai/gpt-5.6-sol', 'google/gemini-3.1-pro-preview'],
      },
    },
  }),
});
```

## Provider routing

Control the order in which providers are tried using the `order` array. AI Gateway will attempt providers in the specified order until one succeeds.

```typescript filename="routing.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'google/gemini-3.1-pro-preview',
    input: [{ type: 'message', role: 'user', content: 'Explain quantum computing in one sentence.' }],
    providerOptions: {
      gateway: {
        order: ['google', 'openai', 'anthropic'],
      },
    },
  }),
});
```

## Provider restriction

Restrict requests to specific providers using the `only` array. This ensures your requests only go to approved providers, which can be useful for compliance or cost control.

```typescript filename="restriction.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'zai/glm-4.7',
    input: [{ type: 'message', role: 'user', content: 'What makes a great cup of coffee?' }],
    providerOptions: {
      gateway: {
        only: ['zai', 'deepseek'],
      },
    },
  }),
});
```

## Provider timeouts

You can set per-provider timeouts for BYOK credentials to trigger fast failover when a provider is slow to respond. Pass `providerTimeouts` in `providerOptions.gateway`:

```json
"providerOptions": {
  "gateway": {
    "providerTimeouts": {
      "byok": { "anthropic": 3000, "bedrock": 5000 }
    }
  }
}
```

For full details, limits, and response metadata, see [Provider Timeouts](/docs/ai-gateway/models-and-providers/provider-timeouts).

## Automatic caching

Use `caching: 'auto'` in the request body to let AI Gateway automatically add cache markers for providers that require them (like Anthropic). For full details, supported providers, and examples, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).


---

[View full sitemap](/docs/sitemap)
