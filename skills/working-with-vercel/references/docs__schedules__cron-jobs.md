---
title: Cron Jobs
product: vercel
url: /docs/schedules/cron-jobs
canonical_url: "https://vercel.com/docs/schedules/cron-jobs"
last_updated: 2026-09-16
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/functions
  - /docs/project-configuration
  - /docs/build-output-api/configuration
  - /docs/cron-jobs/manage-cron-jobs
  - /docs/cron-jobs/usage-and-pricing
summary: Learn about cron jobs, how they work, and how to use them on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/cron-jobs.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "d8e50a3b6b8a598f8755bed8a6d4f90607462e741163618c4f983c228ace819d"
---

# Cron Jobs

Cron Jobs are a legacy feature and will be migrated to


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Cron Jobs](https://vercel.com/blog/cron-jobs)
- [Vercel Cron Jobs are now generally available](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available)
- [Run scheduled jobs with Vercel Cron Jobs and Vercel Functions](https://vercel.com/changelog/run-scheduled-jobs-with-vercel-cron-jobs-and-vercel-functions)
- [Cron jobs now support 100 per project on every plan](https://vercel.com/changelog/cron-jobs-now-support-100-per-project-on-every-plan)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy
- [Schedules Concepts](https://vercel.com/docs/schedules/concepts) — Learn how Vercel Schedules handles environments, deployments, jitter, one-time schedules, late runs, and duplicate deliv
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Handling Scheduled Runs](https://vercel.com/docs/schedules/handle-runs) — Write the private function, route, or queue consumer that a schedule runs, and make it safe to run more than once.

Full cross-link map for this page: [/docs/schedules/cron-jobs.graph.md](/docs/schedules/cron-jobs.graph.md)
<!-- /docsgraph:related -->

Schedules

in the future. Schedules include timezones, private function and queue targets. You can also create schedules at runtime.

Migrate your Cron Jobs to Schedules

.

> Cron Jobs are available on all plans

Cron jobs are time-based scheduling tools used to automate repetitive tasks. By using a specific syntax called a [cron expression](#cron-expressions), you can define the frequency and timing of each task. This helps improve efficiency and ensures that important processes are performed consistently.

Some common use cases of cron jobs are:

- Automating backups and archiving them
- Sending email and Slack notifications
- Updating Stripe subscription quantities

Vercel supports cron jobs for [Vercel Functions](/docs/functions). Cron jobs can be added through [`vercel.json`](/docs/project-configuration) or the [Build Output API](/docs/build-output-api/configuration#crons).

See [Managing Cron Jobs](/docs/cron-jobs/manage-cron-jobs) for information on duration, error handling, deployments, concurrency control, and local execution. To learn about usage limits and pricing information, see the [Usage and Pricing](/docs/cron-jobs/usage-and-pricing) page.

A scheduled endpoint can enqueue a job or start a workflow when the work needs retries or durable execution. Compare [background worker options](/docs/background-workers) to choose how your scheduled work runs.

## Getting started with cron jobs

Learn how to set up and configure cron jobs for your project using our [Quickstart](/docs/cron-jobs/quickstart) guide.

## How cron jobs work

To trigger a cron job, Vercel makes an HTTP GET request to your project's production deployment URL, using the `path` provided in your project's `vercel.json` file. For example, Vercel might request the following endpoint to trigger a cron job: `https://*.vercel.app/api/cron`.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
