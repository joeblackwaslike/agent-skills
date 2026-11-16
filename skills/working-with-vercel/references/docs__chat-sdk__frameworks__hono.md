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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/chat-sdk/frameworks/hono.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3b14413556211da99a7fb2d90a527ddc55ce04a8a7b7856f4ae0bed0dea2624f"
---

# Chat SDK with Hono

Use a Hono POST handler to receive Slack events and Vercel Functions to keep your bot running after the webhook responds.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ship a GitHub code review bot with Hono and Redis](https://vercel.com/kb/guide/ship-a-github-code-review-bot-with-hono-and-redis) — This guide walks through building a GitHub bot that reviews pull requests on demand. When a user @mentions the bot on a
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [How to ship a Hono app on Vercel](https://vercel.com/kb/guide/ship-a-hono-app-on-vercel) — Deploy a Hono app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and conf
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Getting Started with Chat SDK](https://vercel.com/docs/chat-sdk/quickstart) — Create a Slack bot with the Chat SDK CLI, connect it to Slack through Vercel Connect, and deploy it on Vercel.
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.

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

### How do I handle Slack webhooks in Hono?

Register a `POST` route on your Hono app and pass `c.req.raw` to `bot.webhooks.slack`, along with `waitUntil` from `@vercel/functions`. Return the adapter's response from the handler. Chat SDK verifies the request, parses the event, and runs your handlers, so the route needs no Slack-specific code.

### Why pass `c.req.raw` instead of the Hono request?

`c.req.raw` is the original Web `Request`, which is the type Chat SDK adapters accept. The adapter reads the body itself to parse and verify the event, so the body must still be unread. See the [Hono request API](https://hono.dev/docs/api/request#raw).

### Can I use Hono middleware with the webhook route?

Yes, as long as the middleware doesn't read the request body. Middleware for logging, headers, or routing works as usual. Body parsers and validators that consume the body break the webhook, because the adapter can no longer read the event. Register the webhook route outside that middleware or skip the middleware for its path.

### Where should the Hono entry point live for Vercel to deploy it?

Export your Hono app as the default export from one of the files Vercel detects, such as `src/index.ts`, `src/app.ts`, `src/server.ts`, or `index.ts` at the project root. Vercel deploys that app as a function, and the webhook route runs inside it. See [Hono on Vercel](/docs/frameworks/backend/hono#exporting-the-hono-application) for every supported location.

### Why does the Hono route use `waitUntil` from `@vercel/functions`?

`waitUntil` keeps the Vercel invocation alive after Hono returns the response, so your bot can finish processing the event. The adapter acknowledges the webhook immediately, which keeps platforms like Slack from retrying, and your handlers continue in the background. Background work still counts toward the function's [maximum duration](/docs/functions/configuring-functions/duration).

## Next steps

- [Hono on Vercel](/docs/frameworks/backend/hono)
- [Hono request API](https://hono.dev/docs/api/request#raw)
- [Add more platform adapters](/docs/chat-sdk/adapters)

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
