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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "41ca50de22690266054804e392cec71458aafe1a35a617d55d7a250564302ff4"
---

# list_bulk_redirects

Gets project-level redirects.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions) — Use list_bulk_redirect_versions with Vercel MCP.
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Gets project-level redirects.](https://vercel.com/docs/rest-api/bulk-redirects/gets-project-level-redirects) — GET /v1/bulk-redirects — Get the version history for a project's bulk redirects
- [update_bulk_redirect_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version) — Use update_bulk_redirect_version with Vercel MCP.
- [Bulk Redirects](https://vercel.com/docs/routing/redirects/bulk-redirects) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
