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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "4f0a93e154faa8df46d0d1dd71814562a4523aab71020f69d6cea6e718c55c38"
---

# Chat SDK with Vercel Connect

Use [Vercel Connect](/docs/connect) to manage a Chat SDK bot's platform credentials and forward supported events to its webhook. The Slack adapter requests credentials when it needs them and verifies the Connect token on forwarded events.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Chat SDK now supports Vercel Connect](https://vercel.com/changelog/chat-sdk-vercel-connect)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with Hono](https://vercel.com/docs/chat-sdk/frameworks/hono) — Add a Chat SDK bot to Hono, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK Adapters](https://vercel.com/docs/chat-sdk/adapters) — Choose platform and state adapters for a Chat SDK bot on Vercel.
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.
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

## Frequently asked questions

### What does Vercel Connect do for a Chat SDK bot?

Vercel Connect handles both directions of your bot's platform traffic. For outbound calls, the adapter asks Connect for a credential, such as a Slack bot token, when it needs one, and `@vercel/connect` caches it and refreshes short-lived tokens. For inbound events, Connect verifies the provider's request and forwards it to your webhook with a Vercel OIDC token, which the adapter verifies. You don't store platform tokens or signing secrets in your project.

### Which Chat SDK adapters work with Vercel Connect?

Slack, Discord, Microsoft Teams, GitHub, and Linear support both Connect credentials and Connect triggers for inbound events. Notion and Telegram use Connect only for outbound credentials and keep their native webhook verification, and Telegram can also use polling. Each platform has its own helper in `@vercel/connect/chat`, such as `connectSlackAdapter` and `connectDiscordAdapter`. See the [Connect capability table](/docs/connect/frameworks/chat-sdk#check-platform-capabilities).

### Do I still need `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET` with Connect?

No. `connectSlackAdapter` supplies the bot token and a webhook verifier, so you can leave both variables unset. Don't set `signingSecret` or `SLACK_SIGNING_SECRET` for a route that receives Connect triggers, because the adapter verifies the forwarded request's OIDC token instead of a Slack signature. Set `SLACK_CONNECTOR` to your connector UID and keep `REDIS_URL` for state.

### Can Vercel Connect send events to a Preview deployment or localhost?

Connect can send events to a Preview deployment, but not to `localhost`. Register a Preview branch as the trigger destination, and allow the `preview` environment in a custom verifier created with `createConnectWebhookVerifier`. Locally, you can still make outbound calls with a Development token from `vercel env pull`. See [Customize inbound OIDC verification](/docs/connect/frameworks/chat-sdk#customize-inbound-oidc-verification).

### Can one Connect connector serve several Slack workspaces?

A connector can have several installations, but each adapter uses only one of them. The Connect helpers use the connector's default installation, or the one you pass as `installationId`, and they don't pick an installation based on the workspace an event came from. See [Select scopes and installations](/docs/connect/frameworks/chat-sdk#select-scopes-and-installations).

## Next steps

- [Add model responses with AI Gateway](/docs/chat-sdk/integrations/ai-gateway)
- [Configure Connect credentials and triggers](/docs/connect/frameworks/chat-sdk)
- [Learn about Connect subjects and scopes](/docs/connect/concepts/tokens)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
