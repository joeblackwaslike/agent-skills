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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "92c8840a787e01a133c6b78d1e9ec404ac3489ffa1f20ec9cffe3c58c4fe0b9c"
---

# list_flags_v2

List flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags) — Use list_flags with Vercel MCP.
- [list_team_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2) — Use list_team_flags_v2 with Vercel MCP.
- [list_team_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags) — Use list_team_flags with Vercel MCP.
- [List flags](https://vercel.com/docs/rest-api/feature-flags/list-flags) — GET /v2/projects/{projectIdOrName}/feature-flags/flags — Retrieve feature flags for a project. Returns an opaque cursor
- [List all flags for a team](https://vercel.com/docs/rest-api/feature-flags/list-all-flags-for-a-team) — GET /v2/teams/{teamId}/feature-flags/flags — Retrieve all feature flags for a team across all projects. Returns an opaqu

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                 | Type             | Required | Description                                                                                         |
| ------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `projectIdOrName`         | string           | Yes      | The project id or name                                                                              |
| `state`                   | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`. |
| `limit`                   | integer          | No       | Maximum number of flags to return. Minimum: 1. Maximum: 100. Default: `25`.                         |
| `cursor`                  | string           | No       | Pagination cursor to continue from.                                                                 |
| `search`                  | string           | No       | Search flags by their slug or description. Case-insensitive.                                        |
| `tags`                    | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                       |
| `createdBy`               | string           | No       | Filter flags by the id of the entity that created them (a user or team id).                         |
| `maintainerIds`           | Array\<string> | No       | Filter flags by maintainer user id. Repeat the parameter for multiple maintainers (any may match).  |
| `includeMarketplaceFlags` | boolean          | No       | Whether to include Marketplace experimentation items in the paginated response. Defaults to false.  |
| `teamId`                  | string           | No       | Team ID to use for this operation.                                                                  |
| `slug`                    | string           | No       | Team slug to use for this operation. Use instead of teamId.                                         |

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
