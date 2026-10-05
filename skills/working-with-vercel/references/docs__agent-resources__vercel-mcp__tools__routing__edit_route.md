---
title: edit_route
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/edit_route
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/edit_route"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use edit_route with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/edit_route.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "dfae5fdeeedc50ae2b3f0fa102b70baa7659e8ce5ab6fc6765a8741230b0264b"
---

# edit_route

Edit a routing rule.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [add_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fedit_route&source_site=vercel-docs&relationship=related) — Use add_route with Vercel MCP.
- [generate_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/generate_route?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fedit_route&source_site=vercel-docs&relationship=related) — Use generate_route with Vercel MCP.
- [update_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fedit_route&source_site=vercel-docs&relationship=related) — Use update_route_versions with Vercel MCP.
- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fedit_route&source_site=vercel-docs&relationship=related) — Use stage_routes with Vercel MCP.
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fedit_route&source_site=vercel-docs&relationship=related) — Use list_project_routes with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/edit_route.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/edit_route.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fedit_route&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `projectId`   | string | Yes      | The project ID.             |
| `routeId`     | string | Yes      | The route ID.               |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
