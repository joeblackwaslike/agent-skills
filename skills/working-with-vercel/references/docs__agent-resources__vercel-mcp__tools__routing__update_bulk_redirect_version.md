---
title: update_bulk_redirect_version
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_bulk_redirect_version with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "877902682fb45fce248464b81dac2b548ff9855df2c9c25ec5096bbc2450b7b4"
---

# update_bulk_redirect_version

Promote a staging version to production or restore a previous production version.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions) — Use list_bulk_redirect_versions with Vercel MCP.
- [update_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions) — Use update_route_versions with Vercel MCP.
- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects) — Use list_bulk_redirects with Vercel MCP.
- [restore_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/restore_redirects) — Use restore_redirects with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project) — Use update_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version.graph.md)
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
