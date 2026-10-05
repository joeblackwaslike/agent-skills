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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "f7bd158aab36a2f3e11cc102c01f0edeb0e65e1916b6f58beb5f5abf7ad2f30b"
---

# list_feature_flag_sdk_keys

Get all SDK keys.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_sdk_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_feature_flag_sdk_keys&source_site=vercel-docs&relationship=related) — Use create_sdk_key with Vercel MCP.
- [Get all SDK keys](https://vercel.com/docs/rest-api/feature-flags/get-all-sdk-keys?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_feature_flag_sdk_keys&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectIdOrName}/feature-flags/sdk-keys — Gets all SDK keys for a project.
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_feature_flag_sdk_keys&source_site=vercel-docs&relationship=related) — Use get_flag_settings with Vercel MCP.
- [list_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_feature_flag_sdk_keys&source_site=vercel-docs&relationship=related) — Use list_flags with Vercel MCP.
- [List team project flag settings](https://vercel.com/docs/rest-api/feature-flags/list-team-project-flag-settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_feature_flag_sdk_keys&source_site=vercel-docs&relationship=related) — GET /v1/teams/{teamId}/feature-flags/settings — Retrieve feature flag settings for projects in a team.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Flist_feature_flag_sdk_keys&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description            |
| ----------------- | ------ | -------- | ---------------------- |
| `projectIdOrName` | string | Yes      | The project id or name |
| `teamId`          | string | No       | Team ID.               |
| `slug`            | string | No       | Team slug.             |


---

[View full sitemap](/docs/sitemap)
