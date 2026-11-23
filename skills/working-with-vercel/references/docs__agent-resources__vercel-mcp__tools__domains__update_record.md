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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "919013593dbccbd76e7c94c705f054607d25ed8f79f96ffdf24fe8b04101218d"
---

# update_record

Update an existing DNS record.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [Update an existing DNS record](https://vercel.com/docs/rest-api/dns/update-an-existing-dns-record) — PATCH /v1/domains/records/{recordId} — Updates an existing DNS record for a domain name.
- [replace_domain_dns_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records) — Use replace_domain_dns_records with Vercel MCP.
- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id) — Use get_domains_records_by_record_id with Vercel MCP.
- [Delete a DNS record](https://vercel.com/docs/rest-api/dns/delete-a-dns-record) — DELETE /v2/domains/{domain}/records/{recordId} — Removes an existing DNS record from a domain name.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/update_record.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/update_record.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `recordId`    | string | Yes      | The id of the DNS record                                    |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
