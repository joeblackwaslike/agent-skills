---
title: Scheduling Work with libfx
product: vercel
url: /docs/schedules/agents/libfx
canonical_url: "https://vercel.com/docs/schedules/agents/libfx"
last_updated: 2026-11-04
type: how-to
prerequisites:
  - /docs/schedules/agents
  - /docs/schedules
related:
  - /docs/agent-harnesses/fx
  - /docs/queues/concepts
  - /docs/schedules/multi-tenant
  - /docs/schedules/local-development
  - /docs/schedules/handle-runs
summary: Give an fx agent a tool that creates schedules, and send each run back into the session that created it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/schedules/agents/libfx.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "135341e58b7a326eb8fe5b5110dee8719bf0b426f9f103501dc79f4872161151"
---

# Scheduling Work with libfx

An [fx agent](/docs/agent-harnesses/fx) keeps each session in a durable log, so a scheduled task can come back to the conversation that created it. The tool stores the session ID in the schedule's payload, and the consumer prompts that session when the schedule fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Scheduling Work with the AI SDK](https://vercel.com/docs/schedules/agents/ai-sdk) — Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
- [Scheduling Work with Pi](https://vercel.com/docs/schedules/agents/pi) — Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created i
- [Scheduling Work with eve](https://vercel.com/docs/schedules/agents/eve) — Let an eve agent create recurring and one-time schedules for its users with defineDynamicSchedules.
- [Vercel Schedules: JS SDK Reference](https://vercel.com/docs/schedules/sdk) — Reference for @vercel/schedules: create, list, update, enable, disable, invoke, and delete schedules, and handle schedul
- [Schedules Concepts](https://vercel.com/docs/schedules/concepts) — Learn how Vercel Schedules handles environments, deployments, jitter, one-time schedules, late runs, and duplicate deliv

Full cross-link map for this page: [/docs/schedules/agents/libfx.graph.md](/docs/schedules/agents/libfx.graph.md)
<!-- /docsgraph:related -->

## Add a scheduling tool

Each tool call receives the session's ID and the `context` you pass to `agent.session()`. With `idempotent: true`, a call interrupted by a crash runs again. `executionId` stays the same when it does, so use it in the schedule name: the rerun finds the existing schedule instead of creating a second one.

```ts filename="lib/agent.ts"
import { createFxAgent } from 'libfx';
import { Schedules, SchedulesApiError } from '@vercel/schedules';

export const agent = createFxAgent({
  model: 'anthropic/claude-sonnet-5.5',
  tools: [
    {
      name: 'schedule_task',
      description: 'Schedule work to run later in this conversation',
      idempotent: true,
      inputSchema: {
        type: 'object',
        properties: {
          prompt: { type: 'string', description: 'What to do when the task fires' },
          cron: { type: 'string', description: 'Cron expression, for recurring tasks' },
          at: { type: 'string', description: 'Local time YYYY-MM-DDTHH:mm, for one-time tasks' },
        },
        required: ['prompt'],
      },
      execute: async ({ prompt, cron, at }, { executionId, sessionId, context }) => {
        const { userId, timezone } = context as { userId: string; timezone: string };
        try {
          await Schedules.create({
            name: `task-${executionId}`,
            namespace: userId,
            expression: cron ? { type: 'cron', cron } : { type: 'single', at: at! },
            timezone,
            target: { topic: 'agent-tasks' },
            payload: { sessionId, prompt, userId, timezone },
          });
        } catch (error) {
          // A rerun after a crash finds the schedule the first attempt created.
          if (!(error instanceof SchedulesApiError && error.code === 'schedule_already_exists')) {
            throw error;
          }
        }
        return 'Scheduled.';
      },
    },
  ],
});
```

Open each session with the user's context, so the tool knows who it's scheduling for:

```ts
agent.session(sessionId, { context: { userId, timezone } }).prompt(text);
```

## Wake the session

When the schedule fires, prompt the session it came from. Pass the run's `executionId` as the `messageId`, so a redelivered message reaches the same turn instead of starting another:

```ts filename="api/agent-tasks.ts"
import { handleCallback } from '@vercel/queue';
import type { ScheduleQueueMessage } from '@vercel/schedules';
import { agent } from '../lib/agent';

type TaskMessage = ScheduleQueueMessage<{
  sessionId: string;
  prompt: string;
  userId: string;
  timezone: string;
}>;

export const POST = handleCallback<TaskMessage>(async ({ executionId, payload }) => {
  if (!payload) return;
  const { sessionId, prompt, userId, timezone } = payload;
  const turn = agent
    .session(sessionId, { context: { userId, timezone } })
    .prompt(`Scheduled task: ${prompt}`, { messageId: `task-${executionId}` });
  await turn.result;
});
```

Subscribe the consumer to the topic, next to libfx's own queue route:

```json filename="vercel.json"
{
  "functions": {
    "api/agent-tasks.ts": {
      "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "agent-tasks" }]
    }
  }
}
```

The scheduled turn is part of the session, so it appears when the user reads the conversation from `session.stream()`.

## Frequently asked questions

### Why does the fx scheduling tool set `idempotent: true`?

libfx refuses a tool that doesn't say whether it's safe to run twice. With `idempotent: true`, libfx runs a tool call again if a crash interrupts it, and the call's `executionId` stays the same when it runs again. The tool uses `executionId` in the schedule's name, so the second `Schedules.create()` call fails with `schedule_already_exists` instead of creating another schedule, and the tool treats that error as success. With `idempotent: false`, libfx doesn't run the interrupted call again and tells the model that the call may have partly run.

### How do I stop a redelivered message from running a scheduled fx task twice?

Build the prompt's `messageId` from the run's `executionId`. [Vercel Queues](/docs/queues/concepts#at-least-once-delivery) delivers each message at least once, and the `executionId` is the same for every delivery of a scheduled run. When libfx receives a prompt with a `messageId` that it has already accepted, it runs nothing new. The repeated prompt follows the original turn, and its result has `repeated: true`.

### How does a user see the result of a scheduled fx task?

The scheduled turn is part of the fx session, so its events appear in the session's stream. A client that reads the conversation with `session.stream()` receives the turn. Each line from `session.stream()` carries a `cursor`, and the client passes the last one back to resume after it. A user who isn't connected sees the scheduled turn the next time they open the conversation. To alert the user sooner, send a notification from the consumer after `turn.result` resolves.

### How does a scheduled fx turn know which user it's for?

The scheduling tool reads `userId` and `timezone` from the `context` that you pass to `agent.session()`, and stores them in the schedule's payload with the session ID. When the schedule fires, the consumer opens the session with the same `context`, so every tool call in the scheduled turn receives that user and time zone. The tool also takes the schedule's namespace from `context`, not from the model's input, which keeps each user's schedules in their own [namespace](/docs/schedules/multi-tenant).

### How do I test a scheduled fx task on my machine?

Run `vercel dev`. It starts a local Schedules service and configures `@vercel/schedules` to use it, so the tool's `Schedules.create()` call creates a local schedule and never touches production. `vercel dev` delivers each run to your local queue consumer in the same message format as production. To run a schedule without waiting for its time, run `vercel schedules invoke <name> --namespace <user-id> --local` in a second terminal. Local schedules exist only for the current `vercel dev` session. See [Testing schedules locally](/docs/schedules/local-development).

## Related

- [Running fx durably on Vercel](/docs/agent-harnesses/fx)
- [Handling scheduled runs](/docs/schedules/handle-runs#queue-targets)

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
