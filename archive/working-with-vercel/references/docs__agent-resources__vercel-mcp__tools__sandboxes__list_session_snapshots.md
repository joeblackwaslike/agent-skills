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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "5b72a5ead77be55cf0c77a46b0d816fd989b52fa5f5b2aa8b31e25d070bd4e12"
---

# list_session_snapshots

List snapshots.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_session_snapshot](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot) — Use get_session_snapshot with Vercel MCP.
- [list_sessions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions) — Use list_sessions with Vercel MCP.
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
