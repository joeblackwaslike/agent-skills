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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c488c07cf4bfdb088c891bde8868ac3db21a12d3a3e8904a0e9e2b5c27139c86"
---

# invalidate_by_tags

Invalidate by tag.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Invalidate by tag](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-tag) — POST /v1/edge-cache/invalidate-by-tags — Marks a cache tag as stale, causing cache entries associated with that tag to b
- [invalidate_by_src_images](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_src_images) — Use invalidate_by_src_images with Vercel MCP.
- [Invalidate the CDN cache by tag](https://vercel.com/changelog/invalidate-the-cdn-cache-by-tag)
- [Invalidate by source image](https://vercel.com/docs/rest-api/edge-cache/invalidate-by-source-image) — POST /v1/edge-cache/invalidate-by-src-images — Marks a source image as stale, causing its corresponding transformed imag
- [Dangerously delete by tag](https://vercel.com/docs/rest-api/edge-cache/dangerously-delete-by-tag) — POST /v1/edge-cache/dangerously-delete-by-tags — Marks a cache tag as deleted, causing cache entries associated with tha
- [List image tags](https://vercel.com/docs/rest-api/vcr/list-image-tags) — GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/tags/list — GET /v2/:teamSlug/:projectSlug/:repositoryName/tags/list L

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/invalidate_by_tags.graph.md)
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
