---
title: update_route_versions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/update_route_versions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_route_versions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "eadec17978403eb38ae4288f5ff94de7d471c9aaafa5e3c18399bc46b52a8c3e"
---

# update_route_versions

Promote, restore, or discard a routing rule version.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions) — Use list_project_route_versions with Vercel MCP.
- [update_bulk_redirect_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version) — Use update_bulk_redirect_version with Vercel MCP.
- [edit_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/edit_route) — Use edit_route with Vercel MCP.
- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions) — Use list_bulk_redirect_versions with Vercel MCP.
- [add_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route) — Use add_route with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
