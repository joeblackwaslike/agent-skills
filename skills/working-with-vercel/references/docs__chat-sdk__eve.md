---
title: Using eve with Chat SDK
product: vercel
url: /docs/chat-sdk/eve
canonical_url: "https://vercel.com/docs/chat-sdk/eve"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk
related:
  - /docs/eve
  - /docs/chat-sdk/adapters
  - /docs/eve/getting-started
  - /docs/cli
  - /docs/environment-variables
summary: Send Chat SDK messages to an eve agent with a channel, persistent state, and Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/eve.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "32e3d6a2560e654fad2147a72b7549d65c47094bfedf8e7ac20b9c6c12dec004"
---

# Using eve with Chat SDK

Use [eve's Chat SDK channel](https://eve.dev/docs/channels/chat-sdk) to send platform messages into an [eve agent](/docs/eve). Your Chat SDK handlers choose which events start a turn; eve runs the agent and delivers its response back to the conversation.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Chat SDK and eve together](https://vercel.com/kb/guide/chat-sdk-and-eve) — Understand how eve and Chat SDK divide responsibilities, when to use eve's first-class channels versus the Chat SDK chan
- [Give your eve agent an email inbox with Resend](https://vercel.com/kb/guide/eve-agent-with-resend) — Connect an eve agent to email using the Chat SDK channel and the Resend adapter. Handle inbound email, threaded replies,
- [Use any Chat SDK adapter with eve](https://vercel.com/changelog/eve-chat-sdk-channel)
- [Next.js](https://eve.dev/docs/guides/frontend/nextjs) — Run an eve agent and a Next.js app as one project with withEve.
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Chat SDK Integrations](https://vercel.com/docs/chat-sdk/integrations) — Extend a Chat SDK bot with AI Gateway, Vercel Connect, Vercel Sandbox, and Vercel Workflows.

Full cross-link map for this page: [/docs/chat-sdk/eve.graph.md](/docs/chat-sdk/eve.graph.md)
<!-- /docsgraph:related -->

This is useful when you already have Chat SDK handlers or need an adapter from the [adapter directory](/docs/chat-sdk/adapters). For a new Slack-only eve agent, the [built-in Slack channel](https://eve.dev/docs/channels/slack) provides a guided setup with `eve add channel/slack` and Vercel Connect.

## Prerequisites

- An [eve project](/docs/eve/getting-started) with instructions and model credentials configured for deployment
- Node.js 24 or later and the [Vercel CLI](/docs/cli)
- Permission to install an app in a Slack workspace

The example adds a Chat SDK channel to your eve project. Use it as the project's Slack entry point; an existing Slack channel must not mount the same webhook path.

## Install the dependencies

From your eve project, install the current eve release, Chat SDK, the Slack and Redis adapters, and Vercel Connect:

**pnpm**

```bash
pnpm i eve@latest chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect
```

**yarn**

```bash
yarn add eve@latest chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect
```

**npm**

```bash
npm i eve@latest chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect
```

**bun**

```bash
bun add eve@latest chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect
```

## Connect Slack and Redis

Link the eve project to Vercel and create a Slack connector:

```bash filename="Terminal"
vercel link
vercel connect create slack --name my-agent --triggers
```

Complete Connect's guided setup and Slack workspace installation, then attach the connector to your project:

```bash filename="Terminal"
vercel connect attach slack/my-agent --environment production --triggers --trigger-path /eve/v1/slack
```

Use the connector UID returned during setup if it differs from `slack/my-agent`, both here and in the code below. Connect forwards Slack events to `/eve/v1/slack` on your Production deployment.

Add a Redis database through the [Marketplace](/marketplace/category/storage):

```bash filename="Terminal"
vercel integration add upstash/upstash-kv
```

Ensure `REDIS_URL` is available in the project's Production environment. You can also use an existing Redis database by adding its connection URL to your [environment variables](/docs/environment-variables).

## Add the channel

Create `agent/channels/chat.ts`, or `agent/channels/chat.js` for JavaScript:

**agent/channels/chat.ts**

```typescript filename="agent/channels/chat.ts"
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';
import { chatSdkChannel } from 'eve/channels/chat-sdk';

export const { bot, channel, send } = chatSdkChannel({
  userName: 'my-agent',
  adapters: {
    slack: createSlackAdapter({
      ...connectSlackAdapter('slack/my-agent'),
    }),
  },
  state: createRedisState(),
});

bot.onNewMention(async (thread, message) => {
  await thread.subscribe();
  await send(message.text, {
    thread,
    idempotencyKey: message.id,
  });
});

bot.onSubscribedMessage(async (thread, message) => {
  await send(message.text, {
    thread,
    idempotencyKey: message.id,
  });
});

export default channel;
```

**agent/channels/chat.js**

```javascript filename="agent/channels/chat.js"
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';
import { chatSdkChannel } from 'eve/channels/chat-sdk';

export const { bot, channel, send } = chatSdkChannel({
  userName: 'my-agent',
  adapters: {
    slack: createSlackAdapter({
      ...connectSlackAdapter('slack/my-agent'),
    }),
  },
  state: createRedisState(),
});

bot.onNewMention(async (thread, message) => {
  await thread.subscribe();
  await send(message.text, {
    thread,
    idempotencyKey: message.id,
  });
});

bot.onSubscribedMessage(async (thread, message) => {
  await send(message.text, {
    thread,
    idempotencyKey: message.id,
  });
});

export default channel;
```

`chatSdkChannel` returns a Chat SDK `bot`, an eve `channel`, and a `send` function. Export the channel as the module default so eve discovers it. Call `send` inside a Chat SDK event handler, passing the thread to start or continue that conversation's session.

The example subscribes to mentioned threads and passes the platform message ID as an `idempotencyKey`. This lets eve reject repeated input within its recent-key window; Chat SDK's separate event deduplication doesn't guarantee delivery to eve.

Redis stores Chat SDK subscriptions and coordination data. eve manages the [agent session](/docs/eve/concepts) separately.

## Deploy and test

Deploy the agent:

```bash filename="Terminal"
pnpm exec eve deploy
```

The channel mounts `GET` and `POST` handlers at `/eve/v1/slack`, matching the Connect trigger destination. eve owns the webhook lifecycle, so you don't need the Next.js Route Handler from a standalone Chat SDK app.

Invite the installed app to a Slack channel and mention it with a question. The agent should answer in the thread. Reply in the thread to continue the session. Check [runtime logs](/docs/logs/runtime) and [eve observability](/docs/eve/observability) if events arrive but the agent doesn't respond.

## Adapt delivery to another platform

Swap the Slack adapter for another [platform adapter](/docs/chat-sdk/adapters#platform-adapters) and complete its authentication setup. By default, each adapter key becomes a route under `/eve/v1`: an adapter registered as `resend`, for example, receives webhooks at `/eve/v1/resend`. Connect is available only for supported adapters.

The channel streams replies by default. For email and other destinations that can't edit sent messages, set `streaming: false` in `chatSdkChannel` so the reply is posted when the turn completes. See the [eve channel reference](https://eve.dev/docs/channels/chat-sdk) for route overrides, attachments, and human input handling.

## Next steps

- [Choose platform and state adapters](/docs/chat-sdk/adapters)
- [Configure Connect credentials and triggers](/docs/connect/frameworks/chat-sdk)
- [Explore eve channels](https://eve.dev/docs/channels/overview)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
