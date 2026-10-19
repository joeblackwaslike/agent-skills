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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "bc7e00766feecb9b5bde3afd31e99f186a50c519f06c8fb7ed1de83ce5657a3b"
---

# get_domain_verification_record

Get the TXT verification record needed to claim ownership of a domain for the authenticated team. The caller must add this TXT record to `_vercel.{domain}` in their DNS configuration, then call POST /domains/:domain/claim to complete the ownership transfer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get Domain Verification Record](https://vercel.com/docs/rest-api/domains/get-domain-verification-record) — GET /v9/domains/{domain}/verification — Get the TXT verification record needed to claim ownership of a domain for the au
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.
- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [get_domains_records_by_record_id](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domains_records_by_record_id) — Use get_domains_records_by_record_id with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`  | string | Yes      | The domain name to get the verification record for          |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
