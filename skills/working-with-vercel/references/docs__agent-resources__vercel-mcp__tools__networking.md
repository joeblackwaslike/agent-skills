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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c42c7827bbd07c7ae5120878c0a1f2696756139f45360d8cbc7548a363d9538c"
---

# Networking

Inspect and update Secure Compute networks for your team. You can also create connectors to configure network connectivity for your projects.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update a Secure Compute network](https://vercel.com/docs/rest-api/networking/update-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking&source_site=vercel-docs&relationship=related) — PATCH /v1/connect/networks/{networkId} — Allows to update a Secure Compute network.
- [Create a Secure Compute network](https://vercel.com/docs/rest-api/networking/create-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking&source_site=vercel-docs&relationship=related) — POST /v1/connect/networks — Allows to create a Secure Compute network.
- [Read a Secure Compute network](https://vercel.com/docs/rest-api/networking/read-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking&source_site=vercel-docs&relationship=related) — GET /v1/connect/networks/{networkId} — Allows to read a Secure Compute network.
- [List Secure Compute networks](https://vercel.com/docs/rest-api/networking/list-secure-compute-networks?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking&source_site=vercel-docs&relationship=related) — GET /v1/connect/networks — Allows to list Secure Compute networks.
- [Delete a Secure Compute network](https://vercel.com/docs/rest-api/networking/delete-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking&source_site=vercel-docs&relationship=related) — DELETE /v1/connect/networks/{networkId} — Allows to delete a Secure Compute network.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking.graph.md](/docs/agent-resources/vercel-mcp/tools/networking.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_connector`

Create a connector.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `read_network`

Read a Secure Compute network.

## Parameters

| Parameter   | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `networkId` | string | Yes      | The unique identifier of the Secure Compute network |
| `teamId`    | string | No       | Team ID.                                            |
| `slug`      | string | No       | Team slug.                                          |

## `update_network`

Update a Secure Compute network.

## Parameters

| Parameter     | Type   | Required | Description                                         |
| ------------- | ------ | -------- | --------------------------------------------------- |
| `networkId`   | string | Yes      | The unique identifier of the Secure Compute network |
| `teamId`      | string | No       | Team ID.                                            |
| `slug`        | string | No       | Team slug.                                          |
| `requestBody` | object | No       | Request body for this tool.                         |


---

[View full sitemap](/docs/sitemap)
