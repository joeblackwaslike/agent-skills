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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "28af974bb1e666a1cbad7a8c2545d4a7ac49926c9e07d797eecc184b5091cd16"
---

# read_session_file

Read a file.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [write_session_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/write_session_files) — Use write_session_files with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.
- [stop_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session) — Use stop_session with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command) — Use run_session_command with Vercel MCP.
- [Read a file](https://vercel.com/docs/rest-api/sandboxes/read-a-file) — POST /v2/sandboxes/sessions/{sessionId}/fs/read — Downloads the contents of a file from a session's filesystem. The file

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to read the file from. |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

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
