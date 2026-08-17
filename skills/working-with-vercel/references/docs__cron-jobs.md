---
title: Cron Jobs
product: vercel
url: /docs/cron-jobs
canonical_url: "https://vercel.com/docs/cron-jobs"
last_updated: 2026-06-16
type: how-to
prerequisites:
  []
related:
  - /docs/functions
  - /docs/project-configuration
  - /docs/build-output-api/configuration
  - /docs/cron-jobs/manage-cron-jobs
  - /docs/cron-jobs/usage-and-pricing
summary: Learn about cron jobs, how they work, and how to use them on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cron-jobs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "85fdfb01fa8cdf9934dbe377865bac8c5d027be145fd45e7201197d47e9486a7"
---

# Cron Jobs

> **🔒 Permissions Required**: Cron Jobs


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Setup Cron Jobs on Vercel](https://vercel.com/kb/guide/how-to-setup-cron-jobs-on-vercel?from=related) — Learn how to setup and use cron jobs on Vercel
- [Astro on Vercel vs Webflow Cloud](https://vercel.com/kb/guide/astro-on-vercel-vs-webflow-cloud?from=related) — Compare running Astro on Vercel Functions with Fluid compute against Webflow Cloud on Cloudflare Workers. Learn how Astr
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [vercel crons](https://vercel.com/docs/cli/crons?from=related) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Schedules](https://eve.dev/docs/schedules?from=related) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Builds](https://vercel.com/docs/builds?from=related) — Understand how the build step works when creating a Vercel Deployment.
- [Celery](https://vercel.com/docs/frameworks/backend/celery?from=related) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Deploy Hooks](https://vercel.com/docs/deploy-hooks?from=related) — Learn how to create and trigger deploy hooks to integrate Vercel deployments with other systems.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/cron-jobs.graph.md](/docs/cron-jobs.graph.md)
<!-- /docsgraph:related -->

Cron jobs are time-based scheduling tools used to automate repetitive tasks. By using a specific syntax called a [cron expression](#cron-expressions), you can define the frequency and timing of each task. This helps improve efficiency and ensures that important processes are performed consistently.

Some common use cases of cron jobs are:

- Automating backups and archiving them
- Sending email and Slack notifications
- Updating Stripe subscription quantities

Vercel supports cron jobs for [Vercel Functions](/docs/functions). Cron jobs can be added through [`vercel.json`](/docs/project-configuration) or the [Build Output API](/docs/build-output-api/configuration#crons).

See [Managing Cron Jobs](/docs/cron-jobs/manage-cron-jobs) for information on duration, error handling, deployments, concurrency control, and local execution. To learn about usage limits and pricing information, see the [Usage and Pricing](/docs/cron-jobs/usage-and-pricing) page.

## Getting started with cron jobs

Learn how to set up and configure cron jobs for your project using our [Quickstart](/docs/cron-jobs/quickstart) guide.

## How cron jobs work

To trigger a cron job, Vercel makes an HTTP GET request to your project's production deployment URL, using the `path` provided in your project's `vercel.json` file. An example endpoint Vercel would make a request to in order to trigger a cron job might be: `https://*.vercel.app/api/cron`.

Vercel Functions triggered by a cron job on Vercel will always contain `vercel-cron/1.0` as the user agent. Each request also includes an `x-vercel-cron-schedule` header containing the cron expression that triggered the invocation (e.g., `0 5 * * *`). You can use this header to determine which schedule triggered your function when multiple cron jobs share the same path.

## Cron expressions

Vercel supports the following cron expressions format:

| Field        | Value Range     | Example Expression | Description                                          |
| ------------ | --------------- | ------------------ | ---------------------------------------------------- |
| Minute       | 0 - 59          | `5 * * * *`        | Triggers at 5 minutes past the hour                  |
| Hour         | 0 - 23          | `* 5 * * *`        | Triggers every minute, between 05:00 AM and 05:59 AM |
| Day of Month | 1 - 31          | `* * 5 * *`        | Triggers every minute, on day 5 of the month         |
| Month        | 1 - 12          | `* * * 5 *`        | Triggers every minute, only in May                   |
| Day of Week  | 0 - 6 (Sun-Sat) | `* * * * 5`        | Triggers every minute, only on Friday                |

### Validate cron expressions

To validate your cron expressions, you can use the following tool to quickly verify the syntax and timing of your scheduled tasks to ensure they run as intended.

You can also use [crontab guru](https://crontab.guru/) to validate your cron expressions.

### Cron expression limitations

- Cron jobs on Vercel do not support alternative expressions like `MON`, `SUN`, `JAN`, or `DEC`
- You cannot configure both day of the month and day of the week at the same time. When one has a value, the other must be `*`
- The timezone is always UTC

## More resources

- [Managing Cron Jobs](/docs/cron-jobs/manage-cron-jobs)
- [Usage and Pricing](/docs/cron-jobs/usage-and-pricing)


---

[View full sitemap](/docs/sitemap)
