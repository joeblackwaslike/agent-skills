---
title: get_edge_config_item
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_item
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_item"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_edge_config_item with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_item.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "43acc5efcec952eb98f238396861caab9f2f5b7c30163137617b2ff6843a06db"
---

# get_edge_config_item

Returns a specific Global Config Item.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items) — Use get_edge_config_items with Vercel MCP.
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [get_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token) — Use get_edge_config_token with Vercel MCP.
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.
- [Get a Global Config item](https://vercel.com/docs/rest-api/global-config/get-a-global-config-item) — GET /v1/global-config/{edgeConfigId}/item/{edgeConfigItemKey} — Returns a specific Global Config Item.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_item.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_item.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter           | Type   | Required | Description                                                 |
| ------------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId`      | string | Yes      | The Global Config ID.                                       |
| `edgeConfigItemKey` | string | Yes      | The Global Config item key.                                 |
| `teamId`            | string | No       | Team ID to use for this operation.                          |
| `slug`              | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
