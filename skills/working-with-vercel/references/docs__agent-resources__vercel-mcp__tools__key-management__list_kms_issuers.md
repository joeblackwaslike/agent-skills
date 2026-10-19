---
title: list_kms_issuers
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_kms_issuers with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ffa6107e83561085ef7cc45b3ee6146990cbd4afd39df7aba26b0b5e0321e03d"
---

# list_kms_issuers

Retrieve the list of KMS issuers that belong to the authenticated team. The results are paginated.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List issuers](https://vercel.com/docs/rest-api/kms/list-issuers) — GET /v1/kms/issuers — Retrieve the list of KMS issuers that belong to the authenticated team. The results are paginated.
- [get_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer) — Use get_kms_issuer with Vercel MCP.
- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer) — Use update_kms_issuer with Vercel MCP.
- [Get an issuer](https://vercel.com/docs/rest-api/kms/get-an-issuer) — GET /v1/kms/issuers/{issuerId} — Retrieve a single KMS issuer by its ID. Accepts either a team bearer token \\(existing p
- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members) — Use list_access_group_members with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type    | Required | Description                                                    |
| --------- | ------- | -------- | -------------------------------------------------------------- |
| `limit`   | integer | No       | Maximum number of issuers to return. Minimum: 1. Maximum: 100. |
| `next`    | string  | No       | Continuation cursor to retrieve the next page of results.      |
| `teamId`  | string  | No       | Team ID to use for this operation.                             |
| `slug`    | string  | No       | Team slug to use for this operation. Use instead of teamId.    |


---

[View full sitemap](/docs/sitemap)
