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
  - /docs/schedules/handle-runs
summary: Give an fx agent a tool that creates schedules, and send each run back into the session that created it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/agents/libfx.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "1eb1d74193f8ddc38dd703d20c4e6b6ed53dc7b67f3dda336d59e0ae08785c18"
---

# Scheduling Work with libfx

An [fx agent](/docs/agent-harnesses/fx) keeps each session in a durable log, so a scheduled task can come back to the conversation that created it. The tool stores the session ID in the schedule's payload, and the consumer prompts that session when the schedule fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Dynamic Scheduling](https://eve.dev/docs/patterns/dynamic-scheduling) — Compose one minute-level eve schedule, proactive channel handoff, and CRUD tools into application-managed schedules.
- [Scheduling Work with Pi](https://vercel.com/docs/schedules/agents/pi) — Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created i
- [Scheduling Work with the AI SDK](https://vercel.com/docs/schedules/agents/ai-sdk) — Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
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

## Related

- [Running fx durably on Vercel](/docs/agent-harnesses/fx)
- [Handling scheduled runs](/docs/schedules/handle-runs#queue-targets)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
