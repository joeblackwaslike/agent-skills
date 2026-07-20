---
title: Evaluation Metrics
product: vercel
url: /docs/flags/vercel-flags/evaluation-metrics
canonical_url: "https://vercel.com/docs/flags/vercel-flags/evaluation-metrics"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/vercel-flags/sdks/flags-sdk
  - /docs/flags/vercel-flags/quickstart
  - /docs/flags/vercel-flags/dashboard/sdk-keys
  - /docs/flags/observability/web-analytics
summary: Learn about evaluation metrics on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/evaluation-metrics.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "019e7b1e084d56212ee257873ef194c39eac60f13ab23d05fa4d744b7c145052"
---

# Flag Evaluation Metrics

Evaluation metrics show how often a feature flag is evaluated and which variants those evaluations resolve to. Use them to verify a rollout behaves as expected, confirm that traffic reaches a new variant, or check whether a flag is still in use before archiving it.

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
