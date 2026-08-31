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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e018587b403aa3c0f56f070c84e0cee8ad47b48e7aeaf3b80d4ca514d8e93454"
---

# Serving Static Files

Multi-tenant applications need tenant-specific versions of static files like `robots.txt`, `sitemap.xml`, and agent discovery files like `llms.txt`. You can use route handlers to serve these files dynamically per tenant.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to serve documentation for agents](https://vercel.com/kb/guide/how-to-serve-documentation-for-agents?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Learn how to serve markdown to agents and HTML for humans from the same URL
- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Learn how to import files inside Serverless Functions on Vercel.
- [Proxy and Routing](https://vercel.com/docs/platforms/multi-tenant-platforms/middleware-and-routing?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Resolve tenants and route requests by subdomain, custom domain, or path using Next.js Proxy on Vercel.
- [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
- [Configuring Custom Subpaths](https://vercel.com/docs/platforms/multi-tenant-platforms/custom-subpaths?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Host platform content on custom subpaths of customer domains while maintaining a single Next.js application.
- [Vercel CDN overview](https://vercel.com/docs/cdn?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [Features](https://vercel.com/docs/build-output-api/features?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=related) — Learn how to implement common Vercel platform features through the Build Output API.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/serving-static-files.graph.md](/docs/platforms/multi-tenant-platforms/serving-static-files.graph.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fserving-static-files&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Next.js provides [built-in metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) for `robots.txt`, `sitemap.xml`, and other common files. Use route handlers when you need to serve files not covered by the metadata API, like `llms.txt` or custom discovery files.

## Route handler

Create a route handler that resolves the tenant and returns the appropriate content:

```ts filename="app/[domain]/robots.txt/route.ts"
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> },
) {
  const { domain } = await params;
  const tenant = await getTenant(domain);

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
