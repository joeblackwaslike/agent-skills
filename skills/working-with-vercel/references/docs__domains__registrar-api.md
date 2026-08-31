---
title: Programmatic Domain Management
product: vercel
url: /docs/domains/registrar-api
canonical_url: "https://vercel.com/docs/domains/registrar-api"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/domains
related:
  []
summary: "Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/registrar-api.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "7767f1bfececfa311e3e27f3fd811ce243bce18e22abee2dc174a8e8239087d2"
---

# Programmatic Domain Management

The domains registrar API enables you to programmatically manage your domain lifecycle from search to renewal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [New Domains Registrar API for domain search, pricing, purchase, and management](https://vercel.com/changelog/new-domains-registrar-api-for-domain-search-pricing-purchase-and-management?from=related&source_path=%2Fdocs%2Fdomains%2Fregistrar-api&source_site=vercel-docs&relationship=related)
- [Get contact verification status for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-contact-verification-status-for-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fregistrar-api&source_site=vercel-docs&relationship=related) — GET /v1/registrar/domains/{domain}/contact-verification — Get the registrant contact verification status for a domain. U
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fregistrar-api&source_site=vercel-docs&relationship=related) — GET /v5/domains — Retrieves a list of domains registered for the authenticated user or team. By default it returns the l
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fdomains%2Fregistrar-api&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/domains/registrar-api.graph.md](/docs/domains/registrar-api.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fregistrar-api&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Getting started with the API

You can start using the REST API by:

1. [Creating a token](https://vercel.com/docs/rest-api#creating-an-access-token)
2. Using the token in either of the following ways:

   - Use the [Vercel SDK](https://vercel.com/docs/rest-api/sdk)

   In the following example, use the Vercel SDK to get the supported TLDs.

   ```ts filename="index.ts"
   import { Vercel } from '@vercel/sdk';

   const vercel = new Vercel({
     bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
   });

   const result = await vercel.domainsRegistrar.getSupportedTlds();
   ```

   - Use the language of your choice by calling the endpoints directly and providing your token.

   In the following example, we use `cURL` to get the supported TLDs.

   ```bash filename="terminal"
   curl --request GET \
     --url https://api.vercel.com/v1/registrar/tlds/supported \
     --header 'Authorization: Bearer <token>'
   ```

You can use the domains registrar API to do the following:

### Catalog & pricing

- [List all supported top-level domains (TLDs)](https://vercel.com/docs/rest-api/domains-registrar/get-supported-tlds)
- [Get pricing for specific TLDs](https://vercel.com/docs/rest-api/domains-registrar/get-tld-price-data)
- [Retrieve per-domain pricing information](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-a-domain)

### Availability

- [Check single domain availability](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-a-domain)
- [Perform bulk availability checks for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-multiple-domains)

### Orders & purchases

- [Purchase a domain](https://vercel.com/docs/rest-api/domains-registrar/buy-a-domain)
- [Execute bulk domain purchases](https://vercel.com/docs/rest-api/domains-registrar/buy-multiple-domains)
- [Fetch order status by ID](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-order)

### Transfers

- [Retrieve authorization codes for domain transfers](https://vercel.com/docs/rest-api/domains-registrar/get-the-auth-code-for-a-domain)
- [Initiate domain transfers to Vercel](https://vercel.com/docs/rest-api/domains-registrar/transfer-in-a-domain)
- [Track transfer status and completion](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-s-transfer-status)

### Management

- [Renew domains before expiration](https://vercel.com/docs/rest-api/domains-registrar/renew-a-domain)
- [Enable or disable automatic renewal](https://vercel.com/docs/rest-api/domains-registrar/update-auto-renew-for-a-domain)
- [Update nameserver configurations](https://vercel.com/docs/rest-api/domains-registrar/update-nameservers-for-a-domain)
- [Fetch TLD-specific contact information schemas](https://vercel.com/docs/rest-api/domains-registrar/get-contact-info-schema)

## Deprecations and migration

The following legacy domains API operations were deprecated and have since been sunset. Use their Domains Registrar replacements instead:

- [Purchase a domain](https://vercel.com/docs/rest-api/domains-registrar/buy-a-domain)
- [Check the price for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-a-domain)
- [Check a Domain Availability](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-a-domain)
- [Get domain transfer info](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-s-transfer-status)

If you are currently using the Vercel CLI for domain purchases, pricing, or availability, upgrade to CLI version `48.2.8` or later.


---

[View full sitemap](/docs/sitemap)
