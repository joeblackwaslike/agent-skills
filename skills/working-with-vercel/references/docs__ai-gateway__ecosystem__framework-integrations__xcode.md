---
title: Xcode with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/xcode
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: "Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in Xcode settings."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "1370443bc81746aa61a7c5b8c72a93479dfd0a38c13b9692a8ae0481f1caa704"
---

# Xcode with AI Gateway

[Xcode](https://developer.apple.com/xcode/) is Apple's IDE for building apps across Apple platforms. Xcode 26's AI chat accepts any model provider that supports the Chat Completions API. This allows you to add AI Gateway as a model provider and chat with any model in the gateway catalog, with your project files as context and your usage tracked in one place.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Chatbox with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/chatbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Connect Chatbox to AI Gateway. Configure your API key, endpoint, and models to use multiple AI providers and monitor cha
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/xcode.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/xcode.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Requirements

- Xcode 26 or later
- Apple Intelligence turned on in System Settings (Xcode's intelligence features require it)

## Configuring Xcode

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add AI Gateway as a model provider
  In Xcode, open **Settings** with `Cmd+,`, go to **Intelligence**, and under **Chat** click **Add a Model Provider**. Select **Internet Hosted** and fill in the dialog:
  - **URL**:
  ```bash
  https://ai-gateway.vercel.sh
  ```
  - **API Key**: paste your AI Gateway key exactly as issued
  - **API Key Header**: leave empty, so Xcode sends the standard `Authorization` header
  - **Description**: a label for your own reference, for example `Vercel AI Gateway`
  > **💡 Note:** Enter the URL without a `/v1` suffix. Xcode appends `v1/` and the endpoint
  > path itself when it makes requests, so a URL that already ends in `/v1`
  > produces requests to a path that doesn't exist.
  If you provisioned the key with the Vercel CLI, copy it out of your environment without echoing it to the terminal:
  ```bash filename="Terminal"
  printf %s "$AI_GATEWAY_API_KEY" | pbcopy
  ```
  Xcode labels the provider by its domain, so it appears as **Vercel** in the settings list.

- ### Mark favorite models
  Click the new **Vercel** provider row. The **Models** table fills from the gateway catalog automatically. Star the models you plan to use as **Favorites** so they appear at the top of the model picker instead of scrolling the full catalog.

  Model IDs use the gateway's `creator/model-name` format, for example `anthropic/claude-opus-5`. The [models catalog](/ai-gateway/models) lists what's available.

- ### Start a conversation
  Open AI chat from the left navigator in a project window. Use the model picker on the message field to select one of your favorited gateway models, then send a prompt. The conversation includes the project context Xcode normally provides, such as the file you're working in.

- ### Verify requests in the dashboard
  Send a prompt, then check your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard to see the request, the model that served it, and the cost.

## Limitations

- Model providers you add power Xcode's **chat** interface. Xcode's agent integrations, such as Claude Agent and ChatGPT Codex, install and authenticate separately and don't route through a custom model provider.
- Xcode stores the provider configuration in its own settings, so [`vercel ai-gateway setup`](/docs/cli/ai-gateway#setup) can't complete this setup for you. The steps above are the whole process.

## Troubleshooting

- **No Apple Intelligence toggle in System Settings**: your Mac's language and Siri's language must match before the toggle appears. Set them to the same language under **System Settings** > **Apple Intelligence & Siri** > **Language**, then turn Apple Intelligence on
- **The provider's model list stays empty**: confirm the URL is exactly `https://ai-gateway.vercel.sh` with no `/v1` suffix, and that the key was pasted without extra characters
- **401 Unauthorized**: verify the key is an AI Gateway key and hasn't been revoked

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Connect your terminal agents with the [Vercel CLI](/docs/cli/ai-gateway#setup)


---

[View full sitemap](/docs/sitemap)
