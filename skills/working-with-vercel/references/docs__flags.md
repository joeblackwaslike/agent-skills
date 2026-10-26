---
title: Flags
product: vercel
url: /docs/flags
canonical_url: "https://vercel.com/docs/flags"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  []
related:
  - /docs/flags/marketplace
  - /docs/flags/vercel-flags/quickstart
  - /docs/flags/flags-explorer/getting-started
  - /docs/flags/flags-sdk-reference
  - /docs/flags/observability
summary: "Control feature visibility, run experiments, and ship with confidence using Vercel's feature flags platform."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4568afb06125653a0ce1d4ad719f186b628167a3dbf9fafaaf889cbedc6bb64e"
---

# Flags

Vercel provides a complete feature flags platform. Use Vercel as your feature flag provider, or connect your preferred provider from the [Marketplace](/docs/flags/marketplace). Either way, you get a unified dashboard to manage all your flags, developer tools like the Flags Explorer, and built-in observability.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel)
- [Introducing the Flags Explorer, first-party integrations, and updates to the Flags SDK ](https://vercel.com/blog/introducing-the-flags-explorer-first-party-integrations-and-updates)
- [Vercel Flags no longer requires SDK Keys for Vercel deployments](https://vercel.com/changelog/authenticate-vercel-flags-with-openid-connect-by-default)
- [Manage Vercel Flags segments with Vercel CLI](https://vercel.com/changelog/manage-vercel-flags-segments-with-vercel-cli)
- [Manage Vercel Flags targeting rules from the CLI](https://vercel.com/changelog/manage-vercel-flags-targeting-rules-from-the-cli)
- [Automate progressive rollouts with Vercel Flags](https://vercel.com/changelog/progressive-rollouts-in-vercel-flags)
- [Timestamp attributes are now supported in Vercel Flags](https://vercel.com/changelog/timestamp-attributes-are-now-supported-in-vercel-flags)
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Vercel Web Analytics](https://vercel.com/docs/analytics) — With Web Analytics, you can get detailed insights into your website's visitors with new metrics like top pages, top refe
- [Filtering Analytics](https://vercel.com/docs/analytics/filtering) — Learn how filters allow you to explore insights about your website's visitors.
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.

Full cross-link map for this page: [/docs/flags.graph.md](/docs/flags.graph.md)
<!-- /docsgraph:related -->

![Flags in Vercel Dashboard](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/flags/flags-tab-light.png)

## Why use feature flags?

Flags give you control over your application's behavior without redeploying:

- Roll out features gradually to specific users, teams, or environments
- Test in production safely before launching to everyone
- Run A/B tests to measure impact on conversion and performance
- Override flags locally with the Flags Explorer, with no code changes needed
- Ship and deploy independently from releasing features

## Choose your provider

**Vercel Flags** [→](/docs/flags/vercel-flags/quickstart)

Use Vercel as your feature flag provider. Create and manage flags directly in the dashboard with built-in targeting rules, segments, splits, and environment controls.

**Marketplace Providers** [→](https://vercel.com/marketplace?category=experimentation)

Connect your preferred feature flag or experimentation provider. Integrate with LaunchDarkly, Statsig, Split, and more while using Vercel's unified experience.

## Unified dashboard

The **Flags** section in your Vercel Dashboard shows all your flags in one place, regardless of which provider you use. You can filter, search, and see the status of every flag across your project.

This unified view lists all your flags in one place. Vercel Flags can be edited directly in the Vercel Dashboard. Marketplace flags link straight to their provider's dashboard. Since you're already signed in through Vercel, you can jump in and make changes immediately.

## Developer tools

**Flags Explorer** [→](/docs/flags/flags-explorer/getting-started)

View and temporarily override feature flags from the Vercel Toolbar. Test different flag states during development without changing code or affecting other users.

**Flags SDK** [→](/docs/flags/flags-sdk-reference)

A framework-native library for Next.js and SvelteKit that works with any provider. Define flags in code with full TypeScript support and automatic Vercel integration.

## Observability

Track flag evaluations in Runtime Logs and analyze their impact on user behavior in Web Analytics. See which flags affect conversion rates and application performance.

[Learn more about flags observability](/docs/flags/observability)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
