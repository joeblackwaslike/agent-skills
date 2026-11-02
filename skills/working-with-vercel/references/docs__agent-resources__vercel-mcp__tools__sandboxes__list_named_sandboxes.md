---
title: list_named_sandboxes
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/list_named_sandboxes
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_named_sandboxes"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_named_sandboxes with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_named_sandboxes.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "9c8b4999ada0fed58251e28dce504416c7cc175cd30fe8a29fa4cbddaffae1ad"
---

# list_named_sandboxes

List named sandboxes for a project. This tool corresponds to the `listNamedSandboxes` catalog operation. Use `list_sessions` to list Sandbox sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List sandboxes](https://vercel.com/docs/rest-api/sandboxes/list-sandboxes) — GET /v2/sandboxes — Retrieves a paginated list of named sandboxes belonging to a specific project. Results can be sorted
- [list_sessions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions) — Use list_sessions with Vercel MCP.
- [create_sandboxes_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v2) — Use create_sandboxes_v2 with Vercel MCP.
- [get_named_sandbox](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox) — Use get_named_sandbox with Vercel MCP.
- [list_session_snapshots](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots) — Use list_session_snapshots with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/list_named_sandboxes.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/list_named_sandboxes.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type                       | Required | Description                                                                                                                    |
| ------------ | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `project`    | string                     | Yes      | The unique identifier or name of the project to list named sandboxes for.                                                      |
| `limit`      | number                     | No       | Maximum number of named sandboxes to return in the response. Used for pagination. Minimum: 1. Maximum: 50. Default: `20`.      |
| `sortBy`     | string                     | No       | Field to sort by. Allowed values: `"createdAt"`, `"name"`, `"statusUpdatedAt"`, `"currentSnapshotId"`. Default: `"createdAt"`. |
| `namePrefix` | string                     | No       | Filter named sandboxes whose name starts with this prefix. Only valid when sortBy=name.                                        |
| `cursor`     | string                     | No       | Opaque pagination cursor from a previous response.                                                                             |
| `sortOrder`  | string                     | No       | Sort direction. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                                                          |
| `status`     | string                     | No       | Filter named sandboxes by status. Only valid when sortBy is createdAt. Allowed values: `"running"`, `"stopping"`, `"stopped"`. |
| `tags`       | string \| Array\<string> | No       | Filter sandboxes by tag. Format: "key:value". Only one tag filter is supported at a time.                                      |
| `teamId`     | string                     | No       | Team ID to use for this operation.                                                                                             |
| `slug`       | string                     | No       | Team slug to use for this operation. Use instead of teamId.                                                                    |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
