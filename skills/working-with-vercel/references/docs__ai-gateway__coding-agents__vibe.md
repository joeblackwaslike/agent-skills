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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/vibe.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "341d1ec1f70fbd39b8b3bf89a5afc2694f72a09f98d3081175e841107457205d"
---

# Mistral Vibe with AI Gateway

[Mistral Vibe](https://github.com/mistralai/mistral-vibe) is Mistral AI's terminal coding agent. It reads a TOML config at `$VIBE_HOME/config.toml` (default `~/.vibe`), whose custom providers you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Mistral Large 4 now available on AI Gateway](https://vercel.com/changelog/mistral-large-4-now-available-on-ai-gateway)
- [Mistral Large 4 updated weights and lower pricing on AI Gateway](https://vercel.com/changelog/mistral-large-4-updated-weights-and-lower-pricing-on-ai-gateway)
- [Mistral Large 3 now available on Vercel AI Gateway](https://vercel.com/changelog/mistral-large-3-now-available-on-vercel-ai-gateway)
- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/vibe.graph.md](/docs/ai-gateway/coding-agents/vibe.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Mistral Vibe:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent vibe
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
  active_model = "openai/gpt-6-astra"

  [[providers]]
  name = "vercel-ai-gateway"
  api_base = "https://ai-gateway.vercel.sh/coding-agent/v1"
  api_key_env_var = "AI_GATEWAY_API_KEY"
  api_style = "openai"
  backend = "generic"

  [[models]]
  name = "openai/gpt-6-astra"
  provider = "vercel-ai-gateway"
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
