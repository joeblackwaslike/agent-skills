---
title: Kimi CLI with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/kimi
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/kimi"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect Kimi CLI to AI Gateway with the Vercel CLI or a TOML provider and model shortlist.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/kimi.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "70d5d0825cf6bebb42aa1cd4ecb8c4344f42bdfed78b75a55cdee87e70b8a69c"
---

# Kimi CLI with AI Gateway

[Kimi CLI](https://github.com/MoonshotAI/kimi-cli) is Moonshot AI's terminal coding agent. It reads a TOML config at `$KIMI_SHARE_DIR/config.toml` (default `~/.kimi`), which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Moonshot AI's Kimi K2 0905 model is now supported in Vercel AI Gateway](https://vercel.com/changelog/moonshot-ais-kimi-k2-0905-model-is-now-supported-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fkimi&source_site=vercel-docs&relationship=related)
- [Kimi K2.6 on AI Gateway](https://vercel.com/changelog/kimi-k2.6-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fkimi&source_site=vercel-docs&relationship=related)
- [Kimi K3 and Kimi K3 Fast with ZDR and US-based providers now on AI Gateway](https://vercel.com/changelog/kimi-k3-and-kimi-k3-fast-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fkimi&source_site=vercel-docs&relationship=related)
- [Moonshot AI's Kimi K2 model is now supported in Vercel AI Gateway](https://vercel.com/changelog/moonshot-ai-kimi-k2-model-is-now-supported-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fkimi&source_site=vercel-docs&relationship=related)
- [Kimi K3 is now available on AI Gateway](https://vercel.com/changelog/kimi-k3-is-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fkimi&source_site=vercel-docs&relationship=related)
- [Kilo Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fkimi&source_site=vercel-docs&relationship=related) — Connect Kilo Code to AI Gateway with the Vercel CLI or an OpenAI-compatible provider configuration. Set your API key and

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/kimi.graph.md](/docs/ai-gateway/coding-agents/kimi.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fkimi&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Kimi CLI:

```bash filename="terminal"
npx vercel ai-gateway setup --agent kimi
```

The command writes a gateway provider and a `[models]` shortlist into `$KIMI_SHARE_DIR/config.toml`, with Moonshot's newest models first and the gateway's most-used models after them. It sets `default_model` to prefer `moonshotai/kimi-k3`. The file is created with `0600` permissions because Kimi requires a literal API key.

## Configuring Kimi CLI

If you can't use the Vercel CLI, configure Kimi CLI manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add the gateway provider
  Add the provider and a `[models]` shortlist to `~/.kimi/config.toml`:
  ```toml filename="~/.kimi/config.toml"
  default_model = "moonshotai/kimi-k3"

  [providers.vercel-ai-gateway]
  name = "Vercel AI Gateway"
  base_url = "https://ai-gateway.vercel.sh/coding-agent/v1"
  api_key = "your-ai-gateway-api-key"

  [models.moonshotai/kimi-k3]
  provider = "vercel-ai-gateway"
  model = "moonshotai/kimi-k3"
  max_context_size = 1000000
  display_name = "Kimi K3"

  [models.openai/gpt-6-astra]
  provider = "vercel-ai-gateway"
  model = "openai/gpt-6-astra"
  max_context_size = 1050000
  display_name = "GPT-6 Astra"
  ```
  Kimi providers need a literal `api_key`, so the key lands in this file. Create it with mode `0600` so only you can read it:
  ```bash filename="Terminal"
  chmod 0600 ~/.kimi/config.toml
  ```
  `default_model` must name a key declared under `[models]`.

- ### Start Kimi CLI
  ```bash filename="Terminal"
  kimi
  ```
  Switch models in-session. Any gateway model ID works by adding a matching `[models.<gateway-model-id>]` entry.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `KIMI_SHARE_DIR`     | Overrides the config directory. Defaults to `~/.kimi` |

> **⚠️ Warning:** Kimi has no environment-variable lookup for provider keys, so the API key is
> stored in `config.toml`. Keep the file mode at `0600`.

> **💡 Note:** Kimi CLI lets `OPENAI_API_KEY` and `OPENAI_BASE_URL` environment variables
> override this provider. Unset them if requests fail with auth errors.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
