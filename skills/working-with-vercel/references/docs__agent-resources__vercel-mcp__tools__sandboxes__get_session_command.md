---
title: get_session_command
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_session_command with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "8711edfcf70da1d0d26b969ad574aa25e8ed3ef2701a606af31039ce610e7d1c"
---

# get_session_command

Get a command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_session_command_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs) — Use get_session_command_logs with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands) — Use list_session_commands with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.
- [kill_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command) — Use kill_session_command with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                                                                                                                      |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sessionId` | string | Yes      | The unique identifier of the session containing the command.                                                                                                                                     |
| `cmdId`     | string | Yes      | The unique identifier of the command to retrieve.                                                                                                                                                |
| `wait`      | string | No       | If set to "true", the request will block until the command finishes execution. Useful for synchronously waiting for command completion. Allowed values: `"true"`, `"false"`. Default: `"false"`. |
| `teamId`    | string | No       | Team ID to use for this operation.                                                                                                                                                               |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                      |


---

[View full sitemap](/docs/sitemap)
