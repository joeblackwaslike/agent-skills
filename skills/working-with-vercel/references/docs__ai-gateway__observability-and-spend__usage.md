---
title: AI Gateway Usage & Billing
product: vercel
url: /docs/ai-gateway/observability-and-spend/usage
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/usage"
last_updated: 2026-08-22
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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "02fe5cd9b2ddb436f8dc99d62b06e3f41e9830f11796e98535a6599fafb923b7"
---

# AI Gateway Usage & Billing

AI Gateway tracks credit balance, total spend, and a record of every generation it serves. You can review this data in the dashboard or query it programmatically through the REST API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Unified reporting for all AI Gateway usage](https://vercel.com/blog/unified-reporting-for-your-ai-spend?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related)
- [AI Gateway logs now have a dedicated page](https://vercel.com/changelog/ai-gateway-logs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related)
- [Custom reporting now available on AI Gateway](https://vercel.com/changelog/custom-reporting-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related)
- [Auto-recharge available in AI Gateway](https://vercel.com/changelog/auto-recharge-available-in-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related)
- [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Learn about pricing for AI Gateway.
- [Observability](https://vercel.com/docs/ai-gateway/observability-and-spend/observability?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Learn how to monitor and debug your AI Gateway requests.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Use the Blackbox AI CLI with the AI Gateway.
- [Logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Search, filter, and follow individual AI Gateway requests, inspect provider routing for one request, and export the resu
- [Stripe Billing](https://vercel.com/docs/ai-gateway/ecosystem/stripe-billing?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=related) — Add usage-based billing to your AI application with Stripe and AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend/usage.graph.md](/docs/ai-gateway/observability-and-spend/usage.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fusage&source_site=vercel-docs&relationship=graph)
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
