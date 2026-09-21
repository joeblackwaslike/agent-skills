---
title: Crush with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/crush
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/crush"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
summary: Configure the Crush terminal coding agent with AI Gateway. Set up provider credentials and models and monitor request usage and spending.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/crush.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "149155f809f26ccc833e763e27902e7c0d74cad374c015567e5caed772059b7f"
---

# Crush with AI Gateway

[Crush](https://github.com/charmbracelet/crush) is a terminal-based AI coding agent by Charmbracelet. It supports multiple LLM providers, LSP integration, MCP servers, and session-based context management. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcrush&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [Cline with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/cline?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcrush&source_site=vercel-docs&relationship=related) — Connect Cline to AI Gateway through the Vercel CLI or VS Code settings. Configure model access and monitor usage and spe
- [Chatbox with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/chatbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcrush&source_site=vercel-docs&relationship=related) — Connect Chatbox to AI Gateway. Configure your API key, endpoint, and models to use multiple AI providers and monitor cha
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcrush&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Blackbox AI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcrush&source_site=vercel-docs&relationship=related) — Configure the Blackbox AI CLI to use AI Gateway for code generation and debugging. Set your API key and model and monito

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/crush.graph.md](/docs/ai-gateway/coding-agents/crush.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcrush&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Crush:

```bash filename="terminal"
npx vercel ai-gateway setup --agent crush
```

The command provisions or reuses a key and adds a native `vercel` provider to `~/.config/crush/crush.json`.

## Configuring Crush

If you can't use the Vercel CLI, configure Crush manually:

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

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
