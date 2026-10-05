---
title: create_edge_config_token
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_edge_config_token with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4b4eba6c563abc05f2209e8483eaed1e892710acb605c5428156e3aacb2b8a60"
---

# create_edge_config_token

Create a Global Config token.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fcreate_edge_config_token&source_site=vercel-docs&relationship=related) — Use get_edge_config_token with Vercel MCP.
- [Create a Global Config token](https://vercel.com/docs/rest-api/global-config/create-a-global-config-token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fcreate_edge_config_token&source_site=vercel-docs&relationship=related) — POST /v1/global-config/{edgeConfigId}/token — Adds a token to an existing Global Config.
- [update_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fcreate_edge_config_token&source_site=vercel-docs&relationship=related) — Use update_edge_config with Vercel MCP.
- [Get Global Config token meta data](https://vercel.com/docs/rest-api/global-config/get-global-config-token-meta-data?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fcreate_edge_config_token&source_site=vercel-docs&relationship=related) — GET /v1/global-config/{edgeConfigId}/token/{token} — Return meta data about a Global Config token.
- [get_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fcreate_edge_config_token&source_site=vercel-docs&relationship=related) — Use get_edge_config_backup with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config%2Fcreate_edge_config_token&source_site=vercel-docs&relationship=graph)
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
