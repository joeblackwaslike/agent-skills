---
title: Chat SDK with Vercel Passport
product: vercel
url: /docs/chat-sdk/integrations/passport
canonical_url: "https://vercel.com/docs/chat-sdk/integrations/passport"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/integrations
  - /docs/chat-sdk
related:
  - /docs/passport
  - /docs/passport/set-up-identity-provider
  - /docs/environment-variables
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers
summary: Use a verified Vercel Passport identity to store and retrieve per-user conversation history in a Chat SDK bot.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/integrations/passport.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "b2286fd29fac377c30ae307b55d9b82e1b11db9cbd8dbee14d860ae875f82520"
---

# Chat SDK with Vercel Passport

Use [Vercel Passport](/docs/passport) to identify signed-in users of a browser chatbot and keep their conversations under one [Chat SDK History API](https://chat-sdk.dev/docs/history) user key. A person can start a new conversation and continue using context from their earlier conversations.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Chat SDK brings agents to your users](https://vercel.com/blog/chat-sdk-brings-agents-to-your-users)
- [Chat SDK with Vercel Connect](https://vercel.com/docs/chat-sdk/integrations/connect) — Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [eve on Vercel](https://vercel.com/docs/frameworks/agents/eve) — Create and deploy an eve agent on Vercel with AI Gateway model access, durable sessions, and authenticated requests.

Full cross-link map for this page: [/docs/chat-sdk/integrations/passport.graph.md](/docs/chat-sdk/integrations/passport.graph.md)
<!-- /docsgraph:related -->

Passport verifies the browser session. The Web Adapter uses that identity as the message author, and `history.user.identity` returns the author's ID as the history key. Chat SDK stores the messages in your state adapter.

## Prerequisites

- A Next.js App Router app with [Passport configured](/docs/passport/set-up-identity-provider) for the deployment where you run the bot
- A Redis database with `REDIS_URL` set in your project's [environment variables](/docs/environment-variables)
- [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok) and an `AI_GATEWAY_MODEL` environment variable set to your chosen [model ID](/docs/ai-gateway/models-and-providers)

The examples use `lib` and `app` at the project root. If your project uses `src`, put both directories under `src`.

## Install the packages

Install Chat SDK, its Web and Redis adapters, Passport, and AI SDK:

```bash filename="Terminal"
pnpm add chat @chat-adapter/web @chat-adapter/state-redis @vercel/passport ai
```

## Resolve a verified Passport identity

Create `lib/passport.ts` to authenticate each browser request. Disable Passport's development identity and reject missing or unverified identities:

**lib/passport.ts**

```typescript filename="lib/passport.ts"
import { Buffer } from 'node:buffer';
import { getIdentity } from '@vercel/passport';

export async function getPassportUser(request: Request) {
  try {
    const identity = await getIdentity(request, { development: false });
    if (!identity?.verified || !identity.payload.iss) return null;

    const id = Buffer.from(
      JSON.stringify([identity.payload.iss, identity.subject]),
    ).toString('base64url');

    return { id, name: identity.name };
  } catch {
    return null;
  }
}
```

**lib/passport.js**

```javascript filename="lib/passport.js"
import { Buffer } from 'node:buffer';
import { getIdentity } from '@vercel/passport';

export async function getPassportUser(request) {
  try {
    const identity = await getIdentity(request, { development: false });
    if (!identity?.verified || !identity.payload.iss) return null;

    const id = Buffer.from(
      JSON.stringify([identity.payload.iss, identity.subject]),
    ).toString('base64url');

    return { id, name: identity.name };
  } catch {
    return null;
  }
}
```

The key encodes the verified issuer and subject together. Base64url encoding removes the colons that the Web Adapter rejects in user IDs; it does not encrypt the identity. Keep the subject opaque and use the same encoding wherever you resolve this person's history key. Email addresses and session IDs are unsuitable as stable identifiers.

On Vercel, `getIdentity(request)` verifies the Passport token and checks the project and environment against the deployment's system environment variables. Keep `VERCEL_PROJECT_ID` and `VERCEL_ENV` available to the function. See [Read Passport identity](/docs/passport/read-identity) for the request header and verification behavior.

## Store and use per-user history

Create `lib/bot.ts`. The Web Adapter assigns the authenticated ID to `author.userId`, and Chat SDK resolves `message.userKey` before calling the handler:

**lib/bot.ts**

```typescript filename="lib/bot.ts"
import { Chat, toPromptEntries } from 'chat';
import { createWebAdapter } from '@chat-adapter/web';
import { createRedisState } from '@chat-adapter/state-redis';
import { generateText } from 'ai';
import { getPassportUser } from './passport';

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    web: createWebAdapter({
      userName: 'my-bot',
      protocol: 'ai-sdk',
      getUser: getPassportUser,
    }),
  },
  state: createRedisState(),
  history: {
    user: {
      identity: ({ adapter, author }) =>
        adapter === 'web' ? author.userId : null,
      retention: '30d',
      maxPerUser: 200,
    },
  },
});

bot.onDirectMessage(async (thread, message) => {
  const userKey = message.userKey;
  if (!userKey) return;

  const model = process.env.AI_GATEWAY_MODEL;
  if (!model) throw new Error('Set AI_GATEWAY_MODEL to an AI Gateway model ID.');

  await bot.history.user.append(thread, message);
  const recent = await bot.history.user.list({ userKey, limit: 20 });

  const { text } = await generateText({
    model,
    system: "Answer using the signed-in user's previous messages for context.",
    messages: toPromptEntries(recent),
    abortSignal: AbortSignal.timeout(60_000),
  });

  await thread.post(text);
  await bot.history.user.append(
    thread,
    { role: 'assistant', text },
    { userKey },
  );
});
```

**lib/bot.js**

```javascript filename="lib/bot.js"
import { Chat, toPromptEntries } from 'chat';
import { createWebAdapter } from '@chat-adapter/web';
import { createRedisState } from '@chat-adapter/state-redis';
import { generateText } from 'ai';
import { getPassportUser } from './passport';

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    web: createWebAdapter({
      userName: 'my-bot',
      protocol: 'ai-sdk',
      getUser: getPassportUser,
    }),
  },
  state: createRedisState(),
  history: {
    user: {
      identity: ({ adapter, author }) =>
        adapter === 'web' ? author.userId : null,
      retention: '30d',
      maxPerUser: 200,
    },
  },
});

bot.onDirectMessage(async (thread, message) => {
  const userKey = message.userKey;
  if (!userKey) return;

  const model = process.env.AI_GATEWAY_MODEL;
  if (!model) throw new Error('Set AI_GATEWAY_MODEL to an AI Gateway model ID.');

  await bot.history.user.append(thread, message);
  const recent = await bot.history.user.list({ userKey, limit: 20 });

  const { text } = await generateText({
    model,
    system: "Answer using the signed-in user's previous messages for context.",
    messages: toPromptEntries(recent),
    abortSignal: AbortSignal.timeout(60_000),
  });

  await thread.post(text);
  await bot.history.user.append(
    thread,
    { role: 'assistant', text },
    { userKey },
  );
});
```

The handler explicitly appends both the incoming message and the completed reply. `history.user.list` returns the latest 20 entries in chronological order, and `toPromptEntries` converts them into model messages. Posting a reply does not automatically add it to user history.

This example keeps up to 200 entries per user. The 30-day retention is an inactivity timeout for the entire user's history list, refreshed on each append. It is not a maximum age for each message. The Web Adapter's thread history is a separate store with its own retention settings.

## Connect the browser endpoint

Create `app/api/chat/route.ts`. Return the Web Adapter response directly and pass background work to Next.js `after`:

**app/api/chat/route.ts**

```typescript filename="app/api/chat/route.ts"
import { after } from 'next/server';
import { bot } from '../../../lib/bot';

export const maxDuration = 120;

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

export const maxDuration = 120;

export async function POST(request) {
  return bot.webhooks.web(request, {
    waitUntil: (task) => after(() => task),
  });
}
```

Use the Node.js runtime, which is the App Router default. The 120-second [function duration](/docs/functions/configuring-functions/duration) leaves time for identity verification, history retrieval, and delivery around the 60-second model timeout.

Connect the [browser client from the Next.js guide](/docs/chat-sdk/frameworks/nextjs#connect-the-browser-client) to `/api/chat`. Keep the browser UI and endpoint on the same Passport-protected deployment so requests include the signed-in session. The server derives the user ID from Passport; the browser supplies only a conversation ID and message content.

## Verify history across conversations

Deploy to an environment with Passport enabled, then check the flow:

1. Sign in and tell the bot a preference, such as your preferred programming language.
2. Start another conversation by changing the client's `threadId`. Ask about the preference. The bot receives the same user's saved messages even though the conversation ID changed.
3. Sign in as a different person. Their model context must contain only their own history, even if they use the same conversation ID.

A local request without a real Passport token returns HTTP 401 from the Web Adapter. This example deliberately rejects Passport's unverified development identity. On a protected deployment, Passport redirects unauthenticated browser requests to sign in before they reach the function.

## Share history with other chat platforms

Passport does not automatically connect a browser identity to a Slack, Teams, or Discord account. Before returning the same history key for another adapter, establish a verified account link and store the platform, workspace or tenant, and platform user ID alongside the Passport issuer and subject. Resolve that mapping on the server; do not match accounts by display name or an unverified email.

The example returns `null` for adapters other than `web`. A missing history key skips user-history persistence; it does not reject an event. Authenticate platform webhooks separately, and keep personal history out of shared-channel replies where other members could see it.

## Next steps

- [Read the Chat SDK History API reference](https://chat-sdk.dev/docs/api/history)
- [Review Passport identity claims](/docs/passport/token-claims)
- [Configure AI Gateway for Chat SDK](/docs/chat-sdk/integrations/ai-gateway)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
