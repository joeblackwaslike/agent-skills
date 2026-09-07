---
title: Superset
product: vercel
url: /docs/ai-gateway/coding-agents/superset
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/superset"
last_updated: 2026-08-12
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Superset with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/superset.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "a1e85422800d770effbf428af05c5cd3094e62638e275d4d732d1ce2990bc516"
---

# Superset

[Superset](https://superset.sh) is a terminal-first AI coding agent that works with CLI agents like Claude Code, Codex, and Cursor Agents. Here's how to use Superset with Vercel AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fsuperset&source_site=vercel-docs&relationship=related)
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fsuperset&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fsuperset&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fsuperset&source_site=vercel-docs&relationship=related) — Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was r
- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fsuperset&source_site=vercel-docs&relationship=related) — Use LibreChat with the AI Gateway.
- [Claude Code and Claude Agent SDK](https://vercel.com/docs/ai-gateway/coding-agents/claude-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fsuperset&source_site=vercel-docs&relationship=related) — Connect Claude Code to AI Gateway with one CLI command, or configure it manually.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/superset.graph.md](/docs/ai-gateway/coding-agents/superset.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fsuperset&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Terminal configuration

- ### Download Superset
  Download and install Superset by following the [installation guide](https://docs.superset.sh/overview). If you already have Superset installed, continue to the next step.

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Configure environment variables
  Terminal-based agents in Superset work automatically when you configure your environment. Add the following to your shell configuration file, for example in `~/.zshrc` or `~/.bashrc`:
  ```bash
  export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/coding-agent"
  export ANTHROPIC_AUTH_TOKEN="your-ai-gateway-api-key"
  export ANTHROPIC_API_KEY=""
  ```
  `/coding-agent` is the [coding agent surface](/docs/cli/ai-gateway#the-coding-agent-surface), the default for agents without a dedicated endpoint. It carries no `/v1` because the Anthropic client appends `/v1/messages` itself.
  > **💡 Note:** Setting `ANTHROPIC_API_KEY` to an empty string is important. This prevents
  > direct Anthropic authentication and ensures requests route through AI Gateway.

- ### Restart your terminal session
  Open a new terminal window or run `source ~/.zshrc` or `source ~/.bashrc` to apply the changes.

  Your terminal-based Superset agents now route requests through Vercel AI Gateway.

## Chat UI configuration

For the Superset Chat UI, configure AI Gateway through the settings panel:

- ### Download Superset
  Download and install Superset by following the [installation guide](https://docs.superset.sh/overview).

- ### Open Superset
  Open the Superset app.

- ### Open the model picker
  Open the model picker at the bottom of the chat interface.

- ### Open provider settings
  Click the **key icon** next to **Anthropic**, then select **Use API key**.

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add environment variables
  Enter the following environment variables (one per line, `VAR_NAME=value` format):
  ```bash
  ANTHROPIC_BASE_URL=https://ai-gateway.vercel.sh/coding-agent
  ANTHROPIC_AUTH_TOKEN=your-ai-gateway-api-key
  ANTHROPIC_API_KEY=
  ```

- ### Save settings
  Click **Save settings** to apply your configuration.

  Your Superset requests now route through Vercel AI Gateway.

## Workspace-specific configuration

You can also set environment variables per workspace through **Settings > Env** in Superset. This is useful when you need different configurations for different projects.

## Monitoring usage

Once configured, view your usage in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section of the Vercel dashboard:

- **Spend tracking**: See costs across all your Superset sessions
- **Model usage**: Track which models your agents use
- **Request traces**: Debug issues with full request and response logs

See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
