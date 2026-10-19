---
title: list_access_group_members
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/access-groups
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_access_group_members with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "7b9779b459bee7fd0f1125d500d37d552b0dfdd55797bf3af00e71a9953b40f1"
---

# list_access_group_members

List members of an access group.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_access_groups](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups) — Use list_access_groups with Vercel MCP.
- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects) — Use list_access_group_projects with Vercel MCP.
- [list_team_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members) — Use list_team_members with Vercel MCP.
- [List members of an access group](https://vercel.com/docs/rest-api/access-groups/list-members-of-an-access-group) — GET /v1/access-groups/{idOrName}/members — List members of an access group
- [read_access_group](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group) — Use read_access_group with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type    | Required | Description                                                                       |
| ---------- | ------- | -------- | --------------------------------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                                               |
| `limit`    | integer | No       | Limit how many access group members should be returned. Minimum: 1. Maximum: 100. |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results.                         |
| `search`   | string  | No       | Search access group members by their name, username, and email.                   |
| `teamId`   | string  | No       | Team ID to use for this operation.                                                |
| `slug`     | string  | No       | Team slug to use for this operation. Use instead of teamId.                       |


---

[View full sitemap](/docs/sitemap)
