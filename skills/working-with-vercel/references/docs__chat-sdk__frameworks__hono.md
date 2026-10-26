---
title: Chat SDK with Hono
product: vercel
url: /docs/chat-sdk/frameworks/hono
canonical_url: "https://vercel.com/docs/chat-sdk/frameworks/hono"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/frameworks
  - /docs/chat-sdk
related:
  - /docs/frameworks/backend/hono
  - /docs/cli
  - /docs/environment-variables
  - /docs/observability/runtime-logs
  - /docs/cli/connect
summary: Add a Chat SDK bot to Hono, receive Slack events through Vercel Connect, and deploy on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/frameworks/hono.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5acfae53cc60d8010de07cde6259247a6bb7f5bd1098bbbf0ef707abf0ffb0e1"
---

# Chat SDK with Hono

Use a Hono POST handler to receive Slack events and Vercel Functions to keep your bot running after the webhook responds.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Ship a GitHub code review bot with Hono and Redis](https://vercel.com/kb/guide/ship-a-github-code-review-bot-with-hono-and-redis) — This guide walks through building a GitHub bot that reviews pull requests on demand. When a user @mentions the bot on a
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Chat SDK with Vercel Connect](https://vercel.com/docs/chat-sdk/integrations/connect) — Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.

Full cross-link map for this page: [/docs/chat-sdk/frameworks/hono.graph.md](/docs/chat-sdk/frameworks/hono.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Start with an existing Hono project configured for [deployment on Vercel](/docs/frameworks/backend/hono), the latest [Vercel CLI](/docs/cli), and permission to install an app in your Slack workspace.

## Install Chat SDK

From your project directory, install the packages with pnpm:

```bash filename="Terminal"
pnpm add chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect @vercel/functions
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

Add the route to `src/index.ts`. For a new entry point, use the following example. If you already export a Hono app, register the route on that instance.

**src/index.ts**

```typescript filename="src/index.ts"
import { Hono } from 'hono';
import { waitUntil } from '@vercel/functions';
import { bot } from '../lib/bot';

const app = new Hono();

app.post('/api/webhooks/slack', (c) => {
  return bot.webhooks.slack(c.req.raw, { waitUntil });
});

export default app;
```

**src/index.js**

```javascript filename="src/index.js"
import { Hono } from 'hono';
import { waitUntil } from '@vercel/functions';
import { bot } from '../lib/bot';

const app = new Hono();

app.post('/api/webhooks/slack', (c) => {
  return bot.webhooks.slack(c.req.raw, { waitUntil });
});

export default app;
```

`c.req.raw` provides the original Web `Request`. Pass it to the adapter before middleware or handlers consume its body. The default export lets Vercel detect and deploy your Hono app. `waitUntil` from `@vercel/functions` keeps the invocation alive while the bot finishes processing.

## Connect Slack and deploy

From the project directory, link your app to Vercel and connect a Redis database:

```bash filename="Terminal"
vercel link
vercel integration add upstash/upstash-kv
```

Ensure the integration supplies `REDIS_URL` in the project's **Production** environment. If you already have Redis, add its connection URL as `REDIS_URL` in your project's [environment variables](/docs/environment-variables). Use separate databases for development and production.

Create a Slack connector and allow token requests from the project's Production and Development environments. Attach its trigger to your production webhook route:

```bash filename="Terminal"
vercel connect create slack --name my-bot --triggers
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

## Next steps

- [Hono on Vercel](/docs/frameworks/backend/hono)
- [Hono request API](https://hono.dev/docs/api/request#raw)
- [Add more platform adapters](/docs/chat-sdk/adapters)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
