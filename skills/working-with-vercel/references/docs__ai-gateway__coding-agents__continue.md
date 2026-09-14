---
title: Continue CLI with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/continue
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/continue"
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
summary: Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/continue.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "f329d52ecb6b7fb3654427931732fb6681e103716d073f0a1eb8268633a732a0"
---

# Continue CLI with AI Gateway

[Continue](https://continue.dev) is an open-source AI coding agent with a CLI (`cn`) and IDE extensions. You can configure the CLI to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcontinue&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcontinue&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcontinue&source_site=vercel-docs&relationship=related) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcontinue&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Cline with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/cline?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcontinue&source_site=vercel-docs&relationship=related) — Connect Cline to AI Gateway through the Vercel CLI or VS Code settings. Configure model access and monitor usage and spe

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/continue.graph.md](/docs/ai-gateway/coding-agents/continue.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcontinue&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Continue CLI:

```bash filename="terminal"
npx vercel ai-gateway setup --agent continue
```

The command writes a shortlist of the gateway's most-used models into `~/.continue/config.yaml` in leaderboard spend order, references the key through Continue's secrets syntax, and stamps the onboarding marker so an interactive `cn` doesn't rewrite the config. Re-run it to refresh the shortlist.

## Configuring Continue CLI

If you can't use the Vercel CLI, configure Continue CLI manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Continue resolves its secrets syntax from environment variables. Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Point Continue at the gateway
  Add a gateway model to the `models` array in `~/.continue/config.yaml`:
  ```yaml filename="~/.continue/config.yaml"
  name: Local Config
  version: 1.0.0
  schema: v1
  models:
    - name: openai/gpt-6-astra
      provider: openai
      model: openai/gpt-6-astra
      apiBase: https://ai-gateway.vercel.sh/coding-agent/v1
      apiKey: ${{ secrets.AI_GATEWAY_API_KEY }}
  ```
  `apiKey: ${{ secrets.AI_GATEWAY_API_KEY }}` is Continue's literal secrets syntax. It resolves the `AI_GATEWAY_API_KEY` environment variable at runtime, so the key never lands in the file. `cn` launches with the first entry in the list, so put your preferred model first.

- ### Skip the onboarding prompt
  If `cn` has never run before, create the onboarding marker next to the config so the interactive onboarding doesn't rewrite your models:
  ```bash filename="Terminal"
  touch ~/.continue/.onboarding_complete
  ```
  If `cn` ever asks for an Anthropic API key, the marker is missing. Re-create the marker instead of answering the prompt, which would overwrite the gateway models.

- ### Start Continue
  ```bash filename="Terminal"
  cn
  ```
  Switch models with `/model`. Add more gateway models to the `models` array the same way, each with the same `apiBase` and secrets reference.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, read through `${{ secrets.AI_GATEWAY_API_KEY }}`. Required |

> **💡 Note:** Continue calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [Continue documentation](https://docs.continue.dev) for IDE extensions and rules


---

[View full sitemap](/docs/sitemap)
