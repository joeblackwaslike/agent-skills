---
title: Usage & Billing
product: vercel
url: /docs/ai-gateway/observability-and-spend/usage
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/usage"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/observability-and-spend/custom-reporting
summary: Learn about usage & billing on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/usage.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "b4c48b2f700c184e31b6cfdf9fed59e6e7db53315a4481783768bdda615935a4"
---

# Usage & Billing

AI Gateway tracks credit balance, total spend, and a record of every generation it serves. You can review this data in the dashboard or query it programmatically through the REST API.

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
