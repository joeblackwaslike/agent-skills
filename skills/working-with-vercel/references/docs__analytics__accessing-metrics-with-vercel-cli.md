---
title: Accessing Metrics with Vercel CLI
product: vercel
url: /docs/analytics/accessing-metrics-with-vercel-cli
canonical_url: "https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli"
last_updated: 2026-09-10
type: how-to
prerequisites:
  - /docs/analytics
related:
  - /docs/observability/observability-plus
  - /docs/cli/metrics
summary: Use the Vercel CLI to query Web Analytics metrics from your terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "6bcaede059b47059f27d97348dccdd3b050d0563452b9f2020e6e385e5375269"
---

# Accessing Metrics with Vercel CLI

Use `vercel metrics` to query Web Analytics data from your terminal. You can reproduce common dashboard views, then go further with custom filters, multiple groupings, custom event analysis, UTM dimensions, and team-wide queries.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query Web Analytics from the Vercel CLI](https://vercel.com/changelog/query-web-analytics-from-the-vercel-cli)
- [Query observability metrics using the Vercel CLI](https://vercel.com/changelog/vercel-metrics-in-cli)
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Query](https://vercel.com/docs/query) — Query and visualize your Vercel usage, traffic, and more in observability.
- [Web Analytics](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics) — Vercel MCP tools for web analytics.

Full cross-link map for this page: [/docs/analytics/accessing-metrics-with-vercel-cli.graph.md](/docs/analytics/accessing-metrics-with-vercel-cli.graph.md)
<!-- /docsgraph:related -->

Web Analytics metrics are available through `vercel metrics` without [Observability Plus](/docs/observability/observability-plus).

## Inspect available metrics

The schema is the source of truth for the metrics, dimensions, and aggregations available to your account. Start by inspecting the available Web Analytics metrics:

```bash filename="terminal"
vercel metrics schema
vercel metrics schema vercel.analytics
```

## Recreate dashboard views

Use these examples to query the same kinds of traffic views available in the Web Analytics dashboard.

Query daily page views for the last seven days:

```bash filename="terminal"
vercel metrics vercel.analytics.page_view.count --since 7d --granularity 1d --project project-name --prod
```

See the top countries by page views:

```bash filename="terminal"
vercel metrics vercel.analytics.page_view.count --group-by country --since 7d --limit 10 --project project-name --prod
```

Query unique visitors from a specific country over the last day:

```bash filename="terminal"
vercel metrics vercel.analytics.page_view.count --aggregation unique/visitorId --filter 'country:US' --since 1d --granularity 1h --project project-name --prod
```

List the most common custom event names:

```bash filename="terminal"
vercel metrics vercel.analytics.event.count --group-by eventName --since 7d --limit 20 --project project-name --prod
```

> **💡 Note:** Bounce Rate is not available through `vercel metrics`; use the Web Analytics
> dashboard to view Bounce Rate.

## Query capabilities beyond the dashboard

The following query shapes are not available in the Web Analytics dashboard. Use them when you need more precise filtering, multi-dimensional comparisons, custom event analysis, or team-wide reporting.

### Filter multiple paths and exclude values

Use a field-scoped `OR` expression to include multiple path prefixes, `!=` to exclude a value, and repeated `--group-by` options to compare the remaining traffic by path and device type:

```bash filename="terminal"
vercel metrics vercel.analytics.page_view.count --filter 'requestPath:(/docs* OR /guides*)' --filter 'country != US' --group-by requestPath --group-by deviceType --since 7d --project project-name --prod
```

### Compare custom events across dimensions

Filter by a custom event name, then group results by country and device type:

```bash filename="terminal"
vercel metrics vercel.analytics.event.count --filter 'eventName:signup' --group-by country --group-by deviceType --since 7d --project project-name --prod
```

### Group by UTM dimensions

Group page views by UTM source and campaign to compare campaign traffic:

```bash filename="terminal"
vercel metrics vercel.analytics.page_view.count --group-by utmSource --group-by utmCampaign --since 7d --project project-name --prod
```

### Query every project in your team

Use `--all` with `projectId` to compare production traffic across every project in the current team:

```bash filename="terminal"
vercel metrics vercel.analytics.page_view.count --all --group-by projectId --group-by country --since 7d --limit 20 --prod
```

For all options, see the [`vercel metrics` reference](/docs/cli/metrics).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
