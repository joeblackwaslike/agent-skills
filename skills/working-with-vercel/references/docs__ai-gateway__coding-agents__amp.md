---
title: Amp with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/amp
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/amp"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/observability-and-spend/logs
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/budgets
summary: "Connect Amp to AI Gateway through Amp's Model Routing settings. Add an AI Gateway API key, choose models for Amp's modes, and monitor requests."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/amp.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "7ae10b1536ecbc6e2c2f8da87e09036d39f442238f9506c7c8b0b6aa90192793"
---

# Amp with AI Gateway

[Amp](https://ampcode.com) is a coding agent and development environment. Connect Amp to AI Gateway through Amp's Model Routing settings to use your AI Gateway API key for supported models.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Aider with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/aider) — Connect Aider to AI Gateway with the Vercel CLI or an OpenAI-compatible base URL, API key, and model metadata.
- [Blackbox AI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/blackbox) — Configure the Blackbox AI CLI to use AI Gateway for code generation and debugging. Set your API key and model and monito

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/amp.graph.md](/docs/ai-gateway/coding-agents/amp.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Vercel AI Gateway is currently available in Amp as early access for Megawatt
> and Gigawatt members. Enable **More AI Routers & Subscriptions** before
> configuring the provider. See [Amp's early-access
> announcement](https://ampcode.com/news/free-agent) for availability details.

Amp requires manual configuration. The [Vercel CLI setup command](/docs/cli/ai-gateway#setup) does not configure Amp.

## Prerequisites

- An Amp Megawatt or Gigawatt membership while the integration is in early access
- An [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys)

## Configure Amp

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Enable AI routers in Amp
  Sign in to Amp and open [**More AI Routers & Subscriptions**](https://ampcode.com/settings/experimental-features#ai-routers) in Experimental Features. Enable the feature for your Amp account.

- ### Connect Vercel AI Gateway
  Open [**Model Routing**](https://ampcode.com/settings/model-routing) in your personal or workspace settings. Select **Vercel AI Gateway**, then follow Amp's prompts to connect your AI Gateway API key.

- ### Choose a model and verify the connection
  Open [**Mode Dial**](https://ampcode.com/settings/dial) and choose a model from the Vercel AI Gateway connection for the Amp roles you want to route. Amp lets you configure the main agent, Oracle, and subagents independently.

  Send a prompt in Amp, then check [AI Gateway logs](/docs/ai-gateway/observability-and-spend/logs) for the request.

## Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Next steps

- Read [Amp's Modes and Models documentation](https://ampcode.com/docs/models-and-subagents)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) for your AI Gateway API key
- Review [AI Gateway provider and model support](/docs/ai-gateway/models-and-providers)


---

[View full sitemap](/docs/sitemap)
