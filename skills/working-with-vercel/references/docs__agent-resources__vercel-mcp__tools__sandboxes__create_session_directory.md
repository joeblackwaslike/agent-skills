---
title: create_session_directory
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_session_directory with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4b25d29a7fe01a48918ef8e39d1d8174a2d2f6685ba664bad39656aec537e369"
---

# create_session_directory

Create a directory.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v3) — Use create_sandboxes_sessions_by_session_id_snapshot_v3 with Vercel MCP.
- [write_session_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files) — Use write_session_files with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                      |
| ------------- | ------ | -------- | ---------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to create the directory in. |
| `teamId`      | string | No       | Team ID to use for this operation.                               |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.      |
| `requestBody` | object | No       | Request body for this tool.                                      |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
