---
title: TanStack Start on Vercel
product: vercel
url: /docs/frameworks/full-stack/tanstack-start
canonical_url: "https://vercel.com/docs/frameworks/full-stack/tanstack-start"
last_updated: 2026-07-10
type: conceptual
prerequisites:
  - /docs/frameworks/full-stack
  - /docs/frameworks
related:
  - /docs/functions
  - /docs/fluid-compute
  - /docs/integrations/lovable
summary: "Learn how to use Vercel's features with TanStack Start."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/full-stack/tanstack-start.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4e7b3506a8af9cbd6bee047711f6fa565ded11ebbede881bb75dfc082e808258"
---

# TanStack Start on Vercel

TanStack Start is a fullstack framework powered by TanStack Router for React and Solid. It has support for full-document SSR, streaming, server functions, bundling and more. TanStack Start works great on Vercel when paired with [Nitro](https://v3.nitro.build/).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related) — Learn how to deploy a TanStack Start app to Vercel using the Nitro Vite plugin. Covers framework setup, Git and CLI depl
- [Adding keyboard shortcuts to React apps with TanStack Hotkeys](https://vercel.com/kb/guide/adding-keyboard-shortcuts-to-react-apps-with-tanstack-hotkeys?from=related) — Add cross-platform keyboard shortcuts to your React app with TanStack Hotkeys. Install, register, scope, and display sho
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [Choosing between TanStack Intent and \`skills\`](https://vercel.com/kb/guide/tanstack-intent-vs-skills?from=related) — TanStack Intent vs skills: compare how each tool sources, versions, and discovers agent skills for AI coding agents, and
- [Nitro](https://vercel.com/docs/frameworks/backend/nitro?from=related) — Deploy Nitro applications to Vercel with zero configuration. Learn about observability, ISR, and custom build configurat
- [NestJS](https://vercel.com/docs/frameworks/backend/nestjs?from=related) — Deploy NestJS applications to Vercel with zero configuration.
- [Vite](https://vercel.com/docs/frameworks/frontend/vite?from=related) — Learn how to use Vercel's features with Vite.
- [All Frameworks](https://vercel.com/docs/frameworks/more-frameworks?from=related) — Learn about the frameworks that can be deployed to Vercel.

Full cross-link map for this page: [/docs/frameworks/full-stack/tanstack-start.graph.md](/docs/frameworks/full-stack/tanstack-start.graph.md)
<!-- /docsgraph:related -->

## Getting started

You can quickly deploy a TanStack Start application to Vercel by creating a new one below or configuring an existing one with Nitro:

## Nitro Configuration

The [Nitro Vite plugin](https://v3.nitro.build/) allows deploying TanStack Start apps on Vercel, and integrates with Vercel's features.

To set up Nitro in your TanStack app, navigate to the root directory of your TanStack Start project with your terminal and install `nitro` with your preferred package manager:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i nitro
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i nitro
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i nitro
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i nitro
    ```
  </Code>
</CodeBlock>

To configure Nitro with TanStack Start, add the following lines to your `vite.config` file:

```ts {4-4,9-9} filename="/vite.config.ts"
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';

export default defineConfig({
  plugins: [tanstackStart(), nitro(), viteReact()],
});
```

### Vercel Functions

TanStack Start apps on Vercel benefit from the advantages of [Vercel Functions](/docs/functions) and use [Fluid Compute](/docs/fluid-compute) by default. This means your TanStack Start app will automatically scale up and down based on traffic.

## Lovable

[Lovable](https://lovable.dev) projects use TanStack Start as their underlying framework, so they deploy to Vercel with zero configuration. Lovable uses [Nitro](https://v3.nitro.build/), the same universal server toolkit that powers TanStack Start on Vercel, so no manual build configuration is required.

To deploy a Lovable project to Vercel:

1. Sync your Lovable project to GitHub. See the [Lovable GitHub integration docs](https://docs.lovable.dev/integrations/github) for setup.
2. Import the repository from [vercel.com/new](https://vercel.com/new). Vercel detects the framework and deploys the project automatically.

Once connected, every change you make in Lovable syncs to GitHub and triggers a new deployment on Vercel. See [Deploy a Lovable app on Vercel](/docs/integrations/lovable) for prerequisites and deployment options.

> **💡 Note:** Zero-configuration detection requires `@lovable.dev/vite-tanstack-config` version `^2.6.2` or higher in your project. If your project uses an older version, update it before deploying.

## More resources

Learn more about deploying TanStack Start projects on Vercel with the following resources:

- [Explore the TanStack docs](https://tanstack.com/start/latest/docs/framework/react/overview)
- [Learn to use Vercel specific features with Nitro](https://v3.nitro.build/deploy/providers/vercel)


---

[View full sitemap](/docs/sitemap)
