---
title: Services Pricing and Limits
product: vercel
url: /docs/services/pricing
canonical_url: "https://vercel.com/docs/services/pricing"
last_updated: 2026-06-30
type: reference
prerequisites:
  - /docs/services
related:
  - /docs/functions/usage-and-pricing
  - /docs/fluid-compute
  - /docs/services/bindings
  - /docs/pricing/regional-pricing
  - /docs/pricing
summary: "Understand how billing works for Vercel Services, what's charged, and which limits apply."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/pricing.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "0d6068391ecc360e8bca1bf654035630128977d8f0f3df9a9b50bffed2953d35"
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
- [Pricing and Limits](https://vercel.com/docs/queues/pricing?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how Vercel Queues billing works, what's included, and which service limits apply.
- [San Francisco, USA \\(sfo1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/sfo1?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the San Francisco, USA \\(sfo1\\) region.

Full cross-link map for this page: [/docs/services/pricing.graph.md](/docs/services/pricing.graph.md?from=related&source_path=%2Fdocs%2Fservices%2Fpricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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
