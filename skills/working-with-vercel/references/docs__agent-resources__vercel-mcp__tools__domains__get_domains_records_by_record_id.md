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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "d2fa520f96fc192e4da80318ceffbacc2c2ea9e03917572d7cf778db7490ab71"
---

# get_domains_records_by_record_id

Get a DNS record by ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [GET /domains/records/{recordId}](https://vercel.com/docs/rest-api/untagged/getdomainsrecordsbyrecordid) — GET /domains/records/{recordId} — GET /domains/records/{recordId}
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.
- [get_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_records) — Use get_records with Vercel MCP.
- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [update_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/update_record) — Use update_record with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                        |
| ---------- | ------ | -------- | ---------------------------------- |
| `recordId` | string | Yes      | The unique ID of the DNS record    |
| `teamId`   | string | No       | Team ID to use for this operation. |

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
