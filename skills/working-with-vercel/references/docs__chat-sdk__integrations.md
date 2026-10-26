---
title: Chat SDK Integrations
product: vercel
url: /docs/chat-sdk/integrations
canonical_url: "https://vercel.com/docs/chat-sdk/integrations"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/chat-sdk
related:
  - /docs/chat-sdk
  - /docs/chat-sdk/quickstart
  - /docs/chat-sdk/integrations/ai-gateway
  - /docs/chat-sdk/integrations/connect
  - /docs/chat-sdk/integrations/sandbox
summary: Extend a Chat SDK bot with AI Gateway, Vercel Connect, Vercel Sandbox, and Vercel Workflows.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/integrations.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ee170088cf57b80e6af6507b30cbc511089a7c32eb9a487c8a6bc1c0b70b16bc"
---

# Chat SDK Integrations

Extend your [Chat SDK](/docs/chat-sdk) bot with model responses, managed credentials, isolated code execution, and durable tasks. Start with a working bot from the [quickstart](/docs/chat-sdk/quickstart), then choose the integration for your task.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.

Full cross-link map for this page: [/docs/chat-sdk/integrations.graph.md](/docs/chat-sdk/integrations.graph.md)
<!-- /docsgraph:related -->

## Choose an integration

| Integration | Use it to | Example |
| --- | --- | --- |
| [AI Gateway](/docs/chat-sdk/integrations/ai-gateway) | Generate and stream model responses through one endpoint. | Answer questions using conversation history. |
| [Vercel Connect](/docs/chat-sdk/integrations/connect) | Resolve platform credentials and receive verified events. | Connect a Slack bot without managing its token. |
| [Vercel Sandbox](/docs/chat-sdk/integrations/sandbox) | Run model-generated commands in an isolated environment. | Analyze an attached CSV with the AI SDK Bash tool. |
| [Vercel Workflows](/docs/chat-sdk/integrations/workflows) | Pause durable tasks until someone makes a decision. | Approve or deny an announcement from a Slack card. |

## Combine integrations in one bot

Each integration has a separate role. Connect delivers a Slack event to your bot. AI Gateway serves the model that decides how to respond. The model can use a Bash tool backed by Sandbox to inspect a file, and Vercel Workflows can wait for approval before publishing a result.

Keep a persistent [state adapter](/docs/chat-sdk/adapters#state-adapters) for subscriptions and event coordination. Vercel Workflows manages durable execution separately from Chat SDK state.

## Next steps

- [Add Chat SDK to your framework](/docs/chat-sdk/frameworks)
- [Use an eve agent with Chat SDK](/docs/chat-sdk/eve)
- [Explore Chat SDK AI utilities](https://chat-sdk.dev/docs/ai)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
