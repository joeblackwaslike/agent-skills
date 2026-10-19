---
title: update_flag_segment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_flag_segment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "5e410288337301ff2ef98b0417bd3410aa1109a3376622351a97fa4a33f707fa"
---

# update_flag_segment

Update an existing feature flag segment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_flag_segment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment) — Use get_flag_segment with Vercel MCP.
- [update_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag) — Use update_flag with Vercel MCP.
- [list_flag_segments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_segments) — Use list_flag_segments with Vercel MCP.
- [update_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings) — Use update_flag_settings with Vercel MCP.
- [create_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flag) — Use create_flag with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                      |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                                            |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`.               |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object  | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
