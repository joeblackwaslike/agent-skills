---
title: ForgeCode with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/forge
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/forge"
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
summary: Connect ForgeCode to AI Gateway with the Vercel CLI or custom provider and credential files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/forge.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "080c853fc08ea361279cfbc6e0f2d41d0b3428d170d1f3bedb36c97ca6664504"
---

# ForgeCode with AI Gateway

[ForgeCode](https://forgecode.dev) is a terminal coding agent. It supports custom OpenAI-compatible providers, which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fforge&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fforge&source_site=vercel-docs&relationship=related) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fforge&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fforge&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [Kilo Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fforge&source_site=vercel-docs&relationship=related) — Connect Kilo Code to AI Gateway with the Vercel CLI or an OpenAI-compatible provider configuration. Set your API key and

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/forge.graph.md](/docs/ai-gateway/coding-agents/forge.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fforge&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for ForgeCode:

```bash filename="terminal"
npx vercel ai-gateway setup --agent forge
```

The command writes a gateway `[[providers]]` entry and `[session]` defaults into `~/.forge/.forge.toml`. It stores the key in the sibling `.credentials.json` with `0600` permissions, which is the only key source Forge 2.13 and later read. Re-run it to refresh the defaults.

## Configuring ForgeCode

If you can't use the Vercel CLI, configure ForgeCode manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add the gateway provider
  Add a `[[providers]]` entry to `~/.forge/.forge.toml`:
  ```toml filename="~/.forge/.forge.toml"
  [[providers]]
  id = "vercel-ai-gateway"
  url = "https://ai-gateway.vercel.sh/coding-agent/v1/chat/completions"
  models = "https://ai-gateway.vercel.sh/coding-agent/v1/models"
  api_key_vars = "AI_GATEWAY_API_KEY"
  response_type = "OpenAI"
  auth_methods = ["api_key"]

  [session]
  provider_id = "vercel-ai-gateway"
  model_id = "openai/gpt-6-astra"
  ```

- ### Store the key
  Forge 2.13 and later resolve keys only from `~/.forge/.credentials.json`, not the environment. Add the key to the JSON array with mode `0600`:
  ```json filename="~/.forge/.credentials.json"
  [
    {
      "provider_id": "vercel-ai-gateway",
      "auth_details": {
        "api_key": "your-ai-gateway-api-key"
      }
    }
  ]
  ```
  ```bash filename="Terminal"
  chmod 0600 ~/.forge/.credentials.json
  ```
  Older Forge releases read the key from `AI_GATEWAY_API_KEY` in the environment instead, which is why the provider also declares `api_key_vars`.

- ### Start ForgeCode
  ```bash filename="Terminal"
  forge
  ```
  Switch models in-session with `:config-model`. The picker fills from the gateway's `/models` endpoint, so the full catalog is available.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key. Used by Forge releases older than 2.13; newer releases read `.credentials.json` |

> **💡 Note:** ForgeCode calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
