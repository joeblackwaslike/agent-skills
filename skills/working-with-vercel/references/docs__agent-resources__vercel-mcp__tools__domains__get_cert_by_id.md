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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4032a83f48d9eb0d413e7825d3174d97c8d631c5127c3f1f257e503ec9400934"
---

# get_cert_by_id

Read certificate metadata by its ID. The response does not include the private key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get cert by id](https://vercel.com/docs/rest-api/certs/get-cert-by-id) — GET /v8/certs/{id} — Get cert by id
- [issue_cert](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/issue_cert) — Use issue_cert with Vercel MCP.
- [list_certs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs) — Use list_certs with Vercel MCP.
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.
- [Remove cert](https://vercel.com/docs/rest-api/certs/remove-cert) — DELETE /v8/certs/{id} — Remove cert

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_cert_by_id.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The cert id                                                 |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
