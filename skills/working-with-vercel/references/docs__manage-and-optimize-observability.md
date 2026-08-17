---
title: Manage and optimize usage for Observability
product: vercel
url: /docs/manage-and-optimize-observability
canonical_url: "https://vercel.com/docs/manage-and-optimize-observability"
last_updated: 2026-07-06
type: reference
prerequisites:
  []
related:
  - /docs/speed-insights/limits-and-pricing
  - /docs/observability
  - /docs/speed-insights/metrics
  - /docs/manage-cdn-usage
  - /docs/analytics
summary: Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize your usage of Web Analytics...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/manage-and-optimize-observability.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6a72fb3073f25cae755d88066fb1eda7f3c03401de273a4428ce608862b77c7c"
---

# Manage and optimize usage for Observability

The Observability section covers usage for Observability, Monitoring, Web Analytics, and Speed insights.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Pricing](https://vercel.com/docs/analytics/limits-and-pricing?from=related) — Learn about pricing for Vercel Web Analytics.
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.

Full cross-link map for this page: [/docs/manage-and-optimize-observability.graph.md](/docs/manage-and-optimize-observability.graph.md)
<!-- /docsgraph:related -->

## Plan usage

| Resource | Price |
|----------|-------|
| [Speed Insights Events](/docs/speed-insights/limits-and-pricing) | $0.65 |
| [Observability Plus Events](/docs/observability#tracked-events) | $1.20 |


## Managing Web Analytics events

The **Events** chart shows the number of page views and custom events that were tracked across all of your projects. You can filter the data by **Count** or **Projects**.

Hobby teams include 50,000 events per month. Vercel bills Pro, Pro with Web Analytics Plus, and Enterprise teams based on collected event usage. You can see the total number of events used by your team by selecting **Count** in the chart.

> **💡 Note:** Speed Insights and Web Analytics require scripts to do collection of [data
> points](/docs/speed-insights/metrics#understanding-data-points). These scripts
> are loaded on the client-side and therefore may incur additional usage and
> costs for [Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) and [Edge
> Requests](/docs/manage-cdn-usage#edge-requests).

### Optimizing Web Analytics events

- Your usage is based on the total number of events used across all projects within your team. You can see this number by selecting **Projects** in the chart, which will allow you to figure out which projects are using the most events and can therefore be optimized
- Reduce the amount of custom events they send. Users can find the most sent events in the [events panel](/docs/analytics#panels) in Web Analytics
- Use [beforeSend](/docs/analytics/package#beforesend) to exclude page views and events that might not be relevant

## Managing Speed Insights events

Vercel charges an initial set amount for each Pro project where you enable Speed Insights. Hobby teams include 10,000 events per month. Vercel bills Pro, Pro with Web Analytics Plus, and Enterprise teams based on collected event usage.

Events are single units of information that represent a measurement of a specific Web Vital metric during a user's visit to your website. Vercel collects events on hard navigations.

> **💡 Note:** Speed Insights and Web Analytics require scripts to do collection of [data
> points](/docs/speed-insights/metrics#understanding-data-points). These scripts
> are loaded on the client-side and therefore may incur additional usage and
> costs for [Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) and [Edge
> Requests](/docs/manage-cdn-usage#edge-requests).

### Optimizing Speed Insights events

- To reduce cost, change the sample rate at a project level by using the `@vercel/speed-insights` package as explained in [Sample rate](/docs/speed-insights/package#samplerate). You can also set a cost limit under your team's Billing settings page to stop event collection for the rest of the billing period after your team reaches the limit
- Use [beforeSend](/docs/speed-insights/package#beforesend) to exclude page views and events that might not be relevant
- [Disable Speed Insights](/docs/speed-insights/using-speed-insights#disabling-speed-insights) for projects that no longer need it. This stops Vercel from collecting events for a project

## Managing Monitoring events

> **💡 Note:** Monitoring is now part of Observability, and Observability Plus includes it
> at no additional cost. If you are currently paying for Monitoring,
> [migrate](/docs/observability#enabling-observability-plus) to Observability
> Plus to get access to additional product features with a longer retention
> period with no base fee.

Vercel creates an event each time a request is made to your website. These events include unique parameters such as execution time and bandwidth used. For a complete list, see the [visualize](/docs/query/monitoring/monitoring-reference#visualize) and [group by](/docs/query/monitoring/monitoring-reference#group-by) docs.

Monitoring is deprecated and no longer exposed as a current top-level pricing resource. If you are still using Monitoring, migrate to Observability Plus for usage-based pricing and current observability features.

You can also view the number of events used by each project in your team by selecting **Projects** in the chart. This will show you the number of events used by each project in your team, allowing you to optimize your usage.

### Optimizing Monitoring events

Because events are based on the amount of requests to your site, there is no way to optimize the number of events used.

## Optimizing drains usage

You can optimize your log drains usage by:

- [**Filtering by environment**](/docs/drains/reference/logs#log-environments): You can filter logs by environment to reduce the number of logs sent to your log drain. By filtering by only your [production environment](/docs/deployments/environments#production-environment) you can avoid the costs of sending logs from your [preview deployments](/docs/deployments/environments#preview-environment-pre-production)
- [**Sampling rate**](/docs/drains/reference/logs#sampling-rate): You can reduce the number of logs sent to your log drain by using a sampling rate. This will send only a percentage of logs to your log drain, reducing the number of logs sent and the cost of your log drain

## Managing Observability events

Vercel creates one or many events each time a request is made to your website. To learn more, see [Events](/docs/observability#tracked-events).

You pay for Observability Plus based on the **total** number of events generated by projects where Observability Plus is enabled.

The Observability chart allows you to view by the total **Count**, **Event Type**, or **Projects** over the selected time period.

### Optimizing Observability events

To reduce Observability Plus costs, you can [exclude specific projects](/docs/observability/observability-plus#managing-projects) that don't need advanced observability. Excluded projects revert to the free tier and stop generating metered Observability Plus events.

You can manage project inclusions from your team's **Billing** settings or from a project's **Observability** dashboard. See [Managing projects](/docs/observability/observability-plus#managing-projects) for details.


---

[View full sitemap](/docs/sitemap)
