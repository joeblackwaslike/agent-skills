---
title: Chat SDK with Next.js
product: vercel
url: /docs/chat-sdk/frameworks/nextjs
canonical_url: "https://vercel.com/docs/chat-sdk/frameworks/nextjs"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/frameworks
  - /docs/chat-sdk
related:
  - /docs/chat-sdk/quickstart
  - /docs/frameworks/full-stack/nextjs
  - /docs/cli
  - /docs/environment-variables
  - /docs/observability/runtime-logs
summary: Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/frameworks/nextjs.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "1f13c16243e1166e67abe0eb7f8b5985448d0c52b7b27cb76145a72b0f46453b"
---

# Chat SDK with Next.js

Use an App Router Route Handler to receive Slack events and `after` to process them after responding. For a new bot, use the [Chat SDK quickstart](/docs/chat-sdk/quickstart), which scaffolds a Next.js app with `create-chat-sdk`. Follow this guide to add the bot to an existing app.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [CLI](https://chat-sdk.dev/docs/create-chat-sdk) — Scaffold a Chat SDK bot app with a single command.
- [How to build an agent for Liveblocks with Chat SDK and AI SDK](https://vercel.com/kb/guide/liveblocks-chat-sdk-ai-sdk) — Build an AI agent that replies to @-mentions in Liveblocks comment threads with streamed responses and tool calling, usi
- [Chat SDK with Nuxt](https://vercel.com/docs/chat-sdk/frameworks/nuxt) — Add a Chat SDK bot to Nuxt, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with AI Gateway](https://vercel.com/docs/chat-sdk/integrations/ai-gateway) — Stream AI Gateway model responses into Chat SDK conversations with AI SDK and message history.

Full cross-link map for this page: [/docs/chat-sdk/frameworks/nextjs.graph.md](/docs/chat-sdk/frameworks/nextjs.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Start with an existing Next.js 15.1 or later project configured for [deployment on Vercel](/docs/frameworks/full-stack/nextjs), the latest [Vercel CLI](/docs/cli), and permission to install an app in your Slack workspace.

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

Create `app/api/webhooks/slack/route.ts`. If your app uses a `src` directory, put both `app` and `lib` inside `src` so the relative import stays the same.

**app/api/webhooks/slack/route.ts**

```typescript filename="app/api/webhooks/slack/route.ts"
import { after } from 'next/server';
import { bot } from '../../../../lib/bot';

export async function POST(request: Request) {
  return bot.webhooks.slack(request, {
    waitUntil: (task) => after(() => task),
  });
}
```

**app/api/webhooks/slack/route.js**

```javascript filename="app/api/webhooks/slack/route.js"
import { after } from 'next/server';
import { bot } from '../../../../lib/bot';

export async function POST(request) {
  return bot.webhooks.slack(request, {
    waitUntil: (task) => after(() => task),
  });
}
```

Return the adapter's response directly. Passing each background task to `after` keeps it running after the webhook response. Use the Node.js runtime, which is the App Router default, for the Redis connection.

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
pnpm add @chat-adapter/web ai @ai-sdk/react
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

The `ai-sdk` protocol matches the React client below. Redis stores the server-side message history; the adapter does not trust the browser as a source of prior conversation turns.

### Add the browser endpoint

Create `app/api/chat/route.ts`. If you use a `src` directory, keep `lib` inside it as described above. This endpoint receives browser requests directly, without a Connect trigger.

**app/api/chat/route.ts**

```typescript filename="app/api/chat/route.ts"
import { after } from 'next/server';
import { bot } from '../../../lib/bot';

export async function POST(request: Request) {
  return bot.webhooks.web(request, {
    waitUntil: (task) => after(() => task),
  });
}
```

**app/api/chat/route.js**

```javascript filename="app/api/chat/route.js"
import { after } from 'next/server';
import { bot } from '../../../lib/bot';

export async function POST(request) {
  return bot.webhooks.web(request, {
    waitUntil: (task) => after(() => task),
  });
}
```

### Connect the browser client

Create `app/chat/page.tsx` as a Client Component. The Web Adapter helper configures the AI SDK transport for `/api/chat`:

**app/chat/page.tsx**

```tsx filename="app/chat/page.tsx"
'use client';

import { useChat } from '@chat-adapter/web/react';

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    api: '/api/chat',
    threadId: 'support',
  });
  const busy = status === 'submitted' || status === 'streaming';

  return (
    <section aria-label="Chat">
      {messages.map((message) => (
        <p key={message.id}>
          {message.parts
            .map((part) => (part.type === 'text' ? part.text : ''))
            .join('')}
        </p>
      ))}
      <button disabled={busy} onClick={() => sendMessage({ text: 'Hello' })}>
        Send a test message
      </button>
      {error && (
        <p role="alert">Could not send your message. Please try again.</p>
      )}
    </section>
  );
}
```

**app/chat/page.jsx**

```jsx filename="app/chat/page.jsx"
'use client';

import { useChat } from '@chat-adapter/web/react';

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    api: '/api/chat',
    threadId: 'support',
  });
  const busy = status === 'submitted' || status === 'streaming';

  return (
    <section aria-label="Chat">
      {messages.map((message) => (
        <p key={message.id}>
          {message.parts
            .map((part) => (part.type === 'text' ? part.text : ''))
            .join('')}
        </p>
      ))}
      <button disabled={busy} onClick={() => sendMessage({ text: 'Hello' })}>
        Send a test message
      </button>
      {error && (
        <p role="alert">Could not send your message. Please try again.</p>
      )}
    </section>
  );
}
```

Use `messages` to render the conversation and `sendMessage({ text })` to submit text from your own input. The helper also exposes `stop()` to cancel a response.

After configuring authentication, sign in and open `/chat`. Select **Send a test message** to send `Hello`; the bot should respond with `You said: Hello`. The `support` conversation ID is scoped to the authenticated user by the adapter. Generate a different conversation ID when you want to start a new conversation.

For a fuller chat interface, see the [official Next.js example](https://github.com/vercel/chat/tree/main/examples/nextjs-chat).

## Next steps

- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)
- [Chat SDK quickstart](/docs/chat-sdk/quickstart)
- [Add more platform adapters](/docs/chat-sdk/adapters)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
