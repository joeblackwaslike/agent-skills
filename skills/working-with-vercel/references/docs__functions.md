---
title: Vercel Functions
product: vercel
url: /docs/functions
canonical_url: "https://vercel.com/docs/functions"
last_updated: 2026-03-19
type: conceptual
prerequisites:
  []
related:
  - /docs/fluid-compute
  - /docs/frameworks
  - /docs/cdn
  - /docs/functions/functions-api-reference
  - /docs/functions/functions-api-reference?framework=nextjs
summary: Run server-side code on Vercel without managing a server.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "236f66c56d3f81959fdc6ef56aa0f981d784ecb335cb4ad7c5c9cfd5b6531f10"
---

# Vercel Functions

Vercel Functions let you run server-side code without managing servers. They adapt automatically to user demand, handle connections to APIs and databases, and offer enhanced concurrency through [fluid compute](/docs/fluid-compute). This makes them well suited for AI workloads or any [I/O-bound](# "What does I/O bound mean?") tasks that require efficient scaling.

When you deploy your application, Vercel automatically sets up the tools and optimizations for your chosen [framework](/docs/frameworks). It ensures low latency by routing traffic through Vercel's [CDN](/docs/cdn), and placing your functions in a specific region when you need more control over [data locality](/docs/functions#functions-and-your-data-source).

![Image](https://vercel.com/front/docs/vercel-functions/first_image_light.png)

## Create your first Vercel Function

Copy the code below to create your first function:

```ts filename="api/hello.ts" framework=all
export default {
  fetch(request: Request) {
    return new Response('Hello from Vercel!');
  },
};
```

```js filename="api/hello.js" framework=all
export default {
  fetch(request) {
    return new Response('Hello from Vercel!');
  },
};
```

While using `fetch` is the recommended way to create a Vercel Function, you can still use HTTP methods like `GET` and `POST`.

```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs-app
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js v0="build" filename="app/api/hello/route.js" framework=nextjs-app
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

```ts v0="build" filename="pages/api/hello.ts" framework=nextjs
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js v0="build" filename="pages/api/hello.js" framework=nextjs
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

```ts filename="api/hello.ts" framework=other
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js filename="api/hello.js" framework=other
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

> For \['nextjs']:

When using Next.js Pages, we recommend using [Route Handlers in the App Router](https://nextjs.org/docs/app/building-your-application/routing/route-handlers "Route Handlers"). This enables you to use the [Vercel Functions Web Signature](/docs/functions/functions-api-reference#function-signature), which allows you to use a common signature, a common standard for creating APIs, and stream responses. See the [Functions API Reference](/docs/functions/functions-api-reference?framework=nextjs#config-object) for information on other available options for creating a function with Next.js Pages.

To learn more, see the [quickstart](/docs/functions/quickstart) or [deploy a template](/templates).

## How the Vercel Functions lifecycle works

Vercel Functions handle each incoming request as a new invocation, scaling automatically so you don't need to manage servers. They run in a single [region](/docs/functions/configuring-functions/region) by default, although you can configure them to run in multiple regions if you have globally replicated data. These functions let you add extra capabilities to your application, such as handling authentication, streaming data, or querying databases.

When a user sends a request to your site, Vercel can automatically run a function based on your application code. You don't need to manage servers or handle scaling.

Vercel creates a new function invocation for each incoming request. If another request arrives soon after the previous one, Vercel [reuses the same function](/docs/fluid-compute#optimized-concurrency) instance to optimize performance and cost efficiency. Over time, Vercel only keeps as many active functions as needed to handle your traffic. Vercel scales your functions down to zero when there are no incoming requests.

By allowing concurrent execution within the same instance (and so using idle time for compute), fluid compute reduces cold starts, lowers latency, and saves on compute costs. It also prevents the need to spin up multiple isolated instances when tasks spend most of their time waiting for external operations.

### Why functions should run near your data source

Functions should always execute close to where your data source is to reduce latency. By default, functions using the Node.js runtime execute in Washington, D.C., USA (`iad1`), a common location for external data sources. You can set a new region through your [project's settings on Vercel](/docs/functions/configuring-functions/region#setting-your-default-region).

## Viewing Vercel Function metrics

You can view various performance and cost efficiency metrics using Vercel Observability:

1. Choose your project from the [dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D\&title=Go+to+dashboard).
2. Click on the **Observability** tab and select the **Vercel Functions** section.
3. Click on the chevron icon to expand and see all charts.

You'll see total consumed and saved GB-Hours, and the ratio of the saved usage. When you have [fluid](/docs/fluid-compute) enabled, you'll also see the amount of cost savings from the [optimized concurrency model](/docs/fluid-compute#optimized-concurrency).

## How Vercel Functions pricing works

Vercel Functions are priced based on active CPU, provisioned memory, and invocations. See the [fluid compute pricing](/docs/functions/usage-and-pricing) documentation for more information.

If your project is not using fluid compute, see the [legacy pricing documentation](/docs/functions/usage-and-pricing/legacy-pricing) for Vercel Functions.

## Related

- [What is compute?](/docs/fundamentals/what-is-compute)
- [Fluid compute](/docs/fluid-compute)
- [Runtimes](/docs/functions/runtimes)
- [Configuring functions](/docs/functions/configuring-functions)
- [Streaming](/docs/functions/streaming-functions)
- [Limits](/docs/functions/limitations)
- [Functions logs](/docs/functions/logs)
- [Debugging slow Vercel Functions](/docs/functions/debug-slow-functions)


---

[View full sitemap](/docs/sitemap)
