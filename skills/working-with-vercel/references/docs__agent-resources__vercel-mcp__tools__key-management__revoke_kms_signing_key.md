---
title: revoke_kms_signing_key
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use revoke_kms_signing_key with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "6b9ad6e75ac2317dfd82f8ff4de1340bfd5b18949eee43a8820f1c6fe539d087"
---

# revoke_kms_signing_key

Revoke a signing key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Frevoke_kms_signing_key&source_site=vercel-docs&relationship=related) — Use create_kms_signing_key with Vercel MCP.
- [activate_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Frevoke_kms_signing_key&source_site=vercel-docs&relationship=related) — Use activate_kms_signing_key with Vercel MCP.
- [sign_kms_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Frevoke_kms_signing_key&source_site=vercel-docs&relationship=related) — Use sign_kms_token with Vercel MCP.
- [Revoke a signing key](https://vercel.com/docs/rest-api/kms/revoke-a-signing-key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Frevoke_kms_signing_key&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/revoke — Immediately revoke a signing key that is already scheduled for rev
- [sign_kms_message](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_message?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Frevoke_kms_signing_key&source_site=vercel-docs&relationship=related) — Use sign_kms_message with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Frevoke_kms_signing_key&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                                                        |
| ------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `issuerId`    | string  | Yes      | The ID of the issuer.                                                                              |
| `keyId`       | string  | Yes      | The ID of the signing key to revoke immediately. The key must already be scheduled for revocation. |
| `teamId`      | string  | No       | Team ID.                                                                                           |
| `slug`        | string  | No       | Team slug.                                                                                         |
| `requestBody` | unknown | No       | Request body for this tool.                                                                        |


---

[View full sitemap](/docs/sitemap)
