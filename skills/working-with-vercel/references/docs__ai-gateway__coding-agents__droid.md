---
title: Factory Droid with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/droid
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/droid"
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
summary: Connect Factory Droid to AI Gateway with the Vercel CLI or bring-your-own-key custom model entries.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/droid.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "7d80897d67270e27c57fe8d55312fed5d82c2026500618fc9dbbba8a17e9ccf5"
---

# Factory Droid with AI Gateway

[Factory Droid](https://factory.ai) is Factory's terminal coding agent. It supports bring-your-own-key custom models, which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdroid&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [ForgeCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/forge?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdroid&source_site=vercel-docs&relationship=related) — Connect ForgeCode to AI Gateway with the Vercel CLI or custom provider and credential files.
- [Aider with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/aider?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdroid&source_site=vercel-docs&relationship=related) — Connect Aider to AI Gateway with the Vercel CLI or an OpenAI-compatible base URL, API key, and model metadata.
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdroid&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdroid&source_site=vercel-docs&relationship=related) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/droid.graph.md](/docs/ai-gateway/coding-agents/droid.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdroid&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Factory Droid:

```bash filename="terminal"
npx vercel ai-gateway setup --agent droid
```

The command writes BYOK `customModels` entries into `~/.factory/settings.json` referencing `AI_GATEWAY_API_KEY` through Droid's environment-variable syntax, with a picker shortlist of the top gateway models ranked by leaderboard spend. Re-run it to refresh the list.

## Configuring Factory Droid

If you can't use the Vercel CLI, configure Factory Droid manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file. Droid resolves `${AI_GATEWAY_API_KEY}` in its settings at load time, so the key never lands in the file.

- ### Add custom models to Droid
  Add BYOK entries to `~/.factory/settings.json`:
  ```json filename="~/.factory/settings.json"
  {
    "customModels": [
      {
        "model": "openai/gpt-6-astra",
        "displayName": "openai/gpt-6-astra",
        "baseUrl": "https://ai-gateway.vercel.sh/coding-agent/v1",
        "apiKey": "${AI_GATEWAY_API_KEY}",
        "provider": "generic-chat-completion-api",
        "maxOutputTokens": 128000
      }
    ]
  }
  ```
  `customModels` defines the whole `/model` picker. Droid does no model discovery, so add one entry per gateway model you want available, each with its own `maxOutputTokens`.

- ### Start Droid
  ```bash filename="Terminal"
  droid
  ```
  Pick a model with `/model` in a session. For headless runs, always pass a gateway model:
  ```bash filename="Terminal"
  droid exec -m openai/gpt-6-astra
  ```
  `droid exec` defaults to a Factory-hosted model that your gateway key can't use, so name a gateway model explicitly.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, read through `${AI_GATEWAY_API_KEY}`. Required |

> **💡 Note:** Droid calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [Factory documentation](https://docs.factory.ai) for Droid options


---

[View full sitemap](/docs/sitemap)
