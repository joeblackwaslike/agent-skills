---
title: Viewing & Searching Domains
product: vercel
url: /docs/domains/working-with-domains/view-and-search-domains
canonical_url: "https://vercel.com/docs/domains/working-with-domains/view-and-search-domains"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  []
summary: Learn how to view and search all registered domains that are assigned to Vercel Projects through the Vercel dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/domains/working-with-domains/view-and-search-domains.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4f988de7c30857839f5efdfde85f3d0935f378b96d9523e60a484123afbb3ce6"
---

# Viewing & Searching Domains

## Viewing domains

To view all your registered domains, open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) in your Vercel dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains) — GET /v5/domains — Retrieves a list of domains registered for the authenticated user or team. By default it returns the l
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [list_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains) — Use list_project_domains with Vercel MCP.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.

Full cross-link map for this page: [/docs/domains/working-with-domains/view-and-search-domains.graph.md](/docs/domains/working-with-domains/view-and-search-domains.graph.md)
<!-- /docsgraph:related -->

The domains list will show you all domains that are currently active on your account, and display the following information:

- **Domain** - The domain name
- **Registrar and status** - The domain registrar (Vercel or Third Party). If the registrar is Vercel, you will see the renewal or expiry status of the domain
- **Creator** - The person who created the domain, indicated by their avatar and username and include the creation date

## Searching domains

You can search for a specific domain by using the search bar above the domains list.

It is not possible to search a multi-level wildcard subdomain. It is only possible to search a subdomain at one level down.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/domains/domains-settings-search-light.png)

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
