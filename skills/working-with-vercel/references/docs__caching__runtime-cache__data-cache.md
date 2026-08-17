---
title: Data Cache for Next.js
product: vercel
url: /docs/caching/runtime-cache/data-cache
canonical_url: "https://vercel.com/docs/caching/runtime-cache/data-cache"
last_updated: 2026-07-27
type: conceptual
prerequisites:
  - /docs/caching/runtime-cache
  - /docs/caching
related:
  - /docs/frameworks/full-stack/nextjs
  - /docs/caching/runtime-cache
  - /docs/caching/cdn-cache
  - /docs/deployments/environments
  - /docs/incremental-static-regeneration
summary: Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching/runtime-cache/data-cache.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "005a65a03acee9585bc7901def5e2b2c1400e95a8bade4a87698391cd1a61acf"
---

# Data Cache for Next.js

> **🔒 Permissions Required**: Data Cache


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I share my Vercel cache across deployments?](https://vercel.com/kb/guide/share-vercel-cache-across-deployments-nextjs?from=related) — Learn how to reuse cached responses across deployments with the Next.js App Router and the Vercel Data Cache.
- [Revalidating](https://nextjs.org/docs/app/getting-started/revalidating?from=related) — Learn how to revalidate cached data using time-based and on-demand strategies.
- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins?from=related) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [Migrating to Cache Components](https://nextjs.org/docs/app/guides/migrating-to-cache-components?from=related) — Learn how to migrate from route segment configs to Cache Components in Next.js.
- [ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration?from=related) — Learn how to create or update static pages at runtime with Incremental Static Regeneration.
- [Cache Status](https://vercel.com/docs/caching/cache-status?from=related) — Understand the cache status and reason shown for each request in Vercel logs, and what causes a response to miss, bypass
- [Node.js](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package?from=related) — Learn about available APIs when working with Vercel Functions.
- [Purge CDN Cache](https://vercel.com/docs/caching/cdn-cache/purge?from=related) — Learn how to invalidate and delete cached content on Vercel's CDN, including cache keys and manual purging options.
- [Create React App](https://vercel.com/docs/frameworks/frontend/create-react-app?from=related) — Learn how to use Vercel's features with Create React App
- [Marketplace](https://vercel.com/docs/marketplace-storage?from=related) — Connect Postgres, Redis, NoSQL, and other storage solutions through the Vercel Marketplace. Run SQL queries, edit data,

Full cross-link map for this page: [/docs/caching/runtime-cache/data-cache.graph.md](/docs/caching/runtime-cache/data-cache.graph.md)
<!-- /docsgraph:related -->

Data cache is a specialized, granular cache introduced with Next.js 13 for storing [segment-level data](https://nextjs.org/docs/app/getting-started/fetching-data) while using [Next.js App Router](/docs/frameworks/full-stack/nextjs). When using [Next.js caching APIs](https://nextjs.org/docs/app/getting-started/caching) such as `fetch` or `unstable_cache`, Vercel automatically scaffolds globally distributed infrastructure for you with no additional configuration.

- Find out [how Data cache works](#how-data-cache-works)
- [When to use it](#when-to-use-data-cache)
- Get started with the [examples](#using-data-cache)

> **💡 Note:** For Next.js 15 and above, see [Runtime Cache](/docs/caching/runtime-cache) for the recommended caching approach. Data cache is for Next.js 14 and below.

## When to use data cache

Data cache is best when your Next.js App Router pages fetch data that can be reused across requests:

- API calls that return the same data across multiple requests
- Database queries that don't change frequently
- Data fetching in server components or route handlers
- Pages with a mix of static and dynamic data

Data cache is not a good fit for:

- User-specific data that differs for each request
- Data that must be fresh on every request
- Complete HTTP responses (use [CDN Cache](/docs/caching/cdn-cache) instead)
- Next.js 15 and above (use [Runtime Cache](/docs/caching/runtime-cache) instead)

## How Data cache works

Data cache stores data in a regional cache close to where your function executes. It has the following characteristics:

- **Regional**: Every region in which your function runs has an independent cache, so data used in server-side rendering or route handlers is cached close to where the function executes
- **Isolated by environment**: Each [deployment environment](/docs/deployments/environments) (`production` or `preview`) uses its own cache, so they never share cached data
- **Scoped by plan**: On Hobby and Pro, all projects in your team share a single cache. On Enterprise, each project uses its own cache. See [storage scope by plan](#storage-scope-by-plan)
- **Persistent across deployments**: Cached data persists across deployments unless you explicitly invalidate it
- **Time-based revalidation**: All cached data can define a revalidation interval, after which the data is marked as stale, triggering a re-fetch from origin
- **On-demand revalidation**: Any data can be triggered for revalidation on-demand, regardless of the revalidation interval. The revalidation propagates to all regions within 300ms
- **Tag-based revalidation**: Next.js allows associating tags with data, which can be used to revalidate all data with the same tag at once with [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- **Ephemeral**: Each cache has a storage limit. When a cache reaches this limit, Vercel evicts (removes) the entries that haven't been accessed recently to free up space for new entries

## Using data cache

When you deploy a Next.js project that uses [App Router](https://nextjs.org/docs/app) to Vercel, data cache is automatically enabled to cache [segment-level data](https://nextjs.org/docs/app/getting-started/fetching-data) alongside ISR.

### Time-based revalidation

```ts v0="build" filename="app/page.tsx" framework=nextjs
type BlogPosts = Awaited<ReturnType<typeof getStaticProps>>['props']['blog'];

export default function Page({ blog }: { blog: BlogPosts }) {
  return (
    <main>
      <pre>{JSON.stringify(blog, null, 2)}</pre>
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.vercel.app/blog');
  const blog = await res.json();

  return {
    props: {
      blog,
    },
    revalidate: 3600, // 1 hour
  };
}
```

```js v0="build" filename="app/page.jsx" framework=nextjs
export default function Page({ blog }) {
  return (
    <main>
      <pre>{JSON.stringify(blog, null, 2)}</pre>
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.vercel.app/blog');
  const blog = await res.json();

  return {
    props: {
      blog,
    },
    revalidate: 3600, // 1 hour
  };
}
```

```ts v0="build" filename="app/page.tsx" framework=nextjs-app
export default async function Page() {
  const res = await fetch('https://api.vercel.app/blog', {
    next: {
      revalidate: 3600, // 1 hour
    },
  });
  const data = await res.json();

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
```

```js v0="build" filename="app/page.jsx" framework=nextjs-app
export default async function Page() {
  const res = await fetch('https://api.vercel.app/blog', {
    next: {
      revalidate: 3600, // 1 hour
    },
  });
  const data = await res.json();

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
```

### Tag-based revalidation

```ts v0="build" filename="app/page.tsx" framework=all
export default async function Page() {
  const res = await fetch('https://api.vercel.app/blog', {
    next: {
      tags: ['blog'], // Invalidate with revalidateTag('blog') on-demand
    },
  });
  const data = await res.json();

  return '...';
}
```

```js v0="build" filename="app/page.jsx" framework=all
export default async function Page() {
  const res = await fetch('https://api.vercel.app/blog', {
    next: {
      tags: ['blog'], // Invalidate with revalidateTag('blog') on-demand
    },
  });
  const data = await res.json();

  return '...';
}
```

```ts v0="build" filename="app/actions.ts" framework=all
'use server';

import { revalidateTag } from 'next/cache';

export default async function action() {
  revalidateTag('blog');
}
```

```js v0="build" filename="app/actions.js" framework=all
'use server';

import { revalidateTag } from 'next/cache';

export default async function action() {
  revalidateTag('blog');
}
```

### Revalidation behavior

Vercel persists cached data across deployments, unless you explicitly invalidate it using framework APIs like `res.revalidate`, `revalidateTag`, and `revalidatePath`, or by [manually purging the cache](#manually-purging-data-cache). Cache is **not** updated at build time. When invalidated, Vercel updates the data at run time, triggered by the next request to the invalidated path.

When the system triggers a revalidation, Vercel marks the corresponding path or cache tag as stale in every region. The next request to that path or tag, regardless of the region, initiates revalidation and updates the cache globally. Vercel purges and updates the regional cache in all regions within 300ms.

## Manually purging data cache

CDN cache and Data cache are different cache layers. CDN cache stores full HTTP responses, while Data cache stores Next.js data fetch results.

> **⚠️ Warning:** On Hobby and Pro, your projects share a single cache, so purging deletes the
> cached data for every project in your team in that environment. See [storage
> scope by plan](#storage-scope-by-plan).

To purge Data cache from the dashboard:

1. Under your project, open **CDN** in the sidebar.
2. In the sidebar, select **Caches**.
3. In the **Purge cache** section, select **All content**.
4. Under **From which cache layer?**, select **Runtime and Data Cache**.
5. Click **Purge**, then confirm in the modal.

In **Purge history**, this action is logged as a runtime cache purge event.

Purging your data cache will create a temporary increase in request times for users as new data needs to be refetched.

## Observability

You can observe your project's data cache usage in [**Runtime Cache** under Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache\&title=Go+to+Observability+Runtime+Cache) in your project sidebar. The Runtime Cache page provides visibility into what's stored in your project's data cache, along with insights like cache hit rate, cache reads, cache writes, and on-demand revalidations.

You can also track data cache usage per request in [**Logs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Open+Logs), under request metrics.

## Limits and usage

| Data cache property | Limit                               |
| ------------------- | ----------------------------------- |
| Item size           | 2 MB (items larger won't be cached) |
| Tags per item       | 128 tags                            |
| Maximum tag length  | 256 bytes                           |

### Storage scope by plan

Your plan determines whether your projects share a single data cache or whether each project gets its own:

| Plan       | Data cache storage                             |
| ---------- | ---------------------------------------------- |
| Hobby      | All projects in your team share a single cache |
| Pro        | All projects in your team share a single cache |
| Enterprise | Each project uses its own cache                |

Every plan splits the cache by deployment environment, so `production` and `preview` never share cached data. Data cache and [Runtime Cache](/docs/caching/runtime-cache) also use separate storage, so they don't compete for the same space.

When your projects share a cache, they share its storage limit and its eviction policy. A project that writes a lot of data can evict entries that belong to your other projects.

### Storage and eviction

Every data cache has a fixed storage limit. When a cache reaches this limit, Vercel uses a least recently used (LRU) eviction policy: it removes the entries that haven't been accessed recently first. You can monitor your cache size and eviction activity in the [**Runtime Cache section of Observability**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache\&title=Go+to+Observability+Runtime+Cache) section in the sidebar under your project.

### How data cache works with other caches

Data cache works alongside [Incremental Static Regeneration](/docs/incremental-static-regeneration) (ISR) and [CDN Cache](/docs/caching/cdn-cache):

| Scenario                                      | Cache layer      |
| --------------------------------------------- | ---------------- |
| Entirely static pages                         | ISR              |
| Pages with mix of static and dynamic data     | Data cache + ISR |
| Data fetched during function execution        | Data cache       |
| Complete HTTP responses (images, fonts, etc.) | CDN cache        |

When a page contains entirely static data, Vercel uses ISR to generate the whole page. When a page contains a mix of static and dynamic data, the dynamic data is re-fetched when rendering the page. Data cache stores the static portion to avoid slow origin fetches.

Both Data cache and ISR support time-based revalidation, on-demand revalidation, and tag-based revalidation.

## More resources

- [Explore Vercel regions](/docs/regions)
- [Next.js App Router template](/templates/next.js/app-directory)
- [Learn how Data cache works in Next.js](https://nextjs.org/docs/app/guides/caching-without-cache-components#data-cache)


---

[View full sitemap](/docs/sitemap)
