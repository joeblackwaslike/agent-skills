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
source: "https://vercel.com/docs/domains/working-with-domains/view-and-search-domains.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f7b2c6d3c7b83ea2e75e3a59c3265291d224908392ec85d27e9bbe650579debb"
---

# Viewing & Searching Domains

## Viewing domains

To view all your registered domains, open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) in your Vercel dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Search domains on the Vercel dashboard](https://vercel.com/changelog/search-domains-on-the-vercel-dashboard)
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [Programmatic Domain Management](https://vercel.com/docs/domains/registrar-api) — Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints.
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains) — GET /v5/domains — Retrieves a list of domains registered for the authenticated user or team. By default it returns the l
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [Get Domain Availability and Pricing](https://vercel.com/docs/rest-api/domains-registrar/get-domain-availability-and-pricing) — POST /v1/registrar/domains/search — Start domain research here. Get registration availability and pricing for 1–200 exac

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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
