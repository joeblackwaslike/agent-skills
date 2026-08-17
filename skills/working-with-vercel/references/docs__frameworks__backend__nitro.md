---
title: Nitro on Vercel
product: vercel
url: /docs/frameworks/backend/nitro
canonical_url: "https://vercel.com/docs/frameworks/backend/nitro"
last_updated: 2026-03-09
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/git
  - /docs/deployments/environments
  - /docs/cli/init
  - /docs/fluid-compute
  - /docs/vercel-firewall
summary: Deploy Nitro applications to Vercel with zero configuration. Learn about observability, ISR, and custom build configurations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/nitro.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "48cb23707f5780e9d7ad549c91703a628bd4f8367fb64695c49d1e1c2afeff4f"
---

# Nitro on Vercel

Nitro is a full-stack framework with TypeScript-first support. It includes filesystem routing, code-splitting for fast startup, built-in caching, and multi-driver storage. It enables deployments from the same codebase to any platform with output sizes under 1MB.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [What is the Nitro Vite plugin?](https://vercel.com/kb/guide/nitro-vite-plugin?from=related) — The Nitro Vite plugin \(nitro/vite\) adds SSR, API routes, and deploy-anywhere server builds to any Vite app. Learn what
- [Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related) — Learn how to deploy a TanStack Start app to Vercel using the Nitro Vite plugin. Covers framework setup, Git and CLI depl
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel?from=related) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [Vite](https://vercel.com/docs/frameworks/frontend/vite?from=related) — Learn how to use Vercel's features with Vite.
- [NestJS](https://vercel.com/docs/frameworks/backend/nestjs?from=related) — Deploy NestJS applications to Vercel with zero configuration.
- [TanStack Start](https://vercel.com/docs/frameworks/full-stack/tanstack-start?from=related) — Learn how to use Vercel's features with TanStack Start.
- [Vite + Nitro](https://vercel.com/docs/frameworks/full-stack/vite-with-nitro?from=related) — Add a backend to any Vite app with Nitro and deploy to Vercel with zero configuration.
- [Create React App](https://vercel.com/docs/frameworks/frontend/create-react-app?from=related) — Learn how to use Vercel's features with Create React App

Full cross-link map for this page: [/docs/frameworks/backend/nitro.graph.md](/docs/frameworks/backend/nitro.graph.md)
<!-- /docsgraph:related -->

You can deploy a Nitro app to Vercel with zero configuration.

## Get started with Nitro on Vercel

To get started with Nitro on Vercel, use the following Nitro template to deploy to Vercel with zero configuration:

Vercel deployments can [integrate with your git provider](/docs/git) to [generate preview URLs](/docs/deployments/environments#preview-environment-pre-production) for each pull request you make to your Nitro project.

### Get started with Vercel CLI

Get started by initializing a new Nitro project using [Vercel CLI init command](/docs/cli/init):

```bash filename="terminal"
vc init nitro
```

This will clone the [Nitro example repository](https://github.com/vercel/vercel/tree/main/examples/nitro) in a directory called `nitro`.

## Using Vercel's features with Nitro

When you deploy a Nitro app to Vercel, you can use Vercel specific features such as [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr), [preview deployments](/docs/deployments/environments#preview-environment-pre-production), [Fluid compute](/docs/fluid-compute), [Observability](#observability), and [Vercel firewall](/docs/vercel-firewall) with zero or minimum configuration.

## Incremental Static Regeneration (ISR)

[ISR](/docs/incremental-static-regeneration) allows you to create or update content without redeploying your site. ISR has three main benefits for developers: better performance, improved security, and faster build times.

### On-demand revalidation

With [on-demand revalidation](/docs/incremental-static-regeneration/quickstart#on-demand-revalidation), you can purge the cache for an ISR route whenever you want, foregoing the time interval required with background revalidation.

To revalidate a path to a prerendered function:

- ### Create an Environment Variable
  Create an [Environment Variable](/docs/environment-variables) to store a revalidation secret by:
  - Using the command:
  ```bash filename="terminal"
  openssl rand -base64 32
  ```
  - Or [generating a secret](https://generate-secret.vercel.app/32) to create a random value.

- ### Update your configuration
  Update your configuration to use the revalidation secret as follows:
  ```ts filename="nitro.config.ts" framework=nitro
  export default defineNitroConfig({
    vercel: {
      config: {
        bypassToken: process.env.VERCEL_BYPASS_TOKEN,
      },
    },
  });
  ```
  ```js filename="nitro.config.js" framework=nitro
  export default defineNitroConfig({
    vercel: {
      config: {
        bypassToken: process.env.VERCEL_BYPASS_TOKEN,
      },
    },
  });
  ```
  ```ts filename="nuxt.config.ts" framework=nuxt
  export default defineNuxtConfig({
    nitro: {
      vercel: {
        config: {
          bypassToken: process.env.VERCEL_BYPASS_TOKEN,
        },
      },
    },
  });
  ```
  ```js filename="nuxt.config.js" framework=nuxt
  export default defineNuxtConfig({
    nitro: {
      vercel: {
        config: {
          bypassToken: process.env.VERCEL_BYPASS_TOKEN,
        },
      },
    },
  });
  ```

- ### Trigger revalidation
  You can revalidate a path to a prerendered function by making a `GET` or `HEAD` request to that path with a header of `x-prerender-revalidate: bypassToken`

  When the prerendered function endpoint is accessed with this header set, the cache will be revalidated. The next request to that function will return a fresh response.

### Fine-grained ISR configuration

To have more control over ISR caching, you can pass an options object to the `isr` route rule as shown below:

```ts filename="nitro.config.ts" framework=all
export default defineNitroConfig({
  routeRules: {
    '/products/**': {
      isr: {
        allowQuery: ['q'],
        passQuery: true,
      },
    },
  },
});
```

```js filename="nitro.config.js" framework=all
export default defineNitroConfig({
  routeRules: {
    '/products/**': {
      isr: {
        allowQuery: ['q'],
        passQuery: true,
      },
    },
  },
});
```

> **💡 Note:** By default, query parameters are ignored by cache unless you specify them in
> the `allowQuery` array.

The following options are available:

| Option       | Type                    | Description                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expiration` | `number \| false`       | The expiration time, in seconds, before the cached asset is re-generated by invoking the serverless function. Setting the value to `false` (or `isr: true` in the route rule) will cause it to never expire.                                                                |
| `group`      | `number`                | Group number of the asset. Use this to revalidate multiple assets at the same time.                                                                                                                                                                                         |
| `allowQuery` | `string[] \| undefined` | List of query string parameter names that will be cached independently. If you specify an empty array, query values are not considered for caching. If `undefined`, each unique query value is cached independently. For wildcard `/**` route rules, `url` is always added. |
| `passQuery`  | `boolean`               | When `true`, the query string will be present on the request argument passed to the invoked function. The `allowQuery` filter still applies.                                                                                                                                |

## Observability

With [Vercel Observability](/docs/observability), you can view detailed performance insights broken down by route and monitor function execution performance. This can help you identify bottlenecks and optimization opportunities.

Nitro (>=2.12) generates routing hints for [functions observability insights](/docs/observability/insights#vercel-functions), providing a detailed view of performance broken down by route.

To enable this feature, ensure you are using a compatibility date of `2025-07-15` or later.

```ts filename="nitro.config.ts" framework=nitro
export default defineNitroConfig({
  compatibilityDate: '2025-07-15', // or "latest"
});
```

```js filename="nitro.config.js" framework=nitro
export default defineNitroConfig({
  compatibilityDate: '2025-07-15', // or "latest"
});
```

```ts filename="nuxt.config.ts" framework=nuxt
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15', // or "latest"
});
```

```js filename="nuxt.config.js" framework=nuxt
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15', // or "latest"
});
```

> **💡 Note:** Framework integrations can use the `ssrRoutes` configuration to declare SSR
> routes. For more information, see
> [#3475](https://github.com/unjs/nitro/pull/3475).

## Vercel Functions

When you deploy a Nitro app to Vercel, your server routes automatically become [Vercel Functions](/docs/functions) and use [Fluid compute](/docs/fluid-compute) by default.

## More resources

Learn more about deploying Nitro projects on Vercel with the following resources:

- [Getting started with Nitro guide](https://nitro.build/guide)
- [Deploy Nitro to Vercel guide](https://nitro.build/deploy/providers/vercel)
- [Build with a Nitro starter template](/kb/guide/build-with-a-nitro-starter-template)
- [How to ship a Nitro app on Vercel](/kb/guide/ship-a-nitro-app-on-vercel)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
