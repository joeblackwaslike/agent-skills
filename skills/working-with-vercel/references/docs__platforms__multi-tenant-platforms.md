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
  - /docs/platforms/multi-tenant-platforms/proxy-and-routing
summary: Serve multiple customers from a single codebase and deployment, routing each tenant by subdomain or custom domain.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f2c7d2ce409b2f5d359965ea65ac228c26b0d380ab5bd6d4787a8f6e1c1b00ad"
---

# Multi-Tenant Platforms

A multi-tenant platform serves every customer from one codebase and one Vercel deployment. Next.js Proxy resolves the tenant from the incoming domain or subdomain, and each tenant sees its own content and branding. Start with the concepts, then follow the quickstart.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing the Vercel Platforms Starter Kit](https://vercel.com/blog/platforms-starter-kit)
- [Multi-Tenant Template](https://vercel.com/docs/platforms/examples/multi-tenant-template) — Build SaaS applications that serve multiple domains from a single Next.js codebase.
- [Multi-Project Platforms](https://vercel.com/docs/platforms/multi-project-platforms) — Give each customer its own Vercel project and deployment, created and managed programmatically with the Vercel SDK.
- [Multi-Project Platforms Concepts](https://vercel.com/docs/platforms/multi-project-platforms/concepts) — Understand projects, deployments, domains, and architecture for multi-project platforms on Vercel.
- [Multi-Project Platforms Reference](https://vercel.com/docs/platforms/multi-project-platforms/reference) — API reference, error codes, troubleshooting, and FAQ for multi-project platforms on Vercel.
- [Examples](https://vercel.com/docs/platforms/examples) — Clone working multi-tenant and multi-project starters to begin your platform build.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms.graph.md](/docs/platforms/multi-tenant-platforms.graph.md)
<!-- /docsgraph:related -->

**Concepts**: How tenants, domains, routing, and data isolation work. [Learn more →](/docs/platforms/multi-tenant-platforms/concepts)

**Quickstart**: Build a multi-tenant app with subdomain routing from scratch. [Learn more →](/docs/platforms/multi-tenant-platforms/quickstart)

**Configuring domains**: Add, verify, redirect, and remove wildcard and custom domains with the SDK. [Learn more →](/docs/platforms/multi-tenant-platforms/configuring-domains)

**Custom subpaths**: Serve tenants from paths like /tenant1 instead of subdomains. [Learn more →](/docs/platforms/multi-tenant-platforms/custom-subpaths)

**Proxy and routing**: Resolve tenants in Proxy and pass context to your app. [Learn more →](/docs/platforms/multi-tenant-platforms/proxy-and-routing)

**Serving static files**: Serve tenant-specific static assets from a multi-tenant app. [Learn more →](/docs/platforms/multi-tenant-platforms/serving-static-files)

**Preview URLs**: Generate per-tenant preview URLs for testing changes before release. [Learn more →](/docs/platforms/multi-tenant-platforms/preview-url-prefixes)

**Reference**: Domain API, error codes, troubleshooting, and FAQ. [Learn more →](/docs/platforms/multi-tenant-platforms/reference)

**Limits**: Domain limits, preview URLs, and SSL options across plans. [Learn more →](/docs/platforms/multi-tenant-platforms/limits)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
