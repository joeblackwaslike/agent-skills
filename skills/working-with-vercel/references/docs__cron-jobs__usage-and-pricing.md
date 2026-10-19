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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "9b40af85127b9f786ec8ea29f8c53dab9478c02779728879b22dc1cd597bc74f"
---

# Usage & Pricing for Cron Jobs

> **Availability**: Cron Jobs are available on all plans

Cron jobs invoke [Vercel Functions](/docs/functions). This means the same [usage](/docs/limits) and [pricing](/pricing) limits will apply.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [CLI](https://chat-sdk.dev/docs/create-chat-sdk) — Scaffold a Chat SDK bot app with a single command.
- [How to run Devin Outposts sessions on Vercel](https://vercel.com/kb/guide/devin-outposts-vercel-sandbox) — Run Devin Outposts sessions in isolated Vercel Sandbox microVMs. One browser authorization to set up, then sessions star
- [Migrate a Python API from Heroku to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-heroku-to-vercel) — Move a FastAPI, Flask, or Django API from Heroku to Vercel Functions. Replace your Procfile, worker dynos, Heroku Schedu
- [Migrate a Python API from Railway to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-railway-to-vercel) — Move a FastAPI, Flask, or Django API from Railway to Vercel Functions. Replace railway.json start commands, volumes, Cel
- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [Build a v0-style app builder with OpenAI Agents API and Vercel Sandbox](https://vercel.com/kb/guide/v0-clone-openai-agents-vercel-sandbox) — Build a chat-to-app workspace with live Next.js previews, follow-up edits, and saved projects using the OpenAI Agents AP
- [Vercel Cron Jobs are now generally available](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available)
- [Cron jobs now support 100 per project on every plan](https://vercel.com/changelog/cron-jobs-now-support-100-per-project-on-every-plan)
- [Account Plans on Vercel](https://vercel.com/docs/plans) — Learn about the different plans available on Vercel.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby) — Learn about the Hobby plan and how it compares to the Pro plan.

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
