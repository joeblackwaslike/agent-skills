---
title: Hermes with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/hermes
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/hermes"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect Hermes to AI Gateway with the Vercel CLI or manual provider configuration. Set your API key, discover models, and monitor usage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/hermes.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "17ffbdf46882edb9242118437fe2a879ab8e86e93eeac25f6fda7483126ccc40"
---

# Hermes with AI Gateway

[Hermes](https://github.com/NousResearch/hermes-agent) is Nous Research's terminal-based coding agent. It ships an AI Gateway provider, so you can reach every model in the gateway catalog from Hermes with one API key and track spend in one place.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [GPT 6 Astra now available on Vercel AI Gateway](https://vercel.com/changelog/gpt-6-astra-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fhermes&source_site=vercel-docs&relationship=related)
- [Vercel AI Gateway and Vercel Sandbox now available on Hermes Agent](https://vercel.com/changelog/vercel-ai-gateway-and-vercel-sandbox-now-available-on-hermes-agent?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fhermes&source_site=vercel-docs&relationship=related)
- [Hermes](https://vercel.com/docs/sandbox/ecosystem/hermes?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fhermes&source_site=vercel-docs&relationship=related) — Run Hermes Agent terminal commands in isolated Vercel Sandbox microVMs, with models served through Vercel AI Gateway.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fhermes&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fhermes&source_site=vercel-docs&relationship=related) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fhermes&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/hermes.graph.md](/docs/ai-gateway/coding-agents/hermes.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fhermes&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Hermes:

```bash filename="terminal"
npx vercel ai-gateway setup --agent hermes
```

The command provisions a key, adds a `vercel-ai-gateway` provider to `~/.hermes/config.yaml` with model discovery turned on, and exports `AI_GATEWAY_API_KEY` from a managed block in your shell startup file. Switch models in-session with `/model custom:vercel-ai-gateway:<model-id>`.

## Configuring Hermes

If you can't use the Vercel CLI, configure Hermes manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add the key to Hermes
  Hermes reads `AI_GATEWAY_API_KEY` from your environment and from `~/.hermes/.env`. Export it in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key across sessions, add the same line to `~/.hermes/.env` instead.

- ### Select AI Gateway as your provider
  Run the model picker:
  ```bash filename="Terminal"
  hermes model
  ```
  Choose **Vercel AI Gateway**, then pick a model. Hermes fetches the live catalog with current pricing from the gateway, filtered to language models that support tool calling. Image, video, embedding, and reranking models from the [models page](/ai-gateway/models) don't appear in the picker.

- ### Start Hermes
  You can also skip the picker and name the provider and model directly:
  ```bash filename="Terminal"
  hermes --provider ai-gateway -m openai/gpt-6-astra
  ```
  The provider ID is `ai-gateway`. Hermes also accepts `vercel` and `vercel-ai-gateway` as aliases. Model IDs use the gateway's `creator/model-name` format.

### Set a fallback provider

Hermes supports `ai-gateway` in fallback chains. Add it to `fallback_model` in `~/.hermes/config.yaml`, or run `hermes fallback` to configure it interactively. When a fallback activates, Hermes swaps the model and provider mid-session without losing your conversation.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

Hermes identifies itself to the gateway, so its requests are attributable in your analytics.

## Environment variables

| Variable              | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `AI_GATEWAY_API_KEY`  | Your AI Gateway API key. Required                                             |
| `AI_GATEWAY_BASE_URL` | Overrides the gateway base URL. Hermes defaults to the gateway's bare `/v1` surface. Set it to `https://ai-gateway.vercel.sh/coding-agent/v1`, the [coding agent surface](/docs/cli/ai-gateway#the-coding-agent-surface), to identify the traffic as coming from a coding agent |

> **💡 Note:** Hermes calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Learn about [model routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
