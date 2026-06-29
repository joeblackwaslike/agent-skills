---
title: Partial Prerendering (PPR)
product: vercel
url: /docs/partial-prerendering
canonical_url: "https://vercel.com/docs/partial-prerendering"
last_updated: 2026-06-17
type: conceptual
prerequisites:
  []
related:
  - /docs/incremental-static-regeneration
  - /docs/functions
  - /docs/caching/cdn-cache
  - /docs/regions
  - /docs/incremental-static-regeneration/limits-and-pricing
summary: Partial Prerendering serves a cached static shell instantly, then renders and streams the dynamic parts of a page per request.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/partial-prerendering.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "d073675ee32759142814bd2add637440824bc93d3e9f00cab41e2fc4da0fb280"
---

# Partial Prerendering (PPR)

> **🔒 Permissions Required**: Partial Prerendering

Partial Prerendering (PPR) is a rendering strategy that combines fast cached static content with the ability to render fresh dynamic content, all in one response. This strategy allows you to personalize pages while still having a performant site.

PPR requests have two parts to them: a static shell that is cached and served quickly, and a dynamic execution that fills in personalized content into the static shell. PPR uses [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration) for the static shell of the page, and [Vercel Functions](/docs/functions) to render the dynamic parts of the page.

Use PPR when a page is mostly static but has a few parts that change per request or per user:

- **Product or catalog pages**: a static layout with a live price, inventory count, or cart contents.
- **Dashboards and app shells**: a cached layout with a personalized widget, such as a user greeting or a notification count.
- **Articles and marketing pages**: static content with personalized recommendations or an auth-aware header.

If your page is fully static, use ISR since there is no dynamic content.

To get started:

- [Set up PPR](#using-ppr) with your framework
- Learn [how PPR works](#how-ppr-works) from build time through revalidation
- Understand [usage and pricing](#usage-and-pricing)

## Benefits of Vercel's CDN for PPR

When you deploy PPR with your framework on Vercel, the CDN adds these optimizations:

- **Instant shell with dynamic content in one response**: Once a region has pulled the shell into its [CDN cache](/docs/caching/cdn-cache), Vercel serves it from the nearest of [Vercel's 20 regions](/docs/regions) for a fast Time to First Byte, while your function renders the dynamic parts and streams them into the same response.
- **Durable storage**: At deployment time, Vercel writes the shell to the [global ISR cache](/docs/incremental-static-regeneration/limits-and-pricing#isr-cache-region). On the first request in each region, Vercel pulls the shell into the regional [CDN cache](/docs/caching/cdn-cache). The shell persists in the global ISR cache until you revalidate it.
- **Cache shielding and request collapsing**: on a CDN cache miss, Vercel reads from the global ISR cache before invoking your function, and it [collapses](/docs/incremental-static-regeneration/request-collapsing) concurrent requests to the same path into one invocation per region.
- **Globally consistent purging**: when you revalidate content, all caches across all regions update within 300 milliseconds. Vercel purges HTML and data payloads together, so visitors see consistent content across full page loads and client-side transitions.
- **Instant rollbacks**: cached content from previous deployments isn't purged, so you can roll back without regenerating it.

## Using PPR

PPR is configured through your framework's APIs. Your framework code defines which parts of a route are static and which are dynamic, and Vercel handles the caching and function execution automatically.

Partial Prerendering is currently available with Next.js:

| Framework                | How to enable PPR                                          |
| ------------------------ | ---------------------------------------------------------- |
| **Next.js** (App Router) | Enable Cache Components and mark cached segments with `use cache` |

In Next.js, Cache Components and the `use cache` directive define the cached shell and the dynamic sections. You set how long cached content stays fresh with `cacheLife` and invalidate it on demand with `cacheTag`.

```tsx filename="app/page.tsx" framework=nextjs-app
import { Suspense } from 'react';
import { cacheTag } from 'next/cache';
import { cookies } from 'next/headers';

type Product = { id: string; name: string; price: number };

async function ProductsList() {
  'use cache';
  cacheTag('products-list');

  const products: Product[] = await fetch(
    'https://api.example.com/products',
  ).then((res) => res.json());
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name} - ${product.price}</li>
      ))}
    </ul>
  );
}

async function LoginState() {
  const user = (await cookies()).get('user')?.value;
  return <p>Welcome back, {user}</p>;
}

export default function Page() {
  return (
    <body>
      <h1>Product List Page</h1>

      {/* Dynamic: streamed in at request time */}
      <Suspense fallback={<p>Loading…</p>}>
        <LoginState />
      </Suspense>

      {/* Cached: prerendered into the static shell */}
      <ProductsList />
    </body>
  );
}
```

```jsx filename="app/page.js" framework=nextjs-app
import { Suspense } from 'react';
import { cacheTag } from 'next/cache';
import { cookies } from 'next/headers';

async function ProductsList() {
  'use cache';
  cacheTag('products-list');

  const products = await fetch('https://api.example.com/products').then((res) =>
    res.json(),
  );
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name} - ${product.price}</li>
      ))}
    </ul>
  );
}

async function LoginState() {
  const user = (await cookies()).get('user')?.value;
  return <p>Welcome back, {user}</p>;
}

export default function Page() {
  return (
    <body>
      <h1>Product List Page</h1>

      {/* Dynamic: streamed in at request time */}
      <Suspense fallback={<p>Loading…</p>}>
        <LoginState />
      </Suspense>

      {/* Cached: prerendered into the static shell */}
      <ProductsList />
    </body>
  );
}
```

For the full explanation and tutorial for how to use this, see [Cache Components](https://nextjs.org/docs/app/getting-started/caching). To cache data inside the dynamic sections separately from the page response, see [Runtime Cache](/docs/caching/runtime-cache).

## How PPR works

PPR executes at build time, request time, and through revalidation. The sections below walk through each stage.

### At build time

Your framework generates two things for each PPR route: a static shell with placeholders where dynamic content goes, and the data your function needs to resume rendering the dynamic parts. When you deploy, Vercel prepopulates the shell in the [global ISR cache](/docs/incremental-static-regeneration/limits-and-pricing#isr-cache-region).

### At request time

A request arrives at the nearest [Vercel region](/docs/regions). If the regional [CDN cache](/docs/caching/cdn-cache) already has the shell, Vercel serves it right away. If not, the first request in that region pulls the shell from the global ISR cache and populates the CDN cache. In both cases, your function renders the dynamic holes in parallel. The shell reaches the browser first. The function output streams into the same response as it completes, so dynamic content fills in after the initial paint.

This is the key difference from ISR: even when the shell is served from the CDN cache, your function still runs to render the dynamic holes. It is possible to have a fully cached page, but most PPR requests incur a function invocation.

### At revalidation time

Revalidation updates the cached shell in two steps. First, your function regenerates the shell in the background. Then, the next request in each region pulls the updated shell into the regional CDN cache.

Two triggers can update the cached content for a shell:

- **Time-based revalidation** runs automatically after a set interval
- **On-demand revalidation** runs when you call an API

After a revalidation, the next request will serve the last generated content and trigger an asynchronous background revalidation. On the next request, the new content will be served:

### On failure

If revalidation fails, Vercel keeps serving the existing shell from the global ISR cache and regional CDN caches, and retries shortly after. For the full failure behavior, see [how ISR works](/docs/incremental-static-regeneration#on-failure).

## Usage and pricing

When you use PPR with a framework on Vercel, you incur usage for:

- **[ISR reads and writes](/docs/incremental-static-regeneration/limits-and-pricing)**: Vercel reads the cached shell from the global ISR cache when the CDN cache misses, and writes fresh content back when it revalidates.
- **[Function invocations](/docs/functions/usage-and-pricing)**: your function runs to render the dynamic holes on most requests, plus any background revalidations.
- **[Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer)**: rendered output transferred from your function to the CDN cache and global ISR cache.

## More resources

- [Partial Prerendering with Next.js](/docs/frameworks/nextjs#partial-prerendering)
- [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration)
- [Vercel Functions](/docs/functions)
- [Runtime Cache](/docs/caching/runtime-cache)


---

[View full sitemap](/docs/sitemap)
