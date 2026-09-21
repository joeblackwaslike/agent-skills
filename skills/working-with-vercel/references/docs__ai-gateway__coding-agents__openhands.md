---
title: OpenHands with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/openhands
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/openhands"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect OpenHands to AI Gateway with the Vercel CLI or an OpenAI-compatible LLM configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/openhands.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "e3a7be82549ba6e68fe90e89130c00171aa7381580afa56e286378c0b36cfc9d"
---

# OpenHands with AI Gateway

[OpenHands](https://github.com/All-Hands-AI/OpenHands) is an open-source AI coding agent with an interactive app and headless mode. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenhands&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenhands&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenhands&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenhands&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenhands&source_site=vercel-docs&relationship=related) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/openhands.graph.md](/docs/ai-gateway/coding-agents/openhands.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenhands&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for OpenHands:

```bash filename="terminal"
npx vercel ai-gateway setup --agent openhands
```

The command writes a minimal `llm` block into `~/.openhands/agent_settings.json` pointing at the gateway with an `openai/`-prefixed model ID, repoints an existing condenser LLM the same way, and fills the pinned model's per-token cost fields from the gateway catalog.

## Configuring OpenHands

If you can't use the Vercel CLI, configure OpenHands manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add the LLM block
  OpenHands keeps agent settings in `~/.openhands/agent_settings.json`. Add an `llm` block pointing at the gateway:
  ```json filename="~/.openhands/agent_settings.json"
  {
    "llm": {
      "usage_id": "agent",
      "model": "openai/openai/gpt-6-astra",
      "api_key": "your-ai-gateway-api-key",
      "base_url": "https://ai-gateway.vercel.sh/coding-agent/v1"
    }
  }
  ```
  The `openai/` prefix tells OpenHands to speak the OpenAI protocol; the rest is the gateway's `creator/model-name` slug, so `openai/openai/gpt-6-astra` means the gateway model `openai/gpt-6-astra`. The key is stored in this file, so create it with mode `0600`:
  ```bash filename="Terminal"
  chmod 0600 ~/.openhands/agent_settings.json
  ```

- ### Repoint the condenser LLM
  If you use a condenser for context compression, give it the same provider so its summarization calls also route through the gateway:
  ```json filename="~/.openhands/agent_settings.json"
  {
    "condenser": {
      "llm": {
        "model": "openai/openai/gpt-6-astra",
        "api_key": "your-ai-gateway-api-key",
        "base_url": "https://ai-gateway.vercel.sh/coding-agent/v1"
      }
    }
  }
  ```

- ### Start OpenHands
  Headless runs pick this up automatically, with no `--override-with-envs` needed:
  ```bash filename="Terminal"
  openhands
  ```
  Switch models in `/settings` with `openai/<gateway-model-id>`.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Not read by OpenHands itself. The key lives in `agent_settings.json` |

> **⚠️ Warning:** The API key is stored in `agent_settings.json`. Keep the file mode at
> `0600`.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [OpenHands documentation](https://docs.all-hands.dev) for headless runs and configuration


---

[View full sitemap](/docs/sitemap)
