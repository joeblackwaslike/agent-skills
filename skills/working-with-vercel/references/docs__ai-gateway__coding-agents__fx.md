---
title: fx with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/fx
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/fx"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/coding-agents/harbor
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect fx to AI Gateway with the Vercel CLI or the AI_GATEWAY_API_KEY environment variable.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/fx.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "997d8727b76b27d4e783b1a05e781e1776049ace2307df3dad5609f319102052"
---

# fx with AI Gateway

[fx](https://fx.sh) is a terminal coding agent with native AI Gateway support. It reads `AI_GATEWAY_API_KEY` directly, so you only need to configure the credential. The whole gateway catalog is available without a provider definition.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [fx is now available in the AI SDK harness layer](https://vercel.com/changelog/fx-ai-sdk-harness-adapter?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Ffx&source_site=vercel-docs&relationship=related)
- [ForgeCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/forge?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Ffx&source_site=vercel-docs&relationship=related) — Connect ForgeCode to AI Gateway with the Vercel CLI or custom provider and credential files.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Ffx&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Blackbox AI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Ffx&source_site=vercel-docs&relationship=related) — Configure the Blackbox AI CLI to use AI Gateway for code generation and debugging. Set your API key and model and monito
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Ffx&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Ffx&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/fx.graph.md](/docs/ai-gateway/coding-agents/fx.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Ffx&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for fx:

```bash filename="terminal"
npx vercel ai-gateway setup --agent fx
```

The command exports `AI_GATEWAY_API_KEY` from a managed block in your shell startup file and pins `credential_source` in `~/.fx/settings.json` to that key, ahead of a stored `fx login` session.

## Configuring fx

If you can't use the Vercel CLI, configure fx manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Pin the credential source
  Set `credential_source` in `~/.fx/settings.json` so fx uses the exported key ahead of a stored `fx login` session:
  ```json filename="~/.fx/settings.json"
  {
    "credential_source": "ai_gateway_api_key"
  }
  ```

- ### Start fx
  Open a new terminal so the key is loaded, then confirm the credential:
  ```bash filename="Terminal"
  fx status
  ```
  Pick a model with `/model`, or browse the catalog with `/models`. The whole gateway catalog is available.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key. Required                 |

## Next steps

- Run benchmark tasks with fx using [Harbor](/docs/ai-gateway/coding-agents/harbor)
- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
