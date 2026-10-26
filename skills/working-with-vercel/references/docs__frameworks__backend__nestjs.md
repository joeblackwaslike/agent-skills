---
title: NestJS on Vercel
product: vercel
url: /docs/frameworks/backend/nestjs
canonical_url: "https://vercel.com/docs/frameworks/backend/nestjs"
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
summary: Deploy NestJS applications to Vercel with zero configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/nestjs.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "fbe6fcb459f9b0576eda6810d90e8e4352fda6ff14fc23f2705f9226ba2d2fca"
---

# NestJS on Vercel

NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications. You can deploy a NestJS app to Vercel with zero configuration using [Vercel Functions](/docs/functions).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Zero-configuration support for NestJS](https://vercel.com/changelog/zero-configuration-support-for-nestjs)
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel) — Deploy a TanStack Start app to Vercel with the Nitro Vite plugin. Covers Git and CLI deployment, Fluid compute defaults,
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [Nitro on Vercel](https://vercel.com/docs/frameworks/backend/nitro) — Deploy Nitro applications to Vercel with zero configuration. Learn about observability, ISR, and custom build configurat
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify) — Deploy Fastify applications to Vercel with zero configuration.

Full cross-link map for this page: [/docs/frameworks/backend/nestjs.graph.md](/docs/frameworks/backend/nestjs.graph.md)
<!-- /docsgraph:related -->

NestJS applications on Vercel benefit from:

- [Fluid compute](/docs/fluid-compute): Pay for the CPU you use, automatic cold start reduction, optimized concurrency, background processing, and more
- [Preview deployments](/docs/deployments/environments#preview-environment-pre-production): Test your changes in a copy of your production infrastructure
- [Instant Rollback](/docs/instant-rollback): Recover from breaking changes or bugs in milliseconds
- [Vercel Firewall](/docs/vercel-firewall): Protect your applications from a wide range of threats with a robust, multi-layered security system
- [Secure Compute](/docs/networking/secure-compute): Create private links between your Vercel-hosted backend and other clouds

## Get started with NestJS on Vercel

You can quickly deploy a NestJS application to Vercel by creating a NestJS app or using an existing one:

## NestJS entrypoint detection

To allow Vercel to deploy your NestJS application and process web requests, your server entrypoint file should be named one of the following:

- `src/main.{js,mjs,cjs,ts,cts,mts}`
- `src/app.{js,mjs,cjs,ts,cts,mts}`
- `src/index.{js,mjs,cjs,ts,cts,mts}`
- `src/server.{js,mjs,cjs,ts,cts,mts}`
- `app.{js,mjs,cjs,ts,cts,mts}`
- `index.{js,mjs,cjs,ts,cts,mts}`
- `server.{js,mjs,cjs,ts,cts,mts}`

For example, use the following code as an entrypoint:

```js filename="src/app.ts"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

### Local development

Use `vercel dev` to run your application locally

```bash filename="terminal"
vercel dev
```

> **💡 Note:** Minimum CLI version required: 48.4.0

### Deploying the application

To deploy, [connect your Git repository](/new) or [use Vercel CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 48.4.0

## Vercel Functions

When you deploy a NestJS app to Vercel, your NestJS application becomes a single [Vercel Function](/docs/functions) and uses [Fluid compute](/docs/fluid-compute) by default. This means your NestJS app will automatically scale up and down based on traffic.

## Stream responses

Use NestJS's `@Sse()` decorator with an Observable to send server-sent events from a controller. See the [NestJS streaming example](/kb/guide/ship-a-nestjs-app-on-vercel#stream-responses) for a route running on Vercel.

## Run scheduled tasks

Use [Cron Jobs](/docs/cron-jobs) to call a NestJS route on a schedule. Configure the route and schedule, then check the request's `Authorization` header against your `CRON_SECRET` environment variable before running the task. See the [NestJS cron job example](/kb/guide/ship-a-nestjs-app-on-vercel#run-scheduled-tasks-with-cron-jobs).

## Monitor and debug requests

Use [Runtime Logs](/docs/functions/logs) to inspect application output and errors, and [Observability](/docs/observability) to investigate request duration and failures. See [monitoring NestJS with Observability](/kb/guide/ship-a-nestjs-app-on-vercel#monitor-performance-with-observability) for details.

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to the NestJS application, including the standard bundle size limit of 250MB for Node.js applications. [Large Functions](/docs/functions/limitations#large-functions-beta) support Node.js bundles up to 5GB on Fluid compute when enabled (public beta).

## More resources

Learn more about deploying NestJS projects on Vercel with the following resources:

- [NestJS official documentation](https://docs.nestjs.com/)
- [How to ship a NestJS app on Vercel](/kb/guide/ship-a-nestjs-app-on-vercel)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
