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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4357aec77abe37ad89d6858f99290bb7572fb4031e97d34bba4fc5cb0d716175"
---

# get_storage_stores_by_id

Get a store.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a store](https://vercel.com/docs/rest-api/storage/get-a-store) — GET /storage/stores/{id} — Get a store
- [create_storage_stores_blob](https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob) — Use create_storage_stores_blob with Vercel MCP.
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [get_cert_by_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id) — Use get_cert_by_id with Vercel MCP.
- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status) — Use get_rolling_release_billing_status with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.graph.md](/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.graph.md)
<!-- /docsgraph:related -->

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
