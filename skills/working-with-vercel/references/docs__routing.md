---
title: Routing
product: vercel
url: /docs/routing
canonical_url: "https://vercel.com/docs/routing"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/project-configuration/vercel-json
  - /docs/project-configuration/vercel-ts
  - /docs/routing/project-routing-rules
  - /docs/routing/redirects/bulk-redirects
  - /docs/caching/cdn-cache
summary: "Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your application."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "b83ddb8b011725036d6cfe8fc7dd4060a7dd25cf36f985fd64c51b450bf6e7b3"
---

# Routing

Vercel's CDN evaluates routing rules on every request before checking any cache or invoking your functions. You can define rules in your framework configuration, in [`vercel.json`](/docs/project-configuration/vercel-json) or [`vercel.ts`](/docs/project-configuration/vercel-ts), or as [project-level routing rules](/docs/routing/project-routing-rules) from the dashboard. Project-level rules support the same core actions as deployment-level routes, with [a few exceptions](/docs/routing/project-routing-rules#differences-from-deployment-level-routes) like Routing Middleware.

## Routing order

Requests flow through multiple routing layers in a fixed order. Each layer can modify, redirect, or terminate the request before it reaches the next step.

**Project Routes** are [project-level routing rules](/docs/routing/project-routing-rules) you configure from the dashboard or API. They run after bulk redirects and before your deployment's own routes. This means you can add, change, or remove rules without deploying new code.

## URL redirects

Redirects send the visitor's browser to a different URL with an HTTP status code (301, 302, 307, or 308). The visitor sees the new URL in their address bar.

Use redirects when you need to:

- Preserve SEO after renaming or moving pages
- Enforce HTTPS or add a trailing slash
- Redirect users based on locale or region
- Handle domain migrations

You can define redirects in `vercel.json` or through your framework's configuration. For large-scale URL changes, [bulk redirects](/docs/routing/redirects/bulk-redirects) let you upload thousands of rules from a CSV file.

## Rewrites within your application

Same-application rewrites map a public URL to a different page or route inside your Vercel project. The visitor's browser still shows the original URL.

Use internal rewrites when you need to:

- Serve different content at the same URL (A/B testing, feature flags)
- Create clean public URLs that map to dynamic routes
- Maintain backward-compatible URLs after restructuring your app

```json
{
  "rewrites": [
    { "source": "/blog/:slug", "destination": "/posts/:slug" }
  ]
}
```

## Rewrites to external origins

External rewrites forward requests to a different backend or API outside your Vercel project. The visitor's browser still shows your domain, while the CDN proxies the request to the external origin.

Use external rewrites when you need to:

- Proxy API requests to an external backend under your domain
- Migrate to Vercel incrementally by routing some paths to your existing infrastructure
- Serve content from a headless CMS or third-party service at your own URL

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://api.example.com/:path*" }
  ]
}
```

Vercel can also [cache responses from external origins](/docs/caching/cdn-cache) to reduce load on your backend.

## Learn more

- [Redirects](/docs/routing/redirects)
- [Configuration redirects](/docs/routing/redirects/configuration-redirects)
- [Bulk redirects](/docs/routing/redirects/bulk-redirects)
- [Rewrites](/docs/routing/rewrites)
- [Project-level routing rules](/docs/routing/project-routing-rules)
- [Monitoring and logs](/docs/observability/monitoring)
- [Runtime logs](/docs/observability/runtime-logs)


---

[View full sitemap](/docs/sitemap)
