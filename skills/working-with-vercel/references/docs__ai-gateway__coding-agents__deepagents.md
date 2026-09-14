---
title: Deep Agents CLI with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/deepagents
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/deepagents"
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
summary: Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/deepagents.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "30e711c3132bad1be3e3e43d9e7626be7288572f78063f576a8b3e65fa26e2b3"
---

# Deep Agents CLI with AI Gateway

[Deep Agents CLI](https://github.com/langchain-ai/deepagents) is LangChain's terminal coding agent built on the deepagents framework. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdeepagents&source_site=vercel-docs&relationship=related)
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdeepagents&source_site=vercel-docs&relationship=related) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [DeepSeek Harness with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepseek?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdeepagents&source_site=vercel-docs&relationship=related) — Connect DeepSeek Harness to AI Gateway with the Vercel CLI or a YAML provider and model shortlist.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdeepagents&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [gptme with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/gptme?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdeepagents&source_site=vercel-docs&relationship=related) — Connect gptme to AI Gateway with the Vercel CLI or a TOML provider configuration.
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdeepagents&source_site=vercel-docs&relationship=related) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/deepagents.graph.md](/docs/ai-gateway/coding-agents/deepagents.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fdeepagents&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Deep Agents CLI:

```bash filename="terminal"
npx vercel ai-gateway setup --agent deepagents
```

The command writes a `vercel-ai-gateway` provider into `~/.deepagents/config.toml` with `api_key_env` naming `AI_GATEWAY_API_KEY`, a `/model` switcher shortlist in leaderboard spend order, and per-model profile tables carrying display names and token limits. Re-run it to refresh the shortlist.

## Configuring Deep Agents CLI

If you can't use the Vercel CLI, configure Deep Agents CLI manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Export the key in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key, add the same line to your shell's startup file.

- ### Point Deep Agents at the gateway
  Add a `vercel-ai-gateway` provider to `~/.deepagents/config.toml`:
  ```toml filename="~/.deepagents/config.toml"
  [models]
  default = "vercel-ai-gateway:openai/gpt-6-astra"

  [models.providers.vercel-ai-gateway]
  display_name = "Vercel AI Gateway"
  api_key_env = "AI_GATEWAY_API_KEY"
  base_url = "https://ai-gateway.vercel.sh/coding-agent/v1"
  class_path = "langchain_openai:ChatOpenAI"
  models = ["openai/gpt-6-astra", "anthropic/claude-sonnet-5"]

  [models.providers.vercel-ai-gateway.params]
  use_responses_api = false
  ```
  The `models` array feeds the `/model` switcher rather than gating requests, so any gateway model ID works. `class_path` selects LangChain's OpenAI chat client, and `use_responses_api = false` keeps requests on Chat Completions.

- ### Start Deep Agents
  Open a new terminal so the key is loaded, then run:
  ```bash filename="Terminal"
  dcode
  ```
  The `/model` switcher filters as you type. Use any other gateway model directly with `/model vercel-ai-gateway:<gateway-model-id>`.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `AI_GATEWAY_API_KEY` | Your AI Gateway API key, named by `api_key_env`. Required |

> **💡 Note:** Deep Agents calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Read the [deepagents documentation](https://github.com/langchain-ai/deepagents) for subagents and tools


---

[View full sitemap](/docs/sitemap)
