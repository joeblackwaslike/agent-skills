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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d97aef05b7589e75ef5a1ee183e8a683c2f5c340cce67f1a3afc7b2fad15bf51"
---

# Access Groups

Inspect access groups in your team to understand which members and projects belong to each group. You can also retrieve details for a specific group or its project access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List projects of an access group](https://vercel.com/docs/rest-api/access-groups/list-projects-of-an-access-group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{idOrName}/projects — List projects of an access group
- [Reads an access group project](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows reading an access group project
- [List access groups for a team, project or member](https://vercel.com/docs/rest-api/access-groups/list-access-groups-for-a-team-project-or-member?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups&source_site=vercel-docs&relationship=related) — GET /v1/access-groups — List access groups
- [List members of an access group](https://vercel.com/docs/rest-api/access-groups/list-members-of-an-access-group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{idOrName}/members — List members of an access group
- [Reads an access group](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{idOrName} — Allows to read an access group

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `list_access_group_members`

List members of an access group.

## Parameters

| Parameter  | Type    | Required | Description                                                     |
| ---------- | ------- | -------- | --------------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                             |
| `limit`    | integer | No       | Limit how many access group members should be returned.         |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results.       |
| `search`   | string  | No       | Search access group members by their name, username, and email. |
| `teamId`   | string  | No       | Team ID.                                                        |
| `slug`     | string  | No       | Team slug.                                                      |

## `list_access_group_projects`

List projects of an access group.

## Parameters

| Parameter  | Type    | Required | Description                                               |
| ---------- | ------- | -------- | --------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                       |
| `limit`    | integer | No       | Limit how many access group projects should be returned.  |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results. |
| `teamId`   | string  | No       | Team ID.                                                  |
| `slug`     | string  | No       | Team slug.                                                |

## `read_access_group`

Reads an access group.

## Parameters

| Parameter  | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| `idOrName` | string | Yes      | The access group ID or name. |
| `teamId`   | string | No       | Team ID.                     |
| `slug`     | string | No       | Team slug.                   |

## `read_access_group_project`

Reads an access group project.

## Parameters

| Parameter             | Type   | Required | Description                  |
| --------------------- | ------ | -------- | ---------------------------- |
| `accessGroupIdOrName` | string | Yes      | The access group ID or name. |
| `projectId`           | string | Yes      | The project ID.              |
| `teamId`              | string | No       | Team ID.                     |
| `slug`                | string | No       | Team slug.                   |


---

[View full sitemap](/docs/sitemap)
