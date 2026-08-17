---
title: Accessing Metrics with Vercel CLI
product: vercel
url: /docs/speed-insights/accessing-metrics-with-vercel-cli
canonical_url: "https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli"
last_updated: 2026-06-25
type: how-to
prerequisites:
  - /docs/speed-insights
related:
  - /docs/observability/observability-plus
  - /docs/cli/metrics
  - /docs/speed-insights/metrics
summary: Use the Vercel CLI to query Speed Insights metrics from your terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9a3e1dc3f8fbdcde8af820ab232c1bbccf77bac4a080f8414947eb0218b90735"
---

# Accessing Metrics with Vercel CLI

Use `vercel metrics` to query Speed Insights data from your terminal. You can reproduce common dashboard views, count collected data points, and order grouped results to find the best and worst performing pages.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Improve Cumulative Layout Shift \(CLS\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel?from=related) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights?from=related) — Learn how to use Speed Insights to analyze your application's performance data.
- [Getting Started](https://vercel.com/docs/speed-insights/quickstart?from=related) — Vercel Speed Insights provides you detailed insights into your website's performance. This quickstart guide will help yo
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Web Analytics API](https://vercel.com/docs/analytics/web-analytics-api?from=related) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.

Full cross-link map for this page: [/docs/speed-insights/accessing-metrics-with-vercel-cli.graph.md](/docs/speed-insights/accessing-metrics-with-vercel-cli.graph.md)
<!-- /docsgraph:related -->

Speed Insights metrics are available through `vercel metrics` without [Observability Plus](/docs/observability/observability-plus).

## Inspect available metrics

The schema is the source of truth for the metrics, dimensions, and aggregations available to your account. Start by inspecting the available Speed Insights metrics:

```bash filename="terminal"
vercel metrics schema
vercel metrics schema vercel.speed_insights
```

## Query Core Web Vitals values

Speed Insights exposes value metrics for Core Web Vitals and related Web Vitals. Use `vercel.speed_insights.lcp_ms`, `vercel.speed_insights.inp_ms`, and `vercel.speed_insights.cls` for Core Web Vitals.
Use `vercel.speed_insights.fcp_ms` and `vercel.speed_insights.ttfb_ms` for the additional Speed Insights metrics.

Query P75 Largest Contentful Paint by route:

```bash filename="terminal"
vercel metrics vercel.speed_insights.lcp_ms --aggregation p75 --group-by route --since 7d --project project-name --prod
```

When you group a Speed Insights value metric, `vercel metrics` orders results by collected data points for that metric. For the LCP query above, routes are ordered by `count desc` unless you pass `--order-by value`.

Query P75 Interaction to Next Paint by device type:

```bash filename="terminal"
vercel metrics vercel.speed_insights.inp_ms --aggregation p75 --group-by device_type --since 7d --order-by count --project project-name --prod
```

Query P75 Cumulative Layout Shift by country:

```bash filename="terminal"
vercel metrics vercel.speed_insights.cls --aggregation p75 --group-by country --since 7d --limit 10 --project project-name --prod
```

Query daily P75 Largest Contentful Paint for one route:

```bash filename="terminal"
vercel metrics vercel.speed_insights.lcp_ms --aggregation p75 --filter "route eq '/dashboard'" --since 7d --granularity 1d --project project-name --prod
```

## Query collected data points

Each Speed Insights value metric has a matching count metric for collected data points.
Use data point counts to evaluate how representative a metric value is. Fewer data points can make comparisons less reliable.

| Value metric | Data point count metric |
| - | - |
| `vercel.speed_insights.lcp_ms` | `vercel.speed_insights.lcp_count` |
| `vercel.speed_insights.fcp_ms` | `vercel.speed_insights.fcp_count` |
| `vercel.speed_insights.inp_ms` | `vercel.speed_insights.inp_count` |
| `vercel.speed_insights.ttfb_ms` | `vercel.speed_insights.ttfb_count` |
| `vercel.speed_insights.cls` | `vercel.speed_insights.cls_count` |

By default, grouped queries return the results with the most data points first. To make this explicit, use `--order-by count`.

Query collected LCP data points by route:

```bash filename="terminal"
vercel metrics vercel.speed_insights.lcp_count --aggregation sum --group-by route --since 7d --project project-name --prod
```

Query collected CLS data points by country:

```bash filename="terminal"
vercel metrics vercel.speed_insights.cls_count --aggregation sum --group-by country --since 7d --limit 10 --project project-name --prod
```

## Find best and worst performing pages

Use `--group-by route` to compare pages, then use `--order-by value` to order the grouped results by the selected value metric instead of data point count. Lower values are better for LCP, FCP, INP, TTFB, and CLS.

Find the slowest production routes by P75 LCP:

```bash filename="terminal"
vercel metrics vercel.speed_insights.lcp_ms --aggregation p75 --group-by route --since 7d --order-by value --order desc --limit 10 --project project-name --prod
```

Find the fastest production routes by P75 LCP:

```bash filename="terminal"
vercel metrics vercel.speed_insights.lcp_ms --aggregation p75 --group-by route --since 7d --order-by value --order asc --limit 10 --project project-name --prod
```

Find the routes with the lowest P75 CLS:

```bash filename="terminal"
vercel metrics vercel.speed_insights.cls --aggregation p75 --group-by route --since 7d --order-by value --order asc --limit 10 --project project-name --prod
```

> **💡 Note:** Real Experience Score is not available through `vercel metrics`; use the Speed
> Insights dashboard to view Real Experience Score.

## Query capabilities beyond the dashboard

The following query shapes are not available in the Speed Insights dashboard. Use them when you need more precise filtering, multi-dimensional comparisons, or team-wide reporting.

### Filter multiple paths and exclude values

Use `startswith()` to include multiple path prefixes, `ne` to exclude a value, and repeated `--group-by` options to compare Core Web Vitals for selected path prefixes:

```bash filename="terminal"
vercel metrics vercel.speed_insights.lcp_ms --aggregation p75 --filter "startswith(request_path, '/docs') or startswith(request_path, '/guides')" --filter "country ne 'US'" --group-by route --group-by device_type --since 7d --project project-name --prod
```

### Query every project in your team

Use `--all` with `project_id` to compare Speed Insights metrics across every project in the current team:

```bash filename="terminal"
vercel metrics vercel.speed_insights.lcp_ms --all --aggregation p75 --group-by project_id --group-by country --since 7d --limit 20 --prod
```

For all options, see the [`vercel metrics` reference](/docs/cli/metrics). For what each dashboard metric measures, see [Speed Insights Metrics](/docs/speed-insights/metrics).


---

[View full sitemap](/docs/sitemap)
