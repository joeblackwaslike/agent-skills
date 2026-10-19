---
title: restore_redirects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/restore_redirects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/restore_redirects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use restore_redirects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/restore_redirects.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "746394e566698e2acfc4e88f7dc6721cdd956aa63dd2052381ef4e28cddb2721"
---

# restore_redirects

Restores the provided redirects in the staging version to the value in the production version. If no production version exists, removes the redirects from staging.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [stage_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects) — Use stage_redirects with Vercel MCP.
- [Restore staged project-level redirects to their production version.](https://vercel.com/docs/rest-api/bulk-redirects/restore-staged-project-level-redirects-to-their-production-version) — POST /v1/bulk-redirects/restore — Restores the provided redirects in the staging version to the value in the production
- [update_bulk_redirect_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version) — Use update_bulk_redirect_version with Vercel MCP.
- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects) — Use list_bulk_redirects with Vercel MCP.
- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions) — Use list_bulk_redirect_versions with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/restore_redirects.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/restore_redirects.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
