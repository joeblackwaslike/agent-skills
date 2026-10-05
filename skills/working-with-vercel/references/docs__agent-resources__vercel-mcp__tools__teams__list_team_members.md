---
title: list_team_members
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/teams/list_team_members
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/teams
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_team_members with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "32880843e20c85998e0e6b70a8af8f30cf76711d6be3f4a51abc96557b7a8b60"
---

# list_team_members

List team members.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_teams](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_team_members&source_site=vercel-docs&relationship=related) — Use list_teams with Vercel MCP.
- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_team_members&source_site=vercel-docs&relationship=related) — Use list_access_group_members with Vercel MCP.
- [list_user_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_user_events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_team_members&source_site=vercel-docs&relationship=related) — Use list_user_events with Vercel MCP.
- [List team members](https://vercel.com/docs/rest-api/teams/list-team-members?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_team_members&source_site=vercel-docs&relationship=related) — GET /v3/teams/{teamId}/members — Get a paginated list of team members for the provided team.
- [List project members](https://vercel.com/docs/rest-api/projectmembers/list-project-members?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_team_members&source_site=vercel-docs&relationship=related) — GET /v1/projects/{idOrName}/members — Lists all members of a project.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/list_team_members.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/list_team_members.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_team_members&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter                     | Type   | Required | Description                                                                                                                                                                          |
| ----------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `limit`                       | number | No       | Limit how many team members should be returned                                                                                                                                       |
| `since`                       | number | No       | Timestamp in milliseconds to only include members added since then.                                                                                                                  |
| `until`                       | number | No       | Timestamp in milliseconds to only include members added until then.                                                                                                                  |
| `search`                      | string | No       | Search team members by their name, username, and email.                                                                                                                              |
| `role`                        | string | No       | Only return members with the specified team role. Allowed values: `"OWNER"`, `"MEMBER"`, `"DEVELOPER"`, `"SECURITY"`, `"BILLING"`, `"VIEWER"`, `"VIEWER_FOR_PLUS"`, `"CONTRIBUTOR"`. |
| `excludeProject`              | string | No       | Exclude members who belong to the specified project.                                                                                                                                 |
| `eligibleMembersForProjectId` | string | No       | Include team members who are eligible to be members of the specified project.                                                                                                        |
| `teamId`                      | string | Yes      | Team ID.                                                                                                                                                                             |
| `slug`                        | string | No       | Team slug.                                                                                                                                                                           |


---

[View full sitemap](/docs/sitemap)
