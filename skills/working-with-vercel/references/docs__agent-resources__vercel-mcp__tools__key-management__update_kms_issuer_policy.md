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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d85114a6bd1d8fdacf06570abe6187bf906e5e230695ecc1402ebca3f43f3f96"
---

# update_kms_issuer_policy

Update an issuer policy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy) — Use create_kms_issuer_policy with Vercel MCP.
- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer) — Use update_kms_issuer with Vercel MCP.
- [create_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer) — Use create_kms_issuer with Vercel MCP.
- [Update an issuer policy](https://vercel.com/docs/rest-api/kms/update-an-issuer-policy) — PATCH /v1/kms/issuers/{issuerId}/policies/{kind}/{policyKey} — Update an existing KMS issuer policy's environments or to
- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key) — Use create_kms_signing_key with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                       |
| `kind`        | string | Yes      | The issuer policy kind. Value: `"project-grant"`.           |
| `policyKey`   | string | Yes      | The policy identifier.                                      |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
