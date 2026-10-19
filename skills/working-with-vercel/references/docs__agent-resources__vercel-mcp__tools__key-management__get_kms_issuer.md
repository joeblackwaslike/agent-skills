---
title: get_kms_issuer
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_kms_issuer with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4b09b77b2d43b320a7cfeaf9bb880f61d1d62ee655eb91a4917b7186421e8096"
---

# get_kms_issuer

Get an issuer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer) — Use update_kms_issuer with Vercel MCP.
- [list_kms_issuers](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers) — Use list_kms_issuers with Vercel MCP.
- [create_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer) — Use create_kms_issuer with Vercel MCP.
- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy) — Use create_kms_issuer_policy with Vercel MCP.
- [Get an issuer](https://vercel.com/docs/rest-api/kms/get-an-issuer) — GET /v1/kms/issuers/{issuerId} — Retrieve a single KMS issuer by its ID. Accepts either a team bearer token \\(existing p

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId` | string | Yes      | The ID of the issuer.                                       |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
