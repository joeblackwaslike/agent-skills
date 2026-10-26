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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "42fc51486660f8a2e01ca76847579324b682384c9cd2e9d79655862d954fc3cb"
---

# artifact_query

Query information about an artifact.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query information about an artifact](https://vercel.com/docs/rest-api/artifacts/query-information-about-an-artifact) — POST /v8/artifacts — Query information about an array of artifacts.
- [Query artifact information](https://turborepo.dev/docs/openapi/artifacts/artifact-query) — Query information about multiple artifacts by their hashes. Returns metadata about each artifact including size, task du
- [create_observability_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/create_observability_query) — Use create_observability_query with Vercel MCP.
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact) — Use upload_artifact with Vercel MCP.
- [record_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/record_events) — Use record_events with Vercel MCP.
- [Check if a cache artifact exists](https://vercel.com/docs/rest-api/artifacts/check-if-a-cache-artifact-exists) — HEAD /v8/artifacts/{hash} — Check that a cache artifact with the given \\`hash\\` exists. This request returns response he

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
