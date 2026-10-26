---
title: create_edge_config_token
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_edge_config_token with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "fee715f03f07dec15a0ba8747f1c7bc2cbce9bed7646a2abb63dcac62fa90497"
---

# create_edge_config_token

Adds a token to an existing Global Config.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config) — Use create_edge_config with Vercel MCP.
- [get_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token) — Use get_edge_config_token with Vercel MCP.
- [Create a Global Config token](https://vercel.com/docs/rest-api/global-config/create-a-global-config-token) — POST /v1/global-config/{edgeConfigId}/token — Adds a token to an existing Global Config.
- [get_edge_config_tokens](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens) — Use get_edge_config_tokens with Vercel MCP.
- [update_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config) — Use update_edge_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
