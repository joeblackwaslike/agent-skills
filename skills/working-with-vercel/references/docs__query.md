---
title: Query
product: vercel
url: /docs/query
canonical_url: "https://vercel.com/docs/query"
last_updated: 2026-09-16
type: how-to
prerequisites:
  []
related:
  - /docs/cli/metrics
  - /docs/observability/observability-plus
  - /docs/plans/enterprise
  - /docs/query/reference
  - /docs/notebooks
summary: Query and visualize your Vercel usage, traffic, and more in observability.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "0f8b8b2102392a88f5ccf7be9674bb534b9afe68092b138df870e39b81a2f37a"
---

# Query

> Query is available on Enterprise and Pro plans

You can use Query to get deeper visibility into your application when debugging issues, monitoring usage, or optimizing for speed and reliability. Query lets you explore traffic, errors, latency and similar metrics to:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Export Observability query results to CSV or JSON](https://vercel.com/changelog/export-observability-query-results-to-csv-or-json)
- [More granular observability for Vercel Sandbox](https://vercel.com/changelog/more-granular-observability-for-vercel-sandbox)
- [Observability Plus replacing legacy Monitoring](https://vercel.com/changelog/observability-plus-replacing-legacy-monitoring)
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Query observability metrics using the Vercel CLI](https://vercel.com/changelog/vercel-metrics-in-cli)
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/query.graph.md](/docs/query.graph.md)
<!-- /docsgraph:related -->

- Investigate errors, slow routes, and high-latency functions
- Analyze traffic patterns and request volumes by path, region, or device
- Monitor usage and performance of AI models or API endpoints
- Track build and deployment behavior across your projects
- Save queries to notebooks for reuse and team collaboration
- Customize dashboards and automate reporting or alerts

To query these metrics from your terminal, use [`vercel metrics` (`vc metrics`)](/docs/cli/metrics). The CLI supports filtering, grouping, aggregations, and JSON output.

## Getting started

Full Query access requires [Observability Plus](/docs/observability/observability-plus). With free observability, you can open a query. To modify filters or create new queries, enable [Observability Plus](/docs/observability/observability-plus).

> Enabling and disabling Observability Plus are available on Enterprise and Pro plans
>
> Those with the owner role can access this feature

See [Observability Plus](/docs/observability/observability-plus) for plan details and enablement.

> **💡 Note:** [Enterprise](/docs/plans/enterprise) teams can [contact sales](/contact/sales)
> to get a customized plan based on their requirements.

### Create a new query

- ### Access the Observability dashboard
  - **At the Team level**: Go to the [Vercel dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and click the **Observability** section in the sidebar
  - **At the Project level**: Go to the [Vercel dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select the project you would like to monitor from the team switcher, and click the **Observability** section in the sidebar

- ### Initiate a new query
  - **Start a new query**: In the Observability section, click the  button (New Query) to open the query creation interface.
  - **Select a data source**: Under "Visualize", select the [metric](/docs/query/reference#metric) you want to analyze such as CDN requests, serverless function invocations, external API requests, or other events.

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

> Managing IP Address visibility is available on Enterprise and Pro plans
>
> Those with the owner, admin role can access this feature

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
