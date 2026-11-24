---
title: Pricing and Limits
product: vercel
url: /docs/drives/pricing
canonical_url: "https://vercel.com/docs/drives/pricing"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/drives
related:
  - /docs/drives/cli-reference
  - /docs/plans/pro-plan
  - /docs/spend-management
  - /docs/sandbox/concepts/drives
  - /docs/drives/sdk-reference
summary: Check Vercel Drives regional rates, plan allotments, and storage and mount limits.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/drives/pricing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "12f89a364c51d07407c2ca300ba69bf5da9e4fa618d622ef35b96a64e0967963"
---

# Pricing and Limits

Vercel meters Drives usage by storage, reads, and writes. Rates depend on the drive's region, which you set at creation.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox pricing and quotas](https://vercel.com/docs/sandbox/pricing) — Understand how Vercel Sandbox billing works, what's included in each plan, and the quotas that apply.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Pricing and Limits](https://vercel.com/docs/queues/pricing) — Understand how Vercel Queues billing works, what's included, and which service limits apply.
- [Services Pricing and Limits](https://vercel.com/docs/services/pricing) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [Hong Kong \\(hkg1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/hkg1) — Vercel pricing for the Hong Kong \\(hkg1\\) region.

Full cross-link map for this page: [/docs/drives/pricing.graph.md](/docs/drives/pricing.graph.md)
<!-- /docsgraph:related -->

## Pricing

Select a region to see Pro rates for drive storage, reads, and writes.

### Drive storage

Storage charges are based on the amount of data you use, not the maximum size you set. Vercel measures logical used size hourly and shows the rate per GB-month. [Delete unused drives](/docs/drives/cli-reference#vercel-drives-delete) to stop their storage charges.

### Drive reads

Reads measure the logical amount of data a sandbox reads from a mounted drive, in GB.

### Drive writes

Writes measure the logical amount of data a sandbox writes to a mounted drive, in GB.

## Billing by plan

| Plan       | Included usage and billing                                                                                                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hobby      | Includes 30 GB of reads and 30 GB of writes per month. The total provisioned size of drives is limited to 15 GB. |
| Pro        | Usage counts toward the [monthly credit](/docs/plans/pro-plan#monthly-credit). After you use the credit, Vercel bills usage at the regional rates.                                                         |
| Enterprise | [Contact sales](/contact/sales) for pricing and quotas.                                                                                                                                                    |

Use [Spend Management](/docs/spend-management) to monitor spending or pause usage at a threshold you set.

## Limits

| Plan               | Minimum and maximum drive size                              | Default drive size |
| ------------------ | ----------------------------------------------------------- | ------------------ |
| Hobby or Pro trial | 1 GB to 15 GB | 1 GB               |
| Paid Pro           | 1 GB to 16 TB, higher on request                            | 1 TB               |
| Enterprise         | 1 GB to 16 TB, higher on request                            | 1 TB               |

One sandbox at a time can mount a drive read-write. Use a [read-only snapshot](/docs/sandbox/concepts/drives#snapshots) when several sandboxes need the same data, or [fork the drive](/docs/drives/sdk-reference#forking-a-drive) when each sandbox needs an independent writable copy.

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
