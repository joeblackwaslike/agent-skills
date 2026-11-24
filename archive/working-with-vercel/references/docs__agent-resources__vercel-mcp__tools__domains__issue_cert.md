---
title: issue_cert
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/issue_cert
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/issue_cert"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use issue_cert with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/issue_cert.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "b2c38167f44bc594bc451e5234802b20d1c3baa5b6b046fe30dd73c140180ba4"
---

# issue_cert

Issue a new cert.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Issue a new cert](https://vercel.com/docs/rest-api/certs/issue-a-new-cert) — POST /v8/certs — Issue a new cert
- [Get cert by id](https://vercel.com/docs/rest-api/certs/get-cert-by-id) — GET /v8/certs/{id} — Get cert by id
- [list_certs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs) — Use list_certs with Vercel MCP.
- [get_cert_by_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id) — Use get_cert_by_id with Vercel MCP.
- [Remove cert](https://vercel.com/docs/rest-api/certs/remove-cert) — DELETE /v8/certs/{id} — Remove cert

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/issue_cert.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/issue_cert.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
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
