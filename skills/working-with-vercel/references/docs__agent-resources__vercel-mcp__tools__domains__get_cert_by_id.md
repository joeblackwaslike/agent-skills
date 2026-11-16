---
title: get_cert_by_id
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_cert_by_id with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "2af11ee726291bf4f5bffdafe14826975b367b0f571296e46ca911012b967b64"
---

# get_cert_by_id

Read certificate metadata by its ID. The response does not include the private key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get cert by id](https://vercel.com/docs/rest-api/certs/get-cert-by-id) — GET /v8/certs/{id} — Get cert by id
- [issue_cert](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/issue_cert) — Use issue_cert with Vercel MCP.
- [list_certs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs) — Use list_certs with Vercel MCP.
- [Remove cert](https://vercel.com/docs/rest-api/certs/remove-cert) — DELETE /v8/certs/{id} — Remove cert
- [Get certs](https://vercel.com/docs/rest-api/certs/get-certs) — GET /v8/certs — Get certs

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The cert id                                                 |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
