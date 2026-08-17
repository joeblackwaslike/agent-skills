---
title: NestJS on Vercel
product: vercel
url: /docs/frameworks/backend/nestjs
canonical_url: "https://vercel.com/docs/frameworks/backend/nestjs"
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
summary: Deploy NestJS applications to Vercel with zero configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/nestjs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "affab597e0e70fb0efb1fc67a533b3e0222e4a39636e5f0456f0b5495a2bbf5f"
---

# NestJS on Vercel

NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications. You can deploy a NestJS app to Vercel with zero configuration using [Vercel Functions](/docs/functions).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [How to ship a Nitro app on Vercel](https://vercel.com/kb/guide/ship-a-nitro-app-on-vercel?from=related) — Deploy a Nitro app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related) — Learn how to deploy a TanStack Start app to Vercel using the Nitro Vite plugin. Covers framework setup, Git and CLI depl
- [Fastify](https://vercel.com/docs/frameworks/backend/fastify?from=related) — Deploy Fastify applications to Vercel with zero configuration.
- [Express](https://vercel.com/docs/frameworks/backend/express?from=related) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

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
