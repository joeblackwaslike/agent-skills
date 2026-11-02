---
title: Manage and optimize usage
product: vercel
url: /docs/pricing/manage-and-optimize-usage
canonical_url: "https://vercel.com/docs/pricing/manage-and-optimize-usage"
last_updated: 2026-09-18
type: reference
prerequisites:
  - /docs/pricing
related:
  - /docs/cli/usage
  - /docs/pricing/flex-commit
  - /docs/notifications
  - /docs/functions/usage-and-pricing
  - /docs/builds/managing-builds
summary: Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize your usage to save costs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/manage-and-optimize-usage.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "5bdf3349399cecbfcdee24809cf3577cf71d7d71f5469d3e9af510a4a990b44f"
---

# Manage and optimize usage

## What pricing plan am I on?

There are three plans on Vercel: Hobby, Pro, and Enterprise. To see which plan you are on, select your team from the team switcher. Next to your team name, you will see the plan you are on.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Log Drains are now generally available](https://vercel.com/changelog/log-drains-are-now-generally-available)
- [Lower pricing for Log Drains](https://vercel.com/changelog/lower-pricing-for-log-drains)
- [One-click linking from Usage to Vercel Observability dashboards](https://vercel.com/changelog/one-click-linking-from-usage-to-vercel-observability-dashboards)
- [Speed Insights usage can now be viewed by Project](https://vercel.com/changelog/speed-insights-usage-can-now-be-viewed-by-project)
- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Optimize Runtime Cache on Vercel](https://vercel.com/kb/guide/optimize-runtime-cache-reads-on-vercel) — Diagnose rising Runtime Cache usage, trace reads to tags and code paths, and reduce avoidable reads while checking write
- [Protecting your app (and wallet) against malicious traffic](https://vercel.com/blog/protecting-your-app-and-wallet-against-malicious-traffic)
- [Simpler Pricing](https://vercel.com/blog/simpler-pricing)
- [Vercel Pricing](https://vercel.com/pricing) — Choose a Vercel plan and compare features and usage pricing.
- [CDN pricing and usage](https://vercel.com/docs/manage-cdn-usage) — Understand CDN pricing resources, monitor usage from your dashboard, and optimize Fast Data Transfer, Fast Origin Transf
- [Legacy Usage & Pricing for Functions](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing) — Learn about legacy usage and pricing for Vercel Functions.
- [Account Plans on Vercel](https://vercel.com/docs/plans) — Learn about the different plans available on Vercel.

Full cross-link map for this page: [/docs/pricing/manage-and-optimize-usage.graph.md](/docs/pricing/manage-and-optimize-usage.graph.md)
<!-- /docsgraph:related -->

## Viewing usage

The Usage page shows the usage of all projects in your Vercel account by default. To access it, open **Usage** in the sidebar from your Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard).

Review usage from the dashboard or the Vercel CLI.

#### Dashboard

To use the usage page:

1. To investigate the usage of a specific team, use the team switcher to select your team
2. From your dashboard, open **Usage** in the sidebar
3. We recommend you look at usage over the last 30 days to determine patterns. Change the billing cycle dropdown under Usage to **Last 30 days**
4. You can choose to view the usage of a particular project by selecting it from the dropdown
5. In the overview, you'll see an allotment indicator. It shows how much of your usage you've consumed in the current cycle and the projected cost for each item
6. Review the breakdown by project and region to understand the metrics causing the high usage

#### CLI

Run [`vercel usage`](/docs/cli/usage) to see usage for the last 30 days by project. Use `--group-by region` to group by region instead.

```bash filename="terminal"
vercel usage --since 30d --group-by project
```

## Usage alerts, notification, and spend management

The usage dashboard helps you understand and project your usage. You can also set up alerts to notify you when you're approaching usage limits. You can set up the following features:

- **Spend Management**: Spend management is an opt-in feature. Pro teams and Enterprise teams on the [Flexible Commitment](/docs/pricing/flex-commit) plan can set up a spend amount for your team to trigger notifications or actions. For example a webhook or pausing your projects when you hit your set amount
- **Usage Notifications**: Usage notifications are set up automatically. Pro teams can also [configure the threshold](/docs/notifications#on-demand-usage-notifications) for usage alerts to notify you when you're approaching your usage limits

  **Interested in the Enterprise plan?**

## CDN

The table below shows the CDN metrics on the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Functions

The table below shows the metrics for the [**Functions**](/docs/functions/usage-and-pricing) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Builds

The table below shows the metrics for the [**Builds**](/docs/builds/managing-builds) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Deployment Storage

The table below shows the metrics for the [**Deployment Storage**](/docs/deployment-storage) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Artifacts

The table below shows the metrics for the [**Remote Cache Artifacts**](/docs/monorepos/remote-caching#artifacts) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Global Config

The table below shows the metrics for the [**Global Config**](/docs/global-config/global-config-limits) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Data Cache

The table below shows the metrics for the [**Data Cache**](/docs/caching/runtime-cache/data-cache) section of the **Usage** dashboard.

Vercel is unifying Data Cache with [Runtime Cache](/docs/caching/runtime-cache). Starting October 30, 2026, Runtime Cache serves `fetch` caching and `unstable_cache` for new teams, and Vercel bills that usage as Runtime Cache usage. Vercel will notify existing teams of their migration timeline. See [Data cache is unifying with Runtime Cache](/docs/caching/runtime-cache/data-cache#data-cache-is-unifying-with-runtime-cache).

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Incremental Static Regeneration (ISR)

The table below shows the metrics for the [**Incremental Static Regeneration**](/docs/incremental-static-regeneration/limits-and-pricing) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Observability

The table below shows the metrics for the [Web Analytics](/docs/manage-and-optimize-observability#managing-web-analytics-events), [Speed Insights](/docs/manage-and-optimize-observability#managing-speed-insights-events), and [Observability Plus](/docs/manage-and-optimize-observability#managing-observability-events) sections of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Image Optimization

The table below shows the metrics for the [**Image Optimization**](/docs/image-optimization/managing-image-optimization-costs) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Viewing Options

### Count

Count shows the **total** number of a certain metric, across all projects in your account. This is useful to understand past trends about your usage.

### Project

Project shows the total usage of a certain metric, per project. This is useful to understand how different projects are using resources and is useful to help you start understanding the best opportunities for optimizing your usage.

### Region

For region-based pricing, you can view the usage of a certain metric, per region. This is useful to understand the requests your site is getting from different regions.

### Ratio

- **Requests**: The ratio of cached vs uncached requests
- **Fast Data Transfer**: The ratio of incoming vs outgoing data transfer
- **Fast Origin Transfer**: The ratio of incoming vs outgoing data transfer
- **Functions invocations**: Successful vs errored vs timed out invocations
- **Functions execution**: Successful vs errored vs timed out invocations
- **Builds**: Completed vs errored builds
- **Remote Cache Artifacts**: Uploaded vs downloaded artifacts
- **Remote Cache total size**: Uploaded vs downloaded artifacts

### Average

This shows the average usage of a certain metric over a 24 hour period.

## More resources

For more information on Vercel's pricing, guidance on optimizing consumption, and invoices, see the following
resources:

- [How are resources used on Vercel?](/docs/pricing/how-does-vercel-calculate-usage-of-resources)
- [Understanding my invoice](/docs/pricing/understanding-my-invoice)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
