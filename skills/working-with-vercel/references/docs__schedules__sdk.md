---
title: "Vercel Schedules: JS SDK Reference"
product: vercel
url: /docs/schedules/sdk
canonical_url: "https://vercel.com/docs/schedules/sdk"
last_updated: 2026-10-26
type: reference
prerequisites:
  - /docs/schedules
related:
  - /docs/cli/schedules
  - /docs/schedules/http-api
  - /docs/oidc
  - /docs/schedules/concepts
  - /docs/schedules/local-development
summary: "Reference for @vercel/schedules: create, list, update, enable, disable, invoke, and delete schedules, and handle scheduled runs."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/sdk.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "8647b9463f2866b370e08c069041d120adf2162eac484a097e4d3a8b7da2736e"
---

# Vercel Schedules: JS SDK Reference

Use the [`@vercel/schedules`](https://www.npmjs.com/package/@vercel/schedules) package to create and manage dynamic schedules from your code, and to handle runs in a function. To manage schedules from the terminal instead, use [`vercel schedules`](/docs/cli/schedules). To call the API without the SDK, see the [API Reference](/docs/schedules/http-api).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Scheduling Work for Agents](https://vercel.com/docs/schedules/agents) — Give an agent a tool that creates dynamic schedules, so it can do work for a user later or on a recurring basis.

Full cross-link map for this page: [/docs/schedules/sdk.graph.md](/docs/schedules/sdk.graph.md)
<!-- /docsgraph:related -->

## Installation

```bash package-manager
npm i @vercel/schedules
```

## Authentication

On Vercel, the SDK authenticates with your deployment's [OIDC token](/docs/oidc). You don't need to configure anything. Each call applies to the environment or branch of the deployment that runs it:

| Code runs in | Calls apply to |
| --- | --- |
| A production deployment | Production schedules |
| A Preview deployment from Git | Schedules for that deployment's branch |
| A Preview deployment from the CLI | Schedules for [CLI deployments by the user who created it](/docs/schedules/concepts#environments) |
| A custom environment deployment | Schedules for that custom environment |
| `vercel dev` | The [local Schedules service](/docs/schedules/local-development) |

## Clients

The package exports a default client, `Schedules`, that's ready to use:

```ts
import { Schedules } from '@vercel/schedules';

const schedule = await Schedules.get({ name: 'cleanup' });
```

To pass options, create your own `SchedulesClient`. It has the same methods as `Schedules`:

```ts
import { SchedulesClient } from '@vercel/schedules';

const schedules = new SchedulesClient({
  token: process.env.VERCEL_OIDC_TOKEN,
});
```

| Option | Type | Description |
| --- | --- | --- |
| `token` | `string` | Token to authenticate with. Defaults to the OIDC token from `@vercel/oidc`. |
| `baseUrl` | `string` | Schedules API URL. Defaults to `https://vercel-schedules.com`. |
| `fetch` | `typeof fetch` | Custom `fetch` implementation |
| `headers` | `HeadersInit` | Extra headers to send with every request. Can't override `authorization` or `content-type`. |

The default `Schedules` client reads its configuration when you import the package. If you change environment variables at runtime, create a new `SchedulesClient` afterward.

## Create a schedule

`Schedules.create()` creates a dynamic schedule that publishes to a [queue topic](/docs/schedules/handle-runs#queue-targets). It takes effect immediately.

```ts
import { Schedules } from '@vercel/schedules';

const schedule = await Schedules.create({
  name: 'cleanup',
  target: { topic: 'scheduled-cleanup' },
  expression: { type: 'cron', cron: '0 * * * *' },
  timezone: 'America/New_York',
  jitter: 5,
  payload: { maxAgeDays: 30 },
});

console.log(schedule.scheduleId, schedule.state);
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Unique within the namespace. See [naming rules](/docs/schedules/configuration#schedule-names). |
| `namespace` | `string` | No | Groups schedules, for example by tenant. Defaults to `default`. |
| `expression` | `ScheduleExpression` | Yes | `{ type: 'cron', cron: string }` for a recurring schedule, or `{ type: 'single', at: string }` for a [one-time schedule](#create-a-one-time-schedule) |
| `target` | `{ topic: string }` | Yes | Queue topic to publish to. Dynamic schedules only support queue topics. |
| `timezone` | `string` | No | IANA timezone for the expression. Defaults to `UTC`. |
| `jitter` | `number` | No | [Jitter window](/docs/schedules/concepts#jitter) in minutes, from 1 to 15. On Hobby, omit it or pass `15`. |
| `payload` | `unknown` | No | JSON value, up to 16 KB, that Vercel includes in the `payload` field of each [queue message](/docs/schedules/handle-runs#queue-message-format) |

Returns the new [`Schedule`](#schedule). Throws a `SchedulesApiError` with code `schedule_already_exists` if a schedule with the same name exists in the namespace.

### Create a one-time schedule

Pass `{ type: 'single', at }` to run once at a local date and time. Set `timezone` separately, or omit it to use UTC:

```ts
await Schedules.create({
  name: 'send-reminder',
  target: { topic: 'reminders' },
  expression: { type: 'single', at: '2027-11-01T09:00' },
  timezone: 'America/New_York',
});
```

The `at` value uses `YYYY-MM-DDTHH:mm` format. See [One-time expressions](/docs/schedules/configuration#one-time-expressions) for the full format rules.

## List schedules

`Schedules.list()` returns static and dynamic schedules in one namespace, one page at a time:

```ts
const { data, cursor } = await Schedules.list({
  namespace: 'default',
  limit: 50,
});

for (const schedule of data) {
  console.log(schedule.name, schedule.state, schedule.target.type);
}
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `namespace` | `string` | No | Namespace to list. Defaults to `default`. |
| `limit` | `number` | No | Page size, from 1 to 100. Defaults to 20. |
| `cursor` | `string` | No | `cursor` from the previous page |

Returns `{ data: Schedule[], cursor: string | null }`. When `cursor` is `null`, there are no more pages. To read every page:

```ts
let cursor: string | undefined;

do {
  const page = await Schedules.list({ namespace: 'default', cursor });
  for (const schedule of page.data) {
    console.log(schedule.name);
  }
  cursor = page.cursor ?? undefined;
} while (cursor);
```

Static schedules can target a function or a path, so check `target.type` before you read the target:

```ts
import type { Schedule } from '@vercel/schedules';

function describeTarget(schedule: Schedule): string {
  switch (schedule.target.type) {
    case 'queue':
      return `topic ${schedule.target.topic}`;
    case 'function':
      return `function ${schedule.target.function}`;
    case 'path':
      return `path ${schedule.target.path}`;
  }
}
```

## Get a schedule

`Schedules.get()` returns one static or dynamic schedule by name:

```ts
const schedule = await Schedules.get({ name: 'cleanup' });
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Schedule name |
| `namespace` | `string` | No | Defaults to `default` |

Throws a `SchedulesApiError` with code `not_found` if the schedule doesn't exist.

## Update a schedule

`Schedules.update()` changes a dynamic schedule. Properties you leave out keep their current values:

```ts
await Schedules.update({
  name: 'cleanup',
  expression: { type: 'cron', cron: '0 2 * * *' },
  payload: { maxAgeDays: 60 },
});
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Schedule name |
| `namespace` | `string` | No | Defaults to `default` |
| `expression` | `ScheduleExpression` | No | New expression of the same type. You can't change a cron schedule to a one-time schedule, or the reverse. |
| `target` | `{ topic: string }` | No | New queue topic |
| `timezone` | `string` | No | New IANA timezone |
| `jitter` | `number` or `null` | No | New jitter window. Pass `null` to return to the default. On Hobby, the window stays at 15 minutes. |
| `payload` | `unknown` | No | New payload. Pass `null` to remove it. |

Returns the updated [`Schedule`](#schedule). You can't update a static schedule. Edit your configuration and redeploy instead. To change a schedule's expression type, delete it and create it again.

## Enable and disable a schedule

`Schedules.enable()` and `Schedules.disable()` change whether a static or dynamic schedule runs on its cadence:

```ts
await Schedules.disable({ name: 'cleanup' });
await Schedules.enable({ name: 'cleanup' });
```

Pass `until` to `enable()` to enable the schedule until a set time:

```ts
await Schedules.enable({
  name: 'cleanup',
  until: new Date(Date.now() + 2 * 60 * 60 * 1000),
});
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Schedule name |
| `namespace` | `string` | No | Defaults to `default` |
| `until` | `Date` or `number` | No | `enable()` only. Time to disable the schedule again, as a `Date` or Unix timestamp in milliseconds. Must be in the future. |

Both methods return the updated [`Schedule`](#schedule). When you pass `until`:

- The schedule's `activeUntil` field holds the end time until it passes.
- Calling `enable()` again with `until` replaces the end time.
- Calling `enable()` without `until` keeps the schedule active indefinitely.
- If the schedule is already active indefinitely, the call fails with code `schedule_already_active`. Disable it first.

## Invoke a schedule

`Schedules.invoke()` runs a static or dynamic schedule now, without changing its state or cadence:

```ts
await Schedules.invoke({ name: 'cleanup' });
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Schedule name |
| `namespace` | `string` | No | Defaults to `default` |

The method returns once Vercel accepts the run. Your target receives it shortly afterward, the same way as a scheduled run. You can invoke an inactive schedule.

## Delete a schedule

`Schedules.delete()` deletes a dynamic schedule and stops its future runs:

```ts
await Schedules.delete({ name: 'cleanup' });
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Schedule name |
| `namespace` | `string` | No | Defaults to `default` |

You can't delete a static schedule. Remove it from your configuration and redeploy instead.

After you delete a schedule, you can create a new one with the same name right away. You can delete a one-time schedule before it runs or after its run is dispatched, but not while the run is being dispatched. See [Delete a schedule](/docs/schedules/manage#delete-a-schedule).

## Handle scheduled runs

The package also exports helpers for functions that a schedule targets:

| Export | Description |
| --- | --- |
| `handleSchedule(handler)` | Wraps your handler in a route handler. Returns `400` for requests that aren't schedule runs and `200` when your handler finishes. |
| `parseScheduleEvent(request)` | Returns the run's [`ScheduleMetadata`](#schedule-metadata), or throws a `ScheduleEventParseError` |

```ts filename="api/cleanup.ts"
import { handleSchedule } from '@vercel/schedules';

export const POST = handleSchedule(async (metadata, request) => {
  console.log(`${metadata.name} run ${metadata.executionId}`);
  await deleteExpiredRecords();
});
```

See [Handling scheduled runs](/docs/schedules/handle-runs) for function, path, and queue examples.

## Errors

Failed API calls throw a `SchedulesApiError`:

| Property | Type | Description |
| --- | --- | --- |
| `status` | `number` | HTTP status code |
| `code` | `string` | Machine-readable error code |
| `message` | `string` | Error message |
| `retryAfter` | `number` | Seconds to wait before retrying, when the API sends a `Retry-After` header |

Common codes:

| Code | Cause |
| --- | --- |
| `not_found` | The schedule doesn't exist in this namespace |
| `forbidden` | Your role can't make this change in this environment. See [Permissions](/docs/schedules/manage#permissions). |
| `feature_blocked` | Your Hobby team went over its [usage limits](/docs/schedules/limits#hobby-limits) for this billing period |
| `schedule_already_exists` | A schedule with this name already exists in this namespace |
| `schedule_limit_exceeded` | Your team reached its [schedule limit](/docs/schedules/limits#schedules-per-team) |
| `invalid_cron_expression` | The cron expression isn't valid. See [Cron expressions](/docs/schedules/configuration#cron-expressions). |
| `invalid_jitter` | The jitter window isn't allowed on your plan |
| `jitter_exceeds_cadence` | The jitter window is longer than the shortest interval between runs |
| `single_at_in_past` | The one-time schedule's `at` time is in the past |
| `payload_too_large` | The payload is larger than 16 KB |
| `schedule_type_change_not_allowed` | You tried to change a cron schedule to a one-time schedule, or the reverse |
| `schedule_already_active` | You passed `until` to a schedule that's already active indefinitely |
| `active_until_in_past` | The `until` time isn't in the future |
| `static_schedule` | You tried to update or delete a static schedule |
| `schedule_single_at_passed` | You tried to enable, disable, or update a one-time schedule after its scheduled time, or to delete it while its run is being dispatched |
| `rate_limited` | You exceeded an [API request limit](/docs/schedules/limits#api-requests). Wait `retryAfter` seconds. |
| `service_unavailable` | The Schedules API is temporarily unavailable. Retry later. |

```ts
import { Schedules, SchedulesApiError } from '@vercel/schedules';

async function findSchedule(name: string) {
  try {
    return await Schedules.get({ name });
  } catch (error) {
    if (error instanceof SchedulesApiError && error.code === 'not_found') {
      return null;
    }
    throw error;
  }
}
```

## Types

### `Schedule`

`create()`, `get()`, `list()`, `update()`, `enable()`, and `disable()` return `Schedule` objects:

| Field | Type | Description |
| --- | --- | --- |
| `scheduleId` | `string` | Schedule ID |
| `ownerId` | `string` | ID of the team that owns the schedule |
| `projectId` | `string` | ID of the project |
| `name` | `string` | Schedule name |
| `namespace` | `string` | Schedule namespace |
| `expression` | `ScheduleExpression` | `{ type: 'cron', cron }` or `{ type: 'single', at }` |
| `timezone` | `string` | IANA timezone |
| `jitter` | `number` | Jitter window in minutes, when set. Omitted when the schedule uses the plan default. |
| `target` | `ScheduleTarget` | See the next table |
| `state` | `'active'` or `'inactive'` | Whether the schedule runs on its cadence. A one-time schedule stays `active` after it runs. |
| `activeUntil` | `number` | Unix timestamp in milliseconds when a temporarily enabled schedule becomes inactive. Only present while that window is open. |
| `source` | `'static'` or `'dynamic'` | Whether the schedule comes from your configuration or the API |
| `createdAt` | `number` | Unix timestamp in milliseconds |
| `updatedAt` | `number` | Unix timestamp in milliseconds |

`target` has one of these shapes:

| `type` | Shape | Available for |
| --- | --- | --- |
| `queue` | `{ type: 'queue', topic: string }` | Static and dynamic schedules |
| `function` | `{ type: 'function', function: string, service?: string }` | Static schedules |
| `path` | `{ type: 'path', path: string, requestMethod?: 'GET' \| 'POST' }` | Static schedules |

### Schedule metadata

`handleSchedule` and `parseScheduleEvent` return `ScheduleMetadata`:

| Field | Type | Description |
| --- | --- | --- |
| `scheduleId` | `string` | Schedule ID |
| `executionId` | `string` | ID of this run. Stays the same if the run is delivered more than once. |
| `name` | `string` | Schedule name |
| `namespace` | `string` | Schedule namespace |
| `scheduledAt` | `Date` | Time the expression matched. Doesn't include jitter. |
| `source` | `string` | `static` or `dynamic` |
| `expression` | `string` | The cron expression, or the local datetime of a one-time schedule |

### Queue messages

A schedule with a queue target publishes a `ScheduleQueueMessage` to its topic each time it runs. Pass your payload's type as the parameter:

```ts
import { handleCallback } from '@vercel/queue';
import type { ScheduleQueueMessage } from '@vercel/schedules';

export const POST = handleCallback<ScheduleQueueMessage<{ reportType: string }>>(
  async (message) => {
    await generateReport(message.payload?.reportType ?? 'summary');
  },
);
```

| Field | Type | Description |
| --- | --- | --- |
| `scheduleId` | `string` | Schedule ID |
| `executionId` | `string` | ID of this run. Stays the same if the run is delivered more than once. |
| `name` | `string` | Schedule name |
| `namespace` | `string` | Schedule namespace |
| `scheduledAt` | `string` | ISO 8601 time the expression matched. Doesn't include jitter. |
| `expression` | `string` | The cron expression, or the local datetime of a one-time schedule |
| `source` | `'static'` or `'dynamic'` | Whether the schedule comes from your configuration or the API |
| `payload` | `TPayload` | The schedule's payload. Omitted when the schedule has none. |

## Related

- [Handling scheduled runs](/docs/schedules/handle-runs)
- [Multi-tenant schedules](/docs/schedules/multi-tenant)
- [`vercel schedules` reference](/docs/cli/schedules)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
