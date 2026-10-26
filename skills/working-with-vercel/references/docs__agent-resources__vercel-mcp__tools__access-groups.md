---
title: Access Groups
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for access groups.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "38f1a60e2897bc274b921cbbc4f41e6e6fcae838b2d7436dd2b4cc187a264a90"
---

# Access Groups

Inspect access groups in your team to understand which members and projects belong to each group. You can also retrieve details for a specific group or its project access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List access groups for a team, project or member](https://vercel.com/docs/rest-api/access-groups/list-access-groups-for-a-team-project-or-member) — GET /v1/access-groups — List access groups
- [List projects of an access group](https://vercel.com/docs/rest-api/access-groups/list-projects-of-an-access-group) — GET /v1/access-groups/{idOrName}/projects — List projects of an access group
- [Reads an access group project](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group-project) — GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows reading an access group project
- [Access Groups](https://vercel.com/docs/rbac/access-groups) — Learn how to configure access groups for team members on a Vercel account.
- [List members of an access group](https://vercel.com/docs/rest-api/access-groups/list-members-of-an-access-group) — GET /v1/access-groups/{idOrName}/members — List members of an access group

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups.graph.md)
<!-- /docsgraph:related -->

## `list_access_group_members`

List members of an access group.

## Parameters

| Parameter  | Type    | Required | Description                                                                       |
| ---------- | ------- | -------- | --------------------------------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                                               |
| `limit`    | integer | No       | Limit how many access group members should be returned. Minimum: 1. Maximum: 100. |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results.                         |
| `search`   | string  | No       | Search access group members by their name, username, and email.                   |
| `teamId`   | string  | No       | Team ID to use for this operation.                                                |
| `slug`     | string  | No       | Team slug to use for this operation. Use instead of teamId.                       |

## `list_access_group_projects`

List projects of an access group.

## Parameters

| Parameter  | Type    | Required | Description                                                                        |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                                                |
| `limit`    | integer | No       | Limit how many access group projects should be returned. Minimum: 1. Maximum: 100. |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results.                          |
| `teamId`   | string  | No       | Team ID to use for this operation.                                                 |
| `slug`     | string  | No       | Team slug to use for this operation. Use instead of teamId.                        |

## `list_access_groups`

List access groups

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

## `read_access_group`

Reads an access group.

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | The access group ID or name.                                |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `read_access_group_project`

Reads an access group project.

## Parameters

| Parameter             | Type   | Required | Description                                                 |
| --------------------- | ------ | -------- | ----------------------------------------------------------- |
| `accessGroupIdOrName` | string | Yes      | The access group ID or name.                                |
| `projectId`           | string | Yes      | The project ID.                                             |
| `teamId`              | string | No       | Team ID to use for this operation.                          |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
