---
title: update_connector
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/update_connector
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_connector"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_connector with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_connector.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "1134577137b4acf9d3956f74ec4b50510cbfc1da541bf7f51cb09a26d899c645"
---

# update_connector

Update a connector and return the connector with any service-side update signals that the caller must handle.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [upsert_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection) — Use upsert_connector_project_connection with Vercel MCP.
- [get_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector) — Use get_connector with Vercel MCP.
- [get_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection) — Use get_connector_project_connection with Vercel MCP.
- [list_connectors](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connectors) — Use list_connectors with Vercel MCP.
- [list_connector_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections) — Use list_connector_project_connections with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/update_connector.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/update_connector.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                                                     |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector`   | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `teamId`      | string | No       | Team ID to use for this operation.                                                              |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |
| `requestBody` | object | Yes      | Connector fields to update.                                                                     |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
