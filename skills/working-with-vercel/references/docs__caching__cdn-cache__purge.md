---
title: Purging Vercel CDN Cache
product: vercel
url: /docs/caching/cdn-cache/purge
canonical_url: "https://vercel.com/docs/caching/cdn-cache/purge"
last_updated: 2026-09-03
type: reference
prerequisites:
  - /docs/caching/cdn-cache
  - /docs/caching
related:
  - /docs/deployments/generated-urls
  - /docs/deployments/promoting-a-deployment
  - /docs/image-optimization
  - /docs/caching/cache-status
  - /docs/functions
summary: "Learn how to invalidate and delete cached content on Vercel's CDN, including cache keys and manual purging options."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching/cdn-cache/purge.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c32ee9075373eecc8212ccb604d2aa7c970e9a3fc8252c35313544ea18d6deee"
---

# Purging Vercel CDN Cache

> Cache purging is available on all plans
>
> Those with the owner and member roles can access this feature

Learn how to [invalidate and delete](#programmatically-purging-vercel-cache) cached content on Vercel's CDN, including cache keys and manual purging options.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CDN now respects Cache-Control headers from external origins by default](https://vercel.com/changelog/vercels-cdn-now-respects-cache-control-headers-from-external-origins-by-default)
- [Using Cloudflare and other reverse proxies with Vercel](https://vercel.com/kb/guide/can-i-use-a-proxy-on-top-of-my-vercel-deployment) — General information about using an external proxy to serve a Vercel Deployment.
- [How to add per-request CSP nonces to CDN-cached HTML on Vercel](https://vercel.com/kb/guide/csp-nonces-with-cdn-cache) — Use Routing Middleware and a self-fetch to add a fresh CSP nonce to cached HTML without rendering the page again on ever
- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [How to reduce ISR revalidation costs](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs) — Reduce ISR costs by analyzing Incremental Static Regeneration \\(ISR\\) behavior to find pages and tags that revalidate to
- [How to reduce Vercel Image Optimization costs](https://vercel.com/kb/guide/reduce-image-optimization-costs-on-vercel) — Learn how to reduce Vercel Image Optimization costs in Next.js by tuning cache TTLs, image sizes, formats, and quality.
- [Invalidate the CDN cache by tag](https://vercel.com/changelog/invalidate-the-cdn-cache-by-tag)
- [Tag-based cache invalidation now available for all responses](https://vercel.com/changelog/tag-based-cache-invalidation-now-available-for-all-responses)
- [Data Cache for Next.js](https://vercel.com/docs/caching/runtime-cache/data-cache) — Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
- [Diagnosing and fixing cache issues](https://vercel.com/docs/caching/cdn-cache/debug-cache-issues) — Diagnose stale content and fix CDN cache, data cache, and build cache issues using the CLI.
- [Runtime Cache](https://vercel.com/docs/caching/runtime-cache) — Vercel Runtime Cache is a specialized cache that stores responses from data fetches in Vercel functions
- [Cache-Control headers](https://vercel.com/docs/caching/cache-control-headers) — Learn about the cache-control headers sent to each Vercel deployment and how to use them to control the caching behavior

Full cross-link map for this page: [/docs/caching/cdn-cache/purge.graph.md](/docs/caching/cdn-cache/purge.graph.md)
<!-- /docsgraph:related -->

## Cache keys

Each request to Vercel's CDN has a cache key derived from the following:

- The request method (such as `GET`, `POST`, etc)
- The request URL (query strings are ignored for static files)
- The host domain
- The unique [deployment URL](/docs/deployments/generated-urls)
- The scheme (whether it's `https` or `http`)

Since each deployment has a different cache key, you can [promote a new deployment](/docs/deployments/promoting-a-deployment) to production without affecting the cache of the previous deployment.

> **💡 Note:** The cache key for Image Optimization behaves differently for [static
> images](/docs/image-optimization#local-images-cache-key) and [remote
> images](/docs/image-optimization#remote-images-cache-key).

Cache keys are not configurable. To purge the cache you must configure cache tags.

## Understanding cache purging

When you purge by cache tag, Vercel purges all three types of cache: CDN cache, Runtime Cache, and Data Cache. This ensures your content updates consistently across all layers.

### Invalidating the cache

When you invalidate a cache tag, all cached content associated with that tag is marked as stale. The next request serves the stale content instantly while revalidation happens in the background. This approach has no latency impact for users while ensuring content gets updated. In request logs this appears as cache status `STALE` with the reason **Tag-based invalidation**. See [Cache Status](/docs/caching/cache-status#tag-based-invalidation).

### Deleting the cache

When you delete a cache tag, the cached entries are marked for deletion. The next request fetches content from your origin before responding to the user. This can slow down the first request after deletion. If many users request the same deleted content simultaneously, it can create a cache stampede where multiple requests hit your origin at once. In request logs this appears as cache status `REVALIDATED` with the reason **Tag-based deletion**. See [Cache Status](/docs/caching/cache-status#tag-based-deletion).

### Cache tags

Cache tags (sometimes called surrogate keys) are user-defined strings that can be assigned to cached responses. These tags can later be used to purge the CDN cache.

For example, you may have a product with id `123` that is displayed on multiple pages such as `/products/123/overview`, `/products/123/reviews`, etc. If you add a unique cache tag to those pages, such as `product123`, you can invalidate that tag when the content of the product changes. You may want to add another tag `products` to invalidate all products at once.

There are several ways to add cache tags to a response:

- **`Vercel-Cache-Tag` response header**: Set the `Vercel-Cache-Tag` header on responses from [Vercel Functions](/docs/functions) or [external rewrites](/docs/routing/rewrites#rewrites-to-external-origins). The value is a comma-separated list of tags.
- **`addCacheTag()` function**: Import [addCacheTag](/docs/functions/functions-api-reference/vercel-functions-package#addcachetag) from `@vercel/functions` and pass in your tag.
- **`cacheTag()` function (Next.js only)**: Import [cacheTag](https://nextjs.org/docs/app/api-reference/functions/cacheTag) from `next/cache` and pass in your tag.

The example below sets both `Vercel-CDN-Cache-Control` and `Vercel-Cache-Tag` in a Vercel Function to ensure the response is cached and can be purged on-demand by tag at some point in the future:

```ts filename="api/product.ts"
export default {
  async fetch(request) {
    const id = new URL(request.url).searchParams.get('id');
    const res = await fetch(`https://api.example.com/${id}`);
    const product = await res.json();
    return Response.json(product, {
      headers: {
        'Vercel-CDN-Cache-Control': 'public, max-age=86400',
        'Vercel-Cache-Tag': `product-${id},products`,
      },
    });
  },
};
```

Vercel's CDN can also cache and purge responses originating outside of Vercel by using [external rewrites](/docs/routing/rewrites#rewrites-to-external-origins) with the same headers.

Functions using [ISR](/docs/incremental-static-regeneration) don't have access to the raw Response headers. You can add cache tags by importing [addCacheTag](/docs/functions/functions-api-reference/vercel-functions-package#addcachetag) from `@vercel/functions` to add tags at runtime.

If you're using Next.js, you can add cache tags by importing [cacheTag](https://nextjs.org/docs/app/api-reference/functions/cacheTag) from `next/cache` instead.

#### Cache tag case sensitivity

Cache tags are case-sensitive, meaning `product` and `Product` are treated as different tags.

#### Cache tag allowed characters

Cache tags must not contain commas. The comma character (`,`) is reserved as a delimiter in the `Vercel-Cache-Tag` header and in API calls that accept multiple tags. If a tag contains a comma, it's interpreted as two separate tags.

#### Cache tag scope

Cache tags are scoped to your project and environment (production or preview).

When you purge a tag with the REST API, you can optionally provide a target environment such as preview or production (default is all environments).

When you purge a tag using `@vercel/functions` at runtime, the function's current environment is used which is derived from the deployment url that invoked the function.

When using [rewrites](/docs/routing/rewrites) from a parent [project](/docs/projects) to a child project and both are on the same [team](/docs/accounts), cached responses on the parent project will also include the corresponding tags from the child project.

### System cache tags

Vercel's CDN automatically adds system cache tags to certain cached responses so you can easily purge by tag at your convenience.

For example, a cached response from [Image Optimization](/docs/image-optimization) automatically adds the source image as a cache tag to each transformed image. These may contain commas, unlike user-defined cache tags.

This allows you to purge by a single source image without purging the entire project.

## Programmatically purging CDN Cache

Each method below either [invalidates](#invalidating-the-cache) or [deletes](#deleting-the-cache) the CDN cache. Select the column that matches the behavior you're looking for:

| Method                                                                                                        | Invalidate (serve stale, refresh in background)                                     | Delete (regenerate in the foreground)                                                                  |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package)                       | `invalidateByTag()`, `invalidateBySrcImage()`                                       | `dangerouslyDeleteByTag()`, `dangerouslyDeleteBySrcImage()`                                            |
| [`next/cache`](https://nextjs.org/docs/15/app/api-reference/functions/revalidateTag) on Next.js 15 and earlier | None in `next/cache`. Use `invalidateByTag()` from `@vercel/functions`.                    | `revalidateTag(tag)`, `revalidatePath(path)`, `unstable_expireTag(tag)`                                          |
| [`next/cache`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) on Next.js 16 and later    | `revalidateTag(tag, 'max')`  | `revalidateTag(tag)`, `revalidatePath(path)`, `updateTag(tag)`                                            |
| [Vercel CLI](/docs/cli/cache)                                                                                 | `vercel cache invalidate` with `--tag` or `--srcimg`                                | `vercel cache dangerously-delete` with `--tag` or `--srcimg`                                           |
| [REST API](/docs/rest-api/edge-cache/invalidate-by-tag)                                                                                            | `/invalidate-by-tag`, `/invalidate-by-source-image`                                 | `/dangerously-delete-by-tag`, `/dangerously-delete-by-source-image`                                    |

> **💡 Note:** On Next.js 15 and earlier, `revalidateTag()` always deletes. Use
> `invalidateByTag()` from `@vercel/functions` to invalidate instead.

## Manually purging Vercel CDN Cache

In some circumstances, you may need to purge cached responses and force revalidation. For example, you might set a `Cache-Control` value that caches a response for a month, then update the content before that month ends. You can purge the cache from the dashboard:

1. Under your project, open **CDN** in the sidebar, then select **Caches**.
2. In the **Purge cache** section, choose what you want to purge.
3. Click **Purge**.
4. In the dialog, you'll see two options:
   - **Invalidate**: Marks a cache tag as stale, causing cache entries associated with that tag to be revalidated in the background on the next request. This is the recommended method for most use cases.
   - **Delete**: Marks a cache tag as deleted, causing cache entries associated with that tag to be revalidated in the foreground on the next request. Use this method with caution because one tag can be associated with many paths and deleting the cache can cause many concurrent requests to the origin leading to [cache stampede problem](https://en.wikipedia.org/wiki/Cache_stampede). This option is for advanced use cases and is not recommended; prefer using Invalidate instead.
5. In the dialog, you'll see a dropdown with two options:
   - **Cache Tag**: Purge cached responses associated with a specific user-defined tag.
   - **Source Image**: Purge [Image Optimization](/docs/image-optimization) transformed images based on the original source image URL.
6. In the dialog, enter a tag or source image in the input. You can use `*` to purge the entire project.
7. Finally, click the **Purge** button in the dialog to confirm.

Vercel does not bill the purge event itself, but purging can temporarily increase related usage, such as Active CPU, Provisioned Memory, Function Invocations, Fast Origin Transfer, Image Optimization Transformations, Image Optimization Cache Writes, and ISR Writes.

> **💡 Note:** Purge is not the same as creating a new deployment because it will also purge
> Image Optimization content, which is usually preserved between deployments, as
> well as ISR content, which is often generated at build time for new
> deployments.

## Limits

|                                   | Maximum |
| --------------------------------- | ------- |
| UTF-8 bytes per tag               | 256     |
| Tags per cached response          | 128     |
| Tags per bulk REST API call       | 16      |
| UTF-8 bytes per source image tag  | 1013    |

Tags containing multibyte characters are encoded and measured in UTF-8 bytes. A tag of only ASCII characters can be 256 characters long, but characters that require escaping, such as quotes and backslashes, additionally count at their escaped length.

### Purge rate limits

Purge calls made from your functions with [`@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package) or `next/cache` are rate limited per plan:

| Plan       | Purge calls per second        |
| ---------- | ----------------------------- |
| Hobby      | 50 per team                   |
| Pro        | 200 per team                  |
| Enterprise | 500 per project               |

The limit counts calls, not tags. An API that accepts several tags in one call, such as `invalidateByTag()` from `@vercel/functions`, uses one call for all of them. It's averaged over a 30-second window, so short bursts above it are allowed. When you exceed it, the call fails with an HTTP `429` response that includes a `retry-after` header, and the cache is left unchanged. Retry the call after that delay.

Purges made with the [Vercel CLI](/docs/cli/cache), the [REST API](/docs/rest-api/edge-cache/invalidate-by-tag), or the dashboard are rate limited separately under the [REST API rate limits](/docs/limits#rate-limits).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
