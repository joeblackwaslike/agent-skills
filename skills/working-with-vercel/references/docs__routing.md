---
title: Routing
product: vercel
url: /docs/routing
canonical_url: "https://vercel.com/docs/routing"
last_updated: 2026-08-11
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "76eca0d0bbeef1cbbe08c7adc23f09f483f38167c126f278628ea2aeec5ec83c"
---

# Routing

Vercel's CDN evaluates routing rules on every request before checking any cache or invoking your functions. You can define rules in your framework configuration, in [`vercel.json`](/docs/project-configuration/vercel-json) or [`vercel.ts`](/docs/project-configuration/vercel-ts), or as [project-level routing rules](/docs/routing/project-routing-rules) from the dashboard. Project-level rules support the same core actions as deployment-level routes, with [a few exceptions](/docs/routing/project-routing-rules#differences-from-deployment-level-routes) like Routing Middleware.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python projects now support routing rules](https://vercel.com/changelog/python-projects-now-support-routing-rules)
- [Vercel's CDN now supports updating routing rules without a new deployment](https://vercel.com/changelog/vercels-cdn-now-supports-updating-routing-rules-without-a-new-deployment)
- [Redirecting Domains](https://vercel.com/blog/redirecting-domains)
- [Services routing](https://vercel.com/docs/services/routing) — Learn how Vercel routes public requests to services and how each service handles its own routes.
- [Routing Middleware](https://vercel.com/docs/routing-middleware) — Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed a
- [Getting Started with Routing Middleware](https://vercel.com/docs/routing-middleware/getting-started) — Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed a
- [Get project routing rules](https://vercel.com/docs/rest-api/project-routes/get-project-routing-rules) — GET /v1/projects/{projectId}/routes — Get the routing rules for a project. Supports searching by name/ID/pattern, filter
- [vercel routes](https://vercel.com/docs/cli/routes) — Learn how to manage project-level routing rules using the vercel routes CLI command.

Full cross-link map for this page: [/docs/routing.graph.md](/docs/routing.graph.md)
<!-- /docsgraph:related -->

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
- [Monitoring and logs](/docs/query/monitoring)
- [Runtime logs](/docs/logs/runtime)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
