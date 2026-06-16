---
title: Getting started with ISR
product: vercel
url: /docs/incremental-static-regeneration/quickstart
canonical_url: "https://vercel.com/docs/incremental-static-regeneration/quickstart"
last_updated: 2026-03-20
type: tutorial
prerequisites:
  - /docs/incremental-static-regeneration
related:
  - /docs/build-output-api/v3
  - /docs/incremental-static-regeneration
  - /docs/incremental-static-regeneration/limits-and-pricing
  - /docs/observability/monitoring
summary: Learn how to set up Incremental Static Regeneration (ISR) with time-based and on-demand revalidation.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/incremental-static-regeneration/quickstart.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "f5ff32cdbd1121af1b99ee102be6e62b66b6e9f91ca8678497c341702008cb89"
---

# Getting started with ISR

This guide helps you set up Incremental Static Regeneration (ISR) with your Vercel project. With ISR, you can regenerate pages without rebuilding and redeploying your site. When a page with ISR enabled regenerates, Vercel fetches the most recent data and updates the cache. There are two ways to trigger regeneration:

- **Time-based revalidation**: Regeneration that recurs automatically at a set interval
- **On-demand revalidation**: Regeneration that you trigger explicitly through an API call

You also control when pages are first cached:

- **Pre-render at build time**: Generate pages during the build so the first visitor gets an instant cache hit. This increases build time but avoids slow first requests.
- **Generate on first request**: Skip the build step and let the first visitor trigger generation at runtime. This keeps builds fast but means the first request for each page is slower (a cache miss).

A common pattern is to pre-render popular pages at build time and let the rest generate on demand.

## Prerequisites

- A project deployed on Vercel
- A supported framework: Next.js, SvelteKit, Nuxt, Astro, Gatsby, or a custom solution using the [Build Output API](/docs/build-output-api/v3)

| Framework                  | ISR support                       | On-demand revalidation             |
| -------------------------- | --------------------------------- | ---------------------------------- |
| **Next.js** (App Router)   | `revalidate` route segment config | `revalidatePath` / `revalidateTag` |
| **Next.js** (Pages Router) | `revalidate` in `getStaticProps`  | `res.revalidate` API route         |
| **SvelteKit**              | `config.isr` export               | `x-prerender-revalidate` header    |
| **Nuxt**                   | `routeRules` with `isr` option    | `x-prerender-revalidate` header    |
| **Astro**                  | Server output with ISR config     | Framework-specific                 |
| **Gatsby**                 | Deferred Static Generation (DSG)  | Framework-specific                 |

## Time-based revalidation

Time-based revalidation purges the cache for an ISR route automatically at a set interval. When the interval elapses and a visitor requests the page, Vercel serves the stale version and regenerates the page in the background.

> For \["nextjs"]:

When using Next.js with the `pages` router, you can enable ISR by adding a `revalidate` property to the object returned from `getStaticProps`:

> For \["nextjs-app"]:

When using Next.js with the App Router, you can enable ISR by using the `revalidate` route segment config for a layout or page.

> For \["sveltekit"]:

To deploy a SvelteKit route with ISR, export a config object with an `isr` property. The following example demonstrates a SvelteKit route that Vercel will deploy with ISR, revalidating the page every 60 seconds:

> For \["nuxt"]:

To enable ISR in a Nuxt route, add a `routeRules` option to your , as shown in the example below:

```ts filename="apps/example/page.tsx" framework=nextjs-app
export const revalidate = 10; // seconds
```

```js filename="apps/example/page.jsx" framework=nextjs-app
export const revalidate = 10; // seconds
```

```ts filename="pages/example/index.tsx" framework=nextjs
export async function getStaticProps() {
  /* Fetch data here */

  return {
    props: {
      /* Add something to your props */
    },
    revalidate: 10, // Seconds
  };
}
```

```js filename="pages/example/index.jsx" framework=nextjs
export async function getStaticProps() {
  /* Fetch data here */

  return {
    props: {
      /* Add something to your props */
    },
    revalidate: 10, // Seconds
  };
}
```

```ts filename="example-route/+page.server.ts" framework=sveltekit
export const config = {
  isr: {
    expiration: 10,
  },
};
```

```js filename="example-route/+page.server.js" framework=sveltekit
export const config = {
  isr: {
    expiration: 10,
  },
};
```

```ts filename="nuxt.config.ts" framework=nuxt
export default defineNuxtConfig({
  routeRules: {
    // This route will be revalidated
    // every 10 seconds in the background
    '/blog-posts': { isr: 10 },
  },
});
```

```js filename="nuxt.config.js" framework=nuxt
export default defineNuxtConfig({
  routeRules: {
    // This route will be revalidated
    // every 10 seconds in the background
    '/blog-posts': { isr: 10 },
  },
});
```

### Example

The following example renders a list of blog posts from a demo API, revalidating every 10 seconds:

> For \['sveltekit']:

First, create a  file that exports your `config` object with `isr` configured and fetches your data:

> For \['sveltekit']:

Then, create a  file that renders the list of blog posts:

> For \['nuxt']:

After enabling ISR in your  file [as described above](#time-based-revalidation), create an API route that fetches your data:

> For \['nuxt']:

Then, fetch the data and render it in a `.vue` file:

```ts v0="build" filename="pages/blog-posts/index.tsx" framework=nextjs
export async function getStaticProps() {
  const res = await fetch('https://api.vercel.app/blog');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

interface Post {
  title: string;
  id: number;
}

export default function BlogPosts({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

```js v0="build" filename="pages/blog-posts/index.jsx" framework=nextjs
export async function getStaticProps() {
  const res = await fetch('https://api.vercel.app/blog');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function BlogPosts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

```ts v0="build" filename="app/blog-posts/page.tsx" framework=nextjs-app
export const revalidate = 10; // seconds

interface Post {
  title: string;
  id: number;
}

export default async function Page() {
  const res = await fetch('https://api.vercel.app/blog');
  const posts = (await res.json()) as Post[];
  return (
    <ul>
      {posts.map((post: Post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </ul>
  );
}
```

```js v0="build" filename="app/blog-posts/page.jsx" framework=nextjs-app
export const revalidate = 10; // seconds

export default async function Page() {
  const res = await fetch('https://api.vercel.app/blog');
  const posts = await res.json();

  return (
    <ul>
      {posts.map((post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </ul>
  );
}
```

To test this code, run the appropriate `dev` command for your framework and navigate to the `/blog-posts/` route.

You should see a bulleted list of blog posts.

## On-demand revalidation

On-demand revalidation lets you purge the cache for an ISR route at any time, without waiting for a time interval to elapse. This is useful when your content changes based on external events, such as a CMS publish or a webhook.

Tag-based revalidation is the recommended approach for granular control. Instead of revalidating entire paths, you tag cached content and invalidate specific tags when the underlying data changes.

> For \['sveltekit']:

To trigger revalidation with SvelteKit:

1. Set an `BYPASS_TOKEN` Environment Variable with a secret value
2. Assign your Environment Variable to the `bypassToken` config option for your route:

3) Send a `GET` or `HEAD` API request to your route with the following header:

```bash
x-prerender-revalidate: bypass_token_here
```

> For \['nuxt']:

To trigger revalidation with Nuxt:

1. Set an `BYPASS_TOKEN` Environment Variable with a secret value
2. Assign your Environment Variable to the `bypassToken` config option in `nitro.config` file:

3) Assign your Environment Variable to the `bypassToken` config option in `nuxt.config` file:

4. Send a `GET` or `HEAD` API request to your route with the following header:

```bash
x-prerender-revalidate: bypass_token_here
```

> For \["nextjs", "nextjs-app"]:

To revalidate a page on demand with Next.js:

1. Create an Environment Variable which will store a revalidation secret
2. Create an API Route that checks for the secret, then triggers revalidation

The following example demonstrates an API route that triggers revalidation if the query paramater `?secret` matches a secret Environment Variable:

```js v0="build" filename="pages/api/revalidate.js" framework=nextjs
export default async function handler(request, response) {
  // Check for secret to confirm this is a valid request
  if (request.query.secret !== process.env.MY_SECRET_TOKEN) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  try {
    // This should be the actual path, not a rewritten path
    // e.g. for "/blog-posts/[slug]" this should be "/blog-posts/1"
    await response.revalidate('/blog-posts');
    return response.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return response.status(500).send('Error revalidating');
  }
}
```

```ts v0="build" filename="pages/api/revalidate.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // This should be the actual path, not a rewritten path
    // e.g. for "/blog-posts/[slug]" this should be "/blog-posts/1"
    await res.revalidate('/blog-posts');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
```

```ts v0="build" filename="app/api/revalidate/route.ts" framework=nextjs-app
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.MY_SECRET_TOKEN) {
    return new Response('Invalid credentials', {
      status: 401,
    });
  }

  revalidatePath('/blog-posts');

  return Response.json({
    revalidated: true,
    now: Date.now(),
  });
}
```

```js v0="build" filename="app/api/revalidate/route.js" framework=nextjs-app
import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.MY_SECRET_TOKEN) {
    return new Response('Invalid credentials', {
      status: 401,
    });
  }

  revalidatePath('/blog-posts');

  return Response.json({
    revalidated: true,
    now: Date.now(),
  });
}
```

> For \["nextjs"]:

> For \["nextjs", "nextjs-app", "sveltekit"]:

See the [time-based revalidation section above](#time-based-revalidation) for a full ISR example.

## Templates

## Next steps

- [How ISR works](/docs/incremental-static-regeneration#how-isr-works): Understand the request flow from build time through revalidation
- [Caching on Vercel](/docs/incremental-static-regeneration#caching-on-vercel): Compare ISR with other caching strategies
- [ISR usage and pricing](/docs/incremental-static-regeneration/limits-and-pricing): Understand costs and optimization strategies
- [Monitor ISR on Vercel](/docs/observability/monitoring): Track ISR performance in your dashboard


---

[View full sitemap](/docs/sitemap)
