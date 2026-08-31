---
title: Conductor
product: vercel
url: /docs/ai-gateway/coding-agents/conductor
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/conductor"
last_updated: 2026-08-12
type: integration
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/cli/ai-gateway
summary: Use Conductor with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/conductor.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "390c3d2b46d14d2548a2ab30f729b3daf9d6cd976cd6e5ffe88910eebb270f1a"
---

# Conductor

AI Gateway provides [Anthropic-compatible API endpoints](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) so you can use [Conductor](https://conductor.build) through a unified gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway support for Claude Code](https://vercel.com/changelog/ai-gateway-support-for-claude-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related)
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Use OpenCode with the AI Gateway.
- [Claude Code and Claude Agent SDK](https://vercel.com/docs/ai-gateway/coding-agents/claude-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Use Claude Code and the Claude Agent SDK with AI Gateway.
- [Cline](https://vercel.com/docs/ai-gateway/coding-agents/cline?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Use Cline with the AI Gateway.
- [Superset](https://vercel.com/docs/ai-gateway/coding-agents/superset?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Use Superset with the AI Gateway.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fconductor&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.

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
