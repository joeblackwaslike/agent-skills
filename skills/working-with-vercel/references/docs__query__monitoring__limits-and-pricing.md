---
title: Limits and Pricing for Monitoring
product: vercel
url: /docs/query/monitoring/limits-and-pricing
canonical_url: "https://vercel.com/docs/query/monitoring/limits-and-pricing"
last_updated: 2026-06-16
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3a82c8649a4e114c11059c558f2fdbb64e015b00eb69c427ef697180f3aec9ae"
---

# Limits and Pricing for Monitoring

## Pricing


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage & Optimize](https://vercel.com/docs/manage-and-optimize-observability?from=related) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Limits and Pricing](https://vercel.com/docs/speed-insights/limits-and-pricing?from=related) — Learn about our limits and pricing when using Vercel Speed Insights. Different limitations are applied depending on your
- [Pricing and Limits](https://vercel.com/docs/queues/pricing?from=related) — Understand how Vercel Queues billing works, what's included, and which service limits apply.
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Pricing](https://vercel.com/docs/analytics/limits-and-pricing?from=related) — Learn about pricing for Vercel Web Analytics.

Full cross-link map for this page: [/docs/query/monitoring/limits-and-pricing.graph.md](/docs/query/monitoring/limits-and-pricing.graph.md)
<!-- /docsgraph:related -->

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
