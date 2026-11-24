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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/routing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0bdebf77d6abe31ff15179e7c7baa897860b2bb6f6ff44ce2bfcc716eee076e6"
---

# Routing

Vercel's CDN evaluates routing rules on every request before checking any cache or invoking your functions. You can define rules in your framework configuration, in [`vercel.json`](/docs/project-configuration/vercel-json) or [`vercel.ts`](/docs/project-configuration/vercel-ts), or as [project-level routing rules](/docs/routing/project-routing-rules) from the dashboard. Project-level rules support the same core actions as deployment-level routes, with [a few exceptions](/docs/routing/project-routing-rules#differences-from-deployment-level-routes) like Routing Middleware.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python projects now support routing rules](https://vercel.com/changelog/python-projects-now-support-routing-rules)
- [Vercel's CDN now supports updating routing rules without a new deployment](https://vercel.com/changelog/vercels-cdn-now-supports-updating-routing-rules-without-a-new-deployment)
- [vercel routes](https://vercel.com/docs/cli/routes) — Learn how to manage project-level routing rules using the vercel routes CLI command.
- [Getting Started with Routing Middleware](https://vercel.com/docs/routing-middleware/getting-started) — Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed a
- [Get project routing rules](https://vercel.com/docs/rest-api/project-routes/get-project-routing-rules) — GET /v1/projects/{projectId}/routes — Get the routing rules for a project. Supports searching by name/ID/pattern, filter
- [Services routing](https://vercel.com/docs/services/routing) — Learn how Vercel routes public requests to services and how each service handles its own routes.
- [Add a routing rule](https://vercel.com/docs/rest-api/project-routes/add-a-routing-rule) — POST /v1/projects/{projectId}/routes — Add a single routing rule to a project at a specified position. Defaults to the e

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

## Replacing `.htaccess` rules

Vercel doesn't run [Apache HTTP Server](https://httpd.apache.org/), so it ignores [`.htaccess`](https://httpd.apache.org/docs/2.4/howto/htaccess.html) files. When you move a site from Apache, recreate each rule with the Vercel feature that does the same job:

| `.htaccess` rule                                                   | Vercel equivalent                                                                                                                                                    |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Redirect`, `RedirectMatch`, or `RewriteRule` with the `[R]` flag  | [`redirects`](/docs/project-configuration/vercel-json#redirects) in `vercel.json`, or [bulk redirects](/docs/routing/redirects/bulk-redirects) for thousands of URLs |
| `RewriteRule` that serves a different path or proxies to an origin | [`rewrites`](/docs/project-configuration/vercel-json#rewrites) in `vercel.json`                                                                                      |
| `RewriteCond` that checks a header, cookie, query string, or host  | [`has` and `missing` conditions](/docs/project-configuration/vercel-json#conditional-matching-with-has-and-missing) on a redirect, rewrite, or header                |
| `Header set`                                                       | [`headers`](/docs/project-configuration/vercel-json#headers) in `vercel.json`                                                                                        |
| `ExpiresByType` or a `Cache-Control` header                        | [`Cache-Control` headers](/docs/caching/cache-control-headers)                                                                                                       |
| A rewrite that forces HTTPS                                        | Nothing to configure. The CDN [forwards HTTP requests to HTTPS](/docs/cdn-security/encryption) with a `308` status code                                              |
| Rewrites that remove `.html` extensions or change trailing slashes | [`cleanUrls`](/docs/project-configuration/vercel-json#cleanurls) and [`trailingSlash`](/docs/project-configuration/vercel-json#trailingslash) in `vercel.json`       |
| `Options -Indexes`                                                 | The [Directory Listing](/docs/directory-listing) project setting                                                                                                     |
| `AuthType Basic` with a `.htpasswd` file                           | [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection)                                                                |
| `Deny from` or `Require not ip`                                    | [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking) with the Vercel WAF                                                                                      |
| `mod_deflate` compression rules                                    | Nothing to configure. The CDN [compresses responses](/docs/how-vercel-cdn-works/compression) with Brotli or Gzip                                                     |

If you use a framework such as Next.js, you can define redirects, rewrites, and headers in the framework's configuration instead of `vercel.json`. To change rules without a new deployment, use [project-level routing rules](/docs/routing/project-routing-rules). For rules that need custom logic, use [Routing Middleware](/docs/routing-middleware).

## Learn more

- [Redirects](/docs/routing/redirects)
- [Configuration redirects](/docs/routing/redirects/configuration-redirects)
- [Bulk redirects](/docs/routing/redirects/bulk-redirects)
- [Rewrites](/docs/routing/rewrites)
- [Project-level routing rules](/docs/routing/project-routing-rules)
- [Monitoring and logs](/docs/query/monitoring)
- [Runtime logs](/docs/logs/runtime)

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
