---
title: get_contact_info_schema
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_contact_info_schema
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_contact_info_schema"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_contact_info_schema with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_contact_info_schema.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "407dd225a14266ea4f065bf88a18472e7955843dfb3be45b13a98142f386095c"
---

# get_contact_info_schema

Get contact info schema.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get contact info schema](https://vercel.com/docs/rest-api/domains-registrar/get-contact-info-schema) — GET /v1/registrar/domains/{domain}/contact-info/schema — Some TLDs require additional contact information. Use this endp
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.
- [Get contact verification status for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-contact-verification-status-for-a-domain) — GET /v1/registrar/domains/{domain}/contact-verification — Get the registrant contact verification status for a domain. U
- [get_observability_schema](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_schema) — Use get_observability_schema with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_contact_info_schema.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_contact_info_schema.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `domain`  | string | Yes      | A valid domain name                |
| `teamId`  | string | No       | Team ID to use for this operation. |

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
