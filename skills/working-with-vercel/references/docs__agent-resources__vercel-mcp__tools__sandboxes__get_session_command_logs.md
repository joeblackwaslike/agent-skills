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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "b01a9802a83ef021025baa1dc9d0a664918d55d990d4fe9f9eeef98c25efee0e"
---

# get_session_command_logs

Stream command logs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command_logs&source_site=vercel-docs&relationship=related) — Use list_session_commands with Vercel MCP.
- [get_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command_logs&source_site=vercel-docs&relationship=related) — Use get_session_command with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command_logs&source_site=vercel-docs&relationship=related) — Use get_session with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command_logs&source_site=vercel-docs&relationship=related) — Use run_session_command with Vercel MCP.
- [get_session_snapshot](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command_logs&source_site=vercel-docs&relationship=related) — Use get_session_snapshot with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_command_logs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                  |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| `sessionId` | string | Yes      | The unique identifier of the session containing the command. |
| `cmdId`     | string | Yes      | The unique identifier of the command to stream logs for.     |
| `teamId`    | string | No       | Team ID.                                                     |
| `slug`      | string | No       | Team slug.                                                   |


---

[View full sitemap](/docs/sitemap)
