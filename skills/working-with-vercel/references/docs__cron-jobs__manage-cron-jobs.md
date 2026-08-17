---
title: Managing Cron Jobs
product: vercel
url: /docs/cron-jobs/manage-cron-jobs
canonical_url: "https://vercel.com/docs/cron-jobs/manage-cron-jobs"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cron-jobs
related:
  - /docs/cron-jobs
  - /docs/cron-jobs/usage-and-pricing
  - /docs/functions
  - /docs/functions/runtimes
  - /docs/logs/runtime
summary: Learn how to manage Cron Jobs effectively in Vercel. Explore cron job duration, error handling, deployments, concurrency control, local execution,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cron-jobs/manage-cron-jobs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "493cd8ee91311c4f2fda589e8946236c876673400c9c9f3641120466a0e36f60"
---

# Managing Cron Jobs

> **🔒 Permissions Required**: Cron Jobs


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Translate Kubernetes manifests to vercel.json](https://vercel.com/kb/guide/kubernetes-manifests-to-vercel-json?from=related) — Translate Kubernetes Deployments, Services, Ingress, ConfigMaps, and CronJobs into vercel.json configuration and Vercel
- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs?from=related) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [How to Setup Cron Jobs on Vercel](https://vercel.com/kb/guide/how-to-setup-cron-jobs-on-vercel?from=related) — Learn how to setup and use cron jobs on Vercel
- [Schedules](https://eve.dev/docs/schedules?from=related) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel?from=related) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [Getting Started](https://vercel.com/docs/cron-jobs/quickstart?from=related) — Learn how to schedule cron jobs to run at specific times or intervals.
- [vercel crons](https://vercel.com/docs/cli/crons?from=related) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Limits](https://vercel.com/docs/limits?from=related) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.
- [Celery](https://vercel.com/docs/frameworks/backend/celery?from=related) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Builds](https://vercel.com/docs/builds?from=related) — Understand how the build step works when creating a Vercel Deployment.

Full cross-link map for this page: [/docs/cron-jobs/manage-cron-jobs.graph.md](/docs/cron-jobs/manage-cron-jobs.graph.md)
<!-- /docsgraph:related -->

## Viewing cron jobs

To view your active cron jobs:

1. Select your project from the Vercel dashboard
2. Open **Settings** in the sidebar and select [**Cron Jobs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fcron-jobs\&title=Go+to+Cron+Jobs+settings)

## Cron jobs maintenance

- **Updating Cron Jobs**: Change the [expression](/docs/cron-jobs#cron-expressions) in `vercel.json` file or the function's configuration, and then redeploy
- **Deleting Cron Jobs**: Remove the configuration from the `vercel.json` file or the function's configuration, and then redeploy
- **Disabling Cron Jobs**: Click the **Disable Cron Jobs** button

> **💡 Note:** Disabled cron jobs will still be listed and will count towards your [cron jobs
> limits](/docs/cron-jobs/usage-and-pricing)

## Securing cron jobs

It is possible to secure your cron job invocations by adding an environment variable called `CRON_SECRET` to your Vercel project. We recommend using a random string of at least 16 characters for the value of `CRON_SECRET`. A password generator, like [1Password](https://1password.com/password-generator/), can be used to create one.

The value of the variable will be automatically sent as an `Authorization` header when Vercel invokes your cron job. Your endpoint can then compare both values, the authorization header and the environment variable, to verify the authenticity of the request.

> **💡 Note:** You can use App Router [Route
> Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
> to secure your cron jobs, even when using the Pages Router.

```ts filename="app/api/cron/route.ts" framework=nextjs
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  return Response.json({ success: true });
}
```

```js filename="app/api/cron/route.js" framework=nextjs
export function GET(request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  return Response.json({ success: true });
}
```

```ts filename="app/api/cron/route.ts" framework=nextjs-app
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  return Response.json({ success: true });
}
```

```js filename="app/api/cron/route.js" framework=nextjs-app
export function GET(request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  return Response.json({ success: true });
}
```

```ts filename="api/cron/route.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const authHeader = request.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return response.status(401).json({ success: false });
  }

  response.status(200).json({ success: true });
}
```

```js filename="api/cron/route.js" framework=other
export default function handler(request, response) {
  const authHeader = request.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return response.status(401).json({ success: false });
  }

  response.status(200).json({ success: true });
}
```

The `authorization` header will have the `Bearer` prefix for the value.

> For \['nextjs-app', 'nextjs']:

For those using TypeScript versions below 5.2, it's important to adapt the code to `import NextResponse from 'next/server'` and use `NextResponse.json` for the response. This ensures compatibility with earlier TypeScript versions in Next.js applications. In TypeScript 5.2 and above, the standard `new Response` pattern should be used.

## Reading the cron schedule header

Every cron job request includes the `x-vercel-cron-schedule` header, which contains the cron expression that triggered the invocation. This is useful when multiple cron jobs share the same path but run on different schedules:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/sync",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/sync",
      "schedule": "0 0 * * *"
    }
  ]
}
```

You can read the header in your cron route to determine which schedule triggered the request:

```ts filename="app/api/sync/route.ts" framework=nextjs
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const schedule = request.headers.get('x-vercel-cron-schedule');

  if (schedule === '0 0 * * *') {
    // Run full daily sync
  } else {
    // Run incremental sync
  }

  return Response.json({ success: true });
}
```

```js filename="app/api/sync/route.js" framework=nextjs
export function GET(request) {
  const schedule = request.headers.get('x-vercel-cron-schedule');

  if (schedule === '0 0 * * *') {
    // Run full daily sync
  } else {
    // Run incremental sync
  }

  return Response.json({ success: true });
}
```

```ts filename="app/api/sync/route.ts" framework=nextjs-app
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const schedule = request.headers.get('x-vercel-cron-schedule');

  if (schedule === '0 0 * * *') {
    // Run full daily sync
  } else {
    // Run incremental sync
  }

  return Response.json({ success: true });
}
```

```js filename="app/api/sync/route.js" framework=nextjs-app
export function GET(request) {
  const schedule = request.headers.get('x-vercel-cron-schedule');

  if (schedule === '0 0 * * *') {
    // Run full daily sync
  } else {
    // Run incremental sync
  }

  return Response.json({ success: true });
}
```

```ts filename="api/sync.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const schedule = request.headers['x-vercel-cron-schedule'];

  if (schedule === '0 0 * * *') {
    // Run full daily sync
  } else {
    // Run incremental sync
  }

  response.status(200).json({ success: true });
}
```

```js filename="api/sync.js" framework=other
export default function handler(request, response) {
  const schedule = request.headers['x-vercel-cron-schedule'];

  if (schedule === '0 0 * * *') {
    // Run full daily sync
  } else {
    // Run incremental sync
  }

  response.status(200).json({ success: true });
}
```

## Cron job duration

The duration limits for Cron jobs are identical to those of [Vercel Functions](/docs/functions#limits). See the [`maxDuration`](/docs/functions/runtimes#max-duration) documentation for more information.

In most cases, these limits are sufficient. However, if you need more processing time, it's recommended to split your cron jobs into different units or distribute your workload by combining cron jobs with regular HTTP requests with your API.

## Cron job error handling

Vercel will not retry an invocation if a cron job fails. You can check for error [logs](/docs/logs/runtime) through the **View Log** button in the **Cron Jobs** section in the sidebar.

## Cron jobs with dynamic routes

Cron jobs can be created for [dynamic routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes):

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/sync-slack-team/T0CAQ10TZ",
      "schedule": "0 5 * * *"
    },
    {
      "path": "/api/sync-slack-team/T4BOE34OP",
      "schedule": "0 5 * * *"
    }
  ]
}
```

## Handling nonexistent paths

If you create a cron job for a path that doesn't exist, it generates a [404 error](/docs/errors#404:-not_found). However, **Vercel still executes your cron job**. You can analyze your logs to check if there are any issues.

## Cron jobs and deployments

Creating a new deployment will not interrupt your running cron jobs; they will continue until they finish.

## Controlling cron job concurrency

If your cron job runs longer than the interval between invocations, Vercel can trigger a second instance while the first is still running. This can lead to race conditions, duplicate processing, or data corruption.

To prevent concurrent runs, use a lock mechanism like [Redis distributed locks](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/) in your cron job. A lock ensures only one instance runs at a time by checking if another instance is already active before starting.

You can also prevent overlapping runs by:

- **Reducing execution time**: Optimize your job to finish before the next invocation
- **Setting timeouts**: Use [`maxDuration`](/docs/functions/runtimes#max-duration) to force long-running jobs to stop
- **Increasing the interval**: Run your cron job less frequently

### Cron job delivery and idempotency

Cron job delivery is best effort. Most invocations run as scheduled, but occasional transient network errors can prevent a request from reaching your function. In those cases, your function does not execute, and no runtime log is created for that scheduled run.

Cron delivery can also occasionally invoke the same scheduled run more than once. Because of this, cron jobs should be resilient to both missed runs and duplicate runs.

Design your operations to be **idempotent** and reconciliation-based so each run can safely reprocess outstanding work since the last successful run. For example:

- **Good**: "Set user status to active" (running twice has the same effect)
- **Bad**: "Increment user credit by 10" (running twice doubles the credit)

To make operations resilient:

- Use unique IDs to track which events you've already processed
- Check state before making changes (e.g., "if not already active, then activate")
- Store results with timestamps or version numbers
- Query and process all work since the last successful run to catch up after a missed invocation

Use both locks (to prevent concurrent runs) and idempotent reconciliation (to handle duplicate or missed runs safely) for the most reliable cron jobs.

## Running cron jobs locally

Cron jobs are API routes. You can run them locally by making a request to their endpoint. For example, if your cron job is in `/api/cron`, you could visit the following endpoint in your browser: `http://localhost:3000/api/cron`. You should be aware that while your browser may follow redirects, [cron job invocations in production will not](#cron-jobs-and-redirects) follow redirects.

There is currently no support for `vercel dev`, `next dev`, or other framework-native local development servers.

## Cron jobs and redirects

Cron jobs do not follow redirects. When a cron-triggered endpoint returns a 3xx redirect status code, the job completes without further requests. Redirect responses are treated as final for each invocation.

The view logs button on the cron job overview can be used to verify the response of the invocations and gain further insights.

## Cron jobs logs

Cron jobs are logged as function invocations from the **Logs** section in your project dashboard sidebar(/dashboard). You can view the logs for a cron job from the list on the [Cron jobs settings page](/docs/cron-jobs/manage-cron-jobs#viewing-cron-jobs) of the project:

1. From the list of cron jobs, select **View Logs**.
2. This will take you to the [runtime logs](/docs/logs/runtime#request-path) view with a `requestPath` filter to your cron job such as `requestPath:/api/my-cron-job`.

See [how to view runtime logs](/docs/logs/runtime#view-runtime-logs) for more information.

Note that when cron jobs respond with a redirect or a cached response, they will not be shown in the logs.

## Cron jobs accuracy

Hobby users have two cron job restrictions. First, cron jobs can only run [once per day](/docs/cron-jobs/usage-and-pricing#hobby-scheduling-limits). Expressions that run more frequently will fail deployment. Second, Vercel may invoke these cron jobs at any point within the specified hour to help distribute load across all accounts. For example, an expression like `0 8 * * *` could trigger an invocation anytime between `08:00:00` and `08:59:59`.

For all other teams, cron jobs will be invoked within the minute specified. For instance, the expression `5 8 * * *` would trigger an invocation between `08:05:00` and `08:05:59`.

## Rollbacks with cron jobs

If you [Instant Rollback](/docs/instant-rollback) to a previous deployment, active cron jobs **will not** be updated. They will continue to run as scheduled until they are manually disabled or updated.


---

[View full sitemap](/docs/sitemap)
