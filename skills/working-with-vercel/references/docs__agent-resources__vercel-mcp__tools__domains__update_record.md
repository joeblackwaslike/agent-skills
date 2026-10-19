---
title: update_record
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/update_record
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_record with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "f76f2bbde13a5b63bb5bcb5d1da3a7158a453ce32761ac5afd2cf81341c27229"
---

# update_record

Update an existing DNS record.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [replace_domain_dns_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records) — Use replace_domain_dns_records with Vercel MCP.
- [Update an existing DNS record](https://vercel.com/docs/rest-api/dns/update-an-existing-dns-record) — PATCH /v1/domains/records/{recordId} — Updates an existing DNS record for a domain name.
- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id) — Use get_domains_records_by_record_id with Vercel MCP.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/update_record.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/update_record.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `recordId`    | string | Yes      | The id of the DNS record                                    |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
