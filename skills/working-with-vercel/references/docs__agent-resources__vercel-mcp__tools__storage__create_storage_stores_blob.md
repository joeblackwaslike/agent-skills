---
title: create_storage_stores_blob
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/storage
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_storage_stores_blob with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "82ec643715f5b0c28513dfd9d546a7a8117aceda9bc74260bf71718ee54c6dcc"
---

# create_storage_stores_blob

Create a Blob store.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create private blob stores with a single click in v0](https://vercel.com/changelog/create-private-blob-stores-with-a-single-click-in-v0)
- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Unlimited Vercel Blob stores on every plan](https://vercel.com/changelog/unlimited-vercel-blob-stores-on-every-plan)
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store) — POST /storage/stores/blob — Create a Blob store
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [get_storage_stores_by_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id) — Use get_storage_stores_by_id with Vercel MCP.
- [vercel storage](https://vercel.com/docs/cli/storage) — List, create, inspect, and delete storage resources, and manage their project connections with the Vercel CLI.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob.graph.md](/docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | No       | Request body for this tool.        |

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
