---
title: Emit Custom Metrics from Vercel Functions
product: vercel
url: /docs/observability/custom-metrics
canonical_url: "https://vercel.com/docs/observability/custom-metrics"
last_updated: 2026-09-10
type: reference
prerequisites:
  - /docs/observability
related:
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/cli/metrics
summary: Learn how to emit application-specific metrics from Vercel Functions and analyze them in Observability.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/observability/custom-metrics.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f956805608d64ae98ef823b5553eb4511a602dd0b68cdb14f24af46229e397d8"
---

# Emit Custom Metrics from Vercel Functions

Custom metrics let you record application-specific numeric values from your Vercel Functions. Each call to [`metric()`](/docs/functions/functions-api-reference/vercel-functions-package#metric) records a data point that you can query and chart in Observability.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom metrics are now supported in Vercel Observability](https://vercel.com/changelog/custom-metrics-are-now-supported-in-vercel-observability)
- [Query observability metrics using the Vercel CLI](https://vercel.com/changelog/vercel-metrics-in-cli)
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [GET /v2/observability/schema/{metricId}](https://vercel.com/docs/rest-api/untagged/getobservabilityschemabymetricid) — GET /v2/observability/schema/{metricId} — GET /v2/observability/schema/{metricId}
- [Legacy Metrics](https://vercel.com/docs/pricing/legacy) — Learn about legacy usage metrics, including Bandwidth, Requests, Vercel Function Invocations, and Vercel Function Execut
- [Query](https://vercel.com/docs/query) — Query and visualize your Vercel usage, traffic, and more in observability.

Full cross-link map for this page: [/docs/observability/custom-metrics.graph.md](/docs/observability/custom-metrics.graph.md)
<!-- /docsgraph:related -->

For example, you could emit metrics to measure database queries latency, record the number of signups, or count the requests per second of a specific endpoint.

## Emit a custom metric

1. Install the `@vercel/functions` package:

**pnpm**

```bash
pnpm i @vercel/functions
```

**yarn**

```bash
yarn add @vercel/functions
```

**npm**

```bash
npm i @vercel/functions
```

**bun**

```bash
bun add @vercel/functions
```

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

Metric names, attribute names, and attribute values must be non-empty and shorter than 64 bytes. They can contain ASCII letters (`A-Z`, `a-z`), digits (`0-9`), hyphens (`-`), underscores (`_`), periods (`.`), and slashes (`/`). Unsupported characters are automatically replaced with an underscore (`_`). For example, `data+summary` is stored as `data_summary`. Metric names can't start with `vercel.`. Vercel reserves this prefix and doesn't record data points for metric names that use it.

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
vercel metrics schema
```

Query a custom metric and filter it by an attribute:

```bash filename="terminal"
vercel metrics database.duration_ms --query "plan:pro"
```

## Pricing

Each custom metric data point counts as one Observability event. Vercel charges $1.20 per 1 million Observability events.

For example, emitting one custom metric during each of 1 million function invocations records 1 million Observability events. To stop collecting custom metrics, remove the `metric()` calls from your application.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
