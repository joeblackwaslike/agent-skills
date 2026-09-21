---
title: omp with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/omp
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/omp"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect omp (oh-my-pi) to AI Gateway with the Vercel CLI or an environment variable. Use the built-in provider to access the model catalog.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/omp.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "44f76086f80d53a15d2d4f74493783e468371b7adb53c561d0e2eeeb21098268"
---

# omp with AI Gateway

[omp](https://omp.sh) (oh-my-pi) is an open-source terminal coding agent forked from Pi. It inherits Pi's first-class `vercel-ai-gateway` provider, so it already knows the gateway's base URL and fills its model picker from the gateway catalog. Unlike Pi, omp reads the credential from the environment, so the whole setup is one variable.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
- [Pi with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/pi?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Connect Pi to AI Gateway with one CLI command, or configure it manually.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/omp.graph.md](/docs/ai-gateway/coding-agents/omp.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fomp&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for omp:

```bash filename="terminal"
npx vercel ai-gateway setup --agent omp
```

The command provisions a key and adds the export to your shell profile, backed by the macOS Keychain where available.

## Configuring omp

If you can't use the Vercel CLI, configure omp manually:

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
