---
title: Using the Bun Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/bun
canonical_url: "https://vercel.com/docs/functions/runtimes/bun"
last_updated: 2026-08-24
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/project-configuration/vercel-json
  - /docs/functions/websockets
  - /docs/incremental-static-regeneration
  - /docs/routing-middleware
  - /docs/functions/limitations
summary: Learn how to use the Bun runtime with Vercel Functions to create fast, efficient functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/bun.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "908c7cbf54ccfd3bd3d414f51942894b75fb8cd92737cb544d4c4a0093739575"
---

# Using the Bun Runtime with Vercel Functions

> **🔒 Permissions Required**: The Bun runtime

Bun is a fast, all-in-one JavaScript runtime that serves as an alternative to Node.js.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bun runtime on Vercel Functions](https://vercel.com/blog/bun-runtime-on-vercel-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related)
- [Bun runtime now in Public Beta for Vercel Functions](https://vercel.com/changelog/bun-runtime-now-in-public-beta-for-vercel-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related)
- [Bun runtime for Vercel Functions now accepts Bun.serve as an entrypoint](https://vercel.com/changelog/bun-serve-entrypoint-for-vercel-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related)
- [Bun 1.4 is now available in Vercel Functions](https://vercel.com/changelog/bun-1-4-is-now-available-in-vercel-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related)
- [Bun runtime now supports large functions and extended max duration](https://vercel.com/changelog/bun-runtime-now-supports-large-functions-and-extended-max-duration?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related)
- [Elysia can now be automatically deployed on Vercel](https://vercel.com/changelog/support-for-elysia?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related)
- [Build with an Express starter template](https://vercel.com/kb/guide/build-with-a-express-starter-template?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related) — Deploy an Express app to Vercel from a template. Browse Express starters from Vercel and the community, then run them lo
- [How to ship an Elysia app on Vercel](https://vercel.com/kb/guide/ship-a-elysia-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related) — Deploy a Elysia app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and co
- [How to ship a Nitro app on Vercel](https://vercel.com/kb/guide/ship-a-nitro-app-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related) — Deploy a Nitro app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [Elysia on Vercel](https://vercel.com/docs/frameworks/backend/elysia?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related) — Build fast TypeScript backends with Elysia and deploy to Vercel. Learn the project structure, plugins, middleware, and h
- [Programmatic Configuration with vercel.ts](https://vercel.com/docs/project-configuration/vercel-ts?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=related) — Define your Vercel configuration in vercel.ts with @vercel/config for type-safe routing and build settings.

Full cross-link map for this page: [/docs/functions/runtimes/bun.graph.md](/docs/functions/runtimes/bun.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fruntimes%2Fbun&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Bun provides Node.js API compatibility and is generally faster than Node.js for CPU-bound tasks. It includes a bundler, test runner, and package manager.

## Configuring the runtime

For all frameworks, including Next.js, you can configure the runtime in your `vercel.json` file using the [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) property.

Once you configure the runtime version, Vercel manages the patch versions automatically. Currently, `"1.4.x"` and `"1.x"` are the only valid versions:

- `"1.4.x"` selects the [complete rewrite of Bun from Zig to Rust](https://bun.com/blog/bun-v1.4), which contains several [breaking changes](https://bun.com/blog/bun-v1.4#upgrading-to-1-4). Set this version explicitly once you have migrated your application.
- `"1.x"` selects the previous latest Bun version (currently `1.3.14`).

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.4.x"
}
```

> **💡 Note:** Vercel manages the Bun minor versions automatically. `1.4.x` and `1.x` are the
> only valid values currently.

## Deploy with the Bun framework preset

Use the Bun framework preset when you want one `Bun.serve()` server to route requests for your application. After you configure `bunVersion` in `vercel.json`, add a `bun.lock` file and a `server` entrypoint in the project root or the `src/` directory:

- `server.{js,cjs,mjs,ts,cts,mts}`
- `src/server.{js,cjs,mjs,ts,cts,mts}`

With Bun 1.2 or later, run `bun install` to create `bun.lock`. For older versions, run `bun install --save-text-lockfile`. The preset doesn't detect the legacy `bun.lockb` format.

A minimal project contains `package.json`, `bun.lock`, `server.ts`, and the `vercel.json` configuration shown above. You don't need an `/api` directory or routing configuration.

Call `Bun.serve()` once during module startup. Vercel uses that call to detect the server, then routes incoming requests through a Vercel Function. You can use the `fetch`, `routes`, `error`, and `websocket` options:

```ts filename="server.ts"
Bun.serve({
  routes: {
    '/health': () => Response.json({ status: 'ok' }),
  },
  fetch() {
    return new Response('Hello from Bun on Vercel');
  },
});
```

The `port` and `hostname` options only apply when you run the server locally. They don't configure the public endpoint on Vercel. Unix sockets and HTML imports in `routes` are not supported.

To serve WebSocket connections with `Bun.serve()`, see the [Bun example in the WebSockets documentation](/docs/functions/websockets#bun).

## Deploy a Bun server from `/api`

Create `api/server.ts` to deploy a native Bun server as one Vercel Function. Vercel serves the function at `/api/server`, so you can add it to a project that also contains a frontend.

> **💡 Note:** To use custom routing with an `/api` server, configure route overrides in
> `vercel.json`. Each override must use the full request path, including the
> `/api/server` prefix.

Call `Bun.serve()` once during module startup:

```ts filename="api/server.ts"
Bun.serve({
  fetch(request) {
    const url = new URL(request.url);

    return Response.json({
      message: 'Hello from Bun on Vercel',
      pathname: url.pathname,
    });
  },
});
```

This deployment model only requires the `bunVersion` configuration shown above. It doesn't use the Bun framework preset or require `bun.lock`. Unlike the preset, it only sends requests for `/api/server` to this server.

## Framework-specific considerations

### Next.js

When using Next.js, and [ISR](/docs/incremental-static-regeneration), you must change your `build` and `dev` commands in your package.json file to use the Bun runtime:

**Before:**

```json filename="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

**After:**

```json filename="package.json"
{
  "scripts": {
    "dev": "bun run --bun next dev",
    "build": "bun run --bun next build"
  }
}
```

### Routing Middleware

The Bun runtime works with [Routing Middleware](/docs/routing-middleware) the same way as the Node.js runtime once you set the `bunVersion` in your `vercel.json` file. Note that you'll also have to set the runtime config to `nodejs` in your `middleware.ts` file.

## Feature support

The Bun runtime on Vercel supports most Node.js features. The main differences relate to automatic source maps, bytecode caching, and request metrics on the `node:http` and `node:https` modules. Request metrics using `fetch` work with both runtimes.

Vercel Functions using the Bun runtime support [large functions](/docs/functions/limitations#large-functions-beta) with uncompressed bundles up to 5 GB and [extended max duration](/docs/functions/configuring-functions/duration#extended-max-duration-beta) up to 30 minutes. Both features are in beta.

See the table below for a detailed comparison:

## Supported APIs

Vercel Functions using the Bun runtime support [most Node.js APIs](https://bun.sh/docs/runtime/nodejs-apis), including standard Web APIs such as the [Request and Response Objects](/docs/functions/runtimes/node-js#node.js-request-and-response-objects).

## Performance considerations

Bun is generally faster than Node.js, especially for CPU-bound tasks. Performance varies by workload, and in some cases Node.js may be faster depending on the specific operations your function performs.

## When to use Bun

Bun is best suited for new workloads where you want a fast, all-in-one toolkit with built-in support for TypeScript, JSX, and modern JavaScript features. Consider using Bun when:

- You want faster execution for CPU-bound tasks
- You prefer zero-config TypeScript and JSX support
- You're starting a new project and want to use modern tooling

Consider using Node.js instead if:

- Node.js is already installed on your project and is working for you
- You need automatic source maps for debugging
- You need request metrics on the `node:http` or `node:https` modules

Both runtimes run on [Fluid compute](/docs/fluid-compute) and support the same core Vercel Functions features.


---

[View full sitemap](/docs/sitemap)
