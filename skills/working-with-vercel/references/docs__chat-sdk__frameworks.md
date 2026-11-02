---
title: Chat SDK Frameworks
product: vercel
url: /docs/chat-sdk/frameworks
canonical_url: "https://vercel.com/docs/chat-sdk/frameworks"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/chat-sdk
related:
  - /docs/connect/frameworks/chat-sdk
  - /docs/chat-sdk/frameworks/nextjs
  - /docs/chat-sdk/frameworks/nuxt
  - /docs/chat-sdk/frameworks/hono
  - /docs/chat-sdk/frameworks/nitro
summary: Use Chat SDK with Next.js, Nuxt, Hono, Nitro, or TanStack Start on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/frameworks.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "28decb5d9f42760451219786ea92aa65c0da12e6efc31787a0a8a7adbbf9806e"
---

# Chat SDK Frameworks

Chat SDK works with frameworks that handle standard Web `Request` and `Response` objects. Your framework receives the webhook, passes it to a Chat SDK adapter, and keeps the function running while your bot processes the event.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [Chat SDK Integrations](https://vercel.com/docs/chat-sdk/integrations) — Extend a Chat SDK bot with AI Gateway, Vercel Connect, Vercel Passport, Vercel Sandbox, Vercel Workflows, and Vercel Dae
- [Chat SDK with Vercel Connect](https://vercel.com/docs/chat-sdk/integrations/connect) — Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.
- [Frameworks and Adapters for Vercel Connect](https://vercel.com/docs/connect/frameworks) — Use Vercel Connect with AI SDK, TanStack AI, MCP clients, eve, Chat SDK, Better Auth, and Auth.js.

Full cross-link map for this page: [/docs/chat-sdk/frameworks.graph.md](/docs/chat-sdk/frameworks.graph.md)
<!-- /docsgraph:related -->

## Choose your framework

Each guide uses a Slack bot with Redis state and [Vercel Connect](/docs/connect/frameworks/chat-sdk) for credentials and webhook delivery.

| Framework | Webhook route | Background processing |
| --- | --- | --- |
| [Next.js](/docs/chat-sdk/frameworks/nextjs) | App Router Route Handler | `after` from `next/server` |
| [Nuxt](/docs/chat-sdk/frameworks/nuxt) | Nuxt 4 server API route | `waitUntil` from `@vercel/functions` |
| [Hono](/docs/chat-sdk/frameworks/hono) | Hono POST handler | `waitUntil` from `@vercel/functions` |
| [Nitro](/docs/chat-sdk/frameworks/nitro) | Nitro 3 filesystem route | `event.waitUntil` |
| [TanStack Start](/docs/chat-sdk/frameworks/tanstack-start) | React server route | `waitUntil` from `@vercel/functions` |

For a new Next.js bot, follow the [quickstart](/docs/chat-sdk/quickstart) to scaffold it with `create-chat-sdk`. The other guides show how to add Chat SDK to an existing framework project.

## Share bot behavior across frameworks

Define your `Chat` instance and event handlers in a server-only module. The framework route passes incoming requests to `bot.webhooks.slack`; Chat SDK handles verification, event parsing, and dispatching to your handlers. Keep the request body unread until it reaches the adapter.

Use a [persistent state adapter](/docs/chat-sdk/adapters#state-adapters) to share subscriptions and locks across function instances. Keep bot credentials and database connections on the server.

## Process events after responding

Pass your framework's background-task function as the webhook handler's `waitUntil` option. This lets the adapter acknowledge the webhook while your event handlers continue running.

Background work is still subject to the function's [maximum duration](/docs/functions/configuring-functions/duration). Use [Workflows](/docs/workflows) for tasks that need durable execution or must wait for an external event.

## Next steps

- [Choose platform and state adapters](/docs/chat-sdk/adapters)
- [Connect an eve agent](/docs/chat-sdk/eve)
- [Read the Chat SDK webhook API](https://chat-sdk.dev/docs/usage#webhook-routing)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
