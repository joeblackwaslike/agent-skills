---
title: get_edge_config_items
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_edge_config_items with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a50e4f0e9d47bf2f46069568e5cdf758e4cf32342bbde390b251c1d73e0306c4"
---

# get_edge_config_items

Returns all items of a Global Config.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_item](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_item) — Use get_edge_config_item with Vercel MCP.
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.
- [get_edge_config_tokens](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens) — Use get_edge_config_tokens with Vercel MCP.
- [Get Global Config items](https://vercel.com/docs/rest-api/global-config/get-global-config-items) — GET /v1/global-config/{edgeConfigId}/items — Returns all items of a Global Config.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items.graph.md)
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
