---
title: create_trace_session
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/observability/create_trace_session
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/create_trace_session"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/observability
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_trace_session with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/create_trace_session.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c0b0ace66b4fd8ddf9ecb1761f9a902113d9d7f015ec91fc5c18e1d11a99570c"
---

# create_trace_session

Mints a short-lived HS256 JWT scoped to a deployment hostname. The Vercel CLI presents this JWT to the Vercel proxy on requests it wants traced.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create a trace session token for a deployment](https://vercel.com/docs/rest-api/projects/create-a-trace-session-token-for-a-deployment) — POST /v1/projects/traces/session — Mints a short-lived HS256 JWT scoped to a deployment hostname. The Vercel CLI present
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/create_trace_session.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/create_trace_session.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
