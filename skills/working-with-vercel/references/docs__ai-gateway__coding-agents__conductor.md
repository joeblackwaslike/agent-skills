---
title: Conductor with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/conductor
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/conductor"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/cli/ai-gateway
summary: Connect Conductor to AI Gateway through its Claude Code configuration. Route parallel coding agents through the Anthropic-compatible endpoint.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/conductor.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "11eb98f14c92d209bf2d1c4f391172586a63a07646bf7fb8ada43a91ab91e85d"
---

# Conductor with AI Gateway

AI Gateway provides [Anthropic-compatible API endpoints](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) so you can use [Conductor](https://conductor.build) through a unified gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Claude Code and Claude Agent SDK with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/claude-code) — Connect Claude Code to AI Gateway with one CLI command, or configure it manually.
- [Superset with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/superset) — Configure Superset to use AI Gateway with terminal-based coding agents. Set provider credentials and route model request
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/conductor.graph.md](/docs/ai-gateway/coding-agents/conductor.graph.md)
<!-- /docsgraph:related -->

[Conductor](https://conductor.build) is a Mac app that lets you run multiple Claude Code agents in parallel, each with an isolated copy of your codebase. You can see what each agent is working on, then review and merge their changes in one place.

## Configuring Conductor

Conductor runs using your local Claude Code login. You can check your auth status by running `claude /login` in your terminal.

Conductor also supports running Claude Code on OpenRouter, AWS Bedrock, Google Vertex AI, Vercel AI Gateway, or any Anthropic API compatible provider. You can configure it to use Vercel AI Gateway, enabling you to:

- Monitor traffic and token usage in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Configure environment variables
  In Conductor, go to **Settings** -> **Env** to set environment variables. Add the following under **Claude Code**:
  ```bash
  ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/coding-agent"
  ANTHROPIC_AUTH_TOKEN="your-vercel-ai-gateway-api-key"
  ANTHROPIC_API_KEY=""
  ```
  `/coding-agent` is the [coding agent surface](/docs/cli/ai-gateway#the-coding-agent-surface), the default for agents without a dedicated endpoint. It carries no `/v1` because Claude Code appends `/v1/messages` itself.
  > **💡 Note:** Setting `ANTHROPIC_API_KEY` to an empty string is required. This prevents
  > Claude Code from attempting to authenticate with Anthropic directly.
  Check out the [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code) for a full list of environment variables.

- ### Start using Conductor
  Your requests will now be routed through Vercel AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
