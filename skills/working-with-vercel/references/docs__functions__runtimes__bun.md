---
title: Using the Bun Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/bun
canonical_url: "https://vercel.com/docs/functions/runtimes/bun"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/project-configuration/vercel-json
  - /docs/functions/websockets
  - /docs/incremental-static-regeneration
  - /docs/routing-middleware
  - /docs/functions/runtimes/node-js
summary: Learn how to use the Bun runtime with Vercel Functions to create fast, efficient functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/bun.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "16f7064563dd08922cd20cce4692dba7b6fabc45cc529fc0261ac3de082c8059"
---

# Using the Bun Runtime with Vercel Functions

> **🔒 Permissions Required**: The Bun runtime


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build with an Express starter template](https://vercel.com/kb/guide/build-with-a-express-starter-template?from=related) — Deploy an Express app to Vercel from a template. Browse Express starters from Vercel and the community, then run them lo
- [How to ship an Elysia app on Vercel](https://vercel.com/kb/guide/ship-a-elysia-app-on-vercel?from=related) — Deploy a Elysia app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and co
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship an H3 app on Vercel](https://vercel.com/kb/guide/ship-a-h3-app-on-vercel?from=related) — Deploy an H3 app to Vercel with zero configuration. Learn to configure streaming, middleware, cron jobs, the Bun runtime
- [How to ship a Hono app on Vercel](https://vercel.com/kb/guide/ship-a-hono-app-on-vercel?from=related) — Deploy a Hono app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and conf
- [Runtime](https://vercel.com/docs/functions/configuring-functions/runtime?from=related) — Learn how to configure the runtime for Vercel Functions.
- [Supported Frameworks](https://vercel.com/docs/frameworks?from=related) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w
- [Full-stack](https://vercel.com/docs/frameworks/full-stack?from=related) — Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration?from=related) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [Elysia](https://vercel.com/docs/frameworks/backend/elysia?from=related) — Build fast TypeScript backends with Elysia and deploy to Vercel. Learn the project structure, plugins, middleware, and h

Full cross-link map for this page: [/docs/functions/runtimes/bun.graph.md](/docs/functions/runtimes/bun.graph.md)
<!-- /docsgraph:related -->

Bun is a fast, all-in-one JavaScript runtime that serves as an alternative to Node.js.

Bun provides Node.js API compatibility and is generally faster than Node.js for CPU-bound tasks. It includes a bundler, test runner, and package manager.

## Configuring the runtime

For all frameworks, including Next.js, you can configure the runtime in your `vercel.json` file using the [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) property.

Once you configure the runtime version, Vercel manages the Bun minor and patch versions automatically, meaning you only need to set the major version. Currently, `"1.x"` is the only valid value.

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x"
}
```

> **💡 Note:** Vercel manages the Bun minor and patch versions automatically. `1.x` is the
> only valid value currently.

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

The Bun runtime works with [Routing Middleware](/docs/routing-middleware) the same way as the Node.js runtime once you set the `bunVersion` in your `vercel.json` file. Note that you'll also have to set the runtime config to `nodejs` in your  file.

## Feature support

The Bun runtime on Vercel supports most Node.js features. The main differences relate to automatic source maps, bytecode caching, and request metrics on the `node:http` and `node:https` modules. Request metrics using `fetch` work with both runtimes.

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
