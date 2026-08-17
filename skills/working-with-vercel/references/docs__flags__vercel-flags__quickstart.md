---
title: Getting Started with Vercel Flags
product: vercel
url: /docs/flags/vercel-flags/quickstart
canonical_url: "https://vercel.com/docs/flags/vercel-flags/quickstart"
last_updated: 2026-06-24
type: tutorial
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/frameworks/full-stack/nextjs
  - /docs/cli
  - /docs/flags/vercel-flags/dashboard/entities
  - /docs/flags/vercel-flags/sdks/core
  - /docs/flags/vercel-flags/dashboard/segments
summary: Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/quickstart.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a7bfbb6a3388f89b7193f63aa3cb60a87b25b06a83a24124e256efca46ed0ddc"
---

# Getting Started with Vercel Flags

This guide walks you through creating a feature flag in the Vercel Dashboard and evaluating it in your application. By the end you'll have a working flag that you can toggle from the dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [Feature Flag](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag?from=related) — Learn how to configure individual feature flags in the Vercel Dashboard.
- [Flags SDK](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk?from=related) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference?from=related) — API reference for the Flags SDK for Next.js and SvelteKit.
- [OpenFeature](https://vercel.com/docs/flags/vercel-flags/sdks/openfeature?from=related) — Use the vendor-neutral OpenFeature API with Vercel Flags as your provider.
- [Set Up Flags Explorer](https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer?from=related) — Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting ot

Full cross-link map for this page: [/docs/flags/vercel-flags/quickstart.graph.md](/docs/flags/vercel-flags/quickstart.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A [Next.js](/docs/frameworks/full-stack/nextjs) project connected to Vercel.
- [Vercel CLI](/docs/cli) installed.

- ### Create a flag in the dashboard
  1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
  2. Open **Flags** in the sidebar for your project.
  3. Create a new flag named `marketing-banner`.
  4. Leave the **Type** set to **Boolean** and configure the environment settings to be **on** for Development and **off** for Preview and Production.

- ### Pull local OpenID Connect credentials
  Vercel Flags authenticates with the Vercel OpenID Connect (OIDC) token associated with your project. Vercel deployments receive this token automatically. For local development, pull environment variables into your `.env.local` file:
  ```bash filename="terminal"
  vercel env pull
  ```
  If your project isn't linked yet, run `vercel link` first.

- ### Install the required packages

- ### Evaluate the flag in your application
  Toggle the flag off for the **Development** environment in the Vercel Dashboard, then press **Review and save** and leave a message for the change. Reload the page to see the change.

- ### Add targeting with the identify function
  Now that your flag is working, you can add an `identify` function to pass user and team context for [targeting rules](/docs/flags/vercel-flags/dashboard/entities). This lets you roll out flags to specific users, plans, or teams from the dashboard.

## Built-in resilience

When you deploy to Vercel, the build process fetches your latest flag definitions once at build time and bundles them into the deployment. This guarantees every function uses the same snapshot during the build, and provides a runtime fallback if the Vercel Flags service is temporarily unreachable. Definitions are only fetched when you are using the Flags SDK packages or when your project has at least one environment variable containing an SDK key for Vercel Flags.

Learn more about [embedded definitions](/docs/flags/vercel-flags/sdks/core#embedded-definitions).

## Next steps

Your flag is working. Here's what to explore next:

- **[Entities and targeting](/docs/flags/vercel-flags/dashboard/entities)**: Define user attributes and create rules to show flags to specific groups.
- **[Segments](/docs/flags/vercel-flags/dashboard/segments)**: Build reusable audience groups like "Beta Testers" or "Internal Team."
- **[Flags Explorer](/docs/flags/flags-explorer/getting-started)**: Override flags in the Vercel Toolbar during development without affecting other users.
- **[Drafts](/docs/flags/vercel-flags/dashboard/drafts)**: Define flags in code first, then promote them in the dashboard when you're ready.
- **[Observability](/docs/flags/observability)**: Track flag evaluations in Runtime Logs and Web Analytics.
- **[Managing flags](/docs/flags/vercel-flags/dashboard)**: Configure rules, environments, and flag lifecycles in the dashboard.


---

[View full sitemap](/docs/sitemap)
