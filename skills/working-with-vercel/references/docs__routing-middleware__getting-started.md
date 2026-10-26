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
  - /docs/functions/runtimes/python
  - /docs/project-configuration/vercel-json
  - /docs/functions/functions-api-reference/vercel-functions-package
summary: Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed and personalization to your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing-middleware/getting-started.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "398bac007b9c466a6858bde13de9d801977f6a40dcb675d509e8361778c8503b"
---

# Getting Started with Routing Middleware

Routing Middleware lets you to run code before your pages load, giving you control over incoming requests. It runs close to your users for fast response times and are perfect for redirects, authentication, and request modification.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [Vercel Edge Middleware: Dynamic at the speed of static (historical)](https://vercel.com/blog/vercel-edge-middleware-dynamic-at-the-speed-of-static)
- [Redirecting Domains](https://vercel.com/blog/redirecting-domains)
- [How can I increase the limit of redirects or use dynamic redirects on Vercel?](https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel) — Instructions on how to use Serverless Functions to handle redirects on Vercel.
- [Routing](https://vercel.com/docs/routing) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [React Router on Vercel](https://vercel.com/docs/frameworks/frontend/react-router) — Deploy React Router applications with SSR or SPA mode, then configure the Vercel preset, streaming, caching, and analyti
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Microfrontends Routing](https://vercel.com/docs/microfrontends/routing) — Configure which microfrontend handles each path and understand how Vercel selects deployments.

Full cross-link map for this page: [/docs/routing-middleware/getting-started.graph.md](/docs/routing-middleware/getting-started.graph.md)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me set up Routing Middleware in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then, in the language this project uses: 1. Create the entrypoint at the project root: proxy.ts or proxy.js for TypeScript or JavaScript, or proxy.py with a top-level ASGI or WSGI app, such as `proxy = Proxy()` from the vercel-proxy package, for Python. 2. Set `proxy.entrypoint` in vercel.json to the file path for TypeScript or JavaScript, such as `proxy.ts`, or to `proxy:proxy` for Python. For Python, list the entrypoint's packages under `'vercel.proxy'` in `[dependency-groups]` in pyproject.toml. If using Next.js, skip vercel.json and add proxy.ts at the project root for Next.js 16+, or middleware.ts for earlier versions. 3. Add a redirect from /old-blog to /blog. 4. Set `proxy.matcher` to run on all paths except static files and images. 5. Test locally with `vercel dev`, then deploy with `vercel --prod`.
```

Routing Middleware is available on the [Node.js](/docs/functions/runtimes/node-js), [Bun](/docs/functions/runtimes/bun), and [Python](/docs/functions/runtimes/python) runtimes. Node.js is the default runtime for TypeScript and JavaScript Routing Middleware, and Python Routing Middleware runs on Python. To use Bun, set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in your `vercel.json` file.

## What you will learn

- Create your first Routing Middleware
- Redirect users based on URLs
- Add conditional logic to handle different scenarios
- Configure which paths your Routing Middleware runs on

## Prerequisites

- A Vercel project
- Basic knowledge of TypeScript, JavaScript, or Python

## Creating Routing Middleware

The following steps will guide you through creating your first Routing Middleware.

- ### Create a new file for your Routing Middleware
  Create a file called `proxy.ts`, `proxy.js`, or `proxy.py` in your project root and add the following code:
  #### TypeScript
  ```ts v0="build" filename="proxy.ts"
  export default function proxy(request: Request) {
    console.log('Request to:', request.url);
    return new Response('Logging request URL from Middleware');
  }
  ```
  #### Python
  ```python filename="proxy.py"
  from vercel.proxy import PlainTextResponse, Proxy, Request, Response

  proxy = Proxy()


  @proxy.route("/{path:path}")
  def log_request(request: Request) -> Response:
      print("Request to:", request.url)
      return PlainTextResponse("Logging request URL from Middleware")
  ```
  - Every request to your site will trigger this function
  - You log the request URL to see what's being accessed
  - You return a response to prove the middleware is running
  In Python, `Proxy` from the `vercel-proxy` helper package sends each request to the first route that matches its path, and `{path:path}` matches every path.

- ### Point Vercel at your Routing Middleware
  You can tell Vercel where your Routing Middleware is with the `proxy` property or with the file convention. Next.js apps must use the file convention instead, with `proxy.ts` in Next.js 16 and later, or `middleware.ts` in earlier versions.

  **Using the `proxy` property:** Set [`proxy.entrypoint`](/docs/project-configuration/vercel-json#proxy) in `vercel.json`. Use the file path for TypeScript and JavaScript, or `module:attribute` for Python:
  #### TypeScript
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "proxy": {
      "entrypoint": "proxy.ts"
    }
  }
  ```
  #### Python
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "proxy": {
      "entrypoint": "proxy:proxy"
    }
  }
  ```
  Your Routing Middleware runs with only the packages in the `vercel.proxy` dependency group. Add the group, with the packages your Routing Middleware imports, to `pyproject.toml`:
  ```toml filename="pyproject.toml"
  [dependency-groups]
  "vercel.proxy" = ["vercel-proxy"]
  ```
  **Using the file convention (TypeScript and JavaScript):** Rename your file to `middleware.ts` or `middleware.js` and keep it in your project root, at the same level as your `package.json`. You don't need `vercel.json`. The `runtime` config is optional and defaults to `nodejs`:
  #### TypeScript
  ```ts filename="middleware.ts"
  export const config = {
    runtime: 'nodejs',
  };

  export default function middleware(request: Request) {
    console.log('Request to:', request.url);
    return new Response('Logging request URL from Middleware');
  }
  ```
  #### JavaScript
  ```js filename="middleware.js"
  export const config = {
    runtime: 'nodejs',
  };

  export default function middleware(request) {
    console.log('Request to:', request.url);
    return new Response('Logging request URL from Middleware');
  }
  ```
  Deploy your project and visit any page. You should see "Logging request URL from Middleware" instead of your normal page content.

- ### Redirecting users
  To redirect users based on their URL, add a new route to your project called `/blog`, and update your Routing Middleware to include a redirect condition:
  #### TypeScript
  ```ts v0="build" filename="proxy.ts"
  import { next } from '@vercel/functions';

  export default function proxy(request: Request) {
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
  #### Python
  ```python filename="proxy.py"
  from vercel.proxy import Proxy, RedirectResponse, Request, Response

  proxy = Proxy()


  # Redirect old blog path to new one
  @proxy.route("/old-blog")
  def old_blog(request: Request) -> Response:
      return RedirectResponse("/blog", status_code=302)


  # Requests that match no route continue to your app unchanged
  ```
  - You use `new URL(request.url)` to parse the incoming URL
  - You check if the path matches `/old-blog`
  - If it does, you return a redirect response (status 302)
  - The `Location` header tells the browser where to go
  - For every other path, `next()` from the [`@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package) package lets the request continue to your page. In Python, requests that match no route continue to your app unchanged
  Try visiting `/old-blog` - you should be redirected to `/blog`.

- ### Configure which paths trigger the middleware
  By default, Routing Middleware runs on every request. To limit it to specific paths, set `proxy.matcher` in `vercel.json`:
  #### TypeScript
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "proxy": {
      "entrypoint": "proxy.ts",
      "matcher": [
        "/((?!static|favicon.ico).*)"
      ]
    }
  }
  ```
  #### Python
  ```json filename="vercel.json"
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "proxy": {
      "entrypoint": "proxy:proxy",
      "matcher": [
        "/((?!static|favicon.ico).*)"
      ]
    }
  }
  ```
  - The `matcher` array defines which paths trigger your Routing Middleware
  - The regex excludes paths under `/static` and `/favicon.ico`, so requests for static files skip your Routing Middleware
  - You can also use simple patterns like `/blog/:path*` for specific sections
  If you use the file convention, export a [`config`](/docs/routing-middleware/js-reference#config-object) object with a `matcher` property instead:
  #### TypeScript
  ```ts filename="middleware.ts"
  export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
  };
  ```
  #### JavaScript
  ```js filename="middleware.js"
  export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
  };
  ```
  See [path matching](/docs/routing-middleware#path-matching) for the full matcher syntax.

- ### Debugging Routing Middleware
  When things don't work as expected:
  1. **Check the logs**: Log liberally and check your [Vercel dashboard](/dashboard) **Logs** section in the sidebar
  2. **Test the matcher**: Make sure your paths are actually triggering the Routing Middleware
  3. **Verify headers**: Log the request headers to see what's available
  4. **Test locally**: Routing Middleware works in development too so you can debug before deploying
  #### TypeScript
  ```ts filename="proxy.ts"
  export default function proxy(request: Request) {
    // Debug logging
    console.log('URL:', request.url);
    console.log('Method:', request.method);
    console.log('Headers:', Object.fromEntries(request.headers.entries()));

    // Your middleware logic here...
  }
  ```
  #### Python
  ```python filename="proxy.py"
  from vercel.proxy import ContinueResponse, Proxy, Request, Response

  proxy = Proxy()


  @proxy.route("/{path:path}")
  def debug(request: Request) -> Response:
      # Debug logging
      print("URL:", request.url)
      print("Method:", request.method)
      print("Headers:", dict(request.headers))

      # Your middleware logic here...
      return ContinueResponse()
  ```

## Middleware reference

#### TypeScript

| Detail                                                                   | Value                                                                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Entrypoint**                                                           | Any path set with [`proxy.entrypoint`](/docs/project-configuration/vercel-json#proxy), or `middleware.ts` in project root (`proxy.ts` for Next.js 16+) |
| **Export**                                                               | `export default function middleware(request: Request)` (or `export function proxy` for Next.js 16+)                                                    |
| **[Config export](/docs/routing-middleware/js-reference#config-object)** | `export const config = { matcher: [...] }`                                                                                                             |
| **Default runtime**                                                      | [`nodejs`](/docs/functions/runtimes/node-js)                                                                                                           |
| **Bun runtime**                                                          | Set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in `vercel.json` and `runtime: 'nodejs'` in config                              |
| **Request object**                                                       | Standard `Request` API                                                                                                                                 |
| **[Path matching](/docs/routing-middleware#path-matching)**              | Supports regex, named params, and wildcards in the `matcher` config                                                                                    |

#### Python

| Detail                                                      | Value                                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Entrypoint**                                              | A `module:attribute` value set with [`proxy.entrypoint`](/docs/project-configuration/vercel-json#proxy) |
| **Export**                                                  | A top-level ASGI or WSGI app, such as `proxy = Proxy()`                                                 |
| **Default runtime**                                         | [Python](/docs/functions/runtimes/python)                                                               |
| **Dependencies**                                            | The `vercel.proxy` dependency group in `pyproject.toml`                                                 |
| **Request object**                                          | Starlette `Request`                                                                                     |
| **[Path matching](/docs/routing-middleware#path-matching)** | Supports regex, named params, and wildcards in `proxy.matcher`                                          |

Vercel adds [geolocation headers](/docs/routing-middleware#geolocation-headers), such as `x-vercel-ip-country`, to every request.

## Next steps

- [Routing Middleware overview](/docs/routing-middleware)
- [Routing Middleware JS reference](/docs/routing-middleware/js-reference)
- [Routing Middleware Python reference](/docs/routing-middleware/python-reference)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
