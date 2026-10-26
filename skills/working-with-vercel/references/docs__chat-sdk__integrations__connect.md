---
title: Chat SDK with Vercel Connect
product: vercel
url: /docs/chat-sdk/integrations/connect
canonical_url: "https://vercel.com/docs/chat-sdk/integrations/connect"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/integrations
  - /docs/chat-sdk
related:
  - /docs/connect
  - /docs/chat-sdk/quickstart
  - /docs/connect/frameworks/chat-sdk
  - /docs/chat-sdk/frameworks
  - /docs/cli/connect
summary: Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/integrations/connect.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "99f69c89ac3dc2f62c594e11a02c574cca6de16cc513dd8c253ea49fd567930d"
---

# Chat SDK with Vercel Connect

Use [Vercel Connect](/docs/connect) to manage a Chat SDK bot's platform credentials and forward supported events to its webhook. The Slack adapter requests credentials when it needs them and verifies the Connect token on forwarded events.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [Chat SDK now supports Vercel Connect](https://vercel.com/changelog/chat-sdk-vercel-connect)
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with Hono](https://vercel.com/docs/chat-sdk/frameworks/hono) — Add a Chat SDK bot to Hono, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.

Full cross-link map for this page: [/docs/chat-sdk/integrations/connect.graph.md](/docs/chat-sdk/integrations/connect.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Start with the [Chat SDK quickstart](/docs/chat-sdk/quickstart). It creates the Slack connector, attaches it to your Vercel project, and configures Redis. You need permission to install the Slack app in your workspace.

For an existing app, follow [Connect's Chat SDK setup](/docs/connect/frameworks/chat-sdk) and the matching [framework guide](/docs/chat-sdk/frameworks) for the webhook route.

## Configure the Slack adapter

Install the bot dependencies if your project does not already include them:

```bash filename="Terminal"
pnpm add chat @chat-adapter/slack @chat-adapter/state-redis @vercel/connect
```

Set `SLACK_CONNECTOR` to your connector UID, such as `slack/my-bot`, and configure `REDIS_URL`. Make both variables available in the environments where you run the bot.

Use the Connect helper in `src/lib/bot.ts`:

**src/lib/bot.ts**

```typescript filename="src/lib/bot.ts"
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state: createRedisState(),
});

bot.onNewMention(async (thread) => {
  await thread.subscribe();
  await thread.post('Connected! Reply in this thread to chat.');
});
bot.onSubscribedMessage(async (thread, message) => {
  await thread.post(`You said: ${message.text}`);
});
```

**src/lib/bot.js**

```javascript filename="src/lib/bot.js"
import { Chat } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { connectSlackAdapter } from '@vercel/connect/chat';

const connector = process.env.SLACK_CONNECTOR;
if (!connector) throw new Error('Set SLACK_CONNECTOR to your connector UID.');

export const bot = new Chat({
  userName: 'my-bot',
  adapters: {
    slack: createSlackAdapter({ ...connectSlackAdapter(connector) }),
  },
  state: createRedisState(),
});

bot.onNewMention(async (thread) => {
  await thread.subscribe();
  await thread.post('Connected! Reply in this thread to chat.');
});
bot.onSubscribedMessage(async (thread, message) => {
  await thread.post(`You said: ${message.text}`);
});
```

The helper supplies outbound credentials and a webhook verifier. Pass incoming events to `bot.webhooks.slack` using the framework route from your existing bot. Keep the request body unread until the adapter receives it.

## Attach the event trigger

For the quickstart's `/api/webhooks/slack` route, attach your connector with:

```bash filename="Terminal"
vercel connect attach slack/my-bot --triggers --trigger-path /api/webhooks/slack
```

Use your actual connector UID. With no environment flag, the connector is available to Production, Preview, and Development tokens, and its trigger sends events to the Production deployment. See [Connect CLI environment options](/docs/cli/connect) to target a Preview branch or restrict token access.

Pull Development credentials with `vercel env pull .env.local` for local outbound requests. A connector restricted to Production cannot be used with a Development OIDC token. Connect triggers deliver to deployed endpoints; test incoming Slack events against the configured deployment.

## Test credential and event delivery

Deploy the bot and invite the installed app to a Slack channel. Mention it to receive **Connected! Reply in this thread to chat.**, then reply to see an echo. This exercises both inbound event verification and outbound credential resolution.

If requests fail, check the connector UID, project link, allowed environment, and trigger path. Other platforms have different trigger support; use the [capability table](/docs/connect/frameworks/chat-sdk#check-platform-capabilities) before changing adapters.

## Give an agent access to user accounts

The Slack helper authenticates the bot as an app. An agent that reads a person's Linear issues through MCP needs a separate connector and a user subject derived from a verified application account.

Create MCP clients per user and handle OAuth consent before starting the model stream. For Slack users, establish an account link before requesting credentials on their behalf. Follow [AI SDK with MCP and Connect](/docs/connect/frameworks/ai-sdk-and-mcp) or [TanStack AI in a Chat SDK bot](/docs/connect/frameworks/tanstack-ai#use-authenticated-mcp-tools-in-a-chat-sdk-bot).

## Next steps

- [Add model responses with AI Gateway](/docs/chat-sdk/integrations/ai-gateway)
- [Configure Connect credentials and triggers](/docs/connect/frameworks/chat-sdk)
- [Learn about Connect subjects and scopes](/docs/connect/concepts/tokens)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
