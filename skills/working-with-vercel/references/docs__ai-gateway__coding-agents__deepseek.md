---
title: DeepSeek Harness with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/deepseek
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/deepseek"
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
summary: Connect DeepSeek Harness to AI Gateway with the Vercel CLI or a YAML provider and model shortlist.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/deepseek.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c0759ad428a8065a70fb26c39a6a0b5b4c93beb7d0f9a5d7b58f067c0dfd52d0"
---

# DeepSeek Harness with AI Gateway

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) is DeepSeek's terminal coding agent, built on the pi-ai LLM layer. You can configure it to use AI Gateway for unified model access and spend monitoring, while keeping its native model picker.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [OpenHands with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openhands) — Connect OpenHands to AI Gateway with the Vercel CLI or an OpenAI-compatible LLM configuration.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/deepseek.graph.md](/docs/ai-gateway/coding-agents/deepseek.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for DeepSeek Harness:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent deepseek
```

The command writes an `llm-pi-ai` section to `$DSH_HOME/settings.yaml` naming `AI_GATEWAY_API_KEY` as the key environment variable, plus a model shortlist that leads with the newest DeepSeek models and follows with the gateway's most-used models. Re-run it to refresh the shortlist.

## Configuring DeepSeek Harness

If you can't use the Vercel CLI, configure DeepSeek Harness manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Point DeepSeek Harness at the gateway
  Add the gateway provider to the `llm-pi-ai` section of `$DSH_HOME/settings.yaml` (default `~/.dsh/settings.yaml`):
  ```yaml filename="~/.dsh/settings.yaml"
  llm-pi-ai:
    providers:
      vercel-ai-gateway:
        apiKeyEnv: AI_GATEWAY_API_KEY
        models:
          - id: deepseek/deepseek-v4-flash
            name: DeepSeek V4 Flash
          - id: openai/gpt-6-astra
            name: GPT-6 Astra

  agent-default-model:
    provider: vercel-ai-gateway
    model: deepseek/deepseek-v4-flash
  ```
  The shortlist under `models` drives the picker. Replace pi-ai's full catalog with the gateway models you want, and add any gateway model ID to it. `agent-default-model` picks the model DeepSeek Harness starts with.

- ### Start DeepSeek Harness
  Open a new terminal so the key is loaded, then run:
  ```bash filename="Terminal"
  dsh
  ```
  Headless runs use the gateway route too. Switch models with `/model` in a session.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, named by `apiKeyEnv`. Required |
| `DSH_HOME`           | Overrides the harness home directory. Defaults to `~/.dsh` |

> **💡 Note:** DeepSeek Harness calls AI Gateway through the [OpenAI-compatible Chat
> Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so
> any model that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
