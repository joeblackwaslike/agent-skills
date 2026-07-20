---
title: Cache Status and Reasons
product: vercel
url: /docs/caching/cache-status
canonical_url: "https://vercel.com/docs/caching/cache-status"
last_updated: 2026-07-08
type: reference
prerequisites:
  - /docs/caching
related:
  - /docs/headers/response-headers
  - /docs/runtime-logs
  - /docs/caching/runtime-cache
  - /docs/incremental-static-regeneration
  - /docs/partial-prerendering
summary: Understand the cache status and reason shown for each request in Vercel logs, and what causes a response to miss, bypass, or serve stale from the...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching/cache-status.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "4a0a8276d47c31e74fd144b608062981317d5991723736c55bca48f4e40df652"
---

# Cache Status and Reasons

Vercel records how each cacheable request resolves as a cache **status**, and when the response wasn't a plain hit, a **reason** that explains it. The status tells you what happened to the cache lookup, and the reason tells you why. Read them together to see whether a response came from the cache, and if not, what sent the request to your function or origin instead.

These statuses appear in the [`x-vercel-cache`](/docs/headers/response-headers#x-vercel-cache) response header, and, with the reason and extra context, in the **Cache** section of a request in [runtime logs](/docs/runtime-logs).

For requests that aren't cached, some data used by the origin may still be cached through [Runtime Cache](/docs/caching/runtime-cache).

## Cache statuses

Every cacheable request resolves to one of these statuses:

| Status        | What it means                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `HIT`         | The response came from the cache.                                                                                            |
| `MISS`        | The response wasn't in the cache, so Vercel generated it from your function or origin and, if cacheable, stored it for next time. |
| `BYPASS`      | Vercel skipped the cache for this request and served fresh content.                                                         |
| `STALE`       | The cache served an existing response that was no longer fresh, then refreshed it in the background.                        |
| `PRERENDER`   | The response was served from static storage, such as a page prerendered at build time.                                     |
| `REVALIDATED` | The cached entry had been deleted, so Vercel regenerated the response from your origin in the foreground.                   |

## HIT

The response was served directly from the cache, with no function invocation or origin fetch needed.

![Image](`/docs-assets/static/docs/concepts/edge-network/x-vercel-cache-hit2x.png?v=4\&lightbox`)

## MISS

A `MISS` means Vercel checked the cache, found nothing it could serve, and generated the response from your function or origin. Vercel stores the result for [ISR](/docs/incremental-static-regeneration) and [Partial Prerendering](/docs/partial-prerendering) pages, or when the response sets `cache-control` headers, so a later request for the same path can be a `HIT`.

A miss isn't always a problem. Dynamic routes are generated on every request, so a miss there is expected and shows no reason. A reason appears only when the miss is worth explaining, such as on a route meant to be served from the cache, and tells you what sent the request to your function or origin instead.

![Image](`/docs-assets/static/docs/concepts/edge-network/x-vercel-cache-miss2x.png?v=4\&lightbox`)

### Cold

The content wasn't in the cache yet, so this request generated it. This happens on the first request to a dynamic route or a page not prerendered at build time, after a new deployment (Vercel scopes cached responses to the deployment that produced them), and after a rarely-requested entry is evicted from a region's cache. A cold miss is expected for dynamic responses, but for [ISR](/docs/incremental-static-regeneration) and [Partial Prerendering](/docs/partial-prerendering) it often means a path wasn't prerendered ahead of time, since those paths are meant to be served as a `PRERENDER` or `HIT`.

The request that finds a cold entry generates and stores the response, so later requests for the same path in the same region are served as a `HIT`. To reduce cold misses, prerender frequently-visited ISR and PPR paths at build time, and give other cacheable responses a longer lifetime. See [CDN Cache](/docs/caching/cdn-cache) and [Incremental Static Regeneration](/docs/incremental-static-regeneration).

### Request collapsed

Several visitors requested the same uncached path at the same time. Instead of invoking your function once per request, Vercel sent the first request to your origin to generate the response. It holds the rest until that response is ready, then serves them all the same result. The held requests show as a miss because they waited on the in-flight generation rather than finding a stored response. This shields your origin from a [cache stampede](https://en.wikipedia.org/wiki/Cache_stampede) during traffic spikes. See [request collapsing](/docs/incremental-static-regeneration/request-collapsing).

### Error

Vercel couldn't read a stored response from the cache, so the request fell through to your function or origin. This happens when a cache-storage read fails, and Vercel generates the response fresh rather than serving a stored copy.

> **💡 Note:** This reason reflects a cache-storage read failure, not an error in your
> application code. An application error during background revalidation surfaces
> as `STALE` if the request is within the [stale-while-revalidate](/docs/caching/cache-control-headers#stale-while-revalidate) window, because Vercel keeps serving the last good response.

## BYPASS

A `BYPASS` means Vercel skipped the cache on purpose for this request and served fresh content from your function or origin. Unlike a miss, it doesn't consult the cache at all, so the reason describes what opted this request out.

![Image](`/docs-assets/static/docs/concepts/edge-network/x-vercel-cache-bypass2x.png?v=4\&lightbox`)

### Draft Mode

The request had [Draft Mode](/docs/draft-mode) (formerly Preview Mode) enabled, so Vercel skipped the cached prerender and rendered fresh content at request time. Draft Mode is triggered when the request's `__prerender_bypass` cookie matches the route's `bypassToken`. Frameworks like Next.js and SvelteKit use it so team members can preview unpublished CMS content with full styling, without serving it to other visitors or waiting for the cache to refresh.

### Prerender Bypass

The request matched the route's `experimentalBypassFor` configuration, so Vercel skipped the cached prerender and invoked your function to render the page fresh. Frameworks can configure this to match any request based on their own requirements. Next.js, for example, uses `experimentalBypassFor` to opt specific requests out of the prerender based on their headers, cookies, query parameters, or User-Agent, most commonly to serve matching crawlers fully rendered content for SEO. On Partial Prerendering routes, a matching bot User-Agent resolves to this same reason.

### Crawler

A request from a known crawler hit a path that would normally serve a [prerender fallback](/docs/incremental-static-regeneration), the lightweight shell shown while a page is generated for the first time. Vercel matched the crawler against its built-in list of User-Agent patterns (such as Googlebot, Bingbot, `facebookexternalhit`, Twitterbot, and Slackbot) and, rather than return the fallback, waited for the fully rendered page so the crawler indexes complete content. Unlike Prerender Bypass, this list is maintained by Vercel rather than configured per route.

## STALE

A `STALE` status means the cache served an existing response that's no longer fresh, then regenerated it in the background by re-invoking your function or origin. The visitor still gets a fast response from the cache while Vercel regenerates the response in the background. The reason explains why the entry became stale.

![Image](`/docs-assets/static/docs/concepts/edge-network/x-vercel-cache-stale2x.png?v=4\&lightbox`)

### Time-based revalidation

The entry passed its revalidation window, so Vercel served the existing copy and started regenerating it in the background. This is the standard [`stale-while-revalidate`](/docs/caching/cache-control-headers#stale-while-revalidate) path, including the revalidation intervals that frameworks like Next.js set through [ISR](/docs/incremental-static-regeneration).

### Tag-based invalidation

Invalidating a [cache tag](/docs/caching/cdn-cache/purge) attached to this entry marked it stale on the next request. Vercel served the existing response and regenerated it in the background. You invalidate tags through [`invalidateByTag()`](/docs/functions/functions-api-reference/vercel-functions-package#invalidatebytag) or a framework function like `revalidateTag()`.

### Revalidation error

Vercel tried to regenerate the entry, but the request failed, for example because your function errored or your origin was unreachable. Rather than surface that failure to the visitor, Vercel kept serving the last good response and retries the revalidation on a later request.

## PRERENDER

The response was served from static storage, such as a page prerendered at build time. Frameworks configure this through the [Build Output API](/docs/build-output-api/features#on-demand-incremental-static-regeneration-isr). In Next.js, statically generated pages return `PRERENDER`. See the Next.js [`getStaticPaths`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths) docs for when a route is prerendered.

![Image](`/docs-assets/static/docs/concepts/edge-network/x-vercel-cache-prerender2x.png?v=4\&lightbox`)

## REVALIDATED

The cached entry had been deleted, so Vercel regenerated the response from your origin in the foreground. Because there's no stale copy to fall back on, the request waits for that regeneration and pays the full generation latency, unlike `STALE`, where an expired entry is served immediately while Vercel refreshes the next one in the background. An entry is deleted on demand through [`dangerouslyDeleteByTag()`](/docs/functions/functions-api-reference/vercel-functions-package#dangerouslydeletebytag), a framework function like [`revalidatePath()`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath) or [`revalidateTag()`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) called without a lifetime, or a [dashboard purge](/docs/caching/cdn-cache/purge) that deletes by tag.

![Image](`/docs-assets/static/docs/concepts/edge-network/x-vercel-cache-revalidated2x.png?v=4\&lightbox`)

### Tag-based deletion

When the deletion was triggered by a [cache tag](/docs/caching/cdn-cache/purge) — through [`dangerouslyDeleteByTag()`](/docs/functions/functions-api-reference/vercel-functions-package#dangerouslydeletebytag), [`revalidateTag()`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) called without a lifetime, or a [dashboard purge](/docs/caching/cdn-cache/purge) that deletes by tag — the `REVALIDATED` response carries this reason. It's the deletion counterpart to a `STALE` response's [Tag-based invalidation](#tag-based-invalidation): both start from a tag, but invalidation keeps serving the existing copy while it refreshes in the background, whereas deletion leaves nothing to serve, so the request blocks on the foreground regeneration.

## Related

- [`x-vercel-cache` response header](/docs/headers/response-headers#x-vercel-cache)
- [CDN Cache](/docs/caching/cdn-cache)
- [Purging the CDN Cache](/docs/caching/cdn-cache/purge)
- [Diagnosing and fixing cache issues](/docs/caching/cdn-cache/debug-cache-issues)
- [Incremental Static Regeneration](/docs/incremental-static-regeneration)


---

[View full sitemap](/docs/sitemap)
