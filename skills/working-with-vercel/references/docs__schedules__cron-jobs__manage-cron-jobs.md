---
title: Managing Cron Jobs
product: vercel
url: /docs/schedules/cron-jobs/manage-cron-jobs
canonical_url: "https://vercel.com/docs/schedules/cron-jobs/manage-cron-jobs"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/schedules/cron-jobs
  - /docs/schedules
related:
  - /docs/cron-jobs
  - /docs/instant-rollback
  - /docs/cron-jobs/usage-and-pricing
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/deployments/managing-deployments
summary: Learn how to manage Cron Jobs effectively in Vercel. Explore cron job duration, error handling, deployments, concurrency control, local execution,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/cron-jobs/manage-cron-jobs.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "edba59323ed992e73f2d18ce34714f26d7b1d1e65bd80b512474b556f50f1792"
---

# Managing Cron Jobs

Cron Jobs are a legacy feature and will be migrated to


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Cron Jobs](https://vercel.com/blog/cron-jobs)
- [Vercel Cron Jobs are now generally available](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available)
- [Why aren't commits triggering deployments on Vercel?](https://vercel.com/kb/guide/why-aren-t-commits-triggering-deployments-on-vercel) — Commits not triggering deployments on Vercel? Walk the diagnostic checklist covering authentication, commit author acces
- [ Run a Docker monolith with workers on Vercel](https://vercel.com/kb/guide/docker-monolith-workers-vercel) — Run a Dockerized monolith on Vercel with Container Images, move long-running workers to Vercel Queues and Vercel Workflo
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Handling Scheduled Runs](https://vercel.com/docs/schedules/handle-runs) — Write the private function, route, or queue consumer that a schedule runs, and make it safe to run more than once.
- [Rolling Releases](https://vercel.com/docs/rolling-releases) — Learn how to use Rolling Releases for more cautious deployments.
- [Limits](https://vercel.com/docs/limits) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.

Full cross-link map for this page: [/docs/schedules/cron-jobs/manage-cron-jobs.graph.md](/docs/schedules/cron-jobs/manage-cron-jobs.graph.md)
<!-- /docsgraph:related -->

Schedules

in the future. Schedules include timezones, private function and queue targets. You can also create schedules at runtime.

Migrate your Cron Jobs to Schedules

.

> Cron Jobs are available on all plans

## Viewing cron jobs

To view your active cron jobs:

1. Select your project from the Vercel dashboard
2. Open **Schedules** in the sidebar and select the [**Cron Jobs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fschedules%2Fcron-jobs\&title=Go+to+Cron+Jobs) tab

## Cron jobs maintenance

- **Updating Cron Jobs**: Change the [expression](/docs/cron-jobs#cron-expressions) in `vercel.json` file or the function's configuration, and then redeploy
- **Deleting Cron Jobs**: Remove the configuration from the `vercel.json` file or the function's configuration, and then redeploy
- **Disabling Cron Jobs**: Click the **Disable Cron Jobs** button

The **Disable Cron Jobs** setting applies to the project and persists across deployment promotions and [Instant Rollbacks](/docs/instant-rollback). If you disable cron jobs, they remain disabled until you explicitly re-enable them on the project's **Cron Jobs** tab under **Schedules**.

> **💡 Note:** Disabled cron jobs will still be listed and will count towards your [cron jobs
> limits](/docs/cron-jobs/usage-and-pricing)

## Securing cron jobs

It is possible to secure your cron job invocations by adding an environment variable called `CRON_SECRET` to your Vercel project. We recommend using a random string of at least 16 characters for the value of `CRON_SECRET`. A password generator, like [1Password](https://1password.com/password-generator/), can be used to create one.

The value of the variable will be automatically sent as an `Authorization` header when Vercel invokes your cron job. Your endpoint can then compare both values, the authorization header and the environment variable, to verify the authenticity of the request.

Because Vercel sends the value in an HTTP header, use only characters that are valid in a header value, such as letters and numbers. Don't include line breaks or leading or trailing spaces, which can be added when you paste the value. If the header doesn't match the value your code reads, your endpoint returns `401` for every invocation.

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

### Which `CRON_SECRET` value Vercel sends

A deployment captures `CRON_SECRET` from your project settings when it builds, and keeps that copy for its lifetime. Vercel invokes cron jobs on the production deployment serving your production domain, and sends that deployment's copy in the `Authorization` header.

Editing `CRON_SECRET` in project settings changes nothing until your next deployment. Vercel keeps sending the old secret, and your function keeps reading the old secret from the same deployment, so the check in your handler still passes.

### Rotating `CRON_SECRET`

Rotate `CRON_SECRET` by updating the environment variable, deploying, and then checking the first invocation:

> **💡 Note:** If you stored `CRON_SECRET` as a [Secret environment
> variable](/docs/environment-variables/sensitive-environment-variables), Vercel
> won't show the value again once you save it. Record the new secret in your own
> secret manager first.

1. Open [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in your project settings and edit `CRON_SECRET` for the Production environment.
2. [Redeploy your project](/docs/deployments/managing-deployments#redeploy-a-project), or push a commit to your production branch. Every new deployment picks up the latest environment variable values.
3. Wait for the new deployment to become **Current**. Vercel sends the new secret from the next scheduled invocation onward.
4. Open the [**Cron Jobs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fschedules%2Fcron-jobs\&title=Go+to+Cron+Jobs) tab under **Schedules**, select **View Logs** for the job, and confirm that the first invocation after the rotation returned a 2xx status.

Both the header and the secret your function reads come from one deployment. Your handler never sees a mismatched pair, so it doesn't need to accept the old and new secrets at once.

A 401 in the log means your handler rejected the secret Vercel sent. Check whether the deployment serving production predates your edit, then redeploy and read the log again. If a 401 survives a successful redeploy, confirm that `CRON_SECRET` is set for the Production environment, because the handler also returns 401 when it can't read the variable at all.

Promotions and rollbacks change which copy Vercel sends. See [Rollbacks and promotions with cron jobs](#rollbacks-and-promotions-with-cron-jobs).

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

The duration limits for Cron jobs are identical to those of [Vercel Functions](/docs/functions/limitations#max-duration). See the [`maxDuration`](/docs/functions/limitations#max-duration) documentation for more information.

In most cases, these limits are sufficient. However, if you need more processing time, it's recommended to split your cron jobs into different units or distribute your workload by combining cron jobs with regular HTTP requests with your API.

## Cron job error handling

Vercel will not retry an invocation if a cron job fails. You can check for error [logs](/docs/logs/runtime) through the **View Logs** button on the **Cron Jobs** tab under **Schedules**.

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

If you create a cron job for a path that doesn't exist, it generates a [404 error](/docs/errors/NOT_FOUND). However, **Vercel still executes your cron job**. You can analyze your logs to check if there are any issues.

## Cron jobs and deployments

Creating a new deployment will not interrupt your running cron jobs; they will continue until they finish.

## Controlling cron job concurrency

If your cron job runs longer than the interval between invocations, Vercel can trigger a second instance while the first is still running. This can lead to race conditions, duplicate processing, or data corruption.

To prevent concurrent runs, use a lock mechanism like [Redis distributed locks](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/) in your cron job. A lock ensures only one instance runs at a time by checking if another instance is already active before starting.

You can also prevent overlapping runs by:

- **Reducing execution time**: Optimize your job to finish before the next invocation
- **Setting timeouts**: Use [`maxDuration`](/docs/functions/limitations#max-duration) to force long-running jobs to stop
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

A common source of redirects is the Next.js [`trailingSlash`](https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash) option. When it's enabled, a request to `/api/cron` redirects to `/api/cron/`, so the cron job never reaches your function. Add the trailing slash to the `path` in your cron job configuration, such as `"path": "/api/cron/"`.

The view logs button on the cron job overview can be used to verify the response of the invocations and gain further insights.

## Cron jobs logs

Cron jobs are logged as function invocations from the **Logs** section in your project dashboard sidebar(/dashboard). You can view the logs for a cron job from the list on the project's [Cron Jobs tab](/docs/cron-jobs/manage-cron-jobs#viewing-cron-jobs):

1. From the list of cron jobs, select **View Logs**.
2. This will take you to the [runtime logs](/docs/logs/runtime#request-path) view with a `requestPath` filter to your cron job such as `requestPath:/api/my-cron-job`.

See [how to view runtime logs](/docs/logs/runtime#view-runtime-logs) for more information.

Note that when cron jobs respond with a redirect or a cached response, they will not be shown in the logs.

## Cron jobs accuracy

Hobby users have two cron job restrictions. First, cron jobs can only run [once per day](/docs/cron-jobs/usage-and-pricing#hobby-scheduling-limits). Expressions that run more frequently will fail deployment. Second, Vercel may invoke these cron jobs at any point within the specified hour to help distribute load across all accounts. For example, an expression like `0 8 * * *` could trigger an invocation anytime between `08:00:00` and `08:59:59`.

For all other teams, cron jobs will be invoked within the minute specified. For instance, the expression `5 8 * * *` would trigger an invocation between `08:05:00` and `08:05:59`.

## Rollbacks and promotions with cron jobs

When you [Instant Rollback](/docs/instant-rollback) to a previous deployment, Vercel restores the cron job definitions associated with that deployment. If cron jobs are enabled for the project, Vercel invokes those jobs from the next scheduled invocation onward.

Instant Rollback preserves the project's **Disable Cron Jobs** setting.

### Which `CRON_SECRET` value a rollback restores

Rolling back restores the target deployment's copy of `CRON_SECRET` along with its cron job definitions. If you rotated the secret after that deployment was built, the rollback puts the older secret back in use, and the handler on that deployment already expects it. You don't need the plaintext to recover a secret this way.

You can only roll back to a deployment that [previously served production traffic](/docs/instant-rollback#eligible-deployments), and your plan decides how far back you can reach for an older secret. On Pro and Enterprise, you can roll back to any eligible deployment. On Hobby, you can only roll back to the immediately previous deployment. Your [deployment retention policy](/docs/deployment-retention) decides how long those deployments stay available.

Redeploying an older deployment won't bring its secret back. A redeploy builds a new deployment, which captures whatever your project settings hold now. See [Rotating environment variables](/docs/environment-variables/rotating-secrets).

### Which `CRON_SECRET` value a promotion uses

A promotion that rebuilds captures your current project settings. A promotion that only moves domains keeps the deployment's existing copy:

| Action                                                                                                                                | Rebuilds | Secret sent with cron invocations   |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------- |
| [Promote a preview deployment to production](/docs/deployments/promoting-a-deployment#promote-a-deployment-from-preview-to-production) | Yes      | Your current project settings value |
| [Promote a staged production build](/docs/deployments/promoting-a-deployment#staging-and-promoting-a-production-deployment)            | No       | The promoted deployment's own copy  |
| [Instant Rollback](/docs/instant-rollback)                                                                                             | No       | The target deployment's own copy    |

### Scheduled runs during a promotion or rollback

Your production domains move first, and Vercel repoints the cron schedules at the new deployment shortly after. A run scheduled inside that gap can still reach the deployment you just moved away from, or it can be skipped.

The secret stays correct either way, because each invocation carries the secret of the deployment it reaches. Plan for a missed or repeated run instead, following [Cron job delivery and idempotency](#cron-job-delivery-and-idempotency).

## Troubleshooting cron jobs

If a cron job doesn't run or doesn't appear in the logs, check these causes:

| Symptom | Cause | Fix |
| --- | --- | --- |
| The job doesn't run on a preview deployment | Cron jobs run only on production deployments. | Test the endpoint by requesting it directly, and check scheduled runs on the production deployment. |
| The job doesn't run at the expected time | The expression doesn't match the intended schedule, or your plan restricts how often jobs run. | Check the expression and the [usage and pricing](/docs/cron-jobs/usage-and-pricing) limits for your plan. Hobby jobs can run [anywhere within the scheduled hour](#cron-jobs-accuracy). |
| Every invocation returns `401` | The `Authorization` header doesn't match `CRON_SECRET`. | Check the value for characters that aren't valid in a header. See [Securing cron jobs](#securing-cron-jobs). |
| The job runs but doesn't appear in the logs | The endpoint returned a redirect or a cached response. | Remove the redirect, such as one caused by `trailingSlash`. See [Cron jobs and redirects](#cron-jobs-and-redirects). In a Next.js route handler, add `export const dynamic = 'force-dynamic';` so the function runs on every invocation. |
| The job is blocked before it reaches your function | A [WAF custom rule](/docs/vercel-firewall/vercel-waf/custom-rules) matches the cron request. | Review your firewall rules and exclude the cron job's path from rules that deny or challenge traffic. |
| The job targets the wrong path | The function was renamed or moved after you configured the job. | Update the `path` in your cron job configuration to match a route in the deployment. |
| The job isn't listed on the Cron Jobs tab | The build didn't register the job. | Run [`vercel build --prod`](/docs/cli/build) locally and confirm that `.vercel/output/config.json` contains a `crons` array with your job. |

A valid build registers each job in `.vercel/output/config.json`:

```json filename=".vercel/output/config.json"
{
  "crons": [{ "path": "/api/example-cron", "schedule": "0 5 * * *" }]
}
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
