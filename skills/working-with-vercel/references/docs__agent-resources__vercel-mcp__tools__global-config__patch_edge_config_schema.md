---
title: patch_edge_config_schema
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use patch_edge_config_schema with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "1c4c74e769a97ec711c78d0ad2199f926303da3292545534e25ec471c52296ac"
---

# patch_edge_config_schema

Update Global Config schema.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [patch_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_schema&source_site=vercel-docs&relationship=related) — Use patch_edge_config_items with Vercel MCP.
- [update_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_schema&source_site=vercel-docs&relationship=related) — Use update_edge_config with Vercel MCP.
- [restore_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_schema&source_site=vercel-docs&relationship=related) — Use restore_edge_config_backup with Vercel MCP.
- [Update Global Config schema](https://vercel.com/docs/rest-api/global-config/update-global-config-schema?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_schema&source_site=vercel-docs&relationship=related) — POST /v1/global-config/{edgeConfigId}/schema — Update a Global Config's schema.
- [get_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_schema&source_site=vercel-docs&relationship=related) — Use get_edge_config_backup with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_schema&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.       |
| `dryRun`       | string | No       | -                           |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
