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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "77eeff08abc113e108ce9185eef318c088626a78186315ab98b08568876efc8c"
---

# get_session_command

Get a command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command&source_site=vercel-docs&relationship=related) — Use run_session_command with Vercel MCP.
- [get_session_command_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command&source_site=vercel-docs&relationship=related) — Use get_session_command_logs with Vercel MCP.
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command&source_site=vercel-docs&relationship=related) — Use list_session_commands with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command&source_site=vercel-docs&relationship=related) — Use get_session with Vercel MCP.
- [kill_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command&source_site=vercel-docs&relationship=related) — Use kill_session_command with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                                                                                                                      |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sessionId` | string | Yes      | The unique identifier of the session containing the command.                                                                                                                                     |
| `cmdId`     | string | Yes      | The unique identifier of the command to retrieve.                                                                                                                                                |
| `wait`      | string | No       | If set to "true", the request will block until the command finishes execution. Useful for synchronously waiting for command completion. Allowed values: `"true"`, `"false"`. Default: `"false"`. |
| `teamId`    | string | No       | Team ID.                                                                                                                                                                                         |
| `slug`      | string | No       | Team slug.                                                                                                                                                                                       |


---

[View full sitemap](/docs/sitemap)
