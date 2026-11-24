---
title: Vercel for Platforms
product: vercel
url: /docs/multi-tenant
canonical_url: "https://vercel.com/docs/multi-tenant"
last_updated: 2025-12-18
type: conceptual
prerequisites:
  []
related:
  - /docs/multi-tenant/limits
  - /docs/multi-tenant/domain-management
summary: Build multi-tenant applications that serve multiple customers from a single codebase with custom domains and subdomains.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/multi-tenant.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "409dca3d70591be360f77eae88739058a963c9ece7af3a4016d899ab4613abd5"
---

# Vercel for Platforms

A **multi-tenant application** serves multiple customers (tenants) from a single codebase.

Each tenant gets its own domain or subdomain, but you only have one Next.js (or similar) deployment running on Vercel. This approach simplifies your infrastructure, scales well, and keeps your branding consistent across all tenant sites.

Get started with our [detailed docs](/platforms/docs), [multi-tenant Next.js example](https://vercel.com/templates/next.js/platforms-starter-kit), or learn more about customizing domains.

## Why build multi-tenant apps?

Some popular multi-tenant apps on Vercel include:

- **Content platforms**: [Hashnode](https://townhall.hashnode.com/powerful-and-superfast-hashnode-blogs-now-powered-by-nextjs-11-and-vercel), [Dub](https://dub.co/)
- **Documentation platforms:** [Mintlify](https://mintlify.com/), [Fern](https://buildwithfern.com/), [Plain](https://www.plain.com/channels/help-center)
- **Website and ecommerce store builders**: [Super](https://vercel.com/blog/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel), [Typedream](https://typedream.com/), [Universe](https://univer.se/)
- **B2B SaaS platforms**: [Zapier](https://zapier.com/interfaces), [Instatus](https://instatus.com/), [Cal](http://cal.com/)

For example, you might have:

- A root domain for your platform: `acme.com`
- Subdomains for tenants: `tenant1.acme.com`, `tenant2.acme.com`
- Fully custom domains for certain customers: `tenantcustomdomain.com`

Vercel's platform automatically issues [SSL certificates](https://vercel.com/docs/domains/working-with-ssl), handles DNS routing via its Anycast network, and ensures each of your tenants gets low-latency responses from the closest CDN region.

## Getting started

The fastest way to get started is with our [multi-tenant Next.js starter kit](https://vercel.com/templates/next.js/platforms-starter-kit). This template includes:

- Custom subdomain routing with Next.js middleware
- Tenant-specific content and pages
- Redis for tenant data storage
- Admin interface for managing tenants
- Compatible with Vercel preview deployments

## Multi-tenant features on Vercel

- Unlimited custom domains
- Unlimited `*.yourdomain.com` subdomains
- Automatic SSL certificate issuance and renewal
- Domain management through REST API or SDK
- Low-latency responses globally with the Vercel CDN
- Preview environment support to test changes
- Support for 35+ frontend and backend frameworks

## Next steps

- [Full Vercel for Platforms docs](/platforms/docs)
- [Learn about limits and features](/docs/multi-tenant/limits)
- [Set up domain management](/docs/multi-tenant/domain-management)
- [Deploy the starter template](https://vercel.com/templates/next.js/platforms-starter-kit)


---

[View full sitemap](/docs/sitemap)
