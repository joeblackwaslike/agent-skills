---
title: get_session
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/get_session
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_session with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "76430ccd8306253fb4c65adfb1251d734ece26b01e4fdb0ec1ef85f3030c02bd"
---

# get_session

Get a session.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_session_snapshot](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot) — Use get_session_snapshot with Vercel MCP.
- [get_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command) — Use get_session_command with Vercel MCP.
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands) — Use list_session_commands with Vercel MCP.
- [get_session_command_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs) — Use get_session_command_logs with Vercel MCP.
- [read_session_file](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file) — Use read_session_file with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId` | string | Yes      | The unique identifier of the session to retrieve.           |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
