---
title: list_team_flag_settings
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_team_flag_settings with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "82d0fd81dfd98c3b2a445b9d3cfb044b5f9ff25fefc40e4f936368cfd786d49a"
---

# list_team_flag_settings

Retrieve feature flag settings for projects in a team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_team_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags) — Use list_team_flags with Vercel MCP.
- [list_team_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flags_v2) — Use list_team_flags_v2 with Vercel MCP.
- [List team project flag settings](https://vercel.com/docs/rest-api/feature-flags/list-team-project-flag-settings) — GET /v1/teams/{teamId}/feature-flags/settings — Retrieve feature flag settings for projects in a team.
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings) — Use get_flag_settings with Vercel MCP.
- [list_flag_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_versions) — Use list_flag_versions with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type    | Required | Description                                                                    |
| --------- | ------- | -------- | ------------------------------------------------------------------------------ |
| `limit`   | integer | No       | Maximum number of settings to return. Minimum: 1. Maximum: 100. Default: `20`. |
| `cursor`  | string  | No       | Pagination cursor to continue from.                                            |
| `teamId`  | string  | Yes      | Team ID to use for this operation.                                             |
| `slug`    | string  | No       | Team slug to use for this operation. Use instead of teamId.                    |

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
