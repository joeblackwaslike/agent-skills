---
title: "Vercel AI Gateway: Models, Routing, and Observability"
product: vercel
url: /docs/ai-gateway
canonical_url: "https://vercel.com/docs/ai-gateway"
last_updated: 2026-09-14
type: integration
prerequisites:
  []
related:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
summary: Call AI models from any infrastructure through a managed gateway. Centralize credentials, request logs, spend budgets, routing, and provider failover.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "b461538884da0ab9816ff6c60b24f77543824d5eae385191fed06600af8ffed8"
---

# Vercel AI Gateway: Models, Routing, and Observability

## Call AI models across providers with Vercel AI Gateway

Use one managed gateway from any infrastructure to centralize credentials, log requests, control spend, and fail over across providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway: Production-ready reliability for your AI apps](https://vercel.com/blog/ai-gateway-is-now-generally-available?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [TanStack AI](https://chat-sdk.dev/docs/ai/tanstack-ai?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Feed thread history into TanStack AI's chat() and give it Chat SDK tools, with no runtime dependency on @tanstack/ai.
- [Agent configuration (agent.ts)](https://eve.dev/docs/agent-config?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Configure an eve agent's model, reasoning effort, compaction, limits, and runtime behavior in agent.ts.
- [Deployment](https://eve.dev/docs/guides/deployment/overview?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Choose a deployment strategy and prepare an eve agent for production.
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [AI Gateway and one-click deploys now available on TRAE](https://vercel.com/changelog/ai-gateway-and-one-click-deploys-now-available-on-trae?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [AI Gateway is now in Beta](https://vercel.com/changelog/ai-gateway-is-now-in-beta?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [Auto-recharge available in AI Gateway](https://vercel.com/changelog/auto-recharge-available-in-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [Claude Opus 4.1 is now supported in Vercel AI Gateway](https://vercel.com/changelog/claude-4-1-opus-is-now-supported-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related)
- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=related) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on

Full cross-link map for this page: [/docs/ai-gateway.graph.md](/docs/ai-gateway.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### AI SDK

```typescript filename="index.mts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Explain AI Gateway in one sentence.',
});

console.log(text);
```

#### cURL

```bash filename="terminal"
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "messages": [
      {
        "role": "user",
        "content": "Explain AI Gateway in one sentence."
      }
    ]
  }'
```

> **🔒 Permissions Required**: AI Gateway

## Use AI Gateway across modalities and clients

Vercel AI Gateway gives applications and coding agents shared access to models across providers. It supports [modalities](/docs/ai-gateway/modalities) including text generation, image generation, video generation, speech, transcription, realtime, embeddings, and reranking. Add [files and tool calls](/docs/ai-gateway/inputs-and-tools) where the selected model supports them.

Call AI Gateway from any environment with the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk), [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), a [supported coding agent](/docs/ai-gateway/coding-agents), or a [framework integration](/docs/ai-gateway/ecosystem/framework-integrations).

AI Gateway routes requests across providers and fallback models, then records status, provider, latency, token usage, cost, and every routing attempt. To prefer an inference provider and verify which provider served the request, [set a provider order and read the response metadata](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering#provider-ordering). Configure [budgets](/docs/ai-gateway/observability-and-spend/budgets), access policies, data handling, and [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok) for your team. AI Gateway adds zero markup to provider token prices, including with BYOK.

## Centralize multi-provider AI operations

Your application does not need to run on Vercel. Call AI Gateway from any server, cloud, or local environment with an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys). Vercel deployments can use [OpenID Connect (OIDC)](/docs/ai-gateway/authentication-and-byok/oidc) instead.

Use AI Gateway when you want these controls without operating your own proxy, database, and routing control plane:

| Requirement | How AI Gateway handles it |
| --- | --- |
| Centralized credentials | Authenticate your application once, then use AI Gateway system credentials or your own provider accounts through [BYOK](/docs/ai-gateway/authentication-and-byok/byok). |
| Request logging | Inspect each request's model, provider attempts, latency, token usage, status, and cost in [request logs](/docs/ai-gateway/observability-and-spend/logs). |
| Spending controls | Set [budgets](/docs/ai-gateway/observability-and-spend/budgets) for a team, project, API key, or team member. AI Gateway rejects new system-credential requests after an applicable budget is exceeded. |
| Provider failover | Route a model across healthy providers and configure ordered [provider](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) and [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks). |

Budgets cover spend billed through AI Gateway system credentials. BYOK spend is metered separately and does not count toward those limits. If a BYOK request fails, AI Gateway can fall back to system credentials. Review the [BYOK behavior](/docs/ai-gateway/authentication-and-byok/byok) and [soft-cap budget semantics](/docs/ai-gateway/observability-and-spend/budgets#how-budgets-work) when strict provider-account use or zero-overshoot limits are requirements.

## Choose how to start

**Make your first request**: Start with a coding agent, cURL, TypeScript, or Python. [Learn more →](/docs/ai-gateway/getting-started)

**Build an AI agent with AI SDK**: Follow a step-by-step guide to add streaming, tools, and model fallbacks. [Learn more →](/kb/guide/ai-gateway-and-ai-sdk)

**Use an SDK or API**: Connect an existing AI SDK, OpenAI, Anthropic, or HTTP client. [Learn more →](/docs/ai-gateway/sdks-and-apis)

**Connect a coding agent**: Route supported coding agents through AI Gateway with Vercel CLI. [Learn more →](/docs/ai-gateway/coding-agents)

**Migrate existing model calls**: Keep your current request format while moving model execution to AI Gateway. [Learn more →](/docs/ai-gateway/getting-started/migrate-to-ai-gateway)

## Configure and operate AI Gateway

**Models and providers**: Choose models and configure routing, filtering, fallbacks, caching, and service tiers. [Learn more →](/docs/ai-gateway/models-and-providers)

**Modalities**: Work with text, images, video, speech, realtime, embeddings, and reranking. [Learn more →](/docs/ai-gateway/modalities)

**Observability and spend**: Inspect requests, usage, latency, routing attempts, and cost. [Learn more →](/docs/ai-gateway/observability-and-spend)

**Authentication and BYOK**: Authenticate with team-scoped API keys or OIDC, and connect provider credentials. [Learn more →](/docs/ai-gateway/authentication-and-byok)

**Security and compliance**: Configure access, data handling, regional inference, and safety controls. [Learn more →](/docs/ai-gateway/security-and-compliance)

**Pricing**: Review model prices, credits, payment options, and discounts. [Learn more →](/docs/ai-gateway/pricing)

Explore [chat platforms](/docs/ai-gateway/chat-platforms) and [ecosystem integrations](/docs/ai-gateway/ecosystem), learn how to handle [`429` responses](/docs/ai-gateway/rate-limits), or see the [AI Gateway FAQ](/docs/ai-gateway/faq) for common questions about model availability, pricing, and request errors.


---

[View full sitemap](/docs/sitemap)
