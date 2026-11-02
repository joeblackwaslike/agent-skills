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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "a06544d56ed6b41b53149358565af21f286a31eaf939f523d38ba457bdd5e976"
---

# extend_session_timeout

Extend session timeout.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_session_network_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy) — Use update_session_network_policy with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session) — Use stop_session with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [Extend session timeout](https://vercel.com/docs/rest-api/sandboxes/extend-session-timeout) — POST /v2/sandboxes/sessions/{sessionId}/extend-timeout — Extends the maximum execution time of a running session. The se

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
