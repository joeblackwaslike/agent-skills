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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "4889e1920cfa0d8ace44ceb30448f53d1d4babe9c6d1fc5976a2cdeb11c31427"
---

# Caching

Vercel caches content at multiple layers between the visitor and your backend. The CDN checks each layer in order and returns a cached response as soon as one is available.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Can I use Vercel as a reverse proxy?](https://vercel.com/kb/guide/vercel-reverse-proxy-rewrites-external?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Learn how to use rewrites to proxy requests from Vercel to other deployments.
- [Set cache control headers for functions](https://vercel.com/kb/guide/set-cache-control-headers?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Learn how to set headers to cache your function's responses.
- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [How can I share my Vercel cache across deployments?](https://vercel.com/kb/guide/share-vercel-cache-across-deployments-nextjs?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Learn how to reuse cached responses across deployments with the Next.js App Router and the Vercel Data Cache.
- [Preventing the stampede: Request collapsing in the Vercel CDN ](https://vercel.com/blog/cdn-request-collapsing?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related)
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [vercel.functions API Reference \\(Python\\)](https://vercel.com/docs/functions/functions-api-reference/vercel-sdk-python?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Learn about available APIs when working with Vercel Functions in Python.
- [Glossary](https://vercel.com/docs/glossary?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Learn about the terms and concepts used in Vercel's products and documentation.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/caching.graph.md](/docs/caching.graph.md?from=related&source_path=%2Fdocs%2Fcaching&source_site=vercel-docs&relationship=graph)
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
