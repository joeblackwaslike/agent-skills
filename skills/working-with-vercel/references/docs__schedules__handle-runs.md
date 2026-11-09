---
title: Handling Scheduled Runs
product: vercel
url: /docs/schedules/handle-runs
canonical_url: "https://vercel.com/docs/schedules/handle-runs"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/schedules/configuration
  - /docs/services
  - /docs/schedules/sdk
  - /docs/cron-jobs
  - /docs/environment-variables
summary: Write the private function, route, or queue consumer that a schedule runs, and make it safe to run more than once.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/handle-runs.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "1eff6a77ffda0d0980801c117c1e4f33d736e24e5e56a2d70d27b59dd226d30c"
---

# Handling Scheduled Runs

When a schedule fires, Vercel delivers a run to the schedule's target. This page shows how to write the code that receives the run for each target type.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Managing Schedules](https://vercel.com/docs/schedules/manage) — View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI,
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [vercel schedules](https://vercel.com/docs/cli/schedules) — Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a loca

Full cross-link map for this page: [/docs/schedules/handle-runs.graph.md](/docs/schedules/handle-runs.graph.md)
<!-- /docsgraph:related -->

## Choosing a target

| Target | Use it when | Retries | Available for |
| --- | --- | --- | --- |
| [Function](#function-targets) | You want a private function that nobody else can call. | No | Static schedules |
| [Path](#path-targets) | You're migrating a Cron Job, or the route must stay public. | No | Static schedules |
| [Queue topic](#queue-targets) | Failed runs must be retried, or you need a payload or dynamic schedules. | Yes | Static and dynamic schedules |

Only path targets use `CRON_SECRET`. Function and queue targets don't need it, and Vercel doesn't send it to them. You don't have to set `CRON_SECRET` to use Schedules.

## Function targets

A function target runs a Vercel Function that has no public URL. Only Vercel's scheduler can invoke it, so you don't need to check a secret.

1. Install the SDK:

   ```bash package-manager
   npm i @vercel/schedules
   ```

2. Create the function and wrap your task in `handleSchedule`:

   ```ts filename="api/cleanup.ts"
   import { handleSchedule } from '@vercel/schedules';

   export const POST = handleSchedule(async (metadata, request) => {
     console.log(`${metadata.name} run ${metadata.executionId}`);
     await deleteExpiredRecords();
   });
   ```

3. Add a `schedule/v1beta` trigger to the function and point a schedule at it in `vercel.json`:

   ```json filename="vercel.json"
   {
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

   The `function` value is the function's build output path, not its source filename. See [Function identifiers](/docs/schedules/configuration#function-identifiers). For a function in a [service](/docs/services), also set [`service`](/docs/schedules/configuration#target-a-function-in-a-service).

A function with the `schedule/v1beta` trigger can't also have a queue trigger.

### What `handleSchedule` does

`handleSchedule` reads the run's details from the request headers and passes them to your callback with the original `Request`:

- If the request isn't a valid schedule run, it returns a `400` response and doesn't call your callback.
- If your callback finishes, it returns a `200` response.
- If your callback throws, the error propagates to your framework or runtime, which typically returns a `500` response.

The response status shows up in your function logs and the schedule's execution history. It doesn't affect the schedule, and Vercel doesn't retry the run.

The callback's first argument is [`ScheduleMetadata`](/docs/schedules/sdk#schedule-metadata):

| Field | Type | Description |
| --- | --- | --- |
| `scheduleId` | `string` | ID of the schedule |
| `executionId` | `string` | ID of this run. Stays the same if the run is delivered more than once. |
| `name` | `string` | Schedule name |
| `namespace` | `string` | Schedule namespace. Static schedules use `default`. |
| `scheduledAt` | `Date` | Time the expression matched. Doesn't include jitter, so the run can arrive later. |
| `source` | `string` | `static` or `dynamic` |
| `expression` | `string` | The cron expression, or the local datetime of a one-time schedule |

To read the details without wrapping your handler, call `parseScheduleEvent(request)`. It returns the same `ScheduleMetadata`, or throws a `ScheduleEventParseError` if the request isn't a schedule run.

### Handle several schedules in one function

Several schedules can target the same function. Use `metadata.name` to decide what to run:

```ts filename="api/maintenance.ts"
import { handleSchedule } from '@vercel/schedules';

export const POST = handleSchedule(async (metadata) => {
  switch (metadata.name) {
    case 'hourly-cleanup':
      await deleteExpiredRecords();
      break;
    case 'nightly-report':
      await sendReport();
      break;
  }
});
```

## Path targets

A path target sends an HTTP request to a route on your deployment, like a [Cron Job](/docs/cron-jobs). The route is public, so anyone can call it. Protect it with a secret.

1. Add a schedule with a `path` in `vercel.json`. Path schedules send a `POST` request by default. Set `requestMethod` to `GET` if your route handles `GET`:

   ```json filename="vercel.json"
   {
     "schedules": {
       "daily-report": {
         "schedule": "0 9 * * *",
         "path": "/api/daily-report",
         "requestMethod": "GET"
       }
     }
   }
   ```

2. Add a `CRON_SECRET` [environment variable](/docs/environment-variables) to your project. Use a random string of at least 16 characters. Vercel sends it in the `Authorization` header of every path request.

3. Check the header in your route before doing any work:

   ```ts filename="api/daily-report.ts"
   export async function GET(request: Request) {
     const authHeader = request.headers.get('authorization');
     const cronSecret = process.env.CRON_SECRET;

     if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
       return new Response('Unauthorized', { status: 401 });
     }

     await sendReport();
     return new Response(null, { status: 200 });
   }
   ```

Path requests include the same headers as Cron Job requests, plus the schedule headers that function targets receive. That means:

- A route that already handles a Cron Job keeps working.
- You can wrap a path route in `handleSchedule` to read `ScheduleMetadata`. `handleSchedule` accepts both `GET` and `POST`. It doesn't check `CRON_SECRET`, so keep the check.

See [Request headers](#request-headers) for the full list.

### Which `CRON_SECRET` value Vercel sends

When a deployment becomes the current deployment of its environment, Vercel reads `CRON_SECRET` from that deployment's environment variables and stores it with each of the deployment's path schedules. Every run of those schedules sends that stored value, including runs you start manually.

A deployment's environment variables are fixed when it's built, so the value Vercel sends and the value your route reads always come from the same deployment. Your route doesn't need to accept an old and a new secret at once.

| Action | `CRON_SECRET` sent with path requests |
| --- | --- |
| Edit `CRON_SECRET` in project settings without deploying | Unchanged. Vercel keeps sending the current deployment's value. |
| Deploy, or [promote a preview deployment](/docs/deployments/promoting-a-deployment#promote-a-deployment-from-preview-to-production) to production | The new deployment's value, which comes from your project settings at build time |
| [Promote a staged production build](/docs/deployments/promoting-a-deployment#staging-and-promoting-a-production-deployment) | The promoted deployment's value, from when it was built |
| [Instant Rollback](/docs/instant-rollback) | The value of the deployment you roll back to |
| Remove `CRON_SECRET` and deploy | None. Vercel stops sending the `authorization` header. |

To rotate the secret, update `CRON_SECRET` for the environment, then redeploy or push a commit. Vercel sends the new value once the new deployment becomes current. Rolling back to an older deployment puts its older secret back in use, and the route on that deployment already expects it. Redeploying an older deployment doesn't restore its secret, because the redeploy is a new build that reads your current project settings.

If the value contains characters that aren't valid in an HTTP header, such as a trailing newline, a build that defines a path schedule fails with `INVALID_CRON_SECRET`. Update the variable and redeploy. If a deployment with an invalid value still becomes current, for example one built before this check, Vercel skips each run instead of sending the request.

## Queue targets

A queue target publishes a message to a [Vercel Queues](/docs/queues) topic each time the schedule fires. A consumer on that topic processes the message. If the consumer fails, the queue retries it.

Queue topics are the only target for dynamic schedules, and the only target that supports a payload.

1. Install the Queues and Schedules SDKs:

   ```bash package-manager
   npm i @vercel/queue @vercel/schedules
   ```

2. Create a consumer with `handleCallback`:

   ```ts filename="api/daily-reports.ts"
   import { handleCallback } from '@vercel/queue';
   import type { ScheduleQueueMessage } from '@vercel/schedules';

   type ReportPayload = { reportType: string };

   export const POST = handleCallback<ScheduleQueueMessage<ReportPayload>>(
     async (message) => {
       console.log(`Running ${message.name}, scheduled for ${message.scheduledAt}`);
       await generateReport(message.payload?.reportType ?? 'summary');
     },
   );
   ```

   [`ScheduleQueueMessage`](/docs/schedules/sdk#queue-messages) types the message. Its parameter types the payload.

3. Subscribe the consumer to a topic and point a schedule at the same topic:

   ```json filename="vercel.json"
   {
     "functions": {
       "api/daily-reports.ts": {
         "experimentalTriggers": [
           { "type": "queue/v2beta", "topic": "daily-reports" }
         ]
       }
     },
     "schedules": {
       "daily-report": {
         "schedule": "0 9 * * *",
         "topic": "daily-reports"
       }
     }
   }
   ```

To create a queue schedule at runtime instead, use [`Schedules.create`](/docs/schedules/sdk#create-a-schedule) with `target: { topic: 'daily-reports' }`.

### Queue message format

The message body is a JSON object with the schedule's details at the top level:

```json
{
  "scheduleId": "sch_abc123",
  "executionId": "schx_def456",
  "name": "daily-report",
  "namespace": "default",
  "scheduledAt": "2026-09-15T09:00:00.000Z",
  "expression": "0 9 * * *",
  "source": "dynamic",
  "payload": {
    "reportType": "summary"
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| `scheduleId` | `string` | ID of the schedule |
| `executionId` | `string` | ID of this run. Stays the same if the run is delivered more than once. |
| `name` | `string` | Schedule name |
| `namespace` | `string` | Schedule namespace |
| `scheduledAt` | `string` | ISO 8601 time the expression matched. Doesn't include jitter. |
| `expression` | `string` | The cron expression, or the local datetime of a one-time schedule |
| `source` | `"static"` or `"dynamic"` | How the schedule was defined |
| `payload` | `unknown` | The payload you set on a dynamic schedule. Omitted when the schedule has no payload. Static schedules never include it. |

## Make your handler safe to run more than once

A run can arrive more than once, and a delayed schedule can [catch up](/docs/schedules/concepts#catching-up-after-a-delay) with several runs in a row. Queue targets also retry failed deliveries. Write your handler so a repeated run doesn't repeat its side effects.

The execution ID is the same for every delivery of a run, so you can use it to detect a run you've already processed. Function targets get it as `metadata.executionId`, and queue targets get it as `message.executionId`.

## Request headers

Function and path targets receive a request with an empty body. The run's details are in the headers. `handleSchedule` and `parseScheduleEvent` read these for you.

| Header | Sent to | Value |
| --- | --- | --- |
| `ce-specversion` | Function and path | `1.0` |
| `ce-type` | Function and path | `com.vercel.schedule.v1beta` |
| `ce-source` | Function and path | `/schedule/{namespace}/{name}` |
| `ce-id` | Function and path | Execution ID of this run |
| `ce-vssscheduleid` | Function and path | Schedule ID |
| `ce-vssschedulename` | Function and path | Schedule name |
| `ce-vssnamespace` | Function and path | Schedule namespace |
| `ce-vssscheduledat` | Function and path | ISO 8601 time the expression matched, without jitter |
| `ce-vssschedulesource` | Function and path | `static` or `dynamic` |
| `ce-vssexpression` | Function and path | The cron expression, or the local datetime of a one-time schedule |
| `user-agent` | Path only | `vercel-cron/1.0` |
| `x-vercel-cron-schedule` | Path only | The cron expression |
| `authorization` | Path only | `Bearer <CRON_SECRET>`, when you set `CRON_SECRET` |

> **💡 Note:** Function targets don't receive `authorization` or the Cron Job headers.
> Don't require them in a function handler.

## Related

- [Concepts](/docs/schedules/concepts): Learn about retries, duplicates, and late runs.
- [Configuration reference](/docs/schedules/configuration): Look up every schedule property.
- [Testing schedules locally](/docs/schedules/local-development): Run your handler with `vercel dev`.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
