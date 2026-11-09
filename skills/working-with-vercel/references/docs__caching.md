---
title: Caching
product: vercel
url: /docs/caching
canonical_url: "https://vercel.com/docs/caching"
last_updated: 2026-06-23
type: conceptual
prerequisites:
  []
related:
  - /docs/caching/cdn-cache
  - /docs/caching/cache-control-headers
  - /docs/caching/cdn-cache/purge
  - /docs/incremental-static-regeneration
  - /docs/functions/configuring-functions/region
summary: Learn how Vercel caches content across multiple layers to deliver fast responses and reduce load on your backend.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "dca6d70cc861f2a15f64f66b2b4cbdbd7f728b85674c72683a1249321b421c30"
---

# Caching

Vercel caches content at multiple layers between the visitor and your backend. The CDN checks each layer in order and returns a cached response as soon as one is available.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Caching audits: Five antipatterns that cost you performance and money](https://vercel.com/kb/guide/caching-antipatterns) — Five caching antipatterns from hundreds of Vercel technical audits: write amplification, deploy-wiped caches, spinner sh
- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Troubleshoot and optimize Function Invocations on Vercel](https://vercel.com/kb/guide/optimize-function-invocations) — Diagnose which routes drive Function Invocations and learn to optimize them. Separate necessary dynamic traffic from div
- [Can I use Vercel as a reverse proxy?](https://vercel.com/kb/guide/vercel-reverse-proxy-rewrites-external) — Learn how to use rewrites to proxy requests from Vercel to other deployments.
- [Control CDN caching for shared and personalized pages on Vercel](https://vercel.com/kb/guide/cdn-cache-personalized-pages) — Control CDN caching for shared and personalized Next.js pages. Set cache headers, separate per-user content, and verify
- [Simplifying runtime caching on Vercel](https://vercel.com/blog/simplifying-runtime-caching-on-vercel)
- [Preventing the stampede: Request collapsing in the Vercel CDN ](https://vercel.com/blog/cdn-request-collapsing)
- [Caching details now available in Runtime Logs](https://vercel.com/changelog/caching-details-now-available-in-runtime-logs)
- [Introducing the Runtime Cache API](https://vercel.com/changelog/introducing-the-runtime-cache-api)
- [Vercel Data Cache: A progressive cache, integrated with Next.js](https://vercel.com/blog/vercel-cache-api-nextjs-cache)
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.

Full cross-link map for this page: [/docs/caching.graph.md](/docs/caching.graph.md)
<!-- /docsgraph:related -->

The diagram below shows how a request flows through the cache layers. Select a workload type to see which layers apply.

## Cache layers

### CDN cache

The [CDN cache](/docs/caching/cdn-cache) stores responses across Vercel regions worldwide. When a visitor makes a request, the nearest PoP routes it to a Vercel region in single-digit milliseconds. On a cache hit, the region returns the response with no round trip to your function or origin.

You control CDN caching through [Cache-Control headers](/docs/caching/cache-control-headers) or your framework's built-in caching.

- [CDN cache](/docs/caching/cdn-cache)
- [Purge CDN cache](/docs/caching/cdn-cache/purge)
- [Cache-Control headers](/docs/caching/cache-control-headers)

### Incremental Static Regeneration (ISR) cache

The [ISR cache](/docs/incremental-static-regeneration) stores pre-rendered pages in durable storage within a single [function region](/docs/functions/configuring-functions/region) selected from your configured list. Frameworks like Next.js and SvelteKit use ISR to generate pages at build time and update them on demand or on a schedule.

When a page isn't in the CDN cache, the CDN checks the ISR cache next. Your function only runs when content needs regenerating.

- [Incremental Static Regeneration](/docs/incremental-static-regeneration)

### Runtime cache

The [runtime cache](/docs/caching/runtime-cache) stores data fetched inside Vercel Functions. Your framework's data-fetching API activates it when it opts into caching, such as Next.js `fetch` with `force-cache`. You can also call the runtime cache API directly. The function region caches the response for subsequent requests.

This reduces latency for repeated data lookups and lowers the number of calls to external APIs and databases.

### Image cache

The image cache stores optimized images after Vercel transforms them. When you use [Image Optimization](/docs/image-optimization), Vercel resizes, compresses, and converts images on the first request. Subsequent requests return the cached result and skip processing.

- [Image Optimization](/docs/image-optimization)

## Request collapsing

When multiple visitors request the same uncached content at the same time, [request collapsing](/docs/incremental-static-regeneration/request-collapsing) groups those requests into one call to your backend. This protects your origin from traffic spikes and avoids redundant work.

- [Request collapsing](/docs/incremental-static-regeneration/request-collapsing)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
