---
title: Marketplace
product: vercel
url: /docs/flags/marketplace
canonical_url: "https://vercel.com/docs/flags/marketplace"
last_updated: 2026-07-29
type: conceptual
prerequisites:
  - /docs/flags
related:
  - /docs/flags/flags-explorer/getting-started
  - /docs/flags/observability
  - /docs/flags/flags-sdk-reference
  - /docs/global-config
  - /docs/global-config/global-config-integrations/launchdarkly-global-config
summary: Connect your preferred feature flag provider through the Vercel Marketplace for a unified flags experience.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/marketplace.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "30b6a6c5ca9683658b7a1a649f1489a776fead85b93f632da51c08cd3bbadd32"
---

# Marketplace

When you connect a feature flag provider through the [Vercel Marketplace](https://vercel.com/marketplace?category=experimentation), you get deep platform integration with Vercel. Your flags and experiments will automatically appear in **Flags** in your dashboard sidebar, where you can see all your flags in one place.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Vercel Flags](https://vercel.com/docs/flags/vercel-flags?from=related) — Use Vercel as your feature flag provider to create and manage flags, define targeting rules, and run experiments directl
- [Getting Started](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard?from=related) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Flags SDK](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk?from=related) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [SDKs](https://vercel.com/docs/flags/vercel-flags/sdks?from=related) — Learn how to integrate Vercel Flags into your application using the Flags SDK, OpenFeature, or the core library.

Full cross-link map for this page: [/docs/flags/marketplace.graph.md](/docs/flags/marketplace.graph.md)
<!-- /docsgraph:related -->

You can keep using your existing provider while you use Vercel's developer tools. Once you connect your provider, your flags work automatically with the [Flags dashboard](#flags-dashboard), [Flags Explorer](/docs/flags/flags-explorer/getting-started), and [observability](/docs/flags/observability). You can integrate flags into your code using your provider's SDK or the [Flags SDK](/docs/flags/flags-sdk-reference) for framework-native patterns and type-safety.

## Available providers

You can find popular feature flag and experimentation platforms in the Vercel Marketplace:

### Native Integrations

Native integrations are purchased through the Marketplace, let you sign in with your Vercel account, show flags directly in the Vercel dashboard, and sync flag values to Global Config for faster reads.

- [Statsig](/marketplace/statsig)
- [PostHog](/marketplace/posthog)
- [GrowthBook](/marketplace/growthbook)
- [LaunchDarkly](/marketplace/launchdarkly)

[Browse all experimentation integrations](/marketplace?category=experimentation)

### External Integrations

External integrations allow syncing feature flags of third-party providers to Global Config faster reads but are billed through the provider. Feature Flags from external integrations do not appear in the Vercel dashboard.

- [LaunchDarkly](/marketplace/launchdarkly)

[Browse all experimentation integrations](/marketplace?category=experimentation)

## Flags dashboard

Once you connect a native integration, all your flags appear in the **Flags** section in your project sidebar. Use this dashboard to view and manage every flag in your project.

- **Unified overview**: See every flag, its current status, and which provider manages it in one list.
- **Source of truth**: You can view marketplace flags in the Vercel Dashboard, but you manage their configuration in your provider's dashboard to keep it as the source of truth.
- **Direct editing**: Click any flag to jump directly to your provider's dashboard. You'll be signed in automatically with your Vercel account.

## Global Config sync

Native integrations and external integrations can sync flag values to [Global Config](/docs/global-config) for microsecond reads at the edge. This eliminates the network hop to your provider's API during flag evaluation.

See these integration guides for setup instructions:

- [Using Global Config with LaunchDarkly](/docs/global-config/global-config-integrations/launchdarkly-global-config)
- [Using Global Config with Statsig](/docs/global-config/global-config-integrations/statsig-global-config)

## Platform integration

Marketplace providers work directly with Vercel's developer tools without requiring extra configuration in your codebase:

- **Flags Explorer**: View and override your flags during development using the [Vercel Toolbar](/docs/flags/flags-explorer/getting-started).
- **Observability**: Track flag evaluations in [Runtime Logs and Web Analytics](/docs/flags/observability) to help you debug and analyze your features.

## Codebase integration

You have multiple options for using marketplace flags in your application code:

- **Use your provider's SDK**: You can continue using the SDK provided by your chosen provider.
- **Use the Flags SDK**: Alternatively, you can use the [Flags SDK](/docs/flags/flags-sdk-reference) for framework-native patterns and type-safety in Next.js and SvelteKit.

No matter which SDK you choose, you still get deep Vercel platform integration once you connect your provider through the Marketplace.

## Get started

To integrate a marketplace provider with your Vercel project:

1. **Install the integration**: Choose your provider in the [Marketplace](https://vercel.com/marketplace?category=experimentation) and follow the steps to connect it to your project.
2. **View your flags**: Check **Flags** in your project sidebar overview to see your flags automatically synced from your provider.
3. **Use the Toolbar**: Open the [Vercel Toolbar](/docs/flags/flags-explorer/getting-started) in your preview or local environment to interact with your flags.


---

[View full sitemap](/docs/sitemap)
