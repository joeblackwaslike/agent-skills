---
title: Flag Evaluation Metrics
product: vercel
url: /docs/flags/vercel-flags/evaluation-metrics
canonical_url: "https://vercel.com/docs/flags/vercel-flags/evaluation-metrics"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/vercel-flags/sdks/flags-sdk
  - /docs/flags/vercel-flags/quickstart
  - /docs/flags/vercel-flags/dashboard/sdk-keys
  - /docs/flags/observability/web-analytics
summary: Track Vercel Flags evaluations and see which variant each evaluation returns.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/evaluation-metrics.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "04283b54464c6975b31cf23f6bf4858ad93c8c7c7c309618eb6f4ffd8c60fa06"
---

# Flag Evaluation Metrics

Evaluation metrics show how often a feature flag is evaluated and which variants those evaluations resolve to. Use them to verify a rollout behaves as expected, confirm that traffic reaches a new variant, or check whether a flag is still in use before archiving it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [How to use Vercel Flags across projects](https://vercel.com/kb/guide/how-to-use-vercel-flags-across-projects?from=related) — Evaluate flags across projects using a source project SDK Key in the consumer project via a custom adapter
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Observability](https://vercel.com/docs/flags/observability?from=related) — Track feature flag evaluations and analyze their impact with Web Analytics.
- [Core](https://vercel.com/docs/flags/vercel-flags/sdks/core?from=related) — Use the Vercel Flags core evaluation library directly for custom setups.
- [Feature Flag](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag?from=related) — Learn how to configure individual feature flags in the Vercel Dashboard.
- [Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference?from=related) — API reference for the Flags SDK for Next.js and SvelteKit.
- [Getting Started](https://vercel.com/docs/flags/flags-explorer/getting-started?from=related) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags

Full cross-link map for this page: [/docs/flags/vercel-flags/evaluation-metrics.graph.md](/docs/flags/vercel-flags/evaluation-metrics.graph.md)
<!-- /docsgraph:related -->

## Where to find evaluation metrics

Each flag's detail page shows an **Evaluations** chart with the last 10 minutes of evaluations, broken down by variant. Select **View Flag Evaluations** on the chart to open the full evaluation metrics view.

The full view lets you adjust the time range, granularity, grouping, filters, and chart type. Flag configuration changes appear as chart markers, so you can compare evaluation shifts with recent configuration changes.

## Capabilities

| Capability      | Details                                                             |
| --------------- | ------------------------------------------------------------------- |
| Historical data | Query up to 90 days of evaluation data                              |
| Granularity     | Down to 1 minute                                                    |
| Grouping        | Group evaluations by one or more dimensions                         |
| Filtering       | Filter evaluations by the same dimensions                           |

### Grouping dimensions

By default, evaluations are grouped by variant. You can group and filter by these dimensions:

| Dimension             | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| **Variant**           | The variant the evaluation resolved to                                       |
| **Environment**       | The environment the flag was evaluated in (Production, Preview, Development) |
| **Reason**            | Why the evaluation resolved to its variant                                   |
| **Client**            | The client that evaluated the flag                                           |
| **SDK Environment**   | The environment of the SDK key used for the evaluation                       |
| **SDK Key**           | The SDK key used for the evaluation                                          |
| **Reporting Project** | The project that reported the evaluation                                     |

## Required SDK version

Clients report evaluation metrics starting with `@vercel/flags-core` version 1.6.0. Clients on older versions still evaluate flags correctly, but their evaluations don't show up in the metrics.

> **💡 Note:** The [Flags SDK adapter](/docs/flags/vercel-flags/sdks/flags-sdk) uses
> `@vercel/flags-core` internally. Make sure your installed dependencies
> resolve to version 1.6.0 or later.

When the **Evaluations** chart detects clients using `@vercel/flags-core` earlier than 1.6.0, it shows a warning. Update those clients to the latest SDK version so future evaluations appear in the metrics.

Clients that report evaluations also report their SDK version. The warning clears once no client has reported an outdated version for 24 hours. Keep in mind that older deployments, such as active preview deployments or a previous production deployment still receiving traffic, can keep reporting an old SDK version and keep the warning visible.

## Next steps

- [Update the SDK](/docs/flags/vercel-flags/quickstart)
- [Manage SDK keys](/docs/flags/vercel-flags/dashboard/sdk-keys)
- [Integrate flags with Web Analytics](/docs/flags/observability/web-analytics)


---

[View full sitemap](/docs/sitemap)
