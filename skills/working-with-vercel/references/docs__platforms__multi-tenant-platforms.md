---
title: Multi-Tenant Platforms
product: vercel
url: /docs/platforms/multi-tenant-platforms
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms
related:
  - /docs/platforms/multi-tenant-platforms/concepts
  - /docs/platforms/multi-tenant-platforms/quickstart
  - /docs/platforms/multi-tenant-platforms/configuring-domains
  - /docs/platforms/multi-tenant-platforms/custom-subpaths
  - /docs/platforms/multi-tenant-platforms/middleware-and-routing
summary: Learn about multi-tenant platforms on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "c7d380143f538a8a39a03d324779ac023250e2d9766a17dc69bc420eddbfe291"
---

# Multi-Tenant Platforms

A multi-tenant platform serves every customer from one codebase and one Vercel deployment. Middleware resolves the tenant from the incoming domain or subdomain, and each tenant sees its own content and branding. Start with the concepts, then follow the quickstart.

**Concepts**: How tenants, domains, routing, and data isolation work. [Learn more →](/docs/platforms/multi-tenant-platforms/concepts)

**Quickstart**: Build a multi-tenant app with subdomain routing from scratch. [Learn more →](/docs/platforms/multi-tenant-platforms/quickstart)

**Configuring domains**: Add, verify, redirect, and remove wildcard and custom domains with the SDK. [Learn more →](/docs/platforms/multi-tenant-platforms/configuring-domains)

**Custom subpaths**: Serve tenants from paths like /tenant1 instead of subdomains. [Learn more →](/docs/platforms/multi-tenant-platforms/custom-subpaths)

**Middleware and routing**: Resolve tenants in middleware and pass context to your app. [Learn more →](/docs/platforms/multi-tenant-platforms/middleware-and-routing)

**Serving static files**: Serve tenant-specific static assets from a multi-tenant app. [Learn more →](/docs/platforms/multi-tenant-platforms/serving-static-files)

**Preview URLs**: Generate per-tenant preview URLs for testing changes before release. [Learn more →](/docs/platforms/multi-tenant-platforms/preview-url-prefixes)

**Reference**: Domain API, error codes, troubleshooting, and FAQ. [Learn more →](/docs/platforms/multi-tenant-platforms/reference)

**Limits**: Domain limits, preview URLs, and SSL options across plans. [Learn more →](/docs/platforms/multi-tenant-platforms/limits)


---

[View full sitemap](/docs/sitemap)
