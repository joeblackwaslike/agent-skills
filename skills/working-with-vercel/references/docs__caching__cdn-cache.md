---
title: Vercel CDN Cache
product: vercel
url: /docs/caching/cdn-cache
canonical_url: "https://vercel.com/docs/caching/cdn-cache"
last_updated: 2026-09-14
type: conceptual
prerequisites:
  - /docs/caching
related:
  - /docs/regions
  - /docs/incremental-static-regeneration
  - /docs/headers
  - /docs/caching/cdn-cache/purge
  - /docs/caching/runtime-cache
summary: "Learn how Vercel's CDN cache stores your content across a global network to reduce latency and origin load."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching/cdn-cache.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "672363761312e348f0f9198ca6714c520a9e24083e5b86c1f097f54b5a12900f"
---

# Vercel CDN Cache

Vercel's CDN caches your content (including pages, API responses, and static assets) in data centers around the world, closer to your users than your origin server. When someone requests cached content, Vercel serves it from the nearest [region](/docs/regions), cutting latency, reducing load on your origin, and making your site feel faster everywhere.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CDN no longer caches responses with Vary: Cookie](https://vercel.com/changelog/vary-cookie-responses-no-longer-cached?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related)
- [Vercel WAF for Blob is now in beta](https://vercel.com/changelog/vercel-waf-for-blob-is-now-in-beta?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related)
- [How to add per-request CSP nonces to CDN-cached HTML on Vercel](https://vercel.com/kb/guide/csp-nonces-with-cdn-cache?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Use Routing Middleware and a self-fetch to add a fresh CSP nonce to cached HTML without rendering the page again on ever
- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [Set cache control headers for functions](https://vercel.com/kb/guide/set-cache-control-headers?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Learn how to set headers to cache your function's responses.
- [Migrating to Cache Components](https://nextjs.org/docs/app/guides/migrating-to-cache-components?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Learn how to migrate from route segment configs to Cache Components in Next.js.
- [use cache: remote](https://nextjs.org/docs/app/api-reference/directives/use-cache-remote?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Learn how to use the "use cache: remote" directive for persistent, shared caching using remote cache handlers.
- [cacheLife](https://nextjs.org/docs/app/api-reference/functions/cacheLife?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Learn how to use the cacheLife function to set the cache expiration time for a cached function or component.
- [Data Cache for Next.js](https://vercel.com/docs/caching/runtime-cache/data-cache?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
- [Private Storage](https://vercel.com/docs/vercel-blob/private-storage?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=related) — Learn how to use private Vercel Blob storage to serve files with authentication

Full cross-link map for this page: [/docs/caching/cdn-cache.graph.md](/docs/caching/cdn-cache.graph.md?from=related&source_path=%2Fdocs%2Fcaching%2Fcdn-cache&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

CDN caching is available for all deployments and domains on your account, regardless of the [pricing plan](https://vercel.com/pricing).

There are two ways to cache content:

- [Static file caching](#static-files-caching) is automatic for all deployments, requiring no manual configuration
- To cache dynamic content that doesn't require real-time updates, use [Incremental Static Regeneration](/docs/incremental-static-regeneration). For more granular control, you can use `Cache-Control` [headers](/docs/headers#cache-control-header). Review [How to cache responses](#how-to-cache-responses) to learn more.

To learn about cache keys, manually purging the cache, and the differences between invalidate and delete methods, see [Purging Vercel CDN cache](/docs/caching/cdn-cache/purge)

> **💡 Note:** See [Runtime cache](/docs/caching/runtime-cache) for caching data within your
> functions during execution and [Remote cache](/docs/monorepos/remote-caching)
> for caching build artifacts.

## When to use CDN cache

CDN cache is best when you want to cache complete HTTP responses (entire pages, API responses, or static assets) at the edge, close to your users, such as in the following scenarios:

- Static pages that are the same for all users
- API responses that don't change frequently
- Static assets like images, fonts, and JavaScript bundles
- Server-rendered pages with predictable cache lifetimes

**CDN Cache isn't the right fit when**:

- You need user-specific content without the `Vary` header (consider [Runtime Cache](/docs/caching/runtime-cache))
- Responses include sensitive user data
- Content changes on every request to the same url

## How to cache responses

You can cache responses on Vercel with `Cache-Control` headers defined in:

1. Responses from [Vercel Functions](/docs/functions)
2. Route definitions in `vercel.json` or `next.config.js`

You can use any combination of the above options, but if you return `Cache-Control` headers in a Vercel Function, it will override the headers defined for the same route in `vercel.json` or `next.config.js`.

### Using Vercel Functions

To cache the response of Functions on Vercel's CDN, you must include [`Cache-Control`](/docs/headers#cache-control-header) headers with **any** of the following directives:

- `s-maxage=N`
- `s-maxage=N, stale-while-revalidate=Z`
- `s-maxage=N, stale-while-revalidate=Z, stale-if-error=Z`

> **💡 Note:** `proxy-revalidate` is not currently supported.

The following example demonstrates a [function](/docs/functions) that caches its response and revalidates it every 1 second:

**app/api/cache-control-example/route.ts**

```ts filename="app/api/cache-control-example/route.ts" framework=nextjs-app
export async function GET() {
  return new Response('Cache Control example', {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=1',
      'CDN-Cache-Control': 'public, s-maxage=60',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
    },
  });
}
```

**app/api/cache-control-example/route.js**

```js filename="app/api/cache-control-example/route.js" framework=nextjs-app
export async function GET() {
  return new Response('Cache Control example', {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=1',
      'CDN-Cache-Control': 'public, s-maxage=60',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
    },
  });
}
```

**pages/api/cache-control-example.ts**

```ts filename="pages/api/cache-control-example.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.setHeader('Cache-Control', 'public, s-maxage=1');

  return response.status(200).json({ name: 'Timmy Triangle' });
}
```

**pages/api/cache-control-example.js**

```js filename="pages/api/cache-control-example.js" framework=nextjs
export default function handler(request, response) {
  response.setHeader('Cache-Control', 'public, s-maxage=1');

  return response.status(200).json({ name: 'Timmy Triangle' });
}
```

**api/cache-control-example.ts**

```ts filename="api/cache-control-example.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.setHeader('Cache-Control', 'public, s-maxage=1');

  return response.status(200).json({ name: 'Timmy Triangle' });
}
```

**api/cache-control-example.js**

```js filename="api/cache-control-example.js" framework=other
export default function handler(request, response) {
  response.setHeader('Cache-Control', 'public, s-maxage=1');

  return response.status(200).json({ name: 'Timmy Triangle' });
}
```

For direct control over caching on Vercel and downstream CDNs, you can use [CDN-Cache-Control](#cdn-cache-control) headers.

### Using `vercel.json` and `next.config.js`

You can define route headers in `vercel.json` or `next.config.js` files. These headers will be overridden by [headers defined in Function responses](#using-vercel-functions).

The following example demonstrates a `vercel.json` file that adds `Cache-Control` headers to a route:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/about.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=1, stale-while-revalidate=59"
        }
      ]
    }
  ]
}
```

If you're building your app with Next.js, you should use `next.config.js` rather than `vercel.json`. The following example demonstrates a `next.config.js` file that adds `Cache-Control` headers to a route:

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

See [the Next docs](https://nextjs.org/docs/app/api-reference/config/next-config-js) to learn more about `next.config.js`.

### Static files caching

Static files are **automatically cached on Vercel's global network** for the lifetime of the deployment after the first request.

- If a static file is unchanged, the cached value can persist across deployments due to the hash used in the filename
- Optimized images cached will persist across deployments for both [static images](/docs/image-optimization#local-images-cache-key) and [remote images](/docs/image-optimization#remote-images-cache-key)

#### Browser

- `max-age=N, public`
- `max-age=N, immutable`

Where `N` is the number of seconds the response should be cached. The response must also meet the [caching criteria](/docs/caching/cdn-cache#how-to-cache-responses).

#### Deleting immutable static assets

Immutable static assets are files under `/_next/static/immutable/` and
`/_vercel/immutable/`. They are content-addressed, and Vercel serves them with
`Cache-Control: public, max-age=31536000, immutable`. If you accidentally ship
a secret, credential, or other must-remove content inside an immutable bundle,
you can delete the stored asset immediately instead of waiting for the cache to
expire.

> **⚠️ Warning:** You cannot undo this operation. For ordinary cache invalidation, use [cache
> purging](/docs/caching/cdn-cache/purge) instead. This API is for content that
> must never be servable again.

Send a `POST` request with the asset's path, without a leading slash:

```bash
curl -X POST \
  'https://api.vercel.com/v1/edge-cache/dangerously-delete-immutable-static?projectIdOrName=my-project&teamId=my-team' \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"path": "_next/static/immutable/chunks/example-chunk.js"}'
```

A successful request does three things:

- Permanently deletes the stored asset for both the production and preview
  environments of the project
- Blocks the asset's URL with a `410 Gone` response for seven days across
  Vercel's CDN, effective immediately. This includes copies already cached at
  the edge. After the block expires, the URL returns `404`
- Rotates the project's build hash salt, so your next deployment emits
  different asset URLs

Keep these behaviors in mind:

- **Deleting the asset does not delete the content.** The immutable store
  addresses assets by their content. If the sensitive content still exists in
  your source, your next deployment uploads the same bytes again. Remove or
  replace the content in your source code, deploy, and then delete the old
  asset
- **To recover from a mistaken deletion, deploy again.** The build hash salt
  rotation means the new build references new asset URLs, so your site works
  immediately. The deleted URL keeps returning `410` or `404`, but nothing
  references it anymore
- The `path` must exactly match the stored asset path and start with
  `_vercel/immutable/` or `_next/static/immutable/`. If no asset exists at the
  path, the API returns `404 asset_not_found` and blocks nothing. Projects
  using a [`basePath`](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
  or a microfrontends service prefix store assets under that prefix, and you
  cannot delete those assets with this endpoint
- You need project-update permission on the team, and Vercel rate limits
  requests
- If you serve Vercel through your own CDN, purge it there too. The `410`
  block covers Vercel's CDN, but your CDN may hold the asset with its original
  one-year immutable cache header until you purge it

## Cache control options

You can cache dynamic content through [Vercel Functions](/docs/functions), including SSR, by adding `Cache-Control` [headers](/docs/headers#cache-control-header) to your response. When you specify `Cache-Control` headers in a function, responses will be cached in the region the function was requested from.

See [our docs on Cache-Control headers](/docs/headers#cache-control-header) to learn how to best use `Cache-Control` directives on Vercel's CDN.

### CDN-Cache-Control

Vercel supports two [Targeted Cache-Control headers](https://httpwg.org/specs/rfc9213.html "targeted headers for controlling the cache"):

- `CDN-Cache-Control`, which allows you to control the Vercel CDN Cache or other CDN cache *separately* from the browser's cache. The browser will not be affected by this header
- `Vercel-CDN-Cache-Control`, which allows you to specifically control Vercel's Cache. Neither other CDNs nor the browser will be affected by this header

By default, the headers returned to the browser are as follows:

- `Cache-Control`
- `CDN-Cache-Control`

`Vercel-CDN-Cache-Control` headers are not returned to the browser or forwarded to other CDNs.

To learn how these headers work in detail, see [our dedicated headers docs](/docs/caching/cache-control-headers#cdn-cache-control-header).

The following example demonstrates `Cache-Control` headers that instruct:

- Vercel's Cache to have a [TTL](https://en.wikipedia.org/wiki/Time_to_live "TTL – Time To Live") of `3600` seconds
- Downstream CDNs to have a TTL of `60` seconds
- Clients to have a TTL of `10` seconds

**app/api/cache-control-headers/route.js**

```js filename="app/api/cache-control-headers/route.js" framework=nextjs
export async function GET() {
  return new Response('Cache Control example', {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=10',
      'CDN-Cache-Control': 'max-age=60',
      'Vercel-CDN-Cache-Control': 'max-age=3600',
    },
  });
}
```

**app/api/cache-control-headers/route.ts**

```ts filename="app/api/cache-control-headers/route.ts" framework=nextjs
export async function GET() {
  return new Response('Cache Control example', {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=10',
      'CDN-Cache-Control': 'max-age=60',
      'Vercel-CDN-Cache-Control': 'max-age=3600',
    },
  });
}
```

**app/api/cache-control-headers/route.js**

```js filename="app/api/cache-control-headers/route.js" framework=nextjs-app
export async function GET() {
  return new Response('Cache Control example', {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=10',
      'CDN-Cache-Control': 'max-age=60',
      'Vercel-CDN-Cache-Control': 'max-age=3600',
    },
  });
}
```

**app/api/cache-control-headers/route.ts**

```ts filename="app/api/cache-control-headers/route.ts" framework=nextjs-app
export async function GET() {
  return new Response('Cache Control example', {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=10',
      'CDN-Cache-Control': 'max-age=60',
      'Vercel-CDN-Cache-Control': 'max-age=3600',
    },
  });
}
```

**api/cache-control-headers.js**

```js filename="api/cache-control-headers.js" framework=other
export default function handler(request, response) {
  response.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  response.setHeader('CDN-Cache-Control', 'max-age=60');
  response.setHeader('Cache-Control', 'max-age=10');

  return response.status(200).json({ name: 'Timmy Triangle' });
}
```

**api/cache-control-headers.ts**

```ts filename="api/cache-control-headers.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  response.setHeader('CDN-Cache-Control', 'max-age=60');
  response.setHeader('Cache-Control', 'max-age=10');

  return response.status(200).json({ name: 'Timmy Triangle' });
}
```

If you set `Cache-Control` without a `CDN-Cache-Control`, the Vercel CDN strips `s-maxage` and `stale-while-revalidate` from the response before sending it to the browser. To determine if the response was served from the cache, check the [`x-vercel-cache`](#x-vercel-cache) header in the response.

### Vary header

The `Vary` response header instructs caches to use specific request headers as part of the cache key. This allows you to serve different cached responses to different users based on their request headers.

> **💡 Note:** The `Vary` header only has an effect when used in combination with
> `Cache-Control` headers that enable caching (such as `s-maxage`). Without a
> caching directive, the `Vary` header has no behavior.

When Vercel's CDN receives a request, it combines the cache key (described in the [Cache Invalidation](#cache-invalidation) section) with the values of any request headers specified in the `Vary` header to create a unique cache entry for each distinct combination.

#### High-cardinality headers

Some request headers carry a value that's close to unique per visitor. `Cookie` is the clearest example, since session and analytics cookies differ for everyone. Varying on a header like this gives nearly every request its own cache entry, so almost nothing is served from the cache and the entries that are written are unlikely to be read again.

Vercel's CDN doesn't cache a response whose `Vary` names one of these headers:

| Header   | Why it isn't cacheable                                              |
| -------- | ------------------------------------------------------------------- |
| `Cookie` | Session and analytics cookies give most visitors a distinct value. |

The response is still generated and served normally. It's returned with [`x-vercel-cache: MISS`](#x-vercel-cache), the reason [Vary key denied](/docs/caching/cache-status#vary-key-denied) is recorded in [runtime logs](/docs/logs/runtime), and no cache entry is written for it.

> **💡 Note:** Vercel doesn't drop the header and cache the response anyway. The response
> genuinely differs per value, so serving a stored copy to a different visitor
> would return one visitor's content to another. This matches how `Vary: *` is
> already handled.

If a route you expect to be cached returns `x-vercel-cache: MISS` with this reason, check the `Vary` header your origin sends. If the response doesn't actually change with that header, remove it from `Vary` and the response becomes cacheable again.

#### Use cases

> **💡 Note:** Vercel's CDN already includes the `Accept` and `Accept-Encoding` headers as
> part of the cache key by default. You don't need to explicitly include these
> headers in your `Vary` header.

The most common use case for the `Vary` header is content negotiation, serving different content based on:

- User location (e.g., `X-Vercel-IP-Country`)
- Language preferences (e.g., `Accept-Language`)
- Response format for an API that serves more than one (e.g., a custom `X-Api-Version`)

Pick the narrowest header that captures the difference. Varying on `User-Agent` to serve two layouts, for example, splits the cache across every browser and version string your visitors send, when a header that holds only the value you branch on would produce two entries.

**Example: Country-specific content**

You can use the `Vary` header with Vercel's `X-Vercel-IP-Country` request header to cache different responses for users from different countries:

**app/api/country-specific/route.ts**

```tsx filename="app/api/country-specific/route.ts" framework=nextjs-app
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';

  // Serve different content based on country
  let content;
  if (country === 'US') {
    content = { message: 'Hello from the United States!' };
  } else if (country === 'GB') {
    content = { message: 'Hello from the United Kingdom!' };
  } else {
    content = { message: `Hello from ${country}!` };
  }

  return Response.json(content, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=3600',
      Vary: 'X-Vercel-IP-Country',
    },
  });
}
```

**app/api/country-specific/route.js**

```jsx filename="app/api/country-specific/route.js" framework=nextjs-app
export async function GET(request) {
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';

  // Serve different content based on country
  let content;
  if (country === 'US') {
    content = { message: 'Hello from the United States!' };
  } else if (country === 'GB') {
    content = { message: 'Hello from the United Kingdom!' };
  } else {
    content = { message: `Hello from ${country}!` };
  }

  return Response.json(content, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=3600',
      Vary: 'X-Vercel-IP-Country',
    },
  });
}
```

**pages/api/country-specific.ts**

```tsx filename="pages/api/country-specific.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const country = req.headers['x-vercel-ip-country'] || 'unknown';

  // Serve different content based on country
  let content;
  if (country === 'US') {
    content = { message: 'Hello from the United States!' };
  } else if (country === 'GB') {
    content = { message: 'Hello from the United Kingdom!' };
  } else {
    content = { message: `Hello from ${country}!` };
  }

  // Set caching headers
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.setHeader('Vary', 'X-Vercel-IP-Country');

  res.status(200).json(content);
}
```

**pages/api/country-specific.js**

```jsx filename="pages/api/country-specific.js" framework=nextjs
export default function handler(req, res) {
  const country = req.headers['x-vercel-ip-country'] || 'unknown';

  // Serve different content based on country
  let content;
  if (country === 'US') {
    content = { message: 'Hello from the United States!' };
  } else if (country === 'GB') {
    content = { message: 'Hello from the United Kingdom!' };
  } else {
    content = { message: `Hello from ${country}!` };
  }

  // Set caching headers
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.setHeader('Vary', 'X-Vercel-IP-Country');

  res.status(200).json(content);
}
```

**api/country-specific.ts**

```tsx filename="api/country-specific.ts" framework=other
export default {
  fetch(request) {
    const country = request.headers.get('x-vercel-ip-country') || 'unknown';

    // Serve different content based on country
    let content;
    if (country === 'US') {
      content = { message: 'Hello from the United States!' };
    } else if (country === 'GB') {
      content = { message: 'Hello from the United Kingdom!' };
    } else {
      content = { message: `Hello from ${country}!` };
    }

    return Response.json(content, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600',
        Vary: 'X-Vercel-IP-Country',
      },
    });
  },
};
```

**api/country-specific.js**

```jsx filename="api/country-specific.js" framework=other
export default {
  fetch(request) {
    const country = request.headers.get('x-vercel-ip-country') || 'unknown';

    // Serve different content based on country
    let content;
    if (country === 'US') {
      content = { message: 'Hello from the United States!' };
    } else if (country === 'GB') {
      content = { message: 'Hello from the United Kingdom!' };
    } else {
      content = { message: `Hello from ${country}!` };
    }

    return Response.json(content, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600',
        Vary: 'X-Vercel-IP-Country',
      },
    });
  },
};
```

#### Setting the `Vary` header

You can set the `Vary` header in the same ways you set other response headers:

**In Vercel Functions**

**app/api/data/route.ts**

```tsx filename="app/api/data/route.ts" framework=nextjs-app
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return Response.json(
    { data: 'This response varies by country' },
    {
      status: 200,
      headers: {
        Vary: 'X-Vercel-IP-Country',
        'Cache-Control': 's-maxage=3600',
      },
    },
  );
}
```

**app/api/data/route.js**

```jsx filename="app/api/data/route.js" framework=nextjs-app
export async function GET(request) {
  return Response.json(
    { data: 'This response varies by country' },
    {
      status: 200,
      headers: {
        Vary: 'X-Vercel-IP-Country',
        'Cache-Control': 's-maxage=3600',
      },
    },
  );
}
```

**pages/api/data.ts**

```tsx filename="pages/api/data.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Vary', 'X-Vercel-IP-Country');
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json({ data: 'This response varies by country' });
}
```

**pages/api/data.js**

```jsx filename="pages/api/data.js" framework=nextjs
export default function handler(req, res) {
  res.setHeader('Vary', 'X-Vercel-IP-Country');
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json({ data: 'This response varies by country' });
}
```

**api/data.ts**

```tsx filename="api/data.ts" framework=other
export default {
  fetch(request) {
    return Response.json(
      { data: 'This response varies by country' },
      {
        status: 200,
        headers: {
          Vary: 'X-Vercel-IP-Country',
          'Cache-Control': 's-maxage=3600',
        },
      },
    );
  },
};
```

**api/data.js**

```jsx filename="api/data.js" framework=other
export default {
  fetch(request) {
    return Response.json(
      { data: 'This response varies by country' },
      {
        status: 200,
        headers: {
          Vary: 'X-Vercel-IP-Country',
          'Cache-Control': 's-maxage=3600',
        },
      },
    );
  },
};
```

**Using `vercel.json`**

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/api/data",
      "headers": [
        {
          "key": "Vary",
          "value": "X-Vercel-IP-Country"
        },
        {
          "key": "Cache-Control",
          "value": "s-maxage=3600"
        }
      ]
    }
  ]
}
```

**Using `next.config.js`**

If you're building your app with Next.js, use `next.config.js`:

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/data',
        headers: [
          {
            key: 'Vary',
            value: 'X-Vercel-IP-Country',
          },
          {
            key: 'Cache-Control',
            value: 's-maxage=3600',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

#### Multiple `Vary` headers

You can specify multiple headers in a single `Vary` value by separating them with commas:

```js
res.setHeader('Vary', 'X-Vercel-IP-Country, Accept-Language');
```

This will create separate cache entries for each unique combination of country and language preference.

#### Best practices

- Use `Vary` headers selectively, as each additional header exponentially increases the number of cache entries. This doesn't directly impact your bill, but can result in more cache misses than desired
- Only include headers that meaningfully impact content generation
- Prefer a header with a small, known set of values. A header that's close to unique per visitor isn't cacheable at all, as described in [High-cardinality headers](#high-cardinality-headers)
- Avoid varying on `Referer` for traffic-source rendering: browsers send only the referring origin cross-site, and same-origin navigation sends full URLs that fragment the cache. A query parameter, or reading the header in your function, captures the source without the fragmentation
- Consider combining multiple variations into a single header value when possible
- Set `Vary` on the routes that need it rather than globally in middleware or a proxy, so one header doesn't make every route uncacheable

## Cacheable response criteria

The `Cache-Control` field is an HTTP header specifying caching rules for client (browser) requests and server responses. A cache must obey the requirements defined in the `Cache-Control` header.

For server responses to be successfully cached with Vercel's CDN, the following criteria must be met:

- Request uses `GET` or `HEAD` method.
- Request doesn't contain `Range` header.
- Request doesn't contain `Authorization` header.
- Response uses `200`, `404`, `410`, `301`, `302`, `307` or `308` status code.
- Response doesn't exceed `10MB` in content length (`20MB` for streaming [Vercel Function](/docs/functions) responses, see [Limits](#limits)).
- Response doesn't contain the `set-cookie` header.
- Response doesn't contain the `private`, `no-cache` or `no-store` directives in the `Cache-Control` header.
- Response doesn't contain `Vary: *` header, which is treated as equivalent to `Cache-Control: private`.
- Response doesn't contain a `Vary` header naming a [high-cardinality header](#high-cardinality-headers), such as `Cookie`.

Vercel **doesn't allow bypassing the cache for static files** by design.

## Cache invalidation

To learn about cache keys, manually purging the cache, and the differences between invalidate and delete methods, see [Purging Vercel CDN Cache](/docs/caching/cdn-cache/purge).

## `x-vercel-cache`

The `x-vercel-cache` header is included in HTTP responses to the client, and describes the state of the cache.

See [our headers docs](/docs/headers/response-headers#x-vercel-cache) to learn more.

## Limits

Vercel's CDN Cache is segmented [by region](/docs/regions). The following caching limits apply to [Vercel Function](/docs/functions) responses:

- Max cacheable response size:
  - Streaming functions: **20MB**
  - Non-streaming functions: **10MB**
- Max cache time: **1 year**
  - `s-maxage`
  - `max-age`
  - `stale-while-revalidate`

While you can put the maximum time for server-side caching, cache times are best-effort and not guaranteed. If an asset is requested often, it is more likely to live the entire duration. If your asset is rarely requested (e.g. once a day), it may be evicted from the regional cache.

### `proxy-revalidate`

Vercel doesn't currently support using `proxy-revalidate` for server-side caching. Vercel's CDN supports [`stale-if-error`](/docs/caching/cache-control-headers#stale-if-error).


---

[View full sitemap](/docs/sitemap)
