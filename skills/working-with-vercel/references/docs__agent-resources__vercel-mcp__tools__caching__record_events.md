---
title: record_events
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/caching/record_events
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/record_events"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/caching
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use record_events with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/record_events.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5491541b92038ccfff4dd8b49adcaa22808e4f57f00c62f4d960e6b3e0631865"
---

# record_events

Record an artifacts cache usage event.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Record cache usage events](https://turborepo.dev/docs/openapi/artifacts/record-events) — Records cache usage analytics events. The body of this request is an array of cache usage events.
- [Record an artifacts cache usage event](https://vercel.com/docs/rest-api/artifacts/record-an-artifacts-cache-usage-event) — POST /v8/artifacts/events — Records an artifacts cache usage event. The body of this request is an array of cache usage
- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query) — Use artifact_query with Vercel MCP.
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact) — Use upload_artifact with Vercel MCP.
- [aggregate_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events) — Use aggregate_events with Vercel MCP.
- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/record_events.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/record_events.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                    | Type             | Required | Description                                                                           |
| ---------------------------- | ---------------- | -------- | ------------------------------------------------------------------------------------- |
| `xArtifactClientCi`          | string           | No       | The continuous integration or delivery environment where this artifact is downloaded. |
| `xArtifactClientInteractive` | integer          | No       | 1 if the client is an interactive shell. Otherwise 0 Minimum: 0. Maximum: 1.          |
| `teamId`                     | string           | No       | Team ID to use for this operation.                                                    |
| `slug`                       | string           | No       | Team slug to use for this operation. Use instead of teamId.                           |
| `requestBody`                | Array\<object> | Yes      | Request body for this tool.                                                           |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
