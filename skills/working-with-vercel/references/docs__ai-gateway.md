---
title: AI Gateway
product: vercel
url: /docs/ai-gateway
canonical_url: "https://vercel.com/docs/ai-gateway"
last_updated: 2026-05-30
type: integration
prerequisites:
  []
related:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/ecosystem/framework-integrations
summary: AI Gateway provides a unified API to access hundreds of AI models through a single endpoint, with built-in budgets, usage monitoring, and fallbacks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "0ac4f686ca6d88781425adee928100a2a96f911694339789085012aa1912b79b"
---

# AI Gateway

> **🔒 Permissions Required**: AI Gateway

AI Gateway works with [AI SDK v5 and v6](/docs/ai-gateway/getting-started), [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or your [preferred framework](/docs/ai-gateway/ecosystem/framework-integrations).

## What AI Gateway provides

- **One key, hundreds of models.** Access models from multiple providers with a single API key
- **Unified API.** Switch between providers and models with minimal code changes
- **High reliability.** Automatically retries requests to other providers if one fails
- **Embeddings support.** Generate vector embeddings for search, retrieval, and other tasks
- **Spend monitoring.** Monitor your spending across different providers
- **No markup on tokens.** Tokens cost the same as they would from the provider directly, with zero markup, including with [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok)

## Get started and learn more

**Getting started**: Make your first request to AI Gateway with the AI SDK. [Learn more →](/docs/ai-gateway/getting-started)

**Models and providers**: Browse hundreds of models from leading providers. [Learn more →](/docs/ai-gateway/models-and-providers)

**Provider options**: Configure routing, fallbacks, and provider preferences. [Learn more →](/docs/ai-gateway/models-and-providers/provider-options)

**Web search**: Augment model responses with real-time web search. [Learn more →](/docs/ai-gateway/models-and-providers/web-search)

**Observability**: Monitor usage, latency, and spend across providers. [Learn more →](/docs/ai-gateway/observability-and-spend/observability)

**Coding Agents**: Build coding agents on top of AI Gateway. [Learn more →](/docs/ai-gateway/coding-agents)

**Anthropic compatibility**: Use the Anthropic Messages API through AI Gateway. [Learn more →](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)

**OpenAI compatibility**: Use the OpenAI Chat Completions API through AI Gateway. [Learn more →](/docs/ai-gateway/sdks-and-apis/openai-chat-completions)

**Disallow prompt training**: Control whether your prompts can be used for training. [Learn more →](/docs/ai-gateway/security-and-compliance/disallow-prompt-training)

**Usage and billing**: Understand pricing, usage metrics, and billing. [Learn more →](/docs/ai-gateway/observability-and-spend/usage)

**Authentication**: Authenticate requests with API keys or OIDC tokens. [Learn more →](/docs/ai-gateway/authentication-and-byok/authentication)

**Bring your own key**: Use your own provider keys with AI Gateway. [Learn more →](/docs/ai-gateway/authentication-and-byok/byok)

**Framework integrations**: Use AI Gateway with your preferred framework. [Learn more →](/docs/ai-gateway/ecosystem/framework-integrations)

**App attribution**: Track which apps are making requests through AI Gateway. [Learn more →](/docs/ai-gateway/ecosystem/app-attribution)


---

[View full sitemap](/docs/sitemap)
