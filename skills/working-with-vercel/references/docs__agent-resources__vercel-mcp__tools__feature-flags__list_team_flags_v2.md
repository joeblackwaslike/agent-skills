---
title: list_team_flags_v2
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_team_flags_v2 with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c18d1af8d25d3670d9fc04a44c6551b6e977f23b91a58a3949bb30ec8625ea59"
---

# list_team_flags_v2

Retrieve all feature flags for a team across all projects. Returns an opaque cursor for pagination.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_team_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags) — Use list_team_flags with Vercel MCP.
- [list_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2) — Use list_flags_v2 with Vercel MCP.
- [list_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags) — Use list_flags with Vercel MCP.
- [list_team_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings) — Use list_team_flag_settings with Vercel MCP.
- [List all flags for a team](https://vercel.com/docs/rest-api/feature-flags/list-all-flags-for-a-team) — GET /v2/teams/{teamId}/feature-flags/flags — Retrieve all feature flags for a team across all projects. Returns an opaqu

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                 | Type             | Required | Description                                                                                         |
| ------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `state`                   | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`. |
| `limit`                   | integer          | No       | Maximum number of flags to return. Minimum: 1. Maximum: 100. Default: `25`.                         |
| `cursor`                  | string           | No       | Pagination cursor to continue from.                                                                 |
| `search`                  | string           | No       | Search flags by their slug or description. Case-insensitive.                                        |
| `kind`                    | string           | No       | The kind of flags to retrieve. Allowed values: `"boolean"`, `"string"`, `"number"`, `"json"`.       |
| `tags`                    | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                       |
| `createdBy`               | string           | No       | Filter flags by the id of the entity that created them (a user or team id).                         |
| `maintainerIds`           | Array\<string> | No       | Filter flags by maintainer user id. Repeat the parameter for multiple maintainers (any may match).  |
| `includeMarketplaceFlags` | boolean          | No       | Whether to include Marketplace experimentation items in the paginated response. Defaults to false.  |
| `teamId`                  | string           | Yes      | Team ID to use for this operation.                                                                  |
| `slug`                    | string           | No       | Team slug to use for this operation. Use instead of teamId.                                         |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
