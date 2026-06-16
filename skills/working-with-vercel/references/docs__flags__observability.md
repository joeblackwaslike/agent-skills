---
title: Observability
product: vercel
url: /docs/flags/observability
canonical_url: "https://vercel.com/docs/flags/observability"
last_updated: 2026-03-09
type: conceptual
prerequisites:
  - /docs/flags
related:
  - /docs/flags/observability/web-analytics
  - /docs/flags/flags-sdk-reference
summary: Track feature flag evaluations and analyze their impact with Web Analytics.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/observability.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "2ff8a485a21f4a825ec3e3f6bc296ded38bded3c2959e5ec5c71e0b1804830ac"
---

# Observability

Feature flags play a crucial role in the software development lifecycle, enabling safe feature rollouts, experimentation, and A/B testing. When you integrate your feature flags with the Vercel platform, you can improve your application by using Vercel's observability features.

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
