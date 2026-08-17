---
title: Query
product: vercel
url: /docs/query
canonical_url: "https://vercel.com/docs/query"
last_updated: 2026-06-26
type: how-to
prerequisites:
  []
related:
  - /docs/observability/observability-plus
  - /docs/plans/enterprise
  - /docs/query/reference
  - /docs/notebooks
summary: Query and visualize your Vercel usage, traffic, and more in observability.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1f290e4467cfa9dad4642a312e71ff307d9bd820c1d2f31ab6c98d9d7e1d32b4"
---

# Query

> **🔒 Permissions Required**: Query


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute?from=related) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Web Analytics API](https://vercel.com/docs/analytics/web-analytics-api?from=related) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Using with CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.

Full cross-link map for this page: [/docs/query.graph.md](/docs/query.graph.md)
<!-- /docsgraph:related -->

You can use Query to get deeper visibility into your application when debugging issues, monitoring usage, or optimizing for speed and reliability. Query lets you explore traffic, errors, latency and similar metrics in order to:

- Investigate errors, slow routes, and high-latency functions
- Analyze traffic patterns and request volumes by path, region, or device
- Monitor usage and performance of AI models or API endpoints
- Track build and deployment behavior across your projects
- Save queries to notebooks for reuse and team collaboration
- Customize dashboards and automate reporting or alerts

## Getting started

Full Query access requires [Observability Plus](/docs/observability/observability-plus). With free observability, you can open a query. To modify filters or create new queries, enable [Observability Plus](/docs/observability/observability-plus).

> **🔒 Permissions Required**: Enabling and disabling Observability Plus

See [Observability Plus](/docs/observability/observability-plus) for plan details and enablement.

> **💡 Note:** [Enterprise](/docs/plans/enterprise) teams can [contact sales](/contact/sales)
> to get a customized plan based on their requirements.

### Create a new query

- ### Access the Observability dashboard
  - **At the Team level**: Go to the [Vercel dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and click the **Observability** section in the sidebar
  - **At the Project level**: Go to the [Vercel dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select the project you would like to monitor from the team switcher, and click the **Observability** section in the sidebar

- ### Initiate a new query
  - **Start a new query**: In the Observability section, click the  button (New Query) to open the query creation interface.
  - **Select a data source**: Under "Visualize", select the [metric](/docs/query/reference#metric) you want to analyze such as edge requests, serverless function invocations, external API requests, or other events.

- ### Define query parameters
  - **Select the data aggregation**: Select how you would like the values of your selected metric to be compiled such as sum, percentage, or per second.
  - **Set Time Range**: Select the time frame for the data you want to query. This can be a predefined range like "Last 24 hours" or a custom range.
  - **Filter Data**: Apply filters to narrow down the data. You can filter by a list of [fields](/docs/query/reference#group-by-and-where-fields) such as project, path, WAF rule, edge region, etc.

- ### Visualize query
  - **View the results**: The graph below the filter updates automatically as you change the filters.
  - **Adjust as Needed**: Refine your query parameters if needed to get precise insights.

- ### Save and share query
  - **Save the query**: Once you are satisfied with your query, you can save it by clicking **Add to Notebook**.
  - **Select a notebook**: Select an existing [notebook](/docs/notebooks) from the dropdown.
  - **Share Query**: You can share the saved query from the notebook with team members by clicking on the **Share with team** button.

## Using Query

- When building queries, you can select the most appropriate view, and visualize results with:
  - a line or a volume chart
  - a table, if your query has a group by clause
  - a big number (with a time series), if your query has no group by clause
- You can [save your queries](#save-and-share-query) in [notebooks](/docs/notebooks) either for personal use or to share with your team.
- In the dashboard, you can [create a new query](#create-a-new-query) using the query [form fields](/docs/query/reference#group-by-and-where-fields) or the AI assistant at top of the new query form.
- You can export query results as CSV or JSON by clicking the download icon.

## Manage IP Address visibility for Query

> **🔒 Permissions Required**: Managing IP Address visibility

Vercel creates events each time a request is made to your website. These events include unique parameters such as execution time and bandwidth used.

Certain events such as `public_ip` may be considered personal information under certain data protection laws. To hide IP addresses from your query:

1. Go to the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and ensure your team is selected in the team switcher.
2. Open **Settings** in the sidebar and navigate to **Security & Privacy**.
3. Under **IP Address Visibility**, toggle the switch next to "Off" so the text reads **IP addresses are currently hidden in the Vercel Dashboard.**.

> **💡 Note:** For business purposes, such as DDoS mitigation, Vercel will still collect IP
> addresses.

## More resources

- Learn about available metrics and aggregations and how you can group and filter the data in [Query Reference](/docs/query/reference).


---

[View full sitemap](/docs/sitemap)
