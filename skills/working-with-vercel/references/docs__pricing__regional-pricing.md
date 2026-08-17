---
title: Regional Pricing
product: vercel
url: /docs/pricing/regional-pricing
canonical_url: "https://vercel.com/docs/pricing/regional-pricing"
last_updated: 2026-02-27
type: reference
prerequisites:
  - /docs/pricing
related:
  - /docs/pricing/understanding-my-invoice
  - /docs/fluid-compute
  - /docs/functions/usage-and-pricing
  - /docs/pricing/regional-pricing/cpt1
  - /docs/pricing/regional-pricing/cle1
summary: Vercel pricing for Managed Infrastructure resources in different regions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/regional-pricing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "8f5d2ff08e7de40e949e873621c2bf40cea5e415cbde59d8f62225b666f978aa"
---

# Regional Pricing

When using Managed Infrastructure resources on Vercel, some, but not all, are priced based on region. The following table shows the price range for resources priced by region. Your team will be charged based on the usage of your projects for each resource per region.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services?from=related) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank?from=related) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, security defaults, AI infrastructure, GPU comp
- [Runtime Cache](https://vercel.com/docs/caching/runtime-cache?from=related) — Vercel Runtime Cache is a specialized cache that stores responses from data fetches in Vercel functions
- [Node.js](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package?from=related) — Learn about available APIs when working with Vercel Functions.
- [Limits and Pricing](https://vercel.com/docs/image-optimization/limits-and-pricing?from=related) — This page outlines information on the limits that are applicable when using Image Optimization, and the costs they can i
- [Usage & Pricing](https://vercel.com/docs/incremental-static-regeneration/limits-and-pricing?from=related) — Learn about ISR costs, usage metrics, and strategies to optimize your ISR reads and writes.
- [Limits](https://vercel.com/docs/limits?from=related) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.

Full cross-link map for this page: [/docs/pricing/regional-pricing.graph.md](/docs/pricing/regional-pricing.graph.md)
<!-- /docsgraph:related -->

The **Included** column shows the amount of usage covered in your [billing cycle](/docs/pricing/understanding-my-invoice#understanding-your-invoice). If you use more than this amount, the **Additional** column lists the rates for any extra usage as a range.

> **💡 Note:** Active CPU and Provisioned Memory are billed at different rates depending on
> the region your [fluid compute](/docs/fluid-compute) is deployed. The rates
> for each region can be found in the [fluid
> pricing](/docs/functions/usage-and-pricing) documentation.

| Resource | Included (Billing Cycle) | On-demand (Billing Cycle) |
| --- | --- | --- |
| Fast Data Transfer | First 1 TB | 1 GB for $0.15 - $0.35 |
| Edge Requests | First 10,000,000 | 1,000,000 Requests for $2.00 - $3.20 |


| Resource | On-demand (Billing Cycle) |
| --- | --- |
| ISR Writes | 1,000,000 Write Units for $4.00 - $6.40 |
| ISR Reads | 1,000,000 Read Units for $0.40 - $0.64 |
| Runtime Cache Writes | 1,000,000 Write Units for $4.00 - $6.40 |
| Runtime Cache Reads | 1,000,000 Read Units for $0.40 - $0.64 |
| Fast Origin Transfer | 1 GB for $0.06 - $0.43 |
| Queue API Operations | 1,000,000 Operations for $0.60 - $0.96 |
| Edge Request CPU Duration | 1 Hour for $0.30 - $0.48 |
| Image Optimization Transformations | $0.05 - $0.0812 per 1K |
| Image Optimization Cache Reads | $0.40 - $0.64 per 1M |
| Image Optimization Cache Writes | $4.00 - $6.40 per 1M |
| WAF Rate Limiting | 1,000,000 Allowed Requests for $0.50 - $0.80 |
| OWASP CRS per request number | 1,000,000 Inspected Requests for $0.80 - $1.28 |
| OWASP CRS per request size | 1 GB of inspected request payload for $0.20 - $0.32 |
| Blob Storage Size | 1 GB for $0.023 - $0.041 |
| Blob Simple Operations | 1,000,000 for $0.35 - $0.56 |
| Blob Advanced Operations | 1,000,000 for $4.50 - $7.00 |
| Blob Data Transfer | 1 GB for $0.05 - $0.117 |
| Private Data Transfer | 1 GB for $0.15 - $0.31 |
| Service Requests | 1,000,000 Requests for $0.50 - $0.80 |


## Specific region pricing

For specific, region based pricing, see the following pages:

- [Cape Town, South Africa (cpt1)](/docs/pricing/regional-pricing/cpt1)
- [Cleveland, USA (cle1)](/docs/pricing/regional-pricing/cle1)
- [Dubai, UAE (dxb1)](/docs/pricing/regional-pricing/dxb1)
- [Dublin, Ireland (dub1)](/docs/pricing/regional-pricing/dub1)
- [Frankfurt, Germany (fra1)](/docs/pricing/regional-pricing/fra1)
- [Hong Kong (hkg1)](/docs/pricing/regional-pricing/hkg1)
- [London, UK (lhr1)](/docs/pricing/regional-pricing/lhr1)
- [Montreal, Canada (yul1)](/docs/pricing/regional-pricing/yul1)
- [Mumbai, India (bom1)](/docs/pricing/regional-pricing/bom1)
- [Osaka, Japan (kix1)](/docs/pricing/regional-pricing/kix1)
- [Paris, France (cdg1)](/docs/pricing/regional-pricing/cdg1)
- [Portland, USA (pdx1)](/docs/pricing/regional-pricing/pdx1)
- [San Francisco, USA (sfo1)](/docs/pricing/regional-pricing/sfo1)
- [São Paulo, Brazil (gru1)](/docs/pricing/regional-pricing/gru1)
- [Seoul, South Korea (icn1)](/docs/pricing/regional-pricing/icn1)
- [Singapore (sin1)](/docs/pricing/regional-pricing/sin1)
- [Stockholm, Sweden (arn1)](/docs/pricing/regional-pricing/arn1)
- [Sydney, Australia (syd1)](/docs/pricing/regional-pricing/syd1)
- [Tokyo, Japan (hnd1)](/docs/pricing/regional-pricing/hnd1)
- [Washington D.C., USA (iad1)](/docs/pricing/regional-pricing/iad1)

For more information on Managed Infrastructure pricing, see the [pricing documentation](/docs/pricing#managed-infrastructure).


---

[View full sitemap](/docs/sitemap)
