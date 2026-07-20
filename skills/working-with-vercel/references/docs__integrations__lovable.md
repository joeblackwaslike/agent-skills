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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b92ed9ec6b771be89e547c19f87e5db22ba5321ea81314cc10598ffbe17873ee"
---

# Deploy a Lovable app on Vercel

## Overview

[Lovable](https://lovable.dev) is an AI-powered app builder. Lovable projects use [TanStack Start](/docs/frameworks/full-stack/tanstack-start) as their underlying framework, so they deploy to Vercel with zero configuration. Lovable uses [Nitro](https://v3.nitro.build/), the same universal server toolkit that powers TanStack Start on Vercel, so no manual build configuration is required.

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
