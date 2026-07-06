---
title: Pricing and Limits
product: vercel
url: /docs/services/pricing
canonical_url: "https://vercel.com/docs/services/pricing"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/services
related:
  - /docs/functions/usage-and-pricing
  - /docs/fluid-compute
  - /docs/services/bindings
  - /docs/pricing/regional-pricing
  - /docs/pricing
summary: Learn about pricing and limits on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/services/pricing.md"
fetched_at: "2026-07-06T05:40:24.878Z"
sha256: "77b95291b19f6fe5b39664447ad6590103174157b3b9705a0c32c8fc57bc8b31"
---

# Services Pricing and Limits

Vercel bills Services across the compute each service runs on, the requests services make to each other, and the data services return.

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
