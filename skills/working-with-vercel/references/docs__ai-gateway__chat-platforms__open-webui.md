---
title: Open WebUI
product: vercel
url: /docs/ai-gateway/chat-platforms/open-webui
canonical_url: "https://vercel.com/docs/ai-gateway/chat-platforms/open-webui"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/chat-platforms
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Open WebUI with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/chat-platforms/open-webui.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "78f9ac00accdaa72bcf13bedd16964f54d9f7c780502bdc69a370af6f61779bd"
---

# Open WebUI

[Open WebUI](https://github.com/open-webui/open-webui) is a self-hosted web interface for interacting with LLMs. You can configure it to use AI Gateway for unified model access, spend monitoring, and access to hundreds of models from multiple providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related) — Use LibreChat with the AI Gateway.
- [OpenClaw \(Clawdbot\)](https://vercel.com/docs/ai-gateway/chat-platforms/openclaw?from=related) — Use OpenClaw \(formerly Clawdbot\) with AI Gateway.
- [Observability and Spend](https://vercel.com/docs/ai-gateway/observability-and-spend?from=related) — Monitor AI Gateway requests and manage spend: observability, custom reporting, usage and billing APIs, and spending budg

Full cross-link map for this page: [/docs/ai-gateway/chat-platforms/open-webui.graph.md](/docs/ai-gateway/chat-platforms/open-webui.graph.md)
<!-- /docsgraph:related -->

## Configuring Open WebUI

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Install Open WebUI
  If you haven't already installed Open WebUI, follow the [Open WebUI installation guide](https://docs.openwebui.com/getting-started/quick-start). You can deploy it using Docker, Python, or other methods.

- ### Configure AI Gateway
  Open WebUI integrates with AI Gateway through a custom function. Choose one of the following methods:
  #### One-Click Install
  1. Visit [Vercel AI Gateway Integration](https://openwebui.com/posts/vercel_ai_gateway_integration_52b4c475)
  2. Click **Get** to install the function to your running Open WebUI instance
  3. Click **Save** to finish installing
  4. Click the settings icon next to the function to enter your **AI Gateway API key**
  #### Manual Install
  1. Navigate to **Profile Icon** > **Settings** > **Admin Settings** > **Functions**
  2. Click **New Function**
  3. Copy and paste the following function code:
  4) Click the settings icon next to the function to enter your **AI Gateway API key**
  5) ```
     ```
  > **💡 Note:** The function handles authentication and request routing to AI Gateway automatically.

- ### Start using models
  Select a model from the AI Gateway catalog in the Open WebUI interface. Your requests will now be routed through AI Gateway.

  You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
