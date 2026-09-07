---
title: Getting started with Vercel Functions
product: vercel
url: /docs/functions/quickstart
canonical_url: "https://vercel.com/docs/functions/quickstart"
last_updated: 2026-03-20
type: tutorial
prerequisites:
  - /docs/functions
related:
  - /docs/frameworks
  - /docs/functions/functions-api-reference
  - /docs/functions/streaming-functions
  - /docs/functions/runtimes
  - /docs/functions/configuring-functions
summary: Build your first Vercel Function in a few steps.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/quickstart.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "95d6e37ccdd79c7d75b0892cfa87bd4004e90a8378f9ee27154dab8e48cf2b37"
---

# Getting started with Vercel Functions

In this guide, you'll learn how to get started with Vercel Functions using your favorite [frontend framework](/docs/frameworks) (or no framework).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Function invocations now billed per unit](https://vercel.com/changelog/function-invocations-now-billed-per-unit?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Vercel Functions now have faster and fewer cold starts](https://vercel.com/changelog/vercel-functions-now-have-faster-and-fewer-cold-starts?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related)
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Using the Node.js Runtime with Vercel Functions](https://vercel.com/docs/functions/runtimes/node-js?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to use the Node.js runtime to create functions and deploy Node.js servers on Vercel.
- [Express on Vercel](https://vercel.com/docs/frameworks/backend/express?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy Fastify applications to Vercel with zero configuration.

Full cross-link map for this page: [/docs/functions/quickstart.graph.md](/docs/functions/quickstart.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me create a Vercel Function in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Run `vercel link` to connect the project. 2. Create an API route handler at app/api/hello/route.ts that fetches data from https://api.vercel.app/products and returns it as JSON. Use the standard Web API Request/Response objects. 3. Test locally with `vercel dev`, then deploy with `vercel --prod`.
```

## Prerequisites

- You can use an existing project or create a new one. If you don't have one, you can run the following terminal command to create a Next.js project:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i 
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i 
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i 
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i 
    ```
  </Code>
</CodeBlock>

## Create a Vercel Function

Open the code block in v0 for a walk through on creating a Vercel Function with the below code, or copy the code into your project. The function fetches data from the [Vercel API](https://api.vercel.app/products) and returns it as a JSON response.

```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs-app
export async function GET(request: Request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

```js v0="build" filename="app/api/hello/route.js" framework=nextjs-app
export async function GET(request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

```ts v0="build" filename="pages/api/hello.ts" framework=nextjs
export async function GET(request: Request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

```js v0="build" filename="pages/api/hello.js" framework=nextjs
export async function GET(request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

```ts filename="api/hello.ts" framework=other
export default {
  async fetch(request: Request) {
    const response = await fetch('https://api.vercel.app/products');
    const products = await response.json();
    return Response.json(products);
  },
};
```

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
