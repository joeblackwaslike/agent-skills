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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "eb6389ce2ac3455c6865ecf31e17219c36d2a228f620b3b6a002f64e5fd385bc"
---

# create_session_directory

Create a directory.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fcreate_session_directory&source_site=vercel-docs&relationship=related) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v3?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fcreate_session_directory&source_site=vercel-docs&relationship=related) — Use create_sandboxes_sessions_by_session_id_snapshot_v3 with Vercel MCP.
- [write_session_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fcreate_session_directory&source_site=vercel-docs&relationship=related) — Use write_session_files with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fcreate_session_directory&source_site=vercel-docs&relationship=related) — Use run_session_command with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fcreate_session_directory&source_site=vercel-docs&relationship=related) — Use get_session with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fcreate_session_directory&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                      |
| ------------- | ------ | -------- | ---------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to create the directory in. |
| `teamId`      | string | No       | Team ID.                                                         |
| `slug`        | string | No       | Team slug.                                                       |
| `requestBody` | object | No       | Request body for this tool.                                      |


---

[View full sitemap](/docs/sitemap)
