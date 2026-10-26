---
title: list_flag_versions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_versions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_versions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_flag_versions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_versions.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "20f8c0337a611d92b7c00086b7e9f5e243be112351457c2cb788dc30f2517321"
---

# list_flag_versions

Lists flag versions for a given flag.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flag_segments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_segments) — Use list_flag_segments with Vercel MCP.
- [list_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags) — Use list_flags with Vercel MCP.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag) — Use get_flag with Vercel MCP.
- [List flag versions](https://vercel.com/docs/rest-api/feature-flags/list-flag-versions) — GET /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}/versions — Lists flag versions for a given flag.
- [list_flags_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_v2) — Use list_flags_v2 with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_versions.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_versions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project ID or name.                                     |
| `flagIdOrSlug`    | string  | Yes      | The feature flag ID or slug.                                |
| `limit`           | number  | No       | Minimum: 1. Maximum: 100. Default: `20`.                    |
| `cursor`          | string  | No       | Pagination cursor                                           |
| `environment`     | string  | No       | Environment to filter by                                    |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`.               |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
