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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0e944c968e2eabf0d295ffd0b156c8a8338465aa43b5e4515d383dad6f376ee3"
---

# list_flags

List flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2) — Use list_flags_v2 with Vercel MCP.
- [list_team_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags) — Use list_team_flags with Vercel MCP.
- [list_team_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2) — Use list_team_flags_v2 with Vercel MCP.
- [List flags](https://vercel.com/docs/rest-api/feature-flags/list-flags-1) — GET /v1/projects/{projectIdOrName}/feature-flags/flags — Retrieve feature flags for a project. The list can be filtered
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag) — Use get_flag with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectIdOrName` | string           | Yes      | The project id or name                                                                                                                                                                                                                                                                                                                                  |
| `state`           | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`.                                                                                                                                                                                                                                                     |
| `withMetadata`    | boolean          | No       | Deprecated. Whether to include creator metadata in each flag in the response. Resolve creator identity client-side (e.g. via the team members endpoint) instead. This parameter will be removed in a future release. Use `GET /v1/projects/:id/feature-flags/flags/:flagIdOrSlug?withMetadata=true` for single-flag lookups that need creator metadata. |
| `limit`           | integer          | No       | Maximum number of flags to return. When not set, all flags are returned. Minimum: 1. Maximum: 100.                                                                                                                                                                                                                                                      |
| `cursor`          | string           | No       | Pagination cursor to continue from.                                                                                                                                                                                                                                                                                                                     |
| `search`          | string           | No       | Search flags by their slug or description. Case-insensitive.                                                                                                                                                                                                                                                                                            |
| `tags`            | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                                                                                                                                                                                                                                                                           |
| `teamId`          | string           | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                                                                      |
| `slug`            | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                                                                             |

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
