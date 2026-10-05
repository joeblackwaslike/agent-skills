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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "ce14c8ec8a5b2849fa2c2d67583cac72aaf6aacb3151ede83a7e81a73abff496"
---

# get_session_snapshot

Get a snapshot.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_snapshot&source_site=vercel-docs&relationship=related) — Use get_session with Vercel MCP.
- [list_session_snapshots](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_snapshot&source_site=vercel-docs&relationship=related) — Use list_session_snapshots with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v2?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_snapshot&source_site=vercel-docs&relationship=related) — Use create_sandboxes_sessions_by_session_id_snapshot_v2 with Vercel MCP.
- [create_sandboxes_sessions_by_session_id_snapshot_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_sessions_by_session_id_snapshot_v3?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_snapshot&source_site=vercel-docs&relationship=related) — Use create_sandboxes_sessions_by_session_id_snapshot_v3 with Vercel MCP.
- [get_session_command_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_command_logs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_snapshot&source_site=vercel-docs&relationship=related) — Use get_session_command_logs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session_snapshot.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_session_snapshot&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type   | Required | Description                                        |
| ------------ | ------ | -------- | -------------------------------------------------- |
| `snapshotId` | string | Yes      | The unique identifier of the snapshot to retrieve. |
| `teamId`     | string | No       | Team ID.                                           |
| `slug`       | string | No       | Team slug.                                         |


---

[View full sitemap](/docs/sitemap)
