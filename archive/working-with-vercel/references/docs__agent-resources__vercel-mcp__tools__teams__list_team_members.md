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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "39ea61ebc22764509013204ec3acc940afed1201cc562a1e59266df71756cad4"
---

# list_team_members

List team members.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_teams](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams) — Use list_teams with Vercel MCP.
- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members) — Use list_access_group_members with Vercel MCP.
- [List team members](https://vercel.com/docs/rest-api/teams/list-team-members) — GET /v3/teams/{teamId}/members — Get a paginated list of team members for the provided team.
- [List project members](https://vercel.com/docs/rest-api/projectmembers/list-project-members) — GET /v1/projects/{idOrName}/members — Lists all members of a project.
- [list_user_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_user_events) — Use list_user_events with Vercel MCP.

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
