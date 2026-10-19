---
title: run_session_command
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use run_session_command with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "fc5eaf8834068ba9ed8cc9dc61292e466fabea3eb7b1419118d8b44e257b57cb"
---

# run_session_command

Execute a command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command) — Use get_session_command with Vercel MCP.
- [kill_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command) — Use kill_session_command with Vercel MCP.
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands) — Use list_session_commands with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session) — Use stop_session with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                           |
| ------------- | ------ | -------- | --------------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session in which to execute the command. |
| `teamId`      | string | No       | Team ID to use for this operation.                                    |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.           |
| `requestBody` | object | No       | Request body for this tool.                                           |


---

[View full sitemap](/docs/sitemap)
