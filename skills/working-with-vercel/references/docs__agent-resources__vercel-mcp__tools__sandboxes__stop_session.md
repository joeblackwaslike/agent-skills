---
title: stop_session
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use stop_session with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "499a8e11502373f66cdcf9a1788e8fbdcd790d432a1aeb1c5ac805f23b51b548"
---

# stop_session

Stop a session.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [kill_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command) — Use kill_session_command with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [extend_session_timeout](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout) — Use extend_session_timeout with Vercel MCP.
- [read_session_file](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file) — Use read_session_file with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `sessionId`   | string  | Yes      | The unique identifier of the session to stop.               |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
