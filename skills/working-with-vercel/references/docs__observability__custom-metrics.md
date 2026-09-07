---
title: Emit Custom Metrics from Vercel Functions
product: vercel
url: /docs/observability/custom-metrics
canonical_url: "https://vercel.com/docs/observability/custom-metrics"
last_updated: 2026-08-20
type: reference
prerequisites:
  - /docs/observability
related:
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/cli/metrics
summary: Learn how to emit application-specific metrics from Vercel Functions and analyze them in Observability.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/observability/custom-metrics.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "90e8070160a9b331dc8f247ffa9ad728a06f383a29919274f84b8a8bc09482de"
---

# Emit Custom Metrics from Vercel Functions

Custom metrics let you record application-specific numeric values from your Vercel Functions. Each call to [`metric()`](/docs/functions/functions-api-reference/vercel-functions-package#metric) records a data point that you can query and chart in Observability.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom metrics are now supported in Vercel Observability](https://vercel.com/changelog/custom-metrics-are-now-supported-in-vercel-observability?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related)
- [Query observability metrics using the Vercel CLI](https://vercel.com/changelog/vercel-metrics-in-cli?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related)
- [Metrics for outgoing requests](https://vercel.com/changelog/metrics-for-outgoing-requests?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related)
- [Query Web Analytics from the Vercel CLI](https://vercel.com/changelog/query-web-analytics-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related)
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Legacy Metrics](https://vercel.com/docs/pricing/legacy?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related) — Learn about legacy usage metrics, including Bandwidth, Requests, Vercel Function Invocations, and Vercel Function Execut
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Vercel Functions](https://vercel.com/docs/functions?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=related) — Build API routes, webhooks, and agent request handlers with Vercel Functions, then test and debug them with Vercel CLI.

Full cross-link map for this page: [/docs/observability/custom-metrics.graph.md](/docs/observability/custom-metrics.graph.md?from=related&source_path=%2Fdocs%2Fobservability%2Fcustom-metrics&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For example, you could emit metrics to measure database queries latency, record the number of signups, or count the requests per second of a specific endpoint.

## Emit a custom metric

1. Install the `@vercel/functions` package:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @vercel/functions
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @vercel/functions
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @vercel/functions
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @vercel/functions
    ```
  </Code>
</CodeBlock>

2. Import `metric` and call it from a Vercel Function with a metric name, numeric value, and optional attributes:

```ts filename="api/query.ts"
import { metric } from '@vercel/functions';

metric('query.duration_ms', 100, { plan: 'pro' });
```

The example records a value of `100` for `query.duration_ms` and adds `plan` as an attribute. You can use attributes to filter and group the metric in Observability.

## `metric()` parameters

The `metric()` function accepts the following parameters:

| Name         | Type                     | Required | Description                                                        |
| :----------- | :----------------------- | :------- | :----------------------------------------------------------------- |
| `name`       | `string`                 | Yes      | The custom metric name, such as `query.duration_ms`.                |
| `value`      | `number`                 | Yes      | The numeric value to record (64-bit floating-point).                |
| `attributes` | `Record<string, string>` | No       | String attributes that you can use to filter and group the metric. |

## Metric and attribute requirements

Metric names, attribute names, and attribute values must be non-empty and shorter than 64 bytes. They can contain ASCII letters (`A-Z`, `a-z`), digits (`0-9`), hyphens (`-`), underscores (`_`), periods (`.`), and slashes (`/`). Unsupported characters are automatically replaced with an underscore (`_`). For example, `data+summary` is stored as `data_summary`.

For example, this data point is valid:

```ts
metric('query.duration_ms', 100, { data_summary: 'pro/v1' });
```

## Custom metric emission limits

- Each custom metric emission can include up to 50 user-supplied attributes.
- Each Vercel Function invocation can emit up to 100 custom metrics.

## Automatically collected metadata

Vercel automatically attributes each custom metric data point with the following metadata. You don't need to include these fields in the `attributes` object:

| Field               | Description                                                    |
| :------------------ | :------------------------------------------------------------- |
| `deploymentId`      | Vercel deployment that emitted the metric.                     |
| `requestId`         | Request that emitted the metric.                               |
| `functionRegion`    | Region where the function emitted the metric.                  |
| `pathType`          | Execution path type that emitted the metric.                   |
| `edgeNetworkRegion` | Vercel CDN region that handled the request.                    |

## Access custom metrics data

After you deploy and invoke the Vercel Function, you can access custom metrics data from the dashboard, the Query tab, or the Vercel CLI:

- [**Custom Metrics dashboard**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fcustom-metrics\&title=Go+to+Custom+Metrics): From your project or team dashboard, select the **Observability** tab, then select **Custom Metrics**. Use this view to browse recently active metrics and configure how their values appear in charts.
- [**Query tab**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fquery\&title=Go+to+Query+tab): From Observability, select the **Query** tab, then select a metric from the **Custom Metrics** group. Use this view to aggregate metric values and filter or group results by the attributes passed to `metric()`.
- **Vercel CLI**: Use the [`vercel metrics`](/docs/cli/metrics) command to list and query custom metrics from your terminal.

List all available metrics:

```bash filename="terminal"
vercel metrics list
```

Query a custom metric and filter it by an attribute:

```bash filename="terminal"
vercel metrics database.duration_ms --filter "plan:pro"
```

## Pricing

Each custom metric data point counts as one Observability event. Vercel charges $1.20 per 1 million Observability events.

For example, emitting one custom metric during each of 1 million function invocations records 1 million Observability events. To stop collecting custom metrics, remove the `metric()` calls from your application.


---

[View full sitemap](/docs/sitemap)
