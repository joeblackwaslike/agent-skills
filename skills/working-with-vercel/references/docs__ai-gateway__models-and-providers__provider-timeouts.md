---
title: Provider Timeouts
product: vercel
url: /docs/ai-gateway/models-and-providers/provider-timeouts
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-timeouts"
last_updated: 2026-07-28
type: integration
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-options
summary: Configure per-provider timeouts for fast failover when a provider is slow to respond.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-timeouts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c90e1f1d0a824f04fe7b025a107766d2ccb35b50bdca3d629a10fc26aed9c440"
---

# Provider Timeouts

You can set per-provider timeouts to trigger fast failover when a provider is slow to respond. If a provider doesn't start responding within the configured timeout, AI Gateway aborts the request and falls back to the next available provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related)
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API.
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related)
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching.
- [Model Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks?from=related) — Configure model-level failover to try backup models when the primary model is unavailable
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced?from=related) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching.
- [Filtering, Ordering & Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related) — Control which providers handle your requests, in what order, and how they are ranked using order, only, and sort options

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/provider-timeouts.graph.md](/docs/ai-gateway/models-and-providers/provider-timeouts.graph.md)
<!-- /docsgraph:related -->

Use this for latency-sensitive applications where fast failover beats waiting for a slow provider.

> **💡 Note:** Provider timeouts apply to BYOK (Bring Your Own Key) credentials only. Some
> providers don't support stream cancellation, so you may still be charged for
> timed-out requests depending on the provider.

## Set provider timeouts

Use the `providerTimeouts` option in `providerOptions.gateway` to configure timeouts per provider. Values are in milliseconds.

```typescript filename="app/api/chat/route.ts" {9-13}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    providerOptions: {
      gateway: {
        providerTimeouts: {
          byok: { openai: 15000 }, // 15 seconds
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

In this example, if OpenAI doesn't start responding within 15 seconds using your own API key, AI Gateway aborts the request and tries the next available provider.

## Timeout limits

| Minimum      | Maximum             |
| ------------ | ------------------- |
| 1,000ms (1s) | 789,000ms (~13 min) |

> **💡 Note:** The timeout measures time until the provider starts streaming. Once the first
> token arrives (including thinking tokens from reasoning models), the timeout
> is cleared and won't fire.

## Combine with provider routing

Provider timeouts work with all other [provider options](/docs/ai-gateway/models-and-providers/provider-options). Combine them with `order` to control both the provider sequence and failover speed:

```typescript filename="app/api/chat/route.ts" {9-15}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5',
    prompt,
    providerOptions: {
      gateway: {
        order: ['anthropic', 'bedrock', 'vertex'],
        providerTimeouts: {
          byok: {
            anthropic: 10000,
            bedrock: 15000,
            // no timeout for vertex — uses the default gateway timeout
          },
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

This configuration:

1. Tries Anthropic first with a 10-second timeout
2. If Anthropic is slow, falls back to Bedrock with a 15-second timeout
3. If Bedrock is slow, falls back to Vertex with the default gateway timeout

## Check timeout behavior in response metadata

When a provider times out, the attempt metadata includes `providerTimeout` and `configuredTimeoutMs` fields so you can see exactly what happened. Check the `providerAttempts` within each `modelAttempts` entry:

```json
"modelAttempts": [
  {
    "modelId": "anthropic:claude-sonnet-5",
    "canonicalSlug": "anthropic/claude-sonnet-5",
    "success": true,
    "providerAttemptCount": 2,
    "providerAttempts": [
      {
        "provider": "anthropic",
        "credentialType": "byok",
        "success": false,
        "error": "PROVIDER_TIMEOUT",
        "providerTimeout": true,
        "configuredTimeoutMs": 10000
      },
      {
        "provider": "bedrock",
        "credentialType": "byok",
        "success": true,
        "statusCode": 200
      }
    ]
  }
]
```

For more details on reading provider metadata, see [Provider Options](/docs/ai-gateway/models-and-providers/provider-options#example-provider-metadata-output).


---

[View full sitemap](/docs/sitemap)
