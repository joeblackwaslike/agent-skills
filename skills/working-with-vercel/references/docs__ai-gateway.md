---
title: AI Gateway
product: vercel
url: /docs/ai-gateway
canonical_url: "https://vercel.com/docs/ai-gateway"
last_updated: 2026-07-28
type: integration
prerequisites:
  []
related:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/ecosystem/framework-integrations
summary: AI Gateway provides a unified API to access hundreds of AI models through a single endpoint, with text, image, and video generation, embeddings, and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f28a7ea52191d8b86febbe126d01e557840c34ca10e02f8eb83a2d9f7a4bef54"
---

# AI Gateway

> **🔒 Permissions Required**: AI Gateway


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related)
- [Agent configuration (agent.ts)](https://eve.dev/docs/agent-config?from=related) — Configure an eve agent's model, reasoning effort, compaction, limits, and runtime behavior in agent.ts.
- [Deployment](https://eve.dev/docs/guides/deployment/overview?from=related) — Choose a deployment strategy and prepare an eve agent for production.
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide?from=related) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect?from=related) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [Build an AI Chat Agent with Weather API Tool Calling](https://vercel.com/kb/guide/build-ai-agent-weather-api?from=related) — Build an intelligent conversational agent that fetches real-time weather data using the AI SDK, tool calling, and a back
- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Cloudflare AI Gateway](https://ai-sdk.dev/providers/community-providers/cloudflare-ai-gateway?from=related)
- [Adding a Model](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-model?from=related) — Learn how to add a new AI model to your Vercel projects
- [Integrations for Models](https://vercel.com/docs/agent-resources/integrations-for-models?from=related) — Integrate powerful AI services and models seamlessly into your Vercel projects.

Full cross-link map for this page: [/docs/ai-gateway.graph.md](/docs/ai-gateway.graph.md)
<!-- /docsgraph:related -->

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

**Authentication**: Authenticate requests with API keys or OIDC tokens. [Learn more →](/docs/ai-gateway/authentication-and-byok)

**Bring your own key**: Use your own provider keys with AI Gateway. [Learn more →](/docs/ai-gateway/authentication-and-byok/byok)

**Framework integrations**: Use AI Gateway with your preferred framework. [Learn more →](/docs/ai-gateway/ecosystem/framework-integrations)

**App attribution**: Track which apps are making requests through AI Gateway. [Learn more →](/docs/ai-gateway/ecosystem/app-attribution)


---

[View full sitemap](/docs/sitemap)
