---
title: Observability and Spend
product: vercel
url: /docs/ai-gateway/observability-and-spend
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend"
last_updated: 2026-07-31
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/custom-reporting
  - /docs/ai-gateway/observability-and-spend/usage
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/observability-and-spend/trace-drains
summary: "Monitor AI Gateway requests and manage spend: observability, custom reporting, usage and billing APIs, and spending budgets."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "bf11f1d229d73e40dce5aa47f25faf1495871aa221dc3374dd64105394ba70a1"
---

# Observability and Spend

AI Gateway logs every request and gives you the tools to understand and control what you spend. You can monitor latency and token usage in the dashboard, query spend by model, user, or tag, track credit balances, and cap how much your team, a project, or an API key can spend with budgets.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Pricing](https://vercel.com/docs/ai-gateway/pricing?from=related) — Learn about pricing for AI Gateway.
- [Spend Management](https://vercel.com/docs/spend-management?from=related) — Learn how to get notified about your account spend and configure a webhook.
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Manage & Optimize](https://vercel.com/docs/manage-and-optimize-observability?from=related) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend.graph.md](/docs/ai-gateway/observability-and-spend.graph.md)
<!-- /docsgraph:related -->

## What you can do

- **Monitor every request**: Track latency, token counts, and spend in the dashboard with [Observability](/docs/ai-gateway/observability-and-spend/observability)
- **Query usage data**: Break down costs by model, user, tag, or provider with the [Custom Reporting API](/docs/ai-gateway/observability-and-spend/custom-reporting)
- **Check credits and lookups**: Track credit balances and look up generation details with the [Usage & Billing API](/docs/ai-gateway/observability-and-spend/usage)
- **Cap spend**: Set a spending limit for your team, a project, or an API key with [Budgets](/docs/ai-gateway/observability-and-spend/budgets)
- **Export traces**: Forward an OpenTelemetry trace of every request to your own observability tool with [Trace Drains](/docs/ai-gateway/observability-and-spend/trace-drains)

## Features overview

| Feature                                                                       | What it does                            | Key details                                                             |
| ----------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| [Observability](/docs/ai-gateway/observability-and-spend/observability)       | Monitor and debug AI requests           | Request traces, token counts, latency metrics, spend tracking           |
| [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting) | Query usage data with flexible grouping | Group by model, user, tag, provider, or credential type; filter by date |
| [Usage & Billing](/docs/ai-gateway/observability-and-spend/usage)             | Track credits and generations           | Credit balance API, generation lookup, cost tracking                    |
| [Budgets](/docs/ai-gateway/observability-and-spend/budgets)                   | Cap spending by team, project, or key   | Scoped limits, daily/weekly/monthly refresh, spend alerts, defaults     |
| [Trace Drains](/docs/ai-gateway/observability-and-spend/trace-drains)         | Export request traces via OTLP          | OpenTelemetry traces, provider-attempt spans, per-trace-event billing   |

## Observability

AI Gateway automatically logs every request with metrics you can view in the Vercel dashboard:

- **Requests by model**: See which models your application uses most
- **Time to first token (TTFT)**: Monitor response latency
- **Token counts**: Track input and output token usage
- **Spend**: View costs broken down by model and time period

Access these metrics from the [Observability tab](/docs/ai-gateway/observability-and-spend/observability) at both team and project levels.

## Custom reporting

The Custom Reporting API lets you break down costs and token consumption by model, user, tag, provider, or credential type. Filter by date range, specific users, models, and tags to understand exactly where your AI spend is going.

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&group_by=model" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Attach `user` and `tags` to your requests to enable per-user and per-tag reporting. See the [Custom Reporting docs](/docs/ai-gateway/observability-and-spend/custom-reporting) for the full API reference.

## Budgets

Give your team, a single project, or an individual API key a budget to cap how much it can spend. AI Gateway checks the budget before each request and stops further requests once the limit is reached, with optional daily, weekly, or monthly refresh periods. See the [Budgets docs](/docs/ai-gateway/observability-and-spend/budgets) to set one up.

## Next steps

- [View your observability dashboard](/docs/ai-gateway/observability-and-spend/observability) to monitor usage
- [Query usage data](/docs/ai-gateway/observability-and-spend/custom-reporting) with the Custom Reporting API
- [Track credits and generations](/docs/ai-gateway/observability-and-spend/usage) with the Usage & Billing API
- [Set a budget](/docs/ai-gateway/observability-and-spend/budgets) to cap spending


---

[View full sitemap](/docs/sitemap)
