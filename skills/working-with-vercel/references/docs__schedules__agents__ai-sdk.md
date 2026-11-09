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
  - /docs/schedules/multi-tenant
  - /docs/ai-gateway
summary: Give an AI SDK agent a tool that creates schedules, and run each scheduled task as a new agent turn.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/agents/ai-sdk.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f947f348cde9442ecdb260df6ebde4329aa2cb2fd02b7c4f55d42a9a7c220621"
---

# Scheduling Work with the AI SDK

With the [AI SDK](https://ai-sdk.dev), add a tool that creates a schedule, and run the scheduled prompt with `generateText` when it fires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Build an AI Chat Agent with Weather API Tool Calling](https://vercel.com/kb/guide/build-ai-agent-weather-api) — Build an intelligent conversational agent that fetches real-time weather data using the AI SDK, tool calling, and a back
- [Scheduling Work with Pi](https://vercel.com/docs/schedules/agents/pi) — Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created i
- [Scheduling Work with libfx](https://vercel.com/docs/schedules/agents/libfx) — Give an fx agent a tool that creates schedules, and send each run back into the session that created it.
- [Scheduling Work with eve](https://vercel.com/docs/schedules/agents/eve) — Let an eve agent create recurring and one-time schedules for its users with defineDynamicSchedules.
- [Vercel Schedules: JS SDK Reference](https://vercel.com/docs/schedules/sdk) — Reference for @vercel/schedules: create, list, update, enable, disable, invoke, and delete schedules, and handle schedul
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

## Related

- [Multi-tenant schedules](/docs/schedules/multi-tenant)
- [AI Gateway](/docs/ai-gateway)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
