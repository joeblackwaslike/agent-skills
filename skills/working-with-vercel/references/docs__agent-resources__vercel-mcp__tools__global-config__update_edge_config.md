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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "fd19363e47356d9ddcd65b6e4c212202978b729f95b2ffce47498b4667469e80"
---

# update_edge_config

Update a Global Config.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [patch_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fupdate_edge_config&source_site=vercel-docs&relationship=related) — Use patch_edge_config_items with Vercel MCP.
- [patch_edge_config_schema](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fupdate_edge_config&source_site=vercel-docs&relationship=related) — Use patch_edge_config_schema with Vercel MCP.
- [create_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fupdate_edge_config&source_site=vercel-docs&relationship=related) — Use create_edge_config_token with Vercel MCP.
- [get_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fupdate_edge_config&source_site=vercel-docs&relationship=related) — Use get_edge_config_backup with Vercel MCP.
- [restore_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fupdate_edge_config&source_site=vercel-docs&relationship=related) — Use restore_edge_config_backup with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fupdate_edge_config&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.       |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
