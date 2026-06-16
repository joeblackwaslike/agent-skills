---
title: Cleveland, USA (cle1) pricing
product: vercel
url: /docs/pricing/regional-pricing/cle1
canonical_url: "https://vercel.com/docs/pricing/regional-pricing/cle1"
last_updated: 2026-02-13
type: reference
prerequisites:
  - /docs/pricing/regional-pricing
  - /docs/pricing
related:
  - /docs/plans/pro-plan
  - /docs/pricing/understanding-my-invoice
  - /docs/fluid-compute
  - /docs/functions/usage-and-pricing
  - /docs/manage-cdn-usage
summary: Vercel pricing for the Cleveland, USA (cle1) region.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/regional-pricing/cle1.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "c3e750e110e3a6a40c94ae193b58e7824a0bd882dc2fbe5d9ce3b15523f685ce"
---

# Cleveland, USA (cle1) pricing

The table below shows Managed Infrastructure products with pricing specific to the  region. This pricing is available only to [Pro plan](/docs/plans/pro-plan) users. Your team will be charged based on the usage of your projects for each resource in this region.

The **Included** column shows the amount of usage covered in your [billing cycle](/docs/pricing/understanding-my-invoice#understanding-your-invoice). If you use more than this amount, the **Additional** column lists the rates for any extra usage.

> **💡 Note:** Active CPU and Provisioned Memory are billed at different rates depending on
> the region your [fluid compute](/docs/fluid-compute) is deployed. The rates
> for each region can be found in the [fluid
> pricing](/docs/functions/usage-and-pricing) documentation.

| Resource | On-demand (Billing Cycle) |
| --- | --- |
| [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) | Included First 1 TB, then $0.15 per 1 GB |
| [Edge Requests](/docs/manage-cdn-usage#edge-requests) | Included First 10,000,000, then $2.00 per 1,000,000 Requests |
| [ISR Writes](/docs/incremental-static-regeneration/limits-and-pricing#isr-writes-chart) | $4.00 per 1,000,000 Write Units |
| [ISR Reads](/docs/incremental-static-regeneration/limits-and-pricing#isr-reads-chart) | $0.40 per 1,000,000 Read Units |
| [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) | $0.06 per 1 GB |
| [Queue API Operations](/docs/queues/pricing) | $0.7488 per 1,000,000 Operations |
| [Edge Requests - Additional CPU Duration](/docs/manage-cdn-usage#edge-request-cpu-duration) | $0.30 per 1 Hour |
| [Image Optimization Transformation](/docs/image-optimization/limits-and-pricing#image-transformations) | $0.05 per 1K |
| [Image Optimization Cache Reads](/docs/image-optimization/limits-and-pricing#image-cache-reads) | $0.40 per 1M |
| [Image Optimization Cache Writes](/docs/image-optimization/limits-and-pricing#image-cache-writes) | $4.00 per 1M |
| [Runtime Cache Writes](/docs/functions/functions-api-reference/vercel-functions-package#getcache) | $4.00 per 1,000,000 Write Units |
| [Runtime Cache Reads](/docs/functions/functions-api-reference/vercel-functions-package#getcache) | $0.40 per 1,000,000 Read Units |
| [Firewall Rate Limit Requests](/docs/security/vercel-waf/usage-and-pricing#rate-limiting-pricing) | $0.50 per 1,000,000 Allowed Requests |
| [Firewall OWASP Requests](/docs/security/vercel-waf/usage-and-pricing#managed-ruleset-pricing) | $0.80 per 1,000,000 Inspected Requests |
| [Firewall OWASP Excess Bytes](/docs/security/vercel-waf/usage-and-pricing#managed-ruleset-pricing) | $0.20 per 1 GB of inspected request payload |
| [Blob Storage Size](/docs/vercel-blob/usage-and-pricing#pricing) | $0.023 per GB |
| [Blob Simple Operations](/docs/vercel-blob/usage-and-pricing#pricing) | $0.40 per 1M |
| [Blob Advanced Operations](/docs/vercel-blob/usage-and-pricing#pricing) | $5.00 per 1M |
| [Blob Data Transfer](/docs/vercel-blob/usage-and-pricing#pricing) | $0.05 per GB |
| [Private Data Transfer](/docs/networking/static-ips) | $0.15 per 1 GB |


Learn more about the different regions available on Vercel in the [regions](/docs/regions) documentation. See the [pricing](/docs/pricing#managed-infrastructure) documentation for more information on Managed Infrastructure.


---

[View full sitemap](/docs/sitemap)
