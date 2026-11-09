---
title: Schedules Limits
product: vercel
url: /docs/schedules/limits
canonical_url: "https://vercel.com/docs/schedules/limits"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/schedules
related:
  - /docs/plans/hobby
  - /docs/schedules/configuration
  - /docs/deployments/deploy-without-logging-in
  - /docs/functions/usage-and-pricing
  - /docs/queues/pricing
summary: Limits for Vercel Schedules, including schedules per team, run frequency, jitter, Hobby usage, and API requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/limits.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "b3ae36d00751338d8896596f8a0adad25f7714e77ddfb7fe2d6d7b6ffebe97ff"
---

# Schedules Limits

Schedules are in beta, and these limits may change before general availability.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [Vercel Schedules: JS SDK Reference](https://vercel.com/docs/schedules/sdk) — Reference for @vercel/schedules: create, list, update, enable, disable, invoke, and delete schedules, and handle schedul
- [vercel schedules](https://vercel.com/docs/cli/schedules) — Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a loca
- [Usage & Pricing for Cron Jobs](https://vercel.com/docs/schedules/cron-jobs/usage-and-pricing) — Learn about cron jobs usage and pricing details.
- [Testing Schedules Locally](https://vercel.com/docs/schedules/local-development) — Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from pr

Full cross-link map for this page: [/docs/schedules/limits.graph.md](/docs/schedules/limits.graph.md)
<!-- /docsgraph:related -->

## Limits by plan

| Limit | Hobby | Pro | Enterprise |
| --- | --- | --- | --- |
| Schedules per team | 1,000 | 10,000 | 100,000 |
| Jitter window | Always 15 minutes | 1 to 15 minutes. Defaults to 1 minute. | 1 to 15 minutes. Defaults to 1 minute. |
| Most frequent cron schedule | Every 15 minutes | Every minute, with a 1-minute jitter window | Every minute, with a 1-minute jitter window |
| Payload size | 16 KB | 16 KB | 16 KB |

### Schedules per team

The team limit counts static and dynamic schedules across all projects, environments, and branches. A one-time schedule stops counting after Vercel dispatches its scheduled run, even though the schedule remains visible for about 30 days. When your team reaches the limit, creating a dynamic schedule fails with `schedule_limit_exceeded`.

### Hobby limits

On Hobby:

- A deployment can declare up to 100 static schedules in `vercel.json` and its framework's build output. If a deployment declares more, it fails at build time with `schedules_limit_exceeded`.
- Each billing period, a team can create up to 500 dynamic schedules and run its schedules up to 5,000 times. Scheduled and manual runs both count toward the run limit.

When a Hobby team goes over its creation or run limit, Vercel blocks the following until the next billing period starts:

- Creating and enabling schedules, which fail with `feature_blocked`
- Running schedules manually
- Scheduled runs, which Vercel skips

To remove the limits, [upgrade to Pro](/docs/plans/hobby#upgrading-to-pro).

### Frequency and jitter

A cron schedule's shortest interval between runs must be at least as long as its jitter window. Because Hobby always uses a 15-minute jitter window, Hobby cron schedules can run at most once every 15 minutes. On Hobby, the SDK and CLI reject any `jitter` value other than `15`.

### What happens to schedules when you move to Hobby

When a team downgrades to Hobby, or you transfer a project to a Hobby team, Vercel deletes the schedules that Hobby doesn't allow. Vercel deletes a schedule if either of the following is true:

- Its cron expression can run more often than every 15 minutes, such as `* * * * *` or `*/5 * * * *`
- Its `jitter` value is less than `15`

Vercel keeps all other schedules, and they run with the 15-minute Hobby jitter window. A deleted schedule doesn't come back when the team upgrades or when you transfer the project back to a Pro or Enterprise team.

To keep a schedule, update it before you downgrade or transfer the project. Change its cron expression to run at most once every 15 minutes, and remove its `jitter` value or set it to `15`.

Vercel applies [static schedules](/docs/schedules/configuration) from `vercel.json` when you deploy. On Hobby, deployments don't recreate a deleted static schedule until you update it in `vercel.json` to meet the Hobby limits. On Pro and Enterprise, your next deployment recreates it.

### What happens to schedules when you move from Hobby to Pro or Enterprise

When a team upgrades from Hobby, or you transfer a project from a Hobby team to a Pro or Enterprise team, Vercel keeps every schedule. Schedules with `jitter` set to `15` keep the 15-minute jitter window. Schedules without a `jitter` value use the default 1-minute jitter window.

## Anonymous deployments

[Deployments created without an account](/docs/deployments/deploy-without-logging-in) cannot use schedules. Vercel rejects an anonymous deployment that defines schedules in `vercel.json`, in a `schedule/v1beta` trigger, or in its build output. The rejection returns the error code `anonymous_schedules_forbidden` (HTTP 400).

## API requests

The Schedules API applies the following request limits per team. Operations in the same row share a limit across the SDK, CLI, and dashboard:

| Operations | Pro and Enterprise | Hobby |
| --- | --- | --- |
| List schedules, inspect a schedule, and list execution history | 100 per second | 100 per minute |
| Create, update, and enable schedules | 100 per second | 100 per minute |
| Delete and disable schedules | 50 per second | 50 per minute |
| Invoke schedules | 10 per second | 10 per minute |

When you exceed a limit, the API returns a `rate_limited` error. Wait for the number of seconds in `retryAfter` before retrying. Local commands that use `--local` don't send requests to the Schedules API.

## Usage

A schedule's runs use the resources of its target. Function and path targets create [Vercel Functions](/docs/functions/usage-and-pricing) invocations. Queue targets publish [Vercel Queues](/docs/queues/pricing) messages and invoke your consumer. To stop a schedule's usage, [disable](/docs/schedules/manage#enable-and-disable-a-schedule) or [delete](/docs/schedules/manage#delete-a-schedule) it.

## Related

- [Concepts](/docs/schedules/concepts)
- [Configuration reference](/docs/schedules/configuration)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
