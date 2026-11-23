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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/queues/pricing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "11c8794606c064134c2b38f141ec0f01b8205ff187df2f5e54ffd17732afdf21"
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
- [Pricing and Limits](https://vercel.com/docs/drives/pricing) — Check Vercel Drives regional rates, plan allotments, and storage and mount limits.
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [Montréal, Canada \\(yul1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/yul1) — Vercel pricing for the Montréal, Canada \\(yul1\\) region.
- [Dublin, Ireland \\(dub1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/dub1) — Vercel pricing for the Dublin, Ireland \\(dub1\\) region.

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
