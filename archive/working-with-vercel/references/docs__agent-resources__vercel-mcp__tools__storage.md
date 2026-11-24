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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "9b3297436c75c66963b19206da97efd1845440a5933bc59f2d0bdbbe8d1d1d55"
---

# Storage

Create a Vercel Blob store for your team and retrieve details about an existing store. Use these tools to set up storage or inspect a store before connecting it to your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Create private blob stores with a single click in v0](https://vercel.com/changelog/create-private-blob-stores-with-a-single-click-in-v0)
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store) — POST /storage/stores/blob — Create a Blob store
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [Vercel Storage overview](https://vercel.com/docs/storage) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [vercel storage](https://vercel.com/docs/cli/storage) — List, create, inspect, and delete storage resources, and manage their project connections with the Vercel CLI.

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
