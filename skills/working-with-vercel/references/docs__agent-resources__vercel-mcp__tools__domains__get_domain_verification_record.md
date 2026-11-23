---
title: get_domain_verification_record
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domain_verification_record with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "e6a9b82198147a416dd3286dfd94241e78ba6186ee1bb46ebc76f6756ae3a42b"
---

# get_domain_verification_record

Get the TXT verification record needed to claim ownership of a domain for the authenticated team. The caller must add this TXT record to `_vercel.{domain}` in their DNS configuration, then call POST /domains/:domain/claim to complete the ownership transfer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get Domain Verification Record](https://vercel.com/docs/rest-api/domains/get-domain-verification-record) — GET /v9/domains/{domain}/verification — Get the TXT verification record needed to claim ownership of a domain for the au
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.
- [GET /domains/records/{recordId}](https://vercel.com/docs/rest-api/untagged/getdomainsrecordsbyrecordid) — GET /domains/records/{recordId} — GET /domains/records/{recordId}
- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id) — Use get_domains_records_by_record_id with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`  | string | Yes      | The domain name to get the verification record for          |
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
