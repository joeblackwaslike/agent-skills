---
title: Routing Middleware
product: vercel
url: /docs/routing-middleware
canonical_url: "https://vercel.com/docs/routing-middleware"
last_updated: 2026-08-14
type: conceptual
prerequisites:
  []
related:
  - /docs/fluid-compute
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes/bun
  - /docs/functions/runtimes/python
  - /docs/project-configuration/vercel-json
summary: Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed and personalization to your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing-middleware.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "7ecf3f91d24f4f3096f898d2f5602606b7bd7617f50ea29186270ae59e7dabb8"
---

# Routing Middleware

> Routing Middleware is available on all plans

Routing Middleware **executes code *before* a request is processed on a site**, and are built on top of [fluid compute](/docs/fluid-compute). Based on the request, you can modify the response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Advanced Remix integration with streaming SSR and multi-runtime support](https://vercel.com/changelog/advanced-remix-integration-with-streaming-ssr-and-multi-runtime-support)
- [Edge Config is now generally available ](https://vercel.com/changelog/edge-config-is-now-generally-available)
- [Edge Function metrics now available in Monitoring](https://vercel.com/changelog/edge-function-metrics-now-available-in-monitoring)
- [Edge Functions are now available in Public Beta](https://vercel.com/changelog/edge-functions-are-now-available-in-public-beta)
- [Edge Functions are now generally available](https://vercel.com/changelog/edge-functions-are-now-generally-available)
- [A/B Testing on Vercel](https://vercel.com/kb/guide/ab-testing-on-vercel) — Learn best practices for A/B testing on Vercel
- [Build with an Express starter template](https://vercel.com/kb/guide/build-with-a-express-starter-template) — Deploy an Express app to Vercel from a template. Browse Express starters from Vercel and the community, then run them lo
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [Build with a Flask starter template](https://vercel.com/kb/guide/build-with-a-flask-starter-template) — Deploy a Flask app to Vercel from a starter template. Compare the Flask Hello World starter, AI SDK, alt text generator,
- [Build with a Hono starter template](https://vercel.com/kb/guide/build-with-a-hono-starter-template) — Deploy a Hono app to Vercel from a starter template. Compare the Hono API starter, MCP server, AI SDK, Slack Bolt, Next.
- [Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure)
- [Billions of dollars, billions of requests: Black Friday-Cyber Monday 2024](https://vercel.com/blog/black-friday-cyber-monday-2024-recap)

Full cross-link map for this page: [/docs/routing-middleware.graph.md](/docs/routing-middleware.graph.md)
<!-- /docsgraph:related -->

Because it runs globally before the cache, Routing Middleware is an effective way of providing personalization to statically generated content. Depending on the incoming request, you can execute custom logic, rewrite, redirect, add headers and more, before returning a response.

You can write Routing Middleware in TypeScript or JavaScript, which run on [Node.js](/docs/functions/runtimes/node-js) or [Bun](/docs/functions/runtimes/bun), or in Python, which runs on [Python](/docs/functions/runtimes/python). See [runtime options](#runtime-options) for details.

## Static configuration or Routing Middleware

If your routing logic doesn't need custom code, use static configuration instead of Routing Middleware. Static rules run directly on the CDN without invoking your code on every request, so they're faster and use fewer resources.

You can express these common tasks with static configuration in [`vercel.json`](/docs/project-configuration/vercel-json) or [project routing rules](/docs/routing/project-routing-rules):

| Task                                                      | Static configuration                                                                                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Redirect paths                                            | [Redirects](/docs/routing/redirects)                                                                                                  |
| Rewrite to another path or an external origin             | [Rewrites](/docs/routing/rewrites)                                                                                                    |
| Add response headers                                      | [`headers`](/docs/project-configuration/vercel-json#headers)                                                                          |
| Add, change, or remove request headers sent to your app   | [Route transforms](/docs/project-configuration/vercel-json#transform-object-definition)                                                         |
| Route based on a header, cookie, query parameter, or host | [`has` and `missing` conditions](/docs/project-configuration/vercel-json#conditional-matching-with-has-and-missing)            |

Use Routing Middleware when the decision depends on logic that static rules can't express, such as verifying a session token, calling an API, or assigning visitors to an A/B test.

## Creating Routing Middleware

To add Routing Middleware to your app, point the [`proxy`](/docs/project-configuration/vercel-json#proxy) property in `vercel.json` at your entrypoint:

#### TypeScript

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy.ts"
  }
}
```

```ts v0="build" filename="proxy.ts"
import { next } from '@vercel/functions';

export default function proxy(request: Request) {
  const url = new URL(request.url);

  // Redirect old paths
  if (url.pathname === '/old-page') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/new-page' },
    });
  }

  // Continue to the next handler
  return next();
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

```python filename="proxy.py"
from vercel.proxy import Proxy, RedirectResponse, Request, Response

proxy = Proxy()


# Redirect old paths
@proxy.route("/old-page")
def old_page(request: Request) -> Response:
    return RedirectResponse("/new-page", status_code=302)


# Requests that match no route continue to your app unchanged
```

```toml filename="pyproject.toml"
[dependency-groups]
"vercel.proxy" = ["vercel-proxy"]
```

The entrypoint can live in a subdirectory, such as `src/proxy.ts` or `app.proxy:proxy`. See the [JS reference](/docs/routing-middleware/js-reference) and the [Python reference](/docs/routing-middleware/python-reference) for each language's API.

In TypeScript and JavaScript, you can also skip `vercel.json` and use the `middleware.ts` file convention. See the [JS reference](/docs/routing-middleware/js-reference#using-the-file-convention).

Your Routing Middleware must use the same runtime as your app. If the runtimes don't match, the build fails with `proxy_runtime_mismatch`.

> **💡 Note:** You can't use `proxy` with frameworks that build their own routing
> middleware, such as Next.js and Astro. In Next.js 16 and later, add a
> `proxy.ts` file at your project root instead, or a `middleware.ts` file in
> earlier versions. See the [Next.js proxy
> documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
> for details.

## Path matching

Without a matcher, your Routing Middleware runs on **every** request, including requests for static files. This adds latency and cost to each request. Set `proxy.matcher` to one path or a list of paths:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy.ts",
    "matcher": ["/about/:path*", "/dashboard/:path*"]
  }
}
```

Each matcher must start with `/`. In TypeScript and JavaScript, you can also export a [`config`](/docs/routing-middleware/js-reference#match-paths-based-on-custom-matcher-config) object with a `matcher` property instead.

The following examples show `matcher` values.

### Match a single path

```json
"/about/:path*"
```

### Match using regex

The matcher has full [regex](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions) support for cases such as negative lookaheads or character matching.

#### Match based on a negative lookahead

To match all request paths except for the ones starting with:

- `api` (API routes)
- `_next/static` (static files)
- `favicon.ico` (favicon file)

```json
["/((?!api|_next/static|favicon.ico).*)"]
```

#### Match based on character matching

To match `/blog/123` but not `/blog/abc`:

```json
["/blog/:slug(\\d{1,})"]
```

For help on writing your own regex path matcher, see [Path to regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp-1).

## Geolocation headers

Vercel adds geolocation headers, such as `x-vercel-ip-country` and `x-vercel-ip-city`, to every request your Routing Middleware receives. See [request headers](/docs/headers/request-headers) for the full list.

The following example redirects visitors from one country away from a page:

#### TypeScript

```ts filename="proxy.ts"
import { geolocation, next } from '@vercel/functions';

export default function proxy(request: Request) {
  const url = new URL(request.url);
  const { country } = geolocation(request);

  if (url.pathname === '/secret-page' && country === 'SE') {
    return Response.redirect(new URL('/login', request.url));
  }

  return next();
}
```

#### Python

```python filename="proxy.py"
from vercel.proxy import ContinueResponse, Proxy, RedirectResponse, Request, Response

proxy = Proxy()


@proxy.route("/secret-page")
def secret_page(request: Request) -> Response:
    if request.headers.get("x-vercel-ip-country") == "SE":
        return RedirectResponse("/login")
    return ContinueResponse()
```

In TypeScript and JavaScript, read them with the [`geolocation()`](/docs/functions/functions-api-reference/vercel-functions-package#geolocation) helper from `@vercel/functions`. In Python, read them from `request.headers`.

## Logging

Routing Middleware has full support for the [`console`](https://developer.mozilla.org/docs/Web/API/Console) API, including `time`, `debug`, `timeEnd`. Logs will appear inside your Vercel project by clicking **View Functions Logs** next to the deployment.

## Using a database with Routing Middleware

If your Routing Middleware depends on a database far away from one of [our supported regions](/docs/regions), the overall latency of API requests could be slower than expected, due to network latency while connecting to the database from a distant region. To avoid this issue, use a global database. Vercel has multiple global storage products, including [Global Config](/docs/global-config) and [Vercel Blob](/docs/vercel-blob). You can also explore the storage category of the [Vercel Marketplace](/marketplace?category=storage) to learn which option is best for you.

## Limits on requests

The following limits apply to requests processed by Routing Middleware:

| Name                              | Limit |
| --------------------------------- | ----- |
| Maximum URL length                | 14 KB |
| Maximum request body length       | 4 MB  |
| Maximum number of request headers | 64    |
| Maximum request headers length    | 16 KB |

## Runtime options

TypeScript and JavaScript Routing Middleware runs on the [Node.js](/docs/functions/runtimes/node-js) runtime by default. To use [Bun](/docs/functions/runtimes/bun), set [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) in your `vercel.json` file. With the `middleware.ts` file convention, also set the [`runtime` config](/docs/routing-middleware/js-reference#specify-runtime) to `nodejs`.

Python Routing Middleware runs on the [Python](/docs/functions/runtimes/python) runtime.

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
- [Routing Middleware JS reference](/docs/routing-middleware/js-reference)
- [Routing Middleware Python reference](/docs/routing-middleware/python-reference)
- [Fluid compute](/docs/fluid-compute)
- [Runtimes](/docs/functions/runtimes)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
