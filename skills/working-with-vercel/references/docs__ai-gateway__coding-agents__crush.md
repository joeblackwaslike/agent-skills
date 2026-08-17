---
title: Crush
product: vercel
url: /docs/ai-gateway/coding-agents/crush
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/crush"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Crush with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/crush.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1566f21a57bdb213d18e1246c472b3b89ec82490d1ec2acd2eb412ea7ed86ed4"
---

# Crush

[Crush](https://github.com/charmbracelet/crush) is a terminal-based AI coding assistant by Charmbracelet. It supports multiple LLM providers, LSP integration, MCP servers, and session-based context management. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenClaw \(Clawdbot\)](https://vercel.com/docs/ai-gateway/chat-platforms/openclaw?from=related) — Use OpenClaw \(formerly Clawdbot\) with AI Gateway.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related) — Use the Blackbox AI CLI with the AI Gateway.
- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related) — Use LibreChat with the AI Gateway.
- [Cline](https://vercel.com/docs/ai-gateway/coding-agents/cline?from=related) — Use Cline with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/crush.graph.md](/docs/ai-gateway/coding-agents/crush.graph.md)
<!-- /docsgraph:related -->

## Configuring Crush

- ### Create an API Key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API Keys** to create a new API Key.

- ### Install Crush
  Choose your preferred installation method:
  #### Homebrew
  ```bash filename="Terminal"
  brew install charmbracelet/tap/crush
  ```
  #### npm
  ```bash filename="Terminal"
  npm install -g @charmland/crush
  ```
  #### Go
  ```bash filename="Terminal"
  go install github.com/charmbracelet/crush@latest
  ```
  See the [Crush installation guide](https://github.com/charmbracelet/crush#installation) for additional installation options including Windows, Debian/Ubuntu, and Fedora/RHEL.

- ### Configure AI Gateway
  Start Crush:
  ```bash filename="Terminal"
  crush
  ```
  When prompted:
  1. **Select Provider**: Choose **Vercel AI Gateway**
  2. **Select Model**: Pick from AI Gateway's model library
  3. **Enter API Key**: Paste your AI Gateway API Key when prompted
  Crush saves your API Key to `~/.local/share/crush/crush.json`, so you only need to enter it once.

  Your requests will now be routed through AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
