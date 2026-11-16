---
title: kill_session_command
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use kill_session_command with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "1d252e4d3660d3602bb1a4c5a5eeeed0222e63a07f9bee71bdd62898dbc87ff9"
---

# kill_session_command

Kill a command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [get_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command) — Use get_session_command with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session) — Use stop_session with Vercel MCP.
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands) — Use list_session_commands with Vercel MCP.
- [Kill a command](https://vercel.com/docs/rest-api/sandboxes/kill-a-command) — POST /v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}/kill — Sends a signal to terminate a running command in a session. T

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                  |
| ------------- | ------ | -------- | ------------------------------------------------------------ |
| `cmdId`       | string | Yes      | The unique identifier of the command to terminate.           |
| `sessionId`   | string | Yes      | The unique identifier of the session containing the command. |
| `teamId`      | string | No       | Team ID to use for this operation.                           |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.  |
| `requestBody` | object | No       | Request body for this tool.                                  |

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
