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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "30d9f93016359f6a0b70edcd95e54f53e3a412bc59c63f5ec126584c332b38fb"
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
- [update_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy) — Use update_kms_issuer_policy with Vercel MCP.

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
