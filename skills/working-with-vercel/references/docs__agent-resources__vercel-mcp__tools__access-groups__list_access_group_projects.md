---
title: list_access_group_projects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/access-groups
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_access_group_projects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "3cac8749ab982dfb762caecd93b009320e5d8546f6b73ef5af39c61d4f8742df"
---

# list_access_group_projects

List projects of an access group.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_access_groups](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups) — Use list_access_groups with Vercel MCP.
- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members) — Use list_access_group_members with Vercel MCP.
- [List projects of an access group](https://vercel.com/docs/rest-api/access-groups/list-projects-of-an-access-group) — GET /v1/access-groups/{idOrName}/projects — List projects of an access group
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects) — Use list_projects with Vercel MCP.
- [get_observability_configuration_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects) — Use get_observability_configuration_projects with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type    | Required | Description                                                                        |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                                                |
| `limit`    | integer | No       | Limit how many access group projects should be returned. Minimum: 1. Maximum: 100. |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results.                          |
| `teamId`   | string  | No       | Team ID to use for this operation.                                                 |
| `slug`     | string  | No       | Team slug to use for this operation. Use instead of teamId.                        |


---

[View full sitemap](/docs/sitemap)
