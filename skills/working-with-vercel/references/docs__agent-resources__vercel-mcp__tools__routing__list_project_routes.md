---
title: list_project_routes
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/list_project_routes
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_project_routes with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "fb0715b0dcfefb4170632b7fae2eaa8485d770d5159c40b84fadeed7fc6f8967"
---

# list_project_routes

Get project routing rules.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions) — Use list_project_route_versions with Vercel MCP.
- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes) — Use stage_routes with Vercel MCP.
- [Get project routing rules](https://vercel.com/docs/rest-api/project-routes/get-project-routing-rules) — GET /v1/projects/{projectId}/routes — Get the routing rules for a project. Supports searching by name/ID/pattern, filter
- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects) — Use list_bulk_redirects with Vercel MCP.
- [add_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route) — Use add_route with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type              | Required | Description                                                               |
| ----------- | ----------------- | -------- | ------------------------------------------------------------------------- |
| `projectId` | string            | Yes      | The project ID.                                                           |
| `versionId` | string            | No       | -                                                                         |
| `q`         | string            | No       | -                                                                         |
| `filter`    | string            | No       | Allowed values: `"rewrite"`, `"redirect"`, `"set_status"`, `"transform"`. |
| `diff`      | boolean \| string | No       | -                                                                         |
| `teamId`    | string            | No       | Team ID to use for this operation.                                        |
| `slug`      | string            | No       | Team slug to use for this operation. Use instead of teamId.               |


---

[View full sitemap](/docs/sitemap)
