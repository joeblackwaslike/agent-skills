---
title: Chat SDK with Nuxt
product: vercel
url: /docs/chat-sdk/frameworks/nuxt
canonical_url: "https://vercel.com/docs/chat-sdk/frameworks/nuxt"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/frameworks
  - /docs/chat-sdk
related:
  - /docs/chat-sdk/frameworks/nitro
  - /docs/frameworks/full-stack/nuxt
  - /docs/cli
  - /docs/environment-variables
  - /docs/observability/runtime-logs
summary: Add a Chat SDK bot to Nuxt, receive Slack events through Vercel Connect, and deploy on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/frameworks/nuxt.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "432799c347d7132dc9828d92ec7df03e59500833296a04fc7b24ae0b44b8f87e"
---

# Chat SDK with Nuxt

Use a Nuxt server API route to receive Slack events and pass them to Chat SDK. This guide targets Nuxt 4 with Nitro 2 and H3 1. For a standalone Nitro 3 app, use the [Nitro guide](/docs/chat-sdk/frameworks/nitro).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with TanStack Start](https://vercel.com/docs/chat-sdk/frameworks/tanstack-start) — Add a Chat SDK bot to TanStack Start, receive Slack events through Vercel Connect, and deploy on Vercel.

Full cross-link map for this page: [/docs/chat-sdk/frameworks/nuxt.graph.md](/docs/chat-sdk/frameworks/nuxt.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Start with an existing Nuxt project configured for [deployment on Vercel](/docs/frameworks/full-stack/nuxt), the latest [Vercel CLI](/docs/cli), and permission to install an app in your Slack workspace.

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

Create `server/api/webhooks/slack.post.ts`. Nuxt auto-imports `defineEventHandler` and `toWebRequest` for server routes. The `.post` suffix limits the route to POST requests.

**server/api/webhooks/slack.post.ts**

```typescript filename="server/api/webhooks/slack.post.ts"
import { waitUntil } from '@vercel/functions';
import { bot } from '../../../lib/bot';

export default defineEventHandler((event) => {
  return bot.webhooks.slack(toWebRequest(event), {
    waitUntil,
  });
});
```

**server/api/webhooks/slack.post.js**

```javascript filename="server/api/webhooks/slack.post.js"
import { waitUntil } from '@vercel/functions';
import { bot } from '../../../lib/bot';

export default defineEventHandler((event) => {
  return bot.webhooks.slack(toWebRequest(event), {
    waitUntil,
  });
});
```

H3's [`toWebRequest`](https://v1.h3.dev/utils/request#towebrequestevent) converts the incoming event to the Web `Request` expected by Chat SDK. Pass it through without first calling `readBody` or `readRawBody`.

`waitUntil` from `@vercel/functions` registers background work with the Vercel invocation so the bot can finish after the adapter responds. Use this helper for Nitro 2's Node.js Vercel preset; `event.waitUntil` does not connect those tasks to the invocation.

Deploy with Nuxt's server output, rather than a static-only build, so the webhook route runs on Vercel.

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

## Add browser chat with the Web Adapter

The [Web Adapter](https://chat-sdk.dev/adapters/official/web) lets a browser chat UI use the same bot as Slack. Browser messages go to `onDirectMessage`, and the adapter streams the bot's replies back to the client. Your app authenticates these requests; Vercel Connect continues to handle the Slack integration.

### Configure the adapter

Install the Web Adapter and its client dependencies:

```bash filename="Terminal"
pnpm add @chat-adapter/web ai @ai-sdk/vue
```

Implement `getUserFromSession(request)` in `lib/auth.ts` using your application's authentication provider. This is an application-defined helper, not a Chat SDK export. It must validate the session and return a stable `{ id: string, name?: string }` for a signed-in user, or `null` to reject the request with HTTP 401. User IDs must not contain `:`. See [Web Adapter authentication](https://chat-sdk.dev/adapters/official/web#authentication).

Update `lib/bot.ts` with the Web Adapter and a direct-message handler, keeping the Slack adapter, Redis state, and existing handlers:

**lib/bot.ts**

```typescript filename="lib/bot.ts"
import { Chat } from 'chat';
import { createWebAdapter } from '@chat-adapter/web';
import { getUserFromSession } from './auth';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    web: createWebAdapter({
      userName: 'my-bot',
      protocol: 'ai-sdk',
      getUser: getUserFromSession,
    }),
    slack: createSlackAdapter({
      ...connectSlackAdapter('slack/my-bot'),
    }),
  },
  state: createRedisState(),
});

bot.onDirectMessage(async (thread, message) => {
  await thread.post(`You said: ${message.text}`);
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
import { createWebAdapter } from '@chat-adapter/web';
import { getUserFromSession } from './auth';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    web: createWebAdapter({
      userName: 'my-bot',
      protocol: 'ai-sdk',
      getUser: getUserFromSession,
    }),
    slack: createSlackAdapter({
      ...connectSlackAdapter('slack/my-bot'),
    }),
  },
  state: createRedisState(),
});

bot.onDirectMessage(async (thread, message) => {
  await thread.post(`You said: ${message.text}`);
});

bot.onNewMention(async (thread) => {
  await thread.subscribe();
  await thread.post('Hello! Reply here to chat.');
});

bot.onSubscribedMessage(async (thread, message) => {
  await thread.post(message.text);
});
```

The `ai-sdk` protocol matches the Vue client below. Keep the Redis state adapter so message history is shared across function instances.

### Add the browser endpoint

Create `server/api/chat.post.ts`. For Nuxt 4 with Nitro 2, convert the H3 event with `toWebRequest` and use Vercel's `waitUntil` to register background work:

**server/api/chat.post.ts**

```typescript filename="server/api/chat.post.ts"
import { waitUntil } from '@vercel/functions';
import { bot } from '../../lib/bot';

export default defineEventHandler((event) => {
  return bot.webhooks.web(toWebRequest(event), { waitUntil });
});
```

**server/api/chat.post.js**

```javascript filename="server/api/chat.post.js"
import { waitUntil } from '@vercel/functions';
import { bot } from '../../lib/bot';

export default defineEventHandler((event) => {
  return bot.webhooks.web(toWebRequest(event), { waitUntil });
});
```

### Connect the browser client

Create `app/pages/chat.vue`. Keep the object returned by `useChat` intact; destructuring its properties loses Vue reactivity:

```html filename="app/pages/chat.vue"
<script setup>
import { useChat } from '@chat-adapter/web/vue';

const chat = useChat({ api: '/api/chat', threadId: 'support' });
</script>

<template>
  <section aria-label="Chat">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">{{ part.text }}</p>
      </template>
    </div>
    <button
      :disabled="chat.status === 'submitted' || chat.status === 'streaming'"
      @click="chat.sendMessage({ text: 'Hello' })"
    >
      Send a test message
    </button>
    <p v-if="chat.error" role="alert">
      Could not send your message. Please try again.
    </p>
  </section>
</template>
```

The client sends directly to `/api/chat`; no Connect trigger is needed for browser traffic. `chat.sendMessage({ text })` submits a message, and `chat.stop()` cancels a response.

After configuring authentication, sign in and open `/chat`. Select **Send a test message** to send `Hello`; the bot should respond with `You said: Hello`. The `support` conversation ID is scoped to the authenticated user by the adapter. Generate a different conversation ID when you want to start a new conversation.

For a fuller chat interface, see the [official Nuxt example](https://github.com/vercel/chat/tree/main/examples/nuxt-chat).

## Next steps

- [Nuxt server routes](https://nuxt.com/docs/4.x/directory-structure/server)
- [Chat SDK Knowledge Agent template](/templates/nuxt/chat-sdk-knowledge-agent)
- [Add more platform adapters](/docs/chat-sdk/adapters)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
