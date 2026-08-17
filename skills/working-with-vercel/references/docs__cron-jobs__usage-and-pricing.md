---
title: Usage & Pricing for Cron Jobs
product: vercel
url: /docs/cron-jobs/usage-and-pricing
canonical_url: "https://vercel.com/docs/cron-jobs/usage-and-pricing"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cron-jobs
related:
  - /docs/functions
  - /docs/limits
  - /docs/plans/pro-plan
  - /docs/functions/usage-and-pricing
summary: Learn about cron jobs usage and pricing details.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cron-jobs/usage-and-pricing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6e157c841df232ae78f0c96f3d4cedd96f3abf500d41a42f063020818cf723b4"
---

# Usage & Pricing for Cron Jobs

> **🔒 Permissions Required**: Cron Jobs


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [CLI](https://chat-sdk.dev/docs/create-chat-sdk?from=related) — Scaffold a Chat SDK bot app with a single command.
- [How to run Devin Outposts sessions on Vercel](https://vercel.com/kb/guide/devin-outposts-vercel-sandbox?from=related) — Run Devin Outposts sessions in isolated Vercel Sandbox microVMs. One browser authorization to set up, then sessions star
- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs?from=related) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [How to Setup Cron Jobs on Vercel](https://vercel.com/kb/guide/how-to-setup-cron-jobs-on-vercel?from=related) — Learn how to setup and use cron jobs on Vercel
- [Managing Cron Jobs](https://vercel.com/docs/cron-jobs/manage-cron-jobs?from=related) — Learn how to manage Cron Jobs effectively in Vercel. Explore cron job duration, error handling, deployments, concurrency
- [Getting Started](https://vercel.com/docs/cron-jobs/quickstart?from=related) — Learn how to schedule cron jobs to run at specific times or intervals.
- [vercel crons](https://vercel.com/docs/cli/crons?from=related) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Plans](https://vercel.com/docs/plans?from=related) — Learn about the different plans available on Vercel.

Full cross-link map for this page: [/docs/cron-jobs/usage-and-pricing.graph.md](/docs/cron-jobs/usage-and-pricing.graph.md)
<!-- /docsgraph:related -->

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
