---
title: Limits and Pricing for Monitoring
product: vercel
url: /docs/query/monitoring/limits-and-pricing
canonical_url: "https://vercel.com/docs/query/monitoring/limits-and-pricing"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/query/monitoring
  - /docs/query
related:
  - /docs/observability/observability-plus
  - /docs/query/monitoring/monitoring-reference
summary: Learn about our limits and pricing when using Monitoring. Different limitations are applied depending on your plan.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query/monitoring/limits-and-pricing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "db5ff06a41ce578a547f2ac5ac440d968d8ca30c2165926c3cc350a1a775de88"
---

# Limits and Pricing for Monitoring

Monitoring is now


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Monitoring pricing reduced up to 87%](https://vercel.com/changelog/monitoring-pricing-reduced-up-to-87)
- [Manage and optimize usage for Observability](https://vercel.com/docs/manage-and-optimize-observability) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Limits and Pricing for Speed Insights](https://vercel.com/docs/speed-insights/limits-and-pricing) — Learn about our limits and pricing when using Vercel Speed Insights. Different limitations are applied depending on your
- [Pricing for Web Analytics](https://vercel.com/docs/analytics/limits-and-pricing) — Learn about pricing for Vercel Web Analytics.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Pricing and Limits](https://vercel.com/docs/queues/pricing) — Understand how Vercel Queues billing works, what's included, and which service limits apply.

Full cross-link map for this page: [/docs/query/monitoring/limits-and-pricing.graph.md](/docs/query/monitoring/limits-and-pricing.graph.md)
<!-- /docsgraph:related -->

deprecated

. It is no longer available for Pro users or Enterprise customers who subscribed to Observability Plus after June 2025.

Observability Plus

includes

Observability Query

for monitoring your project.

## Pricing

Monitoring is now part of Observability, and Observability Plus includes it at no additional cost. If you are currently paying for Monitoring, [migrate](/docs/observability/observability-plus#enabling-observability-plus) to Observability Plus to get access to additional product features, usage-based pricing, and a longer retention period.

Even if you choose not to migrate to Observability Plus, Vercel will automatically move you to the new pricing model of $1.20 per 1 million events, as shown below.

To learn more, see [Limits and Pricing for Observability](/docs/observability/observability-plus).

## Limitations

| Limit          | Pro           | Enterprise              |
| -------------- | ------------- | ----------------------- |
| Data retention | 30 days       | 90 days                 |
| Granularity    | 1 day, 1 hour | 1 day, 1 hour, 5 minute |

## How are events counted?

Vercel creates an event each time a request is made to your website. These events include unique parameters such as execution time. For a complete list, [see the visualize clause docs](/docs/query/monitoring/monitoring-reference#visualize).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
