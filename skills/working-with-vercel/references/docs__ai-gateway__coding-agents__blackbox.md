---
title: Blackbox AI with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/blackbox
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/blackbox"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Configure the Blackbox AI CLI to use AI Gateway for code generation and debugging. Set your API key and model and monitor request usage and spending.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/blackbox.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "2a7fbe3d955f5bc99f45934eac9569ababc1ec41add01e92723a764b19e662bc"
---

# Blackbox AI with AI Gateway

You can use the [Blackbox AI](https://blackbox.ai) CLI for AI-powered code generation, debugging, and project automation. Configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Chatbox with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/chatbox) — Connect Chatbox to AI Gateway. Configure your API key, endpoint, and models to use multiple AI providers and monitor cha
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/blackbox.graph.md](/docs/ai-gateway/coding-agents/blackbox.graph.md)
<!-- /docsgraph:related -->

## Configuring Blackbox AI

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Install Blackbox CLI
  Install the Blackbox CLI for your platform:
  #### macOS/Linux
  ```bash filename="Terminal"
  curl -fsSL https://blackbox.ai/install.sh | bash
  ```
  #### Windows
  ```bash filename="PowerShell"
  Invoke-WebRequest -Uri "https://blackbox.ai/install.ps1" -OutFile "install.ps1"; .\install.ps1
  ```

- ### Configure Blackbox CLI
  Run the configure command to set up AI Gateway:
  ```bash filename="Terminal"
  blackbox configure
  ```
  When prompted:
  1. **Select Configuration**: Choose **Configure Providers**
  2. **Choose Model Provider**: Select **Vercel AI Gateway**
  3. **Enter API Key**: Paste your AI Gateway API key from the previous step
  > **💡 Note:** You can run `blackbox configure` at any time to update your configuration.

- ### Start Blackbox CLI
  Run the CLI to start using it:
  ```bash filename="Terminal"
  blackbox
  ```
  Your requests will now be routed through AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
