---
title: Zed with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/zed
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/zed"
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
summary: Connect Zed to AI Gateway with the Vercel CLI or its built-in Vercel AI Gateway provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/zed.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "768ef9b11dec162180e83fcfb4cc130c70b9996eaa5a3376d95cd99b07870c25"
---

# Zed with AI Gateway

[Zed](https://zed.dev) is a high-performance code editor with a built-in agent panel. It ships a first-party `vercel_ai_gateway` language model provider, so the gateway catalog loads into its model picker with no provider definition of your own.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzed&source_site=vercel-docs&relationship=related) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzed&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzed&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Qwen Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/qwen?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzed&source_site=vercel-docs&relationship=related) — Connect Qwen Code to AI Gateway with the Vercel CLI or OpenAI-compatible model provider entries.
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzed&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/zed.graph.md](/docs/ai-gateway/coding-agents/zed.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzed&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Zed:

```bash filename="terminal"
npx vercel ai-gateway setup --agent zed
```

The command configures Zed's first-party `vercel_ai_gateway` provider in its JSONC `settings.json` with a comment-preserving merge, points it at the gateway's coding-agent endpoint, sets the Agent Panel default model, and exports `VERCEL_AI_GATEWAY_API_KEY` from a managed block in your shell startup file so the key stays out of the settings file.

## Configuring Zed

If you can't use the Vercel CLI, configure Zed manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Zed reads the provider key from the environment. Export it in your shell:
  ```bash filename="Terminal"
  export VERCEL_AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file. **Settings** > **AI** > **LLM Providers** also accepts the key directly if you'd rather paste it.

- ### Configure the provider
  Add the provider to Zed's `settings.json` (open it with `zed: open settings` in the command palette):
  ```jsonc filename="settings.json"
  {
    "language_models": {
      "vercel_ai_gateway": {
        "api_url": "https://ai-gateway.vercel.sh/coding-agent/v1",
        "available_models": [
          {
            "name": "openai/gpt-6-astra",
            "display_name": "GPT-6 Astra",
            "max_tokens": 1050000,
            "max_output_tokens": 128000,
            "capabilities": {
              "tools": true,
              "images": true
            }
          }
        ]
      }
    },
    "agent": {
      "default_model": {
        "provider": "vercel_ai_gateway",
        "model": "openai/gpt-6-astra"
      }
    }
  }
  ```
  Zed's settings are JSONC, so comments in your existing file are preserved when you add this. The `available_models` entry seeds the picker. Once the key is visible to Zed, the full gateway catalog loads from `/models` and you can trim the starter entry.

- ### Start Zed and pick a model
  Launch Zed from a new terminal so the key is in its environment, then open the Agent Panel and pick a gateway model. `agent.default_model` sets the one the panel starts with.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable                     | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `VERCEL_AI_GATEWAY_API_KEY`  | Your AI Gateway API key. Required                 |
| `ZED_HOME`                   | Overrides Zed's config directory on macOS and Linux |

> **💡 Note:** Zed calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [Zed documentation](https://zed.dev/docs/ai/llm-providers) for agent panel options


---

[View full sitemap](/docs/sitemap)
