---
title: Speed Insights Overview
product: vercel
url: /docs/speed-insights
canonical_url: "https://vercel.com/docs/speed-insights"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/speed-insights/quickstart
  - /docs/analytics
  - /docs/speed-insights/metrics
  - /docs/deployments/environments
  - /docs/speed-insights/limits-and-pricing
summary: "This page lists out and explains all the performance metrics provided by Vercel's Speed Insights feature."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b58efef6ff28c1ca8df342d889456a3be2192488eb6543b10d69a74372d4ae6a"
---

# Speed Insights Overview

> **🔒 Permissions Required**: Speed Insights


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Astro on Vercel vs Webflow Cloud](https://vercel.com/kb/guide/astro-on-vercel-vs-webflow-cloud?from=related) — Compare running Astro on Vercel Functions with Fluid compute against Webflow Cloud on Cloudflare Workers. Learn how Astr
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation?from=related) — A practical checklist for keeping your storefront fast and your checkout path healthy through Black Friday and Cyber Mon
- [Improve Cumulative Layout Shift \(CLS\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel?from=related) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [Deploy a headless BigCommerce storefront with Vercel](https://vercel.com/kb/guide/deploy-headless-bigcommerce-storefront-with-vercel?from=related) — Deploy a headless BigCommerce storefront using Catalyst and Next.js on Vercel
- [First Input Delay \(FID\) vs. Interaction to Next Paint \(INP\)](https://vercel.com/kb/guide/first-input-delay-vs-interaction-to-next-paint?from=related) — Learn about the differences between FID and INP and how to optimize your website's INP score.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics?from=related) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [Vercel Agent](https://vercel.com/docs/agent?from=related) — Use Vercel Agent to chat with your dashboard, investigate production issues, review code, and approve actions
- [Checks](https://vercel.com/docs/checks?from=related) — Vercel automatically keeps an eye on various aspects of your web application using the Checks API. Learn how to use Chec

Full cross-link map for this page: [/docs/speed-insights.graph.md](/docs/speed-insights.graph.md)
<!-- /docsgraph:related -->

- To set up Speed Insights for your project, see the [Quickstart](/docs/speed-insights/quickstart).
- To understand who is visiting your site, use [Web Analytics](/docs/analytics).

Vercel **Speed Insights** provides you with a detailed view of your website's performance [metrics](/docs/speed-insights/metrics), based on [Core Web Vitals](/docs/speed-insights/metrics#core-web-vitals-explained), enabling you to make data-driven decisions for optimizing your site. For granular visitor data, use [Web Analytics](/docs/analytics).

The **Speed Insights** dashboard offers in-depth information about scores and individual metrics without the need for code modifications or leaving the Vercel dashboard.

To get started, follow the quickstart to [enable Speed Insights](/docs/speed-insights/quickstart) and learn more about the [dashboard view](/docs/speed-insights#dashboard-view) and [metrics](/docs/speed-insights/metrics).

> **💡 Note:** When you enable Speed Insights, Vercel tracks data on all deployed
> environments, including
> [preview](/docs/deployments/environments#preview-environment-pre-production)
> and [production](/docs/deployments/environments#production-environment)
> deployments.

## Dashboard view

![Image](`/docs-assets/static/docs/concepts/speed-insights/v2/res-chart-light.png`)

Once you [enable Speed Insights](/docs/speed-insights/quickstart), you can access the dashboard by selecting your project in the Vercel [dashboard](/dashboard), and clicking [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.

The Speed Insights dashboard displays data that you can sort and inspect based on a variety of parameters:

- **Device type**: Toggle between mobile and desktop.
- **Environment**: Filter by preview, production, or all environments.
- **Time range**: Select the timeframe dropdown in the top-right of the page to choose a predefined timeframe. Alternatively, select the Calendar icon to specify a custom timeframe. The [available durations vary](/docs/speed-insights/limits-and-pricing#reporting-window-for-data-points), depending on the account type.
- [**Performance metric**](/docs/speed-insights/metrics): Switch between parameters that include Real Experience Score (RES), First Contentful Paint (FCP) and Largest Contentful Paint (LCP), and use the views to view more information.
- **Performance metric views**: When you select a performance metric, the dashboard displays three views:
  - **Time-based line graph** that, by default, shows the P75 [percentile of data](/docs/speed-insights/metrics#how-the-percentages-are-calculated) for the selected metric [data points](/docs/speed-insights/metrics#understanding-data-points) and time range. You can include P90, P95 and P99 in this view.
  - **Kanban board** that shows which routes, paths, or HTML elements need improvement (URLs that make up less than 0.5% of visits are not shown by default).
  - **Geographical map** showing the experience metric by country:

    ![Image](`/docs-assets/static/docs/concepts/speed-insights/v2/country-map-light.png`)

The data in the Kanban and map views is selectable so that you can filter by
country, route, path and HTML element. The red, orange and green colors in the
map view indicate the P75 score.

## More resources

- [How Core Web Vitals affect SEO: Understand your application's Google page experience ranking and Lighthouse scores](https://www.youtube.com/watch?v=qIyEwOEKnE0)


---

[View full sitemap](/docs/sitemap)
