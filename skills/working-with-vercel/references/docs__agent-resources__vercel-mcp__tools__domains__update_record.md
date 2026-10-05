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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "a354060c100194b8f49cd51ba0695f55d3a80b8d1fce0bdffad14028b74e2883"
---

# update_record

Update an existing DNS record.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update an existing DNS record](https://vercel.com/docs/rest-api/dns/update-an-existing-dns-record?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fupdate_record&source_site=vercel-docs&relationship=related) — PATCH /v1/domains/records/{recordId} — Updates an existing DNS record for a domain name.
- [replace_domains_by_domain_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domains_by_domain_records?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fupdate_record&source_site=vercel-docs&relationship=related) — Use replace_domains_by_domain_records with Vercel MCP.
- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fupdate_record&source_site=vercel-docs&relationship=related) — Use get_domains_records_by_record_id with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fupdate_record&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.
- [Delete a DNS record](https://vercel.com/docs/rest-api/dns/delete-a-dns-record?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fupdate_record&source_site=vercel-docs&relationship=related) — DELETE /v2/domains/{domain}/records/{recordId} — Removes an existing DNS record from a domain name.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/update_record.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/update_record.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fupdate_record&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `recordId`    | string | Yes      | The id of the DNS record    |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
