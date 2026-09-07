---
title: Manage and optimize usage
product: vercel
url: /docs/pricing/manage-and-optimize-usage
canonical_url: "https://vercel.com/docs/pricing/manage-and-optimize-usage"
last_updated: 2026-08-21
type: reference
prerequisites:
  - /docs/pricing
related:
  - /docs/notifications
  - /docs/functions/usage-and-pricing
  - /docs/builds/managing-builds
  - /docs/deployment-storage
  - /docs/monorepos/remote-caching
summary: Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize your usage to save costs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/manage-and-optimize-usage.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "983d7a349ed81895919b70a9bd18a59df6659c8df12ca12222274e45325fca9a"
---

# Manage and optimize usage

## What pricing plan am I on?

There are three plans on Vercel: Hobby, Pro, and Enterprise. To see which plan you are on, select your team from the team switcher. Next to your team name, you will see the plan you are on.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Log Drains are now generally available](https://vercel.com/changelog/log-drains-are-now-generally-available?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related)
- [Lower pricing for Log Drains](https://vercel.com/changelog/lower-pricing-for-log-drains?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related)
- [One-click linking from Usage to Vercel Observability dashboards](https://vercel.com/changelog/one-click-linking-from-usage-to-vercel-observability-dashboards?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related)
- [Speed Insights usage can now be viewed by Project](https://vercel.com/changelog/speed-insights-usage-can-now-be-viewed-by-project?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related)
- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Protecting your app (and wallet) against malicious traffic](https://vercel.com/blog/protecting-your-app-and-wallet-against-malicious-traffic?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related)
- [Vercel Pricing](https://vercel.com/pricing?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related) — Choose a Vercel plan and compare features and usage pricing.
- [Account Plans on Vercel](https://vercel.com/docs/plans?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related) — Learn about the different plans available on Vercel.
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [CDN pricing and usage](https://vercel.com/docs/manage-cdn-usage?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related) — Understand CDN pricing resources, monitor usage from your dashboard, and optimize Fast Data Transfer, Fast Origin Transf
- [Legacy Usage & Pricing for Functions](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related) — Learn about legacy usage and pricing for Vercel Functions.
- [Observability Insights](https://vercel.com/docs/observability/insights?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=related) — List of available data sources that you can view and monitor with Observability on Vercel.

Full cross-link map for this page: [/docs/pricing/manage-and-optimize-usage.graph.md](/docs/pricing/manage-and-optimize-usage.graph.md?from=related&source_path=%2Fdocs%2Fpricing%2Fmanage-and-optimize-usage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Viewing usage

The Usage page shows the usage of all projects in your Vercel account by default. To access it, open **Usage** in the sidebar from your Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard).

To use the usage page:

1. To investigate the usage of a specific team, use the team switcher to select your team
2. From your dashboard, open **Usage** in the sidebar
3. We recommend you look at usage over the last 30 days to determine patterns. Change the billing cycle dropdown under Usage to **Last 30 days**
4. You can choose to view the usage of a particular project by selecting it from the dropdown
5. In the overview, you'll see an allotment indicator. It shows how much of your usage you've consumed in the current cycle and the projected cost for each item
6. Review the breakdown by project and region to understand the metrics causing the high usage

## Usage alerts, notification, and spend management

The usage dashboard helps you understand and project your usage. You can also set up alerts to notify you when you're approaching usage limits. You can set up the following features:

- **Spend Management**: Spend management is an opt-in feature. Pro teams can set up a spend amount for your team to trigger notifications or actions. For example a webhook or pausing your projects when you hit your set amount
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

The table below shows the metrics for the [**Data Cache**](/docs/caching/runtime-cache) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Incremental Static Regeneration (ISR)

The table below shows the metrics for the [**Incremental Static Regeneration**](/docs/incremental-static-regeneration/limits-and-pricing) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

## Observability

The table below shows the metrics for the [Web Analytics](/docs/manage-and-optimize-observability#managing-web-analytics-events), [Speed Insights](/docs/manage-and-optimize-observability#managing-speed-insights-events), and [Monitoring](/docs/manage-and-optimize-observability#optimizing-monitoring-events) sections of the **Usage** dashboard.

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
