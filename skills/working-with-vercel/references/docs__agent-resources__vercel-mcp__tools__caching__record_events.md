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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "128da2846710fbfe6c2b5f9cdfeae090c9aff52124c87ad865c89e3632a0d9e9"
---

# record_events

Record an artifacts cache usage event.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Record cache usage events](https://turborepo.dev/docs/openapi/artifacts/record-events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Frecord_events&source_site=vercel-docs&relationship=related) — Records cache usage analytics events. The body of this request is an array of cache usage events.
- [Record an artifacts cache usage event](https://vercel.com/docs/rest-api/artifacts/record-an-artifacts-cache-usage-event?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Frecord_events&source_site=vercel-docs&relationship=related) — POST /v8/artifacts/events — Records an artifacts cache usage event. The body of this request is an array of cache usage
- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Frecord_events&source_site=vercel-docs&relationship=related) — Use artifact_query with Vercel MCP.
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Frecord_events&source_site=vercel-docs&relationship=related) — Use upload_artifact with Vercel MCP.
- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Frecord_events&source_site=vercel-docs&relationship=related) — Use update_record with Vercel MCP.
- [aggregate_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Frecord_events&source_site=vercel-docs&relationship=related) — Use aggregate_events with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/record_events.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/record_events.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching%2Frecord_events&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter                    | Type             | Required | Description                                                                           |
| ---------------------------- | ---------------- | -------- | ------------------------------------------------------------------------------------- |
| `xArtifactClientCi`          | string           | No       | The continuous integration or delivery environment where this artifact is downloaded. |
| `xArtifactClientInteractive` | integer          | No       | 1 if the client is an interactive shell. Otherwise 0                                  |
| `teamId`                     | string           | No       | Team ID.                                                                              |
| `slug`                       | string           | No       | Team slug.                                                                            |
| `requestBody`                | Array\<object> | Yes      | Request body for this tool.                                                           |


---

[View full sitemap](/docs/sitemap)
