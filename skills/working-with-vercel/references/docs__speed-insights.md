---
title: Speed Insights Overview
product: vercel
url: /docs/speed-insights
canonical_url: "https://vercel.com/docs/speed-insights"
last_updated: 2026-09-01
type: conceptual
prerequisites:
  []
related:
  - /docs/speed-insights/quickstart
  - /docs/analytics
  - /docs/speed-insights/metrics
  - /docs/drains
  - /docs/speed-insights/limits-and-pricing
summary: "This page lists out and explains all the performance metrics provided by Vercel's Speed Insights feature."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "7dcdd40fc1e8e11f461ef4ad8870764c06127f0db27089b391550d72a163a787"
---

# Speed Insights Overview

> Speed Insights is available on all plans

- To set up Speed Insights for your project, see the [Quickstart](/docs/speed-insights/quickstart).
- To understand who is visiting your site, use [Web Analytics](/docs/analytics).

Vercel **Speed Insights** provides you with a detailed view of your website's performance [metrics](/docs/speed-insights/metrics), based on [Core Web Vitals](/docs/speed-insights/metrics#core-web-vitals-explained), enabling you to make data-driven decisions for optimizing your site. For granular visitor data, use [Web Analytics](/docs/analytics).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Automatically detect and replay layout shifts from the Vercel Toolbar](https://vercel.com/changelog/automatically-detect-and-replay-layout-shifts)
- [Export traces, web analytics events, and speed insights datapoints to any destination](https://vercel.com/changelog/export-more-data-with-vercel-drains)
- [Filter by custom date ranges in Speed Insights](https://vercel.com/changelog/filter-by-custom-date-ranges-in-speed-insights)
- [Improved data collection for Web Analytics and Speed Insights with resilient intake](https://vercel.com/changelog/improved-data-collection-for-web-analytics-and-speed-insights-with-resilient)
- [Improved Speed Insights experience](https://vercel.com/changelog/improved-speed-insights-experience)
- [Astro on Vercel vs Webflow Cloud](https://vercel.com/kb/guide/astro-on-vercel-vs-webflow-cloud) — Compare running Astro on Vercel Functions with Fluid compute against Webflow Cloud on Cloudflare Workers. Learn how Astr
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation) — A practical checklist for keeping your storefront fast and your checkout path healthy through Black Friday and Cyber Mon
- [Improve Cumulative Layout Shift \\(CLS\\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [How do I reduce my build time with Next.js on Vercel?](https://vercel.com/kb/guide/how-do-i-reduce-my-build-time-with-next-js-on-vercel) — Reduce Next.js build times on Vercel by pre-rendering fewer pages at build time, deferring generation with ISR and image
- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [First Input Delay (FID) vs. Interaction to Next Paint (INP)](https://vercel.com/blog/first-input-delay-vs-interaction-to-next-paint)
- [How Core Web Vitals affect SEO](https://vercel.com/blog/how-core-web-vitals-affect-seo)

Full cross-link map for this page: [/docs/speed-insights.graph.md](/docs/speed-insights.graph.md)
<!-- /docsgraph:related -->

The **Speed Insights** dashboard offers in-depth information about scores and individual metrics without the need for code modifications or leaving the Vercel dashboard.

Speed Insights is available on every plan for free and includes the [Real Experience Score (RES)](/docs/speed-insights/metrics#real-experience-score-res). Upgrade a project to **Speed Insights Plus** to unlock all Core Web Vitals, breakdowns, and [Drains](/docs/drains).
See [limits and pricing](/docs/speed-insights/limits-and-pricing) for more information.

To learn more, see the [dashboard view](/docs/speed-insights#dashboard-view) and [metrics](/docs/speed-insights/metrics), or follow the [quickstart](/docs/speed-insights/quickstart).

> **💡 Note:** Vercel tracks Speed Insights events on all deployed
> [preview](/docs/deployments/environments#preview-environment-pre-production)
> and [production](/docs/deployments/environments#production-environment)
> environments.

## Dashboard view

![A snapshot of the Speed Insights tab from the project view.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/speed-insights/v2/res-chart-light.png)

You can access the dashboard by selecting your project in the Vercel [dashboard](/dashboard), and clicking [**Speed Insights**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fspeed-insights\&title=Go+to+Speed+Insights) in the sidebar.

The Speed Insights dashboard displays data that you can sort and inspect based on a variety of parameters:

- **Device type**: Toggle between mobile and desktop.
- **Environment**: Filter by preview, production, or all environments.
- **Time range**: Select the timeframe dropdown in the top-right of the page to choose a predefined timeframe. Alternatively, select the Calendar icon to specify a custom timeframe. The [available durations vary](/docs/speed-insights/limits-and-pricing), depending on the account type and Speed Insights version.
- [**Performance metric**](/docs/speed-insights/metrics): Switch between parameters that include Real Experience Score (RES), First Contentful Paint (FCP) and Largest Contentful Paint (LCP), and use the views to view more information. Individual Core Web Vitals require [Speed Insights Plus](/docs/speed-insights/limits-and-pricing).
- **Performance metric views**: When you select a performance metric, the dashboard displays three views:
  - **Time-based line graph** that, by default, shows the P75 [percentile of data](/docs/speed-insights/metrics#how-the-percentages-are-calculated) for the selected metric [data points](/docs/speed-insights/metrics#understanding-data-points) and time range. You can include P90, P95 and P99 in this view.
  - **Kanban board** that shows which routes, paths, or HTML elements need improvement (URLs that make up less than 0.5% of visits are not shown by default). Poor rows and element selectors require Speed Insights Plus.
  - **Geographical map** showing the experience metric by country. Requires Speed Insights Plus:

    ![Geographic map of the P75 score where the color intensity indicates the relative amount of data points per country](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/speed-insights/v2/country-map-light.png)

The data in the Kanban and map views is selectable so that you can filter by
country, route, path and HTML element. The red, orange and green colors in the
map view indicate the P75 score.

## More resources

- [How Core Web Vitals affect SEO: Understand your application's Google page experience ranking and Lighthouse scores](https://www.youtube.com/watch?v=qIyEwOEKnE0)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
