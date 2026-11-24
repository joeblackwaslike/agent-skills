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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "fd5b782d7ab7051ea43a4f3188984c064e296f447c4adcf3897978f5c70c5f39"
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
- [Delete an issuer policy](https://vercel.com/docs/rest-api/kms/delete-an-issuer-policy) — DELETE /v1/kms/issuers/{issuerId}/policies/{kind}/{policyKey} — Remove a policy from a KMS issuer.

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
