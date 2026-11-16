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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "f8d018bb70ba68b2571968064b6db1854577df2e53c5c3294d39e0418dfa4b13"
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
- [Update an issuer](https://vercel.com/docs/rest-api/kms/update-an-issuer) — PATCH /v1/kms/issuers/{issuerId} — Update a KMS issuer's name or claims schema.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type    | Required | Description                                                    |
| --------- | ------- | -------- | -------------------------------------------------------------- |
| `limit`   | integer | No       | Maximum number of issuers to return. Minimum: 1. Maximum: 100. |
| `next`    | string  | No       | Continuation cursor to retrieve the next page of results.      |
| `teamId`  | string  | No       | Team ID to use for this operation.                             |
| `slug`    | string  | No       | Team slug to use for this operation. Use instead of teamId.    |

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
