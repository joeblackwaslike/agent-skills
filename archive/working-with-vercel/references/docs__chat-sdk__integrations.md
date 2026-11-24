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
  - /docs/chat-sdk/integrations/passport
summary: Extend a Chat SDK bot with AI Gateway, Vercel Connect, Vercel Passport, Vercel Sandbox, Vercel Workflows, and Vercel Daemons.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/chat-sdk/integrations.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f54e826a5dadf2dc77765a3490dc4dd1d3e55839cac16e3dd6e3757bd9106d8f"
---

# Chat SDK Integrations

Extend your [Chat SDK](/docs/chat-sdk) bot with model responses, managed credentials, verified user identities, isolated code execution, durable tasks, and background workers. Start with a working bot from the [quickstart](/docs/chat-sdk/quickstart), then choose the integration for your task.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Chat SDK with Vercel Connect](https://vercel.com/docs/connect/frameworks/chat-sdk) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub
- [Vercel Integrations](https://vercel.com/docs/integrations) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte

Full cross-link map for this page: [/docs/chat-sdk/integrations.graph.md](/docs/chat-sdk/integrations.graph.md)
<!-- /docsgraph:related -->

## Choose an integration

| Integration | Use it to | Example |
| --- | --- | --- |
| [AI Gateway](/docs/chat-sdk/integrations/ai-gateway) | Generate and stream model responses through one endpoint. | Answer questions using conversation history. |
| [Vercel Connect](/docs/chat-sdk/integrations/connect) | Resolve platform credentials and receive verified events. | Connect a Slack bot without managing its token. |
| [Vercel Passport](/docs/chat-sdk/integrations/passport) | Key per-user history by a verified Passport identity. | Recall a signed-in browser user's earlier conversations. |
| [Vercel Sandbox](/docs/chat-sdk/integrations/sandbox) | Run model-generated commands in an isolated environment. | Analyze an attached CSV with the AI SDK Bash tool. |
| [Vercel Workflows](/docs/chat-sdk/integrations/workflows) | Pause durable tasks until someone makes a decision. | Approve or deny an announcement from a Slack card. |
| [Vercel Daemons](/docs/chat-sdk/integrations/daemons) | Continuously process queued chat jobs. | Process a request in a worker and reply to its Slack thread. |

To reply with tables, charts, and buttons that the model composes, see [Stream generative UI with json-render](/docs/chat-sdk/integrations/ai-gateway#stream-generative-ui-with-json-render).

## Combine integrations in one bot

Each integration has a separate role. Connect delivers a Slack event to your bot. AI Gateway serves the model that decides how to respond. The model can use a Bash tool backed by Sandbox to inspect a file, and Vercel Workflows can wait for approval before publishing a result.

Keep a persistent [state adapter](/docs/chat-sdk/adapters#state-adapters) for subscriptions and event coordination. Vercel Workflows manages durable execution separately from Chat SDK state.

## Next steps

- [Add Chat SDK to your framework](/docs/chat-sdk/frameworks)
- [Use an eve agent with Chat SDK](/docs/chat-sdk/eve)
- [Explore Chat SDK AI utilities](https://chat-sdk.dev/docs/ai)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
