---
title: update_edge_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_edge_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "690e0fb796544a52a6b4eeed67f40a4577a79e1ed0734c38ce801f01e83ecde6"
---

# update_edge_config

Updates a Global Config.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config) — Use create_edge_config with Vercel MCP.
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [patch_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items) — Use patch_edge_config_items with Vercel MCP.
- [create_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token) — Use create_edge_config_token with Vercel MCP.
- [get_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items) — Use get_edge_config_items with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config.graph.md)
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
