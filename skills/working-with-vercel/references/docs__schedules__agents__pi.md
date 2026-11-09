---
title: Scheduling Work with Pi
product: vercel
url: /docs/schedules/agents/pi
canonical_url: "https://vercel.com/docs/schedules/agents/pi"
last_updated: 2026-11-04
type: how-to
prerequisites:
  - /docs/schedules/agents
  - /docs/schedules
related:
  - /docs/agent-harnesses/pi
  - /docs/schedules/handle-runs
summary: Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/agents/pi.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "c8d4e87199e3f959e98ea8fee7d256fb6beb0ae78fa3c1317b67808892b65357"
---

# Scheduling Work with Pi

[`durable-harness/pi`](/docs/agent-harnesses/pi) runs Pi's agent loop with each session in a durable log, so a scheduled task can come back to the conversation that created it. The tool stores the session ID in the schedule's payload, and the consumer sends the prompt to that session when the schedule fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Scheduling Work with the AI SDK](https://vercel.com/docs/schedules/agents/ai-sdk) — Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
- [Scheduling Work with libfx](https://vercel.com/docs/schedules/agents/libfx) — Give an fx agent a tool that creates schedules, and send each run back into the session that created it.
- [Scheduling Work with eve](https://vercel.com/docs/schedules/agents/eve) — Let an eve agent create recurring and one-time schedules for its users with defineDynamicSchedules.
- [Tools, Files, and Documents in Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/tools) — What tools do when a durable agent harness resumes after a crash, where its files live, and how to keep typed state with
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and

Full cross-link map for this page: [/docs/schedules/agents/pi.graph.md](/docs/schedules/agents/pi.graph.md)
<!-- /docsgraph:related -->

## Add a scheduling tool

Record the user when the session starts. Tools read it from `io.ctx.config`, and the session ID from `io.ctx.runId`:

```ts
const { sessionId } = await agent.sessions.start({ config: { userId, timezone } });
```

Then add the tool. With `replay: 'never'`, a call interrupted by a crash isn't run again, so it can't create a second schedule. The model is told the call may have run instead:

```ts filename="lib/agent.ts"
import type { HostTool } from 'durable-harness';
import { pi } from 'durable-harness/pi';
import { Schedules } from '@vercel/schedules';

const scheduleTask: HostTool<{ prompt: string; cron?: string; at?: string }> = {
  name: 'schedule_task',
  description: 'Schedule work to run later in this conversation',
  replay: 'never',
  inputSchema: {
    type: 'object',
    properties: {
      prompt: { type: 'string', description: 'What to do when the task fires' },
      cron: { type: 'string', description: 'Cron expression, for recurring tasks' },
      at: { type: 'string', description: 'Local time YYYY-MM-DDTHH:mm, for one-time tasks' },
    },
    required: ['prompt'],
  },
  execute: async ({ prompt, cron, at }, io) => {
    const { userId, timezone } = io.ctx.config as { userId: string; timezone: string };
    await Schedules.create({
      name: `task-${io.stepId}`,
      namespace: userId,
      expression: cron ? { type: 'cron', cron } : { type: 'single', at: at! },
      timezone,
      target: { topic: 'agent-tasks' },
      payload: { sessionId: io.ctx.runId, prompt },
    });
    return 'Scheduled.';
  },
};

export const agent = pi({
  model: 'anthropic/claude-sonnet-5.5',
  tools: [scheduleTask],
  // Required for `send` with an `identity`, which the consumer below uses to skip redeliveries.
  durability: 'strict',
});
```

## Wake the session

When the schedule fires, send the prompt to the session it came from. The session's own queue route runs the turn. Pass the run's `executionId` as the `identity`, so a redelivered message returns the original submission instead of starting another turn:

```ts filename="app/api/agent-tasks/route.ts"
import { handleCallback } from '@vercel/queue';
import type { ScheduleQueueMessage } from '@vercel/schedules';
import { agent } from '@/lib/agent';

type TaskMessage = ScheduleQueueMessage<{ sessionId: string; prompt: string }>;

export const POST = handleCallback<TaskMessage>(async ({ executionId, payload }) => {
  if (!payload) return;
  await agent.sessions.send(payload.sessionId, `Scheduled task: ${payload.prompt}`, 'prompt', {
    identity: `task-${executionId}`,
  });
});
```

```json filename="vercel.json"
{
  "functions": {
    "app/api/agent-tasks/route.ts": {
      "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "agent-tasks" }]
    }
  }
}
```

The scheduled turn is part of the session, so it streams to anyone following the session, and shows up in its history.

## Related

- [Running Pi durably on Vercel](/docs/agent-harnesses/pi)
- [Handling scheduled runs](/docs/schedules/handle-runs#queue-targets)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
