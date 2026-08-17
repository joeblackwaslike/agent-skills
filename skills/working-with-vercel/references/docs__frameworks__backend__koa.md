---
title: Koa on Vercel
product: vercel
url: /docs/frameworks/backend/koa
canonical_url: "https://vercel.com/docs/frameworks/backend/koa"
last_updated: 2026-07-06
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
summary: Deploy Koa applications to Vercel with zero configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/koa.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "2a4d17568bf786130434f1a738fde219b3be0c8bd81216fe13a1c35db90b8b8a"
---

# Koa on Vercel

Koa is an expressive HTTP middleware framework for building web applications and APIs with zero configuration.​​​​ You can deploy a Koa app to Vercel with zero configuration using [Vercel Functions](/docs/functions).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel?from=related) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship a Hono app on Vercel](https://vercel.com/kb/guide/ship-a-hono-app-on-vercel?from=related) — Deploy a Hono app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and conf
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [Express](https://vercel.com/docs/frameworks/backend/express?from=related) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [NestJS](https://vercel.com/docs/frameworks/backend/nestjs?from=related) — Deploy NestJS applications to Vercel with zero configuration.
- [Fastify](https://vercel.com/docs/frameworks/backend/fastify?from=related) — Deploy Fastify applications to Vercel with zero configuration.
- [Hono](https://vercel.com/docs/frameworks/backend/hono?from=related) — Deploy Hono applications to Vercel with zero configuration. Learn about observability, ISR, and custom build configurati

Full cross-link map for this page: [/docs/frameworks/backend/koa.graph.md](/docs/frameworks/backend/koa.graph.md)
<!-- /docsgraph:related -->

Koa applications on Vercel benefit from:

- [Fluid compute](/docs/fluid-compute): Pay for the CPU you use, automatic cold start reduction, optimized concurrency, background processing, and more
- [Preview deployments](/docs/deployments/environments#preview-environment-pre-production): Test your changes in a copy of your production infrastructure
- [Instant Rollback](/docs/instant-rollback): Recover from breaking changes or bugs in milliseconds
- [Vercel Firewall](/docs/vercel-firewall): Protect your applications from a wide range of threats with a robust, multi-layered security system
- [Secure Compute](/docs/networking/secure-compute): Create private links between your Vercel-hosted backend and other clouds

## Koa entrypoint detection

To allow Vercel to deploy your Koa application and process web requests, your server entrypoint file should be named one of the following:

- `src/app.{js,mjs,cjs,ts,cts,mts}`
- `src/index.{js,mjs,cjs,ts,cts,mts}`
- `src/server.{js,mjs,cjs,ts,cts,mts}`
- `app.{js,mjs,cjs,ts,cts,mts}`
- `index.{js,mjs,cjs,ts,cts,mts}`
- `server.{js,mjs,cjs,ts,cts,mts}`

For example, use the following code as an entrypoint:

```ts filename="src/index.ts"
import Koa from 'koa';
import { Router } from '@koa/router';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = { message: 'Hello from Koa!' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
```

### Local development

Use `vercel dev` to run your application locally.

```bash filename="terminal"
vercel dev
```

> **💡 Note:** Minimum CLI version required: 50.4.8

### Deploying the application

To deploy, [connect your Git repository](/new) or [use Vercel CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 50.4.8

## Vercel Functions

When you deploy a Koa app to Vercel, your Koa application becomes a single [Vercel Function](/docs/functions) and uses [Fluid compute](/docs/fluid-compute) by default. Vercel automatically scales your Koa app up and down based on traffic.

## Limitations

All [Vercel Functions limitations](/docs/functions/limitations) apply to the Koa application, including the standard bundle size limit of 250MB for Node.js applications. [Large Functions](/docs/functions/limitations#large-functions-beta) support Node.js bundles up to 5GB on Fluid compute when enabled (public beta).

## More resources

Learn more about deploying Koa projects on Vercel with the following resources:

- [Koa official documentation](https://koajs.com)
- [How to ship a Koa app on Vercel](/kb/guide/ship-a-koa-app-on-vercel)
- [Vercel Functions documentation](/docs/functions)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
