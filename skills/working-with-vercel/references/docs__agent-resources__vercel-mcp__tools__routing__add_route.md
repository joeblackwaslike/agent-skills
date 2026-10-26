---
title: add_route
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/add_route
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use add_route with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/add_route.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "3a18c61452ebc59f0efbb0e1d015a1949019b948bb7bcb7fcacf33433a5dc6a3"
---

# add_route

Add a routing rule.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [edit_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/edit_route) — Use edit_route with Vercel MCP.
- [generate_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/generate_route) — Use generate_route with Vercel MCP.
- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes) — Use stage_routes with Vercel MCP.
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes) — Use list_project_routes with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/add_route.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/add_route.graph.md)
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
