---
title: System Headers
product: vercel
url: /docs/headers
canonical_url: "https://vercel.com/docs/headers"
last_updated: 2026-08-11
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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "c68ddc6597f32d7d10052a9d3128066d8b18418ea7e63cfe8b74bb3c0b4ef773"
---

# System Headers

Headers are small pieces of information that are sent between the client (usually a web browser) and the server. They contain metadata about the request and response, such as the content type, cache-control directives, and authentication tokens. [HTTP headers](https://developer.mozilla.org/docs/Web/HTTP/Headers) can be found in both the HTTP Request and HTTP Response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Edge Functions are now generally available](https://vercel.com/changelog/edge-functions-are-now-generally-available?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related)
- [Enhanced geolocation information for Vercel Functions](https://vercel.com/changelog/enhanced-geolocation-information-available-for-vercel-functions?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related)
- [IP Geolocation now available for all plans](https://vercel.com/changelog/ip-geolocation-now-available-for-all-plans?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related)
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [How to Configure the Cache-Control Response Header in Vercel Projects](https://vercel.com/kb/guide/how-to-configure-the-cache-control-response-header-in-vercel-projects?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — After reviewing this guide, you will be able to set a cache-control header of any value to be returned when a specific p
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Learn about the core concepts of Vercel
- [CDN security](https://vercel.com/docs/cdn-security?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Caching](https://vercel.com/docs/caching?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=related) — Learn how Vercel caches content across multiple layers to deliver fast responses and reduce load on your backend.

Full cross-link map for this page: [/docs/headers.graph.md](/docs/headers.graph.md?from=related&source_path=%2Fdocs%2Fheaders&source_site=vercel-docs&relationship=graph)
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
