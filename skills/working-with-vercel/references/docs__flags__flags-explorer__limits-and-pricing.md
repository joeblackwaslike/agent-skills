---
title: Pricing for Flags Explorer
product: vercel
url: /docs/flags/flags-explorer/limits-and-pricing
canonical_url: "https://vercel.com/docs/flags/flags-explorer/limits-and-pricing"
last_updated: 2026-08-26
type: reference
prerequisites:
  - /docs/flags/flags-explorer
  - /docs/flags
related:
  []
summary: Compare monthly Flags Explorer override limits and the price of unlimited overrides across Vercel plans.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/flags/flags-explorer/limits-and-pricing.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "79c14dfd0b050dcaec639953a8989504bc006ab6f35ca3617ed4ddb4f50921cf"
---

# Pricing for Flags Explorer

> Flags Explorer is available on all plans

## Pricing

The following table outlines the price for each resource according to the plan you are on:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Flags Explorer is now generally available](https://vercel.com/changelog/flags-explorer-is-now-generally-available)
- [Limits and Pricing for Vercel Flags](https://vercel.com/docs/flags/vercel-flags/limits-and-pricing) — Review Vercel Flags request pricing and limits for flags, segments, configuration size, and connected projects.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Setting up Flags Explorer](https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer) — Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting ot
- [Getting started with Flags Explorer](https://vercel.com/docs/flags/flags-explorer/getting-started) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags
- [Vercel Flags](https://vercel.com/docs/flags/vercel-flags) — Use Vercel as your feature flag provider to create and manage flags, define targeting rules, and run experiments directl

Full cross-link map for this page: [/docs/flags/flags-explorer/limits-and-pricing.graph.md](/docs/flags/flags-explorer/limits-and-pricing.graph.md)
<!-- /docsgraph:related -->

| Resource | Pro Price |
| --- | --- |
| Flags Explorer - Unlimited Overrides | $250.00 |


Unlimited overrides can be managed in your [team's billing settings](/d?to=%2Fteams%2F%5Bteam%5D%2Fsettings%2Fbilling\&title=Go+to+Billing+Settings). Alternatively, if you have the necessary permissions, you can enable this feature directly in the Flags Explorer once you reach the limit.

### Limits per plan

When not subscribed to the unlimited option, Hobby, Pro and Enterprise have a limited amount of overrides in the calendar month:

|           | Hobby         | Pro           | Enterprise    |
| --------- | ------------- | ------------- | ------------- |
| Overrides | 150 per month | 150 per month | 150 per month |

*One override directly translates to one click on the apply button of the Flags
Explorer, which means that multiple flags can be overridden in one go.*

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
