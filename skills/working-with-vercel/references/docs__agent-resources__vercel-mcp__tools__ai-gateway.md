---
title: AI Gateway
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/ai-gateway
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for ai gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "4fc53a8ec1ec488f43d065fbe009d985b806236fc08e802b03004afe54b84263"
---

# AI Gateway

Create API keys to authenticate requests to AI Gateway. You can also inspect virtual model configurations to see how your model endpoints are configured.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel AI Gateway: Models, Routing, and Observability](https://vercel.com/docs/ai-gateway?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway&source_site=vercel-docs&relationship=related) — Call AI models from any infrastructure through a managed gateway. Centralize credentials, request logs, spend budgets, r
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Pydantic AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway&source_site=vercel-docs&relationship=related) — Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Create virtual model config](https://vercel.com/docs/rest-api/ai-gateway/create-virtual-model-config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway&source_site=vercel-docs&relationship=related) — POST /ai-gateway/virtual-model-configs — Create a virtual model config \\(VMC\\)

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/ai-gateway.graph.md](/docs/agent-resources/vercel-mcp/tools/ai-gateway.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_api_keys`

Create an AI Gateway API key.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `requestBody` | object | No       | Request body for this tool. |
| `teamId`      | string | No       | Team ID.                    |

## `get_ai_gateway_virtual_model_config`

Get virtual model config.

## Parameters

| Parameter          | Type   | Required | Description             |
| ------------------ | ------ | -------- | ----------------------- |
| `ownerId`          | string | No       | -                       |
| `virtualModelSlug` | string | Yes      | The virtual model slug. |
| `teamId`           | string | No       | Team ID.                |
| `slug`             | string | No       | Team slug.              |


---

[View full sitemap](/docs/sitemap)
