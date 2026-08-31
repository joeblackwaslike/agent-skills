---
title: Observability
product: vercel
url: /docs/flags/observability
canonical_url: "https://vercel.com/docs/flags/observability"
last_updated: 2026-06-08
type: conceptual
prerequisites:
  - /docs/flags
related:
  - /docs/flags/observability/web-analytics
  - /docs/flags/flags-sdk-reference
summary: Track feature flag evaluations and analyze their impact with Web Analytics.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/observability.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "6e52d9466780c488bff285d374b59c7ec41ff24b5c7b516de09edb0f16c8d908"
---

# Observability

Feature flags play a crucial role in the software development lifecycle, enabling safe feature rollouts, experimentation, and A/B testing. When you integrate your feature flags with the Vercel platform, you can improve your application by using Vercel's observability features.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related)
- [Observe your feature flags with the Vercel DX platform](https://vercel.com/changelog/observe-your-feature-flags-with-the-vercel-dx-platform?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related)
- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related)
- [Vercel Flags](https://vercel.com/docs/flags/vercel-flags?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related) — Use Vercel as your feature flag provider to create and manage flags, define targeting rules, and run experiments directl
- [Managing flags in the dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Getting Started with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Observability](https://vercel.com/docs/observability?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Getting started with Flags Explorer](https://vercel.com/docs/flags/flags-explorer/getting-started?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags

Full cross-link map for this page: [/docs/flags/observability.graph.md](/docs/flags/observability.graph.md?from=related&source_path=%2Fdocs%2Fflags%2Fobservability&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Why track flag evaluations?

Tracking which flags are evaluated and when gives you insights into:

- How features perform in production
- Which user segments see which features
- The correlation between flags and application metrics
- Issues related to specific flag configurations

## Observability options

## How it works

The observability integration works by reporting flag values as your application evaluates them:

1. When your code evaluates a flag, call `reportValue(flagKey, flagValue)`
2. Vercel captures these evaluations and associates them with the request or event
3. View the data in the Web Analytics dashboard

If you're using the Flags SDK, flag reporting happens automatically—no manual instrumentation required.

## Next steps

- [Integrate flags with Web Analytics](/docs/flags/observability/web-analytics)
- [Learn about the Flags SDK](/docs/flags/flags-sdk-reference)


---

[View full sitemap](/docs/sitemap)
