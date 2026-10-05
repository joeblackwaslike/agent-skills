---
title: update_flag
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_flag with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d0b9ba6274c15479f80d4b5b91ac3bd44aa45cb009d7adec2dd93dcf4c075dfb"
---

# update_flag

Update a flag.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag&source_site=vercel-docs&relationship=related) — Use update_flag_settings with Vercel MCP.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag&source_site=vercel-docs&relationship=related) — Use get_flag with Vercel MCP.
- [update_flag_segment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag&source_site=vercel-docs&relationship=related) — Use update_flag_segment with Vercel MCP.
- [create_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag&source_site=vercel-docs&relationship=related) — Use create_flag with Vercel MCP.
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag&source_site=vercel-docs&relationship=related) — Use get_flag_settings with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                                           |
| ----------------- | ------- | -------- | --------------------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                                |
| `flagIdOrSlug`    | string  | Yes      | The flag id or name                                                   |
| `ifMatch`         | string  | No       | ETag to match, can be used interchangeably with the `if-match` header |
| `withMetadata`    | boolean | No       | Whether to include metadata in the response                           |
| `teamId`          | string  | No       | Team ID.                                                              |
| `slug`            | string  | No       | Team slug.                                                            |
| `requestBody`     | object  | No       | Request body for this tool.                                           |


---

[View full sitemap](/docs/sitemap)
