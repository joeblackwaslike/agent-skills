---
title: Schedules
product: vercel
url: /docs/schedules
canonical_url: "https://vercel.com/docs/schedules"
last_updated: 2026-10-26
type: conceptual
prerequisites:
  []
related:
  - /docs/schedules/configuration
  - /docs/queues
  - /docs/cron-jobs
  - /docs/schedules/sdk
  - /docs/cli/schedules
summary: Run code on a recurring cron schedule or once at a specific time, and create schedules at runtime for each of your users.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "8edec620135bee2eb8c2644741bdf5171a4509cc50409662e8a41f96ad00c04f"
---

# Schedules

With Vercel Schedules, you can run code on a recurring [cron](/docs/schedules/configuration#cron-expressions) cadence or once at a specific time. A schedule can call a route, run a private function, or send a message to a [Vercel Queue](/docs/queues). You can also create schedules at runtime, so each of your users can get their own reminder, report, or cleanup job.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Vercel CLI Overview](https://vercel.com/docs/cli) — Learn how to use the Vercel command-line interface \\(CLI\\) to manage and configure your Vercel Projects from the command
- [Poll Mode](https://vercel.com/docs/queues/poll-mode) — Consume messages from Vercel Queues by polling on your own schedule, from any environment.

Full cross-link map for this page: [/docs/schedules.graph.md](/docs/schedules.graph.md)
<!-- /docsgraph:related -->

Schedules replace [Cron Jobs](/docs/cron-jobs). They add timezones, private targets, one-time runs, execution history, and a way to pause or run a schedule without redeploying.

## Use cases

Schedules are useful when you need to:

- **Run recurring maintenance**: Delete expired records, rotate data, or refresh caches every hour or every night.
- **Send reports and digests**: Email a daily summary at 09:00 in each customer's timezone.
- **Run a task once, later**: Send a reminder, expire a trial, or publish a post at a specific date and time.
- **Let users choose when work runs**: Create, update, and delete schedules from your app as users change their settings.

## Static and dynamic schedules

You can define a schedule in two ways:

- **Static schedules** live in your project configuration, such as `vercel.json`. Vercel applies them when you deploy, so they change with your code.
- **Dynamic schedules** are created at runtime with the [`@vercel/schedules`](/docs/schedules/sdk) SDK or the [`vercel schedules`](/docs/cli/schedules) CLI. They take effect immediately and don't require a deployment.

Use static schedules for jobs that belong to your app, like a nightly cleanup. Use dynamic schedules for jobs your app creates on behalf of users, like a reminder for each customer.

| | Static | Dynamic |
| --- | --- | --- |
| **Defined in** | `vercel.json` or Build Output API `config.json` | `@vercel/schedules` SDK or `vercel schedules` CLI |
| **Takes effect** | When you deploy | Immediately |
| **Targets** | Path, function, or queue topic | Queue topic only |
| **Recurring (cron)** | Supported | Supported |
| **One-time** | Not supported | Supported |
| **Payload** | Not supported | Optional JSON payload |
| **Namespace** | Always `default` | Any namespace you choose |
| **Update or delete** | Edit your configuration and redeploy | SDK or CLI |
| **Enable, disable, or run now** | Dashboard, SDK, or CLI | Dashboard, SDK, or CLI |

## Targets

Each schedule has one target. When the schedule fires, Vercel delivers the run to that target:

| Target | What happens | Available for |
| --- | --- | --- |
| **Function** | Vercel invokes a private Vercel Function that has no public URL. | Static schedules |
| **Path** | Vercel sends an HTTP request to a path on your deployment, like a Cron Job. | Static schedules |
| **Queue topic** | Vercel publishes a message to a [Vercel Queues](/docs/queues) topic. A consumer on that topic processes it, with retries. | Static and dynamic schedules |

To choose a target and write the code that runs, see [Handling scheduled runs](/docs/schedules/handle-runs).

## Schedules and Cron Jobs

If you use Cron Jobs today, you can [migrate to Schedules](/docs/schedules/migrate-from-cron-jobs) without changing your route code:

| | Cron Jobs | Schedules |
| --- | --- | --- |
| **Targets** | HTTP `GET` to a public path | HTTP `GET` or `POST` to a path, a private function, or a queue topic |
| **Timezone** | UTC only | Any IANA timezone, per schedule |
| **One-time runs** | Not supported | Supported with dynamic schedules |
| **Create at runtime** | Not supported | Supported with dynamic schedules |
| **Payload** | Not supported | Optional JSON payload with dynamic schedules |
| **Pause or run without redeploying** | Pause all Cron Jobs in the project | Enable, disable, or run each schedule |
| **Preview and custom environments** | Production only | Production, Preview branches, and custom environments |
| **Execution history** | Function logs only | Per schedule, in the dashboard and CLI |
| **Timing** | Pro and Enterprise: the scheduled minute. Hobby: once per day, any time within the scheduled hour. | Within a [jitter window](/docs/schedules/concepts#jitter) of 1 to 15 minutes. Hobby can run every 15 minutes. |

> **💡 Note:** Schedules are in beta. Behavior, APIs, and limits may change before general
> availability.

## Use Schedules with a coding agent

If you use a coding agent, install the `vercel-schedules` [agent skill](/docs/agent-resources/skills). It helps your agent choose between static and dynamic schedules, pick a target, write handlers, and migrate from Cron Jobs:

```bash filename="terminal"
npx skills add vercel/vercel-plugin --skill vercel-schedules
```

The skill is also included in the [Vercel Plugin](/docs/agent-resources/vercel-plugin).

## Resources

**Getting started**: Run a private function every hour with a static schedule. [Learn more →](/docs/schedules/quickstart)

**Concepts**: Learn how environments, jitter, late runs, and delivery work. [Learn more →](/docs/schedules/concepts)

**Handling scheduled runs**: Write the function, route, or queue consumer that a schedule runs. [Learn more →](/docs/schedules/handle-runs)

**Managing schedules**: Enable, disable, run, and monitor schedules. [Learn more →](/docs/schedules/manage)

**Multi-tenant schedules**: Give each customer their own schedules with namespaces. [Learn more →](/docs/schedules/multi-tenant)

**Configuration reference**: Look up every static schedule property and cron syntax. [Learn more →](/docs/schedules/configuration)

**JS SDK Reference**: Create and manage dynamic schedules with @vercel/schedules. [Learn more →](/docs/schedules/sdk)

**API Reference**: Call the Schedules API directly from any language. [Learn more →](/docs/schedules/http-api)

**CLI reference**: Manage schedules from the terminal with vercel schedules. [Learn more →](/docs/cli/schedules)

**Limits**: Check schedule counts, frequency, and jitter limits by plan. [Learn more →](/docs/schedules/limits)

**Cron Jobs (legacy)**: Reference for Cron Jobs, which will be migrated to Schedules. [Learn more →](/docs/schedules/cron-jobs)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
