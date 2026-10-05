---
title: get_domains_records_by_record_id
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domains_records_by_record_id with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "24f2a43839b9e0585299c1e7b788734d1d0ae76c216114d66d7ec430e44314f8"
---

# get_domains_records_by_record_id

Get a DNS record by ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [replace_domains_by_domain_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domains_by_domain_records?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domains_records_by_record_id&source_site=vercel-docs&relationship=related) — Use replace_domains_by_domain_records with Vercel MCP.
- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domains_records_by_record_id&source_site=vercel-docs&relationship=related) — Use update_record with Vercel MCP.
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domains_records_by_record_id&source_site=vercel-docs&relationship=related) — Use list_domains with Vercel MCP.
- [Get Domain Verification Record](https://vercel.com/docs/rest-api/domains/get-domain-verification-record?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domains_records_by_record_id&source_site=vercel-docs&relationship=related) — GET /v9/domains/{domain}/verification — Get the TXT verification record needed to claim ownership of a domain for the au
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domains_records_by_record_id&source_site=vercel-docs&relationship=related) — Use get_domain_contact_verification with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domains_records_by_record_id&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                     |
| ---------- | ------ | -------- | ------------------------------- |
| `recordId` | string | Yes      | The unique ID of the DNS record |
| `teamId`   | string | No       | Team ID.                        |


---

[View full sitemap](/docs/sitemap)
