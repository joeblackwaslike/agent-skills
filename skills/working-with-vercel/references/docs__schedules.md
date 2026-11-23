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
  - /docs/schedules/workflows
  - /docs/schedules/sdk
summary: Run code on a recurring cron schedule or once at a specific time, and create schedules at runtime for each of your users.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/schedules.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "cef1320ef2d6a1e8783839e2ea50321057a8bf94e5c8e3ebf74af359664482ea"
---

# Schedules

## Run code on a schedule (Beta)

Run a function, route, or queue consumer on a recurring cron cadence or once at a specific time, in any timezone. Create schedules at runtime so each of your users gets their own.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Vercel CLI Overview](https://vercel.com/docs/cli) — Learn how to use the Vercel command-line interface \\(CLI\\) to manage and configure your Vercel Projects from the command
- [Poll Mode](https://vercel.com/docs/queues/poll-mode) — Consume messages from Vercel Queues by polling on your own schedule, from any environment.
- [Vercel Workflows](https://vercel.com/docs/workflows) — Build agents and applications that retry failed steps, wait for external events, and resume across crashes and deploymen

Full cross-link map for this page: [/docs/schedules.graph.md](/docs/schedules.graph.md)
<!-- /docsgraph:related -->

#### Create a schedule

```typescript filename="create-reminder.ts"
import { Schedules } from '@vercel/schedules';

await Schedules.create({
  name: 'send-reminder',
  namespace: 'tenant_abc123',
  target: { topic: 'reminders' },
  expression: { type: 'single', at: '2027-11-01T09:00' },
  timezone: 'America/New_York',
  payload: { userId: 'user_123' },
});
```

#### Handle runs

```typescript filename="api/reminders.ts"
import { handleCallback } from '@vercel/queue';
import type { ScheduleQueueMessage } from '@vercel/schedules';

export const POST = handleCallback<ScheduleQueueMessage<{ userId: string }>>(
  async (message) => {
    console.log('Running', message.name, message.scheduledAt);
    await sendReminders(message.payload?.userId);
  },
);
```

#### Declare in vercel.json

```json filename="vercel.json"
{
  "schedules": {
    "cleanup": {
      "schedule": "0 * * * *",
      "function": "api/cleanup"
    }
  },
  "functions": {
    "api/cleanup.ts": {
      "experimentalTriggers": [{ "type": "schedule/v1beta" }]
    }
  }
}
```

> Vercel Schedules are available in Beta on all plans

With Vercel Schedules, you can run code on a recurring [cron](/docs/schedules/configuration#cron-expressions) cadence or once at a specific time. A schedule can call a route, run a private function, or send a message to a [Vercel Queue](/docs/queues). You can also create schedules at runtime, so each of your users can get their own reminder, report, or cleanup job.

Schedules replace [Cron Jobs](/docs/cron-jobs). They add timezones, private targets, one-time runs, execution history, and a way to pause or run a schedule without redeploying.

## Use cases

Schedules are useful when you need to:

- **Run recurring maintenance**: Delete expired records, rotate data, or refresh caches every hour or every night.
- **Send reports and digests**: Email a daily summary at 09:00 in each customer's timezone.
- **Run a task once, later**: Send a reminder, expire a trial, or publish a post at a specific date and time.
- **Let users choose when work runs**: Create, update, and delete schedules from your app as users change their settings.
- **Run long or multi-step jobs durably**: [Start a Vercel Workflow](/docs/schedules/workflows) from a schedule, so the job retries failed steps and survives crashes and deployments.

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

## Features

- [**Recurring and one-time runs**](/docs/schedules/configuration): Run on a cron expression, or once at a specific date and time.
- [**Timezones and jitter**](/docs/schedules/concepts#timezones): Run each schedule in its own IANA timezone, spread across a jitter window.
- [**Private functions**](/docs/schedules/handle-runs#function-targets): Run a function that has no public URL, so only the scheduler can invoke it.
- [**Runtime schedules**](/docs/schedules/sdk): Create, update, and delete schedules from your app without redeploying.
- [**Multi-tenant namespaces**](/docs/schedules/multi-tenant): Group each customer's schedules so you can list and manage them together.
- [**Run, pause, and history**](/docs/schedules/manage): Run a schedule now, disable it, and review each run's outcome and duration.
- [**Local development**](/docs/schedules/local-development): Run schedules on your machine with `vercel dev` and trigger them on demand.

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

**Starting workflows**: Start a durable workflow each time a schedule fires. [Learn more →](/docs/schedules/workflows)

**Scheduling work for agents**: Give an agent a tool that schedules work for a user. [Learn more →](/docs/schedules/agents)

**Multi-tenant schedules**: Give each customer their own schedules with namespaces. [Learn more →](/docs/schedules/multi-tenant)

**Testing schedules locally**: Run and trigger schedules on your machine with vercel dev. [Learn more →](/docs/schedules/local-development)

**Configuration reference**: Look up every static schedule property and cron syntax. [Learn more →](/docs/schedules/configuration)

**JS SDK Reference**: Create and manage dynamic schedules with @vercel/schedules. [Learn more →](/docs/schedules/sdk)

**API Reference**: Call the Schedules API directly from any language. [Learn more →](/docs/schedules/http-api)

**CLI reference**: Manage schedules from the terminal with vercel schedules. [Learn more →](/docs/cli/schedules)

**Limits**: Check schedule counts, frequency, and jitter limits by plan. [Learn more →](/docs/schedules/limits)

**Migrate from Cron Jobs**: Move Cron Jobs to Schedules without changing your route code. [Learn more →](/docs/schedules/migrate-from-cron-jobs)

**Cron Jobs (legacy)**: Reference for Cron Jobs, which will be migrated to Schedules. [Learn more →](/docs/schedules/cron-jobs)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
