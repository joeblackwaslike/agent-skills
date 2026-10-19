---
title: list_access_groups
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/access-groups
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_access_groups with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "302f363cce2f1a20cb09c94eb924a3839672e6a35fdf4626b72d583e6a2a2d4a"
---

# list_access_groups

List access groups


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects) — Use list_access_group_projects with Vercel MCP.
- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members) — Use list_access_group_members with Vercel MCP.
- [List access groups for a team, project or member](https://vercel.com/docs/rest-api/access-groups/list-access-groups-for-a-team-project-or-member) — GET /v1/access-groups — List access groups
- [List projects of an access group](https://vercel.com/docs/rest-api/access-groups/list-projects-of-an-access-group) — GET /v1/access-groups/{idOrName}/projects — List projects of an access group
- [List members of an access group](https://vercel.com/docs/rest-api/access-groups/list-members-of-an-access-group) — GET /v1/access-groups/{idOrName}/members — List members of an access group

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter       | Type    | Required | Description                                                              |
| --------------- | ------- | -------- | ------------------------------------------------------------------------ |
| `projectId`     | string  | No       | Filter access groups by project.                                         |
| `search`        | string  | No       | Search for access groups by name.                                        |
| `membersLimit`  | integer | No       | Number of members to include in the response. Minimum: 1. Maximum: 100.  |
| `projectsLimit` | integer | No       | Number of projects to include in the response. Minimum: 1. Maximum: 100. |
| `limit`         | integer | No       | Limit how many access groups to return. Minimum: 1. Maximum: 100.        |
| `next`          | string  | No       | Continuation cursor to retrieve the next page of results.                |
| `teamId`        | string  | No       | Team ID to use for this operation.                                       |
| `slug`          | string  | No       | Team slug to use for this operation. Use instead of teamId.              |


---

[View full sitemap](/docs/sitemap)
