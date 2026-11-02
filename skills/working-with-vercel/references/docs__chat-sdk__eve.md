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
  - /docs/frameworks/agents/eve
  - /docs/chat-sdk/adapters
  - /docs/cli
  - /docs/environment-variables
  - /docs/logs/runtime
summary: Send Chat SDK messages to an eve agent with a channel, persistent state, and Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/eve.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "adf69af88178cf5e3d2f54263ee4189a3adda9faa20d17d6e7fc5e4b6dc88226"
---

# Using eve with Chat SDK

Use [eve's Chat SDK channel](https://eve.dev/docs/channels/chat-sdk) to send platform messages into an [eve agent](/docs/frameworks/agents/eve). Your Chat SDK handlers choose which events start a turn; eve runs the agent and delivers its response back to the conversation.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Chat SDK and eve together](https://vercel.com/kb/guide/chat-sdk-and-eve) — Understand how eve and Chat SDK divide responsibilities, when to use eve's first-class channels versus the Chat SDK chan
- [Give your eve agent an email inbox with Resend](https://vercel.com/kb/guide/eve-agent-with-resend) — Connect an eve agent to email using the Chat SDK channel and the Resend adapter. Handle inbound email, threaded replies,
- [Chat SDK Reference](https://eve.dev/docs/channels/chat-sdk/reference) — Chat SDK channel options, webhook routes, send and respond, steering, delivery, human-in-the-loop, sign-ins, proactive s
- [Use any Chat SDK adapter with eve](https://vercel.com/changelog/eve-chat-sdk-channel)
- [Next.js](https://eve.dev/docs/guides/frontend/nextjs) — Add an eve chat to a Next.js app, from setup and authentication to saved conversations and deployment.
- [Slack](https://eve.dev/docs/channels/slack) — Reach your agent from Slack mentions, DMs, threads, slash commands, and buttons.
- [Chat SDK Integrations](https://vercel.com/docs/chat-sdk/integrations) — Extend a Chat SDK bot with AI Gateway, Vercel Connect, Vercel Passport, Vercel Sandbox, Vercel Workflows, and Vercel Dae

Full cross-link map for this page: [/docs/chat-sdk/eve.graph.md](/docs/chat-sdk/eve.graph.md)
<!-- /docsgraph:related -->

This is useful when you already have Chat SDK handlers or need an adapter from the [adapter directory](/docs/chat-sdk/adapters). For a new Slack-only eve agent, the built-in Slack channel provides a guided setup with `eve add channel/slack` and Vercel Connect.

## Prerequisites

- An [eve project](/docs/frameworks/agents/eve#create-an-agent) with instructions and model credentials configured for deployment
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

Redis stores Chat SDK subscriptions and coordination data. eve manages the agent session separately.

## Deploy and test

Deploy the agent:

```bash filename="Terminal"
pnpm exec eve deploy
```

The channel mounts `GET` and `POST` handlers at `/eve/v1/slack`, matching the Connect trigger destination. eve owns the webhook lifecycle, so you don't need the Next.js Route Handler from a standalone Chat SDK app.

Invite the installed app to a Slack channel and mention it with a question. The agent should answer in the thread. Reply in the thread to continue the session. Check [runtime logs](/docs/logs/runtime) and [eve observability](https://eve.dev/docs/observability/otel) if events arrive but the agent doesn't respond.

## Adapt delivery to another platform

Swap the Slack adapter for another [platform adapter](/docs/chat-sdk/adapters#platform-adapters) and complete its authentication setup. By default, each adapter key becomes a route under `/eve/v1`: an adapter registered as `resend`, for example, receives webhooks at `/eve/v1/resend`. Connect is available only for supported adapters.

The channel streams replies by default. For email and other destinations that can't edit sent messages, set `streaming: false` in `chatSdkChannel` so the reply is posted when the turn completes. See the [eve channel reference](https://eve.dev/docs/channels/chat-sdk) for route overrides, attachments, and human input handling.

## Next steps

- [Choose platform and state adapters](/docs/chat-sdk/adapters)
- [Configure Connect credentials and triggers](/docs/connect/frameworks/chat-sdk)
- [Explore eve channels](https://eve.dev/docs/channels/overview)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
