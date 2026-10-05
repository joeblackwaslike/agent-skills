---
title: write_session_files
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use write_session_files with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d92b136ec904bda6417dcdcbfea93db596fd783a709cb5e2e5778e77eaa80a40"
---

# write_session_files

Write files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [read_session_file](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fwrite_session_files&source_site=vercel-docs&relationship=related) — Use read_session_file with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fwrite_session_files&source_site=vercel-docs&relationship=related) — Use create_session_directory with Vercel MCP.
- [Write files](https://vercel.com/docs/rest-api/sandboxes/write-files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fwrite_session_files&source_site=vercel-docs&relationship=related) — POST /v2/sandboxes/sessions/{sessionId}/fs/write — Uploads and extracts files to a session's filesystem. Files must be u
- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fwrite_session_files&source_site=vercel-docs&relationship=related) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v3?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fwrite_session_files&source_site=vercel-docs&relationship=related) — Use create_sandboxes_sessions_by_session_id_snapshot_v3 with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fwrite_session_files&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                                                                                             |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `xCwd`        | string | No       | The target directory where the tarball contents will be extracted. If not specified, files are extracted to the sandbox home directory. |
| `sessionId`   | string | Yes      | The unique identifier of the session to write files to.                                                                                 |
| `teamId`      | string | No       | Team ID.                                                                                                                                |
| `slug`        | string | No       | Team slug.                                                                                                                              |
| `requestBody` | string | Yes      | A base64-encoded gzipped tarball to extract. Provide this binary value as a base64 string.                                              |


---

[View full sitemap](/docs/sitemap)
