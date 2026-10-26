---
title: read_session_file
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use read_session_file with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "3c8f19d238971ae07ab18b4c0a7d16f30096d380598398b98477f7d1a644c948"
---

# read_session_file

Read a file.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [write_session_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files) — Use write_session_files with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session) — Use stop_session with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to read the file from. |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
