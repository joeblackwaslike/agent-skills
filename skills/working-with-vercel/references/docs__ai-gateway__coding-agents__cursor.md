---
title: Cursor
product: vercel
url: /docs/ai-gateway/coding-agents/cursor
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/cursor"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Learn about cursor on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/cursor.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "716c14b24c69540d72f29930c3f2c3088c2c765d608e11a9ff722dbd5af4a6eb"
---

# Cursor

[Cursor](https://cursor.com) is an AI-first code editor. Point its OpenAI API key settings at AI Gateway to reach every model in the gateway catalog and track spend in one place.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related) — Use LibreChat with the AI Gateway.
- [Hermes](https://vercel.com/docs/ai-gateway/coding-agents/hermes?from=related) — Use the Hermes agent with the AI Gateway.
- [Chat Platforms](https://vercel.com/docs/ai-gateway/chat-platforms?from=related) — Configure AI chat platforms to use the AI Gateway for unified model access and spend monitoring.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/cursor.graph.md](/docs/ai-gateway/coding-agents/cursor.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Cursor keeps API-key settings in its own account-synced store, not in a file
> on disk, so no tool can finish this setup for you. [`vercel ai-gateway
>   coding-agents setup --agent cursor`](/docs/cli/ai-gateway#setup) provisions
> the key, exports it as `AI_GATEWAY_API_KEY`, and prints these steps with your
> values filled in.

## Configuring Cursor

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Open the model settings
  In Cursor, open **Settings** with `Cmd+Shift+J`, then go to **Models**.

- ### Add your key and base URL
  Under **OpenAI API Key**, paste your AI Gateway key. Then enable **Override OpenAI Base URL** and set it to Cursor's dedicated compatibility endpoint:
  ```bash
  https://ai-gateway.vercel.sh/cursor/v1
  ```
  Cursor's base URL override sends `/chat/completions` bodies the standard OpenAI schema rejects: version 3.14.x sends flat tool definitions whose `type` isn't `function`, and newer builds send Responses-shaped bodies with `input` instead of `messages`. The `/cursor/v1` endpoint normalizes both into standard Chat Completions. Every other path falls through to the standard `/v1` handlers, so routing, billing, and errors are unchanged. Pointing Cursor at the bare `/v1` or [coding agent](/docs/cli/ai-gateway#the-coding-agent-surface) surface returns a 400 on `tools.0.type` instead.

  If you provisioned the key with the Vercel CLI, copy it out of your environment without echoing it to the terminal:
  ```bash filename="Terminal"
  printf %s "$AI_GATEWAY_API_KEY" | pbcopy
  ```

- ### Add the models you want
  Use **Add model** to add gateway model IDs to the picker, for example `anthropic/claude-opus-5` or `openai/gpt-5.6-sol`. Model IDs use the gateway's `creator/model-name` format, and the [models catalog](/ai-gateway/models) lists what's available.

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
