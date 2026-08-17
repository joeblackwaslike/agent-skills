---
title: Proxy and Routing
product: vercel
url: /docs/platforms/multi-tenant-platforms/middleware-and-routing
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/middleware-and-routing"
last_updated: 2026-07-29
type: how-to
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/functions/runtimes/edge
summary: Resolve tenants and route requests by subdomain, custom domain, or path using Next.js Proxy on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/middleware-and-routing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b24d1456865c36add62d6bdff3f1d765bda913cd0a05e176ade5184d1438ea02"
---

# Proxy and Routing

## Resolve tenants with Proxy


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts?from=related) — Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
- [Multi-Tenant Template](https://vercel.com/docs/platforms/examples/multi-tenant-template?from=related) — Build SaaS applications that serve multiple domains from a single Next.js codebase.
- [Serving Static Files](https://vercel.com/docs/platforms/multi-tenant-platforms/serving-static-files?from=related) — Serve tenant-specific static files like robots.txt, sitemap.xml, and llms.txt dynamically using route handlers.
- [Custom Subpaths](https://vercel.com/docs/platforms/multi-tenant-platforms/custom-subpaths?from=related) — Host platform content on custom subpaths of customer domains while maintaining a single Next.js application.
- [Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart?from=related) — Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/middleware-and-routing.graph.md](/docs/platforms/multi-tenant-platforms/middleware-and-routing.graph.md)
<!-- /docsgraph:related -->

Tenant headers must come from the proxy, never from the client. Any caller can attach an `x-tenant-id` header to a request, and if the proxy forwards that value untouched, your app trusts it and serves data for whichever tenant the caller picked. The examples below delete or overwrite inbound `x-tenant-*` headers before forwarding each request, including on paths that skip tenant resolution, so a client-supplied `x-tenant-id` never reaches your app.

> **💡 Note:** Next.js renamed the `middleware` file convention to `proxy` in Next.js 16. Run
> `npx @next/codemod@canary middleware-to-proxy` to migrate. The examples below
> use `proxy.ts`, which runs on the Node.js runtime and throws if you set a
> `runtime` config option.

For Next.js 15 and earlier, use `middleware.ts` with an exported `middleware` function. That file defaults to the [Edge runtime](/docs/functions/runtimes/edge), so set `runtime: 'nodejs'` in the `config` object it exports (stable since Next.js 15.5). Node.js is the recommended runtime, it's required if your tenant lookup uses a database client or other Node.js APIs, and it's what Proxy runs on after you upgrade:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(request: NextRequest) {
  // Same tenant resolution as the proxy examples below
  return NextResponse.next();
}
```

### Subdomain-based tenant resolution

Extract tenant identity from subdomains like `tenant1.yourapp.com`:

```ts
// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Strip inbound tenant headers; only the proxy sets them
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('x-tenant-id');
  requestHeaders.delete('x-tenant-subdomain');

  // Extract subdomain (tenant identifier)
  const subdomain = hostname.split('.')[0];

  // Skip processing for main app domains
  if (subdomain === 'www' || subdomain === 'app' || subdomain === 'admin') {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Validate tenant exists (you might cache this for performance)
  const tenant = await validateTenant(subdomain);

  if (!tenant) {
    // Redirect to main app or show 404
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Forward tenant context to your app on the request headers
  requestHeaders.set('x-tenant-id', tenant.id);
  requestHeaders.set('x-tenant-subdomain', subdomain);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

This example:

- Extracts `tenant1` from `tenant1.yourapp.com`
- Validates the tenant exists in your database
- Strips inbound tenant headers so clients can't forge tenant context
- Adds tenant context to request headers for your app to use
- Redirects invalid tenants to a 404 page

### Custom domain tenant resolution

Handle custom domains like `tenant.com` mapping to tenants:

```ts
// proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/global-config';

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Strip inbound tenant headers; only the proxy sets them
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('x-tenant-id');
  requestHeaders.delete('x-tenant-type');

  // Check if this is a custom domain
  const customDomainTenant = await get<{ id: string }>(`domain_${hostname}`);

  if (customDomainTenant) {
    // Custom domain found, forward tenant context on the request headers
    requestHeaders.set('x-tenant-id', customDomainTenant.id);
    requestHeaders.set('x-tenant-type', 'custom-domain');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Fall back to subdomain resolution
  const subdomain = hostname.split('.')[0];
  const subdomainTenant = await get<{ id: string }>(`subdomain_${subdomain}`);

  if (subdomainTenant) {
    requestHeaders.set('x-tenant-id', subdomainTenant.id);
    requestHeaders.set('x-tenant-type', 'subdomain');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No tenant found
  return NextResponse.redirect(new URL('/not-found', request.url));
}
```

This example:

- First checks if the hostname is a registered custom domain
- Falls back to subdomain parsing if not a custom domain
- Uses Global Config for fast tenant lookups
- Sets tenant type so your app knows how the tenant was resolved

### Path-based tenant resolution

Extract tenant from URL paths like `/tenant1/dashboard`:

```ts
// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strip inbound tenant headers; only the proxy sets them
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('x-tenant-id');
  requestHeaders.delete('x-tenant-slug');

  // Extract tenant from first path segment: /tenant_name_1/dashboard
  const pathSegments = pathname.split('/');
  const tenantSlug = pathSegments[1];

  if (!tenantSlug || tenantSlug.startsWith('_')) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Validate tenant exists
  const tenant = await validateTenant(tenantSlug);

  if (!tenant) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Rewrite URL to remove tenant from path
  const newPath = `/${pathSegments.slice(2).join('/')}`;
  const rewriteUrl = new URL(newPath, request.url);

  requestHeaders.set('x-tenant-id', tenant.id);
  requestHeaders.set('x-tenant-slug', tenantSlug);

  return NextResponse.rewrite(rewriteUrl, {
    request: { headers: requestHeaders },
  });
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
// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const tenantId = await resolveTenantId(hostname);

  if (!tenantId) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Overwrite any inbound tenant header with the resolved tenant
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenantId);

  // Route to tenant-specific pages
  if (pathname === '/') {
    // Rewrite homepage to tenant-specific version
    const url = request.nextUrl.clone();
    url.pathname = `/tenant/${tenantId}`;
    return NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
  }

  if (pathname.startsWith('/blog')) {
    // Route blog requests to tenant-specific blog
    const url = request.nextUrl.clone();
    url.pathname = `/tenant/${tenantId}/blog${pathname.replace('/blog', '')}`;
    return NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
  }

  // Forward tenant context to all other requests
  return NextResponse.next({ request: { headers: requestHeaders } });
}
```

This example:

- Routes `tenant1.app.com/` to `/tenant/tenant1` page
- Routes `tenant1.app.com/blog/post-1` to `/tenant/tenant1/blog/post-1` page
- Other routes get tenant context but keep the same URL
- Your page components can access tenant ID from headers


---

[View full sitemap](/docs/sitemap)
