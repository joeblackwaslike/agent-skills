---
title: Schedules Concepts
product: vercel
url: /docs/schedules/concepts
canonical_url: "https://vercel.com/docs/schedules/concepts"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/schedules
related:
  - /docs/deployments/environments
  - /docs/instant-rollback
  - /docs/schedules/manage
  - /docs/schedules/configuration
  - /docs/schedules/handle-runs
summary: Learn how Vercel Schedules handles environments, deployments, jitter, one-time schedules, late runs, and duplicate deliveries.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/concepts.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "df31f50b9ba1f15111ded002af1dc4700ff17ff023ec8c0b2ae5e429a85a0b75"
---

# Schedules Concepts

This page explains what happens between declaring a schedule and your code running. Read it before you rely on a schedule for work where timing or duplicates matter.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [Testing Schedules Locally](https://vercel.com/docs/schedules/local-development) — Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from pr
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Creating Schedules for Each Customer](https://vercel.com/docs/schedules/multi-tenant) — Use schedule namespaces to give each customer in a multi-tenant app their own recurring and one-time schedules.

Full cross-link map for this page: [/docs/schedules/concepts.graph.md](/docs/schedules/concepts.graph.md)
<!-- /docsgraph:related -->

## How a schedule runs

Each time a schedule's expression matches, Vercel creates a run for that occurrence:

1. Vercel picks a start time within the schedule's [jitter window](#jitter).
2. Vercel delivers the run to the schedule's target on the **current deployment** of the schedule's environment or branch. This isn't necessarily the deployment that first declared the schedule.
3. Your function, route, or queue consumer does the work.

Every run has an **execution ID**. It stays the same for every delivery of that occurrence, so you can use it to [detect duplicates](#duplicate-runs). Every run also has a **scheduled time**, the time the expression matched. The scheduled time doesn't include jitter.

Runs are independent. A slow run doesn't delay the next one, so two runs of the same schedule can overlap.

## Environments

Vercel keeps a separate set of schedules for production, each [custom environment](/docs/deployments/environments#custom-environments), each Preview branch, and CLI deployments by each user. A CLI user environment can also include the Git branch reported by the deployment. Changing a schedule in one environment doesn't affect the others.

### Static schedules and deployments

Vercel applies a deployment's static schedules when that deployment becomes the current deployment of its environment or branch. This includes promotions and [rollbacks](/docs/instant-rollback): rolling back production restores the schedules from the deployment you roll back to.

Static schedules start in different states depending on the environment:

| Environment | Initial state of a new static schedule |
| --- | --- |
| Production | Active |
| Preview branches | Inactive |
| Custom environments | Inactive by default. You can [change this per environment](/docs/schedules/manage#run-static-schedules-in-a-custom-environment). |

Inactive schedules don't run until you [enable them](/docs/schedules/manage#manage-schedules-across-environments), so a Preview branch can't run a production job by accident. Once you enable or disable a static schedule, it keeps that state across later deployments. Changing a custom environment's default doesn't change the state of schedules that already exist.

### Deployments, promotions, and rollbacks

Each time a different deployment becomes current, Vercel compares the static schedules in that deployment with the ones it has stored for the environment or branch:

- A schedule in both keeps its ID, execution history, and enabled or disabled state. Vercel updates its expression and target to match the deployment.
- A schedule only in the deployment is created, in the environment's [initial state](#static-schedules-and-deployments), unless a [dynamic schedule already uses that name](/docs/schedules/configuration#static-and-dynamic-schedules-with-the-same-name).
- A schedule only in storage is deleted.

Active static schedules then deliver their runs to that deployment. What changes depends on the action:

| Action | Static schedules | Dynamic schedules |
| --- | --- | --- |
| Deploy, or promote a preview deployment to production | Synced from the new deployment | Unchanged |
| Promote a staged production build | Synced from the promoted deployment | Unchanged |
| [Instant Rollback](/docs/instant-rollback) | Synced from the deployment you roll back to | Unchanged |
| Edit environment variables without deploying | Unchanged | Unchanged |
| Enable, disable, or run a schedule | No redeploy needed. See [Managing schedules](/docs/schedules/manage). | No redeploy needed |

If you roll back to a deployment that doesn't define a static schedule, Vercel deletes that schedule. When you later deploy or promote a deployment that defines it again, Vercel creates it as a new schedule, with a new ID, no execution history, and the environment's initial state.

Dynamic schedules belong to the environment or branch, not to a deployment, so deploys, promotions, and rollbacks don't change them. Their runs go to whichever deployment is current when they fire.

Vercel applies these changes shortly after the deployment becomes current. A run that fires in between can still go to the previous deployment. Make your handler [safe to run more than once](/docs/schedules/handle-runs#make-your-handler-safe-to-run-more-than-once).

For path targets, the same change also decides which `CRON_SECRET` value Vercel sends. See [Which `CRON_SECRET` value Vercel sends](/docs/schedules/handle-runs#which-cron_secret-value-vercel-sends).

### Dynamic schedules and environments

When your code calls `@vercel/schedules`, the SDK uses the environment or branch of the deployment that runs the code. A Preview deployment on the `feature-x` branch creates, lists, and changes schedules for `feature-x` only.

The `vercel schedules` CLI manages production schedules by default. Pass `--environment` for a custom environment, `--git-branch` for a Preview branch, `--user` for CLI deployments by a Vercel user ID, or `--local` for a `vercel dev` session. You can combine `--user` and `--git-branch`. See [Choose an environment](/docs/cli/schedules#choose-an-environment).

## Jitter

Jitter spreads runs across a short window instead of starting every schedule at the same second. A schedule set for 09:00 with a 5-minute jitter window starts at some point between 09:00 and 09:05.

| Plan | Jitter window |
| --- | --- |
| Hobby | Always 15 minutes |
| Pro and Enterprise | 1 to 15 minutes. Defaults to 1 minute. |

The shortest interval between a cron schedule's runs must be at least as long as its jitter window. For example, a schedule that runs every 5 minutes can use a jitter window of up to 5 minutes. Because Hobby always uses a 15-minute window, Hobby cron schedules can run at most once every 15 minutes.

To set the window, use `jitter` in [`vercel.json`](/docs/schedules/configuration#schedule-properties), the [SDK](/docs/schedules/sdk#create-a-schedule), or the [CLI](/docs/cli/schedules#create-a-schedule).

## Timezones

Each schedule evaluates its expression in an [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), such as `America/New_York`. The default is UTC.

Named timezones follow daylight saving time. A schedule set for `0 9 * * *` in `America/New_York` runs at 09:00 New York time all year, which is 13:00 UTC in summer and 14:00 UTC in winter.

## One-time schedules

A one-time schedule runs once at a local date and time, such as `2026-10-01T09:00`, in the schedule's timezone. You can only create one-time schedules as dynamic schedules, with the [SDK](/docs/schedules/sdk#create-a-one-time-schedule) or the [CLI](/docs/cli/schedules#create-a-schedule).

After a one-time schedule's scheduled time passes:

- Its state stays `active`. There's no separate completed state.
- You can't enable, disable, or update it.
- You can [delete it](/docs/schedules/manage#delete-a-schedule) once its run has been dispatched. While the run is still being dispatched, for up to five jitter windows after the scheduled time, deleting it fails with `schedule_single_at_passed`.
- Vercel removes it about 30 days after its scheduled time, and it stops counting toward your [team's schedule limit](/docs/schedules/limits#schedules-per-team) as soon as its run is dispatched.

You can still [run it manually](/docs/schedules/manage#run-a-schedule-now) before its scheduled time.

## Schedule states

A schedule is either `active` or `inactive`. Only active schedules run on their cadence. You can [run any schedule manually](/docs/schedules/manage#run-a-schedule-now), whatever its state.

You can also enable a schedule until a set time. While that window is open, the schedule is `active` and has an `activeUntil` timestamp. When the time passes, the schedule becomes `inactive` and `activeUntil` is cleared. Vercel keeps the schedule, so you can enable it again later. Use this to run a Preview schedule for a few hours while you test it, without leaving it on.

## Late and missed runs

If Vercel can't deliver a run on time, it delivers the run late. Each occurrence has an expiry. If Vercel still can't deliver the run when the occurrence expires, Vercel skips it.

An occurrence expires after its jitter window plus the shortest interval between the schedule's runs. Vercel counts that interval as at least 10 minutes, so a short delay doesn't make a frequent schedule skip runs.

These runs never expire:

- One-time schedules
- Runs you start manually from the dashboard, SDK, or CLI
- Cron schedules that set a day of the month or a month, such as monthly or yearly schedules

Vercel uses the shortest interval between runs, not the time until the next run. For `0 9 * * 1-5` (weekdays at 09:00), the shortest interval is one day. Friday's occurrence expires on Saturday at 09:01, even though the next run is on Monday.

### Catching up after a delay

When delivery resumes, Vercel delivers every occurrence that hasn't expired. A frequent schedule can run several times in quick succession. For example, an every-minute schedule delayed for 2 hours runs up to 12 times when delivery resumes, once for each occurrence from the last 11 minutes.

If your task should only run close to its scheduled time, compare the scheduled time to the current time and return early.

## Duplicate runs

Vercel delivers each run once in normal operation, but it can't rule out a duplicate delivery. Make your handler safe to run more than once. Use the execution ID to detect a run you've already processed. See [Make your handler safe to run more than once](/docs/schedules/handle-runs#make-your-handler-safe-to-run-more-than-once).

## Retries

How Vercel handles a failed run depends on the target:

| Target | Retries |
| --- | --- |
| Function | No. Vercel doesn't retry a run if your function throws, returns an error, or times out. |
| Path | No. Vercel doesn't retry a run if your route returns an error or times out. |
| Queue topic | Yes. The queue retries delivery to your consumer until it succeeds or the message expires. See [Queues retries](/docs/queues/concepts#retries). |

If a failed run must be retried, target a queue topic.

## Related

- [Handling scheduled runs](/docs/schedules/handle-runs)
- [Managing schedules](/docs/schedules/manage)
- [Limits](/docs/schedules/limits)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
