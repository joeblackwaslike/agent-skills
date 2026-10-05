---
title: list_flags_v2
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_flags_v2 with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "b5452f92ec8cc3611c96c94748b7a85beec57006fd2f24e6092fadf3bf39250f"
---

# list_flags_v2

List flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags_v2&source_site=vercel-docs&relationship=related) — Use list_flags with Vercel MCP.
- [List all flags for a team](https://vercel.com/docs/rest-api/feature-flags/list-all-flags-for-a-team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags_v2&source_site=vercel-docs&relationship=related) — GET /v2/teams/{teamId}/feature-flags/flags — Retrieve all feature flags for a team across all projects. Returns an opaqu
- [List flags](https://vercel.com/docs/rest-api/feature-flags/list-flags?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags_v2&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/feature-flags/flags — Retrieve feature flags for a project. Returns an opaque cursor
- [List team project flag settings](https://vercel.com/docs/rest-api/feature-flags/list-team-project-flag-settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags_v2&source_site=vercel-docs&relationship=related) — GET /v1/teams/{teamId}/feature-flags/settings — Retrieve feature flag settings for projects in a team.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags_v2&source_site=vercel-docs&relationship=related) — Use get_flag with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_flags_v2&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter                 | Type             | Required | Description                                                                                         |
| ------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `projectIdOrName`         | string           | Yes      | The project id or name                                                                              |
| `state`                   | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`. |
| `limit`                   | integer          | No       | Maximum number of flags to return. Default: `25`.                                                   |
| `cursor`                  | string           | No       | Pagination cursor to continue from.                                                                 |
| `search`                  | string           | No       | Search flags by their slug or description. Case-insensitive.                                        |
| `tags`                    | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                       |
| `createdBy`               | string           | No       | Filter flags by the id of the entity that created them (a user or team id).                         |
| `maintainerIds`           | Array\<string> | No       | Filter flags by maintainer user id. Repeat the parameter for multiple maintainers (any may match).  |
| `includeMarketplaceFlags` | boolean          | No       | Whether to include Marketplace experimentation items in the paginated response. Defaults to false.  |
| `teamId`                  | string           | No       | Team ID.                                                                                            |
| `slug`                    | string           | No       | Team slug.                                                                                          |


---

[View full sitemap](/docs/sitemap)
