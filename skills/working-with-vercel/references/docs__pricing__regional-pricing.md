---
title: Regional Pricing
product: vercel
url: /docs/pricing/regional-pricing
canonical_url: "https://vercel.com/docs/pricing/regional-pricing"
last_updated: 2026-09-14
type: reference
prerequisites:
  - /docs/pricing
related:
  - /docs/pricing/taxes
  - /docs/pricing/understanding-my-invoice
  - /docs/sandbox
  - /docs/sandbox/pricing
  - /docs/pricing/regional-pricing/cpt1
summary: Vercel pricing for Managed Infrastructure resources in different regions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/regional-pricing.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "395ea2486b5dd37eebd1c5752293cb80cc9599d45f65c4dcae0773dbcc014020"
---

# Regional Pricing

When using Managed Infrastructure resources on Vercel, some, but not all, are priced based on region. The following table shows the price range for resources priced by region. Your team will be charged based on the usage of your projects for each resource per region.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Data Cache is moving to Runtime Cache](https://vercel.com/changelog/data-cache-is-moving-to-runtime-cache)
- [Introducing the Runtime Cache API](https://vercel.com/changelog/introducing-the-runtime-cache-api)
- [Route build traffic through Static IPs](https://vercel.com/changelog/route-build-traffic-through-static-ips)
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How to choose the right Vercel networking option](https://vercel.com/kb/guide/how-to-choose-the-right-vercel-networking-option) — Decide whether your project needs a networking option at all, then choose between Static IPs, AWS PrivateLink, Secure Co
- [Optimize Runtime Cache on Vercel](https://vercel.com/kb/guide/optimize-runtime-cache-reads-on-vercel) — Diagnose rising Runtime Cache usage, trace reads to tags and code paths, and reduce avoidable reads while checking write
- [How to reduce Vercel Image Optimization costs](https://vercel.com/kb/guide/reduce-image-optimization-costs-on-vercel) — Learn how to reduce Vercel Image Optimization costs in Next.js by tuning cache TTLs, image sizes, formats, and quality.
- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Simplifying runtime caching on Vercel](https://vercel.com/blog/simplifying-runtime-caching-on-vercel)
- [Runtime Cache](https://vercel.com/docs/caching/runtime-cache) — Vercel Runtime Cache is a specialized cache that stores responses from data fetches in Vercel functions
- [Data Cache for Next.js](https://vercel.com/docs/caching/runtime-cache/data-cache) — Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
- [ISR Usage and Pricing](https://vercel.com/docs/incremental-static-regeneration/limits-and-pricing) — Learn about ISR costs, usage metrics, and strategies to optimize your ISR reads and writes.

Full cross-link map for this page: [/docs/pricing/regional-pricing.graph.md](/docs/pricing/regional-pricing.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** All prices shown are in USD and exclude value-added tax (VAT), goods and services tax (GST), and other applicable taxes. Taxes are calculated based on your billing address and added to your invoice where required by law. [Learn more about taxes](/docs/pricing/taxes).

The **On-demand** column lists the rate range Vercel charges for each resource within your [billing cycle](/docs/pricing/understanding-my-invoice#understanding-your-invoice).

> **💡 Note:** Vercel prices [Vercel Sandbox](/docs/sandbox) compute by region too. Its rates
> live on a separate page because Sandbox runs in fewer regions than the
> resources below. For the rate in each region where Sandbox is available, see
> [Sandbox pricing](/docs/sandbox/pricing#regional-pricing).

| Resource | On-demand (Billing Cycle) |
| --- | --- |
| Fast Data Transfer | 1 GB for $0.15 - $0.35 |
| CDN Requests | 1,000,000 Requests for $2.00 - $3.20 |
| ISR Writes | 1,000,000 Write Units for $4.00 - $6.40 |
| ISR Reads | 1,000,000 Read Units for $0.40 - $0.64 |
| Runtime Cache Writes | 1,000,000 Write Units for $4.00 - $6.40 |
| Runtime Cache Reads | 1,000,000 Read Units for $0.40 - $0.64 |
| Fast Origin Transfer | 1 GB for $0.06 - $0.43 |
| Queue API Operations | 1,000,000 Operations for $0.60 - $0.96 |
| CDN Request CPU Duration | 1 Hour for $0.30 - $0.48 |
| Active CPU | $0.128 - $0.221 per 1 Hour |
| Provisioned Memory | $0.0106 - $0.0183 per 1 GB-hr |
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
