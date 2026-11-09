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
summary: Let an eve agent create recurring and one-time schedules for its users with defineDynamicSchedules.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/agents/eve.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "2b20c20c91e42eaced86bc40af788e9f052403205256d549b586b3e641a44c60"
---

# Scheduling Work with eve

[eve](/docs/agent-harnesses/eve) has dynamic scheduling built in, and it runs on Vercel Schedules. Export a `defineDynamicSchedules` definition from `agent/schedules/`. eve gives the model tools to create, list, update, and cancel schedules, and calls `run` each time one fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Dynamic Scheduling](https://eve.dev/docs/patterns/dynamic-scheduling) — Compose one minute-level eve schedule, proactive channel handoff, and CRUD tools into application-managed schedules.
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Scheduling Work with the AI SDK](https://vercel.com/docs/schedules/agents/ai-sdk) — Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
- [Scheduling Work with libfx](https://vercel.com/docs/schedules/agents/libfx) — Give an fx agent a tool that creates schedules, and send each run back into the session that created it.
- [Scheduling Work with Pi](https://vercel.com/docs/schedules/agents/pi) — Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created i
- [Creating Schedules for Each Customer](https://vercel.com/docs/schedules/multi-tenant) — Use schedule namespaces to give each customer in a multi-tenant app their own recurring and one-time schedules.
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy

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

## Related

- [Dynamic schedules in eve](https://eve.dev/docs/experimental/dynamic-schedules)
- [eve on Vercel](/docs/agent-harnesses/eve)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
