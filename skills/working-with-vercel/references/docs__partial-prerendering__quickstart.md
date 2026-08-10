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
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "81d4fe38774942899876118776a85d39dcbe9fc19a0df7792218565fc40022de"
---

# Getting started with Partial Prerendering

This guide walks through setting up [Partial Prerendering (PPR)](/docs/partial-prerendering) in a Next.js App Router project. Vercel serves the cached static shell from its CDN, then streams the dynamic parts from your function into the same response.

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
