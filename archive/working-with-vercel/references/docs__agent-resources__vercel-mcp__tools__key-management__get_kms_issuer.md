---
title: get_kms_issuer
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/key-management
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_kms_issuer with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3638e898d47f9c7d2b1046cb9f4b448073aca4091f583267a6a54cd2951e2ce1"
---

# get_kms_issuer

Get an issuer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer) — Use update_kms_issuer with Vercel MCP.
- [list_kms_issuers](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/list_kms_issuers) — Use list_kms_issuers with Vercel MCP.
- [create_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer) — Use create_kms_issuer with Vercel MCP.
- [create_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer_policy) — Use create_kms_issuer_policy with Vercel MCP.
- [Delete an issuer](https://vercel.com/docs/rest-api/kms/delete-an-issuer) — DELETE /v1/kms/issuers/{issuerId} — Delete a KMS issuer and its signing keys.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management/get_kms_issuer.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId` | string | Yes      | The ID of the issuer.                                       |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
