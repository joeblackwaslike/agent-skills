---
title: Provider Options
product: vercel
url: /docs/ai-gateway/models-and-providers/provider-options
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-options"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/automatic-caching
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/models-and-providers/model-fallbacks
summary: Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-options.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "71b6a8e8b4637747863aeb93f4a89ffb71c81efe5ffcc719a9c7eb8eb13ec606"
---

# Provider Options

AI Gateway can route your AI model requests across multiple AI providers. Each provider offers different models, pricing, and performance characteristics. By default, Vercel AI Gateway dynamically chooses the default providers to give you the best experience based on a combination of recent uptime and latency.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related)
- [Choosing a Provider](https://ai-sdk.dev/docs/getting-started/choosing-a-provider?from=related)
- [Provider & Model Management](https://ai-sdk.dev/docs/ai-sdk-core/provider-management?from=related)
- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related)
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API.
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching.
- [Advanced](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced?from=related) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching.
- [Hermes](https://vercel.com/docs/ai-gateway/coding-agents/hermes?from=related) — Use the Hermes agent with the AI Gateway.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/provider-options.graph.md](/docs/ai-gateway/models-and-providers/provider-options.graph.md)
<!-- /docsgraph:related -->

With the Gateway Provider Options however, you have control over the routing order and fallback behavior of the models.

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

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5',
    prompt,
    providerOptions: {
      anthropic: {
        thinkingBudget: 0.001,
      },
      gateway: {
        order: ['vertex'],
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

In this example:

- We're using an Anthropic model (e.g. Claude 4 Sonnet) but accessing it through Vertex AI
- The Anthropic-specific options still apply to the model:
  - `thinkingBudget` sets a cost limit of $0.001 per request for the Claude model
- You can read more about provider-specific options in the [AI SDK documentation](https://ai-sdk.dev/docs/foundations/prompts#provider-options)

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
how to control the computational effort and summary detail level when using OpenAI's `gpt-oss-120b` model.

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

**Note:** For `openai/gpt-5.6-sol` models, you must set both `reasoningEffort` and `reasoningSummary` in `providerOptions` to receive reasoning output.

```typescript
providerOptions: {
  openai: {
    reasoningEffort: 'high', // or 'minimal', 'low', 'medium', 'none'
    reasoningSummary: 'detailed', // or 'auto', 'concise'
  },
}
```

## Available providers

You can view the available models for a provider
in the [**Model List**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fmodels\&title=Go+to+Model+List) section under
the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in your Vercel dashboard sidebar
or in the public [models page](/ai-gateway/models).

> **💡 Note:** Provider availability may vary by model. Some models may only be available
> through specific providers or may have different capabilities depending on the
> provider used.


---

[View full sitemap](/docs/sitemap)
