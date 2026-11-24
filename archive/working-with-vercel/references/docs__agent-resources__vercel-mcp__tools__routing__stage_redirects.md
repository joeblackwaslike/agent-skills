---
title: stage_redirects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/stage_redirects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use stage_redirects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c4e82436ead78e28885b39f499072b1e516b98dad60f44453017625b7d450067"
---

# stage_redirects

Stages new redirects for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes) — Use stage_routes with Vercel MCP.
- [restore_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/restore_redirects) — Use restore_redirects with Vercel MCP.
- [Stages new redirects for a project.](https://vercel.com/docs/rest-api/bulk-redirects/stages-new-redirects-for-a-project) — PUT /v1/bulk-redirects — Stages new redirects for a project and returns the new version.
- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects) — Use list_bulk_redirects with Vercel MCP.
- [vercel redirects](https://vercel.com/docs/cli/redirects) — Learn how to manage project-level redirects using the vercel redirects CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects.graph.md)
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
