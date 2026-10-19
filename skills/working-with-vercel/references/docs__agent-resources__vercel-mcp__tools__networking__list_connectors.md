---
title: list_connectors
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/list_connectors
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connectors"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_connectors with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connectors.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "8f9bfa4e87838342ee9a274f72cffc27c6c72652f04d1b5fc29eee0ac85fcd84"
---

# list_connectors

List connectors that belong to a team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_connector_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections) — Use list_project_connector_connections with Vercel MCP.
- [list_connector_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections) — Use list_connector_project_connections with Vercel MCP.
- [get_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector) — Use get_connector with Vercel MCP.
- [List connectors for a project](https://vercel.com/docs/rest-api/connect/list-connectors-for-a-project) — GET /v2/connect/projects/{projectId}/connectors — List the connectors connected to a project and the environments where
- [Connectors in Vercel Connect](https://vercel.com/docs/connect/concepts/connectors) — A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/list_connectors.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/list_connectors.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type    | Required | Description                                                                                                                                                                                            |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `limit`     | integer | No       | Maximum number of connectors to return. Defaults to 20. Minimum: 1. Maximum: 100.                                                                                                                      |
| `cursor`    | string  | No       | Cursor from `pagination.next` on the previous response.                                                                                                                                                |
| `projectId` | string  | No       | Return only connectors connected to this project.                                                                                                                                                      |
| `search`    | string  | No       | Search connector names, UIDs, and services.                                                                                                                                                            |
| `type`      | string  | No       | Comma-separated connector types: `slack`, `discord`, `github`, `linear`, `linq`, `salesforce`, `sendblue`, `snowflake`, `snowflake-wif`, `microsoft-entra`, `api-key`, `photon`, `oauth`, or `custom`. |
| `service`   | string  | No       | Comma-separated provider or service identifiers.                                                                                                                                                       |
| `sort`      | string  | No       | Sort by name in ascending order, or by creation or update time in descending order. Allowed values: `"name"`, `"createdAt"`, `"updatedAt"`.                                                            |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                                                                                                                                     |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                            |


---

[View full sitemap](/docs/sitemap)
