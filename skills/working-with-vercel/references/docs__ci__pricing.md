---
title: Vercel CI Pricing
product: vercel
url: /docs/ci/pricing
canonical_url: "https://vercel.com/docs/ci/pricing"
last_updated: 2026-10-28
type: reference
prerequisites:
  - /docs/ci
related:
  - /docs/ci/configuration
summary: Understand how Vercel CI usage is billed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ci/pricing.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "7b5336b4c9b0fd69d0e3c645909b7db142fc1a06b52510e2fb2b8b84b2f0e366"
---

# Vercel CI Pricing

Vercel CI bills for the compute your runs use, measured in CPU minutes. A CPU minute is one CPU running for one minute, matching [Builds pricing](https://vercel.com/docs/builds#pricing).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [vercel pricing](https://vercel.com/docs/cli/pricing) — Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.
- [Cleveland, USA \\(cle1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/cle1) — Vercel pricing for the Cleveland, USA \\(cle1\\) region.
- [Services Pricing and Limits](https://vercel.com/docs/services/pricing) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [Montréal, Canada \\(yul1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/yul1) — Vercel pricing for the Montréal, Canada \\(yul1\\) region.

Full cross-link map for this page: [/docs/ci/pricing.graph.md](/docs/ci/pricing.graph.md)
<!-- /docsgraph:related -->

## Pricing

| Plan | Price |
| --- | --- |
| Hobby | 200 CPU minutes per month included |
| Pro | $0.0035 per CPU minute |
| Enterprise | Custom |


## How Vercel CI calculates CPU minutes

Vercel CI runs each step of a run in its own compute instance. For each instance, Vercel CI multiplies the number of CPUs by the time the instance runs:

- **CPUs**: The number of requested CPUs.
- **Time**: From when the task starts until it stops, including shutdown. Vercel CI rounds up to the next second, with a minimum of 1 second.

For example, a task with 8 CPUs that runs for 2 minutes and 30 seconds uses 8 × 2.5 = 20 CPU minutes.

## What uses CPU minutes

Each run uses CPU minutes for these steps:

| Step                                    | CPUs                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Bootstrapping                           | 4 by default. Change it with [`ci.bootstrapping.resources.vcpus`](/docs/ci/configuration#bootstrapping-resources). |
| Each task that runs                     | 2 by default. Change it with a [`ci:cpus` tag](/docs/ci/configuration#resource-sizing).                             |

Tasks that Vercel CI restores from cache or skips because your changes don't affect them don't run, so they don't use CPU minutes.

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
