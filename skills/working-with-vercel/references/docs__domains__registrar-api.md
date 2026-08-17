---
title: Programmatic Domain Management
product: vercel
url: /docs/domains/registrar-api
canonical_url: "https://vercel.com/docs/domains/registrar-api"
last_updated: 2025-10-08
type: reference
prerequisites:
  - /docs/domains
related:
  []
summary: "Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/registrar-api.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "348761cb19643fa4a5debf2a11d404d1817fb5665217536f99d145a0f1166927"
---

# Programmatic Domain Management

The domains registrar API enables you to programmatically manage your domain lifecycle from search to renewal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get contact verification status for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-contact-verification-status-for-a-domain?from=related)
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains?from=related)
- [Working with Domains](https://vercel.com/docs/domains/working-with-domains?from=related) — Learn how domains work and the options Vercel provides for managing them.
- [Get supported TLDs](https://vercel.com/docs/rest-api/domains-registrar/get-supported-tld-s?from=related)
- [PUT /domains/{domain}/records](https://vercel.com/docs/rest-api/untagged/put-domains-domain-records?from=related)

Full cross-link map for this page: [/docs/domains/registrar-api.graph.md](/docs/domains/registrar-api.graph.md)
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
