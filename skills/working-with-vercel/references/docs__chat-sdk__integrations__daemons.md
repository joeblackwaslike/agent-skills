---
title: Chat SDK with Vercel Daemons
product: vercel
url: /docs/chat-sdk/integrations/daemons
canonical_url: "https://vercel.com/docs/chat-sdk/integrations/daemons"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/integrations
  - /docs/chat-sdk
related:
  - /docs/chat-sdk
  - /docs/daemons
  - /docs/connect
  - /docs/queues
  - /docs/functions
summary: Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/integrations/daemons.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "5c2b2873eaa6e271e9f7caf8ca4ae2a1aeaa61d515595013551707b9327f9fba"
---

# Chat SDK with Vercel Daemons

Process work from a [Chat SDK](/docs/chat-sdk) bot in a [Vercel Daemon](/docs/daemons), then post the result back to the original conversation. [Vercel Connect](/docs/connect) manages the Slack credentials and forwards verified events to your webhook. The webhook adds jobs to [Vercel Queues](/docs/queues), and a daemon polls for jobs and replies through Chat SDK.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Chat SDK with Vercel Connect](https://vercel.com/docs/chat-sdk/integrations/connect) — Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.

Full cross-link map for this page: [/docs/chat-sdk/integrations/daemons.graph.md](/docs/chat-sdk/integrations/daemons.graph.md)
<!-- /docsgraph:related -->

## Choose when to use a daemon

Use a daemon for a continuously running consumer, such as a report generator or a worker that depends on system tools packaged in its container. Keep the webhook in [Vercel Functions](/docs/functions), because daemons don't accept inbound HTTP or TCP traffic.

For tasks that need persisted steps, retries, or human approval, use [Vercel Workflows](/docs/chat-sdk/integrations/workflows). Daemons run only in production deployments during the beta. See [Daemons limits](/docs/daemons/limits) before choosing a deployment setup.

## Prerequisites

Complete the [Chat SDK quickstart](/docs/chat-sdk/quickstart) with Slack, Vercel Connect, and Redis. Use one Slack workspace installation for this example, and keep the quickstart's webhook route and Connect trigger configuration.

The webhook and daemon run in the same Vercel project and use the same `SLACK_CONNECTOR` and `REDIS_URL` environment variables. The connector must allow token access from the project's Production environment. You don't need `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, or `SLACK_APP_TOKEN` for this setup.

## Enqueue work from a chat message

Install the Queues SDK in the bot project:

```bash filename="Terminal"
pnpm add @vercel/queue
```

Replace `src/lib/bot.ts` from the quickstart with the following configuration and handlers. The webhook continues to import `bot` from this module and use its framework's `waitUntil` support:

**src/lib/bot.ts**

```typescript filename="src/lib/bot.ts"
import { createHash } from 'node:crypto';
import { Chat, type Message, type Thread } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';
import { QueueClient } from '@vercel/queue';

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state: createRedisState(),
});

const queue = new QueueClient({ region: 'iad1', deploymentId: null });

async function enqueue(thread: Thread, message: Message) {
  await thread.subscribe();
  const idempotencyKey = createHash('sha256')
    .update(JSON.stringify([thread.id, message.id]))
    .digest('hex');

  await queue.send(
    'chat-jobs',
    { threadId: thread.id, text: message.text },
    { idempotencyKey },
  );
}

bot.onNewMention(enqueue);
bot.onSubscribedMessage(enqueue);
```

**src/lib/bot.js**

```javascript filename="src/lib/bot.js"
import { createHash } from 'node:crypto';
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';
import { QueueClient } from '@vercel/queue';

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state: createRedisState(),
});

const queue = new QueueClient({ region: 'iad1', deploymentId: null });

async function enqueue(thread, message) {
  await thread.subscribe();
  const idempotencyKey = createHash('sha256')
    .update(JSON.stringify([thread.id, message.id]))
    .digest('hex');

  await queue.send(
    'chat-jobs',
    { threadId: thread.id, text: message.text },
    { idempotencyKey },
  );
}

bot.onNewMention(enqueue);
bot.onSubscribedMessage(enqueue);
```

Awaiting `queue.send()` persists the job before the event handler finishes. The idempotency key identifies the originating chat message if the publisher sends it again. The daemon receives only the thread ID and message text, so it can restore the thread without serializing a Chat SDK instance.

Both queue clients use `iad1` and `deploymentId: null`. The fixed region lets the worker receive the messages the webhook sends. Unpinning the deployment lets new daemon versions process the existing backlog. Keep the topic, region, consumer group, and message format compatible across deployments. See [Queue versioning](/docs/queues/poll-mode#versioning-with-deployment-ids).

## Create the worker package

From the project root, create a separate package for the daemon. Use Node.js 24 or later:

```bash filename="Terminal"
mkdir -p workers/chat-bot
cd workers/chat-bot
pnpm init --init-type module --init-package-manager
```

Add `pnpm-workspace.yaml` in the worker directory to make the package independent of the web app and select the OIDC helper used by its dependencies:

```yaml filename="workers/chat-bot/pnpm-workspace.yaml"
packages:
  - '.'
overrides:
  '@vercel/oidc': 4.0.5
```

Daemons receive a rotating token through `VERCEL_OIDC_TOKEN_FILE`. The override ensures that both Connect and Queues use an [OIDC helper that reads the token file](/docs/oidc/reference#other-cloud-providers). Older Queues dependencies read only the environment token and can't authenticate from a daemon.

Install the worker's dependencies:

```bash filename="Terminal"
pnpm add chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect @vercel/queue
```

Commit `package.json`, `pnpm-workspace.yaml`, and `pnpm-lock.yaml` from the worker directory. The container uses these files to install the same dependencies.

## Process jobs and reply to the thread

Create `worker.ts` or `worker.js` in the worker directory:

**workers/chat-bot/worker.ts**

```typescript filename="workers/chat-bot/worker.ts"
import { setTimeout as sleep } from 'node:timers/promises';
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';
import { PollingQueueClient } from '@vercel/queue';

interface ChatJob {
  threadId: string;
  text: string;
}

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

const state = createRedisState();
const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state,
});
const queue = new PollingQueueClient({ region: 'iad1', deploymentId: null });
const shutdown = new AbortController();
process.once('SIGTERM', () => shutdown.abort());
process.once('SIGINT', () => shutdown.abort());

try {
  await bot.initialize();
  console.log('Chat worker ready.');

  while (!shutdown.signal.aborted) {
    try {
      const result = await queue.receive<ChatJob>(
        'chat-jobs',
        'chat-replies',
        async (job, metadata) => {
          const key = `chat-jobs:completed:${metadata.messageId}`;
          if (await state.get(key)) return;

          await bot
            .thread(job.threadId)
            .post(`Processed by a Vercel Daemon: ${job.text}`);
          const ttl = Math.max(1000, metadata.expiresAt.getTime() - Date.now());
          await state.set(key, true, ttl);
          console.log(`Completed job ${metadata.messageId}.`);
        },
        { limit: 1 },
      );
      if (result.ok) continue;
    } catch (error) {
      console.error('Could not process a chat job:', error);
    }

    await sleep(1000, undefined, { signal: shutdown.signal }).catch(() => {});
  }
} finally {
  await bot.shutdown();
}
console.log('Chat worker stopped.');
```

**workers/chat-bot/worker.js**

```javascript filename="workers/chat-bot/worker.js"
import { setTimeout as sleep } from 'node:timers/promises';
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';
import { PollingQueueClient } from '@vercel/queue';

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

const state = createRedisState();
const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state,
});
const queue = new PollingQueueClient({ region: 'iad1', deploymentId: null });
const shutdown = new AbortController();
process.once('SIGTERM', () => shutdown.abort());
process.once('SIGINT', () => shutdown.abort());

try {
  await bot.initialize();
  console.log('Chat worker ready.');

  while (!shutdown.signal.aborted) {
    try {
      const result = await queue.receive(
        'chat-jobs',
        'chat-replies',
        async (job, metadata) => {
          const key = `chat-jobs:completed:${metadata.messageId}`;
          if (await state.get(key)) return;

          await bot
            .thread(job.threadId)
            .post(`Processed by a Vercel Daemon: ${job.text}`);
          const ttl = Math.max(1000, metadata.expiresAt.getTime() - Date.now());
          await state.set(key, true, ttl);
          console.log(`Completed job ${metadata.messageId}.`);
        },
        { limit: 1 },
      );
      if (result.ok) continue;
    } catch (error) {
      console.error('Could not process a chat job:', error);
    }

    await sleep(1000, undefined, { signal: shutdown.signal }).catch(() => {});
  }
} finally {
  await bot.shutdown();
}
console.log('Chat worker stopped.');
```

The worker initializes Chat SDK without registering inbound event handlers or opening a Socket Mode connection. `connectSlackAdapter()` resolves the bot token through Connect when the adapter calls Slack. The sample echoes the queued text to confirm the complete path; replace that processing with your report generation or other background work.

`receive()` returns after the handler and queue acknowledgment finish. The SDK extends the message's visibility while processing it and acknowledges it only when the handler succeeds. If posting the reply or saving the completion marker fails, the job remains eligible for redelivery. See [Poll mode](/docs/queues/poll-mode).

The Redis marker lets a redelivered completed job skip posting another reply. It expires with the queue message. A crash after posting to Slack but before saving that marker can still produce a duplicate reply. Queue delivery is [at-least-once](/docs/queues/concepts#at-least-once-delivery); design external writes for retries rather than relying on exactly-once execution.

On `SIGTERM` or `SIGINT`, the worker stops starting new polls and waits for its current `receive()` call before closing Redis. Choose a [shutdown grace period](/docs/daemons#graceful-shutdown) that gives active work time to finish, and make interrupted jobs safe to retry after the process stops.

## Package and configure the daemon

Add a Dockerfile in the worker directory:

```docker filename="workers/chat-bot/Dockerfile"
FROM node:24-slim
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY worker.ts ./
USER node
CMD ["node", "worker.ts"]
```

Node.js 24 runs this TypeScript example directly. For the JavaScript version, replace `worker.ts` with `worker.js` in both `COPY` and `CMD`. The exec-form `CMD` lets Node.js receive shutdown signals directly.

Add the daemon to `vercel.json` in your project root, keeping any existing configuration:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "daemons": {
    "chat-worker": {
      "root": "workers/chat-bot/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "terminationGracePeriodSeconds": 60
    }
  }
}
```

This configuration starts one worker and gives it 60 seconds to shut down. It uses the same queue region as the webhook. All instances use the `chat-replies` consumer group so they share the work. Deployments can overlap briefly; shared Redis state and retry-safe processing remain necessary even with one configured instance.

## Deploy and verify the flow

Confirm that `SLACK_CONNECTOR` and `REDIS_URL` are configured for the project's **Production** environment. Daemons inherit the project's environment variables, and the SDKs authenticate through the daemon's OIDC token file. Keep the connector UID out of the queue payload; credentials come from the worker's configuration.

Create a production deployment from the project root:

```bash filename="Terminal"
vercel deploy --prod
```

Verify the flow:

1. Open the project's **Daemons** tab and confirm that `chat-worker` is running. Check [runtime logs](/docs/logs/runtime) for `Chat worker ready.`
2. Mention the bot in the Slack workspace connected through Connect. The webhook should enqueue a job, and the daemon should post `Processed by a Vercel Daemon:` followed by your message in the same thread.
3. Reply in that thread without mentioning the bot. The subscription handler should enqueue another job and produce another reply.
4. [Stop the daemon](/docs/daemons/managing-daemons#stopping-a-daemon) and send another message. The job should remain queued. Restore one instance and confirm the reply arrives.
5. Restart the daemon and check for `Chat worker stopped.` in the old instance's logs. Inspect failures and redeliveries with [Queues observability](/docs/queues/observability).

Connect forwards Slack events to deployed URLs. For local worker testing, use a separate project, connector, and Redis database, then follow [Daemons local development](/docs/daemons#local-development) and [Connect authentication](/docs/connect/concepts/authentication). A local process that polls the same project, environment, topic, and consumer group can claim jobs intended for the deployed worker.

## Use Socket Mode with your own Slack app

A daemon can also run a [Slack Socket Mode bot](https://chat-sdk.dev/adapters/official/slack#socket-mode) over an outbound WebSocket. This requires an app-level token (`xapp-…`) with the `connections:write` scope, in addition to the bot token (`xoxb-…`).

Connect's Slack helper supplies the bot token and verifies forwarded HTTP events. It doesn't supply the app-level token required by Socket Mode, and the Connect-created Slack app doesn't expose that token. Use an app you create and control in Slack for Socket Mode. Requesting an `app` subject in Connect selects application credentials; it doesn't request Slack's app-level token type.

Keep the Connect-backed webhook and queue flow above when using a Slack app created through Connect. See [Connect delivery limitations](/docs/connect/frameworks/chat-sdk#account-for-delivery-limitations).

## Next steps

- [Generate responses with AI Gateway](/docs/chat-sdk/integrations/ai-gateway)
- [Run durable chat tasks with Vercel Workflows](/docs/chat-sdk/integrations/workflows)
- [Manage Vercel Daemons](/docs/daemons/managing-daemons)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
