---
title: list_project_route_versions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_project_route_versions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d4775db4dcd9997b7056d317b5fa84eeef4dcbbae72bdb6591f512aa52580e57"
---

# list_project_route_versions

Get routing rule version history.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_route_versions&source_site=vercel-docs&relationship=related) — Use list_project_routes with Vercel MCP.
- [update_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_route_versions&source_site=vercel-docs&relationship=related) — Use update_route_versions with Vercel MCP.
- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_route_versions&source_site=vercel-docs&relationship=related) — Use list_bulk_redirect_versions with Vercel MCP.
- [Get routing rule version history](https://vercel.com/docs/rest-api/project-routes/get-routing-rule-version-history?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_route_versions&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectId}/routes/versions — Get the version history for a project's routing rules. Returns the stagin
- [update_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_version?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_route_versions&source_site=vercel-docs&relationship=related) — Use update_version with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_project_route_versions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description     |
| ----------- | ------ | -------- | --------------- |
| `projectId` | string | Yes      | The project ID. |
| `teamId`    | string | No       | Team ID.        |
| `slug`      | string | No       | Team slug.      |


---

[View full sitemap](/docs/sitemap)
