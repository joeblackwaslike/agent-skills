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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "433ed1aabc80fd161bdc2da246cb394a8b37d05c8dca0eb2972849a795191aa7"
---

# activate_kms_signing_key

Activate a signing key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key) — Use create_kms_signing_key with Vercel MCP.
- [revoke_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key) — Use revoke_kms_signing_key with Vercel MCP.
- [create_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer) — Use create_kms_issuer with Vercel MCP.
- [Activate a signing key](https://vercel.com/docs/rest-api/kms/activate-a-signing-key) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/activate — Activate a pending signing key so the issuer starts signing with
- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy) — Use create_kms_issuer_policy with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                       |
| `keyId`       | string | Yes      | The ID of the pending signing key to activate.              |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
