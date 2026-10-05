---
title: get_tld
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_tld
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_tld with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "cd5a68985a2c715aedeab872b8db991df355df2c6c8b7e66f9df849679595812"
---

# get_tld

Get TLD.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_tld_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_tld&source_site=vercel-docs&relationship=related) — Use get_tld_price with Vercel MCP.
- [list_supported_tlds](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_tld&source_site=vercel-docs&relationship=related) — Use list_supported_tlds with Vercel MCP.
- [Get TLD](https://vercel.com/docs/rest-api/domains-registrar/get-tld?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_tld&source_site=vercel-docs&relationship=related) — GET /v1/registrar/tlds/{tld} — Get the metadata for a specific TLD.
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_tld&source_site=vercel-docs&relationship=related) — Use get_team with Vercel MCP.
- [Get TLD price data](https://vercel.com/docs/rest-api/domains-registrar/get-tld-price-data?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_tld&source_site=vercel-docs&relationship=related) — GET /v1/registrar/tlds/{tld}/price — Get price data for a specific TLD. This only reflects base prices for the given TLD

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_tld.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_tld.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_tld&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| `tld`     | string | Yes      | A valid TLD name |
| `teamId`  | string | No       | Team ID.         |


---

[View full sitemap](/docs/sitemap)
