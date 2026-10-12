---
title: get_ai_gateway_virtual_model_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/ai-gateway/get_ai_gateway_virtual_model_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway/get_ai_gateway_virtual_model_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/ai-gateway
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_ai_gateway_virtual_model_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway/get_ai_gateway_virtual_model_config.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "4d5362adffef98fe8613691923aff0aed66f1c82b78df82fda983cf73d26bf4e"
---

# get_ai_gateway_virtual_model_config

Get virtual model config.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get virtual model config](https://vercel.com/docs/rest-api/ai-gateway/get-virtual-model-config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway%2Fget_ai_gateway_virtual_model_config&source_site=vercel-docs&relationship=related) — GET /ai-gateway/virtual-model-configs — Get a virtual model config
- [List virtual model configs](https://vercel.com/docs/rest-api/ai-gateway/list-virtual-model-configs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway%2Fget_ai_gateway_virtual_model_config&source_site=vercel-docs&relationship=related) — GET /ai-gateway/virtual-model-configs/list — List virtual model configs. With \\`ownerId\\`, returns all of that team's VM
- [Delete virtual model config](https://vercel.com/docs/rest-api/ai-gateway/delete-virtual-model-config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway%2Fget_ai_gateway_virtual_model_config&source_site=vercel-docs&relationship=related) — DELETE /ai-gateway/virtual-model-configs — Delete a virtual model config \\(soft delete\\)
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway%2Fget_ai_gateway_virtual_model_config&source_site=vercel-docs&relationship=related) — Use get_configuration with Vercel MCP.
- [Create virtual model config](https://vercel.com/docs/rest-api/ai-gateway/create-virtual-model-config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway%2Fget_ai_gateway_virtual_model_config&source_site=vercel-docs&relationship=related) — POST /ai-gateway/virtual-model-configs — Create a virtual model config \\(VMC\\)

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/ai-gateway/get_ai_gateway_virtual_model_config.graph.md](/docs/agent-resources/vercel-mcp/tools/ai-gateway/get_ai_gateway_virtual_model_config.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fai-gateway%2Fget_ai_gateway_virtual_model_config&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter          | Type   | Required | Description             |
| ------------------ | ------ | -------- | ----------------------- |
| `ownerId`          | string | No       | -                       |
| `virtualModelSlug` | string | Yes      | The virtual model slug. |
| `teamId`           | string | No       | Team ID.                |
| `slug`             | string | No       | Team slug.              |


---

[View full sitemap](/docs/sitemap)
