---
title: How Vercel CDN works
product: vercel
url: /docs/how-vercel-cdn-works
canonical_url: "https://vercel.com/docs/how-vercel-cdn-works"
last_updated: 2026-03-05
type: conceptual
prerequisites:
  []
related:
  - /docs/regions
  - /docs/how-vercel-cdn-works/compression
  - /docs/cdn-security
  - /docs/vercel-firewall/vercel-waf
  - /docs/bot-management
summary: "Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low latency."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/how-vercel-cdn-works.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e98ffa73e83c022da25730ec53913589515cf7c39a7343cdd5ed8a4a92b83da2"
---

# How Vercel CDN works

Every request to a Vercel deployment flows through a globally distributed CDN before it reaches your application code. The CDN handles routing, caching, security, and compression automatically, so your app is fast by default.

When a visitor requests a page, the CDN processes it through a series of layers. Each layer can resolve the request on its own or pass it to the next.

## Ingress layer

Requests arrive at the nearest [Point of Presence (PoP)](/docs/regions#points-of-presence-pops) out of 126 locations worldwide. The PoP terminates TCP and routes the request to the nearest [Vercel region](/docs/regions) over a private network in single-digit milliseconds. The region terminates TLS, applies [compression](/docs/how-vercel-cdn-works/compression), and processes the request through the remaining layers.

## Firewall layer

The [Vercel Firewall](/docs/cdn-security) inspects every request before it reaches your application. It operates in three layers:

- **[Platform-wide firewall](/docs/cdn-security#platform-wide-firewall)**: DDoS mitigation and protection against low-quality traffic, active for all customers at no cost.
- **[Web Application Firewall (WAF)](/docs/vercel-firewall/vercel-waf)**: Custom rules to block or challenge requests based on IP, path, headers, geographic location, and more.
- **[Bot management](/docs/bot-management)**: Detect and manage automated traffic with configurable policies.

Blocked requests never reach the routing or caching layers.

## Routing layer

Before the CDN checks any cache, it evaluates routing rules in order:

1. [**Redirects**](/docs/routing/redirects): Return a new URL to the client (e.g., enforce HTTPS, move pages, localize paths)
2. [**Rewrites**](/docs/routing/rewrites): Map a public URL to a different backend path without changing what the visitor sees
3. [**Headers**](/docs/headers): Add or modify request and response headers, including [security headers](/docs/cdn-security/security-headers) and [cache-control directives](/docs/caching/cache-control-headers)

If a redirect matches, the CDN responds immediately. Rewrites and header rules continue through the remaining layers.

## Traffic management layer

After routing rules resolve, the CDN determines which deployment handles the request:

- **[Skew Protection](/docs/skew-protection)**: Locks each client session to a specific deployment version so client-side code and server responses stay in sync. This prevents errors caused by version mismatches during deployments.
- **[Rolling Releases](/docs/rolling-releases)**: Gradually shifts traffic from your current production deployment to a new one across configurable stages. You can monitor metrics at each stage and abort if needed.
- **[Microfrontends](/docs/microfrontends)**: Routes requests to different microfrontend applications based on path configuration in `microfrontends.json`. This routing happens within the same request with no additional network hop.

## Caching layers

Vercel maintains two tiers of caching. Together, they minimize how often your functions run:

- **[CDN cache](/docs/caching/cdn-cache)**: It stores responses at the nearest PoP, closest to your visitors and is controlled by [`Cache-Control` headers](/docs/caching/cache-control-headers) your functions return. A CDN hit serves the response without reaching your origin.
- **[ISR cache](/docs/incremental-static-regeneration)**: A durable store in your configured [function region](/docs/functions/configuring-functions/region): Vercel selects one region if you have multiple regions configured. It persists content for up to 31 days. When the CDN misses but the ISR cache has the content, Vercel serves it without invoking your function.
  - [Request collapsing](/docs/incremental-static-regeneration/request-collapsing) further protects this layer by deduplicating concurrent requests to the same ISR path into a single function invocation.

For data fetched inside your functions (individual API calls, database queries), [runtime cache](/docs/caching/runtime-cache) provides an additional caching layer that works alongside response caching.

## Compute layer

If no cache has the content, the request reaches [Vercel Functions](/docs/functions) in the nearest compute region. Your function generates a response. Vercel caches it based on the caching headers or framework configuration, then serves it to the visitor.

## Local development

Vercel supports 35 [frontend frameworks](/docs/frameworks) with local development environments. Through [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure), Vercel transforms your build outputs into globally [managed infrastructure](/products/managed-infrastructure) for production.

If you use [Vercel Functions](/docs/functions) without a framework, run [`vercel dev`](/docs/cli/dev) to test locally.


---

[View full sitemap](/docs/sitemap)
