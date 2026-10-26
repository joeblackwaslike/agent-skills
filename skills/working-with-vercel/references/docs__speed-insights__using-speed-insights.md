---
title: Using Speed Insights
product: vercel
url: /docs/speed-insights/using-speed-insights
canonical_url: "https://vercel.com/docs/speed-insights/using-speed-insights"
last_updated: 2026-09-01
type: how-to
prerequisites:
  - /docs/speed-insights
related:
  - /docs/speed-insights/accessing-metrics-with-vercel-cli
  - /docs/analytics/using-web-analytics
  - /docs/analytics/filtering
  - /docs/speed-insights/limits-and-pricing
  - /docs/speed-insights/metrics
summary: "Learn how to use Speed Insights to analyze your application's performance data."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/using-speed-insights.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "225c4c2feb78ba772e5405585dd2e1b62a71399a5dbea91a66439944a62cad9b"
---

# Using Speed Insights

> **💡 Note:** You can also [access Speed Insights metrics with Vercel CLI](/docs/speed-insights/accessing-metrics-with-vercel-cli)
> to query production metrics, filter Core Web Vitals, and compare projects from
> your terminal.

## Accessing Speed Insights

To access Speed Insights:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [Speed Insights now has a free tier](https://vercel.com/changelog/speed-insights-free-tier)
- [Speed Insights usage can now be viewed by Project](https://vercel.com/changelog/speed-insights-usage-can-now-be-viewed-by-project)
- [Getting started with Speed Insights](https://vercel.com/docs/speed-insights/quickstart) — Vercel Speed Insights provides you detailed insights into your website's performance. This quickstart guide will help yo
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Speed Insights Configuration with @vercel/speed-insights](https://vercel.com/docs/speed-insights/package) — Learn how to configure your application to capture and send web performance metrics to Vercel using the @vercel/speed-in
- [Manage and optimize usage for Observability](https://vercel.com/docs/manage-and-optimize-observability) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/speed-insights/using-speed-insights.graph.md](/docs/speed-insights/using-speed-insights.graph.md)
<!-- /docsgraph:related -->

1. Select a project from your [dashboard](/dashboard) and open [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.
2. Select the [timeframe](/docs/analytics/using-web-analytics#specifying-a-timeframe) and [environment](/docs/analytics/using-web-analytics#viewing-environment-specific-data) you want to view data for.
3. Use the panels to [filter](/docs/analytics/filtering) the page or event data you want to view.

## Breaking down data in Speed Insights

Speed Insights offers a variety of views to help you analyze your application's performance data. This allows you to identify areas that need improvement and make informed decisions about how to optimize your site.

> **💡 Note:** Poor entries, country breakdowns, and element selectors are only available on [Speed Insights
> Plus](/docs/speed-insights/limits-and-pricing).

### Breakdown by route or path

To view metrics for a specific route or path:

1. Select a project from your [dashboard](/dashboard) and open [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.
2. From the left-hand panel, select the [metric](/docs/speed-insights/metrics) you want to view data for.
3. From the URL view, select the corresponding tab to view by the **Route** (the actual pages you built), or by **Path** (the URLs requested by the visitor).
4. The information is organized by performance score and sorted by data points. Scroll the list to view more all paths or routes, or click the **View all** button to view and filter all data.
5. You can also edit the [timeframe](/docs/analytics/using-web-analytics#specifying-a-timeframe) and [environment](/docs/analytics/using-web-analytics#viewing-environment-specific-data) you want to view data for.

![Speed Insights URL view for routes and paths of your project.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/speed-insights/v2/kanban-light.png)

### Breakdown by HTML elements

> **💡 Note:** This view requires [Speed Insights Plus](/docs/speed-insights/limits-and-pricing).

To view a detailed breakdown of the performance of individual HTML elements on your site:

1. Select a project from your [dashboard](/dashboard) and open [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.
2. From the left-hand panel, select the [metric](/docs/speed-insights/metrics) you want to view data for. HTML element attribution is only available for the following metrics:
   - **Interaction to Next Paint** (INP)
   - **First Input Delay** (FID)
   - **Cumulative Layout Shift** (CLS)
   - **Largest Contentful Paint** (LCP)
3. From the URL view, open **Selectors** in the sidebar.
4. The information is organized by performance score and sorted by data points. Scroll the list to view more all elements, or click the **View all** button to view and filter all data.
5. You can also edit the [timeframe](/docs/analytics/using-web-analytics#specifying-a-timeframe) and [environment](/docs/analytics/using-web-analytics#viewing-environment-specific-data) you want to view data for.

This view is particularly useful for identifying specific elements that may be causing performance issues.

### Breakdown by country

> **💡 Note:** This view requires [Speed Insights Plus](/docs/speed-insights/limits-and-pricing).

This view is helpful for identifying regions where your application may be underperforming.

To view a geographical breakdown of your application's performance:

1. Select a project from your [dashboard](/dashboard) and open [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.
2. From the left-hand panel, select the [metric](/docs/speed-insights/metrics) you want to view data for.
3. Scroll down to the **Countries** section.
4. The map is colored based on the experience metric per country. Click on a country to view more detailed data.

![Geographic map of the P75 score where the color intensity indicates the relative amount of data points per country](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/speed-insights/v2/country-map-light.png)

## Downgrading from Speed Insights Plus

If a project is on [Speed Insights Plus](/docs/speed-insights/limits-and-pricing) you can downgrade it to Speed Insights:

1. Select a project from your [dashboard](/dashboard).
2. Open [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.
3. Click on the ellipsis on the top-right of the Speed Insights page and select **Turn off Speed Insights Plus**.

When you downgrade in the middle of your billing cycle, Speed Insights Plus stays available until the end of the cycle, and Vercel continues to show the events you already collected.
After that, events will count toward your team's [allocation](/docs/speed-insights/limits-and-pricing#limitations).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
