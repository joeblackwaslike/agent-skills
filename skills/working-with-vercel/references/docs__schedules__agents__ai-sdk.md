---
title: Scheduling Work with the AI SDK
product: vercel
url: /docs/schedules/agents/ai-sdk
canonical_url: "https://vercel.com/docs/schedules/agents/ai-sdk"
last_updated: 2026-11-04
type: how-to
prerequisites:
  - /docs/schedules/agents
  - /docs/schedules
related:
  - /docs/schedules/agents/libfx
  - /docs/schedules/agents/pi
  - /docs/schedules/sdk
  - /docs/queues/concepts
  - /docs/schedules/multi-tenant
summary: Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/schedules/agents/ai-sdk.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "02b61d0fc9d9748df9b8757102c37a3c16accca056ba71e8ca44f5e56fa34d0d"
---

# Scheduling Work with the AI SDK

With the [AI SDK](https://ai-sdk.dev), add a tool that creates a schedule, and run the scheduled prompt with `generateText` when it fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Scheduling Work with eve](https://vercel.com/docs/schedules/agents/eve) — Let an eve agent create recurring and one-time schedules for its users with defineDynamicSchedules.
- [AI SDK](https://vercel.com/docs/ai-sdk) — Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.
- [Chat SDK with AI Gateway](https://vercel.com/docs/chat-sdk/integrations/ai-gateway) — Stream AI Gateway model responses into Chat SDK conversations with AI SDK and message history.
- [Managing Schedules](https://vercel.com/docs/schedules/manage) — View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI,
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples

Full cross-link map for this page: [/docs/schedules/agents/ai-sdk.graph.md](/docs/schedules/agents/ai-sdk.graph.md)
<!-- /docsgraph:related -->

## Add a scheduling tool

Bind the tool to the user who is chatting, so the model can only schedule for them. The `toolCallId` gives each schedule a unique name:

```ts filename="lib/tools.ts"
import { tool } from 'ai';
import { z } from 'zod';
import { Schedules } from '@vercel/schedules';

export const scheduleTask = (userId: string, timezone: string) =>
  tool({
    description: 'Schedule work to run later, once or on a recurring basis',
    inputSchema: z.object({
      prompt: z.string().describe('Standalone instruction to run when the task fires'),
      cron: z.string().optional().describe('Cron expression, for recurring tasks'),
      at: z.string().optional().describe('Local time YYYY-MM-DDTHH:mm, for one-time tasks'),
    }),
    execute: async ({ prompt, cron, at }, { toolCallId }) => {
      await Schedules.create({
        name: `task-${toolCallId}`,
        namespace: userId,
        expression: cron ? { type: 'cron', cron } : { type: 'single', at: at! },
        timezone,
        target: { topic: 'agent-tasks' },
        payload: { prompt },
      });
      return 'Scheduled.';
    },
  });
```

Pass it to `streamText` in your chat route:

```ts filename="app/api/chat/route.ts"
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from 'ai';
import { scheduleTask } from '@/lib/tools';

export async function POST(request: Request) {
  const { messages, userId, timezone } = (await request.json()) as {
    messages: UIMessage[];
    userId: string;
    timezone: string;
  };

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    system: `The user's time zone is ${timezone}. It is now ${new Date().toISOString()}.`,
    messages: await convertToModelMessages(messages),
    tools: { schedule_task: scheduleTask(userId, timezone) },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
```

In production, take the user's ID from your authentication, not the request body.

## Run the task when it fires

The consumer runs the stored prompt as a new turn. The scheduled turn has no chat history, so the prompt has to stand on its own. Deliver the result however your app reaches users, such as email, Slack, or a saved message. A message can be delivered more than once, so pass `executionId` along to skip a run you've already delivered:

```ts filename="app/api/agent-tasks/route.ts"
import { handleCallback } from '@vercel/queue';
import type { ScheduleQueueMessage } from '@vercel/schedules';
import { generateText } from 'ai';
import { notifyUser } from '@/lib/notify';

type TaskMessage = ScheduleQueueMessage<{ prompt: string }>;

export const POST = handleCallback<TaskMessage>(async ({ executionId, namespace, payload }) => {
  if (!payload) return;
  const { text } = await generateText({
    model: 'anthropic/claude-sonnet-5.5',
    prompt: payload.prompt,
  });
  await notifyUser(namespace, text, { id: executionId });
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

## Frequently asked questions

### Does a scheduled AI SDK task have access to the chat history?

No. The consumer calls `generateText` with only the prompt stored in the schedule's payload, so the scheduled turn starts without the earlier messages. Have the model write the prompt as a complete instruction that includes every detail the task needs. To give the turn more context, store a conversation ID in the payload and load that conversation's messages in the consumer before you call `generateText`. To send the prompt into the session that created the schedule instead, use a durable harness such as [libfx](/docs/schedules/agents/libfx) or [Pi](/docs/schedules/agents/pi).

### How does the model turn "tomorrow at 9" into a schedule?

The chat route's system prompt gives the model the user's time zone and the current time, so the model can work out the date. The tool takes a one-time task as a local date and time in `YYYY-MM-DDTHH:mm` format, and passes the user's time zone to `Schedules.create()` as `timezone`. Vercel evaluates the time in that time zone, so the value can't include `Z` or a UTC offset. A time in the past fails with `single_at_in_past`. Return the error's message to the model so it can correct the call.

### How do I let users list or cancel the tasks an agent scheduled?

Add tools that call `Schedules.list()` and `Schedules.delete()` with the user's ID as the `namespace`. Bind those tools to the signed-in user the same way as the scheduling tool, so the model can only reach that user's schedules. `Schedules.list()` returns 20 schedules per page by default and up to 100, with a `cursor` for the next page. `Schedules.delete()` takes the schedule's `name` and stops its future runs. See the [JS SDK reference](/docs/schedules/sdk).

### How do I stop a scheduled AI SDK task from sending its result twice?

Use the message's `executionId` as an idempotency key. [Vercel Queues](/docs/queues/concepts#at-least-once-delivery) delivers each message at least once, so the same scheduled run can reach your consumer more than once. The `executionId` is the same for every delivery of a run. Record it when you deliver a result, and skip a run whose `executionId` you've already recorded. Naming each schedule after the `toolCallId` protects the other step: if the same tool call runs again, `Schedules.create()` fails with `schedule_already_exists` instead of creating a second schedule.

### What happens when a scheduled AI SDK task fails?

Vercel Queues retries it. When the consumer throws, for example because the model call fails, `handleCallback` doesn't acknowledge the message, and the queue delivers it again after `retryAfterSeconds`, which defaults to 60 seconds. Retries continue until the consumer succeeds or the message expires. Each retry calls the model again, so set `maxDeliveries` on the queue trigger in `vercel.json` to limit the number of deliveries. See [Retries](/docs/queues/concepts#retries).

## Related

- [Multi-tenant schedules](/docs/schedules/multi-tenant)
- [AI Gateway](/docs/ai-gateway)

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
