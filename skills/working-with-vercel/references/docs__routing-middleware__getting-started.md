---
title: Getting Started with Routing Middleware
product: vercel
url: /docs/routing-middleware/getting-started
canonical_url: "https://vercel.com/docs/routing-middleware/getting-started"
last_updated: 2026-08-14
type: tutorial
prerequisites:
  - /docs/routing-middleware
related:
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes/bun
  - /docs/project-configuration/vercel-json
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/routing-middleware/api
summary: Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed and personalization to your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing-middleware/getting-started.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "c4a96e52d6d1bb066774e31129201532e6978ed90526a30447ff12d1e52a40d0"
---

# Getting Started with Routing Middleware

Routing Middleware lets you to run code before your pages load, giving you control over incoming requests. It runs close to your users for fast response times and are perfect for redirects, authentication, and request modification.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [Modifying request headers](https://vercel.com/kb/guide/modify-request-headers?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn how to modify request headers in your Middleware.
- [Vercel Edge Middleware: Dynamic at the speed of static (historical)](https://vercel.com/blog/vercel-edge-middleware-dynamic-at-the-speed-of-static?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [Adding a response header](https://vercel.com/kb/guide/add-response-header?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn how to add a response header in your Middleware.
- [Rendering content based on device](https://vercel.com/kb/guide/rendering-content-based-on-device?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn how to render different content based on the user agent in your Middleware.
- [How can I increase the limit of redirects or use dynamic redirects on Vercel?](https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Instructions on how to use Serverless Functions to handle redirects on Vercel.
- [Life of a Vercel request: Application-aware routing](https://vercel.com/blog/life-of-a-request-application-aware-routing?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [Routing](https://vercel.com/docs/routing?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl
- [Features](https://vercel.com/docs/build-output-api/features?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [React Router on Vercel](https://vercel.com/docs/frameworks/frontend/react-router?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Deploy React Router applications with SSR or SPA mode, then configure the Vercel preset, streaming, caching, and analyti
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Microfrontends Routing](https://vercel.com/docs/microfrontends/routing?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=related) — Configure which microfrontend handles each path and understand how Vercel selects deployments.

Full cross-link map for this page: [/docs/routing-middleware/getting-started.graph.md](/docs/routing-middleware/getting-started.graph.md?from=related&source_path=%2Fdocs%2Frouting-middleware%2Fgetting-started&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me set up Routing Middleware in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Create a middleware file (middleware.ts at the project root, or proxy.ts if using Next.js 16+). 2. Add a redirect from /old-blog to /blog. 3. Configure the matcher to run on all paths except static files and images. 4. Test locally with `vercel dev`, then deploy with `vercel --prod`.
```

Routing Middleware is available on the [Node.js](/docs/functions/runtimes/node-js) and [Bun](/docs/functions/runtimes/bun) runtimes. Node.js is the default runtime for Routing Middleware. To use Bun, set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in your `vercel.json` file.

## What you will learn

- Create your first Routing Middleware
- Redirect users based on URLs
- Add conditional logic to handle different scenarios
- Configure which paths your Routing Middleware runs on

## Prerequisites

- A Vercel project
- Basic knowledge of JavaScript/TypeScript

## Creating a Routing Middleware

The following steps will guide you through creating your first Routing Middleware.

- ### Create a new file for your Routing Middleware
  Create a file called `middleware.ts` in your project root (same level as your `package.json`) and add the following code:
  ```ts v0="build" filename="middleware.ts"
  export const config = {
    runtime: 'nodejs',
  };

  export default function middleware(request: Request) {
    console.log('Request to:', request.url);
    return new Response('Logging request URL from Middleware');
  }
  ```
  - Every request to your site will trigger this function
  - You log the request URL to see what's being accessed
  - You return a response to prove the middleware is running
  - The `runtime` config is optional and defaults to `nodejs`. To use Bun, set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in `vercel.json` instead
  Deploy your project and visit any page. You should see "Logging request URL from Middleware" instead of your normal page content.

- ### Redirecting users
  To redirect users based on their URL, add a new route to your project called `/blog`, and modify your `middleware.ts` to include a redirect condition.
  ```ts v0="build" filename="middleware.ts"
  import { next } from '@vercel/functions';

  export const config = {
    runtime: 'nodejs',
  };

  export default function middleware(request: Request) {
    const url = new URL(request.url);

    // Redirect old blog path to new one
    if (url.pathname === '/old-blog') {
      return new Response(null, {
        status: 302,
        headers: { Location: '/blog' },
      });
    }

    // Let other requests continue normally
    return next();
  }
  ```
  - You use `new URL(request.url)` to parse the incoming URL
  - You check if the path matches `/old-blog`
  - If it does, you return a redirect response (status 302)
  - The `Location` header tells the browser where to go
  - For every other path, `next()` from the [`@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package) package lets the request continue to your page
  Try visiting `/old-blog` - you should be redirected to `/blog`.

- ### Configure which paths trigger the middleware
  By default, Routing Middleware runs on every request. To limit it to specific paths, you can use the [`config`](/docs/routing-middleware/api#config-object) object:
  ```ts v0="build" filename="middleware.ts"
  import { next } from '@vercel/functions';

  export default function middleware(request: Request) {
    const url = new URL(request.url);

    // Only handle specific redirects
    if (url.pathname === '/old-blog') {
      return new Response(null, {
        status: 302,
        headers: { Location: '/blog' },
      });
    }

    // Let other requests continue normally
    return next();
  }

  // Configure which paths trigger the Middleware
  export const config = {
    matcher: [
      // Run on all paths except static files
      '/((?!_next/static|_next/image|favicon.ico).*)',
      // Or be more specific:
      // '/blog/:path*',
      // '/api/:path*'
    ],
  };
  ```
  - The [`matcher`](/docs/routing-middleware/api#match-paths-based-on-custom-matcher-config) array defines which paths trigger your Routing Middleware
  - The regex excludes static files (images, CSS, etc.) for better performance
  - You can also use simple patterns like `/blog/:path*` for specific sections
  See the [API Reference](/docs/routing-middleware/api) for more details on the `config` object and matcher patterns.

- ### Debugging Routing Middleware
  When things don't work as expected:
  1. **Check the logs**: Use `console.log()` liberally and check your [Vercel dashboard](/dashboard) **Logs** section in the sidebar
  2. **Test the matcher**: Make sure your paths are actually triggering the Routing Middleware
  3. **Verify headers**: Log `request.headers` to see what's available
  4. **Test locally**: Routing Middleware works in development too so you can debug before deploying
  ```ts filename="middleware.ts"
  export default function middleware(request: Request) {
    // Debug logging
    console.log('URL:', request.url);
    console.log('Method:', request.method);
    console.log('Headers:', Object.fromEntries(request.headers.entries()));

    // Your middleware logic here...
  }
  ```

## Middleware reference

| Detail                                            | Value                                                                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **File location**                                 | Any path set with [`proxy.entrypoint`](/docs/project-configuration/vercel-json#proxy), or `middleware.ts` in project root (`proxy.ts` for Next.js 16+) |
| **Export**                                        | `export default function middleware(request: Request)` (or `export function proxy` for Next.js 16+)                         |
| **[Config export](/docs/routing-middleware/api)** | `export const config = { matcher: [...] }`                                                                                  |
| **Default runtime**                               | [`nodejs`](/docs/functions/runtimes/node-js)                                                                                |
| **Bun runtime**                                   | Set [`bunVersion`](/docs/project-configuration/vercel-json) in `vercel.json` and `runtime: 'nodejs'` in config              |
| **Request object**                                | Standard `Request` API                                                                                                      |
| **Geo headers**                                   | `x-vercel-ip-country`, `x-vercel-ip-country-region`, `x-vercel-ip-city`                                                     |
| **[Path matching](/docs/routing-middleware/api)** | Supports regex, named params, and wildcards in the `matcher` config                                                         |

## Next steps

- [Routing Middleware overview](/docs/routing-middleware)
- [Routing Middleware API reference](/docs/routing-middleware/api)


---

[View full sitemap](/docs/sitemap)
