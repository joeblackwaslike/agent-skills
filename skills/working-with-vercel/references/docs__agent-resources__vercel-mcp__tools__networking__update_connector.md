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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_connector.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "24c65e602e57e82834d5c300eb588f2f7566faa02d2bd2329f4e496769834487"
---

# update_connector

Update a connector and return the connector with any service-side update signals that the caller must handle.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector) — Use get_connector with Vercel MCP.
- [Control who can manage connectors in Vercel Connect](https://vercel.com/changelog/control-who-can-manage-connectors-in-vercel-connect)
- [upsert_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection) — Use upsert_connector_project_connection with Vercel MCP.
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
