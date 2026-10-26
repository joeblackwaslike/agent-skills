---
title: Chat SDK
product: vercel
url: /docs/chat-sdk
canonical_url: "https://vercel.com/docs/chat-sdk"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers
  - /docs/chat-sdk/quickstart
  - /docs/chat-sdk/adapters
  - /docs/functions
summary: Build bots for Slack and other chat platforms with Chat SDK, and deploy them on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "190c48347d6dab4bf434fd149e830e069b5f77a2bdf6879b248f706cad1d500c"
---

# Chat SDK

## Build bots for chat platforms

Build bots for Slack, Teams, and more with one TypeScript API, and deploy them on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Chat SDK brings agents to your users](https://vercel.com/blog/chat-sdk-brings-agents-to-your-users)
- [How to build an agent for Liveblocks with Chat SDK and AI SDK](https://vercel.com/kb/guide/liveblocks-chat-sdk-ai-sdk) — Build an AI agent that replies to @-mentions in Liveblocks comment threads with streamed responses and tool calling, usi
- [Introducing npm i chat – One codebase, every chat platform](https://vercel.com/changelog/chat-sdk)
- [TanStack AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) — Connect TanStack AI to Vercel AI Gateway with the official adapter to authenticate requests and stream responses from AI
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/chat-sdk.graph.md](/docs/chat-sdk.graph.md)
<!-- /docsgraph:related -->

#### Handle messages

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

#### Stream AI

**lib/bot.ts**

```typescript filename="lib/bot.ts"
import { streamText } from 'ai';

const model = process.env.AI_GATEWAY_MODEL;
if (!model) throw new Error('Set AI_GATEWAY_MODEL.');

bot.onNewMention(async (thread, message) => {
  const result = streamText({
    model,
    prompt: message.text,
    abortSignal: thread.signal,
  });
  await thread.post(result.textStream);
});
```

**lib/bot.js**

```javascript filename="lib/bot.js"
import { streamText } from 'ai';

const model = process.env.AI_GATEWAY_MODEL;
if (!model) throw new Error('Set AI_GATEWAY_MODEL.');

bot.onNewMention(async (thread, message) => {
  const result = streamText({
    model,
    prompt: message.text,
    abortSignal: thread.signal,
  });
  await thread.post(result.textStream);
});
```

Keep the bot setup from **Handle messages** and replace its handlers with this example. Add the `streamText` import, install `ai`, configure [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok), and set `AI_GATEWAY_MODEL` to a [model ID](/docs/ai-gateway/models-and-providers). See [streaming responses](https://chat-sdk.dev/docs/streaming).

#### Add actions

**lib/bot.ts**

```typescript filename="lib/bot.ts"
import { Actions, Button, Card } from 'chat';

bot.onNewMention(async (thread) => {
  await thread.post(Card({
    title: 'Meet your bot',
    children: [Actions([
      Button({ id: 'hello', label: 'Say hello' }),
    ])],
  }));
});

bot.onAction('hello', async ({ thread }) => {
  if (thread) await thread.post('Hello again!');
});
```

**lib/bot.js**

```javascript filename="lib/bot.js"
import { Actions, Button, Card } from 'chat';

bot.onNewMention(async (thread) => {
  await thread.post(Card({
    title: 'Meet your bot',
    children: [Actions([
      Button({ id: 'hello', label: 'Say hello' }),
    ])],
  }));
});

bot.onAction('hello', async ({ thread }) => {
  if (thread) await thread.post('Hello again!');
});
```

Keep the bot setup from **Handle messages** and replace its handlers with this example. Add the shown imports to `lib/bot.ts` or `lib/bot.js`. See the [cards](https://chat-sdk.dev/docs/cards) and [action handlers](https://chat-sdk.dev/docs/actions) guides.

The **Handle messages** example connects to Slack through Vercel Connect, stores subscriptions in Redis, and echoes replies in mentioned threads. Use your connector UID in place of `slack/my-bot` and set `REDIS_URL` for shared state. Follow the [Chat SDK quickstart](/docs/chat-sdk/quickstart) to scaffold the bot with `create-chat-sdk`, connect Slack through Vercel Connect, and deploy it on Vercel.

## Handle conversations across platforms

Chat SDK separates your bot's behavior from the platform that delivers each event:

- **Event handlers** respond to mentions, subscribed messages, and interactions such as button clicks.
- **Platform adapters** connect your bot to services such as Slack, Discord, and Microsoft Teams. Each adapter translates platform events and outgoing messages into the shared API.
- **State adapters** store thread subscriptions, coordinate concurrent processing, and deduplicate events. Use persistent shared storage, such as Redis or PostgreSQL, when deploying to Vercel.

A bot can use multiple platform adapters with the same handlers. Supported features vary by platform; use the [adapters guide](/docs/chat-sdk/adapters) to choose platform and state adapters and check their capabilities.

## Deploy on Vercel

Expose your bot's webhook through a [Vercel Function](/docs/functions). With Next.js, a Route Handler passes incoming requests to the platform adapter and uses `after` to finish processing after sending the webhook response.

The function's [maximum duration](/docs/functions/configuring-functions/duration) still applies to this processing. Use [Vercel Workflows](/docs/workflows) for work that must survive interruptions or wait for an external event, such as a human approval.

For a complete example with environment variables, persistent Redis state, and webhook configuration, follow the [quickstart](/docs/chat-sdk/quickstart). To add a bot to an existing Next.js, Nuxt, Hono, Nitro, or TanStack Start app, choose a [framework guide](/docs/chat-sdk/frameworks).

## Add AI, credentials, and durable tasks

Chat SDK handles messaging and interactions. You can build a bot without a language model, or combine it with other tools:

| Tool | Use it to |
| --- | --- |
| [AI Gateway](/docs/chat-sdk/integrations/ai-gateway) | Stream model responses with AI SDK and conversation history. |
| [Vercel Connect](/docs/chat-sdk/integrations/connect) | Resolve provider credentials at runtime and receive supported platform events through Connect triggers. |
| [eve](/docs/chat-sdk/eve) | Run messages through an eve agent while keeping Chat SDK adapters and event handlers. |
| [Vercel Sandbox](/docs/chat-sdk/integrations/sandbox) | Analyze files with an agent using the AI SDK Bash tool. |
| [Vercel Workflows](/docs/chat-sdk/integrations/workflows) | Pause a durable task for approval from a chat card. |

Explore the [integration guides](/docs/chat-sdk/integrations) for complete examples.

Persistent Chat SDK state keeps track of subscriptions and coordinates event processing. Vercel Workflows provides durable execution for the tasks your bot starts.

## Build with an AI coding agent

Install the [Chat SDK skill](https://chat-sdk.dev/docs#ai-coding-agents) to give your coding agent guidance on SDK APIs, adapter patterns, and project conventions:

```bash filename="Terminal"
pnpx skills add vercel/chat
```

The skill uses the documentation bundled in `node_modules/chat/docs`, along with adapter guides and starter templates.

For guidance across the Vercel platform, install the [Vercel Plugin](/docs/agent-resources/vercel-plugin). It includes the Chat SDK skill, specialist agents, and slash commands:

```bash filename="Terminal"
pnpx plugins add vercel/vercel-plugin
```

See the [plugin setup guide](/docs/agent-resources/vercel-plugin#getting-started) for prerequisites and supported tools.

## Start with a template

- [Knowledge Agent](/templates/nuxt/chat-sdk-knowledge-agent): Build a knowledge bot with Nuxt, PostgreSQL, and Chat SDK.
- [Community Agent](/templates/next.js/chat-sdk-community-agent): Build a Slack community agent with a Next.js admin interface.

## Next steps

- [Build and deploy your first Slack bot](/docs/chat-sdk/quickstart)
- [Explore the complete guide to Chat SDK](/kb/guide/the-complete-guide-to-chat-sdk)
- [Choose platform and state adapters](/docs/chat-sdk/adapters)
- [Use an eve agent with Chat SDK](/docs/chat-sdk/eve)
- [Read the Chat SDK API and platform documentation](https://chat-sdk.dev/docs)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
