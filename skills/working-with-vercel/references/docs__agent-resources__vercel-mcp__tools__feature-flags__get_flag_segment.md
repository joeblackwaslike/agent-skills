---
title: get_flag_segment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_flag_segment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "2ca3600f16d1262bbe396732e326aa6f06db383f1627f68fa7f00800baf833cf"
---

# get_flag_segment

Get a segment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_flag_segment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_segment&source_site=vercel-docs&relationship=related) — Use update_flag_segment with Vercel MCP.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_segment&source_site=vercel-docs&relationship=related) — Use get_flag with Vercel MCP.
- [Get a segment](https://vercel.com/docs/rest-api/feature-flags/get-a-segment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_segment&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug} — Retrieve a feature flag segment by ID or s
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_segment&source_site=vercel-docs&relationship=related) — Use get_flag_settings with Vercel MCP.
- [List segments](https://vercel.com/docs/rest-api/feature-flags/list-segments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_segment&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectIdOrName}/feature-flags/segments — List all feature flag segments for a project.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_segment&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                   |
| ----------------- | ------- | -------- | --------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                        |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                              |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`. |
| `teamId`          | string  | No       | Team ID.                                      |
| `slug`            | string  | No       | Team slug.                                    |


---

[View full sitemap](/docs/sitemap)
