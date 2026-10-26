---
title: extend_session_timeout
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use extend_session_timeout with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "468ef8fc57cc7e3d5b9f57dc75071a74ba73796b52feda7cbb12e7a5fdda4565"
---

# extend_session_timeout

Extend session timeout.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_session_network_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy) — Use update_session_network_policy with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session) — Use stop_session with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                     |
| ------------- | ------ | -------- | --------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to extend the timeout for. |
| `teamId`      | string | No       | Team ID to use for this operation.                              |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.     |
| `requestBody` | object | No       | Request body for this tool.                                     |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
