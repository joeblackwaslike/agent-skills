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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/create_drain.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "36303618cd8a39840f1d5743ca0680a41923bee11e2943f90e57060f51bc5344"
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
