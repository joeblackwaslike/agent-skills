---
title: Getting started with cron jobs
product: vercel
url: /docs/schedules/cron-jobs/quickstart
canonical_url: "https://vercel.com/docs/schedules/cron-jobs/quickstart"
last_updated: 2026-08-11
type: tutorial
prerequisites:
  - /docs/schedules/cron-jobs
  - /docs/schedules
related:
  - /docs/projects/managing-projects
  - /docs/functions
  - /docs/project-configuration/vercel-json
  - /docs/cron-jobs
  - /docs/deployments/environments
summary: Learn how to schedule cron jobs to run at specific times or intervals.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/cron-jobs/quickstart.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "2f8530eb6e3c067647cb106a29213ac7db24e862431012650814f09ec4739cbd"
---

# Getting started with cron jobs

Cron Jobs are a legacy feature and will be migrated to


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Cron Jobs](https://vercel.com/blog/cron-jobs)
- [Vercel Cron Jobs are now generally available](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available)
- [Run scheduled jobs with Vercel Cron Jobs and Vercel Functions](https://vercel.com/changelog/run-scheduled-jobs-with-vercel-cron-jobs-and-vercel-functions)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Run cron jobs from deployment summary](https://vercel.com/changelog/run-cron-jobs-from-deployment-summary)
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart) — Build your first Vercel Function in a few steps.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy

Full cross-link map for this page: [/docs/schedules/cron-jobs/quickstart.graph.md](/docs/schedules/cron-jobs/quickstart.graph.md)
<!-- /docsgraph:related -->

Schedules

in the future. Schedules include timezones, private function and queue targets. You can also create schedules at runtime.

Migrate your Cron Jobs to Schedules

.

This guide will help you get started with using cron jobs on Vercel. Cron jobs are scheduled tasks that run at specific times or intervals. They are useful for automating tasks. You will learn how to create a cron job that runs every day at 5 am UTC by creating a Vercel Function and configuring it in your `vercel.json` file.

**Agent prompt**

```text
Help me set up a Cron Job in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Create a Vercel Function at app/api/hello/route.ts that runs a scheduled task. 2. Add a cron schedule to vercel.json that triggers this function on a recurring schedule. 3. Run `vercel env pull` to sync environment variables locally. 4. Deploy with `vercel --prod` and use `vercel crons ls` to verify the cron job is configured.
```

## Prerequisites

- [A Vercel account](/signup)
- [A project](/docs/projects/managing-projects#creating-a-project) with a [Vercel Function](/docs/functions)

- ### Create a function
  This function contains the code that will be executed by the cron job. This example function returns a greeting.
  > For \['nextjs']:
  > **💡 Note:** To stream responses you must use Route Handlers in the App Router, even if the
  > rest of your app uses the Pages Router.
  ```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs
  export function GET(request: Request) {
    return new Response('Hello from Vercel!');
  }
  ```
  ```js v0="build" filename="app/api/hello/route.js" framework=nextjs
  export function GET(request) {
    return new Response('Hello from Vercel!');
  }
  ```
  ```ts filename="api/hello.ts" framework=other
  export function GET(request: Request) {
    return new Response('Hello from Vercel!');
  }
  ```
  ```js filename="api/hello.js" framework=other
  export function GET(request) {
    return new Response('Hello from Vercel!');
  }
  ```
  ```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs-app
  export function GET(request: Request) {
    return new Response('Hello from Vercel!');
  }
  ```
  ```js v0="build" filename="app/api/hello/route.js" framework=nextjs-app
  export function GET(request) {
    return new Response('Hello from Vercel!');
  }
  ```

- ### Create or update your `vercel.json` file
  Create or go to your [`vercel.json`](/docs/project-configuration/vercel-json#functions) file and add the following code:
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "crons": [
      {
        "path": "/api/hello",
        "schedule": "0 5 * * *"
      }
    ]
  }
  ```
  The `crons` property is an array of cron jobs. Each cron job has two properties:
  - The `path`, which must start with `/`
  - The `schedule` property, which must be a string that represents a [cron expression](/docs/cron-jobs#cron-expressions). In this example, the job is scheduled to execute every day at 5:00 am UTC

- ### Deploy your project.
  When you deploy your project, Vercel's build process creates the cron job. Vercel invokes cron jobs only for [production](/docs/deployments/environments#production-environment) deployments and not for [preview](/docs/deployments/environments#preview-environment-pre-production) deployments

  You can also deploy to your production domain using the CLI:
  ```bash filename="terminal"
  vercel deploy --prod
  ```

Your cron job is now active and will call the `/api/hello` path every day at 5:00 am UTC.

## Next steps

Now that you have created a cron job, you can learn more about how to manage and configure them:

- [Learn about managing cron jobs](/docs/cron-jobs/manage-cron-jobs)
- [Explore usage and pricing](/docs/cron-jobs/usage-and-pricing)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
