---
title: "Vercel Schedules: API Reference"
product: vercel
url: /docs/schedules/http-api
canonical_url: "https://vercel.com/docs/schedules/http-api"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/schedules
related:
  - /docs/schedules/sdk
  - /docs/cli/schedules
  - /docs/oidc
  - /docs/rest-api
  - /docs/schedules/manage
summary: "Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disable, invoke, and delete..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/http-api.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "937764d25431f2830a98a6af4ad9b4305c82d7b22eb2ed3140d4c9f3f908c899"
---

# Vercel Schedules: API Reference

The Schedules HTTP API is a REST API for managing static and dynamic schedules. The [`@vercel/schedules`](/docs/schedules/sdk) JS SDK and the [`vercel schedules`](/docs/cli/schedules) CLI both use it. Call it directly when you can't use the SDK, such as from another language or an external system.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Testing Schedules Locally](https://vercel.com/docs/schedules/local-development) — Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from pr

Full cross-link map for this page: [/docs/schedules/http-api.graph.md](/docs/schedules/http-api.graph.md)
<!-- /docsgraph:related -->

All endpoints use this base URL:

```bash
https://vercel-schedules.com
```

Requests and responses use JSON. Send `Content-Type: application/json` with every request that has a body.

## Authentication

Send a token in the `Authorization` header:

```bash
Authorization: Bearer <token>
```

The API accepts two kinds of tokens:

| Token | Use it from | Team and project |
| --- | --- | --- |
| [OIDC token](/docs/oidc) | Code running in a Vercel deployment. Vercel Functions receive it in the `x-vercel-oidc-token` request header. Builds receive it in the `VERCEL_OIDC_TOKEN` environment variable. | Taken from the token. Don't pass `teamId` or `projectId`. |
| [Vercel access token](/docs/rest-api#creating-an-access-token) | Scripts, CI, and external systems | Pass `projectId` in the query string. Pass `teamId` unless the project belongs to your default team. |

For example, with an access token:

```bash filename="terminal"
curl "https://vercel-schedules.com/v1/schedules?teamId=team_a1b2c3&projectId=prj_d4e5f6" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

From a build, with the OIDC token in `VERCEL_OIDC_TOKEN`:

```bash filename="terminal"
curl "https://vercel-schedules.com/v1/schedules" \
  -H "Authorization: Bearer $VERCEL_OIDC_TOKEN"
```

In a Vercel Function, send the value of the incoming request's `x-vercel-oidc-token` header as the token instead.

A request with a missing or invalid token fails with `403` and code `forbidden`. An access token can only manage schedules that its user's role allows. See [Permissions](/docs/schedules/manage#permissions).

## Choose an environment

Vercel keeps a [separate set of schedules](/docs/schedules/concepts#environments) for each environment. With an access token, choose one with a query parameter. Without one, requests use production.

| Query parameter | Selects |
| --- | --- |
| `env` | `production`, or a custom environment by name or ID |
| `branch` | A Preview branch of the project's connected Git repository |
| `user` | CLI deployments by a Vercel user ID. Combine with `branch` for CLI deployments associated with a branch. |

Pass at most one of these, except `user` with `branch`. If the custom environment, branch, or user doesn't have a deployment yet, the request fails with `400`.

OIDC tokens always use the environment of the deployment that issued them. Requests with an OIDC token can't pass `env`, `branch`, or `user`.

## Namespaces

Every endpoint that reads or changes one schedule, and the list endpoint, accepts a `namespace` query parameter. It defaults to `default`. When you create a schedule, pass `namespace` in the request body instead. See [Multi-tenant schedules](/docs/schedules/multi-tenant).

## The schedule object

Endpoints that return a schedule use this shape:

```json
{
  "scheduleId": "sch_01JC4Z8Q3W5V7X9Y2A4B6C8D0E",
  "ownerId": "team_a1b2c3",
  "projectId": "prj_d4e5f6",
  "name": "nightly-report",
  "namespace": "reports",
  "timezone": "America/New_York",
  "expression": { "type": "cron", "cron": "0 3 * * *" },
  "jitter": 5,
  "target": { "type": "queue", "topic": "nightly-report" },
  "state": "active",
  "source": "dynamic",
  "createdAt": 1793750400000,
  "updatedAt": 1793750400000
}
```

| Field | Type | Description |
| --- | --- | --- |
| `scheduleId` | `string` | Schedule ID |
| `ownerId` | `string` | ID of the team that owns the schedule |
| `projectId` | `string` | ID of the project |
| `name` | `string` | Schedule name |
| `namespace` | `string` | Schedule namespace |
| `timezone` | `string` | IANA timezone. Defaults to `UTC`. |
| `expression` | `object` | `{ "type": "cron", "cron": string }`, or `{ "type": "single", "at": string }` for a [one-time schedule](/docs/schedules/concepts#one-time-schedules) |
| `jitter` | `integer` | [Jitter window](/docs/schedules/concepts#jitter) in minutes. Omitted when the schedule uses the plan default. |
| `target` | `object` | `{ "type": "queue", "topic": string }`. Static schedules can also have `{ "type": "function", "function": string, "service"?: string }` or `{ "type": "path", "path": string, "requestMethod"?: "GET" \| "POST" }`. |
| `state` | `string` | `active` or `inactive` |
| `activeUntil` | `integer` | Unix timestamp in milliseconds when a [temporarily enabled](/docs/schedules/manage#enable-a-schedule-temporarily) schedule becomes inactive. Only present while that window is open. |
| `source` | `string` | `static` for schedules from your configuration, `dynamic` for schedules created with the API |
| `createdAt` | `integer` | Unix timestamp in milliseconds |
| `updatedAt` | `integer` | Unix timestamp in milliseconds |

Responses don't include a schedule's payload.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | [`/v1/schedules`](#list-schedules) | List schedules |
| `POST` | [`/v1/schedules`](#create-a-schedule) | Create a dynamic schedule |
| `GET` | [`/v1/schedules/{name}`](#get-a-schedule) | Get a schedule |
| `PATCH` | [`/v1/schedules/{name}`](#update-a-schedule) | Update a dynamic schedule |
| `DELETE` | [`/v1/schedules/{name}`](#delete-a-schedule) | Delete a dynamic schedule |
| `POST` | [`/v1/schedules/{name}/enable`](#enable-a-schedule) | Enable a schedule |
| `POST` | [`/v1/schedules/{name}/disable`](#disable-a-schedule) | Disable a schedule |
| `POST` | [`/v1/schedules/{name}/invoke`](#invoke-a-schedule) | Run a schedule now |

### List schedules

**`GET /v1/schedules`**

Lists static and dynamic schedules in one namespace, one page at a time.

| Query parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `namespace` | `string` | No | Namespace to list. Defaults to `default`. |
| `limit` | `integer` | No | Page size, from 1 to 100. Defaults to 20. |
| `cursor` | `string` | No | `cursor` from the previous page |

Returns `200`:

```json
{
  "data": [
    {
      "scheduleId": "sch_01JC4Z8Q3W5V7X9Y2A4B6C8D0E",
      "ownerId": "team_a1b2c3",
      "projectId": "prj_d4e5f6",
      "name": "nightly-report",
      "namespace": "reports",
      "timezone": "America/New_York",
      "expression": { "type": "cron", "cron": "0 3 * * *" },
      "jitter": 5,
      "target": { "type": "queue", "topic": "nightly-report" },
      "state": "active",
      "source": "dynamic",
      "createdAt": 1793750400000,
      "updatedAt": 1793750400000
    }
  ],
  "cursor": "eyJQSyI6Ii4uLiIsIlNLIjoiLi4uIn0"
}
```

`data` holds [schedule objects](#the-schedule-object), ordered by name. When `cursor` is `null`, there are no more pages. A page can hold fewer than `limit` schedules, or none, and still have a `cursor`, so keep reading until `cursor` is `null`.

### Create a schedule

**`POST /v1/schedules`**

Creates a dynamic schedule that publishes to a [queue topic](/docs/schedules/handle-runs#queue-targets). It's active as soon as you create it.

```bash filename="terminal"
curl -X POST "https://vercel-schedules.com/v1/schedules?teamId=team_a1b2c3&projectId=prj_d4e5f6" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "nightly-report",
    "namespace": "reports",
    "expression": { "type": "cron", "cron": "0 3 * * *" },
    "timezone": "America/New_York",
    "jitter": 5,
    "target": { "type": "queue", "topic": "nightly-report" },
    "payload": { "report": "daily-summary" }
  }'
```

| Body field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No | Unique within the namespace. See [naming rules](/docs/schedules/configuration#schedule-names). Vercel generates a name when you omit it. |
| `namespace` | `string` | No | Defaults to `default` |
| `expression` | `object` | Yes | `{ "type": "cron", "cron": string }` with a five-field [cron expression](/docs/schedules/configuration#cron-expressions), or `{ "type": "single", "at": string }` with a [local date and time](/docs/schedules/configuration#one-time-expressions) |
| `target` | `object` | Yes | `{ "type": "queue", "topic": string }`. Dynamic schedules only support queue topics. |
| `timezone` | `string` | No | IANA timezone for the expression. Defaults to `UTC`. |
| `jitter` | `integer` | No | Jitter window in minutes, from 1 to 15. On Hobby, omit it or pass `15`. |
| `payload` | any JSON value | No | Up to 16 KB. Vercel includes it in the `payload` field of each [queue message](/docs/schedules/handle-runs#queue-message-format). |

The body can't contain other fields. Returns `201` with the new [schedule object](#the-schedule-object). Returns `409` with `schedule_already_exists` if a schedule with the same name exists in the namespace.

### Get a schedule

**`GET /v1/schedules/{name}`**

Returns `200` with one static or dynamic [schedule object](#the-schedule-object). Pass `namespace` in the query string for a schedule outside the `default` namespace. Returns `404` with `not_found` if the schedule doesn't exist.

### Update a schedule

**`PATCH /v1/schedules/{name}`**

Changes a dynamic schedule. Fields you leave out keep their current values:

```bash filename="terminal"
curl -X PATCH "https://vercel-schedules.com/v1/schedules/nightly-report?namespace=reports&teamId=team_a1b2c3&projectId=prj_d4e5f6" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "expression": { "type": "cron", "cron": "0 4 * * *" }, "jitter": null }'
```

| Body field | Type | Description |
| --- | --- | --- |
| `expression` | `object` | New expression of the same type. You can't change a cron schedule to a one-time schedule, or the reverse. |
| `target` | `object` | New queue topic, as `{ "type": "queue", "topic": string }` |
| `timezone` | `string` | New IANA timezone |
| `jitter` | `integer` or `null` | New jitter window. Pass `null` to return to the plan default. |
| `payload` | any JSON value or `null` | New payload. Pass `null` to remove it. |

Returns `200` with the updated [schedule object](#the-schedule-object). Returns `409` with:

- `static_schedule` for a static schedule. Edit your configuration and redeploy instead.
- `schedule_type_change_not_allowed` if you change the expression type
- `schedule_single_at_passed` for a one-time schedule whose scheduled time has passed

### Delete a schedule

**`DELETE /v1/schedules/{name}`**

Deletes a dynamic schedule and stops its future runs. Returns `200`:

```json
{ "scheduleId": "sch_01JC4Z8Q3W5V7X9Y2A4B6C8D0E" }
```

Returns `409` with `static_schedule` for a static schedule, or with `schedule_single_at_passed` for a one-time schedule whose run is still being dispatched. See [Delete a schedule](/docs/schedules/manage#delete-a-schedule) for what happens to pending runs.

### Enable a schedule

**`POST /v1/schedules/{name}/enable`**

Makes a static or dynamic schedule run on its cadence. The body is optional. To enable the schedule until a set time, pass `until`:

```json
{ "until": 1793757600000 }
```

| Body field | Type | Description |
| --- | --- | --- |
| `until` | `integer` | Unix timestamp in milliseconds when the schedule becomes inactive again. Must be in the future. |

Returns `200` with the updated [schedule object](#the-schedule-object). Enabling without `until` keeps the schedule active indefinitely and clears any `activeUntil`. Passing `until` replaces an existing end time, but fails with `409` and `schedule_already_active` if the schedule is already active indefinitely. Disable it first.

### Disable a schedule

**`POST /v1/schedules/{name}/disable`**

Stops a static or dynamic schedule from running on its cadence. Send no body. Returns `200` with the updated [schedule object](#the-schedule-object).

### Invoke a schedule

**`POST /v1/schedules/{name}/invoke`**

Runs a static or dynamic schedule now, without changing its state or cadence. Works on inactive schedules. Send no body.

Returns `204` with no body once Vercel accepts the run. Your target receives it shortly afterward. Each request starts a new run, so don't retry a request that succeeded.

## Errors

Failed requests return a JSON body with a machine-readable code and a message:

```json
{
  "error": {
    "code": "schedule_already_exists",
    "message": "Schedule already exists"
  }
}
```

| Status | Codes |
| --- | --- |
| `400` | `bad_request`, `invalid_cron_expression`, `invalid_jitter`, `jitter_exceeds_cadence`, `single_at_in_past`, `payload_too_large`, `active_until_in_past`, `schedule_limit_exceeded` |
| `403` | `forbidden` |
| `404` | `not_found` |
| `409` | `schedule_already_exists`, `schedule_already_active`, `schedule_single_at_passed`, `schedule_type_change_not_allowed`, `static_schedule` |
| `429` | `rate_limited`, `feature_blocked` |
| `503` | `service_unavailable` |

The [JS SDK Reference](/docs/schedules/sdk#errors) describes what causes each code.

### Retries

- **`429` with `rate_limited`**: You exceeded an [API request limit](/docs/schedules/limits#api-requests). Wait for the number of seconds in the `Retry-After` header. The response also includes `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset`.
- **`429` with `feature_blocked`**: Your Hobby team went over its [usage limits](/docs/schedules/limits#hobby-limits). Retrying doesn't help until the next billing period.
- **`503` with `service_unavailable`**: Wait for the number of seconds in the `Retry-After` header and retry. A write may have been applied before the error, so a retried create can return `409` with `schedule_already_exists`, and a retried delete can return `404`. Treat those as success.

## Related

- [JS SDK Reference](/docs/schedules/sdk)
- [`vercel schedules` reference](/docs/cli/schedules)
- [Limits](/docs/schedules/limits)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
