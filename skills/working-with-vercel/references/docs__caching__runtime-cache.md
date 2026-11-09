---
title: Runtime Cache
product: vercel
url: /docs/caching/runtime-cache
canonical_url: "https://vercel.com/docs/caching/runtime-cache"
last_updated: 2026-08-28
type: conceptual
prerequisites:
  - /docs/caching
related:
  - /docs/caching/runtime-cache/data-cache
  - /docs/caching/cdn-cache
  - /docs/monorepos/remote-caching
  - /docs/regions
  - /docs/skew-protection
summary: Vercel Runtime Cache is a specialized cache that stores responses from data fetches in Vercel functions
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching/runtime-cache.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f1f6c431c317e862d427b7176987ee9b1237c84451118f0eacf76d54a2989c2f"
---

# Runtime Cache

> Runtime Cache is available on all plans

Runtime cache is a regional, ephemeral cache you can use for storing and retrieving data across Vercel Functions, Routing middleware, and build execution within a Vercel region. It lets you cache data close to where your code runs, reduce duplicate work, and control invalidation with TTLs and tags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Data Cache is moving to Runtime Cache](https://vercel.com/changelog/data-cache-is-moving-to-runtime-cache)
- [Run background tasks with Celery on Vercel](https://vercel.com/changelog/run-background-tasks-with-celery-on-vercel)
- [Caching audits: Five antipatterns that cost you performance and money](https://vercel.com/kb/guide/caching-antipatterns) — Five caching antipatterns from hundreds of Vercel technical audits: write amplification, deploy-wiped caches, spinner sh
- [Control CDN caching for shared and personalized pages on Vercel](https://vercel.com/kb/guide/cdn-cache-personalized-pages) — Control CDN caching for shared and personalized Next.js pages. Set cache headers, separate per-user content, and verify
- [How to add per-request CSP nonces to CDN-cached HTML on Vercel](https://vercel.com/kb/guide/csp-nonces-with-cdn-cache) — Use Routing Middleware and a self-fetch to add a fresh CSP nonce to cached HTML without rendering the page again on ever
- [How to optimize Next.js and Sitecore Content SDK apps](https://vercel.com/kb/guide/how-to-optimize-next.js-sitecore-content-sdk) — Learn how to choose a rendering strategy, configure proxy middleware, and optimize costs for Next.js and Sitecore Conten
- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [cacheLife](https://nextjs.org/docs/app/api-reference/functions/cacheLife) — Learn how to use the cacheLife function to set the cache expiration time for a cached function or component.
- [Vercel Data Cache: A progressive cache, integrated with Next.js](https://vercel.com/blog/vercel-cache-api-nextjs-cache)
- [Simplifying runtime caching on Vercel](https://vercel.com/blog/simplifying-runtime-caching-on-vercel)
- [Caching and Revalidating (Previous Model)](https://nextjs.org/docs/app/guides/caching-without-cache-components) — Learn how to cache and revalidate data using fetch options, unstable_cache, and route segment configs for projects not u
- [Introducing the Runtime Cache API](https://vercel.com/changelog/introducing-the-runtime-cache-api)

Full cross-link map for this page: [/docs/caching/runtime-cache.graph.md](/docs/caching/runtime-cache.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Runtime cache may not share the same cache between build time and runtime depending on whether the region where the build executed matches the runtime region.

> **💡 Note:** Vercel is unifying [Data cache](/docs/caching/runtime-cache/data-cache) with
> Runtime Cache. Starting October 30, 2026, new teams use Runtime Cache for
> Next.js `fetch` caching and `unstable_cache`. Vercel will notify existing
> teams of their migration timeline. See [Data cache is unifying with Runtime
> Cache](/docs/caching/runtime-cache/data-cache#data-cache-is-unifying-with-runtime-cache).

- Find out [how runtime cache works](#how-runtime-cache-works)
- [When to use it](#when-to-use-runtime-cache)
- Get started with the [framework-specific examples](#using-runtime-cache)
- See [what runtime cache costs](#pricing)

> **💡 Note:** For caching complete HTTP responses (entire pages, API responses) in Vercel regions, see [CDN cache](/docs/caching/cdn-cache). For caching build artifacts, see [Remote cache](/docs/monorepos/remote-caching).

## When to use runtime cache

Runtime cache is best when your functions fetch the same data multiple times or perform expensive computations that can be reused, such as in the following scenarios:

- API calls that return the same data across multiple requests
- Database queries that don't change frequently
- Expensive computations you want to reuse
- Data fetching in server components or API routes

Runtime cache is not a good fit for:

- User-specific data that differs for each request
- Data that must be fresh on every request
- Data that must be retained for its full TTL (entries may be evicted sooner if the cache reaches its storage limit)
- Data that must survive a deployment, if you cache it with `use cache: remote` in Next.js 16 (see [how a new deployment affects cached data](#how-a-new-deployment-affects-cached-data))
- Complete HTTP responses (use [CDN cache](/docs/caching/cdn-cache) instead)

## How runtime cache works

Runtime cache stores data in a non-durable cache close to where your function executes. Each [region](/docs/regions) where your function runs has its own cache, allowing reads and writes to happen in the same region for low latency. It has the following characteristics:

- **Regional**: Each region has its own cache
- **Isolated by environment**: Each deployment environment (`preview` and `production`) uses its own cache, so they never share cached data
- **Scoped by plan**: On Pro and Enterprise, each project uses its own cache. On Hobby, all projects in your team share a single cache. See [storage scope by plan](#storage-scope-by-plan)
- **Kept across deployments**: Runtime cache storage is keyed by owner, project, environment, and item key, with no deployment component, so a new deployment doesn't clear stored entries. Whether a new deployment can still read an entry depends on the key your framework writes it under. See [how a new deployment affects cached data](#how-a-new-deployment-affects-cached-data)
- **Expiration and invalidation**: Entries expire on their TTL and can be invalidated by calling `expireTag`
- **Ephemeral**: Each cache has a storage limit. When a cache reaches this limit, Vercel evicts (removes) the entries that haven't been accessed recently to free up space for new entries
- **Automatic**: When runtime cache is enabled, Vercel handles caching for you
- **Framework-agnostic**: Works with all frameworks

The cache sits between your function and your data source, reducing the need to repeatedly fetch the same data. See [limits and usage](#limits-and-usage) for information on item size, tags per item, and maximum tag length.

### How a new deployment affects cached data

Whether a new deployment can read an existing runtime cache entry depends on the key the entry was written under. Vercel keeps runtime cache entries in storage across deployments, so deploying doesn't clear them.

| How you cached the data                                                                    | Readable after a new deployment |
| ------------------------------------------------------------------------------------------ | --------------------------------- |
| `getCache` from `@vercel/functions`, with keys you choose                                   | Yes                               |
| `fetch` with `force-cache` or `unstable_cache` ([Data cache](/docs/caching/runtime-cache/data-cache), or Runtime Cache on new and migrated teams) | Yes                     |
| `use cache: remote` in Next.js 16                                                           | Not today                         |

Next.js includes the build ID in every `use cache: remote` cache key, or the `deploymentId` when one is configured. On Vercel, Next.js projects with [Skew Protection](/docs/skew-protection) enabled get a `deploymentId` set from the deployment's ID. Either way, a new build produces new keys, so the previous build's entries are no longer reachable and each deployment starts with an empty cache for that directive. Expect a burst of traffic to your data sources after each deploy while the cache refills.

Next.js does this on purpose. A cached function's identity hash or the shape of its return value can change between builds, so reusing an older entry risks serving stale or malformed data. Next.js is working on keeping `use cache: remote` entries readable across deployments, so treat the behavior in this section as how Next.js 16 works today rather than a permanent property of the directive. For the full key composition, see the Next.js [`use cache: remote`](https://nextjs.org/docs/app/api-reference/directives/use-cache-remote) reference.

If your data must stay cached after a deployment, cache it with `fetch` and `cache: 'force-cache'` or with `unstable_cache`, which both store entries in [Data cache](/docs/caching/runtime-cache/data-cache), or write entries yourself with [`getCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache) and a key you control. For a worked example with the Next.js App Router, see [How can I share my Vercel cache across deployments?](/kb/guide/share-vercel-cache-across-deployments-nextjs).

## Using runtime cache

You can cache your Vercel function with any framework by using the functions of the helper method [`getCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache).

### Runtime cache with any framework

This example caches data fetched from the API so that it expires after 1 hour and adds a tag to the cache entry so you can invalidate it later from code. Because you choose the cache key, entries written this way stay readable after a new deployment:

```ts filename="api/your-function.ts"

import { getCache } from '@vercel/functions';

export default {
  async fetch(request) {
    const cache = getCache();

    // Get a value from cache
    const value = await cache.get('somekey');

    if (value) {
      return new Response(JSON.stringify(value));
    }

    const res = await fetch('https://api.vercel.app/blog');
    const originValue = await res.json();

    // Set a value in cache with TTL and tags
    await cache.set('somekey', originValue, {
      ttl: 3600, // 1 hour in seconds
      tags: ['example-tag'],
    });

    return new Response(JSON.stringify(originValue));
  },
};
```

### Runtime cache with Next.js

With Next.js, you can use runtime cache or data cache in the following ways:

| Next.js version      | Runtime cache                                                                                                                                         | Data cache                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Next.js 16 and above | [`use cache: remote`](#using-use-cache:-remote) ([not readable after a new deployment today](#how-a-new-deployment-affects-cached-data)) or [fetch with `getCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache) | [fetch with `force-cache`](#using-fetch-with-force-cache)                                                   |
| Next.js 15           | [fetch with `getCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache)                                                    | [fetch with `force-cache`](#using-fetch-with-cache-options) or [`unstable_cache`](#using-unstable_cache)   |
| Next.js 14 and below | [fetch with `getCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache)                                                    | [fetch](/docs/caching/runtime-cache/data-cache)                                                            |

### Next.js 16 and above

With Next.js 16, you can cache data at runtime in two ways:

- **`use cache: remote`**: A directive that caches entire functions or components with Runtime cache. Requires enabling `cacheComponents` in your config.
- **`fetch` with `force-cache`**: Caches individual fetch requests without additional configuration with [Data cache](/docs/caching/runtime-cache/data-cache).

#### Using use cache: remote

Use the `use cache: remote` directive at the file, component, or function level to cache the output of a function or component. Next.js 16 keys these entries by build, so a new deployment can't read the entries the previous one wrote. See [how a new deployment affects cached data](#how-a-new-deployment-affects-cached-data) for the alternatives when your data must outlive a deploy.

> **💡 Note:** `use cache` is in-memory by default. This means that it is ephemeral, and disappears when the instance that served the request is shut down. `use cache: remote` is a declarative way telling the system to store the cached output in a remote cache such Vercel runtime cache.

First, enable the `cacheComponents` flag in your `next.config.ts` file:

```ts filename="next.config.ts"
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

Then, use the `use cache: remote` directive in your code. This example caches data so that it expires after 1 hour and adds a tag to the cache entry so you can invalidate it later from code:

```ts filename="app/page.tsx"
import { cacheLife, cacheTag } from 'next/cache';

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}

async function getData() {
  'use cache: remote'
  cacheTag('example-tag')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/data');
  return response.json();
}
```

You can also use runtime cache in API routes:

```ts filename="app/api/products/route.ts"
import { cacheLife } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

#### Using fetch with force-cache

If you don't enable `cacheComponents`, you can use `fetch` with `cache: 'force-cache'` to cache individual fetch requests:

```ts filename="app/page.tsx"
export default async function Page() {
  const res = await fetch('https://api.example.com/blog', {
    cache: 'force-cache',
    next: {
      revalidate: 3600, // revalidate in background every hour
      tags: ['blog'],
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

### Next.js 15

In Next.js 15, use the `fetch()` API with `cache: 'force-cache'` or `unstable_cache` to store data in [Data cache](/docs/caching/runtime-cache/data-cache).

#### Using fetch with cache options

Use `cache: 'force-cache'` to persist data in the cache:

```ts filename="app/page.tsx"
export default async function Page() {
  const res = await fetch('https://api.example.com/blog', {
    cache: 'force-cache',
  });
  const data = await res.json();

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
```

For time-based revalidation, combine `cache: 'force-cache'` with the `next.revalidate` option:

```ts filename="app/page.tsx"
export default async function Page() {
  const res = await fetch('https://api.example.com/blog', {
    cache: 'force-cache',
    next: {
      revalidate: 3600, // revalidate in background every hour
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

For tag-based revalidation, combine `cache: 'force-cache'` with the `next.tags` option:

```ts filename="app/page.tsx"
export default async function Page() {
  const res = await fetch('https://api.example.com/blog', {
    cache: 'force-cache',
    next: {
      tags: ['blog'],
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

Then invalidate the cache using `revalidateTag`:

```ts filename="app/actions.ts"
'use server';

import { revalidateTag } from 'next/cache';

export async function invalidateBlog() {
  revalidateTag('blog');
}
```

#### Using unstable\_cache

For non-fetch data sources, use `unstable_cache`:

```ts filename="app/page.tsx"
import { unstable_cache } from 'next/cache';

const getCachedData = unstable_cache(
  async () => {
    // Fetch from database, API, or other source
    const data = await db.query('SELECT * FROM posts');
    return data;
  },
  ['posts'], // Cache key
  {
    revalidate: 3600, // 1 hour
    tags: ['posts'],
  }
);

export default async function Page() {
  const data = await getCachedData();

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
```

### Next.js 14 and below

If you're using Next.js 14 or below, see [Data Cache](/docs/caching/runtime-cache/data-cache) for the legacy caching approach or use the framework-agnostic [`getCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache) function.

### Revalidation

You can control how long data stays cached using the following revalidation options:

#### Time-based revalidation

This example revalidates the cache every hour:

> **💡 Note:** The Next.js examples are for Next.js 16 and above. For Next.js 15 and below, see [Data Cache](/docs/caching/runtime-cache/data-cache).

**pages/api/products.ts**

```ts filename="pages/api/products.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';
import { cacheLife, cacheTag } from 'next/cache';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const data = await getProducts();
  return response.status(200).json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**pages/api/products.js**

```js filename="pages/api/products.js" framework=nextjs
import { cacheLife, cacheTag } from 'next/cache';

export default async function handler(request, response) {
  const data = await getProducts();
  return response.status(200).json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**app/api/products/route.ts**

```ts filename="app/api/products/route.ts" framework=nextjs-app
import { cacheLife } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**app/api/products/route.js**

```js filename="app/api/products/route.js" framework=nextjs-app
import { cacheLife } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**api/products.ts**

```ts filename="api/products.ts" framework=other
import { getCache } from '@vercel/functions';

export default {
  async fetch(request: Request) {
    const cache = getCache();

    // Try to get from cache
    const cachedData = await cache.get('products');

    if (cachedData) {
      return Response.json(cachedData);
    }

    // Fetch from origin
    const response = await fetch('https://api.example.com/products');
    const data = await response.json();

    // Store in cache with TTL
    await cache.set('products', data, {
      ttl: 3600, // 1 hour in seconds
    });

    return Response.json(data);
  },
};
```

**api/products.js**

```js filename="api/products.js" framework=other
import { getCache } from '@vercel/functions';

export default {
  async fetch(request) {
    const cache = getCache();

    // Try to get from cache
    const cachedData = await cache.get('products');

    if (cachedData) {
      return Response.json(cachedData);
    }

    // Fetch from origin
    const response = await fetch('https://api.example.com/products');
    const data = await response.json();

    // Store in cache with TTL
    await cache.set('products', data, {
      ttl: 3600, // 1 hour in seconds
    });

    return Response.json(data);
  },
};
```

#### Tag-based revalidation

This example associates the `products` tag with the data:

**pages/api/products.ts**

```ts filename="pages/api/products.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';
import { cacheLife, cacheTag } from 'next/cache';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const data = await getProducts();
  return response.status(200).json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**pages/api/products.js**

```js filename="pages/api/products.js" framework=nextjs
import { cacheLife, cacheTag } from 'next/cache';

export default async function handler(request, response) {
  const data = await getProducts();
  return response.status(200).json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**app/api/products/route.ts**

```ts filename="app/api/products/route.ts" framework=nextjs-app
import { cacheLife, cacheTag } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**app/api/products/route.js**

```js filename="app/api/products/route.js" framework=nextjs-app
import { cacheLife, cacheTag } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

**api/products.ts**

```ts filename="api/products.ts" framework=other
import { getCache } from '@vercel/functions';

export default {
  async fetch(request: Request) {
    const cache = getCache();

    // Try to get from cache
    const cachedData = await cache.get('products');

    if (cachedData) {
      return Response.json(cachedData);
    }

    // Fetch from origin
    const response = await fetch('https://api.example.com/products');
    const data = await response.json();

    // Store in cache with TTL and tags
    await cache.set('products', data, {
      ttl: 3600, // 1 hour in seconds
      tags: ['products'],
    });

    return Response.json(data);
  },
};
```

**api/products.js**

```js filename="api/products.js" framework=other
import { getCache } from '@vercel/functions';

export default {
  async fetch(request) {
    const cache = getCache();

    // Try to get from cache
    const cachedData = await cache.get('products');

    if (cachedData) {
      return Response.json(cachedData);
    }

    // Fetch from origin
    const response = await fetch('https://api.example.com/products');
    const data = await response.json();

    // Store in cache with TTL and tags
    await cache.set('products', data, {
      ttl: 3600, // 1 hour in seconds
      tags: ['products'],
    });

    return Response.json(data);
  },
};
```

You can then revalidate the cache for any data associated with the `products` tag by using the `revalidateTag` function. For example, use a server action:

```ts filename="app/actions.ts"
'use server';

import { revalidateTag } from 'next/cache';

export async function invalidateProductsCache() {
  revalidateTag('products');
}
```

#### Path-based revalidation

This example revalidates the cache for the `/products` path using a server action:

```ts filename="app/actions.ts"
'use server';

import { revalidatePath } from 'next/cache';

export async function invalidateProductsPage() {
  revalidatePath('/products');
}
```

## Working with CDN cache

Runtime cache can work alongside CDN caching in two ways:

1. **With [Vercel ISR](/docs/incremental-static-regeneration)**: Vercel handles CDN caching for your pages and routes, while runtime cache stores the data fetches within your functions
2. **With manual CDN caching** (shown below): You set `Cache-Control` headers to cache HTTP responses at the CDN, while runtime cache stores data fetches within your functions

This section covers the manual approach. If you're using [Vercel ISR](/docs/incremental-static-regeneration), runtime cache operates independently as described in [limits and usage](#limits-and-usage).

When you've set up runtime cache with a serverless function and manual CDN caching, the following happens:

1. Your function runs and checks the runtime cache in the region where it is executed for data
2. If that region's runtime cache has the data, it returns the data immediately
3. If not, your function fetches the data from origin and stores it in that region's runtime cache
4. Your function generates a response using the data
5. If you configured [CDN cache](/docs/caching/cdn-cache) via `Cache-Control` headers, it will cache the complete response in [Vercel regions](/docs/regions)

This example uses runtime cache to fetch and cache product data, and CDN cache to cache the complete API response:

```ts filename="app/api/products/route.ts"
import { cacheLife } from 'next/cache';

export async function GET() {
  const products = await getProducts();

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60', // CDN caches for 60 seconds
    },
  });
}

async function getProducts() {
  'use cache: remote' // Runtime cache
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

In this example:

- Runtime cache stores product data in the region for 1 hour (3600 seconds)
- CDN cache stores the complete HTTP response in the regional cache for 60 seconds
- If the CDN cache expires, the function runs but can still use runtime-cached data
- If both caches expire, the function fetches fresh data from the origin

## Observability

You can observe your project's Runtime cache usage in the [**Runtime Cache**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache\&title=Go+to+Runtime+cache+Observability) section of the [**Observability**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability\&title=Try+Observability) section in the sidebar under your project in the Vercel dashboard.

The **Runtime Cache** section provides graphs for:

- Cache reads and writes
- Cache hit rate
- On-demand revalidations

You can also see a tabular list of runtime cache tags used in your project with cache reads, writes, hit rate, and revalidation times.

## Pricing

Runtime cache usage is billed as **Runtime Cache Reads** and **Runtime Cache Writes**. Both are priced by the region where your functions run, so the same usage costs different amounts in different regions. Runtime cache is billed separately from [ISR](/docs/incremental-static-regeneration/limits-and-pricing) reads and writes, but uses the same unit of measurement:

- **Read unit**: One read unit equals 8 KB of data read from the runtime cache
- **Write unit**: One write unit equals 8 KB of data written to the runtime cache

Runtime cache is free on the Hobby plan within the monthly allotment shown below, counted across all projects on the team. Vercel will send you emails as you are nearing your usage limits. You will **not** be charged for exceeding them, but runtime cache is paused for the rest of the period, typically up to 30 days (see [Hobby billing cycle](/docs/plans/hobby#hobby-billing-cycle)). Pro teams pay for usage with their [monthly credit](/docs/plans/pro-plan#monthly-credit), then at the on-demand rate, shown below as a range across all regions.

| Resource | Hobby Included | On-demand Rates |
| --- | --- | --- |
| [Runtime Cache Reads](/docs/caching/runtime-cache#pricing) | 1M/month | $0.40 - $0.64 per 1M read units |
| [Runtime Cache Writes](/docs/caching/runtime-cache#pricing) | 200K/month | $4.00 - $6.40 per 1M write units |


For the exact rate in a specific region, see [regional pricing](/docs/pricing/regional-pricing#specific-region-pricing). Enterprise rates are listed under [Enterprise regional pricing](/docs/pricing/miu#regional-pricing). To see how this fits into your overall bill, see [pricing on Vercel](/docs/pricing#managed-infrastructure).

## Limits and usage

| Runtime Cache property | Limit     |
| ---------------------- | --------- |
| Item size              | 2 MB      |
| Tags per item          | 128 tags  |
| Maximum tag length     | 256 bytes |

### Revalidation rate limit

Tag-based purge calls made from your functions are rate limited per plan. This applies to `invalidateByTag()`, `dangerouslyDeleteByTag()`, and `getCache().expireTag()` from `@vercel/functions`, and to `revalidateTag()`, `revalidatePath()`, and `updateTag()` from `next/cache`:

| Plan       | Revalidation calls per second |
| ---------- | ----------------------------- |
| Hobby      | 50 per team                   |
| Pro        | 200 per team                  |
| Enterprise | 500 per project               |

The limit counts calls, not tags. An API that accepts several tags in one call, such as `invalidateByTag()` from `@vercel/functions`, uses one call for all of them. It's averaged over a 30-second window, so short bursts above it are allowed.

When you exceed the limit, Vercel rejects the call and leaves the cache unchanged. What you see depends on the function that you called:

- `invalidateByTag()` and `dangerouslyDeleteByTag()` throw an error. Its message includes the status code `429`. Catch the error and retry the call after a short delay.
- `revalidateTag()`, `revalidatePath()`, and `updateTag()` don't throw. A rejected call logs a warning in your [runtime logs](/docs/logs/runtime). On Next.js 14 and below, the function instance then skips further revalidation calls for several seconds without a warning.
- `getCache().expireTag()` doesn't throw. It resolves the same way as a call that succeeded.

Your code can't detect a rejected call from the functions that don't throw, so keep those calls under the limit. For example, pass an array of tags to `getCache().expireTag()` to expire all of them in one call.

> **💡 Note:** TTL and tag updates aren't reconciled between deployments. If you need to update cache behavior after a deployment, purge the runtime cache or modify the cache key. For which entries a new deployment can still read, see [how a new deployment affects cached data](#how-a-new-deployment-affects-cached-data).

Runtime cache operates independently from [Incremental Static Regeneration](/docs/incremental-static-regeneration). If you use both caching layers, manage them separately using their respective invalidation methods or use the same cache tag for both to manage them together.

### Storage scope by plan

Your plan determines whether your projects share a single runtime cache or whether each project gets its own:

| Plan       | Runtime cache storage                          |
| ---------- | ---------------------------------------------- |
| Hobby      | All projects in your team share a single cache |
| Pro        | Each project uses its own cache                |
| Enterprise | Each project uses its own cache                |

Every plan splits the cache by deployment environment, so `production` and `preview` never share cached data. Runtime cache and [Data cache](/docs/caching/runtime-cache/data-cache) also use separate storage, so they don't compete for the same space.

On Hobby, where your projects share a cache, they share its storage limit and its eviction policy. A project that writes a lot of data can evict entries that belong to your other projects.

### Storage and eviction

Every runtime cache has a fixed storage limit. When a cache reaches this limit, Vercel uses a least recently used (LRU) eviction policy: it removes the entries that haven't been accessed recently first. You can monitor your cache size and eviction activity in the [**Runtime Cache**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache\&title=Go+to+Runtime+cache+Observability) section of the **Observability** tab.

Usage of runtime cache is charged per read and write unit. See [pricing](#pricing).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
