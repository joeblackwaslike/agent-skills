---
title: Observability and Spend
product: vercel
url: /docs/ai-gateway/observability-and-spend
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/custom-reporting
  - /docs/ai-gateway/observability-and-spend/usage
  - /docs/ai-gateway/observability-and-spend/api-key-budgets
summary: "Monitor AI Gateway requests and manage spend: observability, custom reporting, usage and billing APIs, and per-key spending budgets."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "2d9aff91821e87f487e502d4ca7613f6cdf8871850707fe4b65fa26e588c038d"
---

# Observability and Spend

AI Gateway logs every request and gives you the tools to understand and control what you spend. You can monitor latency and token usage in the dashboard, query spend by model, user, or tag, track credit balances, and cap how much each API key can spend with budgets.

## What you can do

- **Monitor every request**: Track latency, token counts, and spend in the dashboard with [Observability](/docs/ai-gateway/observability-and-spend/observability)
- **Query usage data**: Break down costs by model, user, tag, or provider with the [Custom Reporting API](/docs/ai-gateway/observability-and-spend/custom-reporting)
- **Check credits and lookups**: Track credit balances and look up generation details with the [Usage & Billing API](/docs/ai-gateway/observability-and-spend/usage)
- **Cap per-key spend**: Set a spending limit on any API key with [API Key Budgets](/docs/ai-gateway/observability-and-spend/api-key-budgets)

## Features overview

| Feature                                                                       | What it does                            | Key details                                                             |
| ----------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| [Observability](/docs/ai-gateway/observability-and-spend/observability)       | Monitor and debug AI requests           | Request traces, token counts, latency metrics, spend tracking           |
| [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting) | Query usage data with flexible grouping | Group by model, user, tag, provider, or credential type; filter by date |
| [Usage & Billing](/docs/ai-gateway/observability-and-spend/usage)             | Track credits and generations           | Credit balance API, generation lookup, cost tracking                    |
| [API Key Budgets](/docs/ai-gateway/observability-and-spend/api-key-budgets)   | Cap spending per API key                | Per-key limits, daily/weekly/monthly refresh, spend tracking            |

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

## API key budgets

Give any API key a budget to cap how much it can spend. AI Gateway checks the budget before each request and stops further requests once the limit is reached, with optional daily, weekly, or monthly refresh periods. See the [API Key Budgets docs](/docs/ai-gateway/observability-and-spend/api-key-budgets) to set one up.

## Next steps

- [View your observability dashboard](/docs/ai-gateway/observability-and-spend/observability) to monitor usage
- [Query usage data](/docs/ai-gateway/observability-and-spend/custom-reporting) with the Custom Reporting API
- [Track credits and generations](/docs/ai-gateway/observability-and-spend/usage) with the Usage & Billing API
- [Set an API key budget](/docs/ai-gateway/observability-and-spend/api-key-budgets) to cap spending


---

[View full sitemap](/docs/sitemap)
