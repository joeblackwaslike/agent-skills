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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "62e821e582d01605e247495d03b9998ac12db26a9156fac226be24d1b0a3ccd4"
---

# replace_domain_dns_records

Replace DNS records for a domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record) — Use update_record with Vercel MCP.
- [Delete a DNS record](https://vercel.com/docs/rest-api/dns/delete-a-dns-record) — DELETE /v2/domains/{domain}/records/{recordId} — Removes an existing DNS record from a domain name.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/replace_domain_dns_records.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                           |
| ------------- | ------ | -------- | ------------------------------------- |
| `domain`      | string | Yes      | The domain name                       |
| `teamId`      | string | No       | Team ID to use for this operation.    |
| `requestBody` | string | Yes      | DNS records in BIND zone-file format. |

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
