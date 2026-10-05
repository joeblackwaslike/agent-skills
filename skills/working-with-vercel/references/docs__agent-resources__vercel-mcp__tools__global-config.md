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
summary: Vercel MCP tools for global config.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5e9885a40be60f27b11bb83b5874c52248731bf1f25336368b2ad0101bed60d2"
---

# Global Config

Update your Global Config values and schema without changing application code. You can manage access tokens and restore a previous configuration from a backup.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update a Global Config](https://vercel.com/docs/rest-api/global-config/update-a-global-config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config&source_site=vercel-docs&relationship=related) — PUT /v1/global-config/{edgeConfigId} — Updates a Global Config.
- [Get a Global Config](https://vercel.com/docs/rest-api/global-config/get-a-global-config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config&source_site=vercel-docs&relationship=related) — GET /v1/global-config/{edgeConfigId} — Returns a Global Config.
- [Get Global Config items](https://vercel.com/docs/rest-api/global-config/get-global-config-items?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config&source_site=vercel-docs&relationship=related) — GET /v1/global-config/{edgeConfigId}/items — Returns all items of a Global Config.
- [Update Global Config schema](https://vercel.com/docs/rest-api/global-config/update-global-config-schema?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config&source_site=vercel-docs&relationship=related) — POST /v1/global-config/{edgeConfigId}/schema — Update a Global Config's schema.
- [Restore Global Config backup](https://vercel.com/docs/rest-api/global-config/restore-global-config-backup?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config&source_site=vercel-docs&relationship=related) — POST /v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId}/restore — Restores a Global Config backup.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fglobal-config&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_edge_config_token`

Create a Global Config token.

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.       |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |

## `get_edge_config_backup`

Get Global Config backup.

## Parameters

| Parameter                   | Type   | Required | Description                          |
| --------------------------- | ------ | -------- | ------------------------------------ |
| `edgeConfigId`              | string | Yes      | The Global Config ID.                |
| `edgeConfigBackupVersionId` | string | Yes      | The Global Config backup version ID. |
| `teamId`                    | string | No       | Team ID.                             |
| `slug`                      | string | No       | Team slug.                           |

## `get_edge_config_token`

Get Global Config token meta data.

## Parameters

| Parameter      | Type   | Required | Description              |
| -------------- | ------ | -------- | ------------------------ |
| `edgeConfigId` | string | Yes      | The Global Config ID.    |
| `token`        | string | Yes      | The Global Config token. |
| `teamId`       | string | No       | Team ID.                 |
| `slug`         | string | No       | Team slug.               |

## `patch_edge_config_items`

Update Global Config items in batch.

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.       |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |

## `patch_edge_config_schema`

Update Global Config schema.

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.       |
| `dryRun`       | string | No       | -                           |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |

## `restore_edge_config_backup`

Restore Global Config backup.

## Parameters

| Parameter                   | Type    | Required | Description                          |
| --------------------------- | ------- | -------- | ------------------------------------ |
| `edgeConfigId`              | string  | Yes      | The Global Config ID.                |
| `edgeConfigBackupVersionId` | string  | Yes      | The Global Config backup version ID. |
| `teamId`                    | string  | No       | Team ID.                             |
| `slug`                      | string  | No       | Team slug.                           |
| `requestBody`               | unknown | No       | Request body for this tool.          |

## `update_edge_config`

Update a Global Config.

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.       |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
