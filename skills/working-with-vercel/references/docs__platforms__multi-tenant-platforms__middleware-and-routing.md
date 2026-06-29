---
title: Middleware and Routing
product: vercel
url: /docs/platforms/multi-tenant-platforms/middleware-and-routing
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/middleware-and-routing"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  []
summary: Learn about middleware and routing on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/middleware-and-routing.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "80919853e9cbc818b3479ea22378fb2fdd67794c356e5c6b82bcdaba47d7d9ef"
---

# Middleware and Routing

## Resolve tenants with middleware

### Subdomain-based tenant resolution

Extract tenant identity from subdomains like `tenant1.yourapp.com`:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Extract subdomain (tenant identifier)
  const subdomain = hostname.split('.')[0];

  // Skip processing for main app domains
  if (subdomain === 'www' || subdomain === 'app' || subdomain === 'admin') {
    return NextResponse.next();
  }

  // Validate tenant exists (you might cache this for performance)
  const tenant = await validateTenant(subdomain);

  if (!tenant) {
    // Redirect to main app or show 404
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Add tenant context to the request
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenant.id);
  response.headers.set('x-tenant-subdomain', subdomain);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

This example:

- Extracts `tenant1` from `tenant1.yourapp.com`
- Validates the tenant exists in your database
- Adds tenant context to request headers for your app to use
- Redirects invalid tenants to a 404 page

### Custom domain tenant resolution

Handle custom domains like `tenant.com` mapping to tenants:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Check if this is a custom domain
  const customDomainTenant = await get(`domain_${hostname}`);

  if (customDomainTenant) {
    // Custom domain found, set tenant context
    const response = NextResponse.next();
    response.headers.set('x-tenant-id', customDomainTenant.id);
    response.headers.set('x-tenant-type', 'custom-domain');
    return response;
  }

  // Fall back to subdomain resolution
  const subdomain = hostname.split('.')[0];
  const subdomainTenant = await get(`subdomain_${subdomain}`);

  if (subdomainTenant) {
    const response = NextResponse.next();
    response.headers.set('x-tenant-id', subdomainTenant.id);
    response.headers.set('x-tenant-type', 'subdomain');
    return response;
  }

  // No tenant found
  return NextResponse.redirect(new URL('/not-found', request.url));
}
```

This example:

- First checks if the hostname is a registered custom domain
- Falls back to subdomain parsing if not a custom domain
- Uses Edge Config for fast tenant lookups
- Sets tenant type so your app knows how the tenant was resolved

### Path-based tenant resolution

Extract tenant from URL paths like `/tenant1/dashboard`:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract tenant from first path segment: /tenant_name_1/dashboard
  const pathSegments = pathname.split('/');
  const tenantSlug = pathSegments[1];

  if (!tenantSlug || tenantSlug.startsWith('_')) {
    return NextResponse.next();
  }

  // Validate tenant exists
  const tenant = await validateTenant(tenantSlug);

  if (!tenant) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Rewrite URL to remove tenant from path
  const newPath = `/${pathSegments.slice(2).join('/')}`;
  const rewriteUrl = new URL(newPath, request.url);

  const response = NextResponse.rewrite(rewriteUrl);
  response.headers.set('x-tenant-id', tenant.id);
  response.headers.set('x-tenant-slug', tenantSlug);

  return response;
}
```

This example:

- Extracts `tenant1` from `/tenant1/dashboard`
- Rewrites the URL to `/dashboard` (removes tenant from path)
- Your app receives `/dashboard` with tenant context in headers
- Skips processing for Next.js internal routes (starting with `_`)

## Route tenant-specific requests

### Tenant-aware page routing

Route different URLs to tenant-specific pages:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const tenantId = await resolveTenantId(hostname);

  if (!tenantId) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Route to tenant-specific pages
  if (pathname === '/') {
    // Rewrite homepage to tenant-specific version
    const url = request.nextUrl.clone();
    url.pathname = `/tenant/${tenantId}`;
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith('/blog')) {
    // Route blog requests to tenant-specific blog
    const url = request.nextUrl.clone();
    url.pathname = `/tenant/${tenantId}/blog${pathname.replace('/blog', '')}`;
    return NextResponse.rewrite(url);
  }

  // Add tenant context to all other requests
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenantId);
  return response;
}
```

This example:

- Routes `tenant1.app.com/` to `/tenant/tenant1` page
- Routes `tenant1.app.com/blog/post-1` to `/tenant/tenant1/blog/post-1` page
- Other routes get tenant context but keep the same URL
- Your page components can access tenant ID from headers


---

[View full sitemap](/docs/sitemap)
