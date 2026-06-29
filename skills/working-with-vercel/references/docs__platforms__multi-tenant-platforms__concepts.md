---
title: Concepts
product: vercel
url: /docs/platforms/multi-tenant-platforms/concepts
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/concepts"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  []
summary: Learn about concepts on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/concepts.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "d9390e216c1306e44031b314a36f4fbe097f871fd8365180026271d079a1fa37"
---

# Multi-Tenant Platform Concepts

## Tenants

### What is a tenant

A tenant represents a customer, workspace, or organization within your multi-tenant application. Each tenant has its own data, configuration, and branding, but all tenants share the same codebase and deployment.

**Examples**:

- Blog platform: Each writer with their own blog is a tenant
- Documentation platform: Each company with its own docs site is a tenant
- E-commerce platform: Each store owner is a tenant

### Tenant identification strategies

You can identify tenants using three approaches:

**Subdomain-based**: Extract the tenant from the subdomain (`tenant1.yourapp.com`)

```ts filename="middleware.ts"
const hostname = request.headers.get('host');
const subdomain = hostname.split('.')[0]; // "tenant1"
```

**Custom domain-based**: Map custom domains to tenants (`tenant1.com` → Tenant 1)

```ts filename="middleware.ts"
// Map custom domain to tenant in database
const tenant = await db.tenant.findFirst({
  where: { customDomain: hostname },
});
```

**Path-based**: Extract tenant from URL path (`/tenant1/dashboard`)

```ts filename="middleware.ts"
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

**Application-level**: Middleware ensures requests can only access their tenant's data

**Edge Config**: Store tenant configuration for fast lookups at the edge

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

### How middleware resolves tenants

Next.js middleware runs on every request before your pages render:

```ts filename="middleware.ts"
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');

  // Get tenant from subdomain or custom domain
  const tenant = await resolveTenant(hostname);

  // Add tenant to request headers
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenant.id);

  return response;
}
```

### Request handling flow

1. User visits `tenant1.yourapp.com`
2. Request hits Vercel's edge network
3. Middleware extracts subdomain (`tenant1`)
4. Middleware looks up tenant in database or Edge Config
5. Middleware adds tenant context to request headers
6. Page component reads tenant from headers
7. Page renders with tenant-specific data

### Performance considerations

**Edge Config**: Store tenant configuration at the edge for sub-10ms lookups

```ts filename="edge-config.ts"
import { get } from '@vercel/edge-config';

const tenant = await get(`tenant_${hostname}`);
```

**Caching**: Cache tenant lookups in middleware to reduce database queries

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

**In middleware**: Set headers

```ts filename="middleware.ts"
response.headers.set('x-tenant-id', tenant.id);
```

**In server components**: Read headers

```ts filename="server-component.ts"
import { headers } from 'next/headers';

const tenantId = headers().get('x-tenant-id');
```

**In API routes**: Access request headers

```ts filename="api-route.ts"
const tenantId = request.headers.get('x-tenant-id');
```


---

[View full sitemap](/docs/sitemap)
