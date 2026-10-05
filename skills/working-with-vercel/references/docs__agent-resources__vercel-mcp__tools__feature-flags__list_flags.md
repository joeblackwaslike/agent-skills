---
title: list_flags
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_flags with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "f27a8c6d8c3e73b84db0d0acf43829191b5af1736477fbed0200803d9a8bb4c5"
---

# list_flags

List flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags&source_site=vercel-docs&relationship=related) — Use list_flags_v2 with Vercel MCP.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags&source_site=vercel-docs&relationship=related) — Use get_flag with Vercel MCP.
- [List flags](https://vercel.com/docs/rest-api/feature-flags/list-flags?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/feature-flags/flags — Retrieve feature flags for a project. Returns an opaque cursor
- [List all flags for a team](https://vercel.com/docs/rest-api/feature-flags/list-all-flags-for-a-team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags&source_site=vercel-docs&relationship=related) — GET /v2/teams/{teamId}/feature-flags/flags — Retrieve all feature flags for a team across all projects. Returns an opaqu
- [List team project flag settings](https://vercel.com/docs/rest-api/feature-flags/list-team-project-flag-settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags&source_site=vercel-docs&relationship=related) — GET /v1/teams/{teamId}/feature-flags/settings — Retrieve feature flag settings for projects in a team.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectIdOrName` | string           | Yes      | The project id or name                                                                                                                                                                                                                                                                                                                                  |
| `state`           | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`.                                                                                                                                                                                                                                                     |
| `withMetadata`    | boolean          | No       | Deprecated. Whether to include creator metadata in each flag in the response. Resolve creator identity client-side (e.g. via the team members endpoint) instead; this parameter will be removed in a future release. Use `GET /v1/projects/:id/feature-flags/flags/:flagIdOrSlug?withMetadata=true` for single-flag lookups that need creator metadata. |
| `limit`           | integer          | No       | Maximum number of flags to return. When not set, all flags are returned.                                                                                                                                                                                                                                                                                |
| `cursor`          | string           | No       | Pagination cursor to continue from.                                                                                                                                                                                                                                                                                                                     |
| `search`          | string           | No       | Search flags by their slug or description. Case-insensitive.                                                                                                                                                                                                                                                                                            |
| `tags`            | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                                                                                                                                                                                                                                                                           |
| `teamId`          | string           | No       | Team ID.                                                                                                                                                                                                                                                                                                                                                |
| `slug`            | string           | No       | Team slug.                                                                                                                                                                                                                                                                                                                                              |


---

[View full sitemap](/docs/sitemap)
