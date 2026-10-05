---
title: Drains
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for drains.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "7372f355d2674f6bcaf1b79fce5b3e1fc38f4c2840f469e280966d3d7fc95c1c"
---

# Drains

Configure Drains to send your Vercel observability data to an external destination. You can inspect existing Drains, update their configuration, and test delivery before relying on them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Drains](https://vercel.com/docs/drains/using-drains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains&source_site=vercel-docs&relationship=related) — Learn how to configure drains to forward observability data to custom HTTP endpoints, dedicated Audit Log destinations,
- [Retrieve a list of all Drains](https://vercel.com/docs/rest-api/drains/retrieve-a-list-of-all-drains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains&source_site=vercel-docs&relationship=related) — GET /v1/drains — Allows to retrieve the list of Drains of the authenticated team.
- [Delete a drain](https://vercel.com/docs/rest-api/drains/delete-a-drain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains&source_site=vercel-docs&relationship=related) — DELETE /v1/drains/{id} — Delete a specific Drain by passing the drain id in the URL.
- [Working with Drains](https://vercel.com/docs/drains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains&source_site=vercel-docs&relationship=related) — Drains collect logs, traces, speed insights, and analytics from your applications. Forward observability data to custom
- [Find a Drain by id](https://vercel.com/docs/rest-api/drains/find-a-drain-by-id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains&source_site=vercel-docs&relationship=related) — GET /v1/drains/{id} — Get the information for a specific Drain by passing the drain id in the URL.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drains.graph.md](/docs/agent-resources/vercel-mcp/tools/drains.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdrains&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_drain`

Create a new Drain.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `get_drain`

Find a Drain by id.

## Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `id`      | string | Yes      | The drain ID. |
| `teamId`  | string | No       | Team ID.      |
| `slug`    | string | No       | Team slug.    |

## `list_drains`

Retrieve a list of all Drains.

## Parameters

| Parameter         | Type    | Required | Description       |
| ----------------- | ------- | -------- | ----------------- |
| `projectId`       | string  | No       | The project ID.   |
| `includeMetadata` | boolean | No       | Default: `false`. |
| `teamId`          | string  | No       | Team ID.          |
| `slug`            | string  | No       | Team slug.        |

## `test_drain`

Validate Drain delivery configuration.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `update_drain`

Update an existing Drain.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `id`          | string | Yes      | The drain ID.               |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
