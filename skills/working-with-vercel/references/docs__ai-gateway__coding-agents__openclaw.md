---
title: OpenClaw
product: vercel
url: /docs/ai-gateway/coding-agents/openclaw
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/openclaw"
last_updated: 2026-08-12
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Use OpenClaw with the AI Gateway as a model provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/openclaw.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "0a04827cbe5c3e30846f7b2a8d6d5a1cf6d7a35c6925c9828a7ba2997f813921"
---

# OpenClaw

[OpenClaw](https://github.com/openclaw/openclaw) is a self-hosted gateway that connects chat apps to coding agents. Add AI Gateway as a model provider so every agent it runs shares one key, one catalog, and one spend view.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=related)
- [OpenClaw \\(Clawdbot\\)](https://vercel.com/docs/ai-gateway/chat-platforms/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use OpenClaw \\(formerly Clawdbot\\) with AI Gateway.
- [Use AI Gateway with Clawdbot](https://vercel.com/changelog/use-ai-gateway-with-clawdbot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=related)
- [Chat Platforms](https://vercel.com/docs/ai-gateway/chat-platforms?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=related) — Configure AI chat platforms to use the AI Gateway for unified model access and spend monitoring.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use OpenCode with the AI Gateway.
- [Cline](https://vercel.com/docs/ai-gateway/coding-agents/cline?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use Cline with the AI Gateway.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/openclaw.graph.md](/docs/ai-gateway/coding-agents/openclaw.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenclaw&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** The Vercel CLI is the recommended way to set this up. [`vercel ai-gateway
>   coding-agents setup --agent openclaw`](/docs/cli/ai-gateway#setup) provisions
> a key, adds the provider and a starter model list to
> `~/.openclaw/openclaw.json`, and exports `AI_GATEWAY_API_KEY` from a managed
> block in your shell startup file.

## Configuring OpenClaw

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Add the key to your shell configuration file, for example `~/.zshrc` or `~/.bashrc`:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```

- ### Add the provider
  OpenClaw reads `~/.openclaw/openclaw.json`. Add the gateway under `models.providers`:
  ```json filename="~/.openclaw/openclaw.json"
  {
    "models": {
      "providers": {
        "vercel-ai-gateway": {
          "baseUrl": "https://ai-gateway.vercel.sh/coding-agent/v1",
          "apiKey": "${AI_GATEWAY_API_KEY}",
          "api": "openai-completions",
          "models": [
            { "id": "anthropic/claude-opus-5", "name": "Claude Opus 5 (Gateway)" },
            { "id": "openai/gpt-5.6-sol", "name": "GPT-5.6 Sol (Gateway)" },
            { "id": "google/gemini-3.6-flash", "name": "Gemini 3.6 Flash (Gateway)" }
          ]
        }
      }
    },
    "agents": {
      "defaults": {
        "model": {
          "primary": "vercel-ai-gateway/anthropic/claude-opus-5"
        }
      }
    }
  }
  ```
  The `${...}` reference is OpenClaw's own environment syntax, resolved when it loads the config, so your key stays out of the file.

  `https://ai-gateway.vercel.sh/coding-agent/v1` is the [coding agent surface](/docs/cli/ai-gateway#the-coding-agent-surface), the default base URL for agents that have no dedicated endpoint. It's the same URL the setup command writes.
  > **💡 Note:** Only models declared in the provider's `models` array are routable, so add
  > any gateway model you want to use. Browse the [models
  > catalog](/ai-gateway/models) for IDs.

- ### Reload OpenClaw
  OpenClaw watches its config file and applies most changes on its own. If the new provider doesn't show up, restart the gateway process.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Read OpenClaw's [model provider documentation](https://docs.openclaw.ai/gateway/configuration)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Connect your other agents with the [Vercel CLI](/docs/cli/ai-gateway#setup)


---

[View full sitemap](/docs/sitemap)
