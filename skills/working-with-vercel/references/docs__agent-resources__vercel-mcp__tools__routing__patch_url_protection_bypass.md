---
title: patch_url_protection_bypass
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use patch_url_protection_bypass with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "6b8794eeb5044a74fd76ccc02295b366eb9ba3482d3e07caab9ff99f9c6f8fef"
---

# patch_url_protection_bypass

Update the protection bypass for a URL.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fpatch_url_protection_bypass&source_site=vercel-docs&relationship=related) — Use update_project_protection_bypass with Vercel MCP.
- [Update the protection bypass for a URL](https://vercel.com/docs/rest-api/aliases/update-the-protection-bypass-for-a-url?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fpatch_url_protection_bypass&source_site=vercel-docs&relationship=related) — PATCH /aliases/{id}/protection-bypass — Update the protection bypass for the alias or deployment URL \\(used for user acc
- [patch_edge_config_schema](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_schema?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fpatch_url_protection_bypass&source_site=vercel-docs&relationship=related) — Use patch_edge_config_schema with Vercel MCP.
- [patch_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fpatch_url_protection_bypass&source_site=vercel-docs&relationship=related) — Use patch_edge_config_items with Vercel MCP.
- [assign_alias](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/assign_alias?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fpatch_url_protection_bypass&source_site=vercel-docs&relationship=related) — Use assign_alias with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fpatch_url_protection_bypass&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `id`          | string | Yes      | The alias or deployment ID  |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
