---
title: Routing
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for routing.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ed900c379518d53b9daedc60e191ac45f73c16829e30c5360e1e9e01bd9838da"
---

# Routing

Control where requests go with project routing rules, redirects, and deployment aliases. You can stage changes, review version history, and promote or restore a routing configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Promote, restore, or discard a routing rule version](https://vercel.com/docs/rest-api/project-routes/promote-restore-or-discard-a-routing-rule-version) — POST /v1/projects/{projectId}/routes/versions — Promote staged routing rules to production, restore a previous productio
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Get routing rule version history](https://vercel.com/docs/rest-api/project-routes/get-routing-rule-version-history) — GET /v1/projects/{projectId}/routes/versions — Get the version history for a project's routing rules. Returns the stagin
- [Edit a routing rule](https://vercel.com/docs/rest-api/project-routes/edit-a-routing-rule) — PATCH /v1/projects/{projectId}/routes/{routeId} — Replace a routing rule identified by its ID, or restore it from the cu
- [vercel routes](https://vercel.com/docs/cli/routes) — Learn how to manage project-level routing rules using the vercel routes CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing.graph.md](/docs/agent-resources/vercel-mcp/tools/routing.graph.md)
<!-- /docsgraph:related -->

## `add_route`

Add a routing rule.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `assign_alias`

Assign an Alias.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `id`          | string | Yes      | The deployment or alias ID or URL to assign from            |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `edit_route`

Edit a routing rule.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `routeId`     | string | Yes      | The route ID.                                               |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `generate_route`

Generate a routing rule from natural language.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `get_alias`

Retrieves an Alias for the given host name or alias ID.

## Parameters

| Parameter   | Type   | Required | Description                                                           |
| ----------- | ------ | -------- | --------------------------------------------------------------------- |
| `from`      | number | No       | Get the alias only if it was created after the provided timestamp     |
| `idOrAlias` | string | Yes      | The alias or alias ID to be retrieved                                 |
| `projectId` | string | No       | Get the alias only if it is assigned to the provided project ID       |
| `since`     | number | No       | Get the alias only if it was created after this JavaScript timestamp  |
| `until`     | number | No       | Get the alias only if it was created before this JavaScript timestamp |
| `teamId`    | string | No       | Team ID to use for this operation.                                    |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.           |

## `list_aliases`

List aliases.

## Parameters

| Parameter              | Type                       | Required | Description                                                    |
| ---------------------- | -------------------------- | -------- | -------------------------------------------------------------- |
| `domain`               | Array\<string> \| string | No       | Get only aliases of the given domain name                      |
| `from`                 | number                     | No       | Get only aliases created after the provided timestamp          |
| `limit`                | number                     | No       | Maximum number of aliases to list from a request               |
| `projectId`            | string                     | No       | Filter aliases from the given `projectId`                      |
| `since`                | number                     | No       | Get aliases created after this JavaScript timestamp            |
| `until`                | number                     | No       | Get aliases created before this JavaScript timestamp           |
| `rollbackDeploymentId` | string                     | No       | Get aliases that would be rolled back for the given deployment |
| `teamId`               | string                     | No       | Team ID to use for this operation.                             |
| `slug`                 | string                     | No       | Team slug to use for this operation. Use instead of teamId.    |

## `list_bulk_redirect_versions`

Get the version history for a project's redirects.

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | Yes      | The project ID.                                             |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_bulk_redirects`

Gets project-level redirects.

## Parameters

| Parameter   | Type              | Required | Description                                                  |
| ----------- | ----------------- | -------- | ------------------------------------------------------------ |
| `projectId` | string            | Yes      | The project ID.                                              |
| `versionId` | string            | No       | -                                                            |
| `q`         | string            | No       | -                                                            |
| `diff`      | boolean \| string | No       | -                                                            |
| `page`      | integer           | No       | Minimum: 1.                                                  |
| `perPage`   | integer           | No       | Minimum: 10. Maximum: 250.                                   |
| `sortBy`    | string            | No       | Allowed values: `"source"`, `"destination"`, `"statusCode"`. |
| `sortOrder` | string            | No       | Allowed values: `"asc"`, `"desc"`.                           |
| `teamId`    | string            | No       | Team ID to use for this operation.                           |
| `slug`      | string            | No       | Team slug to use for this operation. Use instead of teamId.  |

## `list_deployment_aliases`

List Deployment Aliases.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The ID of the deployment the aliases should be listed for   |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_project_route_versions`

Get routing rule version history.

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | Yes      | The project ID.                                             |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_project_routes`

Get project routing rules.

## Parameters

| Parameter   | Type              | Required | Description                                                               |
| ----------- | ----------------- | -------- | ------------------------------------------------------------------------- |
| `projectId` | string            | Yes      | The project ID.                                                           |
| `versionId` | string            | No       | -                                                                         |
| `q`         | string            | No       | -                                                                         |
| `filter`    | string            | No       | Allowed values: `"rewrite"`, `"redirect"`, `"set_status"`, `"transform"`. |
| `diff`      | boolean \| string | No       | -                                                                         |
| `teamId`    | string            | No       | Team ID to use for this operation.                                        |
| `slug`      | string            | No       | Team slug to use for this operation. Use instead of teamId.               |

## `patch_url_protection_bypass`

Update the protection bypass for a URL.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `id`          | string | Yes      | The alias or deployment ID                                  |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `restore_redirects`

Restores the provided redirects in the staging version to the value in the production version. If no production version exists, removes the redirects from staging.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `stage_redirects`

Stages new redirects for a project.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `stage_routes`

Stage routing rules.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `update_bulk_redirect_version`

Promote a staging version to production or restore a previous production version.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `update_route_versions`

Promote, restore, or discard a routing rule version.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
