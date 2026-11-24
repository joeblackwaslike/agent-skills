---
title: gptme with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/gptme
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/gptme"
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
summary: Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/gptme.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "134e1db3039f5aa494f7b1142a8f095a726b48481fb44fda38d26e4335b0a6d1"
---

# gptme with AI Gateway

[gptme](https://github.com/gptme/gptme) is an open-source, terminal-based AI coding agent with shell, file, and browser tools. It supports custom providers through its TOML config, which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/gptme.graph.md](/docs/ai-gateway/coding-agents/gptme.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for gptme:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent gptme
```

The command upserts a `vercel-ai-gateway` entry into the `[[providers]]` array of `~/.config/gptme/config.toml` with `api_key_env` naming `AI_GATEWAY_API_KEY`, and points `[models].default` at the gateway's default model.

## Configuring gptme

If you can't use the Vercel CLI, configure gptme manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Add the gateway provider
  Add a `[[providers]]` entry to `~/.config/gptme/config.toml`:
  ```toml filename="~/.config/gptme/config.toml"
  [[providers]]
  name = "vercel-ai-gateway"
  base_url = "https://ai-gateway.vercel.sh/coding-agent/v1"
  api_key_env = "AI_GATEWAY_API_KEY"
  default_model = "openai/gpt-6-astra"

  [models]
  default = "vercel-ai-gateway/openai/gpt-6-astra"
  ```
  `api_key_env` keeps the key in the shell environment, so it never lands in the config file.

- ### Start gptme
  Open a new terminal so the key is loaded, then run:
  ```bash filename="Terminal"
  gptme
  ```
  Run other gateway models by name:
  ```bash filename="Terminal"
  gptme -m vercel-ai-gateway/anthropic/claude-sonnet-5
  ```

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, named by `api_key_env`. Required |

> **💡 Note:** gptme calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [gptme documentation](https://gptme.org/docs/) for tools and usage

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
