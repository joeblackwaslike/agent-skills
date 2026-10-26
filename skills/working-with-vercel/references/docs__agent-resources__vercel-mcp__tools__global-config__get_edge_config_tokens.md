---
title: get_edge_config_tokens
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_edge_config_tokens with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b291c82e720bcb9769b6c9776219eec699d94ef874aa1b8755bc1614ce4eb5e1"
---

# get_edge_config_tokens

Returns all tokens of a Global Config.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token) — Use get_edge_config_token with Vercel MCP.
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [get_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items) — Use get_edge_config_items with Vercel MCP.
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.
- [create_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token) — Use create_edge_config_token with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
