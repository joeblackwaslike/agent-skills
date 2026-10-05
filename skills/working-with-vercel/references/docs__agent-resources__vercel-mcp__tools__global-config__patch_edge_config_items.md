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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "6e63e3a4e7ef2f68c4d37d92b8eff587c15b79411a7e1889470f0ad63ba0b5a9"
---

# patch_edge_config_items

Update Global Config items in batch.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [patch_edge_config_schema](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_items&source_site=vercel-docs&relationship=related) — Use patch_edge_config_schema with Vercel MCP.
- [update_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_items&source_site=vercel-docs&relationship=related) — Use update_edge_config with Vercel MCP.
- [Update Global Config items in batch](https://vercel.com/docs/rest-api/global-config/update-global-config-items-in-batch?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_items&source_site=vercel-docs&relationship=related) — PATCH /v1/global-config/{edgeConfigId}/items — Update multiple Global Config Items in batch.
- [restore_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_items&source_site=vercel-docs&relationship=related) — Use restore_edge_config_backup with Vercel MCP.
- [create_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_items&source_site=vercel-docs&relationship=related) — Use create_edge_config_token with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fpatch_edge_config_items&source_site=vercel-docs&relationship=graph)
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
