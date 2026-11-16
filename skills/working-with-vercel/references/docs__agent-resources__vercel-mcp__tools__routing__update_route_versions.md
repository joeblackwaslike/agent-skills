---
title: update_route_versions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/update_route_versions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_route_versions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e50ee370a4f3b87c9e2e943abf268c0fcc776001fb617ea7e0c563d0cc2d888c"
---

# update_route_versions

Promote, restore, or discard a routing rule version.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions) — Use list_project_route_versions with Vercel MCP.
- [update_bulk_redirect_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version) — Use update_bulk_redirect_version with Vercel MCP.
- [edit_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/edit_route) — Use edit_route with Vercel MCP.
- [Promote, restore, or discard a routing rule version](https://vercel.com/docs/rest-api/project-routes/promote-restore-or-discard-a-routing-rule-version) — POST /v1/projects/{projectId}/routes/versions — Promote staged routing rules to production, restore a previous productio
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes) — Use list_project_routes with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
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
