---
title: artifact_query
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/caching/artifact_query
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/caching
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use artifact_query with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "698fa29523b10cb61db08bfc13da4f1f69dabac311a16b035ed3bcd1467857bb"
---

# artifact_query

Query information about an artifact.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query information about an artifact](https://vercel.com/docs/rest-api/artifacts/query-information-about-an-artifact) — POST /v8/artifacts — Query information about an array of artifacts.
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact) — Use upload_artifact with Vercel MCP.
- [create_observability_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/create_observability_query) — Use create_observability_query with Vercel MCP.
- [Download a cache artifact](https://vercel.com/docs/rest-api/artifacts/download-a-cache-artifact) — GET /v8/artifacts/{hash} — Downloads a cache artifact indentified by its \\`hash\\` specified on the request path. The art
- [Check if a cache artifact exists](https://vercel.com/docs/rest-api/artifacts/check-if-a-cache-artifact-exists) — HEAD /v8/artifacts/{hash} — Check that a cache artifact with the given \\`hash\\` exists. This request returns response he

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

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
