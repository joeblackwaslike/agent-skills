---
title: update_kms_issuer_policy
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_kms_issuer_policy with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0a1625aec8792a64b06bdb14811785e10a0d64b59306a78c53992af5bb851db8"
---

# update_kms_issuer_policy

Update an issuer policy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fupdate_kms_issuer_policy&source_site=vercel-docs&relationship=related) — Use update_kms_issuer with Vercel MCP.
- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fupdate_kms_issuer_policy&source_site=vercel-docs&relationship=related) — Use create_kms_issuer_policy with Vercel MCP.
- [Update an issuer policy](https://vercel.com/docs/rest-api/kms/update-an-issuer-policy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fupdate_kms_issuer_policy&source_site=vercel-docs&relationship=related) — PATCH /v1/kms/issuers/{issuerId}/policies/{kind}/{policyKey} — Update an existing KMS issuer policy's environments or to
- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fupdate_kms_issuer_policy&source_site=vercel-docs&relationship=related) — Use create_kms_signing_key with Vercel MCP.
- [get_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fupdate_kms_issuer_policy&source_site=vercel-docs&relationship=related) — Use get_kms_issuer with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fupdate_kms_issuer_policy&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                |
| ------------- | ------ | -------- | ---------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                      |
| `kind`        | string | Yes      | The issuer policy kind. Allowed values: `"project-grant"`. |
| `policyKey`   | string | Yes      | The policy identifier.                                     |
| `teamId`      | string | No       | Team ID.                                                   |
| `slug`        | string | No       | Team slug.                                                 |
| `requestBody` | object | No       | Request body for this tool.                                |


---

[View full sitemap](/docs/sitemap)
