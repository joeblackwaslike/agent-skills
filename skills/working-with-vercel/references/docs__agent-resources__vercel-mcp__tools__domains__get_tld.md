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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9e136fe2e835a8784c2d5182445398a968bdd979f98a1d44ba346c3f6eea1590"
---

# get_tld

Get TLD.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_tld_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price) — Use get_tld_price with Vercel MCP.
- [Get TLD](https://vercel.com/docs/rest-api/domains-registrar/get-tld) — GET /v1/registrar/tlds/{tld} — Get the metadata for a specific TLD.
- [list_supported_tlds](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds) — Use list_supported_tlds with Vercel MCP.
- [Get TLD price data](https://vercel.com/docs/rest-api/domains-registrar/get-tld-price-data) — GET /v1/registrar/tlds/{tld}/price — Get price data for a specific TLD. This only reflects base prices for the given TLD
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_tld.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_tld.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `tld`     | string | Yes      | A valid TLD name                   |
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
