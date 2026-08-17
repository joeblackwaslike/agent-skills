---
title: Multi-Tenant Platform Concepts
product: vercel
url: /docs/platforms/multi-tenant-platforms/concepts
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/concepts"
last_updated: 2026-07-29
type: conceptual
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  []
summary: Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/concepts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "019269e4085e8d96e5218ae8abadb0b7886ae4eceba541a6f43d9baad846e947"
---

# Multi-Tenant Platform Concepts

## Tenants


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Multi-Tenant Template](https://vercel.com/docs/platforms/examples/multi-tenant-template?from=related) — Build SaaS applications that serve multiple domains from a single Next.js codebase.
- [Proxy and Routing](https://vercel.com/docs/platforms/multi-tenant-platforms/middleware-and-routing?from=related) — Resolve tenants and route requests by subdomain, custom domain, or path using Next.js Proxy on Vercel.
- [Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart?from=related) — Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.
- [Concepts](https://vercel.com/docs/platforms/multi-project-platforms/concepts?from=related) — Understand projects, deployments, domains, and architecture for multi-project platforms on Vercel.
- [Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference?from=related) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/concepts.graph.md](/docs/platforms/multi-tenant-platforms/concepts.graph.md)
<!-- /docsgraph:related -->

### What is a tenant

A tenant represents a customer, workspace, or organization within your multi-tenant application. Each tenant has its own data, configuration, and branding, but all tenants share the same codebase and deployment.

**Examples**:

- Blog platform: Each writer with their own blog is a tenant
- Documentation platform: Each company with its own docs site is a tenant
- E-commerce platform: Each store owner is a tenant

### Tenant identification strategies

You can identify tenants using three approaches:

**Subdomain-based**: Extract the tenant from the subdomain (`tenant1.yourapp.com`)

```ts filename="proxy.ts"
const hostname = request.headers.get('host');
const subdomain = hostname.split('.')[0]; // "tenant1"
```

**Custom domain-based**: Map custom domains to tenants (`tenant1.com` → Tenant 1)

```ts filename="proxy.ts"
// Map custom domain to tenant in database
const tenant = await db.tenant.findFirst({
  where: { customDomain: hostname },
});
```

**Path-based**: Extract tenant from URL path (`/tenant1/dashboard`)

```ts filename="proxy.ts"
const pathname = request.nextUrl.pathname;
const tenantSlug = pathname.split('/')[1]; // "tenant1"
```

### Tenant data isolation

Multi-tenant applications must isolate data between tenants:

**Database-level**: Use tenant ID in all queries

```ts filename="database.ts"
const posts = await db.post.findMany({
  where: { tenantId: tenant.id },
});
```

**Application-level**: Next.js Proxy ensures requests can only access their tenant's data

**Global Config**: Store tenant configuration for fast lookups at the edge

## Domains

### Wildcard domains

Wildcard domains let you automatically serve all subdomains from a single Vercel project:

- Add `*.yourapp.com` to your project
- Point your domain to Vercel's nameservers
- Any subdomain (`tenant1.yourapp.com`, `tenant2.yourapp.com`) automatically routes to your app
- Vercel issues SSL certificates for each subdomain on the fly

**Requirements**: Must use Vercel's nameservers (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)

### Custom domains

Custom domains let tenants bring their own domain:

- Add `tenant1.com` to your Vercel project via SDK
- Tenant configures DNS (CNAME or nameservers)
- Verify domain ownership (TXT record)
- Vercel issues SSL certificate automatically

### SSL certificate issuance

Vercel automatically issues SSL certificates for all domains using Let's Encrypt:

- Wildcard domains: Single wildcard certificate covers all subdomains
- Custom domains: Individual certificate per domain
- Automatic renewal before expiration
- No configuration required

### Domain verification

For domains already in use on Vercel, ownership verification is required:

1. Add domain to your project
2. Vercel generates a unique TXT record
3. Tenant adds TXT record to their DNS
4. Verify ownership via SDK or dashboard
5. Certificate issues once verified

## Routing

### How Proxy resolves tenants

Next.js Proxy runs on every request before your pages render:

```ts filename="proxy.ts"
export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host');

  // Get tenant from subdomain or custom domain
  const tenant = await resolveTenant(hostname);

  // Forward tenant context to your app on the request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenant.id);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
```

### Request handling flow

1. User visits `tenant1.yourapp.com`
2. Request hits Vercel's edge network
3. Proxy extracts subdomain (`tenant1`)
4. Proxy looks up tenant in database or Global Config
5. Proxy adds tenant context to the request headers
6. Page component reads tenant from headers
7. Page renders with tenant-specific data

### Performance considerations

**Global Config**: Store tenant configuration at the edge for sub-10ms lookups

```ts filename="edge-config.ts"
import { get } from '@vercel/global-config';

const tenant = await get(`tenant_${hostname}`);
```

**Caching**: Cache tenant lookups in the proxy to reduce database queries

**Connection pooling**: Use connection pooling for database queries to handle multiple tenants efficiently

## Architecture

### Single deployment serving multiple domains

Multi-tenant architecture means:

- One Next.js codebase
- One Vercel deployment
- Multiple domains (subdomains + custom domains)
- Shared infrastructure and resources
- Tenant-aware routing and data access

### Tenant context

Pass tenant information through your application:

**In Proxy**: Forward context on the request headers

```ts filename="proxy.ts"
const requestHeaders = new Headers(request.headers);
requestHeaders.set('x-tenant-id', tenant.id);

return NextResponse.next({
  request: { headers: requestHeaders },
});
```

Use `NextResponse.next({ request: { headers } })` to send the value to your app. Setting `response.headers` instead sends the header to the browser, where server components can't read it. Delete or overwrite inbound `x-tenant-*` headers on every path through the proxy so clients can't supply tenant context themselves.

**In server components**: Read headers

```ts filename="server-component.ts"
import { headers } from 'next/headers';

const headersList = await headers();
const tenantId = headersList.get('x-tenant-id');
```

**In API routes**: Access request headers

```ts filename="api-route.ts"
const tenantId = request.headers.get('x-tenant-id');
```


---

[View full sitemap](/docs/sitemap)
