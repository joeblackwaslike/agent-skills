---
title: Chatbox
product: vercel
url: /docs/ai-gateway/chat-platforms/chatbox
canonical_url: "https://vercel.com/docs/ai-gateway/chat-platforms/chatbox"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/chat-platforms
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Chatbox with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/chat-platforms/chatbox.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7999b3ca2c08981f0782f7440def3e8e8abebb72b292e4f33f8ed7d6366681be"
---

# Chatbox

[Chatbox](https://chatboxai.app) is a cross-platform desktop AI assistant. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related) — Use LibreChat with the AI Gateway.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related) — Use the Blackbox AI CLI with the AI Gateway.
- [OpenClaw \(Clawdbot\)](https://vercel.com/docs/ai-gateway/chat-platforms/openclaw?from=related) — Use OpenClaw \(formerly Clawdbot\) with AI Gateway.
- [Open WebUI](https://vercel.com/docs/ai-gateway/chat-platforms/open-webui?from=related) — Use Open WebUI with the AI Gateway.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.

Full cross-link map for this page: [/docs/ai-gateway/chat-platforms/chatbox.graph.md](/docs/ai-gateway/chat-platforms/chatbox.graph.md)
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

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
