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
source: "https://vercel.com/docs/ci/pricing.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "9b12c12be8a13a6f6d1dd10d4c573800c188fa85208c15090ddf027ccbdb977e"
---

# Vercel CI Pricing

Vercel CI bills for the compute your runs use, measured in CPU minutes. A CPU minute is one CPU running for one minute, matching [Builds pricing](https://vercel.com/docs/builds#pricing).

## Pricing

| Plan | Price |
| --- | --- |
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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
