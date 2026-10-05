---
title: stop_session
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use stop_session with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "a507c1fd9e0632b671433cf82b32ede79568775cebbc43981843cb4be87fcaad"
---

# stop_session

Stop a session.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [kill_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/kill_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fstop_session&source_site=vercel-docs&relationship=related) — Use kill_session_command with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fstop_session&source_site=vercel-docs&relationship=related) — Use get_session with Vercel MCP.
- [run_session_command](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/run_session_command?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fstop_session&source_site=vercel-docs&relationship=related) — Use run_session_command with Vercel MCP.
- [extend_session_timeout](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fstop_session&source_site=vercel-docs&relationship=related) — Use extend_session_timeout with Vercel MCP.
- [read_session_file](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fstop_session&source_site=vercel-docs&relationship=related) — Use read_session_file with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/stop_session.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fstop_session&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                   |
| ------------- | ------- | -------- | --------------------------------------------- |
| `sessionId`   | string  | Yes      | The unique identifier of the session to stop. |
| `teamId`      | string  | No       | Team ID.                                      |
| `slug`        | string  | No       | Team slug.                                    |
| `requestBody` | unknown | No       | Request body for this tool.                   |


---

[View full sitemap](/docs/sitemap)
