---
title: get_session_snapshot
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_session_snapshot with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "2243706c89e4ad5ebe3678905f78eb7ff3394b88f8ffce9f4cd0565afb54ce91"
---

# get_session_snapshot

Get a snapshot.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.
- [list_session_snapshots](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots) — Use list_session_snapshots with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v3) — Use create_sandboxes_sessions_by_session_id_snapshot_v3 with Vercel MCP.
- [get_session_command_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs) — Use get_session_command_logs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type   | Required | Description                                                 |
| ------------ | ------ | -------- | ----------------------------------------------------------- |
| `snapshotId` | string | Yes      | The unique identifier of the snapshot to retrieve.          |
| `teamId`     | string | No       | Team ID to use for this operation.                          |
| `slug`       | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
