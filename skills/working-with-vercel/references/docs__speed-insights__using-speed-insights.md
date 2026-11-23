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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/speed-insights/using-speed-insights.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "b66f3f3a087feb3309564cfb004da818f6d3d9bf29d9f6d513cfebacb6a487a6"
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

- [Speed Insights now has a free tier](https://vercel.com/changelog/speed-insights-free-tier)
- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [Improved Speed Insights experience](https://vercel.com/changelog/improved-speed-insights-experience)
- [Getting started with Speed Insights](https://vercel.com/docs/speed-insights/quickstart) — Vercel Speed Insights provides you detailed insights into your website's performance. This quickstart guide will help yo
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Speed Insights Configuration with @vercel/speed-insights](https://vercel.com/docs/speed-insights/package) — Learn how to configure your application to capture and send web performance metrics to Vercel using the @vercel/speed-in
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.

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
4. The information is organized by performance score and sorted by data points. Scroll the list to view more paths or routes, or click the **View all** button to view and filter all data.
5. You can also edit the [timeframe](/docs/analytics/using-web-analytics#specifying-a-timeframe) and [environment](/docs/analytics/using-web-analytics#viewing-environment-specific-data) you want to view data for.

![Speed Insights URL view for routes and paths of your project.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/speed-insights/v2/kanban-light.png)

### Breakdown by HTML elements

> **💡 Note:** This view requires [Speed Insights Plus](/docs/speed-insights/limits-and-pricing).

To view a detailed breakdown of the performance of individual HTML elements on your site:

1. Select a project from your [dashboard](/dashboard) and open [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.
2. From the left-hand panel, select the [metric](/docs/speed-insights/metrics) you want to view data for. HTML element attribution is only available for the following metrics:
   - **Interaction to Next Paint** (INP)
   - **Cumulative Layout Shift** (CLS)
   - **Largest Contentful Paint** (LCP)
3. From the URL view, open **Selectors** in the sidebar.
4. The information is organized by performance score and sorted by data points. Scroll the list to view more elements, or click the **View all** button to view and filter all data.
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

If a project is on [Speed Insights Plus](/docs/speed-insights/limits-and-pricing) you can downgrade it to the Speed Insights free tier:

1. Select a project from your [dashboard](/dashboard).
2. Open [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.
3. Click on the ellipsis on the top-right of the Speed Insights page and select **Turn off Speed Insights Plus**.

When you downgrade, you retain access to Speed Insights Plus reports until the end of your billing cycle.
The switch to your team's free [allocation](/docs/speed-insights/limits-and-pricing#limitations) can take up to 10 minutes. During this time, new events may still count toward Plus usage.

## Stopping data collection

After downgrading, data collection continues under the Speed Insights free tier, subject to your team's [allocation limits](/docs/speed-insights/limits-and-pricing#limitations). To stop automatic collection from new visits to the updated deployment, remove the Speed Insights component or script from your application and redeploy.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
