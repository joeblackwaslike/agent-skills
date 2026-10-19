---
title: check_domain_availability_and_price
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use check_domain_availability_and_price with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "7fda706583e808522fdfbde5a1a5b4a1085b4d9fab786ac38a52da24fbbe538a"
---

# check_domain_availability_and_price

Check if domain names are available for purchase and get pricing information


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_availability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability) — Use get_domain_availability with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [Get Domain Availability and Pricing](https://vercel.com/docs/rest-api/domains-registrar/get-domain-availability-and-pricing) — POST /v1/registrar/domains/search — Start domain research here. Get registration availability and pricing for 1–200 exac
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains) — Use buy_domains with Vercel MCP.
- [Get availability for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-a-domain) — GET /v1/registrar/domains/{domain}/availability — Get availability for a specific domain. If the domain is available, it

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type             | Required | Default | Description                                                                         |
| --------- | ---------------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| `names`   | Array\<string> | Yes      | -       | Array of domain names to check availability for (e.g., \["example.com", "test.org"]) |


---

[View full sitemap](/docs/sitemap)
