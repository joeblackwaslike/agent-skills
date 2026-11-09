---
title: Serving Static Files
product: vercel
url: /docs/platforms/multi-tenant-platforms/serving-static-files
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/serving-static-files"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/caching/cdn-cache/purge
  - /docs/caching/cdn-cache
  - /docs/vercel-blob
summary: Serve tenant-specific static files like robots.txt, sitemap.xml, and llms.txt dynamically using route handlers.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/serving-static-files.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "fc6d7c4ebd635300f5ba3e3fc3500dc1c6c6146ec521f2a87ff86d92f9a2022a"
---

# Serving Static Files

Multi-tenant applications need tenant-specific versions of static files like `robots.txt`, `sitemap.xml`, and agent discovery files like `llms.txt`. You can use route handlers to serve these files dynamically per tenant.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [What are the best practices for hosting videos on Vercel?](https://vercel.com/kb/guide/best-practices-for-hosting-videos-on-vercel-nextjs-mp4-gif) — Learn the ideal solutions for using video files like .mp4 and .gif on Vercel to prevent excess bandwidth consumption.
- [How to troubleshoot stale content returned from the Vercel CDN when using an external proxy or CDN](https://vercel.com/kb/guide/how-to-troubleshoot-stale-content-returned-from-the-edge-network-when-using-an-external-proxy-or-cdn) — Learn how to diagnose and fix stale content issues when using external proxies or CDNs with Vercel. Understand troublesh
- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions) — Learn how to import files inside Serverless Functions on Vercel.
- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [Proxy and Routing](https://vercel.com/docs/platforms/multi-tenant-platforms/proxy-and-routing) — Resolve tenants and route requests by subdomain, custom domain, or path using Next.js Proxy on Vercel.
- [Multi-Tenant Platform Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart) — Build a multi-tenant Next.js app on your computer, then add wildcard and custom domains on Vercel.
- [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts) — Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/serving-static-files.graph.md](/docs/platforms/multi-tenant-platforms/serving-static-files.graph.md)
<!-- /docsgraph:related -->

Next.js provides [built-in metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) for `robots.txt`, `sitemap.xml`, and other common files. Use route handlers when you need to serve files not covered by the metadata API, like `llms.txt` or custom discovery files.

## Route handler

Create a route handler that resolves the tenant from the request hostname and returns the appropriate content:

```ts filename="app/robots.txt/route.ts"
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const tenant = await getTenant(hostname);

  if (!tenant) {
    return new NextResponse('Not found', { status: 404 });
  }

  const content = `User-agent: *
Allow: /
Sitemap: https://${tenant.domain}/sitemap.xml`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

## Proxy integration

Your [Proxy](https://nextjs.org/docs/app/getting-started/proxy) must allow static file paths to reach route handlers instead of rewriting them:

```ts filename="proxy.ts"
import { NextRequest, NextResponse } from 'next/server';

const STATIC_FILE_PATHS = [
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/.well-known',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (STATIC_FILE_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Your other logic
}
```

> **💡 Note:** In Next.js 16+, the `middleware.ts` file was renamed to `proxy.ts`. See the
> [proxy.ts
> documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
> for more details.

## Content types

Set the correct `Content-Type` header for each file type:

| Extension | Content-Type      |
| --------- | ----------------- |
| `.txt`    | `text/plain`      |
| `.xml`    | `application/xml` |
| `.html`   | `text/html`       |

## Caching

Use the `Cache-Control` or `CDN-Cache-Control` header to cache responses in the Vercel CDN cache. [Invalidate your resource in the CDN cache](/docs/caching/cdn-cache/purge) when tenant content changes.

```ts
return new NextResponse(content, {
  headers: {
    'Content-Type': 'text/plain',
    'CDN-Cache-Control': 's-maxage=3600',
  },
});
```

The main difference between these headers is that `CDN-Cache-Control` allows you to control cache behavior separately from browser cache behavior. For a more thorough explanation, read more about [cache control options on Vercel](/docs/caching/cdn-cache#cache-control-options).

## When not to use this pattern

- **Truly static assets**: Use `/public` for files that don't change per tenant
- **Large files or media**: Use dedicated [blob storage](/docs/vercel-blob)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
