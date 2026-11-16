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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "427f5b4461188fb041f5143bdfa548942fbf8dbc31a0c146715d83a95e3f661b"
---

# check_domain_availability_and_price

Check if domain names are available for purchase and get pricing information


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_availability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability) — Use get_domain_availability with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [Get Domain Availability and Pricing](https://vercel.com/docs/rest-api/domains-registrar/get-domain-availability-and-pricing) — POST /v1/registrar/domains/search — Start domain research here. Get registration availability and pricing for 1–200 exac
- [Get availability for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-a-domain) — GET /v1/registrar/domains/{domain}/availability — Get availability for a specific domain. If the domain is available, it
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains) — Use buy_domains with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type             | Required | Default | Description                                                                         |
| --------- | ---------------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| `names`   | Array\<string> | Yes      | -       | Array of domain names to check availability for (e.g., \["example.com", "test.org"]) |

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
