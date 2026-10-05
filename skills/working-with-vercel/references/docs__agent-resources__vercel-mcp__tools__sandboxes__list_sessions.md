---
title: list_sessions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_sessions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "396ab0db7954a1c32a4889a31bd6f93e2feec3b78a2a4f963456df39432a75c6"
---

# list_sessions

List sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_session_snapshots](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sessions&source_site=vercel-docs&relationship=related) — Use list_session_snapshots with Vercel MCP.
- [List sessions](https://vercel.com/docs/rest-api/sandboxes/list-sessions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sessions&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes/sessions — Retrieves a paginated list of sessions belonging to a specific sandbox. Results are sorted
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sessions&source_site=vercel-docs&relationship=related) — Use list_session_commands with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sessions&source_site=vercel-docs&relationship=related) — Use get_session with Vercel MCP.
- [list_sandboxes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sandboxes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sessions&source_site=vercel-docs&relationship=related) — Use list_sandboxes with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sessions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                        |
| ----------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| `project`   | string | Yes      | The unique identifier or name of the project to list sessions for.                                 |
| `name`      | string | No       | Filter sessions by sandbox name. Only sessions belonging to the specified sandbox are returned.    |
| `limit`     | number | No       | Maximum number of sessions to return in the response. Used for pagination. Default: `20`.          |
| `cursor`    | string | No       | Opaque pagination cursor from a previous response.                                                 |
| `sortOrder` | string | No       | Sort direction for results by creation time. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`. |
| `teamId`    | string | No       | Team ID.                                                                                           |
| `slug`      | string | No       | Team slug.                                                                                         |


---

[View full sitemap](/docs/sitemap)
