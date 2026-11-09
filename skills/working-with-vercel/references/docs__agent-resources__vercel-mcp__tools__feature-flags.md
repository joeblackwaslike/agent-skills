---
title: Feature Flags
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/flags/vercel-flags/project-connections
summary: Vercel MCP tools for feature flags.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "2d4130f2b7249f62d855bd3d97781f77094dfa2fe11be2c0f9bf7b4381d2090d"
---

# Feature Flags

Read and update feature flags and their settings. Create SDK keys and list the keys available for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List all flags for a team](https://vercel.com/docs/rest-api/feature-flags/list-all-flags-for-a-team) — GET /v2/teams/{teamId}/feature-flags/flags — Retrieve all feature flags for a team across all projects. Returns an opaqu
- [List flags](https://vercel.com/docs/rest-api/feature-flags/list-flags) — GET /v2/projects/{projectIdOrName}/feature-flags/flags — Retrieve feature flags for a project. Returns an opaque cursor
- [Update a flag](https://vercel.com/docs/rest-api/feature-flags/update-a-flag) — PATCH /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug} — Update an existing feature flag. This endpoint
- [List team project flag settings](https://vercel.com/docs/rest-api/feature-flags/list-team-project-flag-settings) — GET /v1/teams/{teamId}/feature-flags/settings — Retrieve feature flag settings for projects in a team.
- [List flag versions](https://vercel.com/docs/rest-api/feature-flags/list-flag-versions) — GET /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}/versions — Lists flag versions for a given flag.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags.graph.md)
<!-- /docsgraph:related -->

## `create_flag`

Create a flag.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object | Yes      | Request body for this tool.                                 |

## `create_sdk_key`

Create an SDK key.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object | No       | Request body for this tool.                                 |

## `get_flag`

Get a flag.

## Parameters

| Parameter         | Type    | Required | Description                                                           |
| ----------------- | ------- | -------- | --------------------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                                |
| `flagIdOrSlug`    | string  | Yes      | The flag id or name                                                   |
| `ifMatch`         | string  | No       | ETag to match, can be used interchangeably with the `if-match` header |
| `withMetadata`    | boolean | No       | Whether to include metadata in the response                           |
| `teamId`          | string  | No       | Team ID to use for this operation.                                    |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId.           |

## `get_flag_segment`

Retrieve a feature flag segment by ID or slug.

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                      |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                                            |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`.               |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_flag_settings`

Get project flag settings.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_feature_flag_sdk_keys`

Get all SDK keys.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_flag_segments`

List all feature flag segments for a project.

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                      |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`.               |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_flag_versions`

Lists flag versions for a given flag.

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project ID or name.                                     |
| `flagIdOrSlug`    | string  | Yes      | The feature flag ID or slug.                                |
| `limit`           | number  | No       | Minimum: 1. Maximum: 100. Default: `20`.                    |
| `cursor`          | string  | No       | Pagination cursor                                           |
| `environment`     | string  | No       | Environment to filter by                                    |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`.               |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_flags`

List flags.

## Parameters

| Parameter         | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectIdOrName` | string           | Yes      | The project id or name                                                                                                                                                                                                                                                                                                                                  |
| `state`           | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`.                                                                                                                                                                                                                                                     |
| `withMetadata`    | boolean          | No       | Deprecated. Whether to include creator metadata in each flag in the response. Resolve creator identity client-side (e.g. via the team members endpoint) instead. This parameter will be removed in a future release. Use `GET /v1/projects/:id/feature-flags/flags/:flagIdOrSlug?withMetadata=true` for single-flag lookups that need creator metadata. |
| `limit`           | integer          | No       | Maximum number of flags to return. When not set, all flags are returned. Minimum: 1. Maximum: 100.                                                                                                                                                                                                                                                      |
| `cursor`          | string           | No       | Pagination cursor to continue from.                                                                                                                                                                                                                                                                                                                     |
| `search`          | string           | No       | Search flags by their slug or description. Case-insensitive.                                                                                                                                                                                                                                                                                            |
| `tags`            | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                                                                                                                                                                                                                                                                           |
| `teamId`          | string           | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                                                                      |
| `slug`            | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                                                                             |

## `list_flags_v2`

List flags.

## Parameters

| Parameter                 | Type             | Required | Description                                                                                         |
| ------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `projectIdOrName`         | string           | Yes      | The project id or name                                                                              |
| `state`                   | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`. |
| `limit`                   | integer          | No       | Maximum number of flags to return. Minimum: 1. Maximum: 100. Default: `25`.                         |
| `cursor`                  | string           | No       | Pagination cursor to continue from.                                                                 |
| `search`                  | string           | No       | Search flags by their slug or description. Case-insensitive.                                        |
| `tags`                    | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                       |
| `createdBy`               | string           | No       | Filter flags by the id of the entity that created them (a user or team id).                         |
| `maintainerIds`           | Array\<string> | No       | Filter flags by maintainer user id. Repeat the parameter for multiple maintainers (any may match).  |
| `includeMarketplaceFlags` | boolean          | No       | Whether to include Marketplace experimentation items in the paginated response. Defaults to false.  |
| `teamId`                  | string           | No       | Team ID to use for this operation.                                                                  |
| `slug`                    | string           | No       | Team slug to use for this operation. Use instead of teamId.                                         |

## `list_team_flag_settings`

Retrieve feature flag settings for projects in a team.

## Parameters

| Parameter | Type    | Required | Description                                                                    |
| --------- | ------- | -------- | ------------------------------------------------------------------------------ |
| `limit`   | integer | No       | Maximum number of settings to return. Minimum: 1. Maximum: 100. Default: `20`. |
| `cursor`  | string  | No       | Pagination cursor to continue from.                                            |
| `teamId`  | string  | Yes      | Team ID to use for this operation.                                             |
| `slug`    | string  | No       | Team slug to use for this operation. Use instead of teamId.                    |

## `list_team_flags`

Retrieve all feature flags for a team across all projects. The list can be filtered by state and supports pagination.

## Parameters

| Parameter      | Type             | Required | Description                                                                                                                                                                                                          |
| -------------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`        | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`.                                                                                                                  |
| `withMetadata` | boolean          | No       | Deprecated. Whether to include creator metadata in each flag in the response. Resolve creator identity client-side (e.g. via the team members endpoint) instead. This parameter will be removed in a future release. |
| `limit`        | integer          | No       | Maximum number of flags to return. Minimum: 1. Maximum: 100. Default: `20`.                                                                                                                                          |
| `cursor`       | string           | No       | Pagination cursor to continue from.                                                                                                                                                                                  |
| `search`       | string           | No       | Search flags by their slug or description. Case-insensitive.                                                                                                                                                         |
| `kind`         | string           | No       | The kind of flags to retrieve. Allowed values: `"boolean"`, `"string"`, `"number"`, `"json"`.                                                                                                                        |
| `tags`         | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                                                                                                                                        |
| `teamId`       | string           | Yes      | Team ID to use for this operation.                                                                                                                                                                                   |
| `slug`         | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                          |

## `list_team_flags_v2`

Retrieve all feature flags for a team across all projects. Returns an opaque cursor for pagination.

## Parameters

| Parameter                 | Type             | Required | Description                                                                                         |
| ------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `state`                   | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`. |
| `limit`                   | integer          | No       | Maximum number of flags to return. Minimum: 1. Maximum: 100. Default: `25`.                         |
| `cursor`                  | string           | No       | Pagination cursor to continue from.                                                                 |
| `search`                  | string           | No       | Search flags by their slug or description. Case-insensitive.                                        |
| `kind`                    | string           | No       | The kind of flags to retrieve. Allowed values: `"boolean"`, `"string"`, `"number"`, `"json"`.       |
| `tags`                    | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                       |
| `createdBy`               | string           | No       | Filter flags by the id of the entity that created them (a user or team id).                         |
| `maintainerIds`           | Array\<string> | No       | Filter flags by maintainer user id. Repeat the parameter for multiple maintainers (any may match).  |
| `includeMarketplaceFlags` | boolean          | No       | Whether to include Marketplace experimentation items in the paginated response. Defaults to false.  |
| `teamId`                  | string           | Yes      | Team ID to use for this operation.                                                                  |
| `slug`                    | string           | No       | Team slug to use for this operation. Use instead of teamId.                                         |

## `update_flag`

Update a flag.

## Parameters

| Parameter         | Type    | Required | Description                                                           |
| ----------------- | ------- | -------- | --------------------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                                |
| `flagIdOrSlug`    | string  | Yes      | The flag id or name                                                   |
| `ifMatch`         | string  | No       | ETag to match, can be used interchangeably with the `if-match` header |
| `withMetadata`    | boolean | No       | Whether to include metadata in the response                           |
| `teamId`          | string  | No       | Team ID to use for this operation.                                    |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId.           |
| `requestBody`     | object  | No       | Request body for this tool.                                           |

## `update_flag_segment`

Update an existing feature flag segment.

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                      |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                                            |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`.               |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object  | No       | Request body for this tool.                                 |

## `update_flag_settings`

Update project flag settings.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object | No       | Request body for this tool.                                 |

## `list_flags_project_connections`

List the flag connections for a project within one team.

Use `role: "source"` (the default) to list projects that can read this project's flags. Use `role: "consumer"` to list projects whose flags it can read. Connections apply across environments.

On a project-scoped MCP connection, the selected project and team come from the route. Your OAuth grant must include that project, and you need permission to list its connections.

## Example

```json
{
  "teamId": "team_example",
  "projectIdOrName": "prj_source",
  "role": "source"
}
```

The response contains a `data` array with the source and consumer project IDs, available names, and creation details.

## Parameters

| Parameter         | Type   | Required | Description                                                                                                           |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                                                                                |
| `role`            | string | No       | List connections where this project is the source (default) or the consumer Allowed values: `"source"`, `"consumer"`. |
| `teamId`          | string | No       | Team ID.                                                                                                              |
| `slug`            | string | No       | Team slug.                                                                                                            |

## `create_flags_project_connection`

Connect two projects in the same team. The source owns the flags; the consumer receives read and evaluate access across environments. Your consumer project's OIDC token selects the environment. Connections do not permit flag changes.

Set `projectIdOrName` to the source and `requestBody.consumerProjectId` to the consumer. Confirm both projects before creating the connection. On a project-scoped MCP connection, connect to the source project.

## Example

```json
{
  "teamId": "team_example",
  "projectIdOrName": "prj_source",
  "requestBody": {
    "consumerProjectId": "prj_consumer"
  }
}
```

The response identifies both projects and the connection's creator and creation time. Read it back with `list_flags_project_connections`. An existing connection returns a conflict; inspect it before retrying.

## Required permissions

Your MCP OAuth grant must cover both projects. You need permission to manage connections on the source and view the consumer. See [Project Connections permissions](/docs/flags/vercel-flags/project-connections#required-permissions).

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name      |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | Yes      | Request body for this tool. |

## `get_flags_project_disconnection_link`

Get the source project's Flags Connections page, where you can disconnect the selected consumer. This tool checks the source project's team and returns `requires_user_action` with `mutationExecuted: false`. It does not revoke access.

Set `projectIdOrName` to the source and `consumerProjectId` to the consumer. On a project-scoped MCP connection, connect to the source project.

## Example

```json
{
  "teamId": "team_example",
  "projectIdOrName": "prj_source",
  "consumerProjectId": "prj_consumer"
}
```

Open the returned URL, find the consumer under projects that can read the source's flags, and select **Remove Connection**. This removes access across environments. Use `list_flags_project_connections` to verify removal.

You need permission to manage connections on the source to complete this action. You don't need access to the consumer. See [Project Connections permissions](/docs/flags/vercel-flags/project-connections#required-permissions).

## Parameters

| Parameter           | Type   | Required | Description                       |
| ------------------- | ------ | -------- | --------------------------------- |
| `projectIdOrName`   | string | Yes      | The project id or name            |
| `consumerProjectId` | string | Yes      | The connected consumer project id |
| `teamId`            | string | Yes      | Team ID.                          |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
