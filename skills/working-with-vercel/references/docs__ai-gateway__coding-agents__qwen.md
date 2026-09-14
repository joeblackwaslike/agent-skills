---
title: Qwen Code with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/qwen
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/qwen"
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
summary: Connect Qwen Code to AI Gateway with the Vercel CLI or OpenAI-compatible model provider entries.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/qwen.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "f52eaedda903b724906d7ed425faaf99d84c0e6da2663d3e75fb197f3afe19dd"
---

# Qwen Code with AI Gateway

[Qwen Code](https://github.com/QwenLM/qwen-code) is Alibaba's terminal coding agent, a fork of Gemini CLI adapted for Qwen models. Its `modelProviders.openai` entries support environment-variable keys, which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Qwen3-Coder is now supported in Vercel AI Gateway](https://vercel.com/changelog/qwen3-coder-is-now-supported-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fqwen&source_site=vercel-docs&relationship=related)
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fqwen&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fqwen&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fqwen&source_site=vercel-docs&relationship=related) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fqwen&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Kilo Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fqwen&source_site=vercel-docs&relationship=related) — Connect Kilo Code to AI Gateway with the Vercel CLI or an OpenAI-compatible provider configuration. Set your API key and

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/qwen.graph.md](/docs/ai-gateway/coding-agents/qwen.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fqwen&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Qwen Code:

```bash filename="terminal"
npx vercel ai-gateway setup --agent qwen
```

The command writes `modelProviders.openai` entries in `~/.qwen/settings.json`, each with an `envKey` reference to `AI_GATEWAY_API_KEY` so the key never lands in the file. The entries list the newest Qwen models first, followed by the gateway's most-used models. Re-run the command to refresh the list.

## Configuring Qwen Code

If you can't use the Vercel CLI, configure Qwen Code manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Add the model providers
  Add the gateway entries to `~/.qwen/settings.json`:
  ```json filename="~/.qwen/settings.json"
  {
    "modelProviders": {
      "openai": [
        {
          "id": "openai/gpt-6-astra",
          "name": "openai/gpt-6-astra",
          "baseUrl": "https://ai-gateway.vercel.sh/coding-agent/v1",
          "envKey": "AI_GATEWAY_API_KEY"
        },
        {
          "id": "anthropic/claude-sonnet-5",
          "name": "anthropic/claude-sonnet-5",
          "baseUrl": "https://ai-gateway.vercel.sh/coding-agent/v1",
          "envKey": "AI_GATEWAY_API_KEY"
        }
      ]
    },
    "security": {
      "auth": {
        "selectedType": "openai"
      }
    },
    "model": {
      "name": "openai/gpt-6-astra"
    }
  }
  ```
  The `openai` array defines the whole model universe. `model.name` resolves against it, so add one entry per gateway model you want available. `envKey` names the environment variable holding your key. Setting `security.auth.selectedType` to `"openai"` switches Qwen Code off its default Qwen OAuth login.

- ### Start Qwen Code
  Open a new terminal so the key is loaded, then run:
  ```bash filename="Terminal"
  qwen
  ```
  Switch models in-session.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, named by `envKey`. Required |

> **💡 Note:** Qwen Code calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [Qwen Code documentation](https://github.com/QwenLM/qwen-code) for commands and configuration


---

[View full sitemap](/docs/sitemap)
