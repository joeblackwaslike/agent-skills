---
title: Vercel CDN overview
product: vercel
url: /docs/cdn
canonical_url: "https://vercel.com/docs/cdn"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/deployments/environments
  - /docs/regions
  - /docs/caching
  - /docs/routing
  - /docs/routing/rewrites
summary: "Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deployment."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cdn.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a1cb90bda7dbea5a0d7f0d283de6e37f4ecb9fe555d5c6acdc4a4ea9594909ea"
---

# Vercel CDN overview

Vercel's CDN is a globally distributed network that caches content near your visitors, routes requests, and runs compute close to your data. Every deployment includes it automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [Videos](https://nextjs.org/docs/app/guides/videos?from=related) — Recommendations and best practices for optimizing videos in your Next.js application.
- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related) — Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
- [Build with an Express starter template](https://vercel.com/kb/guide/build-with-a-express-starter-template?from=related) — Deploy an Express app to Vercel from a template. Browse Express starters from Vercel and the community, then run them lo
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template?from=related) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [Build with a Flask starter template](https://vercel.com/kb/guide/build-with-a-flask-starter-template?from=related) — Deploy a Flask app to Vercel from a starter template. Compare the Flask Hello World starter, AI SDK, alt text generator,
- [Request Lifecycle](https://vercel.com/docs/fundamentals/infrastructure?from=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Builds](https://vercel.com/docs/builds?from=related) — Understand how the build step works when creating a Vercel Deployment.
- [Security & Compliance Measures](https://vercel.com/docs/security/compliance?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Runtimes](https://vercel.com/docs/functions/runtimes?from=related) — Runtimes transform your source code into Functions, which are served by our CDN. Learn about the official runtimes suppo
- [Data Cache](https://vercel.com/docs/caching/runtime-cache/data-cache?from=related) — Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router

Full cross-link map for this page: [/docs/cdn.graph.md](/docs/cdn.graph.md)
<!-- /docsgraph:related -->

Unlike traditional CDNs that only cache static assets, Vercel's CDN is framework-aware. It reads your routing, caching, and rendering configuration at build time, with the following benefits:

- **Git-driven and previewable**: Every CDN change is scoped to a branch and deployed to a unique [preview URL](/docs/deployments/environments#preview-environment-pre-production), so you can test routing, caching, and security rules before they reach production.
- **Global network**: [126+ PoPs across 51 countries and 20+ Vercel regions](/docs/regions), with built-in request acceleration and high-availability architecture.
- **Framework-aware, zero config**: CDN configuration and [caching policies](/docs/caching) are an output of the build and deployment process if you are using a supported framework, eliminating the need to define manual cache-control headers.
- **Standard CDN directives**: When needed, you can override [routing and caching rules](/docs/routing). You can also proxy and cache responses from external backends with [external rewrites](/docs/routing/rewrites#external-rewrites), and [invalidate content by tag](/docs/caching/cdn-cache/purge) across all frameworks and backends.
- **Default protections**: Unmetered, always-on [DDoS mitigation and network-level security](/docs/vercel-firewall) on every deployment at no extra cost.

## What you can build

You can use Vercel's CDN across a range of architectures:

- **Static sites and marketing pages**: Pre-render pages at build time and serve them from the CDN without invoking your origin.
- **E-commerce storefronts**: Cache product catalogs with [ISR](/docs/incremental-static-regeneration) and revalidate in the background when inventory or pricing changes.
- **Content-driven platforms**: Let editors publish CMS changes that propagate globally within seconds, without a redeployment.
- **SaaS dashboards**: Serve authenticated pages with [Vercel Functions](/docs/functions) while the CDN caches shared assets and API responses.
- **AI-powered applications**: Stream responses from AI models through [streaming functions](/docs/functions/streaming-functions) and cache deterministic results with [runtime cache](/docs/caching/runtime-cache).
- **Multi-region APIs**: Set [Cache-Control headers](/docs/caching/cache-control-headers) for per-region caching and use [rewrites](/docs/routing/rewrites) to proxy requests to external backends.
- **Hybrid architectures**: Mix static, ISR, and dynamic routes in the same project. The CDN applies the right strategy per route from your framework configuration.

### Get started with templates

Deploy a CDN-ready template to see routing, caching, and revalidation in action:

## How Vercel CDN works

Every request flows through the CDN's routing, caching, and compute layers before reaching your application code. Each layer can resolve the request or pass it to the next.

- [How a request flows through the CDN](/docs/how-vercel-cdn-works)
- [Compression](/docs/how-vercel-cdn-works/compression)

### Global network and regions

Vercel operates 126 Points of Presence (PoPs) across 51 countries. Behind them, compute-capable regions run your code close to your data. Traffic flows between PoPs and regions over a private, low-latency network.

- [Region list and infrastructure details](/docs/regions)

## Routing

The CDN evaluates routing rules before checking any cache. Redirects return a new URL to the client. Rewrites map a public URL to a different backend path. Header rules modify request and response metadata.

- [Redirects](/docs/routing/redirects)
- [Rewrites](/docs/routing/rewrites)
- [Reverse proxy with external rewrites](/docs/routing/rewrites#external-rewrites)

## Security

The CDN enforces security before requests reach your application. Every deployment uses HTTPS with automatically provisioned SSL certificates and TLS 1.2/1.3 support. A platform-wide firewall with DDoS mitigation inspects every request at the CDN level. You can also configure a Web Application Firewall (WAF) with custom rules at the project level.

- [CDN security overview](/docs/cdn-security)
- [Encryption & TLS](/docs/cdn-security/encryption)
- [Security headers](/docs/cdn-security/security-headers)
- [Vercel WAF](/docs/vercel-firewall/vercel-waf)

## Caching

Vercel maintains multiple caching tiers to reduce how often your functions run.

### Incremental Static Regeneration

Incremental Static Regeneration (ISR) serves cached pages to visitors while regenerating content in the background. When the cache expires, Vercel re-renders the page and updates all regions so visitors always get a fast response. Vercel manages caching, request collapsing, and purging automatically when you use ISR with Next.js, SvelteKit, Nuxt, or Astro.

- [How ISR works](/docs/incremental-static-regeneration)
- [Getting started with ISR](/docs/incremental-static-regeneration/quickstart)
- [ISR usage and pricing](/docs/incremental-static-regeneration/limits-and-pricing)
- [Request collapsing](/docs/incremental-static-regeneration/request-collapsing)

### CDN cache and runtime cache

The CDN cache stores responses across Vercel regions, closest to your visitors. The runtime cache stores fetch results, database queries, and computed values inside your functions.

- [CDN cache](/docs/caching/cdn-cache)
- [Cache-Control headers](/docs/caching/cache-control-headers)
- [Runtime cache](/docs/caching/runtime-cache)

## System headers

Every deployment includes system-level headers on requests and responses. You can use these headers to inspect routing decisions, caching status, and request identity for debugging and observability.

- [Response headers](/docs/headers/response-headers)
- [Request headers](/docs/headers/request-headers)

## Image optimization

You can resize, crop, and convert images to modern formats like WebP and AVIF. Vercel transforms and caches the results on the CDN, so you don't need a separate image pipeline.

- [Image optimization](/docs/image-optimization)

## Custom error pages

You can configure branded error pages for 5xx server errors so visitors see a consistent experience when something goes wrong.

- [Custom error pages](/docs/custom-error-pages)

## Pricing and usage

CDN pricing covers three billable resources: Edge Requests, Fast Data Transfer, and Fast Origin Transfer. Edge Requests and Fast Data Transfer include explicit Pro allowances; Vercel bills Fast Origin Transfer on demand on Pro. Pricing can vary by the region where requests originate.

- [CDN pricing and usage](/docs/manage-cdn-usage)
- [Networking usage details](/docs/manage-cdn-usage)


---

[View full sitemap](/docs/sitemap)
