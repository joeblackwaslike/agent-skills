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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "536350f84d5dc9737a1dae15bfd7bd3dad14a5cf139cb91d5d0262ea61e23480"
---

# list_team_members

List team members.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members) — Use list_access_group_members with Vercel MCP.
- [list_teams](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams) — Use list_teams with Vercel MCP.
- [List team members](https://vercel.com/docs/rest-api/teams/list-team-members) — GET /v3/teams/{teamId}/members — Get a paginated list of team members for the provided team.
- [list_user_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_user_events) — Use list_user_events with Vercel MCP.
- [List project members](https://vercel.com/docs/rest-api/projectmembers/list-project-members) — GET /v1/projects/{idOrName}/members — Lists all members of a project.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/list_team_members.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/list_team_members.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                     | Type   | Required | Description                                                                                                                                                                          |
| ----------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `limit`                       | number | No       | Limit how many team members should be returned Minimum: 1.                                                                                                                           |
| `since`                       | number | No       | Timestamp in milliseconds to only include members added since then.                                                                                                                  |
| `until`                       | number | No       | Timestamp in milliseconds to only include members added until then.                                                                                                                  |
| `search`                      | string | No       | Search team members by their name, username, and email.                                                                                                                              |
| `role`                        | string | No       | Only return members with the specified team role. Allowed values: `"OWNER"`, `"MEMBER"`, `"DEVELOPER"`, `"SECURITY"`, `"BILLING"`, `"VIEWER"`, `"VIEWER_FOR_PLUS"`, `"CONTRIBUTOR"`. |
| `excludeProject`              | string | No       | Exclude members who belong to the specified project.                                                                                                                                 |
| `eligibleMembersForProjectId` | string | No       | Include team members who are eligible to be members of the specified project.                                                                                                        |
| `teamId`                      | string | Yes      | Team ID to use for this operation.                                                                                                                                                   |
| `slug`                        | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                          |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
