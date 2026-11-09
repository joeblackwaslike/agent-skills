---
title: Getting Started with Schedules
product: vercel
url: /docs/schedules/quickstart
canonical_url: "https://vercel.com/docs/schedules/quickstart"
last_updated: 2026-10-26
type: tutorial
prerequisites:
  - /docs/schedules
related:
  - /docs/projects
  - /docs/cli
  - /docs/agent-resources/skills
  - /docs/schedules/sdk
  - /docs/schedules/configuration
summary: Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/quickstart.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "83a9b4ad587fd4d6a68ddacf04733ced0bb887e851f6d51eacedb2da21a3d795"
---

# Getting Started with Schedules

In this guide, you'll create a function that cleans up expired records every hour. You'll declare the schedule in `vercel.json`, test it with `vercel dev`, deploy it, and check its first run in the dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Managing Schedules](https://vercel.com/docs/schedules/manage) — View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI,
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Getting started with cron jobs](https://vercel.com/docs/schedules/cron-jobs/quickstart) — Learn how to schedule cron jobs to run at specific times or intervals.
- [Creating Schedules for Each Customer](https://vercel.com/docs/schedules/multi-tenant) — Use schedule namespaces to give each customer in a multi-tenant app their own recurring and one-time schedules.
- [vercel schedules](https://vercel.com/docs/cli/schedules) — Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a loca

Full cross-link map for this page: [/docs/schedules/quickstart.graph.md](/docs/schedules/quickstart.graph.md)
<!-- /docsgraph:related -->

The schedule targets a private function, so nobody can call it from the internet. Only Vercel's scheduler can invoke it.

## Prerequisites

- A [Vercel project](/docs/projects) linked to a local directory
- The latest version of [Vercel CLI](/docs/cli). Run `npm i -g vercel@latest` to update it.

If you use a coding agent, install the `vercel-schedules` [agent skill](/docs/agent-resources/skills) so it can follow along with this guide and set up schedules in your project:

```bash filename="terminal"
npx skills add vercel/vercel-plugin --skill vercel-schedules
```

- ### Install the SDK
  Install [`@vercel/schedules`](/docs/schedules/sdk). It includes `handleSchedule`, which checks that a request is a schedule run and gives you its details:
  ```bash package-manager
  npm i @vercel/schedules
  ```

- ### Create the function
  Create a function that runs your task. `handleSchedule` passes the run's details to your callback and returns a `200` response when the callback finishes:
  ```ts filename="api/cleanup.ts"
  import { handleSchedule } from '@vercel/schedules';

  export const POST = handleSchedule(async (metadata) => {
    console.log(
      `Running ${metadata.name}, scheduled for ${metadata.scheduledAt.toISOString()}`,
    );

    await deleteExpiredRecords();
  });

  async function deleteExpiredRecords() {
    // Your cleanup logic
  }
  ```

- ### Declare the schedule in `vercel.json`
  Add a `schedule/v1beta` trigger to the function, then add a schedule that targets it:
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "functions": {
      "api/cleanup.ts": {
        "experimentalTriggers": [{ "type": "schedule/v1beta" }]
      }
    },
    "schedules": {
      "cleanup": {
        "schedule": "0 * * * *",
        "function": "api/cleanup"
      }
    }
  }
  ```
  This configuration does three things:
  - The `schedule/v1beta` trigger makes `api/cleanup.ts` private. It has no public URL.
  - `"schedule": "0 * * * *"` runs the function at the start of every hour, in UTC.
  - `"function": "api/cleanup"` points at the function's build output path, `.vercel/output/functions/api/cleanup.func`, without the `.func` suffix. It isn't the source filename.
  To find the identifier for a different framework or a nested function, see [Function identifiers](/docs/schedules/configuration#function-identifiers).

- ### Test it locally
  Start the development server:
  ```bash filename="terminal"
  vercel dev
  ```
  `vercel dev` starts a local scheduler and registers the `cleanup` schedule. To run it now instead of waiting for the next hour, open a second terminal and invoke it:
  ```bash filename="terminal"
  vercel schedules invoke cleanup --local
  ```
  The `vercel dev` output shows the function's log line. To learn what else works locally, see [Testing schedules locally](/docs/schedules/local-development).

- ### Deploy to production
  Deploy your project:
  ```bash filename="terminal"
  vercel deploy --prod
  ```
  Vercel registers the schedule when the deployment becomes your production deployment. Production schedules start active, so `cleanup` runs at the start of the next hour.
  > **💡 Note:** New static schedules in Preview and custom environments start inactive by
  > default, so they don't run before you review them. To run one, [enable
  > it](/docs/schedules/manage#manage-schedules-across-environments). You can
  > also [set a custom environment to create new schedules as
  > active](/docs/schedules/manage#run-static-schedules-in-a-custom-environment).

- ### Check the run
  1. Open your project in the Vercel dashboard and select **Schedules**.
  2. Select the `cleanup` schedule to see its next run time.
  3. Click **Run Schedule** to run it now without changing its cadence.
  The run appears in the schedule's execution history with its outcome and duration.

## What you just did

- Created a private function that only Vercel's scheduler can invoke
- Declared a static schedule that runs every hour
- Ran the schedule locally and in production

## Next steps

- [Handling scheduled runs](/docs/schedules/handle-runs): Make your handler safe to run more than once, or target a route or queue instead.
- [Configuration reference](/docs/schedules/configuration): Set a timezone, jitter window, or request method.
- [JS SDK Reference](/docs/schedules/sdk): Create schedules at runtime, including one-time schedules.
- [Concepts](/docs/schedules/concepts): Learn how environments, jitter, and late runs work.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
