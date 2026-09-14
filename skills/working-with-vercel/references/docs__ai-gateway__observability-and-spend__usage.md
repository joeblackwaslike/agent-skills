---
title: AI Gateway Generation Lookup and Usage API
product: vercel
url: /docs/ai-gateway/observability-and-spend/usage
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/usage"
last_updated: 2026-09-07
type: conceptual
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/observability-and-spend/custom-reporting
  - /docs/ai-gateway/observability-and-spend/logs
  - /docs/ai-gateway/observability-and-spend/trace-drains
summary: Look up an AI Gateway generation by ID to inspect its provider, latency, token usage, cost, and finish reason, or check your credit balance.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/usage.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "ab669571d08dbb606ec5511c8f388bffdef8102156a57e8e77a891a40f5ad061"
---

# AI Gateway Generation Lookup and Usage API

AI Gateway records every generation it serves. Look up a generation by ID to inspect its provider, latency, token usage, cost, and finish reason. You can also check your team's credit balance and lifetime spend.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway logs now have a dedicated page](https://vercel.com/changelog/ai-gateway-logs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related)
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related)
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Understand AI Gateway token pricing, free and paid credits, BYOK costs, add-on charges, and payment fees. Manage credit
- [AI Gateway Observability](https://vercel.com/docs/ai-gateway/observability-and-spend/observability?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Monitor AI Gateway requests in the Vercel dashboard. Inspect token usage, latency, spend, and logs at team, project, and
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend/usage.graph.md](/docs/ai-gateway/observability-and-spend/usage.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## View generations in the dashboard

Open the [**AI Gateway** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in your Vercel dashboard. The top of the page shows your current AI Gateway Credits balance and recent spend; the **Generations** view shows individual requests with cost, latency, and token usage.

## Generation and credit APIs

Use the REST API to look up individual generations or monitor your balance:

- [`GET /v1/generation`](/docs/ai-gateway/sdks-and-apis/rest-api#look-up-a-generation) returns cost, latency, finish reason, and token usage for a specific generation.
- [`GET /v1/credits`](/docs/ai-gateway/sdks-and-apis/rest-api#check-credit-balance) returns the team's remaining credit balance and lifetime spend.

> **💡 Note:** **Generation IDs:** Generation IDs are returned on every chat completion
> response as the [`id`](https://platform.openai.com/docs/api-reference/chat/object#chat/object-id)
> field, and on streaming responses are injected into the first content chunk so
> you can capture them before the stream completes. They are also surfaced via
> `providerMetadata.gateway.generationId` in the AI SDK.

For aggregated spend across a date range (grouped by user, model, tag, provider, and more), see [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting).

## Look up a generation with the AI SDK

Install AI SDK 7 and set `AI_GATEWAY_API_KEY` before running this script. It tags a request, captures its generation ID, waits for usage ingestion, and prints the available provider, latency, token, and routing fields:

```typescript filename="trace-generation.ts"
import { gateway, generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      tags: ['feature:chat'],
    },
  },
});

const gatewayMetadata = result.providerMetadata?.gateway as
  | { generationId?: string; routing?: unknown }
  | undefined;
const generationId = gatewayMetadata?.generationId;
if (typeof generationId !== 'string') {
  throw new Error('Missing generation ID');
}

async function getGeneration() {
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      return await gateway.getGenerationInfo({ id: generationId });
    } catch (error) {
      const statusCode =
        typeof error === 'object' &&
        error !== null &&
        'statusCode' in error &&
        typeof error.statusCode === 'number'
          ? error.statusCode
          : undefined;
      if (statusCode !== 404 || attempt === 9) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error('Generation lookup failed');
}

const generation = await getGeneration();

console.log(
  JSON.stringify(
    {
      generationId,
      provider: generation.providerName,
      model: generation.model,
      timeToFirstTokenMs: generation.latency,
      generationTimeMs: generation.generationTime,
      promptTokens: generation.promptTokens,
      completionTokens: generation.completionTokens,
      reasoningTokens: generation.reasoningTokens,
      cachedTokens: generation.cachedTokens,
      finishReason: generation.finishReason,
      routing: gatewayMetadata?.routing,
    },
    null,
    2,
  ),
);
```

Usage events are ingested asynchronously, so the lookup retries HTTP `404` responses while the record becomes available. Check the error's `statusCode` instead of matching its message, which the SDK can normalize. The `routing` object includes provider attempts and any attempt errors returned in the response metadata. Generation lookup returns completed generation details. To inspect a request that fails before returning response metadata, use [AI Gateway request logs](/docs/ai-gateway/observability-and-spend/logs) or [trace drains](/docs/ai-gateway/observability-and-spend/trace-drains).

The AI SDK maps the common generation fields to camelCase. Use the [REST response](/docs/ai-gateway/sdks-and-apis/rest-api#look-up-a-generation) when you need its additional cost breakdown, including `market_cost`, `surcharge_cost`, and `gateway_cost`.


---

[View full sitemap](/docs/sitemap)
