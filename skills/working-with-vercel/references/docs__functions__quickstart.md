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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "7627c9ecb4c131ef46c2bcd3e1c679b2e1351e81dcfcfe365ece14983a7751cb"
---

# Getting started with Vercel Functions

In this guide, you'll learn how to get started with Vercel Functions using your favorite [frontend framework](/docs/frameworks) (or no framework).

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

Open the code block in  for a walk through on creating a Vercel Function with the below code, or copy the code into your project. The function fetches data from the [Vercel API](https://api.vercel.app/products) and returns it as a JSON response.

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
