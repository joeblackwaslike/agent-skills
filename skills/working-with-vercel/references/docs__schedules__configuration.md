---
title: Schedules Configuration Reference
product: vercel
url: /docs/schedules/configuration
canonical_url: "https://vercel.com/docs/schedules/configuration"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/schedules
related:
  - /docs/schedules/sdk
  - /docs/cli/schedules
  - /docs/schedules/concepts
  - /docs/services
  - /docs/queues
summary: Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron syntax, and naming rules.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/configuration.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "bc12195aa295cc86750a841e803ffed4d1c3f55fbb4e126375e384121efbe2ab"
---

# Schedules Configuration Reference

Static schedules live in the `schedules` property of `vercel.json`. Vercel applies them when you deploy. To create schedules at runtime instead, use the [SDK](/docs/schedules/sdk) or the [CLI](/docs/cli/schedules).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Testing Schedules Locally](https://vercel.com/docs/schedules/local-development) — Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from pr
- [Creating Schedules for Each Customer](https://vercel.com/docs/schedules/multi-tenant) — Use schedule namespaces to give each customer in a multi-tenant app their own recurring and one-time schedules.

Full cross-link map for this page: [/docs/schedules/configuration.graph.md](/docs/schedules/configuration.graph.md)
<!-- /docsgraph:related -->

## The `schedules` property

`schedules` is an object. Each key is a schedule name, and each value defines when the schedule runs and what it targets:

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
      "timezone": "America/New_York",
      "jitter": 5,
      "function": "api/cleanup"
    },
    "daily-report": {
      "schedule": "0 9 * * *",
      "path": "/api/daily-report",
      "requestMethod": "GET"
    },
    "nightly-export": {
      "schedule": "0 2 * * *",
      "topic": "exports"
    }
  }
}
```

## Schedule properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `schedule` | `string` | Yes | Five-field [cron expression](#cron-expressions), evaluated in `timezone` |
| `timezone` | `string` | No | IANA timezone, such as `America/New_York`. Defaults to `UTC`. |
| `jitter` | `integer` | No | [Jitter window](/docs/schedules/concepts#jitter) in minutes, from 1 to 15. Defaults to 1 on Pro and Enterprise. Hobby always uses 15. |
| `function` | `string` | One target | [Function identifier](#function-identifiers) of a private function with a `schedule/v1beta` trigger |
| `service` | `string` | No | Name of the [service](/docs/services) that owns `function`. Only valid with `function`. See [Target a function in a service](#target-a-function-in-a-service). |
| `path` | `string` | One target | Path on your deployment to send an HTTP request to. Must start with `/`. Up to 512 characters. |
| `requestMethod` | `"GET"` or `"POST"` | No | HTTP method for `path`. Defaults to `POST`. Only valid with `path`. |
| `topic` | `string` | One target | [Vercel Queues](/docs/queues) topic to publish to. Letters, digits, `_`, and `-` only. |

Set exactly one target: `function`, `path`, or `topic`. Static schedules don't accept a payload or a namespace. They always use the `default` namespace.

To learn how to write the code for each target, see [Handling scheduled runs](/docs/schedules/handle-runs).

## Schedule names

The key of each entry is the schedule's name. Names identify a schedule across deployments, so keep them stable. Renaming a schedule deletes the old schedule and creates a new one, with its own state and execution history.

Names and namespaces follow the same rules:

- 1 to 256 characters
- Start with an ASCII letter or digit
- Contain only ASCII letters, digits, `.`, `_`, and `-`

Static schedule names must be unique within the project. Dynamic schedule names must be unique within their namespace. On Hobby, a deployment can declare up to 100 static schedules. See [Limits](/docs/schedules/limits#hobby-limits).

### Static and dynamic schedules with the same name

Static schedules share the `default` namespace with dynamic schedules in the same environment, so the two can collide:

- If you create a dynamic schedule with the name of an existing static schedule in `default`, the request fails with `schedule_already_exists`.
- If a deployment declares a static schedule whose name a dynamic schedule in `default` already uses, Vercel skips that static schedule. The deployment still succeeds, and the dynamic schedule keeps its expression, target, payload, and state. The deployment's other static schedules apply as usual.

To use the static schedule, rename it or [delete the dynamic schedule](/docs/schedules/manage#delete-a-schedule). Vercel creates the static schedule the next time a deployment that declares it becomes the current deployment of the environment or branch. To avoid collisions, create dynamic schedules in a namespace other than `default`.

## Function identifiers

The `function` property takes the function's path in the build output, not its source filename. The identifier is the path relative to `.vercel/output/functions`, without the `.func` suffix.

To find it:

1. Run `vercel build`.
2. Look in `.vercel/output/functions` for the function's `.func` directory.
3. Use its relative path without `.func`. Keep any nested directories.

For example:

| Source file | Build output | `function` value |
| --- | --- | --- |
| `api/cleanup.ts` | `.vercel/output/functions/api/cleanup.func` | `api/cleanup` |
| `api/jobs/report.ts` | `.vercel/output/functions/api/jobs/report.func` | `api/jobs/report` |

The function must declare a `schedule/v1beta` trigger, and that must be its only trigger:

```json filename="vercel.json"
{
  "functions": {
    "api/cleanup.ts": {
      "experimentalTriggers": [{ "type": "schedule/v1beta" }]
    }
  }
}
```

The trigger makes the function private. It has no public URL, and only Vercel's scheduler can invoke it. Don't add routes or rewrites that point to it.

If no function in the build output matches `function`, or the function doesn't have the `schedule/v1beta` trigger, the deployment fails.

## Target a function in a service

A [service](/docs/services) has its own build output. To target a function in a service, set `service` to the service name and `function` to the function's path within that service's output:

1. Run `vercel build`.
2. Look in `.vercel/output/services/<service-name>/functions`.
3. Use the function's relative path without `.func`.

The following schedule targets `.vercel/output/services/worker/functions/index.func`:

```json filename="vercel.json"
{
  "schedules": {
    "cleanup": {
      "schedule": "0 * * * *",
      "service": "worker",
      "function": "index"
    }
  }
}
```

`vercel dev` doesn't run schedules that target a function in a service yet. It fails with `DEV_SCHEDULE_SERVICE_FUNCTION_UNSUPPORTED`. Deploy to test these schedules.

## Cron expressions

Schedules use the same five-field cron syntax as [Cron Jobs](/docs/cron-jobs#cron-expressions):

| Field | Values | Example | Meaning |
| --- | --- | --- | --- |
| Minute | 0 to 59 | `5 * * * *` | 5 minutes past every hour |
| Hour | 0 to 23 | `0 5 * * *` | Every day at 05:00 |
| Day of month | 1 to 31 | `0 0 5 * *` | Midnight on the 5th of each month |
| Month | 1 to 12 | `0 0 1 5 *` | Midnight on May 1 |
| Day of week | 0 to 6 (Sunday to Saturday) | `0 9 * * 1-5` | 09:00 on weekdays |

Expressions can use digits, `*`, `,`, `-`, and `/`, with a single space between fields. They can't use:

- Named days or months, such as `MON` or `JAN`
- Both a day of the month and a day of the week in the same expression

The shortest interval between runs must be at least as long as the jitter window. On Hobby, that means a cron schedule can run at most once every 15 minutes. See [Limits](/docs/schedules/limits).

## One-time expressions

One-time schedules are only available as dynamic schedules. Pass a local date and time in `YYYY-MM-DDTHH:mm` format, such as `2026-10-01T09:00`, to the SDK's `at` field or the CLI's `--at` option. Vercel evaluates it in the schedule's `timezone`.

- You can add `:00` seconds. Vercel stores the value with `:00` either way.
- Don't include `Z`, a UTC offset, fractional seconds, or non-zero seconds.

## Build Output API

Frameworks can declare static schedules in their [Build Output API](/docs/build-output-api) output. Add a `schedules` object to `.vercel/output/config.json` with the same properties as `vercel.json`:

```json filename=".vercel/output/config.json"
{
  "version": 3,
  "schedules": {
    "cleanup": {
      "schedule": "0 3 * * *",
      "function": "_vercel/schedule"
    }
  }
}
```

Declare the trigger in the target function's `.vc-config.json`:

```json filename=".vercel/output/functions/_vercel/schedule.func/.vc-config.json"
{
  "runtime": "nodejs22.x",
  "handler": "index.mjs",
  "launcherType": "Nodejs",
  "experimentalTriggers": [{ "type": "schedule/v1beta" }]
}
```

[`vercel build`](/docs/cli/build#schedule-configuration) combines a framework's schedules with the schedules in `vercel.json`. If the same name appears in both, the build fails with `SCHEDULE_NAME_CONFLICT`.

## Related

- [Handling scheduled runs](/docs/schedules/handle-runs)
- [Limits](/docs/schedules/limits)
- [`vercel build` reference](/docs/cli/build#schedule-configuration)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
