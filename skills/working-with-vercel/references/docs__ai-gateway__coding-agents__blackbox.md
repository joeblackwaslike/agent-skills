---
title: Blackbox AI
product: vercel
url: /docs/ai-gateway/coding-agents/blackbox
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/blackbox"
last_updated: 2026-04-29
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/capabilities/observability
summary: Use the Blackbox AI CLI with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/blackbox.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "295fc82c9df556192707682f7100e5673a80ff47349a6f505831990f2c68afee"
---

# Blackbox AI

You can use the [Blackbox AI](https://blackbox.ai) CLI for AI-powered code generation, debugging, and project automation. Configure it to use AI Gateway for unified model access and spend monitoring.

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
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/capabilities/observability) for more details.


---

[View full sitemap](/docs/sitemap)
