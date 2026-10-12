---
title: Advanced Configuration
product: vercel
url: /docs/functions/configuring-functions/advanced-configuration
canonical_url: "https://vercel.com/docs/functions/configuring-functions/advanced-configuration"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  - /docs/functions/configuring-functions
  - /docs/functions
related:
  - /docs/functions/runtimes
  - /docs/functions/configuring-functions
  - /docs/project-configuration
  - /docs/functions/streaming-functions
  - /docs/fluid-compute
summary: Learn how to add utility files to the /api directory, and bundle Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/configuring-functions/advanced-configuration.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "9dfff98f90a750ef6e711240b40355952d04017c2f39fc024a95cad236d90069"
---

# Advanced Configuration

For an advanced configuration, you can create a `vercel.json` file to use [Runtimes](/docs/functions/runtimes) and other customizations. To view more about the properties you can customize, see the [Configuring Functions](/docs/functions/configuring-functions) and [Project config with vercel.json](/docs/project-configuration).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn how to import files inside Serverless Functions on Vercel.
- [Troubleshooting Build Error: "Serverless Function has exceeded the unzipped maximum size of 250 MB"](https://vercel.com/kb/guide/troubleshooting-function-250mb-limit?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot builds failing due to exceeding the maximum function size limit on Vercel.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Build your first Vercel Function in a few steps.
- [Advanced Node.js Usage](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn about advanced configurations for Vercel functions on Vercel.
- [Configuring the Runtime for Vercel Functions](https://vercel.com/docs/functions/configuring-functions/runtime?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn how to configure the runtime for Vercel Functions.
- [Features](https://vercel.com/docs/build-output-api/features?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Programmatic Configuration with vercel.ts](https://vercel.com/docs/project-configuration/vercel-ts?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=related) — Define your Vercel configuration in vercel.ts with @vercel/config for type-safe routing and build settings.

Full cross-link map for this page: [/docs/functions/configuring-functions/advanced-configuration.graph.md](/docs/functions/configuring-functions/advanced-configuration.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fadvanced-configuration&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

If your use case requires that you work asynchronously with the results of a function invocation, you may need to consider a queuing, pooling, or [streaming](/docs/functions/streaming-functions) approach because of how functions are created on Vercel.

## Adding utility files to the `/api` directory

> **💡 Note:** Avoid placing shared utilities and route modules in the root `api/` directory.
> Vercel deploys supported source files in this directory as separate functions,
> except for the files described below. Keep shared code outside `api/` and import
> it from your function entry point.

Sometimes, you need to place extra code files, such as `utils.js` or `my-types.d.ts`, inside the `/api` folder. To avoid turning these files into functions, Vercel ignores files with the following characters:

- Files that start with an underscore, `_`
- Files that start with `.`
- Files that end with `.d.ts`

If your file uses any of the above, it will **not** be turned into a function.

## Bundling Vercel Functions

For projects without a framework, Vercel doesn't automatically combine files in the root `api/` directory into one function. Each supported source file becomes a separate function, even when the files have the same configuration.

Avoid creating a separate function for each API endpoint. Keep related routes in a shared function so [Fluid compute](/docs/fluid-compute#optimized-concurrency) can reuse instances across routes and Vercel builds fewer functions. You can use a framework with routing support, such as [Hono](/docs/frameworks/backend/hono), or define a single [`fetch` handler](/docs/functions/functions-api-reference?framework=other\&language=ts#fetch-web-standard) that receives requests for all HTTP methods and routes them by URL pathname.

For Next.js projects, Vercel groups compatible routes into shared Vercel Functions to optimize resources.

To provide more control over the bundling process, you can use the [`functions` property](/docs/project-configuration/vercel-json#functions) in your `vercel.json` file to define the configuration for a route. If a configuration is present, Vercel will bundle functions based on the configuration first. Vercel will then bundle together the remaining routes, optimizing for how many functions are created.

> For \['other']:

In the following example, `api/hello.ts` and `api/another.ts` become separate functions. The `functions` property configures each function but doesn't combine them:

> For \['nextjs']:

In the following example, `pages/api/hello.ts` will be bundled separately from `pages/api/another.ts` since each has a different configuration:

> For \['nextjs-app']:

In the following example, `app/api/hello/route.ts` will be bundled separately from `app/api/another/route.ts` since each has a different configuration:

```js filename="vercel.json" framework=nextjs
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "pages/api/hello.js": {
      "maxDuration": 60
    },
    "pages/api/another.js": {
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
      "maxDuration": 60
    },
    "pages/api/another.ts": {
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
      "maxDuration": 60
    },
    "api/another.js": {
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
      "maxDuration": 60
    },
    "api/another.ts": {
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
      "maxDuration": 60
    },
    "app/api/another/route.js": {
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
      "maxDuration": 60
    },
    "app/api/another/route.ts": {
      "maxDuration": 30
    }
  }
}
```


---

[View full sitemap](/docs/sitemap)
