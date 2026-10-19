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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a37deda7d6cecefc7a2e1d6c7a20d6dd8d71d13dc4016814fb293286bd765836"
---

# get_domain_availability

Check whether a domain is available to register.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_bulk_availability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_availability) — Use get_bulk_availability with Vercel MCP.
- [check_domain_availability_and_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price) — Use check_domain_availability_and_price with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [Get availability for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-a-domain) — GET /v1/registrar/domains/{domain}/availability — Get availability for a specific domain. If the domain is available, it

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `domain`  | string | Yes      | A valid domain name                |
| `teamId`  | string | No       | Team ID to use for this operation. |


---

[View full sitemap](/docs/sitemap)
