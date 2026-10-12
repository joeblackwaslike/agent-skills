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
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "7a5eff7f18dbb56bcaa770aae4d74ff205f6ae6e9c15e15e200ef8d841a1008d"
---

# Feature Flags

Create and update feature flags for your projects to control which behavior your application enables. You can inspect targeting segments and project settings, and manage the SDK keys used to access flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing flags in the dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags&source_site=vercel-docs&relationship=related) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Update a flag](https://vercel.com/docs/rest-api/feature-flags/update-a-flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags&source_site=vercel-docs&relationship=related) — PATCH /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug} — Update an existing feature flag. This endpoint
- [Vercel Flags](https://vercel.com/docs/flags/vercel-flags?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags&source_site=vercel-docs&relationship=related) — Use Vercel as your feature flag provider to create and manage flags, define targeting rules, and run experiments directl
- [Update project flag settings](https://vercel.com/docs/rest-api/feature-flags/update-project-flag-settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags&source_site=vercel-docs&relationship=related) — PATCH /v1/projects/{projectIdOrName}/feature-flags/settings — Update feature flag settings for a project.
- [Get a flag](https://vercel.com/docs/rest-api/feature-flags/get-a-flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug} — Retrieve a specific feature flag by its ID or sl

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_flag`

Create a flag.

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name      |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | Yes      | Request body for this tool. |

## `create_sdk_key`

Create an SDK key.

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name      |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | No       | Request body for this tool. |

## `get_flag`

Get a flag.

## Parameters

| Parameter         | Type    | Required | Description                                                           |
| ----------------- | ------- | -------- | --------------------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                                |
| `flagIdOrSlug`    | string  | Yes      | The flag id or name                                                   |
| `ifMatch`         | string  | No       | ETag to match, can be used interchangeably with the `if-match` header |
| `withMetadata`    | boolean | No       | Whether to include metadata in the response                           |
| `teamId`          | string  | No       | Team ID.                                                              |
| `slug`            | string  | No       | Team slug.                                                            |

## `get_flag_segment`

Get a segment.

## Parameters

| Parameter         | Type    | Required | Description                                   |
| ----------------- | ------- | -------- | --------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                        |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                              |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`. |
| `teamId`          | string  | No       | Team ID.                                      |
| `slug`            | string  | No       | Team slug.                                    |

## `get_flag_settings`

Get project flag settings.

## Parameters

| Parameter         | Type   | Required | Description            |
| ----------------- | ------ | -------- | ---------------------- |
| `projectIdOrName` | string | Yes      | The project id or name |
| `teamId`          | string | No       | Team ID.               |
| `slug`            | string | No       | Team slug.             |

## `list_feature_flag_sdk_keys`

Get all SDK keys.

## Parameters

| Parameter         | Type   | Required | Description            |
| ----------------- | ------ | -------- | ---------------------- |
| `projectIdOrName` | string | Yes      | The project id or name |
| `teamId`          | string | No       | Team ID.               |
| `slug`            | string | No       | Team slug.             |

## `list_flags`

List flags.

## Parameters

| Parameter         | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectIdOrName` | string           | Yes      | The project id or name                                                                                                                                                                                                                                                                                                                                  |
| `state`           | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`.                                                                                                                                                                                                                                                     |
| `withMetadata`    | boolean          | No       | Deprecated. Whether to include creator metadata in each flag in the response. Resolve creator identity client-side (e.g. via the team members endpoint) instead; this parameter will be removed in a future release. Use `GET /v1/projects/:id/feature-flags/flags/:flagIdOrSlug?withMetadata=true` for single-flag lookups that need creator metadata. |
| `limit`           | integer          | No       | Maximum number of flags to return. When not set, all flags are returned.                                                                                                                                                                                                                                                                                |
| `cursor`          | string           | No       | Pagination cursor to continue from.                                                                                                                                                                                                                                                                                                                     |
| `search`          | string           | No       | Search flags by their slug or description. Case-insensitive.                                                                                                                                                                                                                                                                                            |
| `tags`            | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                                                                                                                                                                                                                                                                           |
| `teamId`          | string           | No       | Team ID.                                                                                                                                                                                                                                                                                                                                                |
| `slug`            | string           | No       | Team slug.                                                                                                                                                                                                                                                                                                                                              |

## `list_flags_v2`

List flags.

## Parameters

| Parameter                 | Type             | Required | Description                                                                                         |
| ------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `projectIdOrName`         | string           | Yes      | The project id or name                                                                              |
| `state`                   | string           | No       | The state of the flags to retrieve. Defaults to `active`. Allowed values: `"active"`, `"archived"`. |
| `limit`                   | integer          | No       | Maximum number of flags to return. Default: `25`.                                                   |
| `cursor`                  | string           | No       | Pagination cursor to continue from.                                                                 |
| `search`                  | string           | No       | Search flags by their slug or description. Case-insensitive.                                        |
| `tags`                    | Array\<string> | No       | Filter flags by tag. Repeat the parameter for multiple tags (all must match).                       |
| `createdBy`               | string           | No       | Filter flags by the id of the entity that created them (a user or team id).                         |
| `maintainerIds`           | Array\<string> | No       | Filter flags by maintainer user id. Repeat the parameter for multiple maintainers (any may match).  |
| `includeMarketplaceFlags` | boolean          | No       | Whether to include Marketplace experimentation items in the paginated response. Defaults to false.  |
| `teamId`                  | string           | No       | Team ID.                                                                                            |
| `slug`                    | string           | No       | Team slug.                                                                                          |

## `update_flag`

Update a flag.

## Parameters

| Parameter         | Type    | Required | Description                                                           |
| ----------------- | ------- | -------- | --------------------------------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                                                |
| `flagIdOrSlug`    | string  | Yes      | The flag id or name                                                   |
| `ifMatch`         | string  | No       | ETag to match, can be used interchangeably with the `if-match` header |
| `withMetadata`    | boolean | No       | Whether to include metadata in the response                           |
| `teamId`          | string  | No       | Team ID.                                                              |
| `slug`            | string  | No       | Team slug.                                                            |
| `requestBody`     | object  | No       | Request body for this tool.                                           |

## `update_flag_segment`

Update a segment.

## Parameters

| Parameter         | Type    | Required | Description                                   |
| ----------------- | ------- | -------- | --------------------------------------------- |
| `projectIdOrName` | string  | Yes      | The project id or name                        |
| `segmentIdOrSlug` | string  | Yes      | The segment slug                              |
| `withMetadata`    | boolean | No       | Whether to include metadata Default: `false`. |
| `teamId`          | string  | No       | Team ID.                                      |
| `slug`            | string  | No       | Team slug.                                    |
| `requestBody`     | object  | No       | Request body for this tool.                   |

## `update_flag_settings`

Update project flag settings.

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name      |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
