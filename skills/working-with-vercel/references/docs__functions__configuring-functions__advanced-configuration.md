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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "fa2ede4660e779de418c16d627698132c0b55a655be54f07335288b5d1912d4b"
---

# Advanced Configuration

For an advanced configuration, you can create a `vercel.json` file to use [Runtimes](/docs/functions/runtimes) and other customizations. To view more about the properties you can customize, see the [Configuring Functions](/docs/functions/configuring-functions) and [Project config with vercel.json](/docs/project-configuration).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn how to import files inside Serverless Functions on Vercel.
- [Customizing Serverless Functions](https://vercel.com/blog/customizing-serverless-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related)
- [Advanced Node.js Usage](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn about advanced configurations for Vercel functions on Vercel.
- [Configuring the Runtime for Vercel Functions](https://vercel.com/docs/functions/configuring-functions/runtime?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn how to configure the runtime for Vercel Functions.
- [Features](https://vercel.com/docs/build-output-api/features?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Build your first Vercel Function in a few steps.
- [Vercel Primitives](https://vercel.com/docs/build-output-api/primitives?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn about the Vercel platform primitives and how they work together to create a Vercel Deployment.

Full cross-link map for this page: [/docs/functions/configuring-functions/advanced-configuration.graph.md](/docs/functions/configuring-functions/advanced-configuration.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=graph)
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
