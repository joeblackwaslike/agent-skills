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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/custom-error-pages.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "673157b60b063d4bbae8ab0843843cd54616aa4c39bcf6f429cf5973d186a06f"
---

# Custom error pages

> Custom error pages are available on Enterprise plans

Custom error pages let you replace Vercel's platform error pages with your own branded experience. These include errors like [function invocation timeouts](/docs/errors/function_invocation_timeout) or [when your functions are throttled](/docs/errors/function_throttled).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel now supports customizing platform error pages](https://vercel.com/changelog/vercel-now-supports-customizing-platform-error-pages)
- [Custom 404 Page](https://vercel.com/kb/guide/custom-404-page) — Create a custom 404 page and deploy with Vercel.
- [Configuring Custom Subpaths](https://vercel.com/docs/platforms/multi-tenant-platforms/custom-subpaths) — Host platform content on custom subpaths of customer domains while maintaining a single Next.js application.
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [Add a routing rule](https://vercel.com/docs/rest-api/project-routes/add-a-routing-rule) — POST /v1/projects/{projectId}/routes — Add a single routing rule to a project at a specified position. Defaults to the e
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [Debugging production 500 errors](https://vercel.com/docs/observability/debug-production-errors) — Find, fix, and verify production 500 errors using the Vercel CLI.

Full cross-link map for this page: [/docs/custom-error-pages.graph.md](/docs/custom-error-pages.graph.md)
<!-- /docsgraph:related -->

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
