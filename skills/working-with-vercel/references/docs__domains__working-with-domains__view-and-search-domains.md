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
fetched_at: "2026-09-28T10:45:21.491Z"
sha256: "9df06a992d6a1668f4b9201a36a23c4f1de37db4961259fa9d11316cf60cce59"
---

# Viewing & Searching Domains

## Viewing domains

To view all your registered domains, open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) in your Vercel dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Search domains on the Vercel dashboard](https://vercel.com/changelog/search-domains-on-the-vercel-dashboard?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=related)
- [Search and buy domains in the dashboard](https://vercel.com/changelog/search-and-buy-domains-in-the-dashboard?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=related)
- [Programmatic Domain Management](https://vercel.com/docs/domains/registrar-api?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=related) — Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints.
- [vercel domains](https://vercel.com/docs/cli/domains?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=related) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=related) — GET /v5/domains — Retrieves a list of domains registered for the authenticated user or team. By default it returns the l
- [Get Domain Availability and Pricing](https://vercel.com/docs/rest-api/domains-registrar/get-domain-availability-and-pricing?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=related) — POST /v1/registrar/domains/search — Start domain research here. Get registration availability and pricing for 1–200 exac
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.

Full cross-link map for this page: [/docs/domains/working-with-domains/view-and-search-domains.graph.md](/docs/domains/working-with-domains/view-and-search-domains.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fview-and-search-domains&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The domains list will show you all domains that are currently active on your account, and display the following information:

- **Domain** - The domain name
- **Registrar and status** - The domain registrar (Vercel or Third Party). If the registrar is Vercel, you will see the renewal or expiry status of the domain
- **Creator** - The person who created the domain, indicated by their avatar and username and include the creation date

## Searching domains

You can search for a specific domain by using the search bar above the domains list.

It is not possible to search a multi-level wildcard subdomain. It is only possible to search a subdomain at one level down.

![Image](https://vercel.com/docs-assets/static/docs/domains/domains-settings-search-light.png)


---

[View full sitemap](/docs/sitemap)
