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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "63ea6071915d9d67cda62c93016796eb596762b5f67b338fb23a9c46cc1b15cd"
---

# list_project_routes

Get project routing rules.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_routes&source_site=vercel-docs&relationship=related) — Use list_project_route_versions with Vercel MCP.
- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_routes&source_site=vercel-docs&relationship=related) — Use stage_routes with Vercel MCP.
- [Get project routing rules](https://vercel.com/docs/rest-api/project-routes/get-project-routing-rules?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_routes&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectId}/routes — Get the routing rules for a project. Supports searching by name/ID/pattern, filter
- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_routes&source_site=vercel-docs&relationship=related) — Use list_bulk_redirects with Vercel MCP.
- [generate_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/generate_route?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_routes&source_site=vercel-docs&relationship=related) — Use generate_route with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_routes&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type              | Required | Description                                                               |
| ----------- | ----------------- | -------- | ------------------------------------------------------------------------- |
| `projectId` | string            | Yes      | The project ID.                                                           |
| `versionId` | string            | No       | -                                                                         |
| `q`         | string            | No       | -                                                                         |
| `filter`    | string            | No       | Allowed values: `"rewrite"`, `"redirect"`, `"set_status"`, `"transform"`. |
| `diff`      | boolean \| string | No       | -                                                                         |
| `teamId`    | string            | No       | Team ID.                                                                  |
| `slug`      | string            | No       | Team slug.                                                                |


---

[View full sitemap](/docs/sitemap)
