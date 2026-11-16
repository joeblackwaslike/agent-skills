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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/upsert_connector_project_connection.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a993c99bac9dddafac7ce2fde2e18409da38053ed92c53d0a866b004d7dfdb66"
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
