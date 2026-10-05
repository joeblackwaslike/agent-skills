---
title: invalidate_by_tags
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/caching
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use invalidate_by_tags with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4a1fbd2ec62a364215f7555f8a06d804ded0bf1f31255b319848c60508ffd94d"
---

# invalidate_by_tags

Invalidate by tag.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [invalidate_by_src_images](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_tags&source_site=vercel-docs&relationship=related) — Use invalidate_by_src_images with Vercel MCP.
- [Invalidate by tag](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-tag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_tags&source_site=vercel-docs&relationship=related) — POST /v1/edge-cache/invalidate-by-tags — Marks a cache tag as stale, causing cache entries associated with that tag to b
- [Dangerously delete by tag](https://vercel.com/docs/rest-api/edge-cache/dangerously-delete-by-tag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_tags&source_site=vercel-docs&relationship=related) — POST /v1/edge-cache/dangerously-delete-by-tags — Marks a cache tag as deleted, causing cache entries associated with tha
- [Invalidate by source image](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-source-image?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_tags&source_site=vercel-docs&relationship=related) — POST /v1/edge-cache/invalidate-by-src-images — Marks a source image as stale, causing its corresponding transformed imag
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_tags&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_tags&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name.     |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
