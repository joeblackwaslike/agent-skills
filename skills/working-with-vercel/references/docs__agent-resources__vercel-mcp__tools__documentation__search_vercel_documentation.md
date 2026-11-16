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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "536cea9606c97e35b65a145aca1ca2899c44966ba0ab679b3466742702f6d982"
---

# search_vercel_documentation

Search Vercel documentation for specific topics and information.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel docs](https://vercel.com/docs/cli/docs) — Search and read the Vercel docs from your terminal using the Vercel CLI.
- [use_vercel_cli](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli) — Use use_vercel_cli with Vercel MCP.
- [search_repo](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo) — Use search_repo with Vercel MCP.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                                    |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `topic`   | string | Yes      | -       | Topic to focus the documentation search on (e.g., 'routing', 'data-fetching'). |
| `tokens`  | number | No       | `2500`  | Maximum number of tokens to include in the result.                             |

**Sample prompt:** "How do I configure custom domains in Vercel?"

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
