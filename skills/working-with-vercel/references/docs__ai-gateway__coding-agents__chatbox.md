---
title: Chatbox with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/chatbox
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/chatbox"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Connect Chatbox to AI Gateway. Configure your API key, endpoint, and models to use multiple AI providers and monitor chat spending in one place.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/chatbox.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "8fc7c2ee97272d4b934ced76db238413b8747a615bb30b6ac72aa022a10863b0"
---

# Chatbox with AI Gateway

[Chatbox](https://chatboxai.app) is a cross-platform desktop AI assistant. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fchatbox&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Blackbox AI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fchatbox&source_site=vercel-docs&relationship=related) — Configure the Blackbox AI CLI to use AI Gateway for code generation and debugging. Set your API key and model and monito
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fchatbox&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fchatbox&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fchatbox&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Roo Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/roo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fchatbox&source_site=vercel-docs&relationship=related) — Connect the Roo Code VS Code extension to AI Gateway. Configure your API key and models to access multiple providers and

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/chatbox.graph.md](/docs/ai-gateway/coding-agents/chatbox.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fchatbox&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Configuring Chatbox

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Install Chatbox
  Download and install [Chatbox](https://chatboxai.app) for your platform (macOS, Windows, or Linux).

- ### Configure AI Gateway
  1. Go to **Settings**, then **Model Provider**
  2. Click **Add** and add **AI Gateway** with the **OpenAI API Compatible** option
  3. Set the **API Host** to `https://ai-gateway.vercel.sh/v1`, and leave the **API Path** field empty
  4. Add your AI Gateway API Key in the **API Key** field
  5. (Optional) Click **Check** next to the API Key field to validate your connection
  6. Click **Fetch** to retrieve all available models from AI Gateway
  7. Select models from the populated list

- ### Start using models
  Your requests will now be routed through AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
