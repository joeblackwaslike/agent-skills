---
title: Pi
product: vercel
url: /docs/ai-gateway/coding-agents/pi
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/pi"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Learn about pi on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/pi.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "fb2f59098c53175a8e05134bd9aa3f4f4b871dec2bf0060c348f24c4dec8a0ff"
---

# Pi

[Pi](https://github.com/earendil-works/pi) is an open-source terminal coding agent. It ships a first-class `vercel-ai-gateway` provider, so it already knows the gateway's base URL and model catalog and only needs your API key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Pydantic AI](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai?from=related) — Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related) — Learn about kilo code on Vercel.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related) — Use the Blackbox AI CLI with the AI Gateway.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/pi.graph.md](/docs/ai-gateway/coding-agents/pi.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** The Vercel CLI is the recommended way to set this up. [`vercel ai-gateway
>   coding-agents setup --agent pi`](/docs/cli/ai-gateway#setup) provisions a key
> and writes it to Pi's auth file with the right permissions. The steps below
> do the same thing by hand.

## Configuring Pi

- ### Install Pi
  Install the Pi coding agent from npm:
  ```bash filename="Terminal"
  npm install -g @earendil-works/pi-coding-agent
  ```

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add the key to Pi
  Pi keeps credentials in `~/.pi/agent/auth.json`. Add an entry for the gateway provider:
  ```json filename="~/.pi/agent/auth.json"
  {
    "vercel-ai-gateway": {
      "type": "api_key",
      "key": "your-ai-gateway-api-key"
    }
  }
  ```
  The file holds a secret, so create it with owner-only permissions:
  ```bash filename="Terminal"
  chmod 600 ~/.pi/agent/auth.json
  ```
  > **💡 Note:** Pi reads its agent directory from `$PI_CODING_AGENT_DIR` when that variable
  > is set, and falls back to `~/.pi/agent` otherwise. Pi always keeps the key in
  > this file, so `vercel ai-gateway coding-agents setup` writes it here even in
  > macOS Keychain mode.

- ### Pick a model
  Start Pi and choose a gateway model with `/model`, or name one when you launch:
  ```bash filename="Terminal"
  pi --model anthropic/claude-opus-5
  ```
  Model IDs use the gateway's `creator/model-name` format. Browse the [models catalog](/ai-gateway/models) for what's available.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Read Pi's own [provider documentation](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Connect your other agents with the [Vercel CLI](/docs/cli/ai-gateway#setup)


---

[View full sitemap](/docs/sitemap)
