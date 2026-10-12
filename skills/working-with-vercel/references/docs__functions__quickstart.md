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
  - /docs/fluid-compute
  - /docs/frameworks/backend/hono
  - /docs/functions/functions-api-reference
  - /docs/routing/rewrites
summary: Build your first Vercel Function in a few steps.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/quickstart.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "3cb70b1a923b60b833f5bce268c073da02c6db6ec34f63671a9cc0c81eaa5f0b"
---

# Getting started with Vercel Functions

In this guide, you'll learn how to get started with Vercel Functions using your favorite [frontend framework](/docs/frameworks) (or no framework).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Function invocations now billed per unit](https://vercel.com/changelog/function-invocations-now-billed-per-unit?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Vercel Functions now have faster and fewer cold starts](https://vercel.com/changelog/vercel-functions-now-have-faster-and-fewer-cold-starts?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related)
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship an H3 app on Vercel](https://vercel.com/kb/guide/ship-a-h3-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy an H3 app to Vercel with zero configuration. Learn to configure streaming, middleware, cron jobs, the Bun runtime
- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to import files inside Serverless Functions on Vercel.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy Fastify applications to Vercel with zero configuration.
- [Connect to Amazon Web Services \\(AWS\\)](https://vercel.com/docs/oidc/aws?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).

Full cross-link map for this page: [/docs/functions/quickstart.graph.md](/docs/functions/quickstart.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For projects without a framework, Vercel creates a separate function for each supported source file in the root `api/` directory and doesn't automatically combine these files into one function.

Avoid creating a separate function for each API endpoint. Keep related routes in a shared function so [Fluid compute](/docs/fluid-compute#optimized-concurrency) can reuse instances across routes and Vercel builds fewer functions. You can use a framework with routing support, such as [Hono](/docs/frameworks/backend/hono), or define a single [`fetch` handler](/docs/functions/functions-api-reference?framework=other\&language=ts#fetch-web-standard) that receives requests for all HTTP methods and routes them by URL pathname.

With a `fetch` handler, you can keep routing logic in one handler without separate `GET`, `POST`, or other HTTP method exports. Configure [rewrites](/docs/routing/rewrites) to send your API paths to the same function.

**Agent prompt**

```text
Help me create a Vercel Function in this project. First, inspect the project to identify its framework and existing routing. Use the framework's routing conventions if one is present. For a project without a framework, avoid creating a separate function for each API endpoint. Keep related routes in a shared function so Fluid compute can reuse instances across routes and Vercel builds fewer functions. You can use a framework with routing support (Hono is one example), or define a single fetch handler in the default export using the standard Request and Response APIs. The fetch handler receives requests for all HTTP methods, so keep routing logic in that handler without separate GET or POST exports. Route by URL pathname and check request.method where needed. Configure rewrites to send the API paths to that function. Keep route handlers and shared utilities outside the root api/ directory. Vercel deploys each supported source file in that directory as a separate function and does not combine them automatically. Add a GET /api/hello route that fetches data from https://api.vercel.app/products and returns it as JSON. Make sure the Vercel CLI is installed (`npm i -g vercel`), run `vercel link` to connect the project, test locally with `vercel dev`, then deploy with `vercel --prod`.
```

> Install the [Vercel plugin](/docs/agent-resources/vercel-plugin?from=docs-callout\&source_path=%2Fdocs%2Ffunctions%2Fquickstart) to create and deploy a Vercel Function with your coding agent.
>
> ```bash
> npx plugins add vercel/vercel-plugin
> ```

## Prerequisites

- You can use an existing project or create a new one. If you don't have one, you can run the following terminal command to create a Next.js project:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm create next-app@latest
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn create next-app@latest
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npx create-next-app@latest
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bunx create-next-app@latest
    ```
  </Code>
</CodeBlock>

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
