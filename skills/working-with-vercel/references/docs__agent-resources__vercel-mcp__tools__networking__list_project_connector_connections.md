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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_project_connector_connections.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "6bfe851e8bd9d1e5d4224e564a8952c2a8e4ee042d208df7d924950bf5eb31c2"
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
- [get_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector) — Use get_connector with Vercel MCP.

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
