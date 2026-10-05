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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "83a5b3829600333aff3a6cf1f66ea50802a8c5e63bb1b8997ec377ac6a0a60e3"
---

# get_edge_config_backup

Get Global Config backup.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [restore_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fget_edge_config_backup&source_site=vercel-docs&relationship=related) — Use restore_edge_config_backup with Vercel MCP.
- [update_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fget_edge_config_backup&source_site=vercel-docs&relationship=related) — Use update_edge_config with Vercel MCP.
- [get_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fget_edge_config_backup&source_site=vercel-docs&relationship=related) — Use get_edge_config_token with Vercel MCP.
- [Get Global Config backup](https://vercel.com/docs/rest-api/global-config/get-global-config-backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fget_edge_config_backup&source_site=vercel-docs&relationship=related) — GET /v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId} — Retrieves a specific version of a Global Conf
- [Get Global Config backups](https://vercel.com/docs/rest-api/global-config/get-global-config-backups?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fget_edge_config_backup&source_site=vercel-docs&relationship=related) — GET /v1/global-config/{edgeConfigId}/backups — Returns backups of a Global Config.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fget_edge_config_backup&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter                   | Type   | Required | Description                          |
| --------------------------- | ------ | -------- | ------------------------------------ |
| `edgeConfigId`              | string | Yes      | The Global Config ID.                |
| `edgeConfigBackupVersionId` | string | Yes      | The Global Config backup version ID. |
| `teamId`                    | string | No       | Team ID.                             |
| `slug`                      | string | No       | Team slug.                           |


---

[View full sitemap](/docs/sitemap)
