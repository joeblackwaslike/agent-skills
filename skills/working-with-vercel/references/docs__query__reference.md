---
title: Query Reference
product: vercel
url: /docs/query/reference
canonical_url: "https://vercel.com/docs/query/reference"
last_updated: 2026-08-03
type: reference
prerequisites:
  - /docs/query
related:
  - /docs/manage-cdn-usage
  - /docs/functions/usage-and-pricing
  - /docs/incremental-static-regeneration/limits-and-pricing
  - /docs/query/monitoring/monitoring-reference
  - /docs/caching/cdn-cache
summary: This reference covers the dimensions and operators used to create a query.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query/reference.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d9384da1a8869dda7c3fb11225f003647e48ac9cbdc6b987d754199b24b3710c"
---

# Query Reference

## Metric


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Web Analytics API](https://vercel.com/docs/analytics/web-analytics-api?from=related) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Custom Reporting](https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting?from=related) — Query AI Gateway usage data grouped by model, user, tag, provider, or credential type using the Custom Reporting API.
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related) — Query observability metrics and inspect available metrics, dimensions, and aggregations using the Vercel CLI.
- [Aggregates page views](https://vercel.com/docs/rest-api/web-analytics/aggregates-page-views?from=related)
- [Using with CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.

Full cross-link map for this page: [/docs/query/reference.graph.md](/docs/query/reference.graph.md)
<!-- /docsgraph:related -->

The metric selects what query data is displayed. You can choose one field at a time, and the same metric can be applied to different event types. For instance, **Function Wall Time** can be selected for edge, serverless, or middleware functions, aggregating each field in various ways.

| **Field Name**                    | **Description**                                                                                                           | **Aggregations**                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Edge Requests**                 | The number of [Edge Requests](/docs/manage-cdn-usage#edge-requests)                                                     | Count, Count per Second, Percentages                   |
| **Duration**                      | The time spent serving a request, as measured by Vercel's CDN                                                             | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Incoming Fast Data Transfer**   | The incoming amount of [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) used by the request.             | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Outgoing Fast Data Transfer**   | The outgoing amount of [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) used by the response.            | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Total Fast Data Transfer**      | The total amount of [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) used by the response.               | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Function Invocations**          | The number of [function invocations](/docs/functions/usage-and-pricing#invocations)                                       | Count, Count per Second, Percentages                   |
| **Function CPU Time**             | The amount of CPU time a Vercel Function has spent responding to requests, as measured in milliseconds.                   | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Incoming Fast Origin Transfer** | The amount of [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) used by the request.                  | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Outgoing Fast Origin Transfer** | The amount of [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) used by the response.                 | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Provisioned Memory**            | The amount of memory provisioned to a Vercel Function.                                                                    | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Peak Memory**                   | The maximum amount of memory used by Vercel Function at any point in time.                                                | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Requests Blocked**              | All requests blocked by either the system or user.                                                                        | Count, Count per Second, Percentages                   |
| **ISR Read Units**                | The amount of [Read Units](/docs/incremental-static-regeneration/limits-and-pricing) used to access ISR data                         | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **ISR Write Units**               | The amount of [Write Units](/docs/incremental-static-regeneration/limits-and-pricing) used to store new ISR data                     | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **ISR Read/Write**                | The amount of ISR operations                                                                                              | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Time to First Byte**            | The time between the request for a resource and when the first byte of a response begins to arrive.                       | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Function Wall Time**            | The duration that a Vercel Function has run                                                                               | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Firewall Actions**              | The incoming web traffic observed by firewall rules.                                                                      | Sum, Sum per Second, Unique, Percentages,              |
| **Optimizations**                 | The number of image transformations                                                                                       | Sum, Sum per Second, Unique, Percentages,              |
| **Source Size**                   | The source size of image optimizations                                                                                    | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Optimized Size**                | The optimized size of image optimizations                                                                                 | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Compression Ratio**             | The compression ratio of image optimizations                                                                              | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Size Change**                   | The size change of image optimizations                                                                                    | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Sandbox Active CPU Time**       | The total CPU time consumed by sandboxes, measured in milliseconds and displayed as time.                                 | Sum, Sum per Second, Min/Max, Percentiles              |
| **Sandbox CPU Usage**             | The percentage of CPU used by sandboxes.                                                                                  | Min/Max, Percentiles                                   |
| **Sandbox Provisioned Memory**    | The amount of memory provisioned to sandboxes.                                                                            | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Sandbox Peak Memory**           | The maximum amount of memory used by sandboxes.                                                                           | Sum, Sum per Second, Min/Max, Percentages, Percentiles |
| **Sandbox Data Transfer In**      | The amount of public network data transferred into sandboxes.                                                             | Sum, Sum per Second, Min/Max, Percentiles              |
| **Sandbox Data Transfer Out**     | The amount of public network data transferred out of sandboxes.                                                           | Sum, Sum per Second, Min/Max, Percentiles              |

### Aggregations

Metrics can be aggregated in the following ways:

| **Aggregation**                          | **Description**                                                                                                                                                                                                                                           |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Count**                                | The number of requests that occurred                                                                                                                                                                                                                      |
| **Count per Second**                     | The average rate of requests that occurred                                                                                                                                                                                                                |
| **Sum**                                  | The sum of the field value across all requests                                                                                                                                                                                                            |
| **Sum per Second**                       | The sum of the field value as a rate per second                                                                                                                                                                                                           |
| **Minimum**                              | The smallest observed field value                                                                                                                                                                                                                         |
| **Maximum**                              | The largest observed field value                                                                                                                                                                                                                          |
| **Percentiles (75th, 90th, 95th, 99th)** | Percentiles for the field values. For example, 90% of requests will have a duration that is less than the 90th percentile of duration.                                                                                                                    |
| **Percentages**                          | Each group is reported as a percentage of the ungrouped whole. For example, if a query for request groups by hosts, one host may have 10% of the total request count. Anything excluded by the `where` clause is not counted towards the ungrouped whole. |

Aggregations are calculated within each point on the chart (hourly, daily, etc) and also across the entire query window.

## Filter

The filter bar defines the conditions to filter your query data. It only fetches data that meets a specified condition based on several [fields](/docs/query/monitoring/monitoring-reference#group-by-and-where-fields) and operators:

| **Operator**                  | **Description**                                                                                              |     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | --- |
| `is`, `is not`                | The operator that allows you to specify a single value                                                       |
| `is any of `, `is not any of` | The operator that allows you to specify multiple values. For example, `host in ('vercel.com', 'nextjs.com')` |
| `startsWith`                  | Filter data values that begin with some specific characters                                                  |
| `endsWith`                    | Filter data values that end with specific characters                                                         |
| `>,>=,<,<=`                   | Numerical operators that allow numerical comparisons                                                         |

## Group by

The `Group By` clause calculates statistics for each combination of [field](#group-by-and-where-fields) values. Each group is displayed as a separate color in the chart view, and has a separate row in the table view.

For example, grouping by `Request HostName` and `HTTP Status` will display data broken down by each combination of `Request Hostname` and `HTTP Status`.

## Group by and where fields

There are several fields available for use within the [Filter](#filter) and [group by](#group-by):

| **Field Name**      | **Description**                                                                                                                                                                                                                                                                  |     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `Request Hostname`  | Group by the request's domains and subdomains                                                                                                                                                                                                                                    |
| `project`           | Group by the request's project                                                                                                                                                                                                                                                   |
| `Deployment ID`     | Group by the request's deployment ID                                                                                                                                                                                                                                             |
| `HTTP Status`       | Group by the request's HTTP response code                                                                                                                                                                                                                                        |
| `route`             | The mapped path used by the request. For example, if you have a dynamic route like `/blog/[slug]` and a blog post is `/blog/my-blog-post`, the `route` is `/blog/[slug]`                                                                                                         |
| `Request Path`      | The path used by the request. For example, if you have a dynamic route like `/blog/[slug]` and a blog post is `/blog/my-blog-post`, the `request_path` is `/blog/my-blog-post`                                                                                                   |
| `Cache Result`      | The [cache](/docs/caching/cdn-cache#x-vercel-cache) status for the request                                                                                                                                                                                                               |
| `environment`       | Group by the environment (`production` or [`preview`](/docs/deployments/environments#preview-environment-pre-production))                                                                                                                                                        |
| `Request Method`    | Group by the HTTP request method (`GET`, `POST`, `PUT`, etc.)                                                                                                                                                                                                                    |
| `Referrer URL`      | Group by the HTTP referrer URL                                                                                                                                                                                                                                                   |
| `Referrer Hostname` | Group by the HTTP referrer domain                                                                                                                                                                                                                                                |
| `Client IP`         | Group by the request's IP address                                                                                                                                                                                                                                                |
| `Client IP Country` | Group by the request's IP country                                                                                                                                                                                                                                                |
| `Client User Agent` | Group by the request's user agent                                                                                                                                                                                                                                                |
| `AS Number`         | The [autonomous system number (ASN)](# "ASN") for the request. This is related to what network the request came from (either a home network or a cloud provider) |
| `CDN Region`        | Group by the [region](/docs/regions) the request was routed to                                                                                                                                                                                                                   |
| `ISR Cache Region`  | Group by the ISR cache region                                                                                                                                                                                                                                                    |
| `Cache Result`      | Group by cache result                                                                                                                                                                                                                                                            |
| `WAF Action`        | Group by the WAF action taken by the [Vercel Firewall](/docs/vercel-firewall/vercel-waf) (`deny`, `challenge`, `rate_limit`, `bypass` or `log`)                                                                                                                                         |
| `WAF Rule ID`       | Group by the firewall rule ID                                                                                                                                                                                                                                                    |
| `Skew Protection`   | When `active`, the request would have been subject to [version skew](/docs/skew-protection) but was protected, otherwise `inactive`.                                                                                                                                             |
| `Sandbox Name`      | Group by the sandbox name                                                                                                                                                                                                                                                        |
| `Sandbox Session ID` | Group by the sandbox session ID                                                                                                                                                                                                                                                  |


---

[View full sitemap](/docs/sitemap)
