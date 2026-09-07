---
title: Blackbox AI
product: vercel
url: /docs/ai-gateway/coding-agents/blackbox
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/blackbox"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use the Blackbox AI CLI with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/blackbox.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "69dde4d54c5ed0e89ae577b09c2a765b2e9fd543d06b9edc9423f3491bd50cc7"
---

# Blackbox AI

You can use the [Blackbox AI](https://blackbox.ai) CLI for AI-powered code generation, debugging, and project automation. Configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Chatbox](https://vercel.com/docs/ai-gateway/chat-platforms/chatbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fblackbox&source_site=vercel-docs&relationship=related) — Use Chatbox with the AI Gateway.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fblackbox&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [OpenClaw \\(Clawdbot\\)](https://vercel.com/docs/ai-gateway/chat-platforms/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fblackbox&source_site=vercel-docs&relationship=related) — Use OpenClaw \\(formerly Clawdbot\\) with AI Gateway.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fblackbox&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fblackbox&source_site=vercel-docs&relationship=related) — Use OpenClaw with the AI Gateway as a model provider.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/blackbox.graph.md](/docs/ai-gateway/coding-agents/blackbox.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fblackbox&source_site=vercel-docs&relationship=graph)
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

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
