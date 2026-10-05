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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "8b2156ae3c7522cd6a32769977dfcd42f9838134312ed593f7819df5a2b3a034"
---

# get_kms_issuer

Get an issuer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fget_kms_issuer&source_site=vercel-docs&relationship=related) — Use update_kms_issuer with Vercel MCP.
- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fget_kms_issuer&source_site=vercel-docs&relationship=related) — Use create_kms_issuer_policy with Vercel MCP.
- [Get an issuer](https://vercel.com/docs/rest-api/kms/get-an-issuer?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fget_kms_issuer&source_site=vercel-docs&relationship=related) — GET /v1/kms/issuers/{issuerId} — Retrieve a single KMS issuer by its ID. Accepts either a team bearer token \\(existing p
- [update_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fget_kms_issuer&source_site=vercel-docs&relationship=related) — Use update_kms_issuer_policy with Vercel MCP.
- [sign_kms_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fget_kms_issuer&source_site=vercel-docs&relationship=related) — Use sign_kms_token with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fget_kms_issuer&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description           |
| ---------- | ------ | -------- | --------------------- |
| `issuerId` | string | Yes      | The ID of the issuer. |
| `teamId`   | string | No       | Team ID.              |
| `slug`     | string | No       | Team slug.            |


---

[View full sitemap](/docs/sitemap)
