---
title: Checks
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for checks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "bd75730ce566637b75e976e9e2ead1170bdd753c78172d0294050e971e4806a2"
---

# Checks

Manage checks for your projects and deployments to track validation results. You can inspect individual runs, update their status, or request a check to run again.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Checks API Reference](https://vercel.com/docs/checks/checks-api?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks&source_site=vercel-docs&relationship=related) — The Vercel Checks API let you create tests and assertions that run after each deployment has been built, and are powered
- [Create a check run](https://vercel.com/docs/rest-api/checks-v2/create-a-check-run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks&source_site=vercel-docs&relationship=related) — POST /v2/deployments/{deploymentId}/check-runs — Creates a new check run for a deployment.
- [List runs for a check](https://vercel.com/docs/rest-api/checks-v2/list-runs-for-a-check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks/{checkId}/runs — List all runs associated with a given check.
- [List check runs for a deployment](https://vercel.com/docs/rest-api/checks-v2/list-check-runs-for-a-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks&source_site=vercel-docs&relationship=related) — GET /v2/deployments/{deploymentId}/check-runs — List all check runs for a deployment.
- [Get a check run](https://vercel.com/docs/rest-api/checks-v2/get-a-check-run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks&source_site=vercel-docs&relationship=related) — GET /v2/deployments/{deploymentId}/check-runs/{checkRunId} — Return a detailed response for a single check run.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks.graph.md](/docs/agent-resources/vercel-mcp/tools/checks.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_check`

Creates a new Check.

## Parameters

| Parameter      | Type   | Required | Description                             |
| -------------- | ------ | -------- | --------------------------------------- |
| `deploymentId` | string | Yes      | The deployment to create the check for. |
| `teamId`       | string | No       | Team ID.                                |
| `slug`         | string | No       | Team slug.                              |
| `requestBody`  | object | Yes      | Request body for this tool.             |

## `create_deployment_check_run`

Create a check run.

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `deploymentId` | string | Yes      | The deployment ID.          |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |

## `get_check`

Get a single check.

## Parameters

| Parameter      | Type   | Required | Description                          |
| -------------- | ------ | -------- | ------------------------------------ |
| `deploymentId` | string | Yes      | The deployment to get the check for. |
| `checkId`      | string | Yes      | The check to fetch                   |
| `teamId`       | string | No       | Team ID.                             |
| `slug`         | string | No       | Team slug.                           |

## `get_deployment_check_run`

Get a check run.

## Parameters

| Parameter      | Type   | Required | Description        |
| -------------- | ------ | -------- | ------------------ |
| `deploymentId` | string | Yes      | The deployment ID. |
| `checkRunId`   | string | Yes      | The check run ID.  |
| `teamId`       | string | No       | Team ID.           |
| `slug`         | string | No       | Team slug.         |

## `get_project_check`

Get a check.

## Parameters

| Parameter         | Type   | Required | Description             |
| ----------------- | ------ | -------- | ----------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name. |
| `checkId`         | string | Yes      | The check ID.           |
| `teamId`          | string | No       | Team ID.                |
| `slug`            | string | No       | Team slug.              |

## `list_check_runs`

List runs for a check.

## Parameters

| Parameter         | Type   | Required | Description             |
| ----------------- | ------ | -------- | ----------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name. |
| `checkId`         | string | Yes      | The check ID.           |
| `teamId`          | string | No       | Team ID.                |
| `slug`            | string | No       | Team slug.              |

## `rerequest_check`

Rerequest a check.

## Parameters

| Parameter      | Type    | Required | Description                            |
| -------------- | ------- | -------- | -------------------------------------- |
| `deploymentId` | string  | Yes      | The deployment to rerun the check for. |
| `checkId`      | string  | Yes      | The check to rerun                     |
| `autoUpdate`   | boolean | No       | Mark the check as running              |
| `teamId`       | string  | No       | Team ID.                               |
| `slug`         | string  | No       | Team slug.                             |
| `requestBody`  | unknown | No       | Request body for this tool.            |

## `update_check`

Update a check.

## Parameters

| Parameter      | Type   | Required | Description                             |
| -------------- | ------ | -------- | --------------------------------------- |
| `deploymentId` | string | Yes      | The deployment to update the check for. |
| `checkId`      | string | Yes      | The check being updated                 |
| `teamId`       | string | No       | Team ID.                                |
| `slug`         | string | No       | Team slug.                              |
| `requestBody`  | object | Yes      | Request body for this tool.             |

## `update_deployment_check_run`

Update a check run.

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `deploymentId` | string | Yes      | The deployment ID.          |
| `checkRunId`   | string | Yes      | The check run ID.           |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |

## `update_project_check`

Update a check.

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name.     |
| `checkId`         | string | Yes      | The check ID.               |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
