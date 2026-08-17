---
title: Getting Started with Routing Middleware
product: vercel
url: /docs/routing-middleware/getting-started
canonical_url: "https://vercel.com/docs/routing-middleware/getting-started"
last_updated: 2026-07-15
type: tutorial
prerequisites:
  - /docs/routing-middleware
related:
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes/bun
  - /docs/functions/runtimes/edge
  - /docs/project-configuration/vercel-json
  - /docs/routing-middleware/api
summary: Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed and personalization to your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing-middleware/getting-started.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1b75115882dff3cdf7f069c868bcd9bc6da059c3958b8061e437c20d371135a4"
---

# Getting Started with Routing Middleware

Routing Middleware lets you to run code before your pages load, giving you control over incoming requests. It runs close to your users for fast response times and are perfect for redirects, authentication, and request modification.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare?from=related) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [Modifying request headers](https://vercel.com/kb/guide/modify-request-headers?from=related) — Learn how to modify request headers in your Middleware.
- [Migrate to Vercel from Netlify](https://vercel.com/kb/guide/migrate-to-vercel-from-netlify?from=related) — Migrate your website's configuration from Netlify to Vercel
- [Adding a response header](https://vercel.com/kb/guide/add-response-header?from=related) — Learn how to add a response header in your Middleware.
- [Routing](https://vercel.com/docs/routing?from=related) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl
- [Project Routing Rules](https://vercel.com/docs/routing/project-routing-rules?from=related) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Path Routing](https://vercel.com/docs/microfrontends/path-routing?from=related) — Learn about path routing on Vercel.
- [Redirects](https://vercel.com/docs/routing/redirects?from=related) — Learn how to use redirects on Vercel to instruct Vercel's platform to redirect incoming requests to a new URL.

Full cross-link map for this page: [/docs/routing-middleware/getting-started.graph.md](/docs/routing-middleware/getting-started.graph.md)
<!-- /docsgraph:related -->

Routing Middleware is available on the [Node.js](/docs/functions/runtimes/node-js), [Bun](/docs/functions/runtimes/bun), and [Edge](/docs/functions/runtimes/edge) runtimes. Edge is the default runtime for Routing Middleware. To use Node.js, configure the `runtime` in your middleware config. To use Bun, set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in your `vercel.json` file.

> For \['nextjs', 'nextjs-app']:

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
    runtime: 'nodejs', // optional: use 'nodejs' or omit for 'edge' (default)
  };

  export default function middleware(request: Request) {
    console.log('Request to:', request.url);
    return new Response('Logging request URL from Middleware');
  }
  ```
  - Every request to your site will trigger this function
  - You log the request URL to see what's being accessed
  - You return a response to prove the middleware is running
  - The `runtime` config is optional and defaults to `edge`. To use Bun, set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in `vercel.json` instead
  Deploy your project and visit any page. You should see "Logging request URL from Middleware" instead of your normal page content.

- ### Redirecting users
  To redirect users based on their URL, add a new route to your project called `/blog`, and modify your `middleware.ts` to include a redirect condition.
  ```ts v0="build" filename="middleware.ts"
  export const config = {
    runtime: 'nodejs', // optional: use 'nodejs' or omit for 'edge' (default)
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
    return new Response('Other pages work normally');
  }
  ```
  - You use `new URL(request.url)` to parse the incoming URL
  - You check if the path matches `/old-blog`
  - If it does, you return a redirect response (status 302)
  - The `Location` header tells the browser where to go
  Try visiting `/old-blog` - you should be redirected to `/blog`.

- ### Configure which paths trigger the middleware
  By default, Routing Middleware runs on every request. To limit it to specific paths, you can use the [`config`](/docs/routing-middleware/api#config-object) object:
  ```ts v0="build" filename="middleware.ts"
  export default function middleware(request: Request) {
    const url = new URL(request.url);

    // Only handle specific redirects
    if (url.pathname === '/old-blog') {
      return new Response(null, {
        status: 302,
        headers: { Location: '/blog' },
      });
    }

    return new Response('Middleware processed this request');
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
| **Default runtime**                               | [`edge`](/docs/functions/runtimes/edge) (set `runtime: 'nodejs'` in config for [Node.js](/docs/functions/runtimes/node-js)) |
| **Bun runtime**                                   | Set [`bunVersion`](/docs/project-configuration/vercel-json) in `vercel.json` and `runtime: 'nodejs'` in config              |
| **Request object**                                | Standard `Request` API                                                                                                      |
| **Geo headers**                                   | `x-vercel-ip-country`, `x-vercel-ip-country-region`, `x-vercel-ip-city`                                                     |
| **[Path matching](/docs/routing-middleware/api)** | Supports regex, named params, and wildcards in the `matcher` config                                                         |

## Next steps

- [Routing Middleware overview](/docs/routing-middleware)
- [Routing Middleware API reference](/docs/routing-middleware/api)


---

[View full sitemap](/docs/sitemap)
