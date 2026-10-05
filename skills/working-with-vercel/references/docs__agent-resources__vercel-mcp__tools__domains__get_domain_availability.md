---
title: get_domain_availability
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domain_availability with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "439ec3003e58b2084892161fb6772168ac3fffe9f094aa076d162567b50ed7f8"
---

# get_domain_availability

Check whether a domain is available to register.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_bulk_availability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_availability?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_availability&source_site=vercel-docs&relationship=related) — Use get_bulk_availability with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_availability&source_site=vercel-docs&relationship=related) — Use get_domain_contact_verification with Vercel MCP.
- [Get availability for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-a-domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_availability&source_site=vercel-docs&relationship=related) — GET /v1/registrar/domains/{domain}/availability — Get availability for a specific domain. If the domain is available, it
- [Get availability for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-multiple-domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_availability&source_site=vercel-docs&relationship=related) — POST /v1/registrar/domains/availability — Get availability for multiple domains. If the domains are available, they can
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_availability&source_site=vercel-docs&relationship=related) — Use get_domain_price with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_availability&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| `domain`  | string | Yes      | A valid domain name |
| `teamId`  | string | No       | Team ID.            |


---

[View full sitemap](/docs/sitemap)
