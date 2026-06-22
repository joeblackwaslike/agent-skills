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
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "d69c338a67f0ffacda4c42d3b85be9347be963bfbac1530cb3d2d1a42fe68828"
---

# Regional Pricing

When using Managed Infrastructure resources on Vercel, some, but not all, are priced based on region. The following table shows the price range for resources priced by region. Your team will be charged based on the usage of your projects for each resource per region.

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
