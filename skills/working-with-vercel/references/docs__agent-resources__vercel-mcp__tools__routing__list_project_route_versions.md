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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b32bd231b00052b8f8d255f6e097db06f547b45a1f1d967c75a7f0921b92d4e3"
---

# list_project_route_versions

Get routing rule version history.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes) — Use list_project_routes with Vercel MCP.
- [update_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions) — Use update_route_versions with Vercel MCP.
- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions) — Use list_bulk_redirect_versions with Vercel MCP.
- [Get routing rule version history](https://vercel.com/docs/rest-api/project-routes/get-routing-rule-version-history) — GET /v1/projects/{projectId}/routes/versions — Get the version history for a project's routing rules. Returns the stagin
- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes) — Use stage_routes with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | Yes      | The project ID.                                             |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
