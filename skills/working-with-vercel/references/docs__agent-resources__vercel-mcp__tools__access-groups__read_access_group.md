---
title: read_access_group
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/access-groups
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use read_access_group with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b594282a6cab0b1dcc0862256208f26bb3a2f0fc97a5e3f34d4ade4c475eec1e"
---

# read_access_group

Reads an access group.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [read_access_group_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project) — Use read_access_group_project with Vercel MCP.
- [Reads an access group](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group) — GET /v1/access-groups/{idOrName} — Allows to read an access group
- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members) — Use list_access_group_members with Vercel MCP.
- [Reads an access group project](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group-project) — GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows reading an access group project
- [list_access_groups](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups) — Use list_access_groups with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | The access group ID or name.                                |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
