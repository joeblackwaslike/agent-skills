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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0966a9e64ae9b2f7857346311f3f121aaf2b3ef38cb7df483e44b41d6923d008"
---

# list_access_group_members

List members of an access group.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_members&source_site=vercel-docs&relationship=related) — Use list_access_group_projects with Vercel MCP.
- [list_team_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_members&source_site=vercel-docs&relationship=related) — Use list_team_members with Vercel MCP.
- [List members of an access group](https://vercel.com/docs/rest-api/access-groups/list-members-of-an-access-group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_members&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{idOrName}/members — List members of an access group
- [read_access_group](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_members&source_site=vercel-docs&relationship=related) — Use read_access_group with Vercel MCP.
- [List access groups for a team, project or member](https://vercel.com/docs/rest-api/access-groups/list-access-groups-for-a-team-project-or-member?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_members&source_site=vercel-docs&relationship=related) — GET /v1/access-groups — List access groups

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_members&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type    | Required | Description                                                     |
| ---------- | ------- | -------- | --------------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                             |
| `limit`    | integer | No       | Limit how many access group members should be returned.         |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results.       |
| `search`   | string  | No       | Search access group members by their name, username, and email. |
| `teamId`   | string  | No       | Team ID.                                                        |
| `slug`     | string  | No       | Team slug.                                                      |


---

[View full sitemap](/docs/sitemap)
