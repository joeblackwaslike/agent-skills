---
title: Cursor with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/cursor
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/cursor"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect Cursor to AI Gateway with its OpenAI base URL override. Configure the Cursor compatibility endpoint, API key, and model IDs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/cursor.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "439e2ba6f40acaa6e52085c63229982d3ef9054c5286d009b1e72736295c238c"
---

# Cursor with AI Gateway

[Cursor](https://cursor.com) is an AI-first code editor. Point its OpenAI API key settings at AI Gateway to reach every model in the gateway catalog and track spend in one place.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcursor&source_site=vercel-docs&relationship=related)
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcursor&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcursor&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcursor&source_site=vercel-docs&relationship=related) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcursor&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcursor&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/cursor.graph.md](/docs/ai-gateway/coding-agents/cursor.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcursor&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Cursor:

```bash filename="terminal"
npx vercel ai-gateway setup --agent cursor
```

The command provisions a key, exports it as `AI_GATEWAY_API_KEY`, and prints the remaining setup steps with your values filled in. Cursor keeps API-key settings in its account-synced store instead of a file on disk, so you must finish the setup in Cursor.

## Configuring Cursor

Complete these steps in Cursor after running the Vercel CLI. If you don't use the CLI, create an API key in the first step.

- ### Get your API key
  If you ran the Vercel CLI setup command on macOS, copy the key from your environment without displaying it in the terminal:
  ```bash filename="terminal"
  printf %s "$AI_GATEWAY_API_KEY" | pbcopy
  ```
  If you didn't use the Vercel CLI, go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a key.

- ### Open the model settings
  In Cursor, open **Settings** with `Cmd+Shift+J`, then go to **Models**.

- ### Add your key and base URL
  Under **OpenAI API Key**, paste your AI Gateway key. Then enable **Override OpenAI Base URL** and set it to Cursor's dedicated compatibility endpoint:
  ```bash
  https://ai-gateway.vercel.sh/cursor/v1
  ```
  Cursor's base URL override sends `/chat/completions` bodies that the standard OpenAI schema rejects. Version 3.14.x sends flat tool definitions whose `type` isn't `function`, and newer builds send Responses-shaped bodies with `input` instead of `messages`. The `/cursor/v1` endpoint normalizes both into standard Chat Completions. Every other path falls through to the standard `/v1` handlers, so routing, billing, and errors are unchanged. Pointing Cursor at the bare `/v1` or [coding agent](/docs/cli/ai-gateway#the-coding-agent-surface) surface returns a 400 on `tools.0.type` instead.

- ### Add the models you want
  Use **Add model** to add gateway model IDs to the picker, for example `anthropic/claude-opus-5` or `openai/gpt-6-astra`. Model IDs use the gateway's `creator/model-name` format, and the [models catalog](/ai-gateway/models) lists what's available.

## Limitations

Cursor's bring-your-own-key support has constraints that come from Cursor itself, not from AI Gateway:

| Limitation | What it means |
| --- | --- |
| Built-in models stop working | While the base URL override is on, Cursor's own non-OpenAI models are unavailable. Use gateway model IDs for everything, or turn the override off to go back |
| Tab completions are excluded | Tab never uses a custom key, so those requests don't reach the gateway |
| Agent and Auto may bypass the override | Some agent modes route to Cursor's own models regardless of the override |
| Requests pass through Cursor | Bring-your-own-key traffic still goes through Cursor's backend on the way to the gateway |
| No local sessions | Cursor stores chats in its backend, so there are no local sessions to migrate when you switch providers |

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Connect your terminal agents with the [Vercel CLI](/docs/cli/ai-gateway#setup)


---

[View full sitemap](/docs/sitemap)
