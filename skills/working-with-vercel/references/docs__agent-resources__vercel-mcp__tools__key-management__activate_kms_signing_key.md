---
title: activate_kms_signing_key
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use activate_kms_signing_key with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "530b3d5f425e59bd0741e6e7f2d6d4b7a7521e97259f338c29d6494d6d63bd19"
---

# activate_kms_signing_key

Activate a signing key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Factivate_kms_signing_key&source_site=vercel-docs&relationship=related) — Use create_kms_signing_key with Vercel MCP.
- [revoke_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Factivate_kms_signing_key&source_site=vercel-docs&relationship=related) — Use revoke_kms_signing_key with Vercel MCP.
- [sign_kms_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Factivate_kms_signing_key&source_site=vercel-docs&relationship=related) — Use sign_kms_token with Vercel MCP.
- [sign_kms_message](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_message?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Factivate_kms_signing_key&source_site=vercel-docs&relationship=related) — Use sign_kms_message with Vercel MCP.
- [Activate a signing key](https://vercel.com/docs/rest-api/kms/activate-a-signing-key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Factivate_kms_signing_key&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/activate — Activate a pending signing key so the issuer starts signing with

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Factivate_kms_signing_key&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                    |
| ------------- | ------ | -------- | ---------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                          |
| `keyId`       | string | Yes      | The ID of the pending signing key to activate. |
| `teamId`      | string | No       | Team ID.                                       |
| `slug`        | string | No       | Team slug.                                     |
| `requestBody` | object | No       | Request body for this tool.                    |


---

[View full sitemap](/docs/sitemap)
