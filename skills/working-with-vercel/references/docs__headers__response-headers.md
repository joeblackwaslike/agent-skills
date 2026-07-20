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
  - /docs/headers/cache-control-headers
  - /docs/deployments/environments
  - /docs/deployments
summary: Learn about the response headers sent to each Vercel deployment and how to use them to process responses before sending a response.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/headers/response-headers.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "9822e877c05c3108cd6aeac16f509365ede5af3005b43c3717ec1ccbb1816ce9"
---

# Response headers

The following headers are included in Vercel deployment responses and indicate certain factors of the environment. These headers can be viewed from the Browser's Dev Tools or using an HTTP client such as `curl -I <DEPLOYMENT_URL>`.

## `cache-control`

Used to specify directives for caching mechanisms in both the [CDN cache](/docs/caching/cdn-cache) and the browser cache. See the [Cache-Control headers](/docs/headers#cache-control-header) section for more detail.

If you use this header to instruct the CDN to cache data, such as with the [`s-maxage`](/docs/headers/cache-control-headers#s-maxage) directive, Vercel returns the following `cache-control` header to the client:

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

The `x-vercel-cache` header indicates the cache status of static assets and responses from Vercel's CDN. For dynamic routes and fetch requests that use the [runtime cache](/docs/caching/runtime-cache), this header often shows `MISS` even if the data is served from the runtime cache. Use [custom headers](/docs/headers/cache-control-headers#custom-response-headers) or [runtime logs](/docs/runtime-logs) to check whether a fetch response was served from the runtime cache.

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
