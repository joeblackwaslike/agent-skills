---
title: create_drain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drains/create_drain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/create_drain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_drain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/create_drain.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a0eba1e716bb03b12e8ccc1862d1a40fe4c19cd78d0d28e3044bdbcccab52ece"
---

# create_drain

Create a new Drain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [test_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/test_drain) — Use test_drain with Vercel MCP.
- [update_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/update_drain) — Use update_drain with Vercel MCP.
- [get_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/get_drain) — Use get_drain with Vercel MCP.
- [list_drains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/list_drains) — Use list_drains with Vercel MCP.
- [Delete a drain](https://vercel.com/docs/rest-api/drains/delete-a-drain) — DELETE /v1/drains/{id} — Delete a specific Drain by passing the drain id in the URL.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drains/create_drain.graph.md](/docs/agent-resources/vercel-mcp/tools/drains/create_drain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
