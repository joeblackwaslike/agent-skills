---
title: Multi-Tenant Template
product: vercel
url: /docs/platforms/examples/multi-tenant-template
canonical_url: "https://vercel.com/docs/platforms/examples/multi-tenant-template"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/examples
  - /docs/platforms
related:
  []
summary: Learn about multi-tenant template on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/examples/multi-tenant-template.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "37f9db9276adb9c66788e2b58bd2459a99228a23946bf3d2f122d2f1ca09fe87"
---

# Multi-Tenant Template

Multi-tenant applications allow you to serve different customers with unique domains from a single codebase. This template demonstrates how to build a platform that dynamically routes requests based on the incoming domain, enabling you to create white-label solutions, SaaS platforms, and marketplace applications.

> **💡 Note:** Deploy the template directly:
> [vercel.com/templates/saas/platforms-starter-kit](/templates/saas/platforms-starter-kit)

## What is Multi-Tenancy?

Multi-tenancy is an architecture pattern where a single instance of an application serves multiple tenants (customers or organizations). Each tenant gets their own subdomain or custom domain while sharing the same underlying infrastructure and codebase.

Common use cases include:

- **White-label platforms** - Rebrandable applications for different clients
- **SaaS marketplaces** - Multiple stores/sites under one platform
- **Content management systems** - Publishing platforms with custom domains
- **Agency portfolios** - Client websites managed from one codebase

## How It Works

The multi-tenant template uses Next.js middleware to intercept incoming requests and route them based on the hostname:

1. **Request arrives** - A user visits `customer1.example.com` or `customer1.com`
2. **Middleware intercepts** - Extracts the hostname from the request headers
3. **Dynamic routing** - Rewrites the URL internally to include tenant context
4. **Tenant-specific content** - Renders customized content for that domain
5. **Response served** - User sees their branded experience

## Getting Started

### Step 1: Clone the Template

Start by cloning the multi-tenant template:

```bash filename="Terminal"
git clone https://github.com/vercel/platforms
cd platforms
pnpm install
```

The template includes:

- **Next.js App Router** for modern React architecture
- **Middleware** for domain-based routing
- **Tailwind CSS** for styling
- **TypeScript** for type safety

### Step 2: Set Up Local Development

For local development, you'll need to map custom domains to localhost. Add these entries to your hosts file:

```text filename="/etc/hosts"
127.0.0.1 tenant1.localhost
127.0.0.1 tenant2.localhost
127.0.0.1 custom.localhost
```

Then start the development server:

```bash filename="Terminal"
pnpm dev
```

Visit different domains to see tenant-specific content:

- <http://localhost:3002> - Default home page
- <http://tenant1.localhost:3002> - Tenant 1's site
- <http://tenant2.localhost:3002> - Tenant 2's site

### Step 3: Configure Middleware

The middleware is the heart of the multi-tenant system. It intercepts all requests and routes them appropriately:

```typescript filename="middleware.ts"
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  // Add tenant context to the request and rewrite to /[domain]

  // if it starts with /domains, pass through
  if (request.nextUrl.pathname.startsWith('/domains')) {
    return NextResponse.next();
  }

  const target = `${request.nextUrl.href}domains/${hostname}`;
  const response = NextResponse.rewrite(target);
  response.headers.set('x-tenant-domain', hostname);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### Step 4: Create Tenant-Specific Pages

Each tenant's content is served from a dynamic route that receives the domain as a parameter:

```tsx filename="app/domains/[domain]/page.tsx"
export default async function TenantPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  // Fetch tenant-specific data
  const tenant = await getTenantByDomain(domain);

  // Render customized content
  return (
    <div className="min-h-screen">
      <header className="p-6" style={{ backgroundColor: tenant.brandColor }}>
        <h1 className="text-3xl font-bold text-white">{tenant.name}</h1>
      </header>

      <main className="p-6">
        {/* Tenant-specific content */}
        <TenantContent data={tenant.content} />
      </main>
    </div>
  );
}
```

## Core Components

### Domain Resolution

The system identifies tenants through their domain:

```typescript filename="middleware.ts"
function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}
```

### Domain Configuration

Configure domains in your Vercel dashboard:

1. **Wildcard subdomain** - `*.yourdomain.com`
   - Captures all subdomains automatically
   - Perfect for user-generated sites

2. **Custom domains** - Add individually
   - Each tenant's custom domain
   - Requires DNS configuration per domain

## Use Cases

### SaaS Platforms

Build software that serves multiple organizations with isolated data and custom branding.

### E-commerce Marketplaces

Create platforms where vendors get their own storefronts with unique domains.

### Content Publishing

Enable creators to publish content on their custom domains while using your platform.

### Agency Solutions

Manage multiple client websites from a single codebase with individual customizations.

***

The multi-tenant template provides a solid foundation for building platforms that serve multiple customers from a single codebase. By leveraging Next.js middleware and dynamic routing, you can create scalable SaaS applications that offer custom domains, personalized experiences, and efficient resource utilization.

Whether you're building a white-label solution, a marketplace platform, or a content management system, this architecture pattern enables you to grow from one to thousands of tenants without infrastructure complexity.


---

[View full sitemap](/docs/sitemap)
