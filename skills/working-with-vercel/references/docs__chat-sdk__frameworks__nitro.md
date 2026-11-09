---
title: Chat SDK with Nitro
product: vercel
url: /docs/chat-sdk/frameworks/nitro
canonical_url: "https://vercel.com/docs/chat-sdk/frameworks/nitro"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/frameworks
  - /docs/chat-sdk
related:
  - /docs/chat-sdk/frameworks/nuxt
  - /docs/frameworks/backend/nitro
  - /docs/cli
  - /docs/environment-variables
  - /docs/observability/runtime-logs
summary: Add a Chat SDK bot to Nitro, receive Slack events through Vercel Connect, and deploy on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/frameworks/nitro.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "425a6ed0ba7e7969d2ae3e4aa2f380dcf942cfa331c7dbc6b6ff9c969e369a0e"
---

# Chat SDK with Nitro

Use a Nitro route to receive Slack events and process them with Chat SDK. This guide uses Nitro 3 and its `nitro` package. For a Nuxt 4 app using Nitro 2, follow the [Nuxt guide](/docs/chat-sdk/frameworks/nuxt).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [Build with a Nitro starter template](https://vercel.com/kb/guide/build-with-a-nitro-starter-template) — Deploy a Nitro app to Vercel from a starter template. Compare the Nitro Starter, route rules, cached HTTP handler, plugi
- [How to ship a Nitro app on Vercel](https://vercel.com/kb/guide/ship-a-nitro-app-on-vercel) — Deploy a Nitro app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Getting Started with Chat SDK](https://vercel.com/docs/chat-sdk/quickstart) — Create a Slack bot with the Chat SDK CLI, connect it to Slack through Vercel Connect, and deploy it on Vercel.
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.

Full cross-link map for this page: [/docs/chat-sdk/frameworks/nitro.graph.md](/docs/chat-sdk/frameworks/nitro.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Start with an existing Nitro project configured for [deployment on Vercel](/docs/frameworks/backend/nitro), the latest [Vercel CLI](/docs/cli), and permission to install an app in your Slack workspace.

## Install Chat SDK

From your project directory, install the packages with pnpm:

```bash filename="Terminal"
pnpm add chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect
```

## Create your bot

Create `lib/bot.ts` at the project root. This bot uses Vercel Connect for Slack authentication, stores subscriptions in Redis, and responds to mentions and thread replies. Keep this module on the server.

**lib/bot.ts**

```typescript filename="lib/bot.ts"
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({
      ...connectSlackAdapter('slack/my-bot'),
    }),
  },
  state: createRedisState(),
});

bot.onNewMention(async (thread) => {
  await thread.subscribe();
  await thread.post('Hello! Reply here to chat.');
});

bot.onSubscribedMessage(async (thread, message) => {
  await thread.post(message.text);
});
```

**lib/bot.js**

```javascript filename="lib/bot.js"
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({
      ...connectSlackAdapter('slack/my-bot'),
    }),
  },
  state: createRedisState(),
});

bot.onNewMention(async (thread) => {
  await thread.subscribe();
  await thread.post('Hello! Reply here to chat.');
});

bot.onSubscribedMessage(async (thread, message) => {
  await thread.post(message.text);
});
```

## Add the webhook route

Enable filesystem routing in `nitro.config.ts`. Merge these options into your existing configuration:

**nitro.config.ts**

```typescript filename="nitro.config.ts"
import { defineConfig } from 'nitro';

export default defineConfig({
  serverDir: './',
  preset: 'vercel',
});
```

**nitro.config.js**

```javascript filename="nitro.config.js"
import { defineConfig } from 'nitro';

export default defineConfig({
  serverDir: './',
  preset: 'vercel',
});
```

Create `routes/api/webhooks/slack.post.ts`. With `serverDir: './'`, this maps to `/api/webhooks/slack`. Use `routes/api/` rather than a top-level `api/` directory for [Nitro on Vercel](https://nitro.build/deploy/providers/vercel#api-routes).

**routes/api/webhooks/slack.post.ts**

```typescript filename="routes/api/webhooks/slack.post.ts"
import { defineHandler } from 'nitro';
import { bot } from '../../../lib/bot';

export default defineHandler((event) => {
  return bot.webhooks.slack(event.req, {
    waitUntil: (task) => event.waitUntil(task),
  });
});
```

**routes/api/webhooks/slack.post.js**

```javascript filename="routes/api/webhooks/slack.post.js"
import { defineHandler } from 'nitro';
import { bot } from '../../../lib/bot';

export default defineHandler((event) => {
  return bot.webhooks.slack(event.req, {
    waitUntil: (task) => event.waitUntil(task),
  });
});
```

Nitro 3 exposes the Web `Request` as `event.req`. Return the adapter's response directly and use `event.waitUntil` to track background work. Leave the request body unread until the adapter handles it.

## Connect Slack and deploy

From the project directory, link your app to Vercel and connect a Redis database:

```bash filename="Terminal"
vercel link
vercel integration add upstash/upstash-kv
```

Ensure the integration supplies `REDIS_URL` in the project's **Production** environment. If you already have Redis, add its connection URL as `REDIS_URL` in your project's [environment variables](/docs/environment-variables). Use separate databases for development and production.

Create a Slack connector and allow token requests from the project's Production and Development environments. Attach its trigger to your production webhook route:

```bash filename="Terminal"
vercel connect create slack --name my-bot --triggers --trigger-path /api/webhooks/slack
vercel connect attach slack/my-bot --environment production --environment development --triggers --trigger-path /api/webhooks/slack
```

Follow the prompts to authorize and install the Slack app. If you choose a different connector name, update `slack/my-bot` in your bot configuration and attach command. Connect manages the Slack credentials and verifies provider events before forwarding them. The adapter verifies the forwarded request with Vercel OIDC.

Deploy your app:

```bash filename="Terminal"
vercel --prod
```

Invite the bot to a Slack channel and mention it. It should reply with a greeting and echo subsequent replies in that thread. Check [runtime logs](/docs/observability/runtime-logs) if it does not respond.

Vercel deployments receive `VERCEL_OIDC_TOKEN` automatically. For local outbound API calls, configure a development `REDIS_URL` and run `vercel env pull .env.local`. This supplies a Development OIDC token, which can access the connector because the attachment above enables Development.

Connect forwards inbound events to deployed URLs, not `localhost`. To test inbound events before production, [attach the trigger to a Preview branch](/docs/cli/connect#vercel-connect-attach).

## Frequently asked questions

### Should I use the Nitro guide or the Nuxt guide?

Use this guide for a standalone Nitro 3 app that imports from the `nitro` package. Use the [Nuxt guide](/docs/chat-sdk/frameworks/nuxt) for a Nuxt 4 app, which runs on Nitro 2 and H3 1. The two versions expose the request and background tasks differently, so their webhook routes aren't interchangeable.

### Why put the webhook in `routes/api/` instead of a top-level `api/` directory?

Nitro's top-level `api/` directory isn't compatible with Vercel, so Nitro's Vercel docs recommend `routes/api/` instead. Nitro scans no directories for routes until you set `serverDir`. With `serverDir: './'` in `nitro.config.ts`, the file `routes/api/webhooks/slack.post.ts` serves `/api/webhooks/slack`. See [Nitro on Vercel](https://nitro.build/deploy/providers/vercel#api-routes).

### How do I get the Web `Request` in a Nitro 3 route?

Use `event.req`. Nitro 3 exposes the incoming request as a standard Web `Request`, which you pass straight to `bot.webhooks.slack`. Leave the body unread, because the adapter reads it to parse and verify the event.

### Do I need `@vercel/functions` with Nitro 3?

No. Nitro 3 provides `event.waitUntil`, which this guide passes to the adapter as `waitUntil: (task) => event.waitUntil(task)`. It keeps the function running while your handlers finish after the webhook response. Nuxt 4 on Nitro 2 is different and needs `waitUntil` from `@vercel/functions`.

### What does the `.post` suffix in the route file name do?

The `.post` suffix limits the route to `POST` requests, which is how platforms deliver webhook events. Nitro answers other methods on that path with `405 Method Not Allowed`. Some platforms, such as WhatsApp and Messenger, verify a webhook with a `GET` request first, so add a `GET` handler for those. See [Nitro routing](https://nitro.build/docs/routing).

## Next steps

- [Nitro routing](https://nitro.build/docs/routing)
- [Nitro on Vercel](/docs/frameworks/backend/nitro)
- [Add more platform adapters](/docs/chat-sdk/adapters)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
