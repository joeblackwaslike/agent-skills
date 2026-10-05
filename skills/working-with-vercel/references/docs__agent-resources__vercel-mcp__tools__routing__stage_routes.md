---
title: stage_routes
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/stage_routes
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use stage_routes with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "107df835549010e9d22cb4156064caea04e364451e4c132813ac26f76dd516fc"
---

# stage_routes

Stage routing rules.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [stage_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fstage_routes&source_site=vercel-docs&relationship=related) — Use stage_redirects with Vercel MCP.
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fstage_routes&source_site=vercel-docs&relationship=related) — Use list_project_routes with Vercel MCP.
- [generate_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/generate_route?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fstage_routes&source_site=vercel-docs&relationship=related) — Use generate_route with Vercel MCP.
- [add_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fstage_routes&source_site=vercel-docs&relationship=related) — Use add_route with Vercel MCP.
- [Stage routing rules](https://vercel.com/docs/rest-api/project-routes/stage-routing-rules?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fstage_routes&source_site=vercel-docs&relationship=related) — PUT /v1/projects/{projectId}/routes — Stage routing rules for a project. Set \\`overwrite\\` to true to replace all existi

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/stage_routes.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/stage_routes.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fstage_routes&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `projectId`   | string | Yes      | The project ID.             |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
