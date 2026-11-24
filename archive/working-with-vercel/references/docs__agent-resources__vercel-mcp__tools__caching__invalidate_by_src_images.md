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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "fe4c0d4c8723c03ddd41220be4a6e03e7fec0c8b344486251e4129eae7abd6e1"
---

# invalidate_by_src_images

Invalidate by source image.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Invalidate by source image](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-source-image) — POST /v1/edge-cache/invalidate-by-src-images — Marks a source image as stale, causing its corresponding transformed imag
- [invalidate_by_tags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags) — Use invalidate_by_tags with Vercel MCP.
- [You can now invalidate the CDN cache by providing a source image](https://vercel.com/changelog/you-can-now-invalidate-the-cdn-cache-by-providing-a-source-image)
- [Dangerously delete by source image](https://vercel.com/docs/rest-api/edge-cache/dangerously-delete-by-source-image) — POST /v1/edge-cache/dangerously-delete-by-src-images — Marks a source image as deleted, causing cache entries associated
- [Invalidate by tag](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-tag) — POST /v1/edge-cache/invalidate-by-tags — Marks a cache tag as stale, causing cache entries associated with that tag to b
- [vercel cache](https://vercel.com/docs/cli/cache) — Learn how to manage cache for your project using the vercel cache CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name.                                     |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object | No       | Request body for this tool.                                 |

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
