---
title: AI Gateway Observability
product: vercel
url: /docs/ai-gateway/observability-and-spend/observability
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/observability"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/observability/observability-plus
  - /docs/ai-gateway/observability-and-spend/logs
summary: Monitor AI Gateway requests in the Vercel dashboard. Inspect token usage, latency, spend, and logs at team, project, and API key scopes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/observability.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "403cbb52d4677d24ef7f974ab7c278069ac137a8061b919e5d51535d23e4d59d"
---

# AI Gateway Observability

The AI Gateway logs spend, model usage, and observability metrics related to your requests, which you can use to monitor and debug.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway)
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway)
- [AI Gateway logs now have a dedicated page](https://vercel.com/changelog/ai-gateway-logs)
- [AI Gateway now supports team and project spend budgets](https://vercel.com/changelog/ai-gateway-spend-budgets-and-alerts)
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Chatbox with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/chatbox) — Connect Chatbox to AI Gateway. Configure your API key, endpoint, and models to use multiple AI providers and monitor cha
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Aider with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/aider) — Connect Aider to AI Gateway with the Vercel CLI or an OpenAI-compatible base URL, API key, and model metadata.

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

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/ai-gateway/overview-observability/graphs-light.png)

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

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/ai-gateway/overview-observability/projects-summary-light.png)

### API keys

View usage grouped by API key. Use this view to track usage by a specific person or part of your organization. Click into an API key for more detailed information.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/ai-gateway/overview-observability/apikeys-summary-light.png)

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
