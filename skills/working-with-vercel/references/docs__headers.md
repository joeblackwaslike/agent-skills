---
title: System Headers
product: vercel
url: /docs/headers
canonical_url: "https://vercel.com/docs/headers"
last_updated: 2026-07-01
type: reference
prerequisites:
  []
related:
  - /docs/how-vercel-cdn-works/compression
  - /docs/project-configuration/vercel-json
  - /docs/headers/request-headers
  - /docs/headers/response-headers
  - /docs/caching/cache-control-headers
summary: This reference covers the list of request, response, cache-control, and custom response headers included with deployments with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/headers.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ceed50d9b316e0e06c089b6aa261a208f951d7b4ce6146027b3d9e0e2ee6d0c2"
---

# System Headers

Headers are small pieces of information that are sent between the client (usually a web browser) and the server. They contain metadata about the request and response, such as the content type, cache-control directives, and authentication tokens. [HTTP headers](https://developer.mozilla.org/docs/Web/HTTP/Headers) can be found in both the HTTP Request and HTTP Response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare?from=related) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [How to ship an H3 app on Vercel](https://vercel.com/kb/guide/ship-a-h3-app-on-vercel?from=related) — Deploy an H3 app to Vercel with zero configuration. Learn to configure streaming, middleware, cron jobs, the Bun runtime
- [Request Lifecycle](https://vercel.com/docs/fundamentals/infrastructure?from=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Fundamental Concepts](https://vercel.com/docs/fundamentals?from=related) — Learn about the core concepts of Vercel
- [Security](https://vercel.com/docs/cdn-security?from=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Caching](https://vercel.com/docs/caching?from=related) — Learn how Vercel caches content across multiple layers to deliver fast responses and reduce load on your backend.
- [vercel.ts](https://vercel.com/docs/project-configuration/vercel-ts?from=related) — Define your Vercel configuration in vercel.ts with @vercel/config for type-safe routing and build settings.

Full cross-link map for this page: [/docs/headers.graph.md](/docs/headers.graph.md)
<!-- /docsgraph:related -->

## Using headers

By using headers effectively, you can optimize the performance and security of your application on Vercel's global network. Here are some tips for using headers on Vercel:

1. [Use caching headers](#cache-control-header): Caching headers instruct the client and server to cache resources like images, CSS files, and JavaScript files, so they don't need to be reloaded every time a user visits your site. By using caching headers, you can significantly reduce the time it takes for your site to load.
2. [Use compression headers](/docs/how-vercel-cdn-works/compression#compression-with-vercel-cdn): Use the `Accept-Encoding` header to tell the client and server to compress data before it's sent over the network. By using compression, you can reduce the amount of data that needs to be sent, resulting in faster load times.
3. Use custom headers: You can also use custom headers in your `vercel.json` file to add metadata specific to your application. For example, you could add a header that indicates the user's preferred language or the version of your application. See [Project Configuration](/docs/project-configuration/vercel-json#headers) docs for more information.

## Request headers

To learn about the request headers sent to each Vercel deployment and how to use them to process requests before sending a response, see [Request headers](/docs/headers/request-headers).

## Response headers

To learn about the response headers included in Vercel deployment responses and how to use them to process responses before sending a response, see [Response headers](/docs/headers/response-headers).

## Cache-Control header

To learn about the cache-control headers sent to each Vercel deployment and how to use them to control the caching behavior of your application, see [Cache-Control headers](/docs/caching/cache-control-headers).

## More resources

- [Set Caching Header](/kb/guide/set-cache-control-headers)


---

[View full sitemap](/docs/sitemap)
