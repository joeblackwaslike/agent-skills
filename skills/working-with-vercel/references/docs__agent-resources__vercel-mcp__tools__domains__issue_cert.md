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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/issue_cert.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "222bab8f51ddc0d7a0bc41d64d375ba1d93364a7f5fda022a366728ab0173a54"
---

# issue_cert

Issue a new cert.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Issue a new cert](https://vercel.com/docs/rest-api/certs/issue-a-new-cert) — POST /v8/certs — Issue a new cert
- [get_cert_by_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id) — Use get_cert_by_id with Vercel MCP.
- [list_certs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs) — Use list_certs with Vercel MCP.
- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key) — Use create_kms_signing_key with Vercel MCP.
- [Get cert by id](https://vercel.com/docs/rest-api/certs/get-cert-by-id) — GET /v8/certs/{id} — Get cert by id

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/issue_cert.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/issue_cert.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
