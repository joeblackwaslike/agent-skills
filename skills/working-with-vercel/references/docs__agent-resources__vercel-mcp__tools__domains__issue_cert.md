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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "89e1bf2e69dbd1c3ba62efc30c3c11b8dd2ad8076799c1d117818d4221cd1bfe"
---

# issue_cert

Issue a new cert.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Issue a new cert](https://vercel.com/docs/rest-api/certs/issue-a-new-cert) — POST /v8/certs — Issue a new cert
- [get_cert_by_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id) — Use get_cert_by_id with Vercel MCP.
- [list_certs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs) — Use list_certs with Vercel MCP.
- [Get cert by id](https://vercel.com/docs/rest-api/certs/get-cert-by-id) — GET /v8/certs/{id} — Get cert by id
- [Upload a cert](https://vercel.com/docs/rest-api/certs/upload-a-cert) — PUT /v8/certs — Upload a cert

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
