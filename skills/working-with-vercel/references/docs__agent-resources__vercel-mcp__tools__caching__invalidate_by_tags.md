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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "cf78347c7776be3fb0d4548bc1a27142ca46b923ca07a4d0588c3506430bca41"
---

# invalidate_by_tags

Invalidate by tag.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Invalidate by tag](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-tag) — POST /v1/edge-cache/invalidate-by-tags — Marks a cache tag as stale, causing cache entries associated with that tag to b
- [invalidate_by_src_images](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images) — Use invalidate_by_src_images with Vercel MCP.
- [Dangerously delete by tag](https://vercel.com/docs/rest-api/edge-cache/dangerously-delete-by-tag) — POST /v1/edge-cache/dangerously-delete-by-tags — Marks a cache tag as deleted, causing cache entries associated with tha
- [Invalidate by source image](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-source-image) — POST /v1/edge-cache/invalidate-by-src-images — Marks a source image as stale, causing its corresponding transformed imag
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project) — Use update_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name.                                     |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
