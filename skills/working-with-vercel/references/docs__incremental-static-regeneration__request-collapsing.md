---
title: Request Collapsing
product: vercel
url: /docs/incremental-static-regeneration/request-collapsing
canonical_url: "https://vercel.com/docs/incremental-static-regeneration/request-collapsing"
last_updated: 2026-03-05
type: conceptual
prerequisites:
  - /docs/incremental-static-regeneration
related:
  - /docs/functions
  - /docs/caching/cdn-cache
  - /docs/headers/response-headers
  - /docs/caching/cache-control-headers
  - /docs/incremental-static-regeneration
summary: "Learn how Vercel's CDN shields your origin during traffic surges for uncached routes."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/incremental-static-regeneration/request-collapsing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "8a099f2363046702a04021c5406563990ba78140f2342bbbec8b15f2067bdbbb"
---

# Request Collapsing

Vercel uses **request collapsing** to protect uncached routes during high traffic. It reduces duplicate work by combining concurrent requests into a single function invocation within the same region. This feature is especially valuable for high-scale applications.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to reduce ISR revalidation costs](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs?from=related) — Reduce ISR costs by analyzing Incremental Static Regeneration \(ISR\) behavior to find pages and tags that revalidate to
- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [Caching](https://vercel.com/docs/caching?from=related) — Learn how Vercel caches content across multiple layers to deliver fast responses and reduce load on your backend.
- [How Vercel CDN works](https://vercel.com/docs/how-vercel-cdn-works?from=related) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [Overview](https://vercel.com/docs/cdn?from=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [Compression](https://vercel.com/docs/how-vercel-cdn-works/compression?from=related) — Vercel helps reduce data transfer and improve performance by supporting both Gzip and Brotli compression
- [Request Lifecycle](https://vercel.com/docs/fundamentals/infrastructure?from=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.

Full cross-link map for this page: [/docs/incremental-static-regeneration/request-collapsing.graph.md](/docs/incremental-static-regeneration/request-collapsing.graph.md)
<!-- /docsgraph:related -->

## How request collapsing works

When a request for an uncached path arrives, Vercel invokes the origin [function](/docs/functions) and stores the response in the [cache](/docs/caching/cdn-cache). In most cases, any following requests are served from this cached response.

However, if multiple requests arrive while the initial function is still processing, the cache is still empty. Instead of triggering additional invocations, Vercel's CDN collapses these concurrent requests into the original one. They wait for the first response to complete, then all receive the same result.

This prevents overwhelming the origin with duplicate work during traffic spikes and helps ensure faster, more stable performance.

Vercel also applies request collapsing when serving [STALE](/docs/headers/response-headers#stale) responses (with [stale-while-revalidate](/docs/caching/cache-control-headers#stale-while-revalidate) semantics), ensuring that concurrent background revalidation of multiple requests is collapsed into a single invocation.

### Example

Suppose a new blog post is published and receives 1,000 requests at once. Without request collapsing, each request would trigger a separate function invocation, which could overload the backend and slow down responses, causing a [**cache stampede**](https://en.wikipedia.org/wiki/Cache_stampede).

With request collapsing, Vercel handles the first request, then holds the remaining 999 requests until the initial response is ready. Once cached, the response is sent to all users who requested the post.

## Supported features

Request collapsing is supported for:

- [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration)
- [Image Optimization](/docs/image-optimization)


---

[View full sitemap](/docs/sitemap)
