---
title: Advanced Configuration
product: vercel
url: /docs/functions/configuring-functions/advanced-configuration
canonical_url: "https://vercel.com/docs/functions/configuring-functions/advanced-configuration"
last_updated: 2026-07-01
type: conceptual
prerequisites:
  - /docs/functions/configuring-functions
  - /docs/functions
related:
  - /docs/functions/runtimes
  - /docs/functions/configuring-functions
  - /docs/project-configuration
  - /docs/functions/streaming-functions
  - /docs/project-configuration/vercel-json
summary: Learn how to add utility files to the /api directory, and bundle Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/configuring-functions/advanced-configuration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "278899dca7bddf76d094de361dbaa5b612f92217576f4a775e1eca741be63c19"
---

# Advanced Configuration

For an advanced configuration, you can create a `vercel.json` file to use [Runtimes](/docs/functions/runtimes) and other customizations. To view more about the properties you can customize, see the [Configuring Functions](/docs/functions/configuring-functions) and [Project config with vercel.json](/docs/project-configuration).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions?from=related) — Learn how to import files inside Serverless Functions on Vercel.
- [Advanced Node.js Usage](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration?from=related) — Learn about advanced configurations for Vercel functions on Vercel.
- [Runtime](https://vercel.com/docs/functions/configuring-functions/runtime?from=related) — Learn how to configure the runtime for Vercel Functions.
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Getting Started](https://vercel.com/docs/functions/quickstart?from=related) — Build your first Vercel Function in a few steps.
- [API Reference](https://vercel.com/docs/functions/functions-api-reference?from=related) — Learn about available APIs when working with Vercel Functions.

Full cross-link map for this page: [/docs/functions/configuring-functions/advanced-configuration.graph.md](/docs/functions/configuring-functions/advanced-configuration.graph.md)
<!-- /docsgraph:related -->

If your use case requires that you work asynchronously with the results of a function invocation, you may need to consider a queuing, pooling, or [streaming](/docs/functions/streaming-functions) approach because of how functions are created on Vercel.

## Adding utility files to the `/api` directory

Sometimes, you need to place extra code files, such as `utils.js` or `my-types.d.ts`, inside the `/api` folder. To avoid turning these files into functions, Vercel ignores files with the following characters:

- Files that start with an underscore, `_`
- Files that start with `.`
- Files that end with `.d.ts`

If your file uses any of the above, it will **not** be turned into a function.

## Bundling Vercel Functions

In order to optimize resources, Vercel uses a process to bundle as many routes as possible into a single Vercel Function.

To provide more control over the bundling process, you can use the [`functions` property](/docs/project-configuration/vercel-json#functions) in your `vercel.json` file to define the configuration for a route. If a configuration is present, Vercel will bundle functions based on the configuration first. Vercel will then bundle together the remaining routes, optimizing for how many functions are created.

This bundling process is currently only enabled for Next.js, but it will be enabled in other scenarios in the future.

> For \['other']:

In the following example,  will be bundled separately from  since each has a different configuration:

> For \['nextjs']:

In the following example,  will be bundled separately from  since each has a different configuration:

> For \['nextjs-app']:

In the following example,  will be bundled separately from  since each has a different configuration:

```js filename="vercel.json" framework=nextjs
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "pages/api/hello.js": {
      "memory": 3009,
      "maxDuration": 60
    },
    "pages/api/another.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

```ts filename="vercel.json" framework=nextjs
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "pages/api/hello.ts": {
      "memory": 3009,
      "maxDuration": 60
    },
    "pages/api/another.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

```js filename="vercel.json" framework=other
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/hello.js": {
      "memory": 3009,
      "maxDuration": 60
    },
    "api/another.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

```ts filename="vercel.json" framework=other
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/hello.ts": {
      "memory": 3009,
      "maxDuration": 60
    },
    "api/another.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

```js filename="vercel.json" framework=nextjs-app
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app/api/hello/route.js": {
      "memory": 3009,
      "maxDuration": 60
    },
    "app/api/another/route.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

```ts filename="vercel.json" framework=nextjs-app
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app/api/hello/route.ts": {
      "memory": 3009,
      "maxDuration": 60
    },
    "app/api/another/route.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```


---

[View full sitemap](/docs/sitemap)
