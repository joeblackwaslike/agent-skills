---
title: sign_kms_message
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_message
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_message"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use sign_kms_message with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_message.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "969f7b95a073cd60a6c01142ca46aa5183cde62c5c7600726df8ec801b836887"
---

# sign_kms_message

Sign a message.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [sign_kms_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fsign_kms_message&source_site=vercel-docs&relationship=related) — Use sign_kms_token with Vercel MCP.
- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fsign_kms_message&source_site=vercel-docs&relationship=related) — Use create_kms_signing_key with Vercel MCP.
- [activate_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fsign_kms_message&source_site=vercel-docs&relationship=related) — Use activate_kms_signing_key with Vercel MCP.
- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fsign_kms_message&source_site=vercel-docs&relationship=related) — Use create_kms_issuer_policy with Vercel MCP.
- [revoke_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/revoke_kms_signing_key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fsign_kms_message&source_site=vercel-docs&relationship=related) — Use revoke_kms_signing_key with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_message.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/sign_kms_message.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management%2Fsign_kms_message&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.       |
| `requestBody` | object | No       | Request body for this tool. |
| `teamId`      | string | No       | Team ID.                    |


---

[View full sitemap](/docs/sitemap)
