---
title: Scheduling Work with eve
product: vercel
url: /docs/schedules/agents/eve
canonical_url: "https://vercel.com/docs/schedules/agents/eve"
last_updated: 2026-11-04
type: how-to
prerequisites:
  - /docs/schedules/agents
  - /docs/schedules
related:
  - /docs/agent-harnesses/eve
  - /docs/queues
  - /docs/schedules/local-development
summary: Let an eve agent create recurring and one-time schedules for its users with defineDynamicSchedules.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/schedules/agents/eve.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4a58af25aa6203962ad20e0c02a9e5a1923755e2c582e0c5b4dac61c6c7314e1"
---

# Scheduling Work with eve

[eve](/docs/agent-harnesses/eve) has dynamic scheduling built in, and it runs on Vercel Schedules. Export a `defineDynamicSchedules` definition from `agent/schedules/`. eve gives the model tools to create, list, update, and cancel schedules, and calls `run` each time one fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Managing Schedules](https://vercel.com/docs/schedules/manage) — View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI,
- [Scheduling Work with the AI SDK](https://vercel.com/docs/schedules/agents/ai-sdk) — Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
- [Vercel Schedules: JS SDK Reference](https://vercel.com/docs/schedules/sdk) — Reference for @vercel/schedules: create, list, update, enable, disable, invoke, and delete schedules, and handle schedul
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy
- [vercel schedules](https://vercel.com/docs/cli/schedules) — Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a loca

Full cross-link map for this page: [/docs/schedules/agents/eve.graph.md](/docs/schedules/agents/eve.graph.md)
<!-- /docsgraph:related -->

```ts filename="agent/schedules/reminders.ts"
import { defineDynamicSchedules } from 'eve/experimental/schedules';
import { z } from 'zod';
import slack from '../channels/slack';
import { resolveCurrentUser, resolveDm } from '../lib/users';

export default defineDynamicSchedules({
  description: "Schedule tasks that report back in the creator's Slack DM.",
  inputSchema: z.object({ task: z.string().min(1).max(2000) }).strict(),
  // Look up the creator's current access before each run. Return null to deny.
  auth: ({ principal }) => resolveCurrentUser(principal),
  async run({ payload, occurrence, to, auth }) {
    await to(slack, await resolveDm(auth)).send(`Do this task now: ${payload.task}`, {
      // Runs can repeat; the same key reaches the session the first attempt started.
      idempotencyKey: `${occurrence.executionId}:task`,
    });
  },
});
```

The file path names the definition, so `agent/schedules/reminders.ts` gives the model tools like `schedule__reminders__create`. Schedules are scoped to the user who created them, and changes need the user's approval by default.

The model picks the timing:

| Expression | Example                                                                    |
| ---------- | -------------------------------------------------------------------------- |
| `delay`    | `{ type: 'delay', minutes: 30 }`                                           |
| `single`   | `{ type: 'single', at: '2026-11-15T09:00', timezone: 'America/New_York' }` |
| `cron`     | `{ type: 'cron', cron: '0 9 * * 1-5', timezone: 'America/New_York' }`      |

## Frequently asked questions

### What's the difference between `defineSchedule` and `defineDynamicSchedules` in eve?

`defineSchedule` runs an eve agent on a fixed cron cadence that you write in code. `defineDynamicSchedules` lets users and the agent create recurring or one-time schedules while the agent runs, so use it when a user or the model picks the timing. On Vercel, eve stores dynamic schedules in Vercel Schedules, which delivers each run through [Vercel Queues](/docs/queues). The dynamic schedules API is experimental and may change, and you import it from `eve/experimental/schedules`. For fixed schedules, see [Schedules](https://eve.dev/docs/schedules) in the eve docs.

### Which tools does `defineDynamicSchedules` give the model?

Each definition adds one tool for each operation: `create`, `get`, `list`, `update`, `enable`, `disable`, `invoke`, and `delete`. eve names the tools after the definition's file path, so `agent/schedules/reminders.ts` adds `schedule__reminders__create`, `schedule__reminders__list`, and so on. By default, the tools that read schedules need no approval, and the tools that change schedules need the user's approval. Set `approval` to choose a policy for each operation, or set `tool: false` to manage schedules only from your own code.

### Who can see or change a schedule that an eve agent creates?

By default, only the user who created it. The default `scope`, `byPrincipal`, limits each caller to their own schedules, and eve checks `scope` on every operation. Before each run, eve also calls your `auth` function with the creator's identity. Use `auth` to look up the creator's current account status and permissions, and return `null` to deny the run. To share schedules between users, write a custom `scope` function that authorizes each operation before it returns a namespace.

### Does a scheduled eve task reply in the conversation that created it?

Not by default. eve doesn't save the conversation that created a schedule, and `to(channel, target).send()` always starts a new session, even when the target names an existing thread. No one is present in a scheduled session, so it can't wait for an approval or an answer to a question. Give scheduled tasks tools that run without approval. To reply in the original thread, save an authorized thread reference with `preparePayload` and use it as the target in `run`.

### How do I test eve dynamic schedules locally?

Run the agent with `eve dev` or `vercel dev`. Under `eve dev`, eve keeps schedules in process-local storage with no background clock, so a schedule doesn't fire at its scheduled time. Call `invoke` through the schedules client to dispatch a run. Under `vercel dev` with local Schedules and Queues support, the [local Schedules service](/docs/schedules/local-development) stores the timing, and eve delivers due runs automatically. The default provider rejects schedule operations in self-hosted production, so use the [application-managed scheduling pattern](https://eve.dev/docs/patterns/dynamic-scheduling) there.

## Related

- [Dynamic schedules in eve](https://eve.dev/docs/experimental/dynamic-schedules)
- [eve on Vercel](/docs/agent-harnesses/eve)

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
