---
title: Services Pricing and Limits
product: vercel
url: /docs/services/pricing
canonical_url: "https://vercel.com/docs/services/pricing"
last_updated: 2026-08-31
type: reference
prerequisites:
  - /docs/services
related:
  - /docs/pricing/taxes
  - /docs/functions/usage-and-pricing
  - /docs/fluid-compute
  - /docs/services/bindings
  - /docs/pricing/regional-pricing
summary: "Understand how billing works for Vercel Services, what's charged, and which limits apply."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/pricing.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "6164169d870a3e4b42d115222a31273bbc9d442abd59989c8d2ca513f5f89d68"
---

# Services Pricing and Limits

Vercel bills Services across the compute each service runs on, the requests services make to each other, and the data services return.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Secure internal communication between services (beta)](https://vercel.com/changelog/secure-internal-communication-between-services?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related)
- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [Dublin, Ireland \\(dub1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/dub1?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Dublin, Ireland \\(dub1\\) region.
- [Cleveland, USA \\(cle1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/cle1?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Cleveland, USA \\(cle1\\) region.
- [San Francisco, USA \\(sfo1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/sfo1?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the San Francisco, USA \\(sfo1\\) region.
- [Sydney, Australia \\(syd1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/syd1?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Sydney, Australia \\(syd1\\) region.

Full cross-link map for this page: [/docs/services/pricing.graph.md](/docs/services/pricing.graph.md?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** All prices shown are in USD and exclude value-added tax (VAT), goods and services tax (GST), and other applicable taxes. Taxes are calculated based on your billing address and added to your invoice where required by law. [Learn more about taxes](/docs/pricing/taxes).

## Compute

Each service runs on Vercel's compute and is billed the same as [Vercel Functions](/docs/functions/usage-and-pricing): Active CPU, provisioned memory, and invocations. [Fluid Compute](/docs/fluid-compute) applies, so concurrent requests can share an instance.

## Service requests

When one service calls another over a [binding](/docs/services/bindings), each call counts as one service request. Requests that arrive from the public internet are not service requests.

Service requests are [regionally priced](/docs/pricing/regional-pricing), like other Managed Infrastructure resources, and are billed separately from CDN requests. A service-to-service call does not incur a separate Edge Request or Fast Data Transfer charge.

See [Pricing](/docs/pricing) for plan details and included credits.

## Data transfer

The bytes a service returns are billed as [Fast Origin Transfer](/docs/pricing), the same as other origin traffic on Vercel, whether the response is a static file or comes from a function.

## Limits

The same [function limits](/docs/functions/limitations) apply to each service, such as memory and maximum duration.


---

[View full sitemap](/docs/sitemap)
