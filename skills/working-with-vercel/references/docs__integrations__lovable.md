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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "0fb6980589903ccd89d15a84d29fa049aa2e21d9ff50b393f6b86318d9f54855"
---

# Deploy a Lovable app on Vercel

## Overview

[Lovable](https://lovable.dev) is an AI-powered app builder. Lovable projects use [TanStack Start](/docs/frameworks/full-stack/tanstack-start) as their underlying framework, so they deploy to Vercel with zero configuration. Lovable uses [Nitro](https://v3.nitro.build/), the same universal server toolkit that powers TanStack Start on Vercel, so no manual build configuration is required.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [You can now deploy Lovable apps to Vercel](https://vercel.com/changelog/you-can-now-deploy-lovable-apps-to-vercel)
- [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel) — Deploy a TanStack Start app to Vercel with the Nitro Vite plugin. Covers Git and CLI deployment, Fluid compute defaults,
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [Deploying Storybook with Vercel](https://vercel.com/kb/guide/storybook-with-vercel) — Learn how to deploy Storybook applications to Vercel in minutes.
- [Deployments](https://v0.app/docs/deployments) — Preview and publish v0 projects on Vercel, then manage domains, visibility, and production updates.
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Build with a Hono starter template](https://vercel.com/kb/guide/build-with-a-hono-starter-template) — Deploy a Hono app to Vercel from a starter template. Compare the Hono API starter, MCP server, AI SDK, Slack Bolt, Next.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/integrations/lovable.graph.md](/docs/integrations/lovable.graph.md)
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
