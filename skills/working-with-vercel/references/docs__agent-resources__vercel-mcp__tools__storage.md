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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "57add1cdded5d037c09b38ffef0ecef58e20b19b91a00b5c77c63465e637e165"
---

# Storage

Create a Vercel Blob store for your team and retrieve details about an existing store. Use these tools to set up storage or inspect a store before connecting it to your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store) — POST /storage/stores/blob — Create a Blob store
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [Vercel Storage overview](https://vercel.com/docs/storage) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage) — Create blob stores, upload files, list contents, and manage storage using the CLI.
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
