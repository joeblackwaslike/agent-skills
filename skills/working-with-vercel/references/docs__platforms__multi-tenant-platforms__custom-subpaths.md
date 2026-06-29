---
title: Custom Subpaths
product: vercel
url: /docs/platforms/multi-tenant-platforms/custom-subpaths
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/custom-subpaths"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  []
summary: Learn about custom subpaths on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/custom-subpaths.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "d564aac1b423cbdfdc3b471bc1155c38b8f5cc74c7aab947e31f772ccca02b29"
---

# Configuring Custom Subpaths

Custom subpaths let customers host your platform content on any path of their existing domain, like `company.com/docs` or `startup.com/help`, while you maintain a single Next.js application and they host the rest of their site separately.

## Single app, multiple subpaths

Use a catch-all route to handle all customer requests in one application:

```tsx filename="app/sites/[...slug]/page.tsx"
export default async function CustomerSite({
  params,
}: {
  params: { slug: string[] };
}) {
  const [customerSlug, ...contentPath] = params.slug;

  // Load customer config
  const customer = await getCustomer(customerSlug);
  if (!customer) return notFound();

  // Load customer-specific content
  const content = await getContent(customer.id, contentPath.join('/'));

  return (
    <div>
      <h1>{customer.name}</h1>
      <div>{content}</div>
    </div>
  );
}
```

This handles requests like:

- `yourapp.com/sites/acme/getting-started`
- `yourapp.com/sites/startup/api-reference`

## Redirect subdomains to paths

Redirect customer subdomains to path-based routes:

```ts filename="proxy.ts"
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Check if it's a customer subdomain
  const subdomain = hostname.split('.')[0];

  if (
    subdomain !== 'www' &&
    subdomain !== 'app' &&
    hostname.includes('yourapp.com')
  ) {
    // Rewrite vercel.yourapp.com/guide -> yourapp.com/sites/vercel/guide
    const rewriteUrl = new URL(`/sites/${subdomain}${pathname}`, request.url);
    rewriteUrl.host = 'yourapp.com';

    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}
```

## Set unique asset prefix

Configure Next.js to use a unique asset prefix to avoid conflicts:

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/your-platform-assets',

  async rewrites() {
    return [
      {
        source: '/your-platform-assets/_next/:path*',
        destination: '/_next/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

This ensures your CSS, JS, and images load from `/your-platform-assets/_next/...` instead of `/_next/...`.

## Customer domain setup

Customers map two paths on their domain to your platform:

**Content mapping:**

```
/docs/:path* -> https://yourapp.com/sites/customer-slug/:path*
```

**Asset mapping:**

```
/your-platform-assets/:path* -> https://yourapp.com/your-platform-assets/:path*
```

Example with Vercel [Proxy](https://nextjs.org/docs/app/getting-started/proxy):

```ts filename="proxy.ts"
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Route content requests
  if (pathname.startsWith('/docs/')) {
    const targetPath = pathname.replace('/docs/', '/sites/customer-slug/');
    const targetUrl = `https://yourapp.com${targetPath}`;

    return NextResponse.rewrite(new URL(targetUrl));
  }

  // Route asset requests
  if (pathname.startsWith('/your-platform-assets/')) {
    const targetUrl = `https://yourapp.com${pathname}`;
    return NextResponse.rewrite(new URL(targetUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/docs/:path*', '/your-platform-assets/:path*'],
};
```

## Handle customer configuration

Store customer settings and customize the experience:

```tsx filename="app/sites/[...slug]/layout.tsx"
export default async function CustomerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const customerSlug = params.slug[0];
  const customer = await getCustomer(customerSlug);

  return (
    <html>
      <head>
        <title>{customer.siteTitle}</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --primary-color: ${customer.primaryColor};
              --font-family: ${customer.fontFamily};
            }
          `,
          }}
        />
      </head>
      <body>
        <nav style={{ backgroundColor: customer.primaryColor }}>
          <img src={customer.logo} alt={customer.name} />
        </nav>
        {children}
      </body>
    </html>
  );
}
```


---

[View full sitemap](/docs/sitemap)
