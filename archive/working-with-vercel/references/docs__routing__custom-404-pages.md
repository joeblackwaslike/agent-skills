---
title: Custom 404 Pages
product: vercel
url: /docs/routing/custom-404-pages
canonical_url: "https://vercel.com/docs/routing/custom-404-pages"
last_updated: 2026-11-17
type: how-to
prerequisites:
  - /docs/routing
related:
  - /docs/errors/not_found
  - /docs/custom-error-pages
  - /docs/builds/configure-a-build
  - /docs/project-configuration/vercel-json
  - /docs/directory-listing
summary: Learn how to serve a custom 404 page on Vercel with your framework, a static 404.html file, or a JSON response for API routes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/routing/custom-404-pages.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "d4c2e2f2cdeedb1cd6cf7c1a1105e0cad7d64b5dc865c8a72210eceeb74dedf9"
---

# Custom 404 Pages

When a request doesn't match a file, function, or route in your deployment, Vercel responds with a `404` status code and a default [`NOT_FOUND`](/docs/errors/not_found) error page. To show your own page instead, create a 404 page with your framework or add a `404.html` file to your build output. Custom 404 pages don't need any Vercel configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel now supports customizing platform error pages](https://vercel.com/changelog/vercel-now-supports-customizing-platform-error-pages)
- [Supported Frameworks on Vercel](https://vercel.com/docs/frameworks/more-frameworks) — Learn about the frameworks that can be deployed to Vercel.
- [Add a routing rule](https://vercel.com/docs/rest-api/project-routes/add-a-routing-rule) — POST /v1/projects/{projectId}/routes — Add a single routing rule to a project at a specified position. Defaults to the e
- [Frontends on Vercel](https://vercel.com/docs/frameworks/frontend) — Vercel supports a wide range of the most popular frontend frameworks, optimizing how your application builds and runs no
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [React Router on Vercel](https://vercel.com/docs/frameworks/frontend/react-router) — Deploy React Router applications with SSR or SPA mode, then configure the Vercel preset, streaming, caching, and analyti

Full cross-link map for this page: [/docs/routing/custom-404-pages.graph.md](/docs/routing/custom-404-pages.graph.md)
<!-- /docsgraph:related -->

To replace the pages that Vercel shows for platform errors with `5xx` status codes, such as function timeouts, see [custom error pages](/docs/custom-error-pages).

## Create a 404 page with your framework

Most frameworks have a convention for a 404 page. When your project uses one, requests that don't match a route receive that page with a `404` status code:

| Framework | Where to create the page | Framework documentation |
| --- | --- | --- |
| Next.js (App Router) | `app/not-found.tsx` | [`not-found.js`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) |
| Next.js (Pages Router) | `pages/404.tsx` | [Custom errors](https://nextjs.org/docs/pages/building-your-application/routing/custom-error) |
| Astro | `src/pages/404.astro` | [Custom 404 error page](https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page) |
| SvelteKit | `src/routes/+error.svelte` | [Error pages](https://svelte.dev/docs/kit/routing#error) |
| Nuxt | `error.vue` | [Error page](https://nuxt.com/docs/getting-started/error-handling#error-page) |
| Gatsby | `src/pages/404.js` | [Adding a 404 page](https://www.gatsbyjs.com/docs/how-to/adding-common-features/add-404-page/) |
| Hugo | `layouts/404.html` | [404 templates](https://gohugo.io/templates/404/) |
| Jekyll | `404.html` with `permalink: /404.html` in front matter | [Custom 404 page](https://jekyllrb.com/tutorials/custom-404-page/) |
| Eleventy | `404.md` with `permalink: 404.html` in front matter | [Adding a 404 not found page](https://www.11ty.dev/docs/quicktips/not-found/) |

## Add a 404.html file to a static site

If your project has no framework, or your framework doesn't create a 404 page, add a file named `404.html` to the root of your [output directory](/docs/builds/configure-a-build#output-directory). Vercel serves the file with a `404` status code for every request that doesn't match another file and doesn't start with `/api`.

For example, a project that deploys its `public` directory can add the page at `public/404.html`:

```html filename="public/404.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Page not found</title>
  </head>
  <body>
    <h1>Page not found</h1>
    <p>The page you requested doesn't exist.</p>
    <a href="/">Go to the home page</a>
  </body>
</html>
```

Static site generators that write a `404.html` file to their output directory use the same behavior, so their 404 page works without further setup.

## Handle unknown routes in a single-page application

A single-page application (SPA) usually [rewrites every path to `index.html`](/docs/project-configuration/vercel-json#rewrites) and lets a client-side router choose what to render. Because every request matches that rewrite, Vercel never serves `404.html`. Add a catch-all route to your router that renders a "not found" view instead.

For example, with React Router:

```tsx filename="src/app.tsx"
import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './home';
import { NotFound } from './not-found';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

> **💡 Note:** A "not found" view that a client-side router renders still has a `200`
> status code, which search engines can treat as a soft 404. If unknown URLs
> need a real `404` status code, render those routes on the server or
> prerender them with a framework that supports it.

## Return a JSON 404 response for API routes

A `404.html` page doesn't apply to requests under `/api`. To return JSON when a request doesn't match any of your API routes, create a function that responds with a `404` status code:

```ts filename="api/404.ts"
export default {
  fetch() {
    return Response.json({ error: 'Not Found' }, { status: 404 });
  },
};
```

Then add a rewrite as the last entry in the [`rewrites`](/docs/project-configuration/vercel-json#rewrites) array of your `vercel.json` file. A rewrite applies only when no file or function has the requested path, so API routes with fixed paths, such as `api/users.ts`, keep working:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/api/(.*)", "destination": "/api/404" }]
}
```

A request to `/api/does-not-exist` now returns the JSON response, and a request to `/does-not-exist` returns your `404.html` page.

> **💡 Note:** Vercel matches dynamic API routes, such as `api/users/[id].ts`, after your
> rewrites. This rewrite also answers requests for those routes, so only use
> it in a project whose API routes all have fixed paths.

In a Next.js project, Next.js handles requests under `/api` and returns its own `404` response for routes that don't exist, so this rewrite isn't needed.

## Test your 404 page

After you deploy, request a path that doesn't exist and check the status code:

```bash filename="terminal"
curl -I https://your-domain.com/does-not-exist
```

The response starts with `HTTP/2 404`. Open the same URL in a browser to check that your page renders.

A custom 404 page doesn't prevent [Directory Listing](/docs/directory-listing). When Directory Listing is enabled and a requested directory contains files but no index file, Vercel shows the Directory Listing instead of your 404 page.

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
