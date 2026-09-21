---
title: ZCode with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/zcode
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/zcode"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/zcode.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "2ef6c255a4a95dbcf30878c2e62ca6fd8d0e8aae7d295e02ac0bf2883d300898"
---

# ZCode with AI Gateway

[ZCode](https://z.ai) is Z.ai's desktop agent development environment. Its custom providers speak the OpenAI-compatible Chat Completions format, which you can point at AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Zed with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zed?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzcode&source_site=vercel-docs&relationship=related) — Connect Zed to AI Gateway with the Vercel CLI or its built-in Vercel AI Gateway provider.
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzcode&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzcode&source_site=vercel-docs&relationship=related) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [Qwen Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/qwen?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzcode&source_site=vercel-docs&relationship=related) — Connect Qwen Code to AI Gateway with the Vercel CLI or OpenAI-compatible model provider entries.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzcode&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/zcode.graph.md](/docs/ai-gateway/coding-agents/zcode.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fzcode&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Quit ZCode, then run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup):

```bash filename="terminal"
npx vercel ai-gateway setup --agent zcode
```

The command writes a gateway provider and a seeded model list into `~/.zcode/v2/config.json` with `0600` permissions. Re-run it to refresh the model list.

## Configuring ZCode

If you can't use the Vercel CLI, configure ZCode manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Quit ZCode
  Quit the ZCode desktop app before editing its config. ZCode keeps its provider registry in memory and rewrites `~/.zcode/v2/config.json` when it saves settings or exits, silently discarding edits made while it runs.

- ### Add the gateway provider
  Add the provider to `~/.zcode/v2/config.json` under `provider`, with the API format on **Chat completions**:
  ```json filename="~/.zcode/v2/config.json"
  {
    "provider": {
      "vercel-ai-gateway": {
        "name": "Vercel AI Gateway",
        "kind": "openai-compatible",
        "options": {
          "apiKey": "your-ai-gateway-api-key",
          "baseURL": "https://ai-gateway.vercel.sh/coding-agent/v1",
          "apiKeyRequired": true
        },
        "source": "custom",
        "models": {
          "openai/gpt-6-astra": {
            "limit": { "context": 1000000, "output": 128000 }
          }
        }
      }
    }
  }
  ```
  ZCode has no environment-variable lookup for custom providers, so the key is stored in this file. Create it with mode `0600`.

- ### Start ZCode and pick a model
  Open ZCode and pick a model under **Vercel AI Gateway** in the chat's model picker. Add more gateway models with **Manage models** > **Add model**.

  On a fresh install, choose **Skip for now** on ZCode's welcome screen. Its API-key dropdown only takes Z.ai/BigModel accounts, and the gateway provider lives in **Settings** > **Model settings**.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Notes

> **⚠️ Warning:** The API key is stored in `~/.zcode/v2/config.json`. Keep the file mode at
> `0600`.

> **💡 Note:** Keep the API format on Chat completions. ZCode's Anthropic-messages format
> sends a legacy thinking parameter that current Claude models reject.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
