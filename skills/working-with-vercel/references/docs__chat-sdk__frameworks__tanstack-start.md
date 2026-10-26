---
title: Chat SDK with TanStack Start
product: vercel
url: /docs/chat-sdk/frameworks/tanstack-start
canonical_url: "https://vercel.com/docs/chat-sdk/frameworks/tanstack-start"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/frameworks
  - /docs/chat-sdk
related:
  - /docs/frameworks/full-stack/tanstack-start
  - /docs/cli
  - /docs/environment-variables
  - /docs/observability/runtime-logs
  - /docs/cli/connect
summary: Add a Chat SDK bot to TanStack Start, receive Slack events through Vercel Connect, and deploy on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/frameworks/tanstack-start.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "206ba56e01be7c22a2764a5f53194af31d9e1b0b083713742383b6bd8fec14f4"
---

# Chat SDK with TanStack Start

Use a TanStack Start React server route to receive Slack events and pass them to Chat SDK. The route runs on the server alongside your application's UI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with Nuxt](https://vercel.com/docs/chat-sdk/frameworks/nuxt) — Add a Chat SDK bot to Nuxt, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Getting Started with Chat SDK](https://vercel.com/docs/chat-sdk/quickstart) — Create a Slack bot with the Chat SDK CLI, connect it to Slack through Vercel Connect, and deploy it on Vercel.
- [TanStack AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) — Connect TanStack AI to Vercel AI Gateway with the official adapter to authenticate requests and stream responses from AI
- [Chat SDK with AI Gateway](https://vercel.com/docs/chat-sdk/integrations/ai-gateway) — Stream AI Gateway model responses into Chat SDK conversations with AI SDK and message history.

Full cross-link map for this page: [/docs/chat-sdk/frameworks/tanstack-start.graph.md](/docs/chat-sdk/frameworks/tanstack-start.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Start with an existing TanStack Start project configured for [deployment on Vercel](/docs/frameworks/full-stack/tanstack-start), the latest [Vercel CLI](/docs/cli), and permission to install an app in your Slack workspace.

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

Create `src/routes/api/webhooks/slack.ts` with a POST handler:

**src/routes/api/webhooks/slack.ts**

```typescript filename="src/routes/api/webhooks/slack.ts"
import { createFileRoute } from '@tanstack/react-router';
import { waitUntil } from '@vercel/functions';
import { bot } from '../../../../lib/bot';

export const Route = createFileRoute('/api/webhooks/slack')({
  server: {
    handlers: {
      POST: ({ request }) => bot.webhooks.slack(request, { waitUntil }),
    },
  },
});
```

**src/routes/api/webhooks/slack.js**

```javascript filename="src/routes/api/webhooks/slack.js"
import { createFileRoute } from '@tanstack/react-router';
import { waitUntil } from '@vercel/functions';
import { bot } from '../../../../lib/bot';

export const Route = createFileRoute('/api/webhooks/slack')({
  server: {
    handlers: {
      POST: ({ request }) => bot.webhooks.slack(request, { waitUntil }),
    },
  },
});
```

The handler receives a Web `Request` and returns the adapter's `Response`. Pass `waitUntil` from `@vercel/functions` so the bot can finish processing after acknowledging the event. Import the bot only from server code.

Run your framework's development or build command to update the generated route tree. Keep the [Nitro Vite plugin configured for Vercel](/docs/frameworks/full-stack/tanstack-start#nitro-configuration) so the server route is deployed as a function.

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
pnpm add @chat-adapter/web @tanstack/ai-react
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
      protocol: 'ag-ui',
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
      protocol: 'ag-ui',
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

This example uses TanStack AI in the browser, so the Web Adapter must use `protocol: 'ag-ui'`. If you instead use the AI SDK React helper, select `ai-sdk` and install its client dependencies. See [Web Adapter client options](https://chat-sdk.dev/adapters/official/web#framework-integrations).

### Add the browser endpoint

Create `src/routes/api/chat.ts` to receive browser requests and return the adapter's stream:

**src/routes/api/chat.ts**

```typescript filename="src/routes/api/chat.ts"
import { createFileRoute } from '@tanstack/react-router';
import { waitUntil } from '@vercel/functions';
import { bot } from '../../../lib/bot';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: ({ request }) => bot.webhooks.web(request, { waitUntil }),
    },
  },
});
```

**src/routes/api/chat.js**

```javascript filename="src/routes/api/chat.js"
import { createFileRoute } from '@tanstack/react-router';
import { waitUntil } from '@vercel/functions';
import { bot } from '../../../lib/bot';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: ({ request }) => bot.webhooks.web(request, { waitUntil }),
    },
  },
});
```

### Connect the browser client

Create `src/routes/chat.tsx`. Connect TanStack AI to the server route with `fetchServerSentEvents`:

**src/routes/chat.tsx**

```tsx filename="src/routes/chat.tsx"
import { fetchServerSentEvents, useChat } from '@tanstack/ai-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({ component: ChatPage });

function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    connection: fetchServerSentEvents('/api/chat'),
    threadId: 'support',
  });
  const busy = status === 'submitted' || status === 'streaming';

  return (
    <section aria-label="Chat">
      {messages.map((message) => (
        <p key={message.id}>
          {message.parts
            .map((part) => (part.type === 'text' ? part.content : ''))
            .join('')}
        </p>
      ))}
      <button disabled={busy} onClick={() => sendMessage('Hello')}>
        Send a test message
      </button>
      {error && (
        <p role="alert">Could not send your message. Please try again.</p>
      )}
    </section>
  );
}
```

**src/routes/chat.jsx**

```jsx filename="src/routes/chat.jsx"
import { fetchServerSentEvents, useChat } from '@tanstack/ai-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({ component: ChatPage });

function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    connection: fetchServerSentEvents('/api/chat'),
    threadId: 'support',
  });
  const busy = status === 'submitted' || status === 'streaming';

  return (
    <section aria-label="Chat">
      {messages.map((message) => (
        <p key={message.id}>
          {message.parts
            .map((part) => (part.type === 'text' ? part.content : ''))
            .join('')}
        </p>
      ))}
      <button disabled={busy} onClick={() => sendMessage('Hello')}>
        Send a test message
      </button>
      {error && (
        <p role="alert">Could not send your message. Please try again.</p>
      )}
    </section>
  );
}
```

TanStack AI sends a string with `sendMessage(text)` and exposes text parts as `part.content`. Keep the bot imported only in the server endpoint, and let the framework regenerate the route tree after adding both routes.

After configuring authentication, sign in and open `/chat`. Select **Send a test message** to send `Hello`; the bot should respond with `You said: Hello`. The `support` conversation ID is scoped to the authenticated user by the adapter. Generate a different conversation ID when you want to start a new conversation.

For a fuller chat interface, see the [official TanStack Start example](https://github.com/vercel/chat/tree/main/examples/tanstack-start-chat).

## Next steps

- [TanStack Start server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes)
- [Chat SDK TanStack Start example](https://github.com/vercel/chat/tree/main/examples/tanstack-start-chat)
- [Add more platform adapters](/docs/chat-sdk/adapters)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
