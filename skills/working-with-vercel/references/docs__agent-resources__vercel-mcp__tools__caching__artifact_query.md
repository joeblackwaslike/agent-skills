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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0e720968cdcedd7a4ffefbc97a70565d20e331a45c8c7ab217b4c50df089c099"
---

# artifact_query

Query information about an artifact.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query artifact information](https://turborepo.dev/docs/openapi/artifacts/artifact-query?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Fartifact_query&source_site=vercel-docs&relationship=related) — Query information about multiple artifacts by their hashes. Returns metadata about each artifact including size, task du
- [Query information about an artifact](https://vercel.com/docs/rest-api/artifacts/query-information-about-an-artifact?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Fartifact_query&source_site=vercel-docs&relationship=related) — POST /v8/artifacts — Query information about an array of artifacts.
- [create_observability_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/create_observability_query?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Fartifact_query&source_site=vercel-docs&relationship=related) — Use create_observability_query with Vercel MCP.
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Fartifact_query&source_site=vercel-docs&relationship=related) — Use upload_artifact with Vercel MCP.
- [record_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/record_events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Fartifact_query&source_site=vercel-docs&relationship=related) — Use record_events with Vercel MCP.
- [Check if a cache artifact exists](https://vercel.com/docs/rest-api/artifacts/check-if-a-cache-artifact-exists?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Fartifact_query&source_site=vercel-docs&relationship=related) — HEAD /v8/artifacts/{hash} — Check that a cache artifact with the given \\`hash\\` exists. This request returns response he

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/artifact_query.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Fartifact_query&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
