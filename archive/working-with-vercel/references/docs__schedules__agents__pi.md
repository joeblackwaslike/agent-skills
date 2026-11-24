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
  - /docs/agent-harnesses/tools
  - /docs/functions/limitations
  - /docs/schedules/handle-runs
summary: Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/schedules/agents/pi.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "e50f6488738eb2d6a43be584f190968f0a613bc1ef75d9694ecb1b21c4055e66"
---

# Scheduling Work with Pi

[`durable-harness/pi`](/docs/agent-harnesses/pi) runs Pi's agent loop with each session in a durable log, so a scheduled task can come back to the conversation that created it. The tool stores the session ID in the schedule's payload, and the consumer sends the prompt to that session when the schedule fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Scheduling Work with the AI SDK](https://vercel.com/docs/schedules/agents/ai-sdk) — Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
- [Scheduling Work with libfx](https://vercel.com/docs/schedules/agents/libfx) — Give an fx agent a tool that creates schedules, and send each run back into the session that created it.
- [Running Agent Harnesses Durably on Vercel](https://vercel.com/docs/agent-harnesses) — Run Pi, fx, OpenCode, eve, Claude Code, and Codex on Vercel so a crash, a function timeout, or a redeploy resumes the ag
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Security for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/security) — What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, an

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

## Frequently asked questions

### Why does the Pi scheduling tool use `replay: 'never'`?

`replay` tells `durable-harness` what to do with a tool call that a crash interrupts. The harness runs a `'safe'` tool again. It doesn't run a `'never'` tool again, so an interrupted `Schedules.create()` call can't create a second schedule. Instead, the harness tells the model that the call may or may not have run, and the model can check before it tries again. Before a `'never'` call starts, the harness waits until the session's log records it. See [What happens to a tool call after a crash](/docs/agent-harnesses/tools#what-happens-to-a-tool-call-after-a-crash).

### Why does the Pi agent set `durability: 'strict'`?

The consumer passes an `identity` to `agent.sessions.send()`, and `identity` only works on a session with `durability: 'strict'`. `durable-harness/pi` defaults to `durability: 'on'`, where writes to the session's log trail the agent. With `'strict'`, every write is durable before the agent goes on, and a message is in the log before `send` returns. The tradeoff is that each step waits for the log.

### What happens when Vercel Queues redelivers a scheduled message to a Pi session?

The redelivered message doesn't start a second turn. The consumer builds the submission's `identity` from the run's `executionId`, which is the same for every delivery of a scheduled run. When `agent.sessions.send()` receives an `identity` that the session has already seen with the same text, it returns the original submission's ID. If the same `identity` arrives with different text, `send` throws `SubmissionConflict`.

### How does the Pi scheduling tool know which user and session it's running for?

`durable-harness` passes both to the tool in `io.ctx`. Record the user's ID and time zone as `config` when you call `agent.sessions.start()`, and the tool reads them from `io.ctx.config`. The session ID is `io.ctx.runId`, which the tool stores in the schedule's payload. Your code sets `config`, so the model can't change the namespace that the tool creates a schedule in. The harness records `config` with the session, so don't put secrets in it.

### Does the queue consumer run the scheduled Pi turn itself?

No. `agent.sessions.send()` writes the prompt to the session's log and returns, and the session's own queue route runs the turn. The consumer only needs to run long enough to submit the prompt. The scheduled turn is as durable as any other turn in the session. If the function running the turn crashes or reaches its [maximum duration](/docs/functions/limitations#max-duration), another function continues the turn from the log.

## Related

- [Running Pi durably on Vercel](/docs/agent-harnesses/pi)
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
