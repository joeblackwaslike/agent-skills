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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "65e9fbcf69e08aaae15828531384eafa4e2af25688c48eecd75e63bbac5b61c2"
---

# Chat SDK

## Build bots for chat platforms

Build bots for Slack, Teams, and more with one TypeScript API, and deploy them on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Chat SDK brings agents to your users](https://vercel.com/blog/chat-sdk-brings-agents-to-your-users)
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Introducing npm i chat – One codebase, every chat platform](https://vercel.com/changelog/chat-sdk)
- [TanStack AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) — Connect TanStack AI to Vercel AI Gateway with the official adapter to authenticate requests and stream responses from AI
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.
- [Mastra with Vercel Sandbox](https://vercel.com/docs/sandbox/ecosystem/mastra) — Give a Mastra agent an isolated workspace for running commands with the Vercel Sandbox adapter and AI Gateway.

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
| [Vercel Passport](/docs/chat-sdk/integrations/passport) | Use verified identities to store and retrieve per-user conversation history. |
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

Deploy a [Slack research bot with Claude Managed Agents](/templates/next.js/claude-managed-agents-chat-sdk), a [knowledge bot with Nuxt](/templates/nuxt/chat-sdk-knowledge-agent), or a [community bot with Next.js](/templates/next.js/chat-sdk-community-agent):

## Frequently asked questions

### What is Chat SDK?

Chat SDK is an open-source TypeScript library from Vercel for building chat bots that run on several platforms from one codebase. You write event handlers once, and platform adapters translate them for Slack, Microsoft Teams, Google Chat, Discord, Telegram, WhatsApp, GitHub, Linear, and other services. Install the `chat` package from npm, then add an adapter for each platform your bot uses. See [Chat SDK adapters](/docs/chat-sdk/adapters) for the options.

### Is Chat SDK free and open source?

Yes. Chat SDK is open source under the MIT license, and its code is in the [vercel/chat](https://github.com/vercel/chat) repository on GitHub. The library has no fee. You pay for the infrastructure your bot uses, such as [Vercel Functions](/docs/functions/usage-and-pricing), a Redis or PostgreSQL database for state, and model usage through [AI Gateway](/docs/ai-gateway/pricing).

### Can I use Chat SDK without Vercel?

Yes. Chat SDK's webhook handlers accept a standard Web `Request` and return a `Response`, and you pass your platform's background-task function as the `waitUntil` option. Vercel Connect is also optional. Without it, adapters read credentials such as `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET` from environment variables. When you deploy on Vercel, you can add [Vercel Connect](/docs/chat-sdk/integrations/connect) for managed credentials and provision a state database from the [Marketplace](/marketplace/category/storage).

### Do I need an AI model to build a bot with Chat SDK?

No. Chat SDK handles messages, threads, cards, and button clicks, so you can build a bot that answers slash commands, posts notifications, or follows fixed rules without a language model. To add AI responses, pass a model stream to `thread.post()`. Chat SDK accepts any `AsyncIterable<string>` and detects AI SDK and TanStack AI streams automatically. See [Chat SDK with AI Gateway](/docs/chat-sdk/integrations/ai-gateway).

### How do I stream AI responses into Slack with Chat SDK?

Pass the stream from AI SDK's `streamText()` to `thread.post()`, and await the call so the handler stays active until the stream finishes. In Slack, Chat SDK uses Slack's native streaming API to update the message as text arrives. On Discord and Google Chat, it posts a message and edits it as chunks arrive, throttling the edits to avoid rate limits. Adapters such as GitHub and WhatsApp wait for the whole stream and post one final message. See [streaming responses](https://chat-sdk.dev/docs/streaming).

## Next steps

- [Build and deploy your first Slack bot](/docs/chat-sdk/quickstart)
- [Choose platform and state adapters](/docs/chat-sdk/adapters)
- [Read the Chat SDK API and platform documentation](https://chat-sdk.dev/docs)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
