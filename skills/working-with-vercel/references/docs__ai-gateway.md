---
title: AI Gateway
product: vercel
url: /docs/ai-gateway
canonical_url: "https://vercel.com/docs/ai-gateway"
last_updated: 2026-08-27
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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "7f8bfa5307d6f859a0a7c3e7e4846962753f5d128a9a6de206e5d2d50fa202b1"
---

# AI Gateway

> **🔒 Permissions Required**: AI Gateway


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [Agent configuration (agent.ts)](https://eve.dev/docs/agent-config?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Configure an eve agent's model, reasoning effort, compaction, limits, and runtime behavior in agent.ts.
- [Deployment](https://eve.dev/docs/guides/deployment/overview?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Choose a deployment strategy and prepare an eve agent for production.
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [AI Gateway and one-click deploys now available on TRAE](https://vercel.com/changelog/ai-gateway-and-one-click-deploys-now-available-on-trae?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [AI Gateway is now in Beta](https://vercel.com/changelog/ai-gateway-is-now-in-beta?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [Auto-recharge available in AI Gateway](https://vercel.com/changelog/auto-recharge-available-in-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [Claude Opus 4.1 is now supported in Vercel AI Gateway](https://vercel.com/changelog/claude-4-1-opus-is-now-supported-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [Build an AI Chat Agent with Weather API Tool Calling](https://vercel.com/kb/guide/build-ai-agent-weather-api?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Build an intelligent conversational agent that fetches real-time weather data using the AI SDK, tool calling, and a back

Full cross-link map for this page: [/docs/ai-gateway.graph.md](/docs/ai-gateway.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

AI Gateway works with the [AI SDK](/docs/ai-gateway/getting-started), [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or your [preferred framework](/docs/ai-gateway/ecosystem/framework-integrations).

## What AI Gateway provides

- **One key, hundreds of models.** Access models from multiple providers with a single API key
- **Unified API.** Switch between providers and models with minimal code changes
- **High reliability.** Automatically retries requests to other providers if one fails
- **Embeddings support.** Generate vector embeddings for search, retrieval, and other tasks
- **Spend monitoring.** Monitor your spending across different providers
- **No markup on tokens.** Tokens cost the same as they would from the provider directly, with zero markup, including with [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok)

## Get started and learn more

Use the resources below to configure AI Gateway, or browse the [AI Gateway guides](/kb/ai-gateway) for implementation patterns, templates, and troubleshooting.

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
