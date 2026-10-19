---
title: list_session_snapshots
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_session_snapshots with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "60ff2909f5e8d2595ec3452ba1a6c06096a0df7cef8b2e20d15218a7228f51fd"
---

# list_session_snapshots

List snapshots.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_sessions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions) — Use list_sessions with Vercel MCP.
- [get_session_snapshot](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot) — Use get_session_snapshot with Vercel MCP.
- [List snapshots](https://vercel.com/docs/rest-api/sandboxes/list-snapshots) — GET /v2/sandboxes/snapshots — Retrieves a paginated list of snapshots for a specific project.
- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v3) — Use create_sandboxes_sessions_by_session_id_snapshot_v3 with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `project`   | string | Yes      | The unique identifier or name of the project to list snapshots for.                                                 |
| `name`      | string | No       | Name for the sandbox. Must be unique per project and URL-safe (alphanumeric, hyphens, underscores).                 |
| `limit`     | number | No       | Maximum number of snapshots to return in the response. Used for pagination. Minimum: 1. Maximum: 50. Default: `20`. |
| `cursor`    | string | No       | Opaque pagination cursor from a previous response.                                                                  |
| `sortOrder` | string | No       | Sort direction for results by creation time. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                  |
| `teamId`    | string | No       | Team ID to use for this operation.                                                                                  |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                                         |


---

[View full sitemap](/docs/sitemap)
