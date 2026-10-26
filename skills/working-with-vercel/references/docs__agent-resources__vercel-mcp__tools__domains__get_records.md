---
title: get_records
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_records
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_records"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_records with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_records.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6b55f19c870b7b8605fbd3f64e2ccd7bcd3a9b614c64baedb9bdd420ee1c861a"
---

# get_records

Retrieves a list of DNS records created for a domain name. By default it returns 20 records if no limit is provided. The rest can be retrieved using the pagination options.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [get_domain_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains) — Use get_domain_project_domains with Vercel MCP.
- [List existing DNS records](https://vercel.com/docs/rest-api/dns/list-existing-dns-records) — GET /v5/domains/{domain}/records — Retrieves a list of DNS records created for a domain name. By default it returns 20 r
- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id) — Use get_domains_records_by_record_id with Vercel MCP.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_records.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_records.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`  | string | Yes      | The domain name.                                            |
| `limit`   | string | No       | Maximum number of records to list from a request.           |
| `since`   | string | No       | Get records created after this JavaScript timestamp.        |
| `until`   | string | No       | Get records created before this JavaScript timestamp.       |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
