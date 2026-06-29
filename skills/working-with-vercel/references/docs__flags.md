---
title: Flags
product: vercel
url: /docs/flags
canonical_url: "https://vercel.com/docs/flags"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/flags/observability
summary: "Control feature visibility, run experiments, and ship with confidence using Vercel's feature flags platform."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "7e5d003e4b0a9c8576e18d55a34ef08efd721af3e26866db9f53084070dd0813"
---

# Flags

Vercel provides a complete feature flags platform. Use Vercel as your feature flag provider, or connect your preferred provider from the Marketplace. Either way, you get a unified dashboard to manage all your flags, developer tools like the Flags Explorer, and built-in observability.

![Image](`/docs-assets/static/docs/flags/flags-tab-light.png`)

## Why use feature flags?

Flags give you control over your application's behavior without redeploying:

- Roll out features gradually to specific users, teams, or environments
- Test in production safely before launching to everyone
- Run A/B tests to measure impact on conversion and performance
- Override flags locally with the Flags Explorer — no code changes needed
- Ship and deploy independently from releasing features

## Choose your provider

## Unified dashboard

The **Flags** section in your Vercel Dashboard shows all your flags in one place, regardless of which provider you use. You can filter, search, and see the status of every flag across your project.

This unified view lists all your flags in one place. Vercel Flags can be edited directly in the Vercel Dashboard. Marketplace flags link straight to their provider's dashboard—and since you're already signed in through Vercel, you can jump in and make changes immediately.

## Developer tools

## Observability

Track flag evaluations in Runtime Logs and analyze their impact on user behavior in Web Analytics. See which flags affect conversion rates and application performance.

[Learn more about flags observability](/docs/flags/observability)


---

[View full sitemap](/docs/sitemap)
