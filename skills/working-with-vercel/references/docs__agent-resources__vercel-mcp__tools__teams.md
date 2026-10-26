---
title: Teams and Users
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/teams
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/accounts
summary: Vercel MCP tools for teams and users.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ce579452c89ecf736cd36529502e5c80cb3b2814101d5fe691973b2dc7b7ecef"
---

# Teams and Users

Inspect your account and teams, list team members, and read activity events. These tools do not join teams or inspect team access requests.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List team members](https://vercel.com/docs/rest-api/teams/list-team-members) — GET /v3/teams/{teamId}/members — Get a paginated list of team members for the provided team.
- [vercel teams](https://vercel.com/docs/cli/teams) — Learn how to list, create, switch, invite, and manage your teams with the vercel teams CLI command.
- [Invite a user](https://vercel.com/docs/rest-api/teams/invite-a-user) — POST /v2/teams/{teamId}/members — Invite a user to join the team specified in the URL. The authenticated user needs to b
- [List all teams](https://vercel.com/docs/rest-api/teams/list-all-teams) — GET /v2/teams — Get a paginated list of all the Teams the authenticated User is a member of.
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects) — Use list_projects with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams.graph.md](/docs/agent-resources/vercel-mcp/tools/teams.graph.md)
<!-- /docsgraph:related -->

## `get_auth_user`

Get the User.

## Parameters

This tool takes no parameters.

## `get_team`

Get a Team.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `teamId`  | string | Yes      | Team ID to use for this operation.                          |

## `list_event_types`

List Event Types.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_team_members`

List team members.

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

## `list_teams`

List the [teams](/docs/accounts) you belong to.

| Parameter | Type   | Required | Description                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `limit`   | number | No       | Maximum number of Teams which may be returned.                        |
| `since`   | number | No       | Timestamp (in milliseconds) to only include Teams created since then. |
| `until`   | number | No       | Timestamp (in milliseconds) to only include Teams created until then. |

**Sample prompt:** "Show me all the teams I'm part of"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

This workflow takes no parameters.

## `list_user_events`

List User Events.

## Parameters

| Parameter     | Type   | Required | Description                                                                                                                         |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `limit`       | number | No       | Maximum number of items which may be returned.                                                                                      |
| `since`       | string | No       | Timestamp to only include items created since then.                                                                                 |
| `until`       | string | No       | Timestamp to only include items created until then.                                                                                 |
| `types`       | string | No       | Comma-delimited list of event "types" to filter the results by.                                                                     |
| `userId`      | string | No       | Deprecated. Use `principalId` instead. If `principalId` and `userId` both exist, `principalId` will be used.                        |
| `principalId` | string | No       | When retrieving events for a Team, the `principalId` parameter may be specified to filter events generated by a specific principal. |
| `projectIds`  | string | No       | Comma-delimited list of project IDs to filter the results by.                                                                       |
| `entityId`    | string | No       | Filters events to those associated with a specific entity (matched against `payload.id`). For example, a connector ID.              |
| `withPayload` | string | No       | When set to `true`, the response will include the `payload` field for each event.                                                   |
| `teamId`      | string | No       | Team ID to use for this operation.                                                                                                  |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                         |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
