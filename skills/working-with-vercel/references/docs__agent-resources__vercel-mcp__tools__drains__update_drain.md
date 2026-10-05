---
title: update_drain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drains/update_drain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/update_drain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_drain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/update_drain.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "ef761e9a42df27a4111957f1e89834959794474a41507649ef9982c513123978"
---

# update_drain

Update an existing Drain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/create_drain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains%2Fupdate_drain&source_site=vercel-docs&relationship=related) — Use create_drain with Vercel MCP.
- [test_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/test_drain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains%2Fupdate_drain&source_site=vercel-docs&relationship=related) — Use test_drain with Vercel MCP.
- [get_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/get_drain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains%2Fupdate_drain&source_site=vercel-docs&relationship=related) — Use get_drain with Vercel MCP.
- [list_drains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/list_drains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains%2Fupdate_drain&source_site=vercel-docs&relationship=related) — Use list_drains with Vercel MCP.
- [Delete a drain](https://vercel.com/docs/rest-api/drains/delete-a-drain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains%2Fupdate_drain&source_site=vercel-docs&relationship=related) — DELETE /v1/drains/{id} — Delete a specific Drain by passing the drain id in the URL.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drains/update_drain.graph.md](/docs/agent-resources/vercel-mcp/tools/drains/update_drain.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains%2Fupdate_drain&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `id`          | string | Yes      | The drain ID.               |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
