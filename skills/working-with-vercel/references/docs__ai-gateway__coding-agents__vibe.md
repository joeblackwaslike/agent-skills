---
title: Mistral Vibe with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/vibe
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/vibe"
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
summary: Connect Mistral Vibe to AI Gateway with the Vercel CLI or a TOML provider and model shortlist.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/vibe.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "85e9b8b935f597df959b59362fbf3a5edc7e8e3eb5dd1aa56ef2eebf457e05f5"
---

# Mistral Vibe with AI Gateway

[Mistral Vibe](https://github.com/mistralai/mistral-vibe) is Mistral AI's terminal coding agent. It reads a TOML config at `$VIBE_HOME/config.toml` (default `~/.vibe`), whose custom providers you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fvibe&source_site=vercel-docs&relationship=related) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fvibe&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fvibe&source_site=vercel-docs&relationship=related) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fvibe&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fvibe&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/vibe.graph.md](/docs/ai-gateway/coding-agents/vibe.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fvibe&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Mistral Vibe:

```bash filename="terminal"
npx vercel ai-gateway setup --agent vibe
```

The command writes the gateway provider and an unaliased `[[models]]` shortlist into `$VIBE_HOME/config.toml`, with Mistral's top models first and the leaderboard's most-used models after them. It pins `active_model` to the leading Mistral model. Re-run the command to refresh the list.

## Configuring Mistral Vibe

If you can't use the Vercel CLI, configure Mistral Vibe manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Add the gateway provider
  Add the provider and model entries to `~/.vibe/config.toml`:
  ```toml filename="~/.vibe/config.toml"
  [[providers]]
  name = "vercel-ai-gateway"
  api_base = "https://ai-gateway.vercel.sh/coding-agent/v1"
  api_key_env_var = "AI_GATEWAY_API_KEY"
  api_style = "openai"
  backend = "generic"

  [[models]]
  name = "openai/gpt-6-astra"
  provider = "vercel-ai-gateway"

  active_model = "openai/gpt-6-astra"
  ```
  `api_key_env_var` keeps the key in the shell environment, so it never lands in the file. Model entries must be unaliased because Vibe resolves `[[models]]` names against the provider list. The picker scrolls without type-to-filter, so keep the shortlist focused.

- ### Start Mistral Vibe
  Open a new terminal so the key is loaded, then run:
  ```bash filename="Terminal"
  vibe
  ```
  Switch models with `/model`. Vibe's own Mistral models are listed first, followed by the shortlisted gateway models.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, named by `api_key_env_var`. Required |
| `VIBE_HOME`          | Overrides the config directory. Defaults to `~/.vibe` |

> **💡 Note:** Mistral Vibe calls AI Gateway through the [OpenAI-compatible Chat
> Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so
> any model that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
