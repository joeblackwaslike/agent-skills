---
title: Aider with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/aider
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/aider"
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
summary: Connect Aider to AI Gateway with the Vercel CLI or an OpenAI-compatible base URL, API key, and model metadata.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/aider.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "f6fe48980d8ad1ce33b6719da1641723f99e78b0e81ce5e4904f8ac7716f66a7"
---

# Aider with AI Gateway

[Aider](https://aider.chat) is an open-source, terminal-based AI pair programming tool that edits code in your local git repository. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/aider.graph.md](/docs/ai-gateway/coding-agents/aider.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Aider:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent aider
```

The command writes the gateway base URL and a default model into `~/.aider.conf.yml`, registers the gateway's models in `.aider.model.metadata.json` and `.aider.model.settings.yml` so Aider knows their context windows, and exports `AIDER_OPENAI_API_KEY` from a managed block in your shell startup file. Re-run it to refresh the model registrations.

## Configuring Aider

If you can't use the Vercel CLI, configure Aider manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Aider reads its OpenAI-compatible key from `AIDER_OPENAI_API_KEY`. Export it in your shell:
  ```bash filename="Terminal"
  export AIDER_OPENAI_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Point Aider at the gateway
  Add the gateway base URL and a default model to `~/.aider.conf.yml`:
  ```yaml filename="~/.aider.conf.yml"
  openai-api-base: https://ai-gateway.vercel.sh/coding-agent/v1
  model: openai/openai/gpt-6-astra
  ```
  The `openai/` prefix is what routes the model ID through `openai-api-base`, so the model value is `openai/` followed by the gateway's `creator/model-name` slug. `openai/openai/gpt-6-astra` means the gateway model `openai/gpt-6-astra`.

- ### Register model metadata
  Aider has no built-in catalog entries for prefixed IDs, so it falls back to small default context windows. Register the gateway's models in `.aider.model.metadata.json` next to your config file:
  ```json filename="~/.aider.model.metadata.json"
  {
    "openai/openai/gpt-6-astra": {
      "max_input_tokens": 1050000,
      "litellm_provider": "openai",
      "mode": "chat"
    }
  }
  ```
  Then set the diff edit format in `.aider.model.settings.yml`:
  ```yaml filename="~/.aider.model.settings.yml"
  - name: openai/openai/gpt-6-astra
    edit_format: diff
    use_repo_map: true
  ```
  The [Vercel CLI](/docs/cli/ai-gateway#setup) generates both files from the gateway's live catalog, including context windows and per-token pricing, and drops models without size data.

- ### Start Aider
  ```bash filename="Terminal"
  aider
  ```
  Switch models with `/model` in a session or on the command line:
  ```bash filename="Terminal"
  aider --model openai/anthropic/claude-sonnet-5
  ```

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable                | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `AIDER_OPENAI_API_KEY`  | Your AI Gateway API key. Required                  |
| `OPENAI_API_BASE`       | Not used. Aider takes the base URL from `openai-api-base` in `~/.aider.conf.yml` |

> **💡 Note:** Aider calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [Aider documentation](https://aider.chat/docs/) for editor and git workflow options

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
