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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_records.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "9ef3b69f7bc9f04481c9784b3d4b21d687c6c4570cffce80ad5a93eb573e9c13"
---

# get_records

Retrieves a list of DNS records created for a domain name. By default it returns 20 records if no limit is provided. The rest can be retrieved using the pagination options.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [GET /domains/records/{recordId}](https://vercel.com/docs/rest-api/untagged/getdomainsrecordsbyrecordid) — GET /domains/records/{recordId} — GET /domains/records/{recordId}
- [List existing DNS records](https://vercel.com/docs/rest-api/dns/list-existing-dns-records) — GET /v5/domains/{domain}/records — Retrieves a list of DNS records created for a domain name. By default it returns 20 r
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id) — Use get_domains_records_by_record_id with Vercel MCP.
- [PUT /domains/{domain}/records](https://vercel.com/docs/rest-api/untagged/replacedomainsbydomainrecords) — PUT /domains/{domain}/records — PUT /domains/{domain}/records

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
