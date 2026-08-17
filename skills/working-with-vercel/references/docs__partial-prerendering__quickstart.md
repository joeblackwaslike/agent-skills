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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3963e3d84b299e3e30fcab293fec715ce687125ca13d317ca3277342689a46d5"
---

# Getting started with Partial Prerendering

This guide walks through setting up [Partial Prerendering (PPR)](/docs/partial-prerendering) in a Next.js App Router project. Vercel serves the cached static shell from its CDN, then streams the dynamic parts from your function into the same response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Caching](https://nextjs.org/docs/app/getting-started/caching?from=related) — Learn how to cache data and UI in Next.js
- [PPR Platform Guide](https://nextjs.org/docs/app/guides/ppr-platform-guide?from=related) — A guide for platform engineers on implementing PPR support, from basic origin rendering to optimized CDN integration.
- [Implementing PPR in an Adapter](https://nextjs.org/docs/app/api-reference/adapters/implementing-ppr-in-an-adapter?from=related) — Implement Partial Prerendering support in an adapter using fallback output and cache hooks.
- [Public pages](https://nextjs.org/docs/app/guides/public-static-pages?from=related) — Learn how to build public, "static" pages that share data across users, such as landing pages, list pages (products, blo
- [How can I prerender my application on Vercel?](https://vercel.com/kb/guide/how-can-i-prerender-my-application-on-vercel?from=related) — Learn how to enable prerendering with your frontend framework on Vercel for better performance and SEO.
- [ISR with Cache Components](https://nextjs.org/docs/app/guides/incremental-static-regeneration-cache-components?from=related) — Learn how to prerender a subset of dynamic routes, serve App Shells for the rest, and upgrade them after the first visit
- [Data Cache](https://vercel.com/docs/caching/runtime-cache/data-cache?from=related) — Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [React Router](https://vercel.com/docs/frameworks/frontend/react-router?from=related) — Learn how to use Vercel's features with React Router as a framework.

Full cross-link map for this page: [/docs/partial-prerendering/quickstart.graph.md](/docs/partial-prerendering/quickstart.graph.md)
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
