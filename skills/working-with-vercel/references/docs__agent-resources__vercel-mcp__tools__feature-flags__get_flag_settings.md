---
title: get_flag_settings
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_flag_settings with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "262e1cb58234d9487c343b90e5d0259ecd284620e24cb301acc4081bbd25d96b"
---

# get_flag_settings

Get project flag settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings) — Use update_flag_settings with Vercel MCP.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag) — Use get_flag with Vercel MCP.
- [list_team_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings) — Use list_team_flag_settings with Vercel MCP.
- [Get project flag settings](https://vercel.com/docs/rest-api/feature-flags/get-project-flag-settings) — GET /v1/projects/{projectIdOrName}/feature-flags/settings — Retrieve feature flag settings for a project.
- [list_flag_segments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_segments) — Use list_flag_segments with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
