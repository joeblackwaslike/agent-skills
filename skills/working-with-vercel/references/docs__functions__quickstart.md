---
title: Getting started with Vercel Functions
product: vercel
url: /docs/functions/quickstart
canonical_url: "https://vercel.com/docs/functions/quickstart"
last_updated: 2026-09-11
type: tutorial
prerequisites:
  - /docs/functions
related:
  - /docs/frameworks
  - /docs/frameworks/backend/hono
  - /docs/functions/functions-api-reference
  - /docs/fluid-compute
  - /docs/routing/rewrites
summary: Build your first Vercel Function in a few steps.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/quickstart.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "308873706f5e43e40a2d1b4f63aae688327181f259e2e9a0ce25f8743f046989"
---

# Getting started with Vercel Functions

In this guide, you'll learn how to get started with Vercel Functions using your favorite [frontend framework](/docs/frameworks) (or no framework).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Function invocations now billed per unit](https://vercel.com/changelog/function-invocations-now-billed-per-unit)
- [Vercel Functions now have faster and fewer cold starts](https://vercel.com/changelog/vercel-functions-now-have-faster-and-fewer-cold-starts)
- [How to Use ML Models from Hugging Face in Vercel Functions](https://vercel.com/kb/guide/ml-models-hugging-face) — This guide provides step-by-step instructions on how to integrate ML models from Hugging Face into Vercel Functions
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions) — Learn how to import files inside Serverless Functions on Vercel.
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify) — Deploy Fastify applications to Vercel with zero configuration.
- [Connect to Amazon Web Services \\(AWS\\)](https://vercel.com/docs/oidc/aws) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).

Full cross-link map for this page: [/docs/functions/quickstart.graph.md](/docs/functions/quickstart.graph.md)
<!-- /docsgraph:related -->

For example, you can use [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers), a framework with routing support such as [Hono](/docs/frameworks/backend/hono), or define a single [`fetch` handler](/docs/functions/functions-api-reference?framework=other\&language=ts#fetch-web-standard) that receives requests for all HTTP methods and routes them by URL pathname.

For projects without a framework, Vercel creates a separate function for each supported source file in the root `api/` directory and doesn't automatically combine these files into one function. Avoid creating a separate function for each API endpoint. Keep related routes in a shared function so [Fluid compute](/docs/fluid-compute#optimized-concurrency) can reuse instances across routes and Vercel builds fewer functions.

With a standalone `fetch` handler, you can keep routing logic in one handler without separate `GET`, `POST`, or other HTTP method exports. Configure [rewrites](/docs/routing/rewrites) to send your API paths to the same function.

**Agent prompt**

```text
Help me create a Vercel Function in this project. First, inspect the project to identify its framework and existing routing. For a Next.js App Router project, use Next.js Route Handlers (https://nextjs.org/docs/app/getting-started/route-handlers) in app/api/hello/route.ts (or route.js) with named HTTP method exports such as GET and POST. For other frameworks, use their existing routing conventions. For a project without a framework, use a framework with routing support such as Hono, or define a single fetch handler in the default export using the standard Request and Response APIs. If using a standalone fetch handler, keep related routes in a shared function so Fluid compute can reuse instances across routes and Vercel builds fewer functions. The fetch handler receives requests for all HTTP methods, so route by URL pathname and check request.method where needed instead of using separate GET or POST exports. Configure rewrites to send the API paths to that function. Keep its route modules and shared utilities outside the root api/ directory because Vercel deploys each supported source file there as a separate function and does not combine them automatically. Add a GET /api/hello route that fetches data from https://api.vercel.app/products and returns it as JSON. Make sure the Vercel CLI is installed (`npm i -g vercel`), run `vercel link` to connect the project, test locally with `vercel dev`, then deploy with `vercel --prod`.
```

> Install the [Vercel plugin](/docs/agent-resources/vercel-plugin?from=docs-callout\&source_path=%2Fdocs%2Ffunctions%2Fquickstart) to create and deploy a Vercel Function with your coding agent.
>
> ```bash
> npx plugins add vercel/vercel-plugin
> ```

## Prerequisites

- You can use an existing project or create a new one. If you don't have one, you can run the following terminal command to create a Next.js project:

**pnpm**

```bash
pnpm create next-app@latest
```

**yarn**

```bash
yarn create next-app@latest
```

**npm**

```bash
npx create-next-app@latest
```

**bun**

```bash
bunx create-next-app@latest
```

## Create a Vercel Function

Open the code block in v0 for a walk through on creating a Vercel Function with the below code, or copy the code into your project. The function fetches data from the [Vercel API](https://api.vercel.app/products) and returns it as a JSON response.

**app/api/hello/route.ts**

```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs-app
export async function GET(request: Request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

**app/api/hello/route.js**

```js v0="build" filename="app/api/hello/route.js" framework=nextjs-app
export async function GET(request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

**pages/api/hello.ts**

```ts v0="build" filename="pages/api/hello.ts" framework=nextjs
export async function GET(request: Request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

**pages/api/hello.js**

```js v0="build" filename="pages/api/hello.js" framework=nextjs
export async function GET(request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

**api/hello.ts**

```ts filename="api/hello.ts" framework=other
export default {
  async fetch(request: Request) {
    const response = await fetch('https://api.vercel.app/products');
    const products = await response.json();
    return Response.json(products);
  },
};
```

**api/hello.js**

```js filename="api/hello.js" framework=other
export default {
  async fetch(request) {
    const response = await fetch('https://api.vercel.app/products');
    const products = await response.json();
    return Response.json(products);
  },
};
```

While using `fetch` is the recommended way to create a Vercel Function, you can still use HTTP methods like `GET` and `POST`.

## Next steps

Now that you have set up a Vercel Function, you can explore the following topics to learn more:

- [Explore the functions API reference](/docs/functions/functions-api-reference): Learn more about creating a Vercel Function.
- [Learn about streaming functions](/docs/functions/streaming-functions): Learn how to fetch streamable data with Vercel Functions.
- [Choosing a Runtime](/docs/functions/runtimes): Learn more about the differences between the Node.js and Edge runtimes.
- [Configuring Functions](/docs/functions/configuring-functions): Learn about the different options for configuring a Vercel Function.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
