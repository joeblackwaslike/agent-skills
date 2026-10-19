---
title: search_vercel_documentation
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/documentation
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use search_vercel_documentation with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4f3b9ebffe4e20b8262e2f2c0d5de3a07c074cdb789a56a9fd29853341315f84"
---

# search_vercel_documentation

Search Vercel documentation for specific topics and information.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Viewing & Searching Domains](https://vercel.com/docs/domains/working-with-domains/view-and-search-domains) — Learn how to view and search all registered domains that are assigned to Vercel Projects through the Vercel dashboard.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [search_repo](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo) — Use search_repo with Vercel MCP.
- [use_vercel_cli](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli) — Use use_vercel_cli with Vercel MCP.
- [web_fetch_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url) — Use web_fetch_vercel_url with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                                    |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `topic`   | string | Yes      | -       | Topic to focus the documentation search on (e.g., 'routing', 'data-fetching'). |
| `tokens`  | number | No       | `2500`  | Maximum number of tokens to include in the result.                             |

**Sample prompt:** "How do I configure custom domains in Vercel?"


---

[View full sitemap](/docs/sitemap)
