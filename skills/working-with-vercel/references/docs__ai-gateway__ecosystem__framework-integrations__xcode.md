---
title: Xcode
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/xcode
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode"
last_updated: 2026-08-26
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: "Use Xcode's coding assistant with the AI Gateway."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "8faba1af20ab68d370cdfef7dd6f8c900ee0baaa0b29136bfc2fa6798476d553"
---

# Xcode

[Xcode](https://developer.apple.com/xcode/) is Apple's IDE for building apps across Apple platforms. Xcode 26's coding assistant accepts any model provider that supports the Chat Completions API. This allows you to add AI Gateway as a model provider and chat with any model in the gateway catalog, with your project files as context and your usage tracked in one place.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related)
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was r
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Use the Kilo Code CLI with the AI Gateway as an OpenAI-compatible provider.
- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Coding Agents](https://vercel.com/docs/ai-gateway/coding-agents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fxcode&source_site=vercel-docs&relationship=related) — Configure popular AI coding agents to use the AI Gateway for unified model access and spend monitoring.

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
  Open the coding assistant from the left navigator in a project window. Use the model picker on the message field to select one of your favorited gateway models, then send a prompt. The conversation includes the project context Xcode normally provides, such as the file you're working in.

- ### Verify requests in the dashboard
  Send a prompt, then check your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard to see the request, the model that served it, and the cost.

## Limitations

- Model providers you add power the **chat** side of Xcode's coding assistant. Xcode's agent integrations, such as Claude Agent and ChatGPT Codex, install and authenticate separately and don't route through a custom model provider.
- Xcode stores the provider configuration in its own settings, so [`vercel ai-gateway coding-agents setup`](/docs/cli/ai-gateway#setup) can't complete this setup for you. The steps above are the whole process.

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
