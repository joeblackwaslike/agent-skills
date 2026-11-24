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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/record_events.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "6e52163b23e9650e85d2aa0e594dbe6ce372ba0d8cfedd888467edea8001309b"
---

# record_events

Record an artifacts cache usage event.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Record an artifacts cache usage event](https://vercel.com/docs/rest-api/artifacts/record-an-artifacts-cache-usage-event) — POST /v8/artifacts/events — Records an artifacts cache usage event. The body of this request is an array of cache usage
- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query) — Use artifact_query with Vercel MCP.
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact) — Use upload_artifact with Vercel MCP.
- [list_user_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_user_events) — Use list_user_events with Vercel MCP.
- [aggregate_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events) — Use aggregate_events with Vercel MCP.

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
