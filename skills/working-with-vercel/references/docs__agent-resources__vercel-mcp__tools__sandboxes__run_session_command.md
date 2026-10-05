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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "e6caae1f4fcee8f6e353e6f22de41116918d13e6139221e67147d194a259b994"
---

# run_session_command

Execute a command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Frun_session_command&source_site=vercel-docs&relationship=related) — Use get_session_command with Vercel MCP.
- [kill_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Frun_session_command&source_site=vercel-docs&relationship=related) — Use kill_session_command with Vercel MCP.
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Frun_session_command&source_site=vercel-docs&relationship=related) — Use list_session_commands with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Frun_session_command&source_site=vercel-docs&relationship=related) — Use stop_session with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Frun_session_command&source_site=vercel-docs&relationship=related) — Use create_session_directory with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Frun_session_command&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                           |
| ------------- | ------ | -------- | --------------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session in which to execute the command. |
| `teamId`      | string | No       | Team ID.                                                              |
| `slug`        | string | No       | Team slug.                                                            |
| `requestBody` | object | No       | Request body for this tool.                                           |


---

[View full sitemap](/docs/sitemap)
