---
title: Response headers
product: vercel
url: /docs/headers/response-headers
canonical_url: "https://vercel.com/docs/headers/response-headers"
last_updated: 2026-08-11
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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "d7bdacf26acd6a9465a97f8a5138bb2722febc716a51fa726e2539107d394d0d"
---

# Response headers

The following headers are included in Vercel deployment responses and indicate certain factors of the environment. These headers can be viewed from the Browser's Dev Tools or using an HTTP client such as `curl -I <DEPLOYMENT_URL>`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to reduce ISR revalidation costs](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs) — Reduce ISR costs by analyzing Incremental Static Regeneration \\(ISR\\) behavior to find pages and tags that revalidate to
- [Control CDN caching for shared and personalized pages on Vercel](https://vercel.com/kb/guide/cdn-cache-personalized-pages) — Control CDN caching for shared and personalized Next.js pages. Set cache headers, separate per-user content, and verify
- [How to troubleshoot stale content returned from the Vercel CDN when using an external proxy or CDN](https://vercel.com/kb/guide/how-to-troubleshoot-stale-content-returned-from-the-edge-network-when-using-an-external-proxy-or-cdn) — Learn how to diagnose and fix stale content issues when using external proxies or CDNs with Vercel. Understand troublesh
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [How Vercel CDN Works](https://vercel.com/docs/how-vercel-cdn-works) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption) — Learn how Vercel encrypts data in transit and at rest.
- [Diagnosing and fixing cache issues](https://vercel.com/docs/caching/cdn-cache/debug-cache-issues) — Diagnose stale content and fix CDN cache, data cache, and build cache issues using the CLI.

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
- [Production deployments](/docs/deployments) that you request through their [unique deployment URL](/docs/deployments/generated-urls) instead of a production domain. This includes outdated production deployments, which stay available at their unique deployment URL after you [promote a new deployment to production](/docs/deployments/promoting-a-deployment)

We add this header automatically with a value of `noindex` to **prevent** search engines from crawling your Preview Deployments and outdated Production Deployments, which could cause them to penalize your site for duplicate content.

You can prevent this header from being added to your Preview Deployment by:

- [Assigning a production domain](/docs/domains/working-with-domains/assign-domain-to-a-git-branch) to it
- Disabling it manually [using vercel.json](/docs/project-configuration/vercel-json#headers)

To check whether a deployment sends the header, request it with `curl` and look for `x-robots-tag: noindex` in the output:

```bash filename="terminal"
curl -I https://your-preview-url.vercel.app
```

Vercel doesn't add the header when you serve a preview from a [custom domain assigned to a Git branch](/docs/domains/working-with-domains/assign-domain-to-a-git-branch), such as `staging.example.com`. Search engines can index that domain unless you add the header yourself. In Next.js, return the header from `next.config.js` only when [`VERCEL_ENV`](/docs/environment-variables/system-environment-variables#VERCEL_ENV) is `preview`:

```js filename="next.config.js"
module.exports = {
  async headers() {
    if (process.env.VERCEL_ENV !== 'preview') {
      return [];
    }

    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
};
```

For other frameworks, add the header in `vercel.json` and scope it to the branch domain with a `has` condition of type `host`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "staging.example.com" }],
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
    }
  ]
}
```

Redeploy, then run the `curl -I` check against the custom domain to confirm the header is present. Search engines remove pages that are already indexed the next time they crawl them.

`noindex` only asks search engines not to index a page. Anyone with the URL can still open the deployment. To control who can view a preview, use [Deployment Protection](/docs/deployment-protection).

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
