---
title: get_connector_project_connection
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_connector_project_connection with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "3d03358c5705c710a7b7e219d563248a04cd80bac59a4e30f94a68cb1b417706"
---

# get_connector_project_connection

Get the configuration that connects a connector to a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector) — Use get_connector with Vercel MCP.
- [list_project_connector_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections) — Use list_project_connector_connections with Vercel MCP.
- [list_connector_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections) — Use list_connector_project_connections with Vercel MCP.
- [upsert_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection) — Use upsert_connector_project_connection with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                     |
| ----------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector` | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `projectId` | string | Yes      | Vercel project ID.                                                                              |
| `teamId`    | string | No       | Team ID to use for this operation.                                                              |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
