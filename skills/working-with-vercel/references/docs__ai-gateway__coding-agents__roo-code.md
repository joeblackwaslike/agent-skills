---
title: Roo Code
product: vercel
url: /docs/ai-gateway/coding-agents/roo-code
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/roo-code"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Roo Code with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/roo-code.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "0af3818ea47a8f2eea5cd160f40cdacc6f2b46ee8b203a211da8fc4a24e27755"
---

# Roo Code

[Roo Code](https://roocode.com) is a VS Code extension that brings AI coding assistance directly into your editor. You can configure it to use AI Gateway for unified model access and spend monitoring.

## Configuring Roo Code

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Install Roo Code
  Install the [Roo Code extension](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline) from the VS Code marketplace.

- ### Open Roo Code settings
  Click the gear icon in the Roo Code panel to open the settings.

- ### Configure AI Gateway
  In the Roo Code settings panel, configure the connection:
  1. Select **Vercel AI Gateway** as your API Provider
  2. Paste your AI Gateway API Key
  3. Choose a model from the available models
  > **💡 Note:** Roo Code automatically updates to include the models available on AI Gateway. Browse the full catalog on the [models page](https://vercel.com/ai-gateway/models).

- ### Start coding
  Your requests will now be routed through AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.
  > **💡 Note:** Prompt caching is supported for Claude and GPT models, which can reduce costs by reusing previously processed prompts.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
