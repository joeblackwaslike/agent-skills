---
title: get_flag
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_flag with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f8881618e6ba5528693764be09eb6e50acf129924451173a0088574b4a5b9b38"
---

# get_flag

Get a flag.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag) — Use update_flag with Vercel MCP.
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings) — Use get_flag_settings with Vercel MCP.
- [get_flag_segment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment) — Use get_flag_segment with Vercel MCP.
- [create_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flag) — Use create_flag with Vercel MCP.
- [list_flag_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_versions) — Use list_flag_versions with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                                           |
| ----------------- | ------- | -------- | --------------------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                                |
| `flagIdOrSlug`    | string  | Yes      | The flag id or name                                                   |
| `ifMatch`         | string  | No       | ETag to match, can be used interchangeably with the `if-match` header |
| `withMetadata`    | boolean | No       | Whether to include metadata in the response                           |
| `teamId`          | string  | No       | Team ID to use for this operation.                                    |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId.           |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
