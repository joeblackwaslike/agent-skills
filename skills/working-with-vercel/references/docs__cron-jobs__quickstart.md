---
title: Getting started with cron jobs
product: vercel
url: /docs/cron-jobs/quickstart
canonical_url: "https://vercel.com/docs/cron-jobs/quickstart"
last_updated: 2026-08-11
type: tutorial
prerequisites:
  - /docs/cron-jobs
related:
  - /docs/projects
  - /docs/functions
  - /docs/project-configuration/vercel-json
  - /docs/cron-jobs
  - /docs/deployments/environments
summary: Learn how to schedule cron jobs to run at specific times or intervals.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cron-jobs/quickstart.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7edf7f090a7988938edac56eaf3579dcc72b0112bb03a8b53eb6f9a1ef32d4e5"
---

# Getting started with cron jobs

This guide will help you get started with using cron jobs on Vercel. Cron jobs are scheduled tasks that run at specific times or intervals. They are useful for automating tasks. You will learn how to create a cron job that runs every day at 5 am UTC by creating a Vercel Function and configuring it in your `vercel.json` file.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Setup Cron Jobs on Vercel](https://vercel.com/kb/guide/how-to-setup-cron-jobs-on-vercel?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to setup and use cron jobs on Vercel
- [How to run background jobs in Next.js](https://vercel.com/kb/guide/how-to-run-background-jobs-in-nextjs-on-vercel?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn the durable way to run background jobs in Next.js on Vercel with the Workflow SDK, and when to reach for Queues or
- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [Introducing Vercel Cron Jobs](https://vercel.com/blog/cron-jobs?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Vercel Cron Jobs are now generally available](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Run scheduled jobs with Vercel Cron Jobs and Vercel Functions](https://vercel.com/changelog/run-scheduled-jobs-with-vercel-cron-jobs-and-vercel-functions?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related)
- [vercel crons](https://vercel.com/docs/cli/crons?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Build your first Vercel Function in a few steps.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.

Full cross-link map for this page: [/docs/cron-jobs/quickstart.graph.md](/docs/cron-jobs/quickstart.graph.md?from=related&source_path=%2Fdocs%2Fcron-jobs%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me set up a Cron Job in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Create a Vercel Function at app/api/cron/route.ts that runs a scheduled task. 2. Add a cron schedule to vercel.json that triggers this function on a recurring schedule. 3. Run `vercel env pull` to sync environment variables locally. 4. Deploy with `vercel --prod` and use `vercel inspect` to verify the cron job is configured.
```

## Prerequisites

- [A Vercel account](/signup)
- [A project](/docs/projects#creating-a-project) with a [Vercel Function](/docs/functions)

- ### Create a function
  This function contains the code that will be executed by the cron job. This example uses a simple function that returns the user's region.
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
