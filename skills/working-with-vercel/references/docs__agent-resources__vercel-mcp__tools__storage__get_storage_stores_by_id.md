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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "42d064b399c4281744959c2490a9c9592ef75e450bb5087ed97ae28ae4388233"
---

# get_storage_stores_by_id

Get a store.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a store](https://vercel.com/docs/rest-api/storage/get-a-store?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage%2Fget_storage_stores_by_id&source_site=vercel-docs&relationship=related) — GET /storage/stores/{id} — Get a store
- [create_storage_stores_blob](https://vercel.com/docs/agent-resources/vercel-mcp/tools/storage/create_storage_stores_blob?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage%2Fget_storage_stores_by_id&source_site=vercel-docs&relationship=related) — Use create_storage_stores_blob with Vercel MCP.
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage%2Fget_storage_stores_by_id&source_site=vercel-docs&relationship=related) — DELETE /storage/stores/blob/{id} — Delete a Blob store
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage%2Fget_storage_stores_by_id&source_site=vercel-docs&relationship=related) — Use get_team with Vercel MCP.
- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage%2Fget_storage_stores_by_id&source_site=vercel-docs&relationship=related) — Use get_rolling_release_billing_status with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.graph.md](/docs/agent-resources/vercel-mcp/tools/storage/get_storage_stores_by_id.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fstorage%2Fget_storage_stores_by_id&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter       | Type    | Required | Description           |
| --------------- | ------- | -------- | --------------------- |
| `id`            | string  | Yes      | The storage store ID. |
| `skipMetadata`  | boolean | No       | -                     |
| `includeGuides` | boolean | No       | -                     |
| `teamId`        | string  | No       | Team ID.              |


---

[View full sitemap](/docs/sitemap)
