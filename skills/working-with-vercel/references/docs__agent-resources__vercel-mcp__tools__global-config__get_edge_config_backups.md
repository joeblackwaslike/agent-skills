---
title: get_edge_config_backups
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_edge_config_backups with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "20f529724101f0ec9171c32f5069b97119d71e658090c2276e286ebeb45ccb8d"
---

# get_edge_config_backups

Returns backups of a Global Config.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup) — Use get_edge_config_backup with Vercel MCP.
- [restore_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup) — Use restore_edge_config_backup with Vercel MCP.
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.
- [Get Global Config backups](https://vercel.com/docs/rest-api/global-config/get-global-config-backups) — GET /v1/global-config/{edgeConfigId}/backups — Returns backups of a Global Config.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `next`         | string | No       | -                                                           |
| `limit`        | number | No       | Minimum: 0. Maximum: 50.                                    |
| `metadata`     | string | No       | -                                                           |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
