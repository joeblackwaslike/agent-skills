---
title: Usage & Billing
product: vercel
url: /docs/ai-gateway/observability-and-spend/usage
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/usage"
last_updated: 2026-07-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/observability-and-spend/custom-reporting
summary: Monitor your AI Gateway credit balance, usage, and generation details.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/usage.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ca81b40dcfd635f566988b01f3e4a301c25fc14ec1fba70383bea059037565ef"
---

# Usage & Billing

AI Gateway tracks credit balance, total spend, and a record of every generation it serves. You can review this data in the dashboard or query it programmatically through the REST API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Pricing](https://vercel.com/docs/ai-gateway/pricing?from=related) — Learn about pricing for AI Gateway.
- [Observability](https://vercel.com/docs/ai-gateway/observability-and-spend/observability?from=related) — Learn how to monitor and debug your AI Gateway requests.
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs?from=related) — Search, filter, and follow individual AI Gateway requests, inspect provider routing for one request, and export the resu
- [vercel usage](https://vercel.com/docs/cli/usage?from=related) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend/usage.graph.md](/docs/ai-gateway/observability-and-spend/usage.graph.md)
<!-- /docsgraph:related -->

## In the dashboard

Open the [**AI Gateway** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in your Vercel dashboard. The top of the page shows your current AI Gateway Credits balance and recent spend; the **Generations** view shows individual requests with cost, latency, and token usage.

## Programmatic access

Use the REST API to monitor balance and look up individual generations:

- [`GET /v1/credits`](/docs/ai-gateway/sdks-and-apis/rest-api#check-credit-balance) returns the team's remaining credit balance and lifetime spend.
- [`GET /v1/generation`](/docs/ai-gateway/sdks-and-apis/rest-api#look-up-a-generation) returns cost, latency, finish reason, and token usage for a specific generation.

> **💡 Note:** **Generation IDs:** Generation IDs are returned on every chat completion
> response as the [`id`](https://platform.openai.com/docs/api-reference/chat/object#chat/object-id)
> field, and on streaming responses are injected into the first content chunk so
> you can capture them before the stream completes. They are also surfaced via
> `providerMetadata.gateway.generationId` in the AI SDK.

For aggregated spend across a date range (grouped by user, model, tag, provider, and more), see [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting).


---

[View full sitemap](/docs/sitemap)
