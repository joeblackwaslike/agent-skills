---
title: Observability
product: vercel
url: /docs/ai-gateway/observability-and-spend/observability
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/observability"
last_updated: 2026-07-30
type: reference
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/observability/observability-plus
  - /docs/ai-gateway/observability-and-spend/logs
summary: Learn how to monitor and debug your AI Gateway requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/observability.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ef0578e00251780fbdeb074196f2da7bdcd1c229e0de7aee98fcd2d79fbf9467"
---

# Observability

The AI Gateway logs spend, model usage, and observability metrics related to your requests, which you can use to monitor and debug.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Usage & Billing](https://vercel.com/docs/ai-gateway/observability-and-spend/usage?from=related) — Monitor your AI Gateway credit balance, usage, and generation details.
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Manage & Optimize](https://vercel.com/docs/manage-and-optimize-observability?from=related) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend/observability.graph.md](/docs/ai-gateway/observability-and-spend/observability.graph.md)
<!-- /docsgraph:related -->

You can view these details in the [**AI Gateway Overview**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway) section in your Vercel dashboard sidebar:

- **Usage**: Graphs and metrics to track your AI Gateway usage and cost
- **Requests**: Summaries by project, API key, and a detailed log of all requests

You can view these metrics in two ways:

- **Team level**: Stay in your team scope to see aggregated metrics across all projects
- **Project level**: Use the new dashboard view and select a specific project from the top project dropdown to see project-specific metrics

## Usage

The **Usage** section displays four metrics to help you monitor your AI Gateway activity. For extended timeframes and further retention, you need [Observability Plus](/docs/observability/observability-plus).

![Image](https://vercel.com/docs-assets/static/docs/ai-gateway/overview-observability/graphs-light.png)

### Requests by model

The **Requests by Model** chart shows the number of requests made to each model over time. This can help you identify which models are being used most frequently and whether there are any spikes in usage.

### Time to first token (TTFT)

The **Time to First Token** chart shows the average time it takes for the AI Gateway to return the first token of a response. This can help you understand the latency of your requests and identify any performance issues.

### Input/output token counts

The **Input/Output Token Counts** chart shows the number of input and output tokens for each request. This can help you understand the size of the requests being made and the responses being returned.

### Spend

The **Spend** chart shows the total amount spent on AI Gateway requests over time. This can help you monitor your spending and identify any unexpected costs.

## Requests

The **Requests** section displays summaries by project, API key, and a detailed log of all requests. Each summary includes request count, average tokens, P75 duration, P75 TTFT, and cost for the specified time frame.

### Projects

View usage grouped by project. Use this view to associate usage and spend with specific projects. Click into a project for more detailed information.

![Image](https://vercel.com/docs-assets/static/docs/ai-gateway/overview-observability/projects-summary-light.png)

### API keys

View usage grouped by API key. Use this view to track usage by a specific person or part of your organization. Click into an API key for more detailed information.

![Image](https://vercel.com/docs-assets/static/docs/ai-gateway/overview-observability/apikeys-summary-light.png)

### Logs

The overview summarizes traffic. To work with individual requests, open the [Logs](/docs/ai-gateway/observability-and-spend/logs) page, where you can search by request ID, filter by model, provider, or status code, follow requests live, and open one request to see how it was routed. You can also export the filtered list as CSV or JSON.

## Team scope

By default, when you access the **AI Gateway Overview** tab, you view metrics for all requests made across all projects in your team. This is useful for monitoring the overall usage and performance of the AI Gateway.

## Project scope

To view metrics for a specific project, you can access the project scope in two ways:

1. Select the project from the top project dropdown in the dashboard
2. Click into the project from the **Projects** view in the **Requests** section

Once in project scope, you'll see the same metrics filtered to show only the activity for that specific project.


---

[View full sitemap](/docs/sitemap)
