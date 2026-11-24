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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/list_connector_project_connections.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "49538b0f8df11cf92f5e985228add3ef5834334b2529aed015546db4f322112f"
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
