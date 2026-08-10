---
title: Multi-Tenant Platforms
product: vercel
url: /docs/platforms/multi-tenant-platforms
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/platforms
related:
  - /docs/platforms/multi-tenant-platforms/concepts
  - /docs/platforms/multi-tenant-platforms/quickstart
  - /docs/platforms/multi-tenant-platforms/configuring-domains
  - /docs/platforms/multi-tenant-platforms/custom-subpaths
  - /docs/platforms/multi-tenant-platforms/middleware-and-routing
summary: Serve multiple customers from a single codebase and deployment, routing each tenant by subdomain or custom domain.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "b8489efe9b30791222263115866b107ebea4d72b9a94ac59050a0b15a027599d"
---

# Multi-Tenant Platforms

A multi-tenant platform serves every customer from one codebase and one Vercel deployment. Next.js Proxy resolves the tenant from the incoming domain or subdomain, and each tenant sees its own content and branding. Start with the concepts, then follow the quickstart.

**Concepts**: How tenants, domains, routing, and data isolation work. [Learn more →](/docs/platforms/multi-tenant-platforms/concepts)

**Quickstart**: Build a multi-tenant app with subdomain routing from scratch. [Learn more →](/docs/platforms/multi-tenant-platforms/quickstart)

**Configuring domains**: Add, verify, redirect, and remove wildcard and custom domains with the SDK. [Learn more →](/docs/platforms/multi-tenant-platforms/configuring-domains)

**Custom subpaths**: Serve tenants from paths like /tenant1 instead of subdomains. [Learn more →](/docs/platforms/multi-tenant-platforms/custom-subpaths)

**Proxy and routing**: Resolve tenants in Proxy and pass context to your app. [Learn more →](/docs/platforms/multi-tenant-platforms/middleware-and-routing)

**Serving static files**: Serve tenant-specific static assets from a multi-tenant app. [Learn more →](/docs/platforms/multi-tenant-platforms/serving-static-files)

**Preview URLs**: Generate per-tenant preview URLs for testing changes before release. [Learn more →](/docs/platforms/multi-tenant-platforms/preview-url-prefixes)

**Reference**: Domain API, error codes, troubleshooting, and FAQ. [Learn more →](/docs/platforms/multi-tenant-platforms/reference)

**Limits**: Domain limits, preview URLs, and SSL options across plans. [Learn more →](/docs/platforms/multi-tenant-platforms/limits)


---

[View full sitemap](/docs/sitemap)
