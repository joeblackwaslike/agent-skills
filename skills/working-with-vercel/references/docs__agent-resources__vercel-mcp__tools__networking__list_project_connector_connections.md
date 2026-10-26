---
title: list_project_connector_connections
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_project_connector_connections with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5a8b4b247674a48a9b1b884c59f7474ce5de74573059a80f87b48e051f1918d2"
---

# list_project_connector_connections

List the connectors connected to a project and the environments where each connection is available.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_connector_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections) — Use list_connector_project_connections with Vercel MCP.
- [list_connectors](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connectors) — Use list_connectors with Vercel MCP.
- [get_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection) — Use get_connector_project_connection with Vercel MCP.
- [List connectors for a project](https://vercel.com/docs/rest-api/connect/list-connectors-for-a-project) — GET /v2/connect/projects/{projectId}/connectors — List the connectors connected to a project and the environments where
- [upsert_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection) — Use upsert_connector_project_connection with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type    | Required | Description                                                                                  |
| ----------- | ------- | -------- | -------------------------------------------------------------------------------------------- |
| `projectId` | string  | Yes      | Vercel project ID.                                                                           |
| `limit`     | integer | No       | Maximum number of connector connections to return. Defaults to 50. Minimum: 1. Maximum: 100. |
| `cursor`    | string  | No       | Cursor from `pagination.next` on the previous response.                                      |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                           |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                  |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
