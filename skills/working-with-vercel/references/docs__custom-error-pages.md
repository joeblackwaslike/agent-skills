---
title: Custom error pages
product: vercel
url: /docs/custom-error-pages
canonical_url: "https://vercel.com/docs/custom-error-pages"
last_updated: 2026-08-11
type: how-to
prerequisites:
  []
related:
  - /docs/errors/function_invocation_timeout
  - /docs/errors/function_throttled
  - /docs/headers/request-headers
  - /docs/errors
summary: Learn how to configure custom error pages for 5xx server errors on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/custom-error-pages.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "4ac3a30a03aa9d9a77cad0458a5320d3d8211f6322cdfcb1226e62b54a3ba21b"
---

# Custom error pages

> **🔒 Permissions Required**: Custom error pages


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel now supports customizing platform error pages](https://vercel.com/changelog/vercel-now-supports-customizing-platform-error-pages?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related)
- [Custom 404 Page](https://vercel.com/kb/guide/custom-404-page?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Create a custom 404 page and deploy with Vercel.
- [Custom Errors](https://nextjs.org/docs/pages/building-your-application/routing/custom-error?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Override and extend the built-in Error page to handle custom errors.
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Learn the systematic steps to identify and resolve 404 issues.
- [Avoiding duplicate-content SEO with vercel.app URLs and custom domains](https://vercel.com/kb/guide/avoiding-duplicate-content-with-vercel-app-urls?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Discover why search engines may treat your vercel.app URL and custom domain as separate pages, and how to consolidate ra
- [Redirecting Domains](https://vercel.com/blog/redirecting-domains?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related)
- [What can I do when I run into build output limits with Next.js on Vercel?](https://vercel.com/kb/guide/what-can-i-do-when-i-run-into-build-output-limits-with-next-js-on-vercel?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Learn how to work with build output limits for Next.js on Vercel.
- [Configuration Redirects](https://vercel.com/docs/routing/redirects/configuration-redirects?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern
- [Redirects](https://vercel.com/docs/routing/redirects?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Learn how to use redirects on Vercel to instruct Vercel's platform to redirect incoming requests to a new URL.
- [Features](https://vercel.com/docs/build-output-api/features?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Learn how to customize your deployments using Vercel's build features.
- [Vercel for Platforms](https://vercel.com/docs/platforms?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=related) — Build platforms that serve multiple customers from a single codebase, with custom domains, wildcard subdomains, and auto

Full cross-link map for this page: [/docs/custom-error-pages.graph.md](/docs/custom-error-pages.graph.md?from=related&source_path=%2Fdocs%2Fcustom-error-pages&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Custom error pages let you replace Vercel's platform error pages with your own branded experience. These include errors like [function invocation timeouts](/docs/errors/function_invocation_timeout) or [when your functions are throttled](/docs/errors/function_throttled).

Custom error pages help you:

- **Maintain brand consistency**: Keep your visual identity intact even during platform outages
- **Improve user experience**: Provide helpful messaging, support links, or status page references
- **Reduce user confusion**: Guide users on what to do next instead of showing a technical error

## How it works

When you deploy your project, Vercel automatically scans your build output for error pages and configures routes to cover all platform errors. For most cases, you only need to create a single `500` error page. Vercel automatically uses it as the fallback for all platform errors, so you don't need to design a separate page for each error type.

If a custom error page exists for a specific status code, Vercel uses it; otherwise, it falls back to your `500` error page if one exists.

## Error page tokens

You can include request IDs and error codes in your error pages using metadata tokens. When Vercel serves a custom error page, it replaces these tokens with actual values.

| Token                   | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `::vercel:REQUEST_ID::` | Matches the [`x-vercel-id`](/docs/headers/request-headers#x-vercel-id) header value |
| `::vercel:ERROR_CODE::` | The [error code](/docs/errors) (e.g., `FUNCTION_INVOCATION_TIMEOUT`)                |

> **💡 Note:** Vercel strongly recommends embedding these tokens to help users reference a specific request when contacting support.

## Getting started

Custom error pages must be static files in your build output. Common approaches include:

- Static HTML files (e.g., `500.html`, `504.html`)
- Framework error pages (Next.js App Router: `app/500/page.tsx`, Pages Router: `pages/500.tsx`)
- Files in your public directory

For example, you can create a custom error page by adding a static `500.html` file to your project's `public` directory:

```html filename="public/500.html"
<!doctype html>
<html>
  <head>
    <title>Something went wrong</title>
  </head>
  <body>
    <h1>Something went wrong</h1>
    <p>We're working on it. Please try again later.</p>
    <p>Request ID: ::vercel:REQUEST_ID::</p>
    <p>Error: ::vercel:ERROR_CODE::</p>
  </body>
</html>
```

Deploy your project, and Vercel will serve this page for all platform errors.

For example, if you add only two custom error pages (`500.html` and `504.html`), the routing behavior will be as follows:

| Error     | Destination            |
| --------- | ---------------------- |
| 500       | `/500.html`            |
| 501...503 | `/500.html` (fallback) |
| 504       | `/504.html`            |
| 505...511 | `/500.html` (fallback) |

### Examples

- [Custom error pages with App Router](https://github.com/vercel/examples/tree/main/cdn/custom-error-pages-app-dir/)
- [Custom error pages with public directory](https://github.com/vercel/examples/tree/main/cdn/custom-error-pages-public-dir/)

## Limits

- Custom error pages must be static. Since these pages handle platform errors, they can't rely on server-side rendering or dynamic content that might also fail.


---

[View full sitemap](/docs/sitemap)
