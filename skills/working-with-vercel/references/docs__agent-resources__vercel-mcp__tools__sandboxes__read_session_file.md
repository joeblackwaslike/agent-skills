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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "90a88a59ada88abfab4cdafd2a63e112fd7177ecbc1082aa01aa1a6e0d640a7c"
---

# read_session_file

Read a file.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [write_session_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fread_session_file&source_site=vercel-docs&relationship=related) — Use write_session_files with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fread_session_file&source_site=vercel-docs&relationship=related) — Use get_session with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fread_session_file&source_site=vercel-docs&relationship=related) — Use stop_session with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fread_session_file&source_site=vercel-docs&relationship=related) — Use create_session_directory with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fread_session_file&source_site=vercel-docs&relationship=related) — Use run_session_command with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fread_session_file&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to read the file from. |
| `teamId`      | string | No       | Team ID.                                                    |
| `slug`        | string | No       | Team slug.                                                  |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
