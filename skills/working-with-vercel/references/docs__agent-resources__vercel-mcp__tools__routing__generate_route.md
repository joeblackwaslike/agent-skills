---
title: generate_route
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/generate_route
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/generate_route"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use generate_route with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/generate_route.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "77a380e33ad9124b10675b8a490ca05d3291adaf6217815191e9fb513a376d5b"
---

# generate_route

Generate a routing rule from natural language.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [add_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fgenerate_route&source_site=vercel-docs&relationship=related) — Use add_route with Vercel MCP.
- [edit_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/edit_route?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fgenerate_route&source_site=vercel-docs&relationship=related) — Use edit_route with Vercel MCP.
- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fgenerate_route&source_site=vercel-docs&relationship=related) — Use stage_routes with Vercel MCP.
- [Generate a routing rule from natural language](https://vercel.com/docs/rest-api/project-routes/generate-a-routing-rule-from-natural-language?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fgenerate_route&source_site=vercel-docs&relationship=related) — POST /v1/projects/{projectId}/routes/generate — Generate a routing rule configuration from a natural language descriptio
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fgenerate_route&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/generate_route.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/generate_route.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fgenerate_route&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `projectId`   | string | Yes      | The project ID.             |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
