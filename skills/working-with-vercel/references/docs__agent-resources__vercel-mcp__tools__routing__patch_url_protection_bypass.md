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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "29c4abef3d0a8433c7c112b853cf85b7d5eacd638e95a434d7e8e70cf8480ff3"
---

# patch_url_protection_bypass

Update the protection bypass for a URL.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [Update the protection bypass for a URL](https://vercel.com/docs/rest-api/aliases/update-the-protection-bypass-for-a-url) — PATCH /aliases/{id}/protection-bypass — Update the protection bypass for the alias or deployment URL \\(used for user acc
- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.
- [patch_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/patch_edge_config_items) — Use patch_edge_config_items with Vercel MCP.
- [update_bulk_redirect_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version) — Use update_bulk_redirect_version with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `id`          | string | Yes      | The alias or deployment ID                                  |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
