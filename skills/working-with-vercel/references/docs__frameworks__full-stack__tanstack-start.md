---
title: TanStack Start on Vercel
product: vercel
url: /docs/frameworks/full-stack/tanstack-start
canonical_url: "https://vercel.com/docs/frameworks/full-stack/tanstack-start"
last_updated: 2026-09-22
type: conceptual
prerequisites:
  - /docs/frameworks/full-stack
  - /docs/frameworks
related:
  - /docs/functions
  - /docs/fluid-compute
  - /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
  - /docs/sandbox/ecosystem/tanstack-ai
  - /docs/eve
summary: Deploy TanStack Start applications to Vercel with Nitro and configure Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/full-stack/tanstack-start.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e029346c756ebfe7af858f285ef5eebe5aa08ca2f47b8ce6977975f57cf11a67"
---

# TanStack Start on Vercel

TanStack Start is a fullstack framework powered by TanStack Router for React and Solid. It has support for full-document SSR, streaming, server functions, bundling and more. TanStack Start works great on Vercel when paired with [Nitro](https://v3.nitro.build/).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel) — Deploy a TanStack Start app to Vercel with the Nitro Vite plugin. Covers Git and CLI deployment, Fluid compute defaults,
- [Support for TanStack Start](https://vercel.com/changelog/support-for-tanstack-start)
- [Workflow SDK now supports TanStack Start](https://vercel.com/changelog/workflow-sdk-now-supports-tanstack-start)
- [You can now deploy Lovable apps to Vercel](https://vercel.com/changelog/you-can-now-deploy-lovable-apps-to-vercel)
- [Adding keyboard shortcuts to React apps with TanStack Hotkeys](https://vercel.com/kb/guide/adding-keyboard-shortcuts-to-react-apps-with-tanstack-hotkeys) — Add cross-platform keyboard shortcuts to your React app with TanStack Hotkeys. Install, register, scope, and display sho
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Using TanStack Intent to ship and consume agent skills](https://vercel.com/kb/guide/tanstack-intent) — TanStack Intent is a CLI for shipping and consuming agent skills, markdown files that teach AI coding agents how to use
- [What is the Nitro Vite plugin?](https://vercel.com/kb/guide/nitro-vite-plugin) — The Nitro Vite plugin \\(nitro/vite\\) adds SSR, API routes, and deploy-anywhere server builds to any Vite app. Learn what
- [Nitro on Vercel](https://vercel.com/docs/frameworks/backend/nitro) — Deploy Nitro applications to Vercel with zero configuration. Learn about observability, ISR, and custom build configurat
- [Chat SDK with TanStack Start](https://vercel.com/docs/chat-sdk/frameworks/tanstack-start) — Add a Chat SDK bot to TanStack Start, receive Slack events through Vercel Connect, and deploy on Vercel.

Full cross-link map for this page: [/docs/frameworks/full-stack/tanstack-start.graph.md](/docs/frameworks/full-stack/tanstack-start.graph.md)
<!-- /docsgraph:related -->

## Getting started

You can quickly deploy a TanStack Start application to Vercel by creating a new one below or configuring an existing one with Nitro:

## Nitro Configuration

The [Nitro Vite plugin](https://v3.nitro.build/) allows deploying TanStack Start apps on Vercel, and integrates with Vercel's features.

To set up Nitro in your TanStack app, navigate to the root directory of your TanStack Start project with your terminal and install `nitro` with your preferred package manager:

**pnpm**

```bash
pnpm i nitro
```

**yarn**

```bash
yarn add nitro
```

**npm**

```bash
npm i nitro
```

**bun**

```bash
bun add nitro
```

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

## Build AI applications

Connect your TanStack Start application to models, tools, and coding agents with these integrations:

- [TanStack AI with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai): Authenticate model requests and stream responses through the dedicated adapter.
- [TanStack AI with Vercel Sandbox](/docs/sandbox/ecosystem/tanstack-ai): Run coding agents in isolated microVMs with a configured workspace.
- [AI SDK with TanStack Start](https://ai-sdk.dev/docs/getting-started/tanstack-start): Build a chat application with the AI SDK.

For a TanStack AI chat interface, follow the [TanStack AI quickstart](https://tanstack.com/ai/latest/docs/getting-started/quick-start) and use the AI Gateway adapter in your server route.

To add content moderation, follow [Moderate product reviews with Jev and TanStack AI](/kb/guide/moderate-product-reviews-jev-tanstack-ai).
The guide uses a TanStack Start server route to evaluate reviews through AI Gateway
and hold flagged or uncertain reviews for a moderator.

### Build an agent chat with eve

Deploy the [eve TanStack Agent template](/templates/eve/eve-tanstack-agent) to connect a TanStack Start React frontend to an [eve agent](/docs/eve). The chat streams responses and displays tool activity, while json-render turns structured agent responses into interactive cards and tables. Each conversation has a URL you can revisit after reloading the page.

The template deploys the frontend and agent together through [Vercel Services](/docs/services). During setup, set `EVE_ACCESS_PASSWORD` to control access to the chat. See the [template repository](https://github.com/vercel-labs/eve-tanstack-start-template) for setup instructions and options for customizing tools, components, and authentication.

To integrate eve into an existing React-based TanStack Start app, follow the [eve TanStack Start guide](https://eve.dev/docs/guides/frontend/tanstack). It covers Web Chat setup, the `useEveAgent` React hook, and browser authentication.

## Protect an internal app with Passport

Use [Vercel Passport](/docs/passport) to require sign-in through your company's identity provider before requests reach your TanStack Start app. Passport requires an Enterprise plan. Your server functions and server routes can use the verified visitor identity to personalize pages and authorize access.

Follow [Build user-aware TanStack Start apps with Vercel Passport](/kb/guide/vercel-passport-tanstack-start) to read identity with `getIdentity()` from `@vercel/passport`, protect server functions with middleware, and restrict routes by identity provider group. The guide uses TanStack Start with React and the Nitro Vite plugin, and includes local development and identity forwarding to other backends.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
