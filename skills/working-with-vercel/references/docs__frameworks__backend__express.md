---
title: Express on Vercel
product: vercel
url: /docs/frameworks/backend/express
canonical_url: "https://vercel.com/docs/frameworks/backend/express"
last_updated: 2026-07-06
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
summary: Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/express.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3b22175ff40983d074b6de54513d13f5bf55018406b24c400c2642030bd5fc37"
---

# Express on Vercel

Express is a fast, unopinionated, minimalist web framework for Node.js. You can deploy an Express app to Vercel with zero configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Express.js with Vercel](https://vercel.com/kb/guide/using-express-with-vercel?from=related) — Learn how to use Express.js in a Serverless environment.
- [How to Build a Weather API with Express and Vercel](https://vercel.com/kb/guide/weather-api-with-express?from=related) — Provide real-time weather data to apps and websites with a single Express route.
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel?from=related) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [Fastify](https://vercel.com/docs/frameworks/backend/fastify?from=related) — Deploy Fastify applications to Vercel with zero configuration.
- [FastAPI](https://vercel.com/docs/frameworks/backend/fastapi?from=related) — Deploy a FastAPI app on Vercel. Learn how the Python runtime, ASGI, static assets, and Vercel Functions work together.
- [NestJS](https://vercel.com/docs/frameworks/backend/nestjs?from=related) — Deploy NestJS applications to Vercel with zero configuration.
- [Elysia](https://vercel.com/docs/frameworks/backend/elysia?from=related) — Build fast TypeScript backends with Elysia and deploy to Vercel. Learn the project structure, plugins, middleware, and h

Full cross-link map for this page: [/docs/frameworks/backend/express.graph.md](/docs/frameworks/backend/express.graph.md)
<!-- /docsgraph:related -->

Express applications on Vercel benefit from:

- [Fluid compute](/docs/fluid-compute): Active CPU billing, automatic cold start prevention, optimized concurrency, background processing, and more
- [Preview deployments](/docs/deployments/environments#preview-environment-pre-production): Test your changes on a copy of your production infrastructure
- [Instant Rollback](/docs/instant-rollback): Recover from unintended changes or bugs in milliseconds
- [Vercel Firewall](/docs/vercel-firewall): Protect your applications from a wide range of threats with a multi-layered security system
- [Secure Compute](/docs/networking/secure-compute): Create private links between your Vercel-hosted backend and other clouds

## Get started with Express on Vercel

You can quickly deploy an Express application to Vercel by creating an Express app or using an existing one:

### Get started with Vercel CLI

Get started by initializing a new Express project using [Vercel CLI init command](/docs/cli/init):

```bash filename="terminal"
vc init express
```

This will clone the [Express example repository](https://github.com/vercel/vercel/tree/main/examples/express) in a directory called `express`.

## Exporting the Express application

To run an Express application on Vercel, create a file that imports the `express` package at any one of the following locations:

- `app.{js,cjs,mjs,ts,cts,mts}`
- `index.{js,cjs,mjs,ts,cts,mts}`
- `server.{js,cjs,mjs,ts,cts,mts}`
- `src/app.{js,cjs,mjs,ts,cts,mts}`
- `src/index.{js,cjs,mjs,ts,cts,mts}`
- `src/server.{js,mjs,cjs,ts,cts,mts}`

The file must also export the application as a default export of the module or use a port listener.

### Using a default export

For example, use the following code that exports your Express app:

```js filename="src/index.js" framework=express
// Use "type: commonjs" in package.json to use CommonJS modules
const express = require('express');
const app = express();

// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

// Export the Express app
module.exports = app;
```

```ts filename="src/index.ts" framework=express
// Use "type: module" in package.json to use ES modules
import express from 'express';
const app = express();

// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

// Export the Express app
export default app;
```

### Using a port listener

You may also run your application using the `app.listen` pattern that exposes the server on a port.

```js filename="src/index.js" framework=express
// Use "type: commonjs" in package.json to use CommonJS modules
const express = require('express');
const app = express();
const port = 3000;

// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

```ts filename="src/index.ts" framework=express
// Use "type: module" in package.json to use ES modules
import express from 'express';
const app = express();
const port = 3000;

// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### Local development

Use `vercel dev` to run your application locally

```bash filename="terminal"
vercel dev
```

> **💡 Note:** Minimum CLI version required: 47.0.5

### Deploying the application

To deploy, [connect your Git repository](/new) or [use Vercel CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 47.0.5

## Serving static assets

To serve static assets, place them in the `public/**` directory. They will be served as a part of our [CDN](/docs/cdn) using default [headers](/docs/headers) unless otherwise specified in `vercel.json`.

`express.static()` will be ignored and will not serve static assets.

## Vercel Functions

When you deploy an Express app to Vercel, your Express application becomes a single [Vercel Function](/docs/functions) and uses [Fluid compute](/docs/fluid-compute) by default. This means your Express app will automatically scale up and down based on traffic.

## Limitations

- `express.static()` will not serve static assets. You must use [the `public/**` directory](#serving-static-assets).

Additionally, all [Vercel Functions limitations](/docs/functions/limitations) apply to the Express application, including:

- **Application size**: The Express application becomes a single bundle, which has a standard bundle size limit of 250MB. [Large Functions](/docs/functions/limitations#large-functions-beta) support Node.js bundles up to 5GB on Fluid compute when enabled (public beta). Our bundling process removes all unneeded files from the deployment's bundle to reduce size, but does not perform application bundling (e.g., Webpack or Rollup).
- **Error handling**: Express.js will swallow errors that can put the main function into an undefined state unless properly handled. Express.js will render its own error pages (500), which prevents Vercel from discarding the function and resetting its state. Implement robust error handling to ensure errors are properly managed and do not interfere with the serverless function's lifecycle.

## More resources

Learn more about deploying Express projects on Vercel with the following resources:

- [Express official documentation](https://expressjs.com/)
- [Build with an Express starter template](/kb/guide/build-with-a-express-starter-template)
- [How to ship an Express app on Vercel](/kb/guide/ship-a-express-app-on-vercel)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)
- [Express middleware guide](https://expressjs.com/en/guide/using-middleware.html)


---

[View full sitemap](/docs/sitemap)
