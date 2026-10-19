---
title: Elysia on Vercel
product: vercel
url: /docs/frameworks/backend/elysia
canonical_url: "https://vercel.com/docs/frameworks/backend/elysia"
last_updated: 2026-08-20
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/fluid-compute
  - /docs/deployments/environments
  - /docs/instant-rollback
  - /docs/vercel-firewall
  - /docs/networking/secure-compute
summary: Build fast TypeScript backends with Elysia and deploy to Vercel. Learn the project structure, plugins, middleware, and how to run locally and in...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/elysia.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "fb21869c0e756e9c20ad66ecfe282ab3f3bbd5c23133f59882cc67e729c2066a"
---

# Elysia on Vercel

Elysia is an ergonomic web framework for building backend servers with Bun. Designed with simplicity and type-safety in mind, Elysia offers a familiar API with extensive support for TypeScript and is optimized for Bun.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Elysia can now be automatically deployed on Vercel](https://vercel.com/changelog/support-for-elysia)
- [How to ship an H3 app on Vercel](https://vercel.com/kb/guide/ship-a-h3-app-on-vercel) — Deploy an H3 app to Vercel with zero configuration. Learn to configure streaming, middleware, cron jobs, the Bun runtime
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify) — Deploy Fastify applications to Vercel with zero configuration.
- [NestJS on Vercel](https://vercel.com/docs/frameworks/backend/nestjs) — Deploy NestJS applications to Vercel with zero configuration.

Full cross-link map for this page: [/docs/frameworks/backend/elysia.graph.md](/docs/frameworks/backend/elysia.graph.md)
<!-- /docsgraph:related -->

You can deploy an Elysia app to Vercel with zero configuration.

Elysia applications on Vercel benefit from:

- [Fluid compute](/docs/fluid-compute): Active CPU billing, automatic cold start prevention, optimized concurrency, background processing, and more
- [Preview deployments](/docs/deployments/environments#preview-environment-pre-production): Test your changes on a copy of your production infrastructure
- [Instant Rollback](/docs/instant-rollback): Recover from unintended changes or bugs in milliseconds
- [Vercel Firewall](/docs/vercel-firewall): Protect your applications from a wide range of threats with a multi-layered security system
- [Secure Compute](/docs/networking/secure-compute): Create private links between your Vercel-hosted backend and other clouds

## Get started with Elysia on Vercel

Get started by initializing a new Elysia project using [Vercel CLI init command](/docs/cli/init):

```bash filename="terminal"
vc init elysia
```

> **💡 Note:** Minimum CLI version required: 49.0.0

This will clone the [Elysia example repository](https://github.com/vercel/vercel/tree/main/examples/elysia) in a directory called `elysia`.

To deploy, [connect your Git repository](/new) or [use Vercel CLI](/docs/cli):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 49.0.0

## Entrypoint detection

To run an Elysia application on Vercel, create a file that imports the `elysia` package at any one of the following locations:

- `app.{js,cjs,mjs,ts,cts,mts}`
- `index.{js,cjs,mjs,ts,cts,mts}`
- `server.{js,cjs,mjs,ts,cts,mts}`
- `src/app.{js,cjs,mjs,ts,cts,mts}`
- `src/index.{js,cjs,mjs,ts,cts,mts}`
- `src/server.{js,mjs,cjs,ts,cts,mts}`

The file must also export the application as a default export of the module. Port listeners (`app.listen`) are not currently supported.

### Using a default export

For example, use the following code that exports your Elysia app:

```js filename="src/index.js" framework=all
// For Node.js, ensure "type": "module" in package.json
// (Not required for Bun)
import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => ({
  message: 'Hello from Elysia on Vercel!',
}));

// Export the Elysia app
export default app;
```

```ts filename="src/index.ts" framework=all
// For Node.js, ensure "type": "module" in package.json
// (Not required for Bun)
import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => ({
  message: 'Hello from Elysia on Vercel!',
}));

// Export the Elysia app
export default app;
```

### Using a port listener

Running your application using `app.listen` is currently not supported. For now, prefer `export default app`.

## Local development

To run your Elysia application locally, you can use [Vercel CLI](https://vercel.com/docs/cli/dev):

```bash filename="terminal"
vc dev
```

> **💡 Note:** Minimum CLI version required: 49.0.0

## Using Node.js

Ensure `type` is set to `module` in your `package.json` file:

```json filename="package.json"
{
  "name": "elysia-app",
  "type": "module"
}
```

> **💡 Note:** Minimum CLI version required: 49.0.0

## Using the Bun runtime

To use the Bun runtime on Vercel, configure the runtime in `vercel.json`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.4.x"
}
```

For more information, [visit the Bun runtime on Vercel documentation](/docs/functions/runtimes/bun).

## Middleware

### Elysia Plugins and Lifecycle Hooks

In Elysia, you can use plugins and lifecycle hooks to run code before and after request handling. This is commonly used for logging, auth, or request processing:

```ts filename="src/index.ts" framework="elysia"
import { Elysia } from 'elysia';

const app = new Elysia()
  .onBeforeHandle(({ request }) => {
    // Runs before route handler
    console.log('Request:', request.url);
  })
  .onAfterHandle(({ response }) => {
    // Runs after route handler
    console.log('Response:', response.status);
  })
  .get('/', () => 'Hello Elysia!');

export default app;
```

### Vercel Routing Middleware

In Vercel, [Routing Middleware](/docs/routing-middleware) executes before a request is processed by your application. Use it for rewrites, redirects, headers, or personalization, and combine it with Elysia's own lifecycle hooks as needed.

## Vercel Functions

When you deploy an Elysia app to Vercel, your server endpoints automatically run as [Vercel Functions](/docs/functions) and use [Fluid compute](/docs/fluid-compute) by default.

## More resources

- [Elysia documentation](https://elysiajs.com)
- [How to ship an Elysia app on Vercel](/kb/guide/ship-a-elysia-app-on-vercel)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
