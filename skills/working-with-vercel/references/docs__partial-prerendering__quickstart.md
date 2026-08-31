---
title: Getting started with Partial Prerendering
product: vercel
url: /docs/partial-prerendering/quickstart
canonical_url: "https://vercel.com/docs/partial-prerendering/quickstart"
last_updated: 2026-07-28
type: tutorial
prerequisites:
  - /docs/partial-prerendering
related:
  - /docs/partial-prerendering
summary: "Set up Partial Prerendering (PPR) in a Next.js App Router project: enable Cache Components, cache a static shell, and stream dynamic content per..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/partial-prerendering/quickstart.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "afe855c07be73f9eba86356e93b87f3525fa8b3ba0a7f00c9a75aa993c272eb3"
---

# Getting started with Partial Prerendering

This guide walks through setting up [Partial Prerendering (PPR)](/docs/partial-prerendering) in a Next.js App Router project. Vercel serves the cached static shell from its CDN, then streams the dynamic parts from your function into the same response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Partial prerendering: Building towards a new default rendering model for web applications](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Caching](https://nextjs.org/docs/app/getting-started/caching?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to cache data and UI in Next.js
- [Implementing Partial Prerendering on your platform](https://nextjs.org/docs/app/guides/ppr-platform-guide?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — A guide for platform engineers on implementing PPR support, from basic origin rendering to optimized CDN integration.
- [Implementing PPR in an Adapter](https://nextjs.org/docs/app/api-reference/adapters/implementing-ppr-in-an-adapter?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Implement Partial Prerendering support in an adapter using fallback output and cache hooks.
- [Building public pages](https://nextjs.org/docs/app/guides/public-static-pages?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to build public, "static" pages that share data across users, such as landing pages, list pages (products, blo
- [How can I prerender my application on Vercel?](https://vercel.com/kb/guide/how-can-i-prerender-my-application-on-vercel?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to enable prerendering with your frontend framework on Vercel for better performance and SEO.
- [Incremental Static Regeneration with Cache Components](https://nextjs.org/docs/app/guides/incremental-static-regeneration-cache-components?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to prerender a subset of dynamic routes, serve App Shells for the rest, and upgrade them after the first visit
- [Vercel Data Cache: A progressive cache, integrated with Next.js](https://vercel.com/blog/vercel-cache-api-nextjs-cache?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related)
- [React Router on Vercel](https://vercel.com/docs/frameworks/frontend/react-router?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy React Router applications with SSR or SPA mode, then configure the Vercel preset, streaming, caching, and analyti
- [Features](https://vercel.com/docs/build-output-api/features?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/partial-prerendering/quickstart.graph.md](/docs/partial-prerendering/quickstart.graph.md?from=related&source_path=%2Fdocs%2Fpartial-prerendering%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

- A project deployed on Vercel
- A Next.js App Router project (PPR is available with Next.js)

## Enable Cache Components

As of Next.js 16, PPR is built into the Cache Components model. Opt in by enabling `cacheComponents` in your `next.config.ts`:

```ts filename="next.config.ts" framework=nextjs-app
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

With Cache Components, data is dynamic by default; you choose what to cache with the `use cache` directive.

> **💡 Note:** Enabling `cacheComponents` inverts rendering defaults across your whole project. Existing routes that read uncached data can surface build errors until that data is wrapped in a `<Suspense>` boundary or marked with `use cache`.

## Cache a static shell

Mark the content you want prerendered with `use cache`. This becomes the static shell:

```tsx filename="app/page.tsx" framework=nextjs-app
type Post = { id: number; title: string };

async function Posts() {
  'use cache';
  // Cached: prerendered into the static shell
  const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json(),
  );
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return <Posts />;
}
```

A page whose content is entirely cached prerenders into a full static shell. On a cache hit it is served from the CDN without invoking your function; your function still runs when the shell is regenerated. By default the shell revalidates on an interval, so set how long it stays fresh with [`cacheLife`](https://nextjs.org/docs/app/api-reference/functions/cacheLife) and invalidate it on demand with [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag).

## Stream dynamic content

Add per-request content and wrap it in a `<Suspense>` boundary:

```tsx filename="app/page.tsx" framework=nextjs-app
import { Suspense } from 'react';
import { cookies } from 'next/headers';

type Post = { id: number; title: string };

async function Posts() {
  'use cache';
  // Cached: prerendered into the static shell
  const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json(),
  );
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

async function Greeting() {
  const user = (await cookies()).get('user')?.value;
  return <p>Welcome back, {user}</p>;
}

export default function Page() {
  return (
    <main>
      {/* Cached: prerendered into the static shell */}
      <Posts />
      {/* Dynamic: streamed in per request */}
      <Suspense fallback={<p>Loading…</p>}>
        <Greeting />
      </Suspense>
    </main>
  );
}
```

Keep per-request data inside a `<Suspense>` boundary. With Cache Components, reading uncached data like `cookies()` outside a boundary fails the build with an error about uncached data accessed outside a `<Suspense>` boundary, rather than silently rendering the whole route dynamically. The boundary is what lets Next.js prerender the static shell and stream the dynamic part into it.

## Next steps

- [How PPR works](/docs/partial-prerendering#how-ppr-works): the request flow from build through revalidation
- [Usage and pricing](/docs/partial-prerendering#usage-and-pricing): the cost of PPR requests


---

[View full sitemap](/docs/sitemap)
