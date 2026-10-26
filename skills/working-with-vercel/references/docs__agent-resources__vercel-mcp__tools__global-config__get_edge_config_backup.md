---
title: get_edge_config_backup
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_edge_config_backup with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "72d1563ddf15e9b73183e5540580d276a6b2e78e380f986cf1a36c0da9f704b1"
---

# get_edge_config_backup

Retrieves a specific version of a Global Config from backup storage.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_backups](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups) — Use get_edge_config_backups with Vercel MCP.
- [restore_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup) — Use restore_edge_config_backup with Vercel MCP.
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [get_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items) — Use get_edge_config_items with Vercel MCP.
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                   | Type   | Required | Description                                                 |
| --------------------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId`              | string | Yes      | The Global Config ID.                                       |
| `edgeConfigBackupVersionId` | string | Yes      | The Global Config backup version ID.                        |
| `teamId`                    | string | No       | Team ID to use for this operation.                          |
| `slug`                      | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
