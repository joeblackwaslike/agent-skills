---
title: Express on Vercel
product: vercel
url: /docs/frameworks/backend/express
canonical_url: "https://vercel.com/docs/frameworks/backend/express"
last_updated: 2026-08-10
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "58c61c6f24f918c15acace6cc8b2e651cd17e0960e20f2a13fd04c60b356c43a"
---

# Express on Vercel

Express is a fast, unopinionated, minimalist web framework for Node.js. You can deploy an Express app to Vercel with zero configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Experimental build mode for Hono and Express projects](https://vercel.com/changelog/experimental-build-mode-hono-express)
- [Zero-configuration Express backends](https://vercel.com/changelog/zero-configuration-express-backends)
- [Migrate from Railway to Vercel](https://vercel.com/kb/guide/migrate-railway-to-vercel) — Migrate an app from Railway to Vercel. Choose a deployment path, configure services, plan for stored data, and test befo
- [Build a Weather API on Vercel: Express, FastAPI, and Nitro](https://vercel.com/kb/guide/weather-api-with-fastapi) — Build a weather API on Vercel with FastAPI, Express, or Nitro. Compare the three runtimes, add caching and Observability
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel) — This is my wonderful
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify) — Deploy Fastify applications to Vercel with zero configuration.
- [NestJS on Vercel](https://vercel.com/docs/frameworks/backend/nestjs) — Deploy NestJS applications to Vercel with zero configuration.

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

## Stream responses

Use `res.write()` to send response chunks and `res.end()` to finish the response. See the [Express streaming example](/kb/guide/ship-a-express-app-on-vercel#stream-responses) for a route running on Vercel.

## Run scheduled tasks

Use [Cron Jobs](/docs/cron-jobs) to call an Express route on a schedule. Configure the route and schedule, then check the request's `Authorization` header against your `CRON_SECRET` environment variable before running the task. See the [Express cron job example](/kb/guide/ship-a-express-app-on-vercel#run-scheduled-tasks-with-cron-jobs).

## Protect an internal API

Use Vercel Passport to require sign-in through your company's identity provider before requests reach your Express app. Passport requires an Enterprise plan. Follow the [Express Passport guide](/kb/guide/vercel-passport-backend-frameworks#express) to verify visitor identity and authorize access within your app.

## Monitor and debug requests

Use [Runtime Logs](/docs/functions/logs) to inspect application output and errors, and [Observability](/docs/observability) to investigate request duration and failures. See [monitoring Express with Observability](/kb/guide/ship-a-express-app-on-vercel#monitor-performance-with-observability) for details.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
