---
title: Legacy Metrics
product: vercel
url: /docs/pricing/legacy
canonical_url: "https://vercel.com/docs/pricing/legacy"
last_updated: 2026-06-16
type: reference
prerequisites:
  - /docs/pricing
related:
  - /docs/deployments/environments
  - /docs/incremental-static-regeneration
  - /docs/cdn
  - /docs/functions
summary: Learn about legacy usage metrics, including Bandwidth, Requests, Vercel Function Invocations, and Vercel Function Execution.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/legacy.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a91eb419bc5ebf745a9c8e059de801b24d9c7bfa97657df669895d6b33c4c979"
---

# Legacy Metrics

## Bandwidth

Bandwidth is the amount of data your deployments have sent or received.
This chart includes traffic for both [preview](/docs/deployments/environments#preview-environment-pre-production) and
[production](/docs/deployments/environments#production-environment) deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Metrics for outgoing requests](https://vercel.com/changelog/metrics-for-outgoing-requests)
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Legacy Usage & Pricing for Functions](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing) — Learn about legacy usage and pricing for Vercel Functions.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Speed Insights metrics from your terminal.

Full cross-link map for this page: [/docs/pricing/legacy.graph.md](/docs/pricing/legacy.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You are not billed for bandwidth usage on [blocked or
> paused](/kb/guide/why-is-my-account-deployment-blocked#pausing-process)
> deployments.

The total traffic of your projects is the sum of the outgoing and incoming bandwidth.

- **Outgoing**: Outgoing bandwidth measures the amount of data that your deployments have **sent** to your users.
  Data used by [ISR](/docs/incremental-static-regeneration) and the responses from the [CDN](/docs/cdn) and [Vercel functions](/docs/functions) count as outgoing bandwidth
- **Incoming**: Incoming bandwidth measures the amount of data that your deployments have **received** from your users

An example of incoming bandwidth would be page views requested by the browser. All requests sent to the [CDN](/docs/cdn) and [Vercel functions](/docs/functions) are collected as incoming bandwidth.

Incoming bandwidth is usually much smaller than outgoing bandwidth for website projects.

## Requests

Requests are the number of requests made to your deployments. This chart includes traffic for both [preview](/docs/deployments/environments#preview-environment-pre-production) and [production](/docs/deployments/environments#production-environment) deployments.

Requests can be filtered by:

- **Ratio**: The ratio of requests that are cached and uncached by the [CDN](/docs/cdn)
- **Projects**: The projects that the requests are made to

## Vercel Function Invocations

Vercel Function Invocations are the number of times your [Vercel functions](/docs/functions) have received a request, excluding cache hits.

Vercel Function Invocations can be filtered by:

- **Ratio**: The ratio of invocations that are **Successful**, **Errored**, or **Timed out**
- **Projects**: The projects that the invocations are made to

## Vercel Function Execution

Vercel Function Execution is the amount of time your [Vercel functions](/docs/functions) have spent computing resources.

Vercel Function Execution can be filtered by:

- **Ratio**: The ratio of execution time that is **Completed**, **Errored**, or **Timed out**
- **Projects**: The projects that the execution time is spent on


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
