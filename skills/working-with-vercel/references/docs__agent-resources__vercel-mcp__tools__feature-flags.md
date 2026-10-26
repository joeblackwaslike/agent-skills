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
  []
summary: Vercel MCP tools for feature flags.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4848fbca340a646d59026b8777c0d5686bf17d1ba5931ca11dc831aad0146688"
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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
