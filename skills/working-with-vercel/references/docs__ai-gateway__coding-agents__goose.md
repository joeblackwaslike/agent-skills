---
title: Goose with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/goose
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/goose"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect Goose to AI Gateway with the Vercel CLI or a custom OpenAI-compatible provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/goose.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "b67da7c74186067fc14f615f1dc6a077ba04b8415c404fe8b483d28dd5a2bf45"
---

# Goose with AI Gateway

[Goose](https://github.com/block/goose) is Block's open-source, terminal-based AI coding agent. It supports custom OpenAI-compatible providers, which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgoose&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgoose&source_site=vercel-docs&relationship=related) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgoose&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgoose&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [ForgeCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/forge?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgoose&source_site=vercel-docs&relationship=related) — Connect ForgeCode to AI Gateway with the Vercel CLI or custom provider and credential files.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/goose.graph.md](/docs/ai-gateway/coding-agents/goose.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgoose&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Goose:

```bash filename="terminal"
npx vercel ai-gateway setup --agent goose
```

The command writes a declarative provider JSON into `~/.config/goose/custom_providers/` that shadows Goose's built-in `vercel_ai_gateway` definition, sets the default provider and model in `config.yaml`, and records context sizes for the top gateway models from the gateway catalog. Re-run it to refresh the context sizes.

## Configuring Goose

If you can't use the Vercel CLI, configure Goose manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Goose resolves the provider key from an environment variable. Export it in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Add the custom provider
  Create `~/.config/goose/custom_providers/vercel_ai_gateway.json`:
  ```json filename="~/.config/goose/custom_providers/vercel_ai_gateway.json"
  {
    "name": "vercel_ai_gateway",
    "engine": "openai",
    "display_name": "Vercel AI Gateway",
    "api_key_env": "AI_GATEWAY_API_KEY",
    "base_url": "https://ai-gateway.vercel.sh/coding-agent/v1/chat/completions",
    "models": [
      { "name": "openai/gpt-6-astra", "context_limit": 1050000 }
    ]
  }
  ```
  This file shadows Goose's built-in `vercel_ai_gateway` definition and repoints it at the gateway. The `models` array only supplies context sizes. Goose still discovers the rest of the catalog from the API, so list a few models and let discovery fill in the rest. Never set `dynamic_models: false`, which would reduce Goose to exactly this array.

- ### Select the provider and model
  Set the default provider and model in `~/.config/goose/config.yaml`:
  ```yaml filename="~/.config/goose/config.yaml"
  GOOSE_PROVIDER: vercel_ai_gateway
  GOOSE_MODEL: openai/gpt-6-astra
  ```

- ### Start Goose
  Open a new terminal so the key is loaded, then run:
  ```bash filename="Terminal"
  goose
  ```
  Switch models with `GOOSE_MODEL` in `config.yaml` or `goose configure`. The picker fills from the gateway catalog.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, named by `api_key_env`. Required |

> **💡 Note:** Goose calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [Goose documentation](https://block.github.io/goose/) for extensions and recipes


---

[View full sitemap](/docs/sitemap)
