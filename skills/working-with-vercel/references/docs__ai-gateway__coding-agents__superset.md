---
title: Superset
product: vercel
url: /docs/ai-gateway/coding-agents/superset
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/superset"
last_updated: 2026-06-20
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "53aef682883b8193459896c4e740e62e10dca83b1c9d93df43e9cae7d767b5b8"
---

# Superset

[Superset](https://superset.sh) is a terminal-first AI coding agent that works with CLI agents like Claude Code, Codex, and Cursor Agents. Here's how to use Superset with Vercel AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related) — Use LibreChat with the AI Gateway.
- [Claude Code](https://vercel.com/docs/ai-gateway/coding-agents/claude-code?from=related) — Use Claude Code and the Claude Agent SDK with AI Gateway.
- [SDKs & APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related) — Use the AI Gateway with various SDKs and API specifications including OpenAI, Anthropic, and OpenResponses.
- [Conductor](https://vercel.com/docs/ai-gateway/coding-agents/conductor?from=related) — Use Conductor with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/superset.graph.md](/docs/ai-gateway/coding-agents/superset.graph.md)
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
