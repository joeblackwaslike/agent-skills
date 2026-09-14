---
title: Junie CLI with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/junie
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/junie"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect Junie CLI to AI Gateway with the Vercel CLI or custom model profiles.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/junie.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "fccda4ffa57240ee85353c75927a785e614bd5fd1db3bf0174b3553149085101"
---

# Junie CLI with AI Gateway

[Junie](https://www.jetbrains.com/junie/) is JetBrains' coding agent, available as a CLI. It loads model profiles from `$JUNIE_HOME/models/` (default `~/.junie`), which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fjunie&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fjunie&source_site=vercel-docs&relationship=related) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fjunie&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [Aider with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/aider?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fjunie&source_site=vercel-docs&relationship=related) — Connect Aider to AI Gateway with the Vercel CLI or an OpenAI-compatible base URL, API key, and model metadata.
- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fjunie&source_site=vercel-docs&relationship=related) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/junie.graph.md](/docs/ai-gateway/coding-agents/junie.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fjunie&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Junie CLI:

```bash filename="terminal"
npx vercel ai-gateway setup --agent junie
```

The command writes a stable `vercel-ai-gateway` profile pinned to the leaderboard's top model, plus one profile per shortlisted gateway model, into `$JUNIE_HOME/models/`. Each profile contains an environment-variable reference to `AI_GATEWAY_API_KEY` that resolves when the profile loads. Re-run the command to refresh the shortlist; profiles from earlier runs stay in place.

## Configuring Junie CLI

If you can't use the Vercel CLI, configure Junie CLI manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file. Junie resolves `${AI_GATEWAY_API_KEY}` in a profile when the profile loads, so the key never lands in the file.

- ### Add a model profile
  Create `~/.junie/models/vercel-ai-gateway.json`:
  ```json filename="~/.junie/models/vercel-ai-gateway.json"
  {
    "id": "openai/gpt-6-astra",
    "displayName": "GPT-6 Astra",
    "providerName": "Vercel AI Gateway",
    "baseUrl": "https://ai-gateway.vercel.sh/coding-agent/v1/chat/completions",
    "apiType": "OpenAICompletion",
    "apiKey": "${AI_GATEWAY_API_KEY}",
    "maxContextLength": 1050000
  }
  ```
  The `id` is the gateway model the profile selects. Change it to any gateway model ID, and adjust `maxContextLength` to match.

  For a picker entry per model, write additional profile files named `vercel-<gateway-model-id>.json` (dashes replacing `/` and other punctuation), each with that model's `id` and display name. They group under **Vercel AI Gateway** in `/model` after the built-in providers.

- ### Start Junie
  ```bash filename="Terminal"
  junie --model custom:vercel-ai-gateway
  ```
  Or pick the model with `/model` in a session. The stable profile defaults to the model in its `id`.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, read through `${AI_GATEWAY_API_KEY}`. Required |
| `JUNIE_HOME`         | Overrides the profiles directory. Defaults to `~/.junie` |

> **💡 Note:** Junie prices custom profiles at 0 in its own reporting. AI Gateway shows the
> real spend per model in the dashboard.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
