---
title: Routing Middleware
product: vercel
url: /docs/routing-middleware
canonical_url: "https://vercel.com/docs/routing-middleware"
last_updated: 2026-08-03
type: conceptual
prerequisites:
  []
related:
  - /docs/fluid-compute
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes/edge
  - /docs/frameworks
  - /docs/project-configuration/vercel-json
summary: Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed and personalization to your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing-middleware.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6bbc34e1cb8eb8c3fa82993e84115a21df636a09fbd2f1d9668f115726b7188a"
---

# Routing Middleware

> **🔒 Permissions Required**: Routing Middleware


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Adding a response header](https://vercel.com/kb/guide/add-response-header?from=related) — Learn how to add a response header in your Middleware.
- [Build with an Express starter template](https://vercel.com/kb/guide/build-with-a-express-starter-template?from=related) — Deploy an Express app to Vercel from a template. Browse Express starters from Vercel and the community, then run them lo
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template?from=related) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [Build with a Flask starter template](https://vercel.com/kb/guide/build-with-a-flask-starter-template?from=related) — Deploy a Flask app to Vercel from a starter template. Compare the Flask Hello World starter, AI SDK, alt text generator,
- [Build with a Hono starter template](https://vercel.com/kb/guide/build-with-a-hono-starter-template?from=related) — Deploy a Hono app to Vercel from a starter template. Compare the Hono API starter, MCP server, AI SDK, Slack Bolt, Next.
- [Routing](https://vercel.com/docs/routing?from=related) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [React Router](https://vercel.com/docs/frameworks/frontend/react-router?from=related) — Learn how to use Vercel's features with React Router as a framework.
- [Request Lifecycle](https://vercel.com/docs/fundamentals/infrastructure?from=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Path Routing](https://vercel.com/docs/microfrontends/path-routing?from=related) — Learn about path routing on Vercel.

Full cross-link map for this page: [/docs/routing-middleware.graph.md](/docs/routing-middleware.graph.md)
<!-- /docsgraph:related -->

Routing Middleware **executes code *before* a request is processed on a site**, and are built on top of [fluid compute](/docs/fluid-compute). Based on the request, you can modify the response.

Because it runs globally before the cache, Routing Middleware is an effective way of providing personalization to statically generated content. Depending on the incoming request, you can execute custom logic, rewrite, redirect, add headers and more, before returning a response.

Routing Middleware configured with the `proxy` property runs on the [Node.js](/docs/functions/runtimes/node-js) runtime. With the  file convention, the default is [Edge](/docs/functions/runtimes/edge). See [runtime options](#runtime-options) for information on how to change the runtime of your Routing Middleware.

> For \['nextjs', 'nextjs-app']:

## Creating a Routing Middleware

You can use Routing Middleware with [**any framework**](/docs/frameworks). To add a Routing Middleware to your app, point the [`proxy`](/docs/project-configuration/vercel-json#proxy) property in `vercel.json` at your entrypoint:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy.ts"
  }
}
```

Your entrypoint exports the handler as a default export:

```ts v0="build" filename="proxy.ts" framework=all
export default function proxy(request: Request) {
  const url = new URL(request.url);

  // Redirect old paths
  if (url.pathname === '/old-page') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/new-page' },
    });
  }

  // Continue to next handler
  return new Response('Hello from your Middleware!');
}
```

```js v0="build" filename="proxy.js" framework=all
export default function proxy(request) {
  const url = new URL(request.url);

  // Redirect old paths
  if (url.pathname === '/old-page') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/new-page' },
    });
  }

  // Continue to next handler
  return new Response('Hello from your Middleware!');
}
```

The entrypoint can live in a subdirectory, such as `src/proxy.ts`. Add [`proxy.matcher`](/docs/project-configuration/vercel-json#proxy) to limit which paths run your Routing Middleware.

> **💡 Note:** You can't use `proxy` with frameworks that build their own routing
> middleware, such as Next.js and Astro. In Next.js 16 and later, add a
> `proxy.ts` file at your project root instead. See the [Next.js proxy
> documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
> for details.

### Using the file convention

You can also create a  file at your project's root directory and skip `vercel.json`:

```ts filename="middleware.ts" framework=all
export default function middleware(request: Request) {
  return new Response('Hello from your Middleware!');
}

export const config = {
  runtime: 'nodejs',
};
```

```js filename="middleware.js" framework=all
export default function middleware(request) {
  return new Response('Hello from your Middleware!');
}

export const config = {
  runtime: 'nodejs',
};
```

> For \['nextjs', 'nextjs-app']:

## Logging

Routing Middleware has full support for the [`console`](https://developer.mozilla.org/docs/Web/API/Console) API, including `time`, `debug`, `timeEnd`. Logs will appear inside your Vercel project by clicking **View Functions Logs** next to the deployment.

## Using a database with Routing Middleware

If your Routing Middleware depends on a database far away from one of [our supported regions](/docs/regions), the overall latency of API requests could be slower than expected, due to network latency while connecting to the database from an edge region. To avoid this issue, use a global database. Vercel has multiple global storage products, including [Global Config](/docs/global-config) and [Vercel Blob](/docs/vercel-blob). You can also explore the storage category of the [Vercel Marketplace](/marketplace?category=storage) to learn which option is best for you.

## Limits on requests

The following limits apply to requests processed by Routing Middleware:

| Name                              | Limit |
| --------------------------------- | ----- |
| Maximum URL length                | 14 KB |
| Maximum request body length       | 4 MB  |
| Maximum number of request headers | 64    |
| Maximum request headers length    | 16 KB |

## Runtime options

Routing Middleware is available on the [Node.js](/docs/functions/runtimes/node-js), [Bun](/docs/functions/runtimes/bun), and [Edge](/docs/functions/runtimes/edge) runtimes. An entrypoint set through the [`proxy`](/docs/project-configuration/vercel-json#proxy) property runs on Node.js.

With the  file convention, the default runtime is Edge. You can change the runtime to Node.js by exporting a [`config`](/docs/routing-middleware/api#config-object) object with a `runtime` property in your  file.

> For \['nextjs', 'nextjs-app']:

To use the Bun runtime, set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in your `vercel.json` file and your runtime config to `nodejs`.

```ts filename="middleware.ts" framework=other
export const config = {
  runtime: 'nodejs', // or 'edge' (default)
};
export default function middleware(request: Request) {
  // Your middleware logic here
  return new Response('Hello from your Middleware!');
}
```

```js filename="middleware.js" framework=other
export const config = {
  runtime: 'nodejs' // or 'edge' (default)
}
export default function middleware(request: Request) {
  // Your middleware logic here
  return new Response('Hello from your Middleware!');
}
```

## Pricing

Routing Middleware is priced using the [fluid compute](/docs/fluid-compute) model, which means you are charged by the amount of compute resources used by your Routing Middleware. See the [fluid compute pricing documentation](/docs/functions/usage-and-pricing) for more information.

## Observability

The [Vercel Observability dashboard](/docs/observability) provides visibility into your routing middleware usage, including invocation counts and performance metrics. You can get more [insights](/docs/observability/insights) with [Observability Plus](/docs/observability/observability-plus):

- Analyze invocations by request path
- Break down actions by type, such as redirects or rewrites
- View rewrite targets and frequency
- Use the query builder for custom insights

## More resources

Learn more about Routing Middleware by exploring the following resources:

- [Getting Started with Routing Middleware](/docs/routing-middleware/getting-started)
- [Routing Middleware API Reference](/docs/routing-middleware/api)
- [Fluid compute](/docs/fluid-compute)
- [Runtimes](/docs/functions/runtimes)


---

[View full sitemap](/docs/sitemap)
