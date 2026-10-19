---
title: list_team_flags
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_team_flags with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4fc0e3a6adefca201dbbd3f7672c393c88c938c311862afda87c11dceb213f5f"
---

# list_team_flags

Retrieve all feature flags for a team across all projects. The list can be filtered by state and supports pagination.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_team_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2) — Use list_team_flags_v2 with Vercel MCP.
- [list_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags) — Use list_flags with Vercel MCP.
- [list_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2) — Use list_flags_v2 with Vercel MCP.
- [list_team_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings) — Use list_team_flag_settings with Vercel MCP.
- [List all flags for a team](https://vercel.com/docs/rest-api/feature-flags/list-all-flags-for-a-team) — GET /v2/teams/{teamId}/feature-flags/flags — Retrieve all feature flags for a team across all projects. Returns an opaqu

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type             | Required | Description                                                                                                                                                                                                          |
| -------------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`        | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`.                                                                                                                  |
| `withMetadata` | boolean          | No       | Deprecated. Whether to include creator metadata in each flag in the response. Resolve creator identity client-side (e.g. via the team members endpoint) instead. This parameter will be removed in a future release. |
| `limit`        | integer          | No       | Maximum number of flags to return. Minimum: 1. Maximum: 100. Default: `20`.                                                                                                                                          |
| `cursor`       | string           | No       | Pagination cursor to continue from.                                                                                                                                                                                  |
| `search`       | string           | No       | Search flags by their slug or description. Case-insensitive.                                                                                                                                                         |
| `kind`         | string           | No       | The kind of flags to retrieve. Allowed values: `"boolean"`, `"string"`, `"number"`, `"json"`.                                                                                                                        |
| `tags`         | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                                                                                                                                        |
| `teamId`       | string           | Yes      | Team ID to use for this operation.                                                                                                                                                                                   |
| `slug`         | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                          |


---

[View full sitemap](/docs/sitemap)
