---
title: get_storage_stores_by_id
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/storage
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_storage_stores_by_id with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0016bf050724cfc6ab9c1326eb72fb406a5e2e2067de68cc031c23e1bb829872"
---

# get_storage_stores_by_id

Get a store.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a store](https://vercel.com/docs/rest-api/storage/get-a-store) — GET /storage/stores/{id} — Get a store
- [create_storage_stores_blob](https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob) — Use create_storage_stores_blob with Vercel MCP.
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [vercel storage](https://vercel.com/docs/cli/storage) — List, create, inspect, and delete storage resources, and manage their project connections with the Vercel CLI.
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store) — POST /storage/stores/blob — Create a Blob store

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.graph.md](/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.graph.md)
<!-- /docsgraph:related -->

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
