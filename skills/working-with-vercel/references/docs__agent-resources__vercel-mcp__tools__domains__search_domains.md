---
title: search_domains
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/search_domains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use search_domains with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "6431a32a2997d378af1b770a48fd9f70a95ab15c89de52d2768ab480db4a4ee7"
---

# search_domains

Check availability and registration and renewal prices for one to 200 exact domain names. This lookup does not reserve or purchase domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains) — Use buy_domains with Vercel MCP.
- [Viewing & Searching Domains](https://vercel.com/docs/domains/working-with-domains/view-and-search-domains) — Learn how to view and search all registered domains that are assigned to Vercel Projects through the Vercel dashboard.
- [Get Domain Availability and Pricing](https://vercel.com/docs/rest-api/domains-registrar/get-domain-availability-and-pricing) — POST /v1/registrar/domains/search — Start domain research here. Get registration availability and pricing for 1–200 exac
- [Get availability for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-multiple-domains) — POST /v1/registrar/domains/availability — Get availability for multiple domains. If the domains are available, they can

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/search_domains.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/search_domains.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | Yes      | Request body for this tool.        |

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
