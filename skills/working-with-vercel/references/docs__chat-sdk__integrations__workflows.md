---
title: Chat SDK with Vercel Workflows
product: vercel
url: /docs/chat-sdk/integrations/workflows
canonical_url: "https://vercel.com/docs/chat-sdk/integrations/workflows"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/integrations
  - /docs/chat-sdk
related:
  - /docs/workflows
  - /docs/chat-sdk/quickstart
summary: Use Vercel Workflows to pause Chat SDK tasks for human approval, resume after a decision, and inspect runs in the Vercel dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/integrations/workflows.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "1f4e8243d1ba7b398dd5b60116b62c78f72033a6e88ba77f7f90295fbb1538f2"
---

# Chat SDK with Vercel Workflows

Use [Vercel Workflows](/docs/workflows) to pause a task from a chat message until a person approves an action. Use Chat SDK approval cards and verified button callbacks to resume the workflow after approval or denial, or let it expire after a timeout.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Run and track deploys from Slack](https://vercel.com/kb/guide/run-and-track-deploys-from-slack) — Build a Slack deploy bot with Chat SDK and Vercel Workflows. Dispatch GitHub Actions from a slash command, gate producti
- [Pause workflows for approval with Chat SDK](https://vercel.com/changelog/chat-sdk-durable-approvals)
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [Chat SDK with Vercel Sandbox](https://vercel.com/docs/chat-sdk/integrations/sandbox) — Build a Chat SDK agent that analyzes CSV attachments with the AI SDK Bash tool in Vercel Sandbox.

Full cross-link map for this page: [/docs/chat-sdk/integrations/workflows.graph.md](/docs/chat-sdk/integrations/workflows.graph.md)
<!-- /docsgraph:related -->

[Workflow SDK](https://workflow-sdk.dev) is the open-source library you use to write workflows in JavaScript or TypeScript. **Vercel Workflows** runs those workflows on Vercel, managing execution and persistence and providing observability in the Vercel dashboard. You write the approval logic with the SDK, then deploy the bot to Vercel to run it on the managed service.

## Prerequisites

Use the Next.js project from the [Chat SDK quickstart](/docs/chat-sdk/quickstart), with Slack, Vercel Connect, and Redis configured. This example uses Slack interactive cards; it does not use the Web Adapter's text-only browser stream.

Choose the Slack user IDs allowed to approve and store them as a comma-separated `CHAT_APPROVER_IDS` environment variable. Use IDs from the workspace where the bot is installed. Do not derive the approver list from the incoming message.

## Configure Workflow SDK

Install the `workflow` package to define workflows and steps with Workflow SDK:

```bash filename="Terminal"
pnpm add workflow
```

Wrap your existing Next.js configuration with `withWorkflow`:

**next.config.ts**

```typescript filename="next.config.ts"
import { withWorkflow } from 'workflow/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default withWorkflow(nextConfig);
```

**next.config.js**

```javascript filename="next.config.js"
import { withWorkflow } from 'workflow/next';

const nextConfig = {};

export default withWorkflow(nextConfig);
```

Keep your existing configuration fields. If you use Proxy or middleware, exclude `/.well-known/workflow/` from its matcher. See [Workflow SDK with Next.js](https://workflow-sdk.dev/docs/getting-started/next) for framework setup and deployment requirements.

## Share the bot configuration

Move your existing `Chat` instance into `src/lib/chat.ts`, leaving event handlers in `src/lib/bot.ts`. Keep the shared configuration in this module:

**src/lib/chat.ts**

```typescript filename="src/lib/chat.ts"
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state: createRedisState(),
});
```

**src/lib/chat.js**

```javascript filename="src/lib/chat.js"
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state: createRedisState(),
});
```

Workflow steps import this configuration and call `initialize()` before using Redis or an adapter. Pass the thread ID between steps and restore the thread with `bot.thread()`, so each step can run in a fresh server process.

## Create the approval workflow

Create `src/workflows/approve-announcement.ts`. The workflow waits durably for a callback. Each step initializes the bot before posting or editing a message:

**src/workflows/approve-announcement.ts**

```typescript filename="src/workflows/approve-announcement.ts"
import { buildApprovalCard, buildResolvedCard } from 'chat/workflow';
import { createWebhook, sleep } from 'workflow';

const title = 'Publish this announcement?';

export async function approveAnnouncement(
  threadId: string,
  announcement: string,
  approvers: string[],
) {
  'use workflow';

  using webhook = createWebhook();
  let messageId = await postCard(threadId, announcement, webhook.url);
  const timeout = sleep('24h').then(() => null);
  const clicks = webhook[Symbol.asyncIterator]();
  let approved = false;
  let outcome = 'Approval timed out. Nothing was published.';

  while (true) {
    const next = await Promise.race([clicks.next(), timeout]);
    if (next === null || next.done) break;

    const payload = await next.value.json().catch(() => null);
    if (
      payload?.type !== 'action' ||
      typeof payload.user?.id !== 'string' ||
      !['approve', 'deny'].includes(payload.actionId)
    )
      continue;

    if (!approvers.includes(payload.user.id)) {
      await postNotice(
        threadId,
        "You aren't authorized to decide this approval.",
      );
      messageId = await postCard(
        threadId,
        announcement,
        webhook.url,
        messageId,
      );
      continue;
    }

    approved = payload.actionId === 'approve';
    outcome = approved
      ? `Approved by ${payload.user.id}.`
      : 'Announcement denied. Nothing was published.';
    break;
  }

  await finishApproval(threadId, messageId, announcement, outcome, approved);
}

async function postCard(
  threadId: string,
  announcement: string,
  callbackUrl: string,
  previousMessageId?: string,
) {
  'use step';
  const { bot } = await import('../lib/chat');
  await bot.initialize();
  const thread = bot.thread(threadId);
  if (previousMessageId) {
    await thread.adapter.editMessage(
      threadId,
      previousMessageId,
      buildResolvedCard(
        { title, description: announcement },
        'Still pending. Use the new approval card.',
      ),
    );
  }
  const message = await thread.post(
    buildApprovalCard({ title, description: announcement }, callbackUrl),
  );
  return message.id;
}

async function postNotice(threadId: string, text: string) {
  'use step';
  const { bot } = await import('../lib/chat');
  await bot.initialize();
  await bot.thread(threadId).post(text);
}

async function finishApproval(
  threadId: string,
  messageId: string,
  announcement: string,
  outcome: string,
  approved: boolean,
) {
  'use step';
  const { bot } = await import('../lib/chat');
  await bot.initialize();
  const thread = bot.thread(threadId);
  await thread.adapter.editMessage(
    threadId,
    messageId,
    buildResolvedCard({ title, description: announcement }, outcome),
  );
  await thread.post(
    approved ? `Approved announcement: ${announcement}` : outcome,
  );
}
```

**src/workflows/approve-announcement.js**

```javascript filename="src/workflows/approve-announcement.js"
import { buildApprovalCard, buildResolvedCard } from 'chat/workflow';
import { createWebhook, sleep } from 'workflow';

const title = 'Publish this announcement?';

export async function approveAnnouncement(threadId, announcement, approvers) {
  'use workflow';

  using webhook = createWebhook();
  let messageId = await postCard(threadId, announcement, webhook.url);
  const timeout = sleep('24h').then(() => null);
  const clicks = webhook[Symbol.asyncIterator]();
  let approved = false;
  let outcome = 'Approval timed out. Nothing was published.';

  while (true) {
    const next = await Promise.race([clicks.next(), timeout]);
    if (next === null || next.done) break;

    const payload = await next.value.json().catch(() => null);
    if (
      payload?.type !== 'action' ||
      typeof payload.user?.id !== 'string' ||
      !['approve', 'deny'].includes(payload.actionId)
    )
      continue;

    if (!approvers.includes(payload.user.id)) {
      await postNotice(
        threadId,
        "You aren't authorized to decide this approval.",
      );
      messageId = await postCard(
        threadId,
        announcement,
        webhook.url,
        messageId,
      );
      continue;
    }

    approved = payload.actionId === 'approve';
    outcome = approved
      ? `Approved by ${payload.user.id}.`
      : 'Announcement denied. Nothing was published.';
    break;
  }

  await finishApproval(threadId, messageId, announcement, outcome, approved);
}

async function postCard(
  threadId,
  announcement,
  callbackUrl,
  previousMessageId,
) {
  'use step';
  const { bot } = await import('../lib/chat');
  await bot.initialize();
  const thread = bot.thread(threadId);
  if (previousMessageId) {
    await thread.adapter.editMessage(
      threadId,
      previousMessageId,
      buildResolvedCard(
        { title, description: announcement },
        'Still pending. Use the new approval card.',
      ),
    );
  }
  const message = await thread.post(
    buildApprovalCard({ title, description: announcement }, callbackUrl),
  );
  return message.id;
}

async function postNotice(threadId, text) {
  'use step';
  const { bot } = await import('../lib/chat');
  await bot.initialize();
  await bot.thread(threadId).post(text);
}

async function finishApproval(
  threadId,
  messageId,
  announcement,
  outcome,
  approved,
) {
  'use step';
  const { bot } = await import('../lib/chat');
  await bot.initialize();
  const thread = bot.thread(threadId);
  await thread.adapter.editMessage(
    threadId,
    messageId,
    buildResolvedCard({ title, description: announcement }, outcome),
  );
  await thread.post(
    approved ? `Approved announcement: ${announcement}` : outcome,
  );
}
```

Chat SDK stores the card's callback URL in Redis and forwards button events after the Slack webhook verifies them. The workflow checks the verified user's ID against the server-provided approver list. An unauthorized click leaves the approval pending and posts a replacement card because callback buttons are single-use. When the workflow finishes, `using` disposes the webhook and the resolved card has no buttons.

The wait does not keep the original webhook function running. [Chat SDK's `requestApproval` helper](https://chat-sdk.dev/docs/approvals) provides the same approval pattern with less workflow code when your application registers and initializes a Chat singleton in each step's runtime. This example uses explicit steps and thread IDs to control initialization across Next.js server bundles.

## Start the workflow from a mention

Replace the echo handlers in `src/lib/bot.ts` with:

**src/lib/bot.ts**

```typescript filename="src/lib/bot.ts"
import { start } from 'workflow/api';
import { approveAnnouncement } from '../workflows/approve-announcement';
import { bot } from './chat';

export { bot };

bot.onNewMention(async (thread) => {
  const approvers = (process.env.CHAT_APPROVER_IDS ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (approvers.length === 0) {
    throw new Error('Set CHAT_APPROVER_IDS to the allowed Slack user IDs.');
  }

  await start(approveAnnouncement, [
    thread.id,
    'Release v1.2.3 is ready for rollout.',
    approvers,
  ]);
});
```

**src/lib/bot.js**

```javascript filename="src/lib/bot.js"
import { start } from 'workflow/api';
import { approveAnnouncement } from '../workflows/approve-announcement';
import { bot } from './chat';

export { bot };

bot.onNewMention(async (thread) => {
  const approvers = (process.env.CHAT_APPROVER_IDS ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (approvers.length === 0) {
    throw new Error('Set CHAT_APPROVER_IDS to the allowed Slack user IDs.');
  }

  await start(approveAnnouncement, [
    thread.id,
    'Release v1.2.3 is ready for rollout.',
    approvers,
  ]);
});
```

Keep the existing webhook route importing `bot` from this module and passing Next.js `after` to the Slack handler. Await `start` to persist the workflow run, then let the event handler finish. On Vercel, Vercel Workflows persists the thread ID and approval inputs for later steps.

## Deploy and test on Vercel

Deploy the app to Vercel. The workflows defined with Workflow SDK run on Vercel Workflows alongside your bot. Mention the bot in Slack to start a run and receive an approval card with the sample announcement.

- Select **Approve** as an allowed user. The card records approval and the bot posts the announcement.
- Start another run and select **Deny**. The bot confirms that nothing was published.
- For a timeout check, temporarily change `sleep('24h')` to `sleep('30s')`, deploy, and leave a new card unanswered. The bot should report that approval timed out.
- A user outside `CHAT_APPROVER_IDS` should be unable to resolve the approval.

Open your project in the Vercel dashboard and use [Vercel Workflows observability](/docs/workflows#observability) to inspect the run, its steps, and logs. Before replacing the final message with an external write, make that step idempotent so retries do not repeat the action.

## Next steps

- [Read the Chat SDK approval API](https://chat-sdk.dev/docs/approvals)
- [Build multi-stage human approval flows](/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk)
- [Learn about workflow steps](https://workflow-sdk.dev/docs/foundations/steps)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
