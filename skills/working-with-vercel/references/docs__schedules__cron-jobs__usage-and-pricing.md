---
title: Usage & Pricing for Cron Jobs
product: vercel
url: /docs/schedules/cron-jobs/usage-and-pricing
canonical_url: "https://vercel.com/docs/schedules/cron-jobs/usage-and-pricing"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/schedules/cron-jobs
  - /docs/schedules
related:
  - /docs/functions
  - /docs/limits
  - /docs/plans/pro-plan
  - /docs/functions/usage-and-pricing
summary: Learn about cron jobs usage and pricing details.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/cron-jobs/usage-and-pricing.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "aef89c4cff3a692757e18da57a1d2bae022b67df3aafdb3c8b4f5943cb0a9e50"
---

# Usage & Pricing for Cron Jobs

Cron Jobs are a legacy feature and will be migrated to


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Cron Jobs](https://vercel.com/blog/cron-jobs)
- [Cron jobs now support 100 per project on every plan](https://vercel.com/changelog/cron-jobs-now-support-100-per-project-on-every-plan)
- [Vercel Cron Jobs are now generally available](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available)
- [Getting started with cron jobs](https://vercel.com/docs/schedules/cron-jobs/quickstart) — Learn how to schedule cron jobs to run at specific times or intervals.
- [Schedules Limits](https://vercel.com/docs/schedules/limits) — Limits for Vercel Schedules, including schedules per team, run frequency, jitter, Hobby usage, and API requests.
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Legacy Usage & Pricing for Functions](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing) — Learn about legacy usage and pricing for Vercel Functions.

Full cross-link map for this page: [/docs/schedules/cron-jobs/usage-and-pricing.graph.md](/docs/schedules/cron-jobs/usage-and-pricing.graph.md)
<!-- /docsgraph:related -->

Schedules

in the future. Schedules include timezones, private function and queue targets. You can also create schedules at runtime.

Migrate your Cron Jobs to Schedules

.

> Cron Jobs are available on all plans

Cron jobs invoke [Vercel Functions](/docs/functions). This means the same [usage](/docs/limits) and [pricing](/pricing) limits will apply.

|                | **Number of cron jobs per project** | **Minimum interval** | **Scheduling precision** |
| -------------- | ----------------------------------- | -------------------- | ------------------------ |
| **Hobby**      | 100 cron jobs                       | Once per day         | Per-hour (±59 min)       |
| **Pro**        | 100 cron jobs                       | Once per minute      | Per-minute               |
| **Enterprise** | 100 cron jobs                       | Once per minute      | Per-minute               |

### Hobby scheduling limits

> **💡 Note:** Hobby accounts are limited to cron jobs that run **once per day**. Cron
> expressions that would run more frequently will fail during deployment.

Hobby plans have two restrictions on cron jobs:

1. **Daily execution limit**: Cron jobs can only run once per day. Expressions like `0 * * * *` (per-hour) or `*/30 * * * *` (every 30 minutes) will fail deployment with the error:
   *Hobby accounts are limited to daily cron jobs. This cron expression would run more than once per day.*

2. **Timing precision**: Vercel cannot assure a timely cron job invocation. For example, a cron job configured as `0 1 * * *` (every day at 1 am) will trigger anywhere between 1:00 am and 1:59 am.

For cron jobs that run more frequently or with precise timing, **upgrade to our [Pro](/docs/plans/pro-plan) plan**.

## Pricing

Cron jobs are included in **all plans**.

You use a function to invoke a cron job, and therefore [usage](/docs/limits) and [pricing](/pricing) limits for these functions apply to all cron job executions:

- [Functions limits and pricing](/docs/functions/usage-and-pricing)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
