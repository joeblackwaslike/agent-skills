---
title: Goose with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/goose
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/goose"
last_updated: 2026-09-13
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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/goose.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e145c9a167ab1b589498bdb7b900534c1cd690474c8b4d834de37b9556123741"
---

# Goose with AI Gateway

[Goose](https://github.com/block/goose) is Block's open-source, terminal-based AI coding agent. It supports custom OpenAI-compatible providers, which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Go with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/go) — Use AI Gateway from any Go application with the OpenAI or Anthropic Go SDKs, including model fallbacks, cost tracking, a
- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/goose.graph.md](/docs/ai-gateway/coding-agents/goose.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Goose:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent goose
```

The command writes a declarative provider JSON into `~/.config/goose/custom_providers/` that shadows Goose's built-in `vercel_ai_gateway` definition, turns on model discovery so Goose's model picker refreshes from the gateway catalog, sets the default provider and model in `config.yaml`, and records context sizes from the gateway catalog for the gateway language models that support tool use. Re-run it to refresh the context sizes.

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
    "catalog_provider_id": "vercel",
    "dynamic_models": true,
    "models": [
      { "name": "openai/gpt-6-astra", "context_limit": 1050000 }
    ]
  }
  ```
  This file shadows Goose's built-in `vercel_ai_gateway` definition and repoints it at the gateway. `dynamic_models: true` makes Goose refresh its model picker from the gateway catalog. Without it, the picker shows only the models in this file. `catalog_provider_id: "vercel"` gives the refreshed models their context limits and reasoning settings. The `models` array supplies context sizes, so list the models you use most and let discovery fill in the rest.

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
