---
title: Query Reference
product: vercel
url: /docs/query/reference
canonical_url: "https://vercel.com/docs/query/reference"
last_updated: 2026-09-14
type: reference
prerequisites:
  - /docs/query
related:
  - /docs/caching/cdn-cache
  - /docs/deployments/environments
  - /docs/regions
  - /docs/vercel-firewall/vercel-waf
  - /docs/skew-protection
summary: Use this reference to find the event types, metrics, aggregations, dimensions, and operators available in Query.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query/reference.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "09d09ee7796498ada10540357a92fbccbff668567ad3876cc4b89096422e8be0"
---

# Query Reference

## Metric

In Query, you first select an event type, then a metric from that event type. For example, select **Function Invocations** and **Active CPU Time** to query the CPU time used by Vercel Functions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Troubleshoot and optimize Function Invocations on Vercel](https://vercel.com/kb/guide/optimize-function-invocations?from=related&source_path=%2Fdocs%2Fquery%2Freference&source_site=vercel-docs&relationship=related) — Diagnose which routes drive Function Invocations and learn to optimize them. Separate necessary dynamic traffic from div
- [Monitoring Reference](https://vercel.com/docs/query/monitoring/monitoring-reference?from=related&source_path=%2Fdocs%2Fquery%2Freference&source_site=vercel-docs&relationship=related) — This reference covers the clauses, fields, and variables used to create a Monitoring query.
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api?from=related&source_path=%2Fdocs%2Fquery%2Freference&source_site=vercel-docs&relationship=related) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fquery%2Freference&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Aggregates custom events](https://vercel.com/docs/rest-api/web-analytics/aggregates-custom-events?from=related&source_path=%2Fdocs%2Fquery%2Freference&source_site=vercel-docs&relationship=related) — GET /v1/query/web-analytics/events/aggregate — Counts custom events on a project, within the requested date range. Resul
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fquery%2Freference&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.

Full cross-link map for this page: [/docs/query/reference.graph.md](/docs/query/reference.graph.md?from=related&source_path=%2Fdocs%2Fquery%2Freference&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The metric picker displays only the event types and metrics available to your team. The following tables use the labels shown in the picker for current event types. Deprecated event types may also appear for historical data.

### CDN metrics

| **Event type**            | **Metrics**                                                                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requests**              | Count, External Rewrite Connect Time, External Rewrite DNS Time, Fast Data Transfer (Incoming), Fast Data Transfer (Outgoing), Fast Data Transfer (Total), Routing CPU Duration |
| **Image Transformations** | Count, Compression Ratio, Duration, Optimized Size, Size Change, Source Size                                                                                                     |
| **ISR Operations**        | Read Bandwidth, Write Bandwidth, Read Units, Write Units                                                                                                                         |

### Compute metrics

| **Event type**               | **Metrics**                                                                                                                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Function Invocations**     | Count, Duration (ms), Active CPU Time, Duration (Gb-hrs), Time to First Byte, Incoming Fast Origin Transfer, Outgoing Fast Origin Transfer, Total Fast Origin Transfer, Peak Memory, Provisioned Memory                                                             |
| **Middleware Invocations**   | Count, Duration, Active CPU Time, Time to First Byte, Incoming Fast Origin Transfer, Outgoing Fast Origin Transfer, Total Fast Origin Transfer                                                                                                                        |
| **External APIs**            | Count, Duration, Transfer Bytes                                                                                                                                                                                                                                      |
| **Queue Actions**            | Count, Messages Sent, Messages Received, Messages Deleted, Notifications, Visibility Changes, Message Age When Received, Redeliveries, Retry Depth                                                                                                                   |
| **Workflows**                | Hooks Conflict, Hooks Created, Hooks Disposed, Hooks Received, Runs Cancelled, Runs Completed, Runs Created, Runs Failed, Runs Started, Steps Cancelled, Steps Completed, Steps Created, Steps Failed, Steps Retrying, Steps Started, Waits Completed, Waits Created |
| **Sandboxes**                | Active CPU Time, CPU Usage, Data Transfer In, Data Transfer Out, Peak Memory, Provisioned Memory                                                                                                                                                                     |

### Networking metrics

| **Event type**                  | **Metrics**  |
| ------------------------------- | ------------ |
| **PrivateLink Data Transfer**   | Count, Bytes |

### AI metrics

| **Event type**            | **Metrics**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Gateway Requests**   | Count, Audio Duration, Audio Input Tokens, Audio Output Tokens, Cache Creation 1h Input Tokens, Cache Creation Tokens, Cached Input Tokens, Cost, Duration, Gateway Cost, Gateway Tool Call Cost, Gateway Tool Calls, Google Maps Search Calls, Image Count, Image Input Tokens, Input Tokens, Model Allowlist Cost, Output Tokens, Provider Allowlist Cost, Quota Write Cost, Realtime Client Messages, Realtime Session Duration, Region Pinning Cost, Reporting Write Cost, Reranking Query Count, Surcharge Cost, Time to First Token, Video Count, Video Duration, Video FPS, Video Input Tokens, Web Search Calls, ZDR Cost |

### Security metrics

| **Event type**            | **Metrics** |
| ------------------------- | ----------- |
| **Blocked Connections**   | Count       |
| **Firewall Actions**      | Count       |
| **BotID Checks**          | Count       |

### Real User Monitoring metrics

| **Event type**                    | **Metrics**                                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Web Analytics Page Views**      | Count, Visitors                                                                                                                           |
| **Web Analytics Custom Events**   | Count, Visitors                                                                                                                           |
| **Speed Insights**                | Time to First Byte, Cumulative Layout Shift, First Contentful Paint, First Input Delay, Interaction to Next Paint, Largest Contentful Paint |

### Custom metrics

| **Event type** | **Metrics**                                            |
| -------------- | ------------------------------------------------------ |
| **Metrics**    | The custom metrics available to your team              |

### Aggregations

The aggregation determines how Query combines the selected metric's values. The aggregation picker displays only the options supported by the selected metric.

| **Aggregation** | **Description**                                                                                                                                                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Count**       | The number of data points emitted for the selected custom metric. For built-in event types, select the **Count** metric and the **Sum** aggregation instead.                                                                                          |
| **Sum**         | The total of the metric values.                                                                                                                                                                                                                       |
| **Average**     | The arithmetic mean of the metric values.                                                                                                                                                                                                            |
| **Min**         | The smallest metric value.                                                                                                                                                                                                                           |
| **Max**         | The largest metric value.                                                                                                                                                                                                                            |
| **P50**         | The value below which 50% of the metric values fall.                                                                                                                                                                                                 |
| **P75**         | The value below which 75% of the metric values fall.                                                                                                                                                                                                 |
| **P90**         | The value below which 90% of the metric values fall.                                                                                                                                                                                                 |
| **P95**         | The value below which 95% of the metric values fall.                                                                                                                                                                                                 |
| **P99**         | The value below which 99% of the metric values fall.                                                                                                                                                                                                 |
| **Std Dev**     | The standard deviation of the metric values.                                                                                                                                                                                                         |
| **Per Second**  | The metric value expressed as a rate per second.                                                                                                                                                                                                     |
| **Percent**     | Each group as a percentage of the ungrouped total. Values excluded by the filter are also excluded from the total.                                                                                                                                   |
| **Unique**      | The number of distinct values. Query uses this aggregation for the **Visitors** metrics.                                                                                                                                                              |

Aggregations are calculated within each point on the chart (hourly, daily, etc) and also across the entire query window.

## Filter

The filter bar defines the conditions to filter your query data. It only fetches data that meets a specified condition based on several [fields](#group-by-and-where-fields) and operators:

| **Operator**                              | **Description**                                            |
| ----------------------------------------- | ---------------------------------------------------------- |
| `is`, `is not`                            | Match or exclude one value.                                |
| `is any of`, `is not any of`              | Match or exclude any value in a list.                      |
| `is set`, `is not set`                    | Match based on whether the field has a value.              |
| `contains`, `not contains`                | Match based on whether text contains a value.              |
| `starts with`, `not starts with`          | Match based on the beginning of a text value.              |
| `ends with`, `not ends with`              | Match based on the end of a text value.                    |
| `matches pattern`, `not matches pattern`  | Match based on a text pattern.                             |
| `>`, `>=`, `<`, `<=`                      | Compare numerical values.                                  |
| `includes any`, `includes all`            | Match array fields that include selected values.           |
| `excludes any`, `excludes all`            | Match array fields that exclude selected values.           |

## Group by

The `Group By` clause calculates statistics for each combination of [field](#group-by-and-where-fields) values. Each group is displayed as a separate color in the chart view, and has a separate row in the table view.

For example, grouping by **Request Hostname** and **HTTP Status** displays data for each combination of hostname and status code.

## Group by and where fields

The available fields depend on the selected event type. The following fields are common across one or more event types:

| **Field Name**      | **Description**                                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Request Hostname`  | Group by the request's domains and subdomains                                                                                                                                                                                                                                    |
| `Project`           | Group by the request's project                                                                                                                                                                                                                                                   |
| `Deployment ID`     | Group by the request's deployment ID                                                                                                                                                                                                                                             |
| `HTTP Status`       | Group by the request's HTTP response code                                                                                                                                                                                                                                        |
| `Route`             | The mapped path used by the request. For example, if you have a dynamic route like `/blog/[slug]` and a blog post is `/blog/my-blog-post`, the route is `/blog/[slug]`                                                                                                           |
| `Request Path`      | The path used by the request. For example, if you have a dynamic route like `/blog/[slug]` and a blog post is `/blog/my-blog-post`, the request path is `/blog/my-blog-post`                                                                                                      |
| `Cache Result`      | The [cache](/docs/caching/cdn-cache#x-vercel-cache) status for the request                                                                                                                                                                                                               |
| `Environment`       | Group by the environment (`production` or [`preview`](/docs/deployments/environments#preview-environment-pre-production))                                                                                                                                                        |
| `Request Method`    | Group by the HTTP request method (`GET`, `POST`, `PUT`, etc.)                                                                                                                                                                                                                    |
| `Referrer URL`      | Group by the HTTP referrer URL                                                                                                                                                                                                                                                   |
| `Referrer Hostname` | Group by the HTTP referrer domain                                                                                                                                                                                                                                                |
| `IP Address`        | Group by the request's IP address                                                                                                                                                                                                                                                |
| `IP Country`        | Group by the request's IP country                                                                                                                                                                                                                                                |
| `User Agent`        | Group by the request's user agent                                                                                                                                                                                                                                                |
| `AS Number`         | The [autonomous system number (ASN)](# "ASN") for the request. This is related to what network the request came from (either a home network or a cloud provider) |
| `CDN Region`        | Group by the [region](/docs/regions) the request was routed to                                                                                                                                                                                                                   |
| `ISR Cache Region`  | Group by the ISR cache region                                                                                                                                                                                                                                                    |
| `WAF Action`        | Group by the action taken by the [Vercel Firewall](/docs/vercel-firewall/vercel-waf), including `allow`, `bypass`, `challenge`, `challenge-solved`, `challenge-failed`, `deny`, `log`, `rate_limit`, and `redirect`                                                                  |
| `WAF Rule ID`       | Group by the firewall rule ID                                                                                                                                                                                                                                                    |
| `Skew Protection`   | When `active`, the request would have been subject to [version skew](/docs/skew-protection) but was protected, otherwise `inactive`.                                                                                                                                             |
| `Sandbox Name`      | Group by the sandbox name                                                                                                                                                                                                                                                        |
| `Sandbox Session ID` | Group by the sandbox session ID                                                                                                                                                                                                                                                  |


---

[View full sitemap](/docs/sitemap)
