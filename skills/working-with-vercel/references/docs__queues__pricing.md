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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "03e29717aa0bbaec18e54dd7d01653c8f7e5052c4f5f3c18f322bafa6119041a"
---

# Pricing and Limits

Vercel Queues is billed per API operation. Every API call counts as at least one operation (see [Pricing](#pricing) for how message size and options add operations), and there are five operation types:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running background workers on Vercel](https://vercel.com/kb/guide/background-workers-on-vercel) — Run background jobs on Vercel with waitUntil, Cron Jobs, Queues, Workflows, Daemons, or Sandbox. Compare the options and
- [ Run a Docker monolith with workers on Vercel](https://vercel.com/kb/guide/docker-monolith-workers-vercel) — Run a Dockerized monolith on Vercel with Container Images, move long-running workers to Vercel Queues and Vercel Workflo
- [Process background jobs in Python with Vercel Queues](https://vercel.com/kb/guide/python-and-vercel-queues) — Move slow and failure-prone work out of your Python request handlers, with typed topics, consumer groups, and built-in r
- [Services Pricing and Limits](https://vercel.com/docs/services/pricing) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [API Reference](https://vercel.com/docs/queues/api) — HTTP API reference for Vercel Queues. Publish, consume, acknowledge, and manage messages.
- [Vercel KMS Pricing and Limits](https://vercel.com/docs/kms/pricing) — How Vercel KMS is billed per signing operation, the platform limits that apply, and how to stop being billed.
- [Limits and Pricing for Vercel Flags](https://vercel.com/docs/flags/vercel-flags/limits-and-pricing) — Review Vercel Flags request pricing and limits for flags, segments, configuration size, and connected projects.
- [Limits and Pricing for Monitoring](https://vercel.com/docs/query/monitoring/limits-and-pricing) — Learn about our limits and pricing when using Monitoring. Different limitations are applied depending on your plan.

Full cross-link map for this page: [/docs/queues/pricing.graph.md](/docs/queues/pricing.graph.md)
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

| Resource | Price | Included (Pro) | Included (Hobby) |
|----------|-------|----------------|-----------------|
| [Queue API Operations](/docs/queues/pricing) | Regional | Usage-based | First 1,000,000 |


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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
