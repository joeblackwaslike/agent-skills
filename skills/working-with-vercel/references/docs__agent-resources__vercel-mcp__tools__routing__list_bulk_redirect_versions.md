---
title: list_bulk_redirect_versions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_bulk_redirect_versions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "606771c8ab31810eb69d2edfd2d31b7c1fe6dbfaac4cdd04a8f6583f68e4d83c"
---

# list_bulk_redirect_versions

Get the version history for a project's redirects.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirect_versions&source_site=vercel-docs&relationship=related) — Use list_bulk_redirects with Vercel MCP.
- [list_project_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirect_versions&source_site=vercel-docs&relationship=related) — Use list_project_route_versions with Vercel MCP.
- [update_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirect_versions&source_site=vercel-docs&relationship=related) — Use update_route_versions with Vercel MCP.
- [Get the version history for a project's redirects.](https://vercel.com/docs/rest-api/bulk-redirects/get-the-version-history-for-a-project-s-redirects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirect_versions&source_site=vercel-docs&relationship=related) — GET /v1/bulk-redirects/versions — Get the version history for a project's bulk redirects
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirect_versions&source_site=vercel-docs&relationship=related) — Use list_project_routes with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirect_versions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description     |
| ----------- | ------ | -------- | --------------- |
| `projectId` | string | Yes      | The project ID. |
| `teamId`    | string | No       | Team ID.        |
| `slug`      | string | No       | Team slug.      |


---

[View full sitemap](/docs/sitemap)
