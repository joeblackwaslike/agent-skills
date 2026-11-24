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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/caching.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "40139232b1b52aba4106c0fc1d3a7e6c8bba88e189c48319619b3458a83d8506"
---

# Caching

Vercel caches content at multiple layers between the visitor and your backend. The CDN checks each layer in order and returns a cached response as soon as one is available.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Troubleshoot and optimize Function Invocations on Vercel](https://vercel.com/kb/guide/optimize-function-invocations) — Diagnose which routes drive Function Invocations and learn to optimize them. Separate necessary dynamic traffic from div
- [Control CDN caching for shared and personalized pages on Vercel](https://vercel.com/kb/guide/cdn-cache-personalized-pages) — Control CDN caching for shared and personalized Next.js pages. Set cache headers, separate per-user content, and verify
- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [Introducing the Runtime Cache API](https://vercel.com/changelog/introducing-the-runtime-cache-api)
- [Simplifying runtime caching on Vercel](https://vercel.com/blog/simplifying-runtime-caching-on-vercel)
- [How Vercel CDN Works](https://vercel.com/docs/how-vercel-cdn-works) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [Caching](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching) — Vercel MCP tools for caching.
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [vercel.functions API Reference \\(Python\\)](https://vercel.com/docs/functions/functions-api-reference/vercel-sdk-python) — Learn about available APIs when working with Vercel Functions in Python.
- [vercel cache](https://vercel.com/docs/cli/cache) — Learn how to manage cache for your project using the vercel cache CLI command.

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

The [runtime cache](/docs/runtime-cache) stores data fetched inside Vercel Functions. Your framework's data-fetching API activates it when it opts into caching, such as Next.js `fetch` with `force-cache`. You can also call the runtime cache API directly. The function region caches the response for subsequent requests.

This reduces latency for repeated data lookups and lowers the number of calls to external APIs and databases.

### Image cache

The image cache stores optimized images after Vercel transforms them. When you use [Image Optimization](/docs/image-optimization), Vercel resizes, compresses, and converts images on the first request. Subsequent requests return the cached result and skip processing.

- [Image Optimization](/docs/image-optimization)

## Request collapsing

When multiple visitors request the same uncached content at the same time, [request collapsing](/docs/incremental-static-regeneration/request-collapsing) groups those requests into one call to your backend. This protects your origin from traffic spikes and avoids redundant work.

- [Request collapsing](/docs/incremental-static-regeneration/request-collapsing)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
