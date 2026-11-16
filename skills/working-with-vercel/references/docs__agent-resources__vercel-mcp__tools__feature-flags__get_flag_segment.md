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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e4bc0a7456968dcbf69c8715084b10ed98bcc3ee91c588d10221904b63781c57"
---

# get_flag_segment

Retrieve a feature flag segment by ID or slug.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flag_segments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flag_segments) — Use list_flag_segments with Vercel MCP.
- [update_flag_segment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment) — Use update_flag_segment with Vercel MCP.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag) — Use get_flag with Vercel MCP.
- [Get a segment](https://vercel.com/docs/rest-api/feature-flags/get-a-segment) — GET /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug} — Retrieve a feature flag segment by ID or s
- [Delete a segment](https://vercel.com/docs/rest-api/feature-flags/delete-a-segment) — DELETE /v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug} — Delete a feature flag segment.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_segment.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                      |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                                            |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`.               |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |

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
