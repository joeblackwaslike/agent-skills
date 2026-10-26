---
title: AI Gateway Observability and Spend
product: vercel
url: /docs/ai-gateway/observability-and-spend
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend"
last_updated: 2026-09-23
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/logs
  - /docs/ai-gateway/observability-and-spend/custom-reporting
  - /docs/ai-gateway/observability-and-spend/usage
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Monitor AI Gateway requests and control costs with logs, generation lookup, custom reporting, budgets, and OpenTelemetry trace drains.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ecc5a23b87c5c8c0ffc8cceae5479c75d4324f4e4ca51bcc37f0a9c313e3d8d5"
---

# AI Gateway Observability and Spend

AI Gateway logs every request and gives you the tools to understand and control what you spend. You can monitor latency and token usage in the dashboard, query spend by model, user, or tag, track credit balances, and cap how much your team, a project, or an API key can spend with budgets.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ember-1 from Fireworks now available on AI Gateway](https://vercel.com/changelog/ember-1-from-fireworks-now-available-on-ai-gateway)
- [Pixel Canary is now available in stealth for free on AI Gateway](https://vercel.com/changelog/pixel-canary-is-now-available-in-stealth-for-free-on-ai-gateway)
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing) — Understand AI Gateway token pricing, free and paid credits, BYOK costs, add-on charges, and payment fees. Manage credit
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [AI Gateway Ecosystem and Integrations](https://vercel.com/docs/ai-gateway/ecosystem) — Connect frameworks, coding tools, and billing integrations to AI Gateway. Configure app attribution and explore integrat
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [vercel ai-gateway](https://vercel.com/docs/cli/ai-gateway) — Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, virtual models, models, leaderboards,

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend.graph.md](/docs/ai-gateway/observability-and-spend.graph.md)
<!-- /docsgraph:related -->

## What you can do

- **Monitor every request**: Track latency, token counts, and spend in the dashboard with [Observability](/docs/ai-gateway/observability-and-spend/observability)
- **Inspect individual requests**: Search, filter, and export [request logs](/docs/ai-gateway/observability-and-spend/logs) to debug routing and errors
- **Query usage data**: Break down costs by model, user, tag, or provider with the [Custom Reporting API](/docs/ai-gateway/observability-and-spend/custom-reporting)
- **Look up one generation**: Retrieve its provider, latency, token usage, cost, and finish reason with the [Generation Lookup API](/docs/ai-gateway/observability-and-spend/usage)
- **Cap spend**: Set a spending limit for your team, a project, or an API key with [Budgets](/docs/ai-gateway/observability-and-spend/budgets)
- **Export traces**: Forward an OpenTelemetry trace of every request to your own observability tool with [Trace Drains](/docs/ai-gateway/observability-and-spend/trace-drains)

## Features overview

| Feature                                                                       | What it does                            | Key details                                                             |
| ----------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| [Observability](/docs/ai-gateway/observability-and-spend/observability)       | Monitor and debug AI requests           | Request traces, token counts, latency metrics, spend tracking           |
| [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting) | Query usage data with flexible grouping | Group by model, user, tag, provider, or credential type; filter by date |
| [Generation Lookup](/docs/ai-gateway/observability-and-spend/usage)          | Inspect one generation by ID            | Provider, latency, tokens, cost, finish reason, and credit balance API  |
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
- [Look up a generation](/docs/ai-gateway/observability-and-spend/usage) by ID, or check your credit balance
- [Set a budget](/docs/ai-gateway/observability-and-spend/budgets) to cap spending


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
