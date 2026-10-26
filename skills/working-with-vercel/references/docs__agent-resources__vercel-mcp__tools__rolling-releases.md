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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "73ae3a0f06992538b59ef65f7345f8419fa8679953ce9f9f5bd66ac3d2b7714b"
---

# Rolling Releases

Control how a new deployment receives production traffic for your project. You can start and advance a rolling release, update its settings, or roll back to a previous production deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Rolling Releases](https://vercel.com/docs/rolling-releases) — Learn how to use Rolling Releases for more cautious deployments.
- [Update the rolling release settings for the project](https://vercel.com/docs/rest-api/rolling-release/update-the-rolling-release-settings-for-the-project) — PATCH /v1/projects/{idOrName}/rolling-release/config — Update \\(or disable\\) Rolling Releases for a project. When disabl
- [Performing a rolling release deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
- [Complete the rolling release for the project](https://vercel.com/docs/rest-api/rolling-release/complete-the-rolling-release-for-the-project) — POST /v1/projects/{idOrName}/rolling-release/complete — Force-complete a Rolling Release. The canary deployment will beg
- [Update the active rolling release to the next stage for a project](https://vercel.com/docs/rest-api/rolling-release/update-the-active-rolling-release-to-the-next-stage-for-a-project) — POST /v1/projects/{idOrName}/rolling-release/approve-stage — Advance a rollout to the next stage. This is only needed wh

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases.graph.md)
<!-- /docsgraph:related -->

## `approve_rolling_release_stage`

Update the active rolling release to the next stage for a project.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `complete_rolling_release`

Complete the rolling release for the project.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `get_rolling_release`

Get the active rolling release information for a project.

## Parameters

| Parameter  | Type   | Required | Description                                                                            |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded)                                               |
| `state`    | string | No       | Filter by rolling release state Allowed values: `"ACTIVE"`, `"COMPLETE"`, `"ABORTED"`. |
| `teamId`   | string | No       | Team ID to use for this operation.                                                     |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId.                            |

## `get_rolling_release_billing_status`

Get rolling release billing status.

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_rolling_release_config`

Get rolling release configuration.

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_promote_aliases`

Gets a list of aliases with status for the current promote.

## Parameters

| Parameter    | Type    | Required | Description                                                                   |
| ------------ | ------- | -------- | ----------------------------------------------------------------------------- |
| `projectId`  | string  | Yes      | The project ID.                                                               |
| `limit`      | number  | No       | Maximum number of aliases to list from a request (max 100). Maximum: 100.     |
| `since`      | number  | No       | Get aliases created after this epoch timestamp.                               |
| `until`      | number  | No       | Get aliases created before this epoch timestamp.                              |
| `failedOnly` | boolean | No       | Filter results down to aliases that failed to map to the requested deployment |
| `teamId`     | string  | No       | Team ID to use for this operation.                                            |
| `slug`       | string  | No       | Team slug to use for this operation. Use instead of teamId.                   |

## `request_promote`

Point production traffic to a given deployment.

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`    | string  | Yes      | The project ID.                                             |
| `deploymentId` | string  | Yes      | The deployment ID.                                          |
| `teamId`       | string  | No       | Team ID to use for this operation.                          |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | unknown | No       | Request body for this tool.                                 |

## `request_rollback`

Point production traffic to a previous production deployment by ID.

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`    | string  | Yes      | The project ID.                                             |
| `deploymentId` | string  | Yes      | The ID of the deployment to rollback *to*                   |
| `description`  | string  | No       | The reason for the rollback                                 |
| `teamId`       | string  | No       | Team ID to use for this operation.                          |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | unknown | No       | Request body for this tool.                                 |

## `start_rolling_release`

Start a rolling release for the project.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `update_rolling_release_config`

Update the rolling release settings for the project.

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string  | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
