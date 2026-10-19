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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "03f2b540e598429eaec9b18bab3c31b7cf92eb8ffa9870aeab4c8cdc4830756a"
---

# generate_route

Generate a routing rule from natural language.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [add_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route) — Use add_route with Vercel MCP.
- [edit_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/edit_route) — Use edit_route with Vercel MCP.
- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes) — Use stage_routes with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [Generate a routing rule from natural language](https://vercel.com/docs/rest-api/project-routes/generate-a-routing-rule-from-natural-language) — POST /v1/projects/{projectId}/routes/generate — Generate a routing rule configuration from a natural language descriptio

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/generate_route.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/generate_route.graph.md)
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
