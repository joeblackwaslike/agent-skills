---
title: Limits and Pricing for Monitoring
product: vercel
url: /docs/query/monitoring/limits-and-pricing
canonical_url: "https://vercel.com/docs/query/monitoring/limits-and-pricing"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/query/monitoring
  - /docs/query
related:
  - /docs/observability/observability-plus
  - /docs/observability/limits-and-pricing
  - /docs/observability/monitoring/monitoring-reference
summary: Learn about our limits and pricing when using Monitoring. Different limitations are applied depending on your plan.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query/monitoring/limits-and-pricing.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3dbc8ce1e60a94b2c33e43784d4d8c195c2d0175307c50803172cdb9f245cdd6"
---

# Limits and Pricing for Monitoring

## Pricing

Monitoring has become part of Observability, and is included with Observability Plus at no additional cost. If you are currently paying for Monitoring, you should [migrate](/docs/observability/observability-plus#enabling-observability-plus) to Observability Plus to get access to additional product features with a longer retention period with no base fee.

Even if you choose not to migrate to Observability Plus, Vercel will automatically move you to the new pricing model of $1.20 per 1 million events, as shown below.

To learn more, see [Limits and Pricing for Observability](/docs/observability/limits-and-pricing).

## Limitations

| Limit          | Pro           | Enterprise              |
| -------------- | ------------- | ----------------------- |
| Data retention | 30 days       | 90 days                 |
| Granularity    | 1 day, 1 hour | 1 day, 1 hour, 5 minute |

## How are events counted?

Vercel creates an event each time a request is made to your website. These events include unique parameters such as execution time. For a complete list, [see the visualize clause docs](/docs/observability/monitoring/monitoring-reference#visualize).


---

[View full sitemap](/docs/sitemap)
