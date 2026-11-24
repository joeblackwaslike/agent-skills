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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "61e66c1ffb82faf6e7b20ea031b103620f75a68fce066279b25a228d713438ce"
---

# write_session_files

Write files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [read_session_file](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file) — Use read_session_file with Vercel MCP.
- [Write files](https://vercel.com/docs/rest-api/sandboxes/write-files) — POST /v2/sandboxes/sessions/{sessionId}/fs/write — Uploads and extracts files to a session's filesystem. Files must be u
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                                                                                             |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `xCwd`        | string | No       | The target directory where the tarball contents will be extracted. If not specified, files are extracted to the sandbox home directory. |
| `sessionId`   | string | Yes      | The unique identifier of the session to write files to.                                                                                 |
| `teamId`      | string | No       | Team ID to use for this operation.                                                                                                      |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                             |
| `requestBody` | string | Yes      | A base64-encoded gzipped tarball to extract. Provide this binary value as a base64 string.                                              |

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
