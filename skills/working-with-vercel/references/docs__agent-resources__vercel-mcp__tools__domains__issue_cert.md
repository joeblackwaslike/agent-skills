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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "468946375f5c87e092ed85b1defef4cec1e4287619574e82d4b9f3a4b37bd076"
---

# issue_cert

Issue a new cert.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Issue a new cert](https://vercel.com/docs/rest-api/certs/issue-a-new-cert) — POST /v8/certs — Issue a new cert
- [get_cert_by_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id) — Use get_cert_by_id with Vercel MCP.
- [list_certs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs) — Use list_certs with Vercel MCP.
- [Upload a cert](https://vercel.com/docs/rest-api/certs/upload-a-cert) — PUT /v8/certs — Upload a cert
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
