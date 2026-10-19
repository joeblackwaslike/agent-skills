---
title: create_kms_issuer
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_kms_issuer with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "2d931096c96f44bb91fe7bf73cd6fca12b2e17b7bf7979c618bc4f0ad80122d8"
---

# create_kms_issuer

Create a KMS issuer with server-generated signing keys for your team. Configure its name, signing algorithm, claims schema, and initial policy. MCP does not accept private-key imports.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key) — Use create_kms_signing_key with Vercel MCP.
- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy) — Use create_kms_issuer_policy with Vercel MCP.
- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer) — Use update_kms_issuer with Vercel MCP.
- [activate_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/activate_kms_signing_key) — Use activate_kms_signing_key with Vercel MCP.
- [update_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy) — Use update_kms_issuer_policy with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

Set `requestBody.name` when creating an issuer. You can also supply
`algorithm`, `claimsSchema`, and an initial `policy` inside `requestBody`.
The API generates the signing key. Do not send a PEM key or either import field.


---

[View full sitemap](/docs/sitemap)
