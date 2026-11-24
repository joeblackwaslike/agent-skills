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
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "1b1fabec72d9098a5d80cf882c5a55d22a1c7e7d14dbcf1526e80afab79ed77c"
---

# replace_domain_dns_records

Replace DNS records for a domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [PUT /domains/{domain}/records](https://vercel.com/docs/rest-api/untagged/replacedomainsbydomainrecords) — PUT /domains/{domain}/records — PUT /domains/{domain}/records
- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record) — Use update_record with Vercel MCP.
- [Delete a DNS record](https://vercel.com/docs/rest-api/dns/delete-a-dns-record) — DELETE /v2/domains/{domain}/records/{recordId} — Removes an existing DNS record from a domain name.

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
