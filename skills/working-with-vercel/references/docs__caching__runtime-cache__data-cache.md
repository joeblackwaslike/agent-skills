---
title: Data Cache for Next.js
product: vercel
url: /docs/caching/runtime-cache/data-cache
canonical_url: "https://vercel.com/docs/caching/runtime-cache/data-cache"
last_updated: 2026-08-21
type: conceptual
prerequisites:
  - /docs/caching/runtime-cache
  - /docs/caching
related:
  - /docs/frameworks/full-stack/nextjs
  - /docs/caching/runtime-cache
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/pricing/regional-pricing
  - /docs/caching/cdn-cache
summary: Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching/runtime-cache/data-cache.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "42853c669ee9ec5c63fa726f958a0e56a540ca5df8f9463c29fd50ba38640448"
---

# Data Cache for Next.js

> **💡 Note:** Data cache is unifying with Runtime Cache. New teams starting on October 30,
> 2026 will be moved to Runtime Cache. [Read
> more](#data-cache-is-unifying-with-runtime-cache)

Data cache is a specialized, granular cache introduced with Next.js 13 for storing [segment-level data](https://nextjs.org/docs/app/getting-started/fetching-data) while using [Next.js App Router](/docs/frameworks/full-stack/nextjs). When using [Next.js caching APIs](https://nextjs.org/docs/app/getting-started/caching) such as `fetch` or `unstable_cache`, Vercel automatically scaffolds globally distributed infrastructure for you with no additional configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Data Cache is moving to Runtime Cache](https://vercel.com/changelog/data-cache-is-moving-to-runtime-cache)
- [Optimize Runtime Cache on Vercel](https://vercel.com/kb/guide/optimize-runtime-cache-reads-on-vercel) — Diagnose rising Runtime Cache usage, trace reads to tags and code paths, and reduce avoidable reads while checking write
- [Vercel Data Cache: A progressive cache, integrated with Next.js](https://vercel.com/blog/vercel-cache-api-nextjs-cache)
- [How can I share my Vercel cache across deployments?](https://vercel.com/kb/guide/share-vercel-cache-across-deployments-nextjs) — Learn how to reuse cached responses across deployments with the Next.js App Router and the Vercel Data Cache.
- [Simplifying runtime caching on Vercel](https://vercel.com/blog/simplifying-runtime-caching-on-vercel)
- [How to move from time-based to on-demand revalidation](https://vercel.com/kb/guide/how-to-move-to-on-demand-revalidation) — Replace fixed revalidation timers with scoped updates triggered by changes to content, product data, or other applicatio
- [How to reduce ISR revalidation costs](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs) — Reduce ISR costs by analyzing Incremental Static Regeneration \\(ISR\\) behavior to find pages and tags that revalidate to
- [Purging Vercel CDN Cache](https://vercel.com/docs/caching/cdn-cache/purge) — Learn how to invalidate and delete cached content on Vercel's CDN, including cache keys and manual purging options.
- [Cache Status and Reasons](https://vercel.com/docs/caching/cache-status) — Understand the cache status and reason shown for each request in Vercel logs, and what causes a response to miss, bypass
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.
- [Storage on Vercel Marketplace](https://vercel.com/docs/marketplace-storage) — Connect Postgres, Redis, NoSQL, and other storage solutions through the Vercel Marketplace. Run SQL queries, edit data,
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/caching/runtime-cache/data-cache.graph.md](/docs/caching/runtime-cache/data-cache.graph.md)
<!-- /docsgraph:related -->

- Find out [how legacy Data cache works](#how-data-cache-works)

> **💡 Note:** Next.js 15 uses Data cache through `fetch` or `unstable_cache`. In Next.js 16,
> these APIs continue to use Data cache as a separate layer. When adopting
> Cache Components, use `use cache: remote` to store cached data in [Runtime
> Cache](/docs/caching/runtime-cache). Next.js 16 scopes `use cache: remote`
> entries to a build, so a new deployment can't read them, unlike `fetch` and
> `unstable_cache` entries. See [how a new deployment affects cached
> data](/docs/caching/runtime-cache#how-a-new-deployment-affects-cached-data).

## Data cache is unifying with Runtime Cache

As announced [here](/blog/how-we-built-runtime-cache), Vercel is unifying Data cache with [Runtime Cache](/docs/caching/runtime-cache). Runtime Cache will serve Next.js `fetch` caching and `unstable_cache` instead of Data cache. You don't need to change your code. Runtime Cache is faster under load, gives each project 8–10x more cache storage than Data cache, and offers deeper cache observability.

- **New teams**: Starting October 30, 2026, teams created from that date onward use Runtime Cache for `fetch` caching and `unstable_cache` in every project, on every Next.js version. No action is needed.
- **Existing teams**: Vercel will migrate your team to Runtime Cache and will notify you of your team's migration timeline by email and in-product notification before anything changes. If you are on Enterprise, your Vercel account team will contact you directly with migration details.

When your team migrates, Vercel repopulates existing `fetch`, `unstable_cache`, and `use cache: remote` entries from live traffic, so expect some additional cache misses and backend requests at first. Vercel keeps entries written through [`getCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache).

After migration, `fetch` and `unstable_cache` usage counts toward Runtime Cache usage, and Vercel bills it at [Runtime Cache rates](/docs/pricing/regional-pricing). To estimate the impact before your team migrates, review your current Data cache reads and writes in [**Runtime Cache** under Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache\&title=Go+to+Observability+Runtime+Cache). If your usage is higher than expected, [optimize your Data cache usage](#optimize-your-data-cache-usage) before your team migrates.

### Optimize your Data cache usage

To find what drives your Data cache reads and writes, copy the prompt below into your coding agent from your project's directory:

**Agent prompt**

````text
# Optimize Data Cache usage

Investigate and reduce Vercel Data Cache usage from fetch caching and unstable_cache in this Next.js project.

Data Cache stores the results of fetch calls that use force-cache, next.revalidate, or next.tags, and of functions wrapped in unstable_cache. In Next.js 14, a plain fetch with no options is cached too. This task covers only those sources.

Stay read-only. Do not edit files, change Vercel settings, purge caches, or deploy until I approve a specific change.

## How usage is counted

- Billing and the Usage page count 8 KB units, one unit per 8 KB rounded up per read or write. A 1 KB read is 1 unit. A 100 KB read is 13 units.
- Observability counts operations. Each read or write counts once, whatever its size.
- Units per read is the entry size divided by 8 KB, rounded up, per entry. Averaging sizes understates units when they vary.
- A write unit costs about 10 times a read unit, so compare cost, not counts.

## Steps

1. Pin the scope to one project, one environment, and two time windows of equal length. Use before and after the increase, or the last 30 days.

2. Ask me for these numbers, since you can't read the dashboard:
- From Usage: Data Cache reads and writes, by project and by region.
- From Observability, Runtime Cache, which opens on Data Cache until your team migrates to Runtime Cache: reads, writes, hit rate, and the table of entries sorted by reads, including entry size, or the table of tags. The tag table columns need Observability Plus. The Hit Rate column in the entries and tags tables counts every read that didn't miss, including stale and revalidated reads, while the Cache Hit Rate chart counts only fresh hits, so compare like with like.
- From Observability, Vercel Functions: invocations. If the team has Observability Plus, get these with `vercel metrics vercel.function_invocation.count --project <name> --since <window>` instead of asking.

3. Check the Next.js version in package.json. In Next.js 14, fetch is cached by default unless the code opts out. In Next.js 15 and later, fetch is not cached unless the code opts in.

4. Find every Data Cache call. For each one, note the file, line, cache key or URL, tags, revalidate value, and callers.

```bash
rg -nU 'force-cache|next:\s*\{[^}]*(revalidate|tags)' -t ts -t js
rg -n 'unstable_cache\(' -t ts -t js
rg -n 'export const (revalidate|fetchCache|dynamic)\s*=' -t ts -t js
rg -n 'revalidateTag\(|revalidatePath\(' -t ts -t js
```

In Next.js 14, also list plain fetch calls in server components and route handlers. Match each busy tag from the tag table to these calls.

5. Estimate reads per request by dividing reads by invocations. Build-time fetches read and write the Data Cache without a function invocation, so reads that rise on deploy days with no traffic change are build reads; subtract them first. Estimate units per read from entry size. If reads per request is much higher than the number of entries a request needs, look for repeated or looped calls.

6. Work out what changed:
- Reads rose with invocations: traffic grew. Check CDN caching and bot traffic.
- Reads per request rose: a deploy added calls. Compare deploys around that date with vercel list, vercel inspect, and vercel logs.
- Units rose but reads didn't: entries got bigger. Check entry size.
- Hit rate fell: keys got too specific, revalidate got shorter, or entries were evicted. On Hobby and Pro, all projects in a team share one Data Cache, and the dashboard purge clears it for every project in the team.
- Reads and writes rose together: revalidate is too short, or keys change on every request.

7. Look for these patterns:
- The same unstable_cache helper called more than once per request. Next.js deduplicates identical fetch calls in a render, but not unstable_cache. Wrap the helper in React's cache function.
- fetch or unstable_cache called once per item in a loop. Fetch the list in one call and cache it as one entry, as long as it stays smaller than the items it replaces and under 2 MB.
- A cached fetch URL or unstable_cache key that includes a user ID, session, or timestamp. Cache on a value with fewer options, such as locale, and leave per-user data uncached.
- A low revalidate value in a shared layout. The lowest value puts every route under it on that ISR interval, so each regeneration runs your function. The shared fetch entry is rewritten once per interval, on the next request after it expires.
- A short revalidate on data that rarely changes. Raise it, or switch to on-demand revalidation with revalidateTag.
- Caching data that is tiny, static, or cheap to fetch. Put it in the bundle or an environment variable instead.
- A dynamic route whose output is the same for every visitor. Make it static or use ISR, so the function and its cache reads don't run.

8. Report each finding with the file and line, estimated reads and units per request, the dashboard number it explains, the proposed fix, and its risk, such as more writes, a lower hit rate, or more origin traffic. Order findings by cost. Ask me which fix to apply first, then apply one at a time.

9. After each fix deploys, compare two windows of equal length. Reads and units per request should drop. Writes, function duration, and origin traffic should not rise. Hit rate should hold.
````

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
- New caching code in Next.js 16 projects that use Cache Components (use `use cache: remote` with [Runtime Cache](/docs/caching/runtime-cache) instead)

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

> **💡 Note:** You need to have a [member](/docs/rbac/access-roles#member-role) role to perform this task.

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

You can observe your project's data cache usage in [**Runtime Cache** under Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache\&title=Go+to+Observability+Runtime+Cache) in your project sidebar. The Runtime Cache page provides visibility into what's stored in your project's data cache, along with insights like cache hit rate, cache reads, cache writes, and tag revalidations.

The **Cache Hit Rate** chart counts only fresh hits. The **Hit Rate** column in the entries and tags tables counts every read that didn't miss the cache, including stale and revalidated reads, so it can be higher than the chart for the same period.

You can also track data cache usage per request in [**Logs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Open+Logs), under request metrics.

## Limits and usage

| Data cache property | Limit                               |
| ------------------- | ----------------------------------- |
| Item size           | 2 MB (items larger won't be cached) |
| Tags per item       | 128 tags                            |
| Maximum tag length  | 256 bytes                           |

### Revalidation rate limit

On-demand revalidation calls made from your functions, such as `revalidateTag()`, `revalidatePath()`, and `expireTag()`, are rate limited per plan:

| Plan       | Revalidation calls per second |
| ---------- | ----------------------------- |
| Hobby      | 50 per team                   |
| Pro        | 200 per team                  |
| Enterprise | 500 per project               |

The limit counts calls, not tags. It's averaged over a 30-second window, so short bursts above it are allowed. When you exceed it, the call fails with an HTTP `429` response that includes a `retry-after` header, and the cache is left unchanged. Retry the call after that delay.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
