---
title: Partial Prerendering State
product: vercel
url: /docs/partial-prerendering/ppr-state
canonical_url: "https://vercel.com/docs/partial-prerendering/ppr-state"
last_updated: 2026-08-04
type: reference
prerequisites:
  - /docs/partial-prerendering
related:
  - /docs/partial-prerendering
  - /docs/caching/cache-status
summary: "Understand the PPR state that describes how a Partial Prerendering page was served: as a static shell, a partial resume, or fully dynamic."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/partial-prerendering/ppr-state.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "8159c1a8c6b88b250cde4eb897027627b5433c9b2c60261955990a0db84971df"
---

# Partial Prerendering State

For [Partial Prerendering (PPR)](/docs/partial-prerendering) routes, Vercel records a **PPR state** that describes how the page was served for a request. A PPR response is a cached static **shell** with dynamic holes that are **postponed** during prerendering, then resumed and streamed in per request. The PPR state tells you which parts of that model actually applied. It shows whether the whole page came from the static shell, part of it was resumed dynamically, or all of it was rendered dynamically.

## States

Every PPR request resolves to one of these states:

| State     | What it means                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `Static`  | The whole page was prerendered. It was served entirely from the static shell, with no dynamic holes to resume. |
| `Partial` | A static shell was served, and the postponed dynamic parts were resumed and streamed from your function.       |
| `Dynamic` | The static shell was empty, so the entire response came from postponed content resumed by your function.       |

## Static

The page was fully prerendered, so the entire response came from the static shell and there were no postponed parts to resume. Nothing needed to be rendered dynamically for this request, so your function was not invoked.

This is the fastest PPR outcome: the whole page is served from cached static content. A route lands here when it has no dynamic data, or when all of its data is cacheable, so it can be prerendered into the static shell at build time or through later regeneration.

The [cache status](/docs/caching/cache-status) observed for a `Static` request can be `HIT`, `MISS`, `PRERENDER`, `STALE`, or `REVALIDATED`.

For example, a page whose data is all cacheable prerenders into a full static shell:

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

![Image](https://vercel.com/front/docs/partial-prerendering/ppr-state/ppr-state-static-light-v2.png?lightbox)

## Partial

A static shell was served immediately, and the page's postponed dynamic parts were resumed and streamed in from your function. This is the core Partial Prerendering behavior: the visitor gets the cached shell right away, while the dynamic holes are filled per request.

A `Partial` state means the page has both a meaningful static shell and dynamic content, such as a cached layout around a personalized or request-specific section.

The [cache status](/docs/caching/cache-status) observed for a `Partial` request can be `HIT`, `MISS`, `PRERENDER`, `STALE`, or `REVALIDATED`.

For example, a cached list of posts with a personalized greeting resumed per request:

```tsx filename="app/page.tsx" framework=nextjs-app
import { Suspense } from 'react';
import { cookies } from 'next/headers';

type Post = { id: number; title: string };

async function Posts() {
  'use cache';
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

![Image](https://vercel.com/front/docs/partial-prerendering/ppr-state/ppr-state-partial-light-v2.png?lightbox)

## Dynamic

The static shell was empty, so the entire response came from postponed content resumed by your function. There was no static content to serve ahead of the dynamic render.

Since the page is fully dynamic, the [cache status](/docs/caching/cache-status) for a `Dynamic` request can only be `MISS`.

For example, an empty `<Suspense>` boundary above `<body>` in the root layout opts the route out of a static shell, so nothing below the boundary is prerendered:

```tsx filename="app/layout.tsx" framework=nextjs-app
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Empty fallback above <body>: nothing below this boundary is
          prerendered, so the route's static shell is empty */}
      <Suspense fallback={null}>
        <body>{children}</body>
      </Suspense>
    </html>
  );
}
```

```tsx filename="app/inbox/page.tsx" framework=nextjs-app
import { cookies } from 'next/headers';

type Message = { id: string; subject: string };

export default async function InboxPage() {
  // Per-request data: nothing on this page can be prerendered
  const token = (await cookies()).get('session-token')?.value;
  const messages: Message[] = await fetch('https://api.example.com/inbox', {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>{message.subject}</li>
      ))}
    </ul>
  );
}
```

With an empty shell, there is nothing for the CDN to serve ahead of the render, so the visitor waits on your function for the first byte. A route that consistently shows `Dynamic` is the signal to move whatever can be cached back above the boundary so a shell exists.

![Image](https://vercel.com/front/docs/partial-prerendering/ppr-state/ppr-state-dynamic-light-v2.png?lightbox)


---

[View full sitemap](/docs/sitemap)
