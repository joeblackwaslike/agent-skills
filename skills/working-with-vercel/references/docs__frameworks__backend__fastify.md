---
title: Fastify on Vercel
product: vercel
url: /docs/frameworks/backend/fastify
canonical_url: "https://vercel.com/docs/frameworks/backend/fastify"
last_updated: 2026-08-10
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/functions
  - /docs/fluid-compute
  - /docs/deployments/environments
  - /docs/instant-rollback
  - /docs/vercel-firewall
summary: Deploy Fastify applications to Vercel with zero configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/fastify.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "386d54eec8b0d9c066cc323eef4b1b597f74c9cb5eec0a9324460e0bf2acc4df"
---

# Fastify on Vercel

Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. You can deploy a Fastify app to Vercel with zero configuration using [Vercel Functions](/docs/functions).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Zero-configuration support for Fastify](https://vercel.com/changelog/zero-configuration-support-for-fastify)
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [Deploy a FastAPI app on Vercel](https://vercel.com/docs/frameworks/backend/fastapi) — Deploy a FastAPI app on Vercel. Learn how the Python runtime, ASGI, static assets, and Vercel Functions work together.
- [Express on Vercel](https://vercel.com/docs/frameworks/backend/express) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [NestJS on Vercel](https://vercel.com/docs/frameworks/backend/nestjs) — Deploy NestJS applications to Vercel with zero configuration.

Full cross-link map for this page: [/docs/frameworks/backend/fastify.graph.md](/docs/frameworks/backend/fastify.graph.md)
<!-- /docsgraph:related -->

Fastify applications on Vercel benefit from:

- [Fluid compute](/docs/fluid-compute): Pay for the CPU you use, automatic cold start reduction, optimized concurrency, background processing, and more
- [Preview deployments](/docs/deployments/environments#preview-environment-pre-production): Test your changes in a copy of your production infrastructure
- [Instant Rollback](/docs/instant-rollback): Recover from breaking changes or bugs in milliseconds
- [Vercel Firewall](/docs/vercel-firewall): Protect your applications from a wide range of threats with a robust, multi-layered security system
- [Secure Compute](/docs/networking/secure-compute): Create private links between your Vercel-hosted backend and other clouds

## Get started with Fastify on Vercel

You can quickly deploy a Fastify application to Vercel by creating a Fastify app or using an existing one:

## Fastify entrypoint detection

To allow Vercel to deploy your Fastify application and process web requests, your server entrypoint file should be named one of the following:

- `src/app.{js,mjs,cjs,ts,cts,mts}`
- `src/index.{js,mjs,cjs,ts,cts,mts}`
- `src/server.{js,mjs,cjs,ts,cts,mts}`
- `app.{js,mjs,cjs,ts,cts,mts}`
- `index.{js,mjs,cjs,ts,cts,mts}`
- `server.{js,mjs,cjs,ts,cts,mts}`

For example, use the following code as an entrypoint:

```js filename="src/index.ts"
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.listen({ port: 3000 });
```

### Local development

Use `vercel dev` to run your application locally

```bash filename="terminal"
vercel dev
```

> **💡 Note:** Minimum CLI version required: 48.6.0

### Deploying the application

To deploy, [connect your Git repository](/new) or [use Vercel CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 48.6.0

## Vercel Functions

When you deploy a Fastify app to Vercel, your Fastify application becomes a single [Vercel Function](/docs/functions) and uses [Fluid compute](/docs/fluid-compute) by default. This means your Fastify app will automatically scale up and down based on traffic.

## Stream responses

Return a Node.js readable stream from a Fastify handler to send data as it becomes available. See the [Fastify streaming example](/kb/guide/ship-a-fastify-app-on-vercel#stream-responses) for a route running on Vercel.

## Run scheduled tasks

Use [Cron Jobs](/docs/cron-jobs) to call a Fastify route on a schedule. Configure the route and schedule, then check the request's `Authorization` header against your `CRON_SECRET` environment variable before running the task. See the [Fastify cron job example](/kb/guide/ship-a-fastify-app-on-vercel#run-scheduled-tasks-with-cron-jobs).

## Monitor and debug requests

Use [Runtime Logs](/docs/functions/logs) to inspect application output and errors, and [Observability](/docs/observability) to investigate request duration and failures. See [monitoring Fastify with Observability](/kb/guide/ship-a-fastify-app-on-vercel#monitor-performance-with-observability) for details.

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to the Fastify application, including the standard bundle size limit of 250MB for Node.js applications. [Large Functions](/docs/functions/limitations#large-functions-beta) support Node.js bundles up to 5GB on Fluid compute when enabled (public beta).

## More resources

Learn more about deploying Fastify projects on Vercel with the following resources:

- [Fastify official documentation](https://fastify.dev/docs/latest/)
- [How to ship a Fastify app on Vercel](/kb/guide/ship-a-fastify-app-on-vercel)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
