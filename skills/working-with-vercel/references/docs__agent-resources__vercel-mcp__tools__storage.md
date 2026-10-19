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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "79d8daa0f22d1e6269cbdacf2a3f87e5e3a0aded3daf19d908640842491e5377"
---

# Storage

Create a Vercel Blob store for your team and retrieve details about an existing store. Use these tools to set up storage or inspect a store before connecting it to your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Create private blob stores with a single click in v0](https://vercel.com/changelog/create-private-blob-stores-with-a-single-click-in-v0)
- [Build with Vercel Blob on Nuxt](https://vercel.com/kb/guide/vercel-blob-nuxt) — Set up Vercel Blob in a Nuxt application with NuxtHub, upload and serve files, and deliver optimized images with Nuxt Im
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store) — POST /storage/stores/blob — Create a Blob store
- [Vercel Storage overview](https://vercel.com/docs/storage) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Get a store](https://vercel.com/docs/rest-api/storage/get-a-store) — GET /storage/stores/{id} — Get a store

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/storage.graph.md](/docs/agent-resources/vercel-mcp/tools/storage.graph.md)
<!-- /docsgraph:related -->

## `create_storage_stores_blob`

Create a Blob store.

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | No       | Request body for this tool.        |

## `get_storage_stores_by_id`

Get a store.

## Parameters

| Parameter       | Type    | Required | Description                        |
| --------------- | ------- | -------- | ---------------------------------- |
| `id`            | string  | Yes      | The storage store ID.              |
| `skipMetadata`  | boolean | No       | -                                  |
| `includeGuides` | boolean | No       | -                                  |
| `teamId`        | string  | No       | Team ID to use for this operation. |


---

[View full sitemap](/docs/sitemap)
