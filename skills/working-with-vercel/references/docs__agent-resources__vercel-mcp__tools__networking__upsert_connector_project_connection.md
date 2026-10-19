---
title: upsert_connector_project_connection
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use upsert_connector_project_connection with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "5f526217e74ec82d25c07f8eb0fb2b0d9963ca97116f0d305b340122c2bfbfd5"
---

# upsert_connector_project_connection

Connect a connector to a project, or replace the environments on an existing project connection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection) — Use get_connector_project_connection with Vercel MCP.
- [update_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_connector) — Use update_connector with Vercel MCP.
- [list_project_connector_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections) — Use list_project_connector_connections with Vercel MCP.
- [list_connector_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections) — Use list_connector_project_connections with Vercel MCP.
- [get_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector) — Use get_connector with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                                                     |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector`   | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `projectId`   | string | Yes      | Vercel project ID.                                                                              |
| `teamId`      | string | No       | Team ID to use for this operation.                                                              |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |
| `requestBody` | object | Yes      | Environments enabled for a connector project connection.                                        |


---

[View full sitemap](/docs/sitemap)
