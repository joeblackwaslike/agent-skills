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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "40f2294a32ba03d539d9ae7d7463952de77f828f3a2c54b2d30e841397e86899"
---

# Usage & Pricing for Cron Jobs

> Cron Jobs are available on all plans

Cron jobs invoke [Vercel Functions](/docs/functions). This means the same [usage](/docs/limits) and [pricing](/pricing) limits will apply.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [CLI](https://chat-sdk.dev/docs/create-chat-sdk) — Scaffold a Chat SDK bot app with a single command.
- [How to run Devin Outposts sessions on Vercel](https://vercel.com/kb/guide/devin-outposts-vercel-sandbox) — Run Devin Outposts sessions in isolated Vercel Sandbox microVMs. One browser authorization to set up, then sessions star
- [Migrate a Python API from Heroku to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-heroku-to-vercel) — Move a FastAPI, Flask, or Django API from Heroku to Vercel Functions. Replace your Procfile, worker dynos, Heroku Schedu
- [Migrate a Python API from Railway to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-railway-to-vercel) — Move a FastAPI, Flask, or Django API from Railway to Vercel Functions. Replace railway.json start commands, volumes, Cel
- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [Vercel Cron Jobs are now generally available](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available)
- [Cron jobs now support 100 per project on every plan](https://vercel.com/changelog/cron-jobs-now-support-100-per-project-on-every-plan)
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Account Plans on Vercel](https://vercel.com/docs/plans) — Learn about the different plans available on Vercel.
- [Pricing and Limits](https://vercel.com/docs/queues/pricing) — Understand how Vercel Queues billing works, what's included, and which service limits apply.

Full cross-link map for this page: [/docs/cron-jobs/usage-and-pricing.graph.md](/docs/cron-jobs/usage-and-pricing.graph.md)
<!-- /docsgraph:related -->

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
