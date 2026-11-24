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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/crush.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "36597d4d63fe95b64f7058274f3df61e61541cb19bf242fc59ce750e428cab1c"
---

# Crush with AI Gateway

[Crush](https://github.com/charmbracelet/crush) is a terminal-based AI coding agent by Charmbracelet. It supports multiple LLM providers, LSP integration, MCP servers, and session-based context management. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [Cline with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/cline) — Connect Cline to AI Gateway through the Vercel CLI or VS Code settings. Configure model access and monitor usage and spe
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Chatbox with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/chatbox) — Connect Chatbox to AI Gateway. Configure your API key, endpoint, and models to use multiple AI providers and monitor cha

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/crush.graph.md](/docs/ai-gateway/coding-agents/crush.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Crush:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent crush
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
