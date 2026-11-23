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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/partial-prerendering/quickstart.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "135275b4e3b0c1739081b7c85d813b214d1c11e1a7fcb6415c981811b4265109"
---

# Getting started with Partial Prerendering

This guide walks through setting up [Partial Prerendering (PPR)](/docs/partial-prerendering) in a Next.js App Router project. Vercel serves the cached static shell from its CDN, then streams the dynamic parts from your function into the same response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Control CDN caching for shared and personalized pages on Vercel](https://vercel.com/kb/guide/cdn-cache-personalized-pages) — Control CDN caching for shared and personalized Next.js pages. Set cache headers, separate per-user content, and verify
- [Partial prerendering: Building towards a new default rendering model for web applications](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model)
- [How to Integrate Next.js with Prismic's Headless CMS](https://vercel.com/kb/guide/how-to-integrate-nextjs-with-prismic) — Learn how to connect Next.js with Prismic's CMS and deploy the integrated website to Vercel
- [Caching](https://nextjs.org/docs/app/getting-started/caching) — Learn how to cache data and UI in Next.js
- [Optimizing hard navigations](https://vercel.com/kb/guide/optimizing-hard-navigations) — Learn how to improve performance for navigations that require a full page reload
- [Vercel Data Cache: A progressive cache, integrated with Next.js](https://vercel.com/blog/vercel-cache-api-nextjs-cache)
- [Implementing Partial Prerendering on your platform](https://nextjs.org/docs/app/guides/ppr-platform-guide) — A guide for platform engineers on implementing PPR support, from basic origin rendering to optimized CDN integration.
- [Incremental Static Regeneration with Cache Components](https://nextjs.org/docs/app/guides/incremental-static-regeneration-cache-components) — Learn how to prerender a subset of dynamic routes, serve App Shells for the rest, and upgrade them after the first visit
- [Introducing Serverless Pre-Rendering (SPR)](https://vercel.com/blog/serverless-pre-rendering)
- [React Router on Vercel](https://vercel.com/docs/frameworks/frontend/react-router) — Deploy React Router applications with SSR or SPA mode, then configure the Vercel preset, streaming, caching, and analyti
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [Cache Status and Reasons](https://vercel.com/docs/caching/cache-status) — Understand the cache status and reason shown for each request in Vercel logs, and what causes a response to miss, bypass

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

A page whose content is entirely cached prerenders into a full static shell. On a cache hit it is served from the CDN without invoking your function; your function still runs when the shell is regenerated. By default the shell revalidates on an interval, so set how long it stays fresh with [`cacheLife`](https://nextjs.org/docs/app/api-reference/functions/cacheLife), tag it with [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag), and invalidate it on demand with [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
