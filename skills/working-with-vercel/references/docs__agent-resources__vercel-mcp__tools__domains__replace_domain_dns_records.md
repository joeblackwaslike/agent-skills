---
title: replace_domain_dns_records
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use replace_domain_dns_records with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "88b6e8e57737f7946ff4354e05f7df71220d9e2fe15afe8253a2f43abc9dd804"
---

# replace_domain_dns_records

Replace DNS records for a domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record) — Use update_record with Vercel MCP.
- [create_or_transfer_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain) — Use create_or_transfer_domain with Vercel MCP.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                           |
| ------------- | ------ | -------- | ------------------------------------- |
| `domain`      | string | Yes      | The domain name                       |
| `teamId`      | string | No       | Team ID to use for this operation.    |
| `requestBody` | string | Yes      | DNS records in BIND zone-file format. |


---

[View full sitemap](/docs/sitemap)
