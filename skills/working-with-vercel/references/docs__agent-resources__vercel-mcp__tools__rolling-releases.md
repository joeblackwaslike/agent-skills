---
title: Rolling Releases
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for rolling releases.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "55ff4ef10ee9f37a6592596643d4f805c1a000b643415ce3d0379d57728af319"
---

# Rolling Releases

Control how a new deployment receives production traffic for your project. You can start and advance a rolling release, update its settings, or roll back to a previous production deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Rolling Releases](https://vercel.com/docs/rolling-releases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases&source_site=vercel-docs&relationship=related) — Learn how to use Rolling Releases for more cautious deployments.
- [Update the rolling release settings for the project](https://vercel.com/docs/rest-api/rolling-release/update-the-rolling-release-settings-for-the-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases&source_site=vercel-docs&relationship=related) — PATCH /v1/projects/{idOrName}/rolling-release/config — Update \\(or disable\\) Rolling Releases for a project. When disabl
- [Performing a rolling release deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases&source_site=vercel-docs&relationship=related) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
- [Update the active rolling release to the next stage for a project](https://vercel.com/docs/rest-api/rolling-release/update-the-active-rolling-release-to-the-next-stage-for-a-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases&source_site=vercel-docs&relationship=related) — POST /v1/projects/{idOrName}/rolling-release/approve-stage — Advance a rollout to the next stage. This is only needed wh
- [Complete the rolling release for the project](https://vercel.com/docs/rest-api/rolling-release/complete-the-rolling-release-for-the-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases&source_site=vercel-docs&relationship=related) — POST /v1/projects/{idOrName}/rolling-release/complete — Force-complete a Rolling Release. The canary deployment will beg

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `approve_rolling_release_stage`

Update the active rolling release to the next stage for a project.

## Parameters

| Parameter     | Type   | Required | Description                              |
| ------------- | ------ | -------- | ---------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded) |
| `teamId`      | string | No       | Team ID.                                 |
| `slug`        | string | No       | Team slug.                               |
| `requestBody` | object | No       | Request body for this tool.              |

## `complete_rolling_release`

Complete the rolling release for the project.

## Parameters

| Parameter     | Type   | Required | Description                              |
| ------------- | ------ | -------- | ---------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded) |
| `teamId`      | string | No       | Team ID.                                 |
| `slug`        | string | No       | Team slug.                               |
| `requestBody` | object | No       | Request body for this tool.              |

## `get_rolling_release`

Get the active rolling release information for a project.

## Parameters

| Parameter  | Type   | Required | Description                                                                            |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded)                                               |
| `state`    | string | No       | Filter by rolling release state Allowed values: `"ACTIVE"`, `"COMPLETE"`, `"ABORTED"`. |
| `teamId`   | string | No       | Team ID.                                                                               |
| `slug`     | string | No       | Team slug.                                                                             |

## `get_rolling_release_billing_status`

Get rolling release billing status.

## Parameters

| Parameter  | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded) |
| `teamId`   | string | No       | Team ID.                                 |
| `slug`     | string | No       | Team slug.                               |

## `get_rolling_release_config`

Get rolling release configuration.

## Parameters

| Parameter  | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded) |
| `teamId`   | string | No       | Team ID.                                 |
| `slug`     | string | No       | Team slug.                               |

## `list_promote_aliases`

Gets a list of aliases with status for the current promote.

## Parameters

| Parameter    | Type    | Required | Description                                                                   |
| ------------ | ------- | -------- | ----------------------------------------------------------------------------- |
| `projectId`  | string  | Yes      | The project ID.                                                               |
| `limit`      | number  | No       | Maximum number of aliases to list from a request (max 100).                   |
| `since`      | number  | No       | Get aliases created after this epoch timestamp.                               |
| `until`      | number  | No       | Get aliases created before this epoch timestamp.                              |
| `failedOnly` | boolean | No       | Filter results down to aliases that failed to map to the requested deployment |
| `teamId`     | string  | No       | Team ID.                                                                      |
| `slug`       | string  | No       | Team slug.                                                                    |

## `request_promote`

Point production traffic to a given deployment.

## Parameters

| Parameter      | Type    | Required | Description                 |
| -------------- | ------- | -------- | --------------------------- |
| `projectId`    | string  | Yes      | The project ID.             |
| `deploymentId` | string  | Yes      | The deployment ID.          |
| `teamId`       | string  | No       | Team ID.                    |
| `slug`         | string  | No       | Team slug.                  |
| `requestBody`  | unknown | No       | Request body for this tool. |

## `request_rollback`

Point production traffic to a previous production deployment by ID.

## Parameters

| Parameter      | Type    | Required | Description                               |
| -------------- | ------- | -------- | ----------------------------------------- |
| `projectId`    | string  | Yes      | The project ID.                           |
| `deploymentId` | string  | Yes      | The ID of the deployment to rollback *to* |
| `description`  | string  | No       | The reason for the rollback               |
| `teamId`       | string  | No       | Team ID.                                  |
| `slug`         | string  | No       | Team slug.                                |
| `requestBody`  | unknown | No       | Request body for this tool.               |

## `start_rolling_release`

Start a rolling release for the project.

## Parameters

| Parameter     | Type   | Required | Description                              |
| ------------- | ------ | -------- | ---------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded) |
| `teamId`      | string | No       | Team ID.                                 |
| `slug`        | string | No       | Team slug.                               |
| `requestBody` | object | No       | Request body for this tool.              |

## `update_rolling_release_config`

Update the rolling release settings for the project.

## Parameters

| Parameter     | Type    | Required | Description                              |
| ------------- | ------- | -------- | ---------------------------------------- |
| `idOrName`    | string  | Yes      | Project ID or project name (URL-encoded) |
| `teamId`      | string  | No       | Team ID.                                 |
| `slug`        | string  | No       | Team slug.                               |
| `requestBody` | unknown | No       | Request body for this tool.              |


---

[View full sitemap](/docs/sitemap)
