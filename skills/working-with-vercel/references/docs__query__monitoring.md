---
title: Monitoring
product: vercel
url: /docs/query/monitoring
canonical_url: "https://vercel.com/docs/query/monitoring"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/query
related:
  - /docs/query/monitoring/monitoring-reference
  - /docs/query/monitoring/quickstart
  - /docs/notebooks
  - /docs/plans/pro-plan
  - /docs/observability/observability-plus
summary: Query and visualize your Vercel usage, traffic, and more with Monitoring.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query/monitoring.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "7c5d9375798eaaf74952f7eef4f044910970fb953642876dfaa55074da09a8ae"
---

# Monitoring

Monitoring is now


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Observability Plus replacing legacy Monitoring](https://vercel.com/changelog/observability-plus-replacing-legacy-monitoring)
- [Introducing Vercel Monitoring](https://vercel.com/blog/introducing-monitoring)
- [Monitoring is now available to view traffic and performance data for improved observability ](https://vercel.com/changelog/monitoring-is-now-available-to-view-traffic-and-performance-data-for)
- [Monitoring is in public beta for Enterprise Teams](https://vercel.com/changelog/monitoring-is-in-public-beta-for-enterprise-teams)
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Manage and optimize usage for Observability](https://vercel.com/docs/manage-and-optimize-observability) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.

Full cross-link map for this page: [/docs/query/monitoring.graph.md](/docs/query/monitoring.graph.md)
<!-- /docsgraph:related -->

deprecated

. It is no longer available for Pro users or Enterprise customers who subscribed to Observability Plus after June 2025.

Observability Plus

includes

Observability Query

for monitoring your project.

**Monitoring** allows you to visualize and quantify the performance and traffic of your projects on Vercel. You can use [example queries](/docs/query/monitoring/monitoring-reference#example-queries) or create [custom queries](/docs/query/monitoring/quickstart#create-a-new-query) to debug and optimize bandwidth, errors, performance, and bot traffic issues in a production or preview deployment.

> **Availability**: Monitoring is available on Enterprise plans

## Monitoring chart

Charts allow you to explore your query results in detail. Use filters to adjust the date, data granularity, and chart type (line or bar).

Hover and move your mouse across the chart to view your data at a specific point in time. For example, if the data granularity is set to **1 hour**, each point in time will provide a one-hour summary.

## Example queries

To get started with the most common scenarios, use our **Example Queries**. You cannot edit or add new example queries. For a list of the available options, view our [example queries docs](/docs/query/monitoring/monitoring-reference#example-queries).

## Save new queries

You can no longer save new Monitoring queries as the feature has now been sunset.

Instead, use observability queries, which can be saved into [Notebooks](/docs/notebooks).

### Manage saved queries

You can manage your saved personal and team queries from the query console. Select a query from the left navigation bar and click on the vertical ellipsis (⋮) in the upper right-hand corner. You can choose to **Duplicate**, **Rename**, or **Delete** the selected query from the dropdown menu.

Duplicating a query creates a copy of the query in the same folder. You cannot copy queries to another folder. To rename a saved query, use the ellipses (⋮) drop-down menu or directly click its title to edit.

Deleting a saved personal or team query is permanent and irreversible. To delete a saved query, click the **Delete** button in the confirmation modal.

## Error messages

You may encounter errors such as **invalid queries** when using Monitoring. For example, defining an incorrect location parameter generates an invalid query. In such cases, no data appears.

## Enable Monitoring

You can no longer enable **Monitoring** on [Pro](/docs/plans/pro-plan) plans as the feature has now been sunset.

Get the most comprehensive suite of tools, including queries, by enabling [Observability Plus](/docs/observability/observability-plus).

## Disable Monitoring

1. Go to your team **Settings** > **Billing**
2. Scroll to the **Observability Plus** section
3. Set the toggle to the disabled state

## Manage IP Address visibility for Monitoring

> **Availability**: Managing IP Address visibility is available on Enterprise and Pro plans

Vercel creates events each time a request is made to your website. These events include unique parameters such as execution time and bandwidth used.

Certain events such as `public_ip` may be considered personal information under certain data protection laws. To hide IP addresses from your Monitoring queries:

1. Go to the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and ensure your team is selected in the team switcher.
2. Open **Settings** in the sidebar and navigate to [**Security & Privacy**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Go+to+Security).
3. Under **IP Address Visibility**, toggle the switch next to off so the text reads **IP addresses are hidden in your Monitoring queries.**.

> **💡 Note:** For business purposes, such as DDoS mitigation, Vercel will still collect IP
> addresses.

For a complete list of fields, see the [visualize clause](/docs/query/monitoring/monitoring-reference#visualize) docs.

## Monitoring sunset

Vercel sunset Monitoring for Pro plans at the end of the November 2025 billing cycle. Pro users no longer see the Monitoring tab. Enterprise users who already had Monitoring access keep the deprecated version of Monitoring.
If you want to continue using the full Monitoring capabilities or purchase a product similar to Monitoring, consider moving to [Query](/docs/query).

- Enable [Observability Plus](/docs/observability/observability-plus) to continue using query features.
- Save queries in **Observability** [Notebooks](/docs/query#save-query).

## More resources

For more information on what to do next, we recommend the following articles:

- [Quickstart](/docs/query/monitoring/quickstart): Learn how to create and run a query to understand the top bandwidth images on
  your website
- [Reference](/docs/query/monitoring/monitoring-reference): Learn about the clauses, fields, and variables used to create a Monitoring
- [Limits and Pricing](/docs/query/monitoring/limits-and-pricing): Learn about our limits and pricing when using Monitoring. Different limitations are applied depending on your plan.


---

[View full sitemap](/docs/sitemap)
