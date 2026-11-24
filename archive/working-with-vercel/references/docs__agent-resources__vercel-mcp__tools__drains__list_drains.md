---
title: list_drains
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drains/list_drains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/list_drains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_drains with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/list_drains.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "87a49e64319c6d014ca661502c1200636024a7e343d30de4ba34bb4e973bf696"
---

# list_drains

Retrieve a list of all Drains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/get_drain) — Use get_drain with Vercel MCP.
- [Retrieve a list of all Drains](https://vercel.com/docs/rest-api/drains/retrieve-a-list-of-all-drains) — GET /v1/drains — Allows to retrieve the list of Drains of the authenticated team.
- [test_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/test_drain) — Use test_drain with Vercel MCP.
- [create_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/create_drain) — Use create_drain with Vercel MCP.
- [update_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/update_drain) — Use update_drain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drains/list_drains.graph.md](/docs/agent-resources/vercel-mcp/tools/drains/list_drains.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`       | string  | No       | The project ID.                                             |
| `includeMetadata` | boolean | No       | Default: `false`.                                           |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |

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
