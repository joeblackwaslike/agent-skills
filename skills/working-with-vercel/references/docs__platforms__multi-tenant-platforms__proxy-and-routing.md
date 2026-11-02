---
title: Proxy and Routing
product: vercel
url: /docs/platforms/multi-tenant-platforms/proxy-and-routing
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/proxy-and-routing"
last_updated: 2026-08-10
type: how-to
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  []
summary: Resolve tenants and route requests by subdomain, custom domain, or path using Next.js Proxy on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/proxy-and-routing.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "6d5fcf7fa89e35081160ec086a2b1616cc70c14287a125b22fdf0e8ea632cd7f"
---

# Proxy and Routing

## Resolve tenants with Proxy

Tenant headers must come from the proxy, never from the client. Any caller can attach an `x-tenant-id` header to a request, and if the proxy forwards that value untouched, your app trusts it and serves data for whichever tenant the caller picked. The examples below delete or overwrite each tenant header they set before forwarding the request, including on paths that skip tenant resolution, so a client-supplied `x-tenant-id` never reaches a route that runs behind the proxy. If your app reads other `x-tenant-*` headers, strip those in the proxy too. Requests to paths that a `matcher` excludes, such as `/api` in the first example, skip the proxy entirely, so don't trust tenant headers in those routes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts) — Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
- [Multi-Tenant Platform Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart) — Build a multi-tenant Next.js app on your computer, then add wildcard and custom domains on Vercel.
- [Multi-Tenant Template](https://vercel.com/docs/platforms/examples/multi-tenant-template) — Build SaaS applications that serve multiple domains from a single Next.js codebase.
- [Configuring Custom Subpaths](https://vercel.com/docs/platforms/multi-tenant-platforms/custom-subpaths) — Host platform content on custom subpaths of customer domains while maintaining a single Next.js application.
- [Serving Static Files](https://vercel.com/docs/platforms/multi-tenant-platforms/serving-static-files) — Serve tenant-specific static files like robots.txt, sitemap.xml, and llms.txt dynamically using route handlers.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/proxy-and-routing.graph.md](/docs/platforms/multi-tenant-platforms/proxy-and-routing.graph.md)
<!-- /docsgraph:related -->

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

  // This is your platform's own domain, such as yourapp.com. We default to
  // localhost:3000 so that the sample also works in local development.
  const rootDomain = process.env.ROOT_DOMAIN ?? 'localhost:3000';

  // Requests to the root domain go to your own app. Other hosts, such as
  // custom domains, are handled by the custom domain sample below.
  if (hostname === rootDomain || !hostname.endsWith(`.${rootDomain}`)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Now we take the subdomain off the front of the host to get the tenant.
  // For example, tenant1.yourapp.com gives us tenant1.
  const subdomain = hostname.slice(0, -(rootDomain.length + 1));

  if (subdomain === 'www' || subdomain === 'app' || subdomain === 'admin') {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Validate tenant exists (you might cache this for performance)
  const tenant = await validateTenant(subdomain);

  if (!tenant) {
    // Note that we use rewrite instead of redirect here, since a redirect to
    // /not-found would send the browser back through the proxy, which would
    // redirect it again in an endless loop.
    return NextResponse.rewrite(new URL('/not-found', request.url), {
      request: { headers: requestHeaders },
    });
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
- Returns a 404 page for unknown subdomains. We use a rewrite here, since a redirect would send the request through the proxy again in a loop. The quickstart takes another approach and returns a plain 404 response from the proxy
- Lets the root domain (`yourapp.com`, or `localhost:3000` locally) through to your own app

### Custom domain tenant resolution

Handle custom domains like `tenant.com` mapping to tenants:

```ts
// proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/global-config';

// Global Config keys can contain only letters, digits, _ and -, so we
// replace the . and : in a host name before we use it in a key.
const key = (value: string) => value.replaceAll('.', '_').replaceAll(':', '_');

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const rootDomain = process.env.ROOT_DOMAIN ?? 'localhost:3000';
  // Strip inbound tenant headers; only the proxy sets them
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('x-tenant-id');
  requestHeaders.delete('x-tenant-type');

  // Check if this is a custom domain
  const customDomainTenant = await get<{ id: string }>(
    `domain_${key(hostname)}`,
  );
  if (customDomainTenant) {
    requestHeaders.set('x-tenant-id', customDomainTenant.id);
    requestHeaders.set('x-tenant-type', 'custom-domain');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // If the host isn't a custom domain, we check whether it's a subdomain
  // of your root domain, such as tenant1.yourapp.com.
  const subdomain = hostname.endsWith(`.${rootDomain}`)
    ? hostname.slice(0, -(rootDomain.length + 1))
    : null;
  const subdomainTenant = subdomain
    ? await get<{ id: string }>(`subdomain_${key(subdomain)}`)
    : undefined;
  if (subdomainTenant) {
    requestHeaders.set('x-tenant-id', subdomainTenant.id);
    requestHeaders.set('x-tenant-type', 'subdomain');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Requests to the root domain go to your own app.
  if (hostname === rootDomain) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No tenant matched. As in the sample above, we rewrite instead of
  // redirect, so that the request doesn't loop through the proxy.
  return NextResponse.rewrite(new URL('/not-found', request.url), {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

This example:

- First checks if the hostname is a registered custom domain
- Falls back to the subdomain of your root domain, and lets the root domain itself through
- Uses Global Config for fast tenant lookups. Global Config keys allow only letters, digits, `_`, and `-`, so the sample replaces `.` and `:` in the hostname
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
    return NextResponse.rewrite(new URL('/not-found', request.url), {
      request: { headers: requestHeaders },
    });
  }

  // Rewrite URL to remove tenant from path. We clone nextUrl instead of
  // building a new URL, so that the query string stays on the request.
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${pathSegments.slice(2).join('/')}`;

  requestHeaders.set('x-tenant-id', tenant.id);
  requestHeaders.set('x-tenant-slug', tenantSlug);

  return NextResponse.rewrite(rewriteUrl, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
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

  // Strip the inbound tenant header; only the proxy sets it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('x-tenant-id');

  if (!tenantId) {
    return NextResponse.rewrite(new URL('/not-found', request.url), {
      request: { headers: requestHeaders },
    });
  }

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
