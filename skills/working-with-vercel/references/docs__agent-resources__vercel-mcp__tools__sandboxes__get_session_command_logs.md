---
title: get_session_command_logs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_session_command_logs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6f8fba0e0f7db8395d90a7739e844e19e2eab689ee8802251c365926a77dfe1d"
---

# get_session_command_logs

Stream command logs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands) — Use list_session_commands with Vercel MCP.
- [get_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command) — Use get_session_command with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [get_session_snapshot](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot) — Use get_session_snapshot with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                  |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| `sessionId` | string | Yes      | The unique identifier of the session containing the command. |
| `cmdId`     | string | Yes      | The unique identifier of the command to stream logs for.     |
| `teamId`    | string | No       | Team ID to use for this operation.                           |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.  |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
