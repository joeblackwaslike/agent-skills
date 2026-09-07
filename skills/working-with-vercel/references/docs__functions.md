---
title: Vercel Functions
product: vercel
url: /docs/functions
canonical_url: "https://vercel.com/docs/functions"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  []
related:
  - /docs/frameworks
  - /docs/cdn
  - /docs/workflows
  - /docs/eve
  - /docs/functions/functions-api-reference
summary: Build API routes, webhooks, and agent request handlers with Vercel Functions, then test and debug them with Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "c11003f8398187f0fb0686ef767e0c0be853b7f17b33db705167f17ff41ef053"
---

# Vercel Functions

## Run server-side code with Vercel Functions

Build API routes, webhooks, and agent request handlers that scale with traffic. Test locally and trace deployed requests with Vercel CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Understanding Vercel Functions](https://vercel.com/blog/understanding-vercel-functions?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related)
- [30-day runtime log retention, now available in Observability Plus](https://vercel.com/changelog/30-day-runtime-log-retention-now-available-in-observability-plus?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related)
- [Advanced Remix integration with streaming SSR and multi-runtime support](https://vercel.com/changelog/advanced-remix-integration-with-streaming-ssr-and-multi-runtime-support?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related)
- [Agents can now access runtime logs with Vercel's MCP server](https://vercel.com/changelog/agents-can-now-access-runtime-logs-with-vercels-mcp-server?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related)
- [Bring your Dockerfile to Vercel Functions](https://vercel.com/changelog/bring-your-dockerfile-to-vercel-functions?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related)
- [Edge Config is now generally available ](https://vercel.com/changelog/edge-config-is-now-generally-available?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related)
- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Astro on Vercel vs Webflow Cloud](https://vercel.com/kb/guide/astro-on-vercel-vs-webflow-cloud?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related) — Compare running Astro on Vercel Functions with Fluid compute against Webflow Cloud on Cloudflare Workers. Learn how Astr
- [Build with an Express starter template](https://vercel.com/kb/guide/build-with-a-express-starter-template?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related) — Deploy an Express app to Vercel from a template. Browse Express starters from Vercel and the community, then run them lo
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/functions.graph.md](/docs/functions.graph.md?from=related&source_path=%2Fdocs%2Ffunctions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### Handle a request

```typescript filename="api/hello.ts"
export default {
  fetch(request: Request) {
    return new Response('Hello from Vercel!');
  },
};
```

#### Stream a response

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const result = streamText({
    model: 'openai/gpt-5.6-sol',
    prompt,
  });

  return result.toTextStreamResponse();
}
```

#### Run after a response

```typescript filename="api/hello.ts"
import { waitUntil } from '@vercel/functions';

async function getProducts() {
  const response = await fetch('https://api.vercel.app/products');
  return response.json();
}

export default {
  fetch() {
    waitUntil(getProducts().then((json) => console.log({ json })));
    return new Response('Accepted', { status: 202 });
  },
};
```

When you deploy your application, Vercel automatically sets up the tools and optimizations for your chosen [framework](/docs/frameworks). It ensures low latency by routing traffic through Vercel's [CDN](/docs/cdn), and placing your functions in a specific region when you need more control over [data locality](/docs/functions#functions-and-your-data-source).

![Image](https://vercel.com/front/docs/vercel-functions/first_image_light.png)

## Build APIs and agent request handlers

Vercel Functions run request-driven API routes, webhooks, streamed model responses, and agent turns. Use [Vercel Workflows](/docs/workflows) or [eve](/docs/eve) when an agent must preserve progress across pauses or deployments.

- **Zero server management.** Deploy code that scales automatically with traffic
- **Fluid compute.** Reduced cold starts, lower latency, and lower costs via optimized concurrency
- **Multi-runtime support.** Use Node.js, Python, Go, and more
- **Regional control.** Pin functions to a region close to your data source
- **Framework-aware.** Vercel detects and optimizes for your framework automatically
- **Built-in observability.** View invocations, errors, and cost metrics in the dashboard

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

> **💡 Note:** To stream responses you must use Route Handlers in the App Router, even if the
> rest of your app uses the Pages Router.

When using Next.js Pages, we recommend using [Route Handlers in the App Router](https://nextjs.org/docs/app/api-reference/file-conventions/route "Route Handlers"). This enables you to use the [Vercel Functions Web Signature](/docs/functions/functions-api-reference#function-signature), which allows you to use a common signature, a common standard for creating APIs, and stream responses. See the [Functions API Reference](/docs/functions/functions-api-reference?framework=nextjs#config-object) for information on other available options for creating a function with Next.js Pages.

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

You'll see current function usage metrics, including Active CPU, Provisioned Memory, Invocations, and savings from the [optimized concurrency model](/docs/fluid-compute#optimized-concurrency) when fluid compute is enabled.

## How Vercel Functions pricing works

Vercel Functions are priced based on active CPU, provisioned memory, and invocations. See the [fluid compute pricing](/docs/functions/usage-and-pricing) documentation for more information.

If your project is not using fluid compute, see the [legacy pricing documentation](/docs/functions/usage-and-pricing/legacy-pricing) for Vercel Functions.

## Explore Vercel Functions

**What is compute?**: Understand how compute works on Vercel's platform. [Learn more →](/docs/fundamentals/what-is-compute)

**Fluid compute**: Learn how fluid compute reduces cold starts and lowers cost. [Learn more →](/docs/fluid-compute)

**Runtimes**: Choose between Node.js, Python, Go, and other runtimes. [Learn more →](/docs/functions/runtimes)

**Configuring functions**: Set regions, memory, timeouts, and other function options. [Learn more →](/docs/functions/configuring-functions)

**Streaming**: Stream responses to deliver content as it's generated. [Learn more →](/docs/functions/streaming-functions)

**Limits**: Review function limits including duration, payload size, and memory. [Learn more →](/docs/functions/limitations)

**Functions logs**: Inspect runtime logs for a deployment. [Learn more →](/docs/functions/logs)

**Debugging slow functions**: Diagnose and fix functions that take too long to respond. [Learn more →](/docs/functions/debug-slow-functions)


---

[View full sitemap](/docs/sitemap)
