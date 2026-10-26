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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "3d10012a88e512e6f8ecc3697068091cb66b73d4dae2567e8c4300ad3d69a5ad"
---

# get_tld

Get TLD.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_tld_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price) — Use get_tld_price with Vercel MCP.
- [Get TLD](https://vercel.com/docs/rest-api/domains-registrar/get-tld) — GET /v1/registrar/tlds/{tld} — Get the metadata for a specific TLD.
- [list_supported_tlds](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds) — Use list_supported_tlds with Vercel MCP.
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.
- [Get TLD price data](https://vercel.com/docs/rest-api/domains-registrar/get-tld-price-data) — GET /v1/registrar/tlds/{tld}/price — Get price data for a specific TLD. This only reflects base prices for the given TLD

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_tld.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_tld.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `tld`     | string | Yes      | A valid TLD name                   |
| `teamId`  | string | No       | Team ID to use for this operation. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
