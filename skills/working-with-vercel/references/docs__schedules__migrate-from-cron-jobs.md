---
title: Migrating from Cron Jobs to Schedules
product: vercel
url: /docs/schedules/migrate-from-cron-jobs
canonical_url: "https://vercel.com/docs/schedules/migrate-from-cron-jobs"
last_updated: 2026-10-09
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/cron-jobs
  - /docs/cron-jobs/manage-cron-jobs
  - /docs/schedules/handle-runs
  - /docs/schedules/configuration
  - /docs/schedules/concepts
summary: Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/migrate-from-cron-jobs.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "53b125c85e17e2e9c892e9cc1ffb6539fff68666d113f4784c739204f1512d88"
---

# Migrating from Cron Jobs to Schedules

[Cron Jobs](/docs/cron-jobs) are a legacy feature and will be migrated to Schedules in the future. You can migrate now with a configuration change. Your route code keeps working as it is.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Cron Jobs](https://vercel.com/docs/schedules/cron-jobs) — Learn about cron jobs, how they work, and how to use them on Vercel.
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Vercel Schedules: JS SDK Reference](https://vercel.com/docs/schedules/sdk) — Reference for @vercel/schedules: create, list, update, enable, disable, invoke, and delete schedules, and handle schedul
- [Getting started with cron jobs](https://vercel.com/docs/schedules/cron-jobs/quickstart) — Learn how to schedule cron jobs to run at specific times or intervals.
- [Testing Schedules Locally](https://vercel.com/docs/schedules/local-development) — Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from pr

Full cross-link map for this page: [/docs/schedules/migrate-from-cron-jobs.graph.md](/docs/schedules/migrate-from-cron-jobs.graph.md)
<!-- /docsgraph:related -->

After you migrate, you can:

- Set a timezone for each schedule instead of using UTC
- Enable, disable, or run each schedule without redeploying
- Run schedules in Preview branches and custom environments
- See the execution history of each schedule
- Switch to a private function or a queue topic later

## What stays the same

A schedule with a `path` target calls your route the same way a Cron Job does:

- The `user-agent` header is `vercel-cron/1.0`.
- The `x-vercel-cron-schedule` header contains the cron expression.
- If you set `CRON_SECRET`, the `Authorization` header contains `Bearer <CRON_SECRET>`, so your [`CRON_SECRET` check](/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs) keeps working.

Path schedules send a `POST` request by default, but Cron Jobs send `GET`. Set `requestMethod` to `GET` when you migrate so your route handler doesn't need to change.

Schedule requests also include [schedule headers](/docs/schedules/handle-runs#request-headers), such as the execution ID and scheduled time.

## Migrate your Cron Jobs

- ### Find your Cron Jobs
  Cron Jobs live in the `crons` property of `vercel.json`:
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "crons": [
      { "path": "/api/daily-report", "schedule": "0 9 * * *" },
      { "path": "/api/cleanup", "schedule": "0 * * * *" }
    ]
  }
  ```
  You can also see them on the **Cron Jobs** tab of your project's **Schedules** page in the dashboard.

- ### Replace `crons` with `schedules`
  For each Cron Job, add an entry to `schedules`. Use a [name](/docs/schedules/configuration#schedule-names) as the key, keep the same `path` and `schedule`, and add `"requestMethod": "GET"`:
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "schedules": {
      "daily-report": {
        "schedule": "0 9 * * *",
        "path": "/api/daily-report",
        "requestMethod": "GET"
      },
      "cleanup": {
        "schedule": "0 * * * *",
        "path": "/api/cleanup",
        "requestMethod": "GET"
      }
    }
  }
  ```
  Remove the `crons` entries in the same change. If you keep both, your route runs twice for each occurrence.
  > **💡 Note:** Cron Jobs always run in UTC, and schedules default to UTC. Leave out
  > `timezone` to keep the same run times. If you add a `timezone`, update the
  > cron expression so the schedule still runs when you expect.

- ### Deploy to production
  Deploy your project:
  ```bash filename="terminal"
  vercel deploy --prod
  ```
  Vercel creates the schedules when the deployment becomes your production deployment, and stops running the Cron Jobs you removed.

- ### Verify the schedules
  1. Open your project in the Vercel dashboard and select **Schedules**.
  2. Check that your schedules appear in the list.
  3. Select a schedule and click **Run Schedule** to test it without waiting for its next run.
  You can also run a schedule from the CLI:
  ```bash filename="terminal"
  vercel schedules invoke daily-report
  ```

## Timing differences

Schedules start within a [jitter window](/docs/schedules/concepts#jitter) instead of at an exact time. The limits also differ by plan:

| Plan | Cron Jobs | Schedules |
| --- | --- | --- |
| **Hobby** | At most once per day, at any time within the scheduled hour | At most once every 15 minutes, within a 15-minute jitter window |
| **Pro and Enterprise** | At the scheduled minute | Within the jitter window, which defaults to 1 minute and can be set from 1 to 15 minutes |

On Pro and Enterprise, add `jitter` to change the window:

```json filename="vercel.json"
{
  "schedules": {
    "cleanup": {
      "schedule": "0 * * * *",
      "path": "/api/cleanup",
      "requestMethod": "GET",
      "jitter": 5
    }
  }
}
```

## Pausing a schedule

**Disable Cron Jobs** on the **Cron Jobs** tab of the **Schedules** page only pauses Cron Jobs. It doesn't affect schedules. To pause a schedule, select it and choose **Disable** from the menu next to **Run Schedule**, or run:

```bash filename="terminal"
vercel schedules disable cleanup
```

Disabling a static schedule doesn't require a redeploy. See [Managing schedules](/docs/schedules/manage#enable-and-disable-a-schedule).

## Making the route private

A Cron Job path is a public URL, so anyone can call it unless you check `CRON_SECRET`. After you migrate, you can switch to a function target. Function targets have no public URL, and only Vercel's scheduler can invoke them.

1. Install `@vercel/schedules` and wrap your handler in `handleSchedule`.
2. Add a `schedule/v1beta` trigger to the function.
3. Replace `path` and `requestMethod` with `function`.

See [Function targets](/docs/schedules/handle-runs#function-targets) for the full steps. Keep the same schedule name so Vercel updates the existing schedule instead of creating a new one.

## Next steps

- [Concepts](/docs/schedules/concepts): Learn how environments, late runs, and retries work.
- [Handling scheduled runs](/docs/schedules/handle-runs): Make your handler safe to run more than once.
- [`vercel schedules`](/docs/cli/schedules): Manage schedules from the terminal.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
