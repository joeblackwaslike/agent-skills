---
title: Global Config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for Global Config.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "eb2b1be9abc44197638b9a14a866ded06876c657ffe8d18eea326918ed956dbf"
---

# Global Config

Read and update Global Config items, manage read tokens, and restore backups.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update a Global Config](https://vercel.com/docs/rest-api/global-config/update-a-global-config) — PUT /v1/global-config/{edgeConfigId} — Updates a Global Config.
- [Get Global Config items](https://vercel.com/docs/rest-api/global-config/get-global-config-items) — GET /v1/global-config/{edgeConfigId}/items — Returns all items of a Global Config.
- [Get a Global Config item](https://vercel.com/docs/rest-api/global-config/get-a-global-config-item) — GET /v1/global-config/{edgeConfigId}/item/{edgeConfigItemKey} — Returns a specific Global Config Item.
- [Get Global Config backup](https://vercel.com/docs/rest-api/global-config/get-global-config-backup) — GET /v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId} — Retrieves a specific version of a Global Conf
- [Get a Global Config](https://vercel.com/docs/rest-api/global-config/get-a-global-config) — GET /v1/global-config/{edgeConfigId} — Returns a Global Config.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config.graph.md)
<!-- /docsgraph:related -->

## `create_edge_config`

Creates a Global Config.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `create_edge_config_token`

Adds a token to an existing Global Config.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | object | Yes      | Request body for this tool.                                 |

## `get_edge_config`

Returns a Global Config.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_edge_config_backup`

Retrieves a specific version of a Global Config from backup storage.

## Parameters

| Parameter                   | Type   | Required | Description                                                 |
| --------------------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId`              | string | Yes      | The Global Config ID.                                       |
| `edgeConfigBackupVersionId` | string | Yes      | The Global Config backup version ID.                        |
| `teamId`                    | string | No       | Team ID to use for this operation.                          |
| `slug`                      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_edge_config_backups`

Returns backups of a Global Config.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `next`         | string | No       | -                                                           |
| `limit`        | number | No       | Minimum: 0. Maximum: 50.                                    |
| `metadata`     | string | No       | -                                                           |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_edge_config_item`

Returns a specific Global Config Item.

## Parameters

| Parameter           | Type   | Required | Description                                                 |
| ------------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId`      | string | Yes      | The Global Config ID.                                       |
| `edgeConfigItemKey` | string | Yes      | The Global Config item key.                                 |
| `teamId`            | string | No       | Team ID to use for this operation.                          |
| `slug`              | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_edge_config_items`

Returns all items of a Global Config.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_edge_config_token`

Return meta data about a Global Config token.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `token`        | string | Yes      | The Global Config token.                                    |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_edge_config_tokens`

Returns all tokens of a Global Config.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_edge_configs`

Returns all Global Configs.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `patch_edge_config_items`

Update multiple Global Config Items in batch.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | object | No       | Request body for this tool.                                 |

## `restore_edge_config_backup`

Restores a Global Config backup.

## Parameters

| Parameter                   | Type    | Required | Description                                                 |
| --------------------------- | ------- | -------- | ----------------------------------------------------------- |
| `edgeConfigId`              | string  | Yes      | The Global Config ID.                                       |
| `edgeConfigBackupVersionId` | string  | Yes      | The Global Config backup version ID.                        |
| `teamId`                    | string  | No       | Team ID to use for this operation.                          |
| `slug`                      | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`               | unknown | No       | Request body for this tool.                                 |

## `update_edge_config`

Updates a Global Config.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
