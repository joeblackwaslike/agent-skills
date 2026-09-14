---
title: Deploy a Lovable app on Vercel
product: vercel
url: /docs/integrations/lovable
canonical_url: "https://vercel.com/docs/integrations/lovable"
last_updated: 2026-07-10
type: how-to
prerequisites:
  - /docs/integrations
related:
  - /docs/frameworks/full-stack/tanstack-start
  - /docs/drop
  - /docs/frameworks/more-frameworks
  - /docs/git
  - /docs/deployments
summary: Deploy your Lovable project to Vercel using GitHub sync and zero-configuration TanStack Start detection.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/lovable.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "8cb94e6a952b96163ea0c7b71b1096a3db907561a71babd4925226afb9ae6c31"
---

# Deploy a Lovable app on Vercel

## Overview

[Lovable](https://lovable.dev) is an AI-powered app builder. Lovable projects use [TanStack Start](/docs/frameworks/full-stack/tanstack-start) as their underlying framework, so they deploy to Vercel with zero configuration. Lovable uses [Nitro](https://v3.nitro.build/), the same universal server toolkit that powers TanStack Start on Vercel, so no manual build configuration is required.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [You can now deploy Lovable apps to Vercel](https://vercel.com/changelog/you-can-now-deploy-lovable-apps-to-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related)
- [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Deploy a TanStack Start app to Vercel with the Nitro Vite plugin. Covers Git and CLI deployment, Fluid compute defaults,
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [How to Deploy a Brunch App with Vercel](https://vercel.com/kb/guide/deploying-brunch-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Create a Brunch app and deploy it live with Vercel.
- [How to Deploy a Jekyll Site with Vercel](https://vercel.com/kb/guide/deploying-jekyll-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Create a Jekyll website and deploy it live with Vercel.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/integrations/lovable.graph.md](/docs/integrations/lovable.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Flovable&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This guide walks through connecting a Lovable project to Vercel through GitHub, so that every change you make in Lovable triggers a new deployment.

## Prerequisites

Before you begin, make sure you have:

- A [Vercel account](https://vercel.com/signup).
- A Lovable project you want to deploy.
- A GitHub account you can connect to both Lovable and Vercel.

## Deploy your Lovable project

To deploy a Lovable project to Vercel:

1. Sync your Lovable project to GitHub. See the [Lovable GitHub integration docs](https://docs.lovable.dev/integrations/github) for setup.
2. Import the repository from [vercel.com/new](https://vercel.com/new). Vercel detects the framework and deploys the project automatically.

Once connected, every change you make in Lovable syncs to GitHub and triggers a new deployment on Vercel.

> **💡 Note:** Zero-configuration detection requires `@lovable.dev/vite-tanstack-config` version `^2.6.2` or higher in your project. If your project uses an older version, update it before deploying.

> **💡 Note:** For a one-off deploy without a repository, you can download your project as a `.zip` from GitHub and drag it into [Vercel Drop](/docs/drop). GitHub sync remains the recommended path so that future Lovable changes deploy automatically.

## Related

- [TanStack Start on Vercel](/docs/frameworks/full-stack/tanstack-start)
- [More frameworks](/docs/frameworks/more-frameworks)
- [Deploying Git repositories](/docs/git)
- [Vercel Drop](/docs/drop)
- [Deployments overview](/docs/deployments)


---

[View full sitemap](/docs/sitemap)
