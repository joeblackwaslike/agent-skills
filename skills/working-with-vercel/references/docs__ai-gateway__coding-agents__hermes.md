---
title: Hermes
product: vercel
url: /docs/ai-gateway/coding-agents/hermes
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/hermes"
last_updated: 2026-07-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/observability-and-spend/api-key-budgets
summary: Use the Hermes agent with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/hermes.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "64a2f3ebd53bdbec8eed83f1aebc214b2530c44c560547ba1927116160915296"
---

# Hermes

[Hermes](https://github.com/NousResearch/hermes-agent) is Nous Research's terminal-based coding agent. It ships an AI Gateway provider, so you can reach every model in the gateway catalog from Hermes with one API key and track spend in one place.

## Configuring Hermes

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add the key to Hermes
  Hermes reads `AI_GATEWAY_API_KEY` from your environment and from `~/.hermes/.env`. Export it in your shell:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  To persist the key across sessions, add the same line to `~/.hermes/.env` instead.

- ### Select AI Gateway as your provider
  Run the model picker:
  ```bash filename="Terminal"
  hermes model
  ```
  Choose **Vercel AI Gateway**, then pick a model. Hermes fetches the live catalog with current pricing from the gateway, filtered to language models that support tool calling. Image, video, embedding, and reranking models from the [models page](/ai-gateway/models) don't appear in the picker.

- ### Start Hermes
  You can also skip the picker and name the provider and model directly:
  ```bash filename="Terminal"
  hermes --provider ai-gateway -m openai/gpt-5.6-sol
  ```
  The provider ID is `ai-gateway`. Hermes also accepts `vercel` and `vercel-ai-gateway` as aliases. Model IDs use the gateway's `creator/model-name` format.

- ### (Optional) Set a fallback provider
  Hermes supports `ai-gateway` in fallback chains. Add it to `fallback_model` in `~/.hermes/config.yaml`, or run `hermes fallback` to configure it interactively. When a fallback activates, Hermes swaps the model and provider mid-session without losing your conversation.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

  Hermes identifies itself to the gateway, so its requests are attributable in your analytics.

## Environment variables

| Variable              | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `AI_GATEWAY_API_KEY`  | Your AI Gateway API key. Required                                             |
| `AI_GATEWAY_BASE_URL` | Overrides the gateway base URL. Defaults to `https://ai-gateway.vercel.sh/v1` |

> **💡 Note:** Hermes calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Learn about [model routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/api-key-budgets) on your API key


---

[View full sitemap](/docs/sitemap)
