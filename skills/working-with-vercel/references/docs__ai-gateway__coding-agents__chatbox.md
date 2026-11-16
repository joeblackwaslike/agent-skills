---
title: Chatbox with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/chatbox
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/chatbox"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Connect Chatbox to AI Gateway. Configure your API key, endpoint, and models to use multiple AI providers and monitor chat spending in one place.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/chatbox.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "b7716c76ec3ae91bc3fee9e2f14eaabf393a7f022da2a31922e4642073abb1ac"
---

# Chatbox with AI Gateway

[Chatbox](https://chatboxai.app) is a cross-platform desktop AI assistant. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Blackbox AI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/blackbox) — Configure the Blackbox AI CLI to use AI Gateway for code generation and debugging. Set your API key and model and monito
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Go with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/go) — Use AI Gateway from any Go application with the OpenAI or Anthropic Go SDKs, including model fallbacks, cost tracking, a
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/chatbox.graph.md](/docs/ai-gateway/coding-agents/chatbox.graph.md)
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
