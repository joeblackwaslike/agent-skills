---
title: Custom Metrics
product: vercel
url: /docs/observability/custom-metrics
canonical_url: "https://vercel.com/docs/observability/custom-metrics"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/observability
related:
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/cli/metrics
summary: Learn about custom metrics on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/observability/custom-metrics.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "5a9d99d218e5135805d9d5808932ece2b26940f3e52ee9136d55f22d43c84100"
---

# Emit Custom Metrics from Vercel Functions

Custom metrics let you record application-specific numeric values from your Vercel Functions. Each call to [`metric()`](/docs/functions/functions-api-reference/vercel-functions-package#metric) records a data point that you can query and chart in Observability.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Legacy Metrics](https://vercel.com/docs/pricing/legacy?from=related) — Learn about legacy usage metrics, including Bandwidth, Requests, Vercel Function Invocations, and Vercel Function Execut
- [Using with CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Query](https://vercel.com/docs/query?from=related) — Query and visualize your Vercel usage, traffic, and more in observability.

Full cross-link map for this page: [/docs/observability/custom-metrics.graph.md](/docs/observability/custom-metrics.graph.md)
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
