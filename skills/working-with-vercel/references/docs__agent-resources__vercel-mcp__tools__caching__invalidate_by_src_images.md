---
title: invalidate_by_src_images
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/caching
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use invalidate_by_src_images with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "97d4d909de6de026128864d92b058798433bb334d9ba64c6dd1638e9e6123e04"
---

# invalidate_by_src_images

Invalidate by source image.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [invalidate_by_tags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_src_images&source_site=vercel-docs&relationship=related) — Use invalidate_by_tags with Vercel MCP.
- [Invalidate by source image](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-source-image?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_src_images&source_site=vercel-docs&relationship=related) — POST /v1/edge-cache/invalidate-by-src-images — Marks a source image as stale, causing its corresponding transformed imag
- [Dangerously delete by source image](https://vercel.com/docs/rest-api/edge-cache/dangerously-delete-by-source-image?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_src_images&source_site=vercel-docs&relationship=related) — POST /v1/edge-cache/dangerously-delete-by-src-images — Marks a source image as deleted, causing cache entries associated
- [Invalidate by tag](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-tag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_src_images&source_site=vercel-docs&relationship=related) — POST /v1/edge-cache/invalidate-by-tags — Marks a cache tag as stale, causing cache entries associated with that tag to b
- [update_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_src_images&source_site=vercel-docs&relationship=related) — Use update_project_check with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Finvalidate_by_src_images&source_site=vercel-docs&relationship=graph)
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
