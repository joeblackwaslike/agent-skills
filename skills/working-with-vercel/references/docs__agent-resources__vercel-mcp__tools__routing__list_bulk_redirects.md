---
title: list_bulk_redirects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_bulk_redirects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "92a0cdc2b48e429971d1ca8f6ad8d202e6faffe1b9f4309eb9669e83ac158fcd"
---

# list_bulk_redirects

Gets project-level redirects.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bulk redirects are now generally available](https://vercel.com/changelog/bulk-redirects-are-now-generally-available)
- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions) — Use list_bulk_redirect_versions with Vercel MCP.
- [Gets project-level redirects.](https://vercel.com/docs/rest-api/bulk-redirects/gets-project-level-redirects) — GET /v1/bulk-redirects — Get the version history for a project's bulk redirects
- [update_bulk_redirect_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version) — Use update_bulk_redirect_version with Vercel MCP.
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes) — Use list_project_routes with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type              | Required | Description                                                  |
| ----------- | ----------------- | -------- | ------------------------------------------------------------ |
| `projectId` | string            | Yes      | The project ID.                                              |
| `versionId` | string            | No       | -                                                            |
| `q`         | string            | No       | -                                                            |
| `diff`      | boolean \| string | No       | -                                                            |
| `page`      | integer           | No       | Minimum: 1.                                                  |
| `perPage`   | integer           | No       | Minimum: 10. Maximum: 250.                                   |
| `sortBy`    | string            | No       | Allowed values: `"source"`, `"destination"`, `"statusCode"`. |
| `sortOrder` | string            | No       | Allowed values: `"asc"`, `"desc"`.                           |
| `teamId`    | string            | No       | Team ID to use for this operation.                           |
| `slug`      | string            | No       | Team slug to use for this operation. Use instead of teamId.  |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
