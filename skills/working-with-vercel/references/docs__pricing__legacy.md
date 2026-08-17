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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6e919ca4b0b19cc9885bb0b3544d6f0fea4ae2b9c470581ef7aabb5bb62475c2"
---

# Legacy Metrics

## Bandwidth


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Legacy Usage & Pricing](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing?from=related) — Learn about legacy usage and pricing for Vercel Functions.
- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Pricing & Usage](https://vercel.com/docs/manage-cdn-usage?from=related) — Understand CDN pricing resources, monitor usage from your dashboard, and optimize Fast Data Transfer, Fast Origin Transf

Full cross-link map for this page: [/docs/pricing/legacy.graph.md](/docs/pricing/legacy.graph.md)
<!-- /docsgraph:related -->

Bandwidth is the amount of data your deployments have sent or received.
This chart includes traffic for both [preview](/docs/deployments/environments#preview-environment-pre-production) and
[production](/docs/deployments/environments#production-environment) deployments.

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
