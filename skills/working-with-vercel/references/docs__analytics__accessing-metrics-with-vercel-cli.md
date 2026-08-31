---
title: Accessing Metrics with Vercel CLI
product: vercel
url: /docs/analytics/accessing-metrics-with-vercel-cli
canonical_url: "https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli"
last_updated: 2026-06-25
type: how-to
prerequisites:
  - /docs/analytics
related:
  - /docs/observability/observability-plus
  - /docs/cli/metrics
summary: Use the Vercel CLI to query Web Analytics metrics from your terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "94431cc40ea11587737a363dcd573498a199b5b8270ff32f51c371c0fd69c871"
---

# Accessing Metrics with Vercel CLI

Use `vercel metrics` to query Web Analytics data from your terminal. You can reproduce common dashboard views, then go further with custom filters, multiple groupings, custom event properties, UTM dimensions, feature flags, and team-wide queries.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query Web Analytics from the Vercel CLI](https://vercel.com/changelog/query-web-analytics-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=related)
- [Query observability metrics using the Vercel CLI](https://vercel.com/changelog/vercel-metrics-in-cli?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=related)
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=related) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=related) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [Query](https://vercel.com/docs/query?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=related) — Query and visualize your Vercel usage, traffic, and more in observability.
- [Emit Custom Metrics from Vercel Functions](https://vercel.com/docs/observability/custom-metrics?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=related) — Learn how to emit application-specific metrics from Vercel Functions and analyze them in Observability.

Full cross-link map for this page: [/docs/analytics/accessing-metrics-with-vercel-cli.graph.md](/docs/analytics/accessing-metrics-with-vercel-cli.graph.md?from=related&source_path=%2Fdocs%2Fanalytics%2Faccessing-metrics-with-vercel-cli&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Web Analytics metrics are available through `vercel metrics` without [Observability Plus](/docs/observability/observability-plus).

## Inspect available metrics

The schema is the source of truth for the metrics, dimensions, and aggregations available to your account. Start by inspecting the available Web Analytics metrics:

```bash filename="terminal"
vercel metrics schema
vercel metrics schema vercel.analytics_pageview
vercel metrics schema vercel.analytics_event
```

## Recreate dashboard views

Use these examples to query the same kinds of traffic views available in the Web Analytics dashboard.

Query daily page views for the last seven days:

```bash filename="terminal"
vercel metrics vercel.analytics_pageview.count --since 7d --granularity 1d --project project-name --prod
```

See the top countries by page views:

```bash filename="terminal"
vercel metrics vercel.analytics_pageview.count --group-by country --since 7d --limit 10 --project project-name --prod
```

Query unique visitors from a specific country over the last day:

```bash filename="terminal"
vercel metrics vercel.analytics_pageview.count --aggregation unique/visitor_id --filter "country eq 'US'" --since 1d --granularity 1h --project project-name --prod
```

List the most common custom event names:

```bash filename="terminal"
vercel metrics vercel.analytics_event.count --group-by event_name --since 7d --limit 20 --project project-name --prod
```

> **💡 Note:** Bounce Rate is not available through `vercel metrics`; use the Web Analytics
> dashboard to view Bounce Rate.

## Query capabilities beyond the dashboard

The following query shapes are not available in the Web Analytics dashboard. Use them when you need more precise filtering, multi-dimensional comparisons, custom event analysis, or team-wide reporting.

### Filter multiple paths and exclude values

Use `startswith()` to include multiple path prefixes, `ne` to exclude a value, and repeated `--group-by` options to compare the remaining traffic by path and device type:

```bash filename="terminal"
vercel metrics vercel.analytics_pageview.count --filter "startswith(request_path, '/docs') or startswith(request_path, '/guides')" --filter "country ne 'US'" --group-by request_path --group-by device_type --since 7d --project project-name --prod
```

### Query custom event properties

Filter custom events by event name and by values inside `event_data`, then group by another custom event property:

```bash filename="terminal"
vercel metrics vercel.analytics_event.count --filter "event_name eq 'signup'" --filter "event_data/plan eq 'pro'" --group-by event_data/source --since 7d --project project-name --prod
```

### Group by UTM dimensions and flags

Group page views by UTM dimensions and a flag value to compare campaign traffic across an experiment or feature rollout:

```bash filename="terminal"
vercel metrics vercel.analytics_pageview.count --group-by utm_source --group-by utm_campaign --group-by flags/new_checkout --since 7d --project project-name --prod
```

### Query every project in your team

Use `--all` with `project_id` to compare production traffic across every project in the current team:

```bash filename="terminal"
vercel metrics vercel.analytics_pageview.count --all --group-by project_id --group-by country --since 7d --limit 20 --prod
```

For all options, see the [`vercel metrics` reference](/docs/cli/metrics).


---

[View full sitemap](/docs/sitemap)
