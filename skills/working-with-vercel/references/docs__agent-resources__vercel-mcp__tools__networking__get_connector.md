---
title: get_connector
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/get_connector
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_connector with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "3f203abb19c750423e24c0670b8bc59f9201924a6ffc2dac8f165d643d761917"
---

# get_connector

Get the connector by ID. Accepts a dashboard/team requester or a deployment's project OIDC token. Project requesters may only read connectors linked to their project and environment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection) — Use get_connector_project_connection with Vercel MCP.
- [update_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_connector) — Use update_connector with Vercel MCP.
- [list_connectors](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connectors) — Use list_connectors with Vercel MCP.
- [list_connector_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections) — Use list_connector_project_connections with Vercel MCP.
- [list_project_connector_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections) — Use list_project_connector_connections with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/get_connector.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/get_connector.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                     |
| ----------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector` | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `teamId`    | string | No       | Team ID to use for this operation.                                                              |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |


---

[View full sitemap](/docs/sitemap)
