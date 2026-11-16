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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c3809569a7f4d6903087a66866222b839a38732dd8c7c76771922ff09497a9e0"
---

# list_feature_flag_sdk_keys

Get all SDK keys.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get all SDK keys](https://vercel.com/docs/rest-api/feature-flags/get-all-sdk-keys) — GET /v1/projects/{projectIdOrName}/feature-flags/sdk-keys — Gets all SDK keys for a project.
- [create_sdk_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key) — Use create_sdk_key with Vercel MCP.
- [list_flag_segments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_segments) — Use list_flag_segments with Vercel MCP.
- [Create an SDK key](https://vercel.com/docs/rest-api/feature-flags/create-an-sdk-key) — PUT /v1/projects/{projectIdOrName}/feature-flags/sdk-keys — Creates an SDK key.
- [List team project flag settings](https://vercel.com/docs/rest-api/feature-flags/list-team-project-flag-settings) — GET /v1/teams/{teamId}/feature-flags/settings — Retrieve feature flag settings for projects in a team.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
