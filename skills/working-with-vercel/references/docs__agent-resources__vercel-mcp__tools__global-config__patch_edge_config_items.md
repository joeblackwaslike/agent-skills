---
title: patch_edge_config_items
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use patch_edge_config_items with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "18ec5260a6f6f5cac594dd5746bbdc46673b7aa24629a64c73066e0315ca007a"
---

# patch_edge_config_items

Update multiple Global Config Items in batch.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config) — Use update_edge_config with Vercel MCP.
- [get_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items) — Use get_edge_config_items with Vercel MCP.
- [create_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config) — Use create_edge_config with Vercel MCP.
- [Update Global Config items in batch](https://vercel.com/docs/rest-api/global-config/update-global-config-items-in-batch) — PATCH /v1/global-config/{edgeConfigId}/items — Update multiple Global Config Items in batch.
- [get_edge_config_item](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_item) — Use get_edge_config_item with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
