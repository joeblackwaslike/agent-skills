---
title: list_connector_project_connections
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_connector_project_connections with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "a082df025f553b406d53f1e23bc49aeace1a5c9a5cde9733d1ebb60fd63e9419"
---

# list_connector_project_connections

List the projects connected to a connector and the environments where each connection is available.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_connector_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections) — Use list_project_connector_connections with Vercel MCP.
- [list_connectors](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connectors) — Use list_connectors with Vercel MCP.
- [get_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection) — Use get_connector_project_connection with Vercel MCP.
- [get_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector) — Use get_connector with Vercel MCP.
- [List connectors for a project](https://vercel.com/docs/rest-api/connect/list-connectors-for-a-project) — GET /v2/connect/projects/{projectId}/connectors — List the connectors connected to a project and the environments where

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type    | Required | Description                                                                                     |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------- |
| `connector` | string  | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `limit`     | integer | No       | Maximum number of project connections to return. Defaults to 50. Minimum: 1. Maximum: 100.      |
| `cursor`    | string  | No       | Cursor from `pagination.next` on the previous response.                                         |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                              |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                     |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
