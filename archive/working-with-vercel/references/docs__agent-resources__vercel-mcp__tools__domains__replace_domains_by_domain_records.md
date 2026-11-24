---
title: replace_domains_by_domain_records
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/replace_domains_by_domain_records
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domains_by_domain_records"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use replace_domains_by_domain_records with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domains_by_domain_records.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "8bcc7e7226b2595c3a9cdb12604872311d4692d5824bc05a23be6d8d589c14cb"
---

# replace_domains_by_domain_records

Replace DNS records for a domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Freplace_domains_by_domain_records&source_site=vercel-docs&relationship=related) — Use get_domains_records_by_record_id with Vercel MCP.
- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Freplace_domains_by_domain_records&source_site=vercel-docs&relationship=related) — Use update_record with Vercel MCP.
- [create_or_transfer_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Freplace_domains_by_domain_records&source_site=vercel-docs&relationship=related) — Use create_or_transfer_domain with Vercel MCP.
- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Freplace_domains_by_domain_records&source_site=vercel-docs&relationship=related) — Use add_project_domain with Vercel MCP.
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Freplace_domains_by_domain_records&source_site=vercel-docs&relationship=related) — Use list_domains with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/replace_domains_by_domain_records.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/replace_domains_by_domain_records.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Freplace_domains_by_domain_records&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                           |
| ------------- | ------ | -------- | ------------------------------------- |
| `domain`      | string | Yes      | The domain name                       |
| `teamId`      | string | No       | Team ID.                              |
| `requestBody` | string | Yes      | DNS records in BIND zone-file format. |


---

[View full sitemap](/docs/sitemap)
