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
source: "https://vercel.com/docs/flags/observability.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e9bbb6c0e19ae28aa953be3a616267c42c6d1e1d62364a7e6c18284c1ee39dc2"
---

# Observability

Feature flags play a crucial role in the software development lifecycle, enabling safe feature rollouts, experimentation, and A/B testing. When you integrate your feature flags with the Vercel platform, you can improve your application by using Vercel's observability features.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Observe your feature flags with the Vercel DX platform](https://vercel.com/changelog/observe-your-feature-flags-with-the-vercel-dx-platform)
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [Vercel Flags](https://vercel.com/docs/flags/vercel-flags) — Use Vercel as your feature flag provider to create and manage flags, define targeting rules, and run experiments directl
- [Managing flags in the dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Flag Evaluation Metrics](https://vercel.com/docs/flags/vercel-flags/evaluation-metrics) — Track Vercel Flags evaluations and see which variant each evaluation returns.
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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
