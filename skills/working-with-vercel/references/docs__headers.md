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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/headers.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "088718f4a827fa1c109ca69171feaa8574ee333d147f73fa1f33f369952dd97f"
---

# System Headers

Headers are small pieces of information that are sent between the client (usually a web browser) and the server. They contain metadata about the request and response, such as the content type, cache-control directives, and authentication tokens. [HTTP headers](https://developer.mozilla.org/docs/Web/HTTP/Headers) can be found in both the HTTP Request and HTTP Response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Edge Functions are now generally available](https://vercel.com/changelog/edge-functions-are-now-generally-available)
- [Enhanced geolocation information for Vercel Functions](https://vercel.com/changelog/enhanced-geolocation-information-available-for-vercel-functions)
- [IP Geolocation now available for all plans](https://vercel.com/changelog/ip-geolocation-now-available-for-all-plans)
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Read System Bypass](https://vercel.com/docs/rest-api/security/read-system-bypass) — GET /v1/security/firewall/bypass — Retrieve the system bypass rules configured for the specified project
- [Vercel CDN overview](https://vercel.com/docs/cdn) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals) — Learn about the core concepts of Vercel
- [Get supported TLDs](https://vercel.com/docs/rest-api/domains-registrar/get-supported-tlds) — GET /v1/registrar/tlds/supported — Get a list of TLDs supported by Vercel

Full cross-link map for this page: [/docs/headers.graph.md](/docs/headers.graph.md)
<!-- /docsgraph:related -->

## Using headers

By using headers effectively, you can optimize the performance and security of your application on Vercel's global network. Here are some tips for using headers on Vercel:

1. [Use caching headers](#cache-control-header): Caching headers instruct the client and server to cache resources like images, CSS files, and JavaScript files, so they don't need to be reloaded every time a user visits your site. By using caching headers, you can significantly reduce the time it takes for your site to load.
2. [Use compression headers](/docs/how-vercel-cdn-works/compression#compression-negotiation): Use the `Accept-Encoding` header to tell the client and server to compress data before it's sent over the network. By using compression, you can reduce the amount of data that needs to be sent, resulting in faster load times.
3. Use custom headers: You can also use custom headers in your `vercel.json` file to add metadata specific to your application. For example, you could add a header that indicates the user's preferred language or the version of your application. See [Project Configuration](/docs/project-configuration/vercel-json#headers) docs for more information.

## Request headers

To learn about the request headers sent to each Vercel deployment and how to use them to process requests before sending a response, see [Request headers](/docs/headers/request-headers).

## Response headers

To learn about the response headers included in Vercel deployment responses and how to use them to process responses before sending a response, see [Response headers](/docs/headers/response-headers).

## Cache-Control header

To learn about the cache-control headers sent to each Vercel deployment and how to use them to control the caching behavior of your application, see [Cache-Control headers](/docs/caching/cache-control-headers).

## More resources

- [Set Caching Header](/kb/guide/set-cache-control-headers)

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
