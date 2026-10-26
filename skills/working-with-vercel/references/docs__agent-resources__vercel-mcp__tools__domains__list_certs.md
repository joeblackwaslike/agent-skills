---
title: list_certs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/list_certs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_certs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "318a31e93791b11a73cf46bf34e706e4a03858d168ba5aae85aa630a8d296421"
---

# list_certs

Get certs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get certs](https://vercel.com/docs/rest-api/certs/get-certs) — GET /v8/certs — Get certs
- [vercel certs](https://vercel.com/docs/cli/certs) — Learn how to manage certificates for your domains using the vercel certs CLI command.
- [Get cert by id](https://vercel.com/docs/rest-api/certs/get-cert-by-id) — GET /v8/certs/{id} — Get cert by id
- [issue_cert](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/issue_cert) — Use issue_cert with Vercel MCP.
- [get_cert_by_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id) — Use get_cert_by_id with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/list_certs.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/list_certs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
