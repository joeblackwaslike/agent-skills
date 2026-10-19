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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b079884eb70ef723cec4b170b4d481764b4b08795465f89710c4969d0a09788d"
---

# revoke_kms_signing_key

Revoke a signing key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key) — Use create_kms_signing_key with Vercel MCP.
- [activate_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key) — Use activate_kms_signing_key with Vercel MCP.
- [Revoke a signing key](https://vercel.com/docs/rest-api/kms/revoke-a-signing-key) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/revoke — Immediately revoke a signing key that is already scheduled for rev
- [create_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer) — Use create_kms_issuer with Vercel MCP.
- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer) — Use update_kms_issuer with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                                                        |
| ------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `issuerId`    | string  | Yes      | The ID of the issuer.                                                                              |
| `keyId`       | string  | Yes      | The ID of the signing key to revoke immediately. The key must already be scheduled for revocation. |
| `teamId`      | string  | No       | Team ID to use for this operation.                                                                 |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId.                                        |
| `requestBody` | unknown | No       | Request body for this tool.                                                                        |


---

[View full sitemap](/docs/sitemap)
