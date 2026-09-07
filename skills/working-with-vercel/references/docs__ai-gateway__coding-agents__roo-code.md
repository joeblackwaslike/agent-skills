---
title: Roo Code
product: vercel
url: /docs/ai-gateway/coding-agents/roo-code
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/roo-code"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Roo Code with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/roo-code.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "36e5dcce86cc85f2e97bcc4ba31991531ddaa28fada3b551703f22ba6f31e67d"
---

# Roo Code

[Roo Code](https://roocode.com) is a VS Code extension that brings AI coding assistance directly into your editor. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Froo-code&source_site=vercel-docs&relationship=related)
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Froo-code&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Froo-code&source_site=vercel-docs&relationship=related) — Use the Kilo Code CLI with the AI Gateway as an OpenAI-compatible provider.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Froo-code&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Froo-code&source_site=vercel-docs&relationship=related) — Use the Blackbox AI CLI with the AI Gateway.
- [Cline](https://vercel.com/docs/ai-gateway/coding-agents/cline?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Froo-code&source_site=vercel-docs&relationship=related) — Use Cline with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/roo-code.graph.md](/docs/ai-gateway/coding-agents/roo-code.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Froo-code&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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
  > **💡 Note:** Roo Code automatically updates to include the models available on AI Gateway. Browse the full catalog on the [models page](/ai-gateway/models).

- ### Start coding
  Your requests will now be routed through AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.
  > **💡 Note:** Prompt caching is supported for Claude and GPT models, which can reduce costs by reusing previously processed prompts.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
