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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "60a40d5b04fa43fa932d9560220b44f16f59343f8b49935c009b341ab69290f5"
---

# search_vercel_documentation

Search Vercel documentation for specific topics and information.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Viewing & Searching Domains](https://vercel.com/docs/domains/working-with-domains/view-and-search-domains) — Learn how to view and search all registered domains that are assigned to Vercel Projects through the Vercel dashboard.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [search_repo](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo) — Use search_repo with Vercel MCP.
- [web_fetch_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url) — Use web_fetch_vercel_url with Vercel MCP.
- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                                    |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `topic`   | string | Yes      | -       | Topic to focus the documentation search on (e.g., 'routing', 'data-fetching'). |
| `tokens`  | number | No       | `2500`  | Maximum number of tokens to include in the result.                             |

**Sample prompt:** "How do I configure custom domains in Vercel?"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
