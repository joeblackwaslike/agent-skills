---
title: Programmatic Domain Management
product: vercel
url: /docs/domains/registrar-api
canonical_url: "https://vercel.com/docs/domains/registrar-api"
last_updated: 2026-09-22
type: reference
prerequisites:
  - /docs/domains
related:
  - /docs/rest-api/domains-registrar/get-domain-availability-and-pricing
  - /docs/rest-api/domains-registrar/get-supported-tlds
  - /docs/rest-api/domains-registrar/get-tld-price-data
  - /docs/rest-api/domains-registrar/get-price-data-for-a-domain
  - /docs/rest-api/domains-registrar/get-availability-for-a-domain
summary: "Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/registrar-api.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "2236e90e94fa11b42ef76c88340964bcf2b49abee8e9ca06ae61d654faaa244f"
---

# Programmatic Domain Management

The domains registrar API enables you to programmatically manage your domain lifecycle from search to renewal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [New Domains Registrar API for domain search, pricing, purchase, and management](https://vercel.com/changelog/new-domains-registrar-api-for-domain-search-pricing-purchase-and-management)
- [Get price data for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-multiple-domains) — POST /v1/registrar/domains/price — Get price data for multiple domains in a single request.
- [Get contact verification status for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-contact-verification-status-for-a-domain) — GET /v1/registrar/domains/{domain}/contact-verification — Get the registrant contact verification status for a domain. U

Full cross-link map for this page: [/docs/domains/registrar-api.graph.md](/docs/domains/registrar-api.graph.md)
<!-- /docsgraph:related -->

## Getting started with the API

You can search domains, check pricing and availability, and browse supported top-level domains (TLDs) without an account or access token.

### Search for domains

Start domain discovery with the [search endpoint](/docs/rest-api/domains-registrar/get-domain-availability-and-pricing). It returns availability and pricing together, so you don't need separate requests for each.

Send 1 to 200 exact domain names to `POST /v1/registrar/domains/search`. The endpoint returns results in input order, including registration and renewal prices in USD for available domains. It checks the names you provide rather than generating suggestions.

For example, compare candidate domains without authentication:

```bash filename="terminal"
curl --request POST \
  --url https://api.vercel.com/v1/registrar/domains/search \
  --header 'Content-Type: application/json' \
  --data '{"domains":["example.com","example.dev","example.app"]}'
```

### Catalog & pricing

Use these public endpoints when you need the TLD catalog or pricing on its own:

- [List all supported TLDs](/docs/rest-api/domains-registrar/get-supported-tlds)
- [Get pricing for specific TLDs](/docs/rest-api/domains-registrar/get-tld-price-data)
- [Retrieve per-domain pricing information](/docs/rest-api/domains-registrar/get-price-data-for-a-domain)

### Availability

Use these public endpoints when you only need availability:

- [Check single domain availability](/docs/rest-api/domains-registrar/get-availability-for-a-domain)
- [Perform bulk availability checks for multiple domains](/docs/rest-api/domains-registrar/get-availability-for-multiple-domains)

### Contact information requirements

You can [fetch TLD-specific contact information schemas](/docs/rest-api/domains-registrar/get-contact-info-schema) without authentication before purchasing or transferring a domain.

## Authenticated operations

Purchases, order status, transfers, renewals, and nameserver updates require an access token.

### Authentication

[Create an access token](/docs/rest-api#creating-an-access-token), then pass it to the [Vercel SDK](/docs/rest-api/sdk) as `bearerToken` or include it in the `Authorization` header when calling an endpoint directly.

For example, retrieve an existing order by replacing `<order-id>` and `<token>` with your order ID and access token:

```bash filename="terminal"
curl --request GET \
  --url 'https://api.vercel.com/v1/registrar/orders/<order-id>' \
  --header 'Authorization: Bearer <token>'
```

### Orders & purchases

- [Purchase a domain](/docs/rest-api/domains-registrar/buy-a-domain)
- [Execute bulk domain purchases](/docs/rest-api/domains-registrar/buy-multiple-domains)
- [Fetch order status by ID](/docs/rest-api/domains-registrar/get-a-domain-order)

### Transfers

- [Retrieve authorization codes for domain transfers](/docs/rest-api/domains-registrar/get-the-auth-code-for-a-domain)
- [Initiate domain transfers to Vercel](/docs/rest-api/domains-registrar/transfer-in-a-domain)
- [Track transfer status and completion](/docs/rest-api/domains-registrar/get-a-domain-s-transfer-status)

### Management

- [Renew domains before expiration](/docs/rest-api/domains-registrar/renew-a-domain)
- [Enable or disable automatic renewal](/docs/rest-api/domains-registrar/update-auto-renew-for-a-domain)
- [Update nameserver configurations](/docs/rest-api/domains-registrar/update-nameservers-for-a-domain)

## Deprecations and migration

The following legacy domains API operations were deprecated and have since been sunset. Use their Domains Registrar replacements instead:

- [Purchase a domain](/docs/rest-api/domains-registrar/buy-a-domain)
- [Check the price for a domain](/docs/rest-api/domains-registrar/get-price-data-for-a-domain)
- [Check a Domain Availability](/docs/rest-api/domains-registrar/get-availability-for-a-domain)
- [Get domain transfer info](/docs/rest-api/domains-registrar/get-a-domain-s-transfer-status)

If you are currently using the Vercel CLI for domain purchases, pricing, or availability, upgrade to CLI version `48.2.8` or later.


---

[View full sitemap](/docs/sitemap)
