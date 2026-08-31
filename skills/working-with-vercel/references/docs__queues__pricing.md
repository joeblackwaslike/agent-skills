---
title: Pricing and Limits
product: vercel
url: /docs/queues/pricing
canonical_url: "https://vercel.com/docs/queues/pricing"
last_updated: 2026-08-12
type: reference
prerequisites:
  - /docs/queues
related:
  - /docs/pricing/regional-pricing
  - /docs/pricing
  - /docs/functions/usage-and-pricing
summary: "Understand how Vercel Queues billing works, what's included, and which service limits apply."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/pricing.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "ec349f419c5a0086f8ec9a3c8d8672e20d42ef77d7fd1c6cedd53e88fcde78a1"
---

# Pricing and Limits

Vercel Queues is billed per API operation. Every API call counts as one operation, and there are five operation types:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Services Pricing and Limits](https://vercel.com/docs/services/pricing?from=related&source_path=%2Fdocs%2Fqueues%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [Queues concepts](https://vercel.com/docs/queues/concepts?from=related&source_path=%2Fdocs%2Fqueues%2Fpricing&source_site=vercel-docs&relationship=related) — Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.
- [Limits and Pricing for Monitoring](https://vercel.com/docs/query/monitoring/limits-and-pricing?from=related&source_path=%2Fdocs%2Fqueues%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about our limits and pricing when using Monitoring. Different limitations are applied depending on your plan.
- [API Reference](https://vercel.com/docs/queues/api?from=related&source_path=%2Fdocs%2Fqueues%2Fpricing&source_site=vercel-docs&relationship=related) — HTTP API reference for Vercel Queues. Publish, consume, acknowledge, and manage messages.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing?from=related&source_path=%2Fdocs%2Fqueues%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how eve usage maps to Vercel resources and inherited platform limits.

Full cross-link map for this page: [/docs/queues/pricing.graph.md](/docs/queues/pricing.graph.md?from=related&source_path=%2Fdocs%2Fqueues%2Fpricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Operation             | Description                                           |
| --------------------- | ----------------------------------------------------- |
| **Send**              | Publishing a message to a topic                       |
| **Receive**           | Retrieving messages from a consumer group             |
| **Delete**            | Acknowledging a message after processing              |
| **Visibility change** | Extending or modifying a message's visibility timeout |
| **Notify**            | Push mode callback delivery to your function          |

## Pricing

Messages are metered in 4 KiB chunks. For example, a 12 KiB message counts as three operations.

Sends with an idempotency key and push deliveries with max concurrency are billed at 2x units for that operation. Other operations on the same message are unaffected.

Operations are [regionally priced](/docs/pricing/regional-pricing) like other Managed Infrastructure resources. See [pricing](/docs/pricing) for plan details and included credits.

Functions invoked by Queues in push mode continue to be charged at the [existing compute rates](/docs/functions/usage-and-pricing).

## Limits

| Resource                           | Min          | Max                    | Default          |
| ---------------------------------- | ------------ | ---------------------- | ---------------- |
| Message retention (TTL)            | 60 seconds   | 7 days                 | 24 hours         |
| Delay before visible               | Zero seconds | 7 days (capped at TTL) | Zero seconds     |
| Visibility timeout                 | Zero seconds | 60 minutes             | 60 seconds       |
| Messages per receive               | 1            | 10                     | 1                |
| Max concurrency per consumer group | 1            | Unlimited              | Unlimited        |
| Max message size                   | -            | 100 MB                 | -                |
| Topics per project                 | -            | Unlimited              | -                |
| Consumer groups per topic          | -            | Unlimited              | -                |
| Retry behavior (first 32 attempts) | -            | -                      | Configured delay |
| Retry behavior (after 32 attempts) | -            | -                      | Forced backoff   |


---

[View full sitemap](/docs/sitemap)
