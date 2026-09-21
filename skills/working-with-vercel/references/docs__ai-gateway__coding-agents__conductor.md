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
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "f42dea2b08bcc8d7fbea97247f4e45651e88be2e730c14d35706c08c7d899f20"
---

# Conductor with AI Gateway

AI Gateway provides [Anthropic-compatible API endpoints](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) so you can use [Conductor](https://conductor.build) through a unified gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway support for Claude Code](https://vercel.com/changelog/ai-gateway-support-for-claude-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related)
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Claude Code and Claude Agent SDK with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/claude-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Connect Claude Code to AI Gateway with one CLI command, or configure it manually.
- [Superset with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/superset?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Configure Superset to use AI Gateway with terminal-based coding agents. Set provider credentials and route model request
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/conductor.graph.md](/docs/ai-gateway/coding-agents/conductor.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=graph)
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
