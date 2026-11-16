---
title: Observability
product: vercel
url: /docs/flags/observability
canonical_url: "https://vercel.com/docs/flags/observability"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/flags
related:
  - /docs/flags/observability/web-analytics
  - /docs/flags/flags-sdk-reference
summary: Track feature flag evaluations and analyze their impact with Web Analytics.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/flags/observability.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "91f8c454417eaa5e59e4a2cf6d06d8a07d6d4e9fdbf027577228e686db1e57b3"
---

# Observability

Feature flags play a crucial role in the software development lifecycle, enabling safe feature rollouts, experimentation, and A/B testing. When you integrate your feature flags with the Vercel platform, you can improve your application by using Vercel's observability features.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Observe your feature flags with the Vercel DX platform](https://vercel.com/changelog/observe-your-feature-flags-with-the-vercel-dx-platform)
- [Evaluation metrics for Vercel Flags](https://vercel.com/changelog/evaluation-metrics-for-vercel-flags)
- [Vercel Flags](https://vercel.com/docs/flags/vercel-flags) — Use Vercel as your feature flag provider to create and manage flags, define targeting rules, and run experiments directl
- [Flag Evaluation Metrics](https://vercel.com/docs/flags/vercel-flags/evaluation-metrics) — Track Vercel Flags evaluations and see which variant each evaluation returns.
- [Managing flags in the dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Getting Started with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/quickstart) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.

Full cross-link map for this page: [/docs/flags/observability.graph.md](/docs/flags/observability.graph.md)
<!-- /docsgraph:related -->

## Why track flag evaluations?

Tracking which flags are evaluated and when gives you insights into:

- How features perform in production
- Which user segments see which features
- The correlation between flags and application metrics
- Issues related to specific flag configurations

## Observability options

**Web Analytics** [→](/docs/flags/observability/web-analytics)

Break down page views and custom events by feature flags in Web Analytics. Understand how flags affect user behavior and conversion rates.

## How it works

The observability integration works by reporting flag values as your application evaluates them:

1. When your code evaluates a flag, call `reportValue(flagKey, flagValue)`
2. Vercel captures these evaluations and associates them with the request or event
3. View the data in the Web Analytics dashboard

If you're using the Flags SDK, flag reporting happens automatically, with no manual instrumentation required.

## Next steps

- [Integrate flags with Web Analytics](/docs/flags/observability/web-analytics)
- [Learn about the Flags SDK](/docs/flags/flags-sdk-reference)

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
