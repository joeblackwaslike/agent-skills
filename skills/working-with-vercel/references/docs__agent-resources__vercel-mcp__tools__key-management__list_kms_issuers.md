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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "85cc4b2dd6dfa5a3f2390a7c035dbe254713b42d0f417348e9f3ad1d0ca318c1"
---

# list_kms_issuers

Retrieve the list of KMS issuers that belong to the authenticated team. The results are paginated.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List issuers](https://vercel.com/docs/rest-api/kms/list-issuers) — GET /v1/kms/issuers — Retrieve the list of KMS issuers that belong to the authenticated team. The results are paginated.
- [get_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer) — Use get_kms_issuer with Vercel MCP.
- [Get an issuer](https://vercel.com/docs/rest-api/kms/get-an-issuer) — GET /v1/kms/issuers/{issuerId} — Retrieve a single KMS issuer by its ID. Accepts either a team bearer token \\(existing p
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
