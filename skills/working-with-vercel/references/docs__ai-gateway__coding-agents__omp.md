---
title: omp
product: vercel
url: /docs/ai-gateway/coding-agents/omp
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/omp"
last_updated: 2026-08-26
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Use the omp coding agent with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/omp.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e75f76af7e51503604d2ee5464ba342176c940824fea3e9c77e263682e5cd6e6"
---

# omp

[omp](https://omp.sh) (oh-my-pi) is an open-source terminal coding agent forked from Pi. It inherits Pi's first-class `vercel-ai-gateway` provider, so it already knows the gateway's base URL and fills its model picker from the gateway catalog. Unlike Pi, omp reads the credential from the environment, so the whole setup is one variable.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related)
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Use OpenCode with the AI Gateway.
- [Pi](https://vercel.com/docs/ai-gateway/coding-agents/pi?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Use the Pi coding agent with the AI Gateway.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Use OpenClaw with the AI Gateway as a model provider.
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Use the Kilo Code CLI with the AI Gateway as an OpenAI-compatible provider.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/omp.graph.md](/docs/ai-gateway/coding-agents/omp.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** The Vercel CLI is the recommended way to set this up. [`vercel ai-gateway
>   coding-agents setup --agent omp`](/docs/cli/ai-gateway#setup) provisions a
> key and adds the export to your shell profile, backed by the macOS Keychain
> where available. The steps below do the same thing by hand.

## Configuring omp

- ### Install omp
  Install omp with its official installer:
  ```bash filename="Terminal"
  curl -fsSL https://raw.githubusercontent.com/can1357/oh-my-pi/main/scripts/install.sh | sh
  ```

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  omp authenticates its `vercel-ai-gateway` provider from the `AI_GATEWAY_API_KEY` environment variable. Add the export to your shell profile:
  ```bash filename="~/.zshrc"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  Open a new terminal so the variable is loaded.
  > **💡 Note:** omp also reads `.env` files, including `~/.omp/.env`, so the export can live
  > there instead of your shell profile. Its own `/login` flow stores credentials
  > in a local database. The environment variable has the same effect without
  > it.

- ### Pick a model
  Start omp and choose a gateway model with `/model`, or name one when you launch:
  ```bash filename="Terminal"
  omp --model vercel-ai-gateway/anthropic/claude-opus-5
  ```
  Unlike Pi, which takes bare gateway model IDs, omp prefixes them with the provider id: `vercel-ai-gateway/` followed by the gateway's `creator/model-name` format. To browse the catalog from the terminal, with context sizes and capabilities:
  ```bash filename="Terminal"
  omp models vercel-ai-gateway
  ```

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Read omp's own [provider documentation](https://omp.sh/docs/providers)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Connect your other agents with the [Vercel CLI](/docs/cli/ai-gateway#setup)


---

[View full sitemap](/docs/sitemap)
