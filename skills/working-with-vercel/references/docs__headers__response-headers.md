---
title: Response headers
product: vercel
url: /docs/headers/response-headers
canonical_url: "https://vercel.com/docs/headers/response-headers"
last_updated: 2026-07-08
type: reference
prerequisites:
  - /docs/headers
related:
  - /docs/caching/cdn-cache
  - /docs/headers
  - /docs/caching/cache-control-headers
  - /docs/deployments/environments
  - /docs/deployments
summary: Learn about the response headers sent to each Vercel deployment and how to use them to process responses before sending a response.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/headers/response-headers.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "8daae5821715934f0f2595d245eb2d40205f9d894f087691875745557cd8b1c8"
---

# Response headers

The following headers are included in Vercel deployment responses and indicate certain factors of the environment. These headers can be viewed from the Browser's Dev Tools or using an HTTP client such as `curl -I <DEPLOYMENT_URL>`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [How to reduce ISR revalidation costs](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs?from=related) — Reduce ISR costs by analyzing Incremental Static Regeneration \(ISR\) behavior to find pages and tags that revalidate to
- [Set cache control headers for functions](https://vercel.com/kb/guide/set-cache-control-headers?from=related) — Learn how to set headers to cache your function's responses.
- [How to Configure the Cache-Control Response Header in Vercel Projects](https://vercel.com/kb/guide/how-to-configure-the-cache-control-response-header-in-vercel-projects?from=related) — After reviewing this guide, you will be able to set a cache-control header of any value to be returned when a specific p
- [Request Lifecycle](https://vercel.com/docs/fundamentals/infrastructure?from=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Overview](https://vercel.com/docs/cdn?from=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [Caching](https://vercel.com/docs/caching?from=related) — Learn how Vercel caches content across multiple layers to deliver fast responses and reduce load on your backend.
- [Encryption & TLS](https://vercel.com/docs/cdn-security/encryption?from=related) — Learn how Vercel encrypts data in transit and at rest.
- [Security](https://vercel.com/docs/cdn-security?from=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers

Full cross-link map for this page: [/docs/headers/response-headers.graph.md](/docs/headers/response-headers.graph.md)
<!-- /docsgraph:related -->

## `cache-control`

Used to specify directives for caching mechanisms in both the [CDN cache](/docs/caching/cdn-cache) and the browser cache. See the [Cache-Control headers](/docs/headers#cache-control-header) section for more detail.

If you use this header to instruct the CDN to cache data, such as with the [`s-maxage`](/docs/caching/cache-control-headers#s-maxage) directive, Vercel returns the following `cache-control` header to the client:

-`cache-control: public, max-age=0, must-revalidate`

## `content-length`

An integer that indicates the number of bytes in the response.

## `content-type`

The [media type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types) that describes the nature and format of the response.

## `date`

A timestamp indicating when the response was generated.

## `server: Vercel`

Shows where the request came from. This header can be overridden by other proxies (e.g., Cloudflare).

## `strict-transport-security`

A header often abbreviated as [HSTS](https://developer.mozilla.org/docs/Glossary/HSTS) that tells browsers that the resource should only be requested over HTTPS. The default value is `strict-transport-security: max-age=63072000` (2 years)

## `x-robots-tag`

Present only on:

- [Preview deployments](/docs/deployments/environments#preview-environment-pre-production)
- Outdated [production deployments](/docs/deployments). When you [promote a new deployment to production](/docs/deployments/promoting-a-deployment), the `x-robots-tag` header will be sent to requests for outdated production deployments

We add this header automatically with a value of `noindex` to **prevent** search engines from crawling your Preview Deployments and outdated Production Deployments, which could cause them to penalize your site for duplicate content.

You can prevent this header from being added to your Preview Deployment by:

- [Assigning a production domain](/docs/domains/working-with-domains/assign-domain-to-a-git-branch) to it
- Disabling it manually [using vercel.json](/docs/project-configuration/vercel-json#headers)

## `x-vercel-cache`

The `x-vercel-cache` header indicates the cache status of static assets and responses from Vercel's CDN. For dynamic routes and fetch requests that use the [runtime cache](/docs/caching/runtime-cache), this header often shows `MISS` even if the data is served from the runtime cache. Use [custom headers](/docs/caching/cache-control-headers#custom-response-headers) or [runtime logs](/docs/logs/runtime) to check whether a fetch response was served from the runtime cache.

The header returns one of the following values. For what each one means in depth, including the reasons behind a miss, bypass, or stale response, see [Cache Status and Reasons](/docs/caching/cache-status):

- [`HIT`](/docs/caching/cache-status#hit): the response was served from the cache.
- [`MISS`](/docs/caching/cache-status#miss): the response wasn't in the cache and was generated from your function or origin.
- [`STALE`](/docs/caching/cache-status#stale): a cached response was served while Vercel refreshed it in the background.
- [`PRERENDER`](/docs/caching/cache-status#prerender): the response was served from static storage.
- [`REVALIDATED`](/docs/caching/cache-status#revalidated): the response was regenerated in the foreground after the cached entry was deleted.
- [`BYPASS`](/docs/caching/cache-status#bypass): Vercel skipped the cache and served fresh content from your function or origin.

## `x-vercel-id`

This header contains a list of [Vercel regions](/docs/regions) your request hit, as well as the region the function was executed in (for both Edge and Serverless).

It also allows Vercel to automatically prevent infinite loops.


---

[View full sitemap](/docs/sitemap)
