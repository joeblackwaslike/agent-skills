---
title: Testing Schedules Locally
product: vercel
url: /docs/schedules/local-development
canonical_url: "https://vercel.com/docs/schedules/local-development"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/schedules/concepts
  - /docs/services
  - /docs/schedules/limits
  - /docs/schedules/handle-runs
  - /docs/cli/schedules
summary: Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from production.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/local-development.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "37fa79ca8c8faaa74c283a4f7d706dc7330052d48ef19eab4cbbbf529bbad4cf"
---

# Testing Schedules Locally

`vercel dev` runs a local scheduler, so you can test schedules and your handlers without deploying. Local schedules never touch your production schedules.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Managing Schedules](https://vercel.com/docs/schedules/manage) — View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI,
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Vercel Schedules: JS SDK Reference](https://vercel.com/docs/schedules/sdk) — Reference for @vercel/schedules: create, list, update, enable, disable, invoke, and delete schedules, and handle schedul

Full cross-link map for this page: [/docs/schedules/local-development.graph.md](/docs/schedules/local-development.graph.md)
<!-- /docsgraph:related -->

## Start the local scheduler

Run the development server from your project directory:

```bash filename="terminal"
vercel dev
```

`vercel dev` starts a local Schedules service and then:

- Loads the static schedules from `vercel.json` and your framework's build output, and reloads them when the configuration changes
- Configures `@vercel/schedules` in your app to use the local service, so SDK calls create and change local dynamic schedules
- Delivers runs to your local functions, routes, and queue consumers with the same headers and message format as production
- Applies the same validation rules, error codes, jitter, and [late-run expiry](/docs/schedules/concepts#late-and-missed-runs) as production

Local schedules run on their cadence while `vercel dev` is running. If your machine sleeps, occurrences that expired in the meantime are skipped when it wakes, as they would be in production.

Path targets receive the same headers as in production, including `user-agent: vercel-cron/1.0` and `x-vercel-cron-schedule`. They also receive `Authorization: Bearer <CRON_SECRET>` when `CRON_SECRET` is set in your development environment.

To choose the port for the local Schedules service, pass `--schedules-port`:

```bash filename="terminal"
vercel dev --schedules-port 5784
```

## Run a schedule on demand

You don't need to wait for a schedule's next run. In a second terminal, invoke it with `--local`:

```bash filename="terminal"
vercel schedules invoke cleanup --local
```

The run appears in the `vercel dev` output.

## Manage local schedules

Pass `--local` to `vercel schedules` to manage the schedules in the running `vercel dev` session instead of production:

```bash filename="terminal"
vercel schedules list --local
vercel schedules create send-reminder --at 2027-11-01T09:00 --topic reminders --local
vercel schedules disable cleanup --local
vercel schedules enable cleanup --for 1h --local
```

`--local` connects to the session for the current project directory. Use `--cwd` to choose another directory. Local commands don't need a login or a linked project.

`vercel schedules` with `--local`:

- Works with `list`, `inspect`, `create`, `update`, `enable`, `disable`, `invoke`, and `delete`
- Fails if no `vercel dev` session is running, or if it can't tell which session to use. It never falls back to production.
- Can't be combined with `--environment`, `--git-branch`, `--user`, `--scope`, or `--token`

## Differences from production

| Behavior | Local | Production |
| --- | --- | --- |
| Schedule state | Exists only for the current `vercel dev` session | Persists |
| Execution history | Read the `vercel dev` output. `vercel schedules executions list` doesn't support `--local`. | Dashboard and CLI |
| Function targets in a [service](/docs/services) | Not supported. `vercel dev` fails with `DEV_SCHEDULE_SERVICE_FUNCTION_UNSUPPORTED`. Deploy to test them. | Supported |
| Hobby jitter and team schedule limits | Not enforced | [Enforced](/docs/schedules/limits) |

Locally, you can't create a one-time schedule for a time that a daylight saving time change skips or repeats in the schedule's timezone. Choose a different time.

## Related

- [Handling scheduled runs](/docs/schedules/handle-runs)
- [`vercel schedules` reference](/docs/cli/schedules)
- [`vercel dev` reference](/docs/cli/dev)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
