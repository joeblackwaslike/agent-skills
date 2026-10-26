---
title: Chat SDK Adapters
product: vercel
url: /docs/chat-sdk/adapters
canonical_url: "https://vercel.com/docs/chat-sdk/adapters"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/chat-sdk
related:
  - /docs/environment-variables
  - /docs/chat-sdk/quickstart
  - /docs/workflows
  - /docs/chat-sdk/eve
  - /docs/connect/frameworks/chat-sdk
summary: Choose platform and state adapters for a Chat SDK bot on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/adapters.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "797f51b1eb8a12b3aeebfcfc8bf6d9090ec28fd108f61f88633adee1a503d079"
---

# Chat SDK Adapters

Chat SDK uses **platform adapters** to receive events and deliver messages, and a **state adapter** to share subscriptions, locks, and cached data across requests. Choose a platform adapter for each place your bot runs and a state adapter for its deployment environment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [State Adapters](https://chat-sdk.dev/docs/state-adapters) — State adapters store thread subscriptions, distributed locks, and cached data for your bot.
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Chat SDK brings agents to your users](https://vercel.com/blog/chat-sdk-brings-agents-to-your-users)
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with Vercel Connect](https://vercel.com/docs/chat-sdk/integrations/connect) — Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.
- [Chat SDK Integrations](https://vercel.com/docs/chat-sdk/integrations) — Extend a Chat SDK bot with AI Gateway, Vercel Connect, Vercel Sandbox, and Vercel Workflows.

Full cross-link map for this page: [/docs/chat-sdk/adapters.graph.md](/docs/chat-sdk/adapters.graph.md)
<!-- /docsgraph:related -->

## Platform adapters

These adapters cover common destinations for bots deployed on Vercel. Follow each adapter's documentation for its credentials, webhook setup, and supported features.

| Platform | Package | Use it for |
| --- | --- | --- |
| [Discord](https://chat-sdk.dev/adapters/official/discord) | `@chat-adapter/discord` | Community bots, slash commands, and threads. |
| [GitHub](https://chat-sdk.dev/adapters/official/github) | `@chat-adapter/github` | Bots that participate in issues and pull requests. |
| [Gmail](https://chat-sdk.dev/adapters/official/gmail) | `@chat-adapter/gmail` | Receive labeled emails and send replies in email threads. |
| [Linear](https://chat-sdk.dev/adapters/official/linear) | `@chat-adapter/linear` | Bots that respond in issue comment threads and agent sessions. |
| [Linq](https://chat-sdk.dev/adapters/vendor-official/linq) | `@linqapp/chat-sdk-adapter` | Send and receive iMessage and SMS messages. |
| [Liveblocks](https://chat-sdk.dev/adapters/vendor-official/liveblocks) | `@liveblocks/chat-sdk-adapter` | Bots that read and reply in Liveblocks comment threads. |
| [Microsoft Teams](https://chat-sdk.dev/adapters/official/teams) | `@chat-adapter/teams` | Conversations and cards in Teams. |
| [Resend](https://chat-sdk.dev/adapters/vendor-official/resend) | `@resend/chat-sdk-adapter` | Inbound email and replies in email threads. |
| [Slack](https://chat-sdk.dev/adapters/official/slack) | `@chat-adapter/slack` | Workspace messages, threads, and interactive responses. |
| [Telegram](https://chat-sdk.dev/adapters/official/telegram) | `@chat-adapter/telegram` | Chat messages and bot interactions. |
| [Twitch](https://chat-sdk.dev/adapters/official/twitch) | `@chat-adapter/twitch` | Read and reply in channel chat through EventSub webhooks. |
| [Web](https://chat-sdk.dev/adapters/official/web) | `@chat-adapter/web` | A browser chat interface connected to the same bot. |

The [adapter directory](https://chat-sdk.dev/adapters) includes more platforms and identifies who maintains each adapter:

- **Official** adapters are maintained by Vercel.
- **Vendor-official** adapters are maintained by the platform vendor.
- **Community** adapters are maintained by third-party developers.

### Check capabilities and delivery requirements

A shared API doesn't give every platform the same capabilities. Check the [platform feature matrix](https://chat-sdk.dev/docs/platform-adapters) before depending on streaming, attachments, buttons, or message editing.

Also check how the platform delivers events. For example, Discord interactions arrive through HTTP webhooks, while regular messages and reactions require its [Gateway connection](https://chat-sdk.dev/adapters/official/discord#http-interactions-vs-gateway). The Web adapter requires your application's authentication through `getUser`.

## State adapters

On Vercel, use a shared database so subscriptions and processing state remain available when requests reach different function instances.

| State adapter | Package | When to use it |
| --- | --- | --- |
| [Redis](https://chat-sdk.dev/adapters/official/redis) | `@chat-adapter/state-redis` | Store shared state in Redis. Reads `REDIS_URL` by default. |
| [ioredis](https://chat-sdk.dev/adapters/official/ioredis) | `@chat-adapter/state-ioredis` | Use an existing ioredis-based Redis setup. |
| [PostgreSQL](https://chat-sdk.dev/adapters/official/postgres) | `@chat-adapter/state-pg` | Use PostgreSQL for bot state. Reads `POSTGRES_URL`, falling back to `DATABASE_URL`. |
| [Memory](https://chat-sdk.dev/adapters/official/memory) | `@chat-adapter/state-memory` | Run local tests with state held in one process. |

Provision a database through the [Vercel Marketplace](/marketplace/category/storage), or connect an existing database through your project's [environment variables](/docs/environment-variables). The [quickstart](/docs/chat-sdk/quickstart#link-your-project-and-connect-redis) shows Redis setup.

State adapters coordinate message processing. For work that needs durable execution across interruptions, combine your bot with [Workflows](/docs/workflows) or [eve](/docs/chat-sdk/eve).

## Configure adapters with the CLI

Pass the platform and state adapter names to [`create-chat-sdk`](https://chat-sdk.dev/docs/create-chat-sdk). For example, scaffold one bot with Slack, Microsoft Teams, Redis, and Vercel Connect:

```bash filename="Terminal"
pnpm create chat-sdk@latest my-bot --adapter slack teams redis --connect --pm pnpm -y
```

The CLI generates the adapter configuration and webhook routes. Complete each platform's connector setup and supply the environment variables listed in `.env.example`. Follow the [quickstart](/docs/chat-sdk/quickstart) for a complete Slack example.

## Use Vercel Connect

For supported adapters, [Vercel Connect](/docs/connect/frameworks/chat-sdk) supplies provider credentials at runtime. Trigger-capable connectors also verify provider events and forward them to a deployed webhook route.

Connect support varies by adapter. In particular, Notion and Telegram use Connect for outbound credentials while retaining their native inbound verification. See the [Connect capability table](/docs/connect/frameworks/chat-sdk#check-platform-capabilities) before configuring a new platform.

## Next steps

- [Create and deploy a Slack bot](/docs/chat-sdk/quickstart)
- [Route Chat SDK messages to an eve agent](/docs/chat-sdk/eve)
- [Browse all adapters](https://chat-sdk.dev/adapters)
- [Build your own adapter](https://chat-sdk.dev/docs/contributing/building)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
