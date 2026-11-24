---
title: list_sandboxes
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/list_sandboxes
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sandboxes"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_sandboxes with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sandboxes.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "935c9bf889fde83d45638ac2bb2cf4a5200c76bd9fac928aef063da724707a16"
---

# list_sandboxes

List sandboxes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List sandboxes](https://vercel.com/docs/rest-api/sandboxes/list-sandboxes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sandboxes&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes — Retrieves a paginated list of named sandboxes belonging to a specific project. Results can be sorted
- [create_sandboxes_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v2?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sandboxes&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v2 with Vercel MCP.
- [create_sandboxes_v4](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v4?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sandboxes&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v4 with Vercel MCP.
- [create_sandboxes_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v3?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sandboxes&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v3 with Vercel MCP.
- [list_sessions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sandboxes&source_site=vercel-docs&relationship=related) — Use list_sessions with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sandboxes.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sandboxes.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Flist_sandboxes&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type                       | Required | Description                                                                                                                    |
| ------------ | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `project`    | string                     | Yes      | The unique identifier or name of the project to list named sandboxes for.                                                      |
| `limit`      | number                     | No       | Maximum number of named sandboxes to return in the response. Used for pagination. Default: `20`.                               |
| `sortBy`     | string                     | No       | Field to sort by. Allowed values: `"createdAt"`, `"name"`, `"statusUpdatedAt"`, `"currentSnapshotId"`. Default: `"createdAt"`. |
| `namePrefix` | string                     | No       | Filter named sandboxes whose name starts with this prefix. Only valid when sortBy=name.                                        |
| `cursor`     | string                     | No       | Opaque pagination cursor from a previous response.                                                                             |
| `sortOrder`  | string                     | No       | Sort direction. Defaults to desc. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                                        |
| `status`     | string                     | No       | Filter named sandboxes by status. Only valid when sortBy is createdAt. Allowed values: `"running"`, `"stopping"`, `"stopped"`. |
| `tags`       | string \| Array\<string> | No       | Filter sandboxes by tag. Format: "key:value". Only one tag filter is supported at a time.                                    |
| `teamId`     | string                     | No       | Team ID.                                                                                                                       |
| `slug`       | string                     | No       | Team slug.                                                                                                                     |


---

[View full sitemap](/docs/sitemap)
