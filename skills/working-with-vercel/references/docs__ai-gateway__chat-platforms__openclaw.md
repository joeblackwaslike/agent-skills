---
title: OpenClaw (Clawdbot)
product: vercel
url: /docs/ai-gateway/chat-platforms/openclaw
canonical_url: "https://vercel.com/docs/ai-gateway/chat-platforms/openclaw"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/chat-platforms
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use OpenClaw (formerly Clawdbot) with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/chat-platforms/openclaw.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "d5a208f941b398f8ccbd787b04039be3b55b45cfbac6672f7e5857566c8bb376"
---

# OpenClaw (Clawdbot)

[OpenClaw (Clawdbot)](https://openclaw.ai) is a personal AI assistant that runs on your computer and connects to messaging platforms like WhatsApp, Telegram, Discord, and more. OpenClaw (Clawdbot) features a skills platform that teaches it new capabilities, browser control, persistent memory, and multi-agent support. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Use AI Gateway with Clawdbot](https://vercel.com/changelog/use-ai-gateway-with-clawdbot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=related)
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use OpenClaw with the AI Gateway as a model provider.
- [Running OpenClaw in Vercel Sandbox](https://vercel.com/kb/guide/running-openclaw-in-vercel-sandbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=related) — This guide walks you through setting up OpenClaw inside a Vercel Sandbox and configuring the WhatsApp channel.
- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use LibreChat with the AI Gateway.
- [Chatbox](https://vercel.com/docs/ai-gateway/chat-platforms/chatbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use Chatbox with the AI Gateway.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use the Blackbox AI CLI with the AI Gateway.
- [Cline](https://vercel.com/docs/ai-gateway/coding-agents/cline?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use Cline with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/chat-platforms/openclaw.graph.md](/docs/ai-gateway/chat-platforms/openclaw.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopenclaw&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Configuring OpenClaw (Clawdbot)

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Install OpenClaw (Clawdbot)
  Choose your preferred installation method:
  #### Quick Install
  **macOS/Linux:**
  ```bash filename="Terminal"
  curl -fsSL https://clawd.bot/install.sh | bash
  ```
  **Windows (PowerShell):**
  ```bash filename="PowerShell"
  iwr -useb https://clawd.bot/install.ps1 | iex
  ```
  #### npm/pnpm
  ```bash filename="Terminal"
  npm install -g clawdbot@latest
  ```
  Or with pnpm:
  ```bash filename="Terminal"
  pnpm add -g clawdbot@latest
  ```
  > **💡 Note:** Requires Node.js 22 or later.

- ### Run onboarding wizard
  Start the interactive setup:
  ```bash filename="Terminal"
  clawdbot onboard --install-daemon
  ```

- ### Configure AI Gateway
  During the onboarding wizard:
  1. **Model/Auth Provider**: Select **Vercel AI Gateway**
  2. **Authentication Method**: Choose **Vercel AI Gateway API key**
  3. **Enter API key**: Paste your AI Gateway API key
  4. **Select Model**: Choose from available models
  5. **Additional Configuration**: Complete remaining setup options (communication channels, daemon installation, etc.)
  > **💡 Note:** Models follow the `creator/model-name` format. Check the [models catalog](/ai-gateway/models) for available options.

- ### Verify installation
  Check that OpenClaw (Clawdbot) is configured correctly:
  ```bash filename="Terminal"
  clawdbot health
  clawdbot status
  ```
  Your requests will now be routed through AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
