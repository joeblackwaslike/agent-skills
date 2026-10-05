---
title: Storage
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/storage
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for storage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "719d3134b954103109f3c00fe4458d4598457dd9f48bebe29fdd6697c954751e"
---

# Storage

Create a Vercel Blob store for your team and retrieve details about an existing store. Use these tools to set up storage or inspect a store before connecting it to your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=related) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Create private blob stores with a single click in v0](https://vercel.com/changelog/create-private-blob-stores-with-a-single-click-in-v0?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=related)
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=related) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=related) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=related) — POST /storage/stores/blob — Create a Blob store
- [Vercel Storage overview](https://vercel.com/docs/storage?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=related) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Get a store](https://vercel.com/docs/rest-api/storage/get-a-store?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=related) — GET /storage/stores/{id} — Get a store

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/storage.graph.md](/docs/agent-resources/vercel-mcp/tools/storage.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_storage_stores_blob`

Create a Blob store.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `requestBody` | object | No       | Request body for this tool. |
| `teamId`      | string | No       | Team ID.                    |

## `get_storage_stores_by_id`

Get a store.

## Parameters

| Parameter       | Type    | Required | Description           |
| --------------- | ------- | -------- | --------------------- |
| `id`            | string  | Yes      | The storage store ID. |
| `skipMetadata`  | boolean | No       | -                     |
| `includeGuides` | boolean | No       | -                     |
| `teamId`        | string  | No       | Team ID.              |


---

[View full sitemap](/docs/sitemap)
