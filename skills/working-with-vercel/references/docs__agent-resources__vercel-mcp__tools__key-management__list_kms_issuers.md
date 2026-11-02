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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "dfb93795b01c255b21d1246e51401a9e246fc989feec2037d553a6f51c8465a3"
---

# list_kms_issuers

Retrieve the list of KMS issuers that belong to the authenticated team. The results are paginated.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List issuers](https://vercel.com/docs/rest-api/kms/list-issuers) — GET /v1/kms/issuers — Retrieve the paginated KMS issuers that belong to the authenticated team or organization \\(\\`orgId
- [get_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer) — Use get_kms_issuer with Vercel MCP.
- [Get an issuer](https://vercel.com/docs/rest-api/kms/get-an-issuer) — GET /v1/kms/issuers/{issuerId} — Retrieve a single KMS issuer by its ID. Accepts a team or organization bearer token, or
- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer) — Use update_kms_issuer with Vercel MCP.
- [create_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer) — Use create_kms_issuer with Vercel MCP.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
