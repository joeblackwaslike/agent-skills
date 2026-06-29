---
title: Limits
product: vercel
url: /docs/platforms/multi-tenant-platforms/limits
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/limits"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/projects/domains/working-with-nameservers
  - /docs/domains/custom-SSL-certificate
  - /docs/rest-api
summary: Learn about limits on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/limits.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "e33681b19ddd14abc644d2e9d0a9d06c9d3914c82521042a62d84835e63a04e7"
---

# Multi-tenant Limits

This page provides an overview of the limits and feature availability for Vercel for Platforms across different plan types.

## Feature availability

| Feature                                                                 | Hobby                                                                                    | Pro                                                                                      | Enterprise                                                                                   |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Compute                        |  Included    |  Included    |  Included        |
| Firewall                       |  Included    |  Included    |  Included        |
| WAF (Web Application Firewall) |  Included    |  Included    |  Included        |
| Custom Domains                 |  50          |  Unlimited\* |  Unlimited\*     |
| Multi-tenant preview URLs      |  Enterprise only |  Enterprise only |  Enterprise only |
| Custom SSL certificates        |  Enterprise only |  Enterprise only |  Enterprise only |

- To prevent abuse, Vercel implements soft limits of 100,000 domains per project for the Pro plan and 1,000,000 domains for the Enterprise plan. These limits are flexible and can be increased upon request. If you need more domains, please [contact our support team](/help) for assistance.

### Wildcard domains

- **All plans**: Support for wildcard domains (e.g., `*.acme.com`)
- **Requirement**: Must use [Vercel's nameservers](/docs/projects/domains/working-with-nameservers) for wildcard SSL certificate generation

### Custom domains

- **All plans**: Unlimited custom domains per project
- **SSL certificates**: Automatically issued for all verified domains
- **Verification**: Required for domains already in use on Vercel

## Multi-tenant preview URLs

Multi-tenant preview URLs are available exclusively for **Enterprise** customers. This feature allows you to:

- Generate unique preview URLs for each tenant during development
- Test changes for specific tenants before deploying to production
- Use dynamic subdomains like `tenant1---project-name-git-branch.yourdomain.dev`

To enable this feature, Enterprise customers should contact their Vercel account representative.

## Custom SSL certificates

Custom SSL certificates are available exclusively for **Enterprise** customers. This feature allows you to:

- Upload your own SSL certificates for tenant domains
- Maintain complete control over certificate management
- Meet specific compliance or security requirements

Learn more about [custom SSL certificates](/docs/domains/custom-SSL-certificate).

## Rate limits

Domain management operations through the Vercel API are subject to standard [API rate limits](/docs/rest-api#rate-limits):

- **Domain addition**: 100 requests per hour per team
- **Domain verification**: 50 requests per hour per team
- **Domain removal**: 100 requests per hour per team

## DNS propagation

After configuring domains or nameservers, DNS typically takes 24-48 hours to propagate globally. Use tools like [WhatsMyDNS](https://www.whatsmydns.net/) to check propagation status.

## Subdomain length limits

Each DNS label has a [63-character limit](/kb/guide/why-is-my-vercel-deployment-url-being-shortened#rfc-1035). For preview URLs with long branch names and tenant subdomains, keep branch names concise to avoid resolution issues.


---

[View full sitemap](/docs/sitemap)
