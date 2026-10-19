---
title: Networking
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for networking.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "2f6444760441faed543739f00b1c6249232e5d0ee17e0dedc8da8aa7be2464e3"
---

# Networking

List and inspect connectors for your team. Read or update connector settings and the project environments linked to each connector.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List connectors for a project](https://vercel.com/docs/rest-api/connect/list-connectors-for-a-project) — GET /v2/connect/projects/{projectId}/connectors — List the connectors connected to a project and the environments where
- [Create or update a connector project connection](https://vercel.com/docs/rest-api/connect/create-or-update-a-connector-project-connection) — POST /v1/connect/connectors/{connector}/projects/{projectId} — Connect a connector to a project, or replace the environm
- [List projects for a connector](https://vercel.com/docs/rest-api/connect/list-projects-for-a-connector) — GET /v2/connect/connectors/{connector}/projects — List the projects connected to a connector and the environments where
- [Get a connector project connection](https://vercel.com/docs/rest-api/connect/get-a-connector-project-connection) — GET /v1/connect/connectors/{connector}/projects/{projectId} — Get the configuration that connects a connector to a proje
- [Disconnect a connector from a project](https://vercel.com/docs/rest-api/connect/disconnect-a-connector-from-a-project) — DELETE /v1/connect/connectors/{connector}/projects/{projectId} — Disconnect a connector from a project.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking.graph.md](/docs/agent-resources/vercel-mcp/tools/networking.graph.md)
<!-- /docsgraph:related -->

## `get_connector`

Get the connector by ID. Accepts a dashboard/team requester or a deployment's project OIDC token. Project requesters may only read connectors linked to their project and environment.

## Parameters

| Parameter   | Type   | Required | Description                                                                                     |
| ----------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector` | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `teamId`    | string | No       | Team ID to use for this operation.                                                              |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |

## `get_connector_project_connection`

Get the configuration that connects a connector to a project.

## Parameters

| Parameter   | Type   | Required | Description                                                                                     |
| ----------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector` | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `projectId` | string | Yes      | Vercel project ID.                                                                              |
| `teamId`    | string | No       | Team ID to use for this operation.                                                              |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |

## `list_connector_project_connections`

List the projects connected to a connector and the environments where each connection is available.

## Parameters

| Parameter   | Type    | Required | Description                                                                                     |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------- |
| `connector` | string  | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `limit`     | integer | No       | Maximum number of project connections to return. Defaults to 50. Minimum: 1. Maximum: 100.      |
| `cursor`    | string  | No       | Cursor from `pagination.next` on the previous response.                                         |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                              |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                     |

## `list_connectors`

List connectors that belong to a team.

## Parameters

| Parameter   | Type    | Required | Description                                                                                                                                                                                            |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `limit`     | integer | No       | Maximum number of connectors to return. Defaults to 20. Minimum: 1. Maximum: 100.                                                                                                                      |
| `cursor`    | string  | No       | Cursor from `pagination.next` on the previous response.                                                                                                                                                |
| `projectId` | string  | No       | Return only connectors connected to this project.                                                                                                                                                      |
| `search`    | string  | No       | Search connector names, UIDs, and services.                                                                                                                                                            |
| `type`      | string  | No       | Comma-separated connector types: `slack`, `discord`, `github`, `linear`, `linq`, `salesforce`, `sendblue`, `snowflake`, `snowflake-wif`, `microsoft-entra`, `api-key`, `photon`, `oauth`, or `custom`. |
| `service`   | string  | No       | Comma-separated provider or service identifiers.                                                                                                                                                       |
| `sort`      | string  | No       | Sort by name in ascending order, or by creation or update time in descending order. Allowed values: `"name"`, `"createdAt"`, `"updatedAt"`.                                                            |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                                                                                                                                     |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                            |

## `list_project_connector_connections`

List the connectors connected to a project and the environments where each connection is available.

## Parameters

| Parameter   | Type    | Required | Description                                                                                  |
| ----------- | ------- | -------- | -------------------------------------------------------------------------------------------- |
| `projectId` | string  | Yes      | Vercel project ID.                                                                           |
| `limit`     | integer | No       | Maximum number of connector connections to return. Defaults to 50. Minimum: 1. Maximum: 100. |
| `cursor`    | string  | No       | Cursor from `pagination.next` on the previous response.                                      |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                           |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                  |

## `update_connector`

Update a connector and return the connector with any service-side update signals that the caller must handle.

## Parameters

| Parameter     | Type   | Required | Description                                                                                     |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector`   | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `teamId`      | string | No       | Team ID to use for this operation.                                                              |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |
| `requestBody` | object | Yes      | Connector fields to update.                                                                     |

## `upsert_connector_project_connection`

Connect a connector to a project, or replace the environments on an existing project connection.

## Parameters

| Parameter     | Type   | Required | Description                                                                                     |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `connector`   | string | Yes      | Stable connector ID or URL-encoded team-scoped UID. Examples: `scl_abc123` or `slack%2Fmy-bot`. |
| `projectId`   | string | Yes      | Vercel project ID.                                                                              |
| `teamId`      | string | No       | Team ID to use for this operation.                                                              |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.                                     |
| `requestBody` | object | Yes      | Environments enabled for a connector project connection.                                        |


---

[View full sitemap](/docs/sitemap)
