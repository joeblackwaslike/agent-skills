---
title: create_record
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/create_record
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_record with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c92c57569ada99e31a8716a5961f0f3df5ef5e26a636be7971cdb1d9a16d10f8"
---

# create_record

Creates a DNS record for a domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record) — Use update_record with Vercel MCP.
- [replace_domain_dns_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records) — Use replace_domain_dns_records with Vercel MCP.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.
- [create_or_transfer_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain) — Use create_or_transfer_domain with Vercel MCP.
- [Create a DNS record](https://vercel.com/docs/rest-api/dns/create-a-dns-record) — POST /v2/domains/{domain}/records — Creates a DNS record for a domain.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/create_record.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/create_record.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`      | string | Yes      | The domain used to create the DNS record.                   |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
