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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "a969c120854aef3b642c221061ce02a402904460db61cc0d8cc046831df6468f"
---

# update_flag_segment

Update a segment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_flag_segment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag_segment&source_site=vercel-docs&relationship=related) — Use get_flag_segment with Vercel MCP.
- [update_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag_segment&source_site=vercel-docs&relationship=related) — Use update_flag with Vercel MCP.
- [update_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag_segment&source_site=vercel-docs&relationship=related) — Use update_flag_settings with Vercel MCP.
- [update_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_version?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag_segment&source_site=vercel-docs&relationship=related) — Use update_version with Vercel MCP.
- [Update a segment](https://vercel.com/docs/rest-api/feature-flags/update-a-segment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag_segment&source_site=vercel-docs&relationship=related) — PATCH /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug} — Update an existing feature flag segment.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fupdate_flag_segment&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                   |
| ----------------- | ------- | -------- | --------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                        |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                              |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`. |
| `teamId`          | string  | No       | Team ID.                                      |
| `slug`            | string  | No       | Team slug.                                    |
| `requestBody`     | object  | No       | Request body for this tool.                   |


---

[View full sitemap](/docs/sitemap)
