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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0ffcb7caede03eb6405229907f2a6671bf8b1c18339a8d8dd26508d75ebe6955"
---

# list_bulk_redirects

Gets project-level redirects.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_bulk_redirect_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirect_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=related) — Use list_bulk_redirect_versions with Vercel MCP.
- [Bulk redirects are now generally available](https://vercel.com/changelog/bulk-redirects-are-now-generally-available?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=related)
- [Bulk redirects UI, API, and CLI now generally available](https://vercel.com/changelog/bulk-redirects-ui-api-and-cli-now-generally-available?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=related)
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=related) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Gets project-level redirects.](https://vercel.com/docs/rest-api/bulk-redirects/gets-project-level-redirects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=related) — GET /v1/bulk-redirects — Get the version history for a project's bulk redirects
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=related) — Use list_project_routes with Vercel MCP.
- [Edit a project-level redirect.](https://vercel.com/docs/rest-api/bulk-redirects/edit-a-project-level-redirect?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=related) — PATCH /v1/bulk-redirects — Edits a single redirect identified by its source path. Stages a new change with the modified

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Flist_bulk_redirects&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type              | Required | Description                                                  |
| ----------- | ----------------- | -------- | ------------------------------------------------------------ |
| `projectId` | string            | Yes      | The project ID.                                              |
| `versionId` | string            | No       | -                                                            |
| `q`         | string            | No       | -                                                            |
| `diff`      | boolean \| string | No       | -                                                            |
| `page`      | integer           | No       | -                                                            |
| `perPage`   | integer           | No       | -                                                            |
| `sortBy`    | string            | No       | Allowed values: `"source"`, `"destination"`, `"statusCode"`. |
| `sortOrder` | string            | No       | Allowed values: `"asc"`, `"desc"`.                           |
| `teamId`    | string            | No       | Team ID.                                                     |
| `slug`      | string            | No       | Team slug.                                                   |


---

[View full sitemap](/docs/sitemap)
