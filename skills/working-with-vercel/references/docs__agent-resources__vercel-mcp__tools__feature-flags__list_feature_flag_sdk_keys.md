---
title: list_feature_flag_sdk_keys
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_feature_flag_sdk_keys with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "dc582e95d1bfdb5d39ec79482f0deeabfa6e45c8eaa4329aaefcce50c2fdd042"
---

# list_feature_flag_sdk_keys

Get all SDK keys.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_sdk_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key) — Use create_sdk_key with Vercel MCP.
- [list_flag_segments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_segments) — Use list_flag_segments with Vercel MCP.
- [Get all SDK keys](https://vercel.com/docs/rest-api/feature-flags/get-all-sdk-keys) — GET /v1/projects/{projectIdOrName}/feature-flags/sdk-keys — Gets all SDK keys for a project.
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings) — Use get_flag_settings with Vercel MCP.
- [list_team_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings) — Use list_team_flag_settings with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
