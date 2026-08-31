---
title: Using Web Analytics
product: vercel
url: /docs/analytics/using-web-analytics
canonical_url: "https://vercel.com/docs/analytics/using-web-analytics"
last_updated: 2026-06-26
type: how-to
prerequisites:
  - /docs/analytics
related:
  - /docs/analytics/web-analytics-api
  - /docs/analytics/accessing-metrics-with-vercel-cli
  - /docs/analytics/filtering
  - /docs/analytics/limits-and-pricing
summary: "Learn how to use Vercel's Web Analytics to understand how visitors are using your website."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/using-web-analytics.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "d90ffdf566eb39a910dffb2fddec743af8d8c406523d5c6eac5619659911f8b6"
---

# Using Web Analytics

> **💡 Note:** You can also [use the Web Analytics API](/docs/analytics/web-analytics-api)
> to build reports, embed metrics, or combine Web Analytics with your own
> business data. You can also [access Web Analytics metrics with Vercel
> CLI](/docs/analytics/accessing-metrics-with-vercel-cli) to query production
> metrics, filter events, and compare projects from your terminal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Web Analytics is now generally available](https://vercel.com/blog/vercel-web-analytics-is-now-generally-available?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=related)
- [Query Web Analytics from the Vercel CLI](https://vercel.com/changelog/query-web-analytics-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=related)
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=related) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge
- [Vercel Web Analytics Troubleshooting](https://vercel.com/docs/analytics/troubleshooting?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot common issues with Vercel Web Analytics.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Privacy and Compliance](https://vercel.com/docs/analytics/privacy-policy?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=related) — Learn how Vercel supports privacy and data compliance standards with Vercel Web Analytics.
- [Tools](https://vercel.com/docs/agent-resources/vercel-mcp/tools?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=related) — Available tools in Vercel MCP for searching docs, managing teams, projects, deployments, Web Analytics, runtime logs and

Full cross-link map for this page: [/docs/analytics/using-web-analytics.graph.md](/docs/analytics/using-web-analytics.graph.md?from=related&source_path=%2Fdocs%2Fanalytics%2Fusing-web-analytics&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Accessing Web Analytics

To access Web Analytics:

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Select the [timeframe](/docs/analytics/using-web-analytics#specifying-a-timeframe) and [environment](/docs/analytics/using-web-analytics#viewing-environment-specific-data) you want to view data for.
3. Use the panels to [filter](/docs/analytics/filtering) the page or event data you want to view.

## Viewing data for a specific dimension

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Using panels you can choose whether to view data by:
   - **Pages**: The page url (without query parameters) that the visitor viewed.
   - **Route**: The route, as defined by your application's framework.
   - **Hostname**: Use this to analyze traffic by specific domains. This is beneficial for per-country domains, or for building multi-tenant applications.
   - **Referrers**: The URL of the page that referred the visitor to your site. Referrer data is tracked for custom events and for initial pageviews according to the [Referrer-Policy HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy), and only if the referring link doesn't have the `rel="noreferrer"` attribute. Subsequent soft navigation within your application doesn't include referrer data.
   - **UTM Parameters** (available with [Web Analytics Plus](/docs/analytics/limits-and-pricing) and Enterprise): the forwarded UTM parameters, if any.
   - **Country**: Your visitors' location.
   - **Browsers**: Your visitors' browsers.
   - **Devices**: Distinction between mobile, tablet, and desktop devices.
   - **Operating System**: Your visitors' operating systems.

![Image](https://vercel.com/front/docs/observability/page-panel-light.png)

## Specifying a timeframe

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Select the timeframe dropdown in the top-right of the page to choose a predefined timeframe. Alternatively, select the Calendar icon to specify a custom timeframe.

## Viewing environment-specific data

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Select the environments dropdown in the top-right of the page to choose **Production**, **Preview**, or **All Environments**. Production is selected by default.

## Exporting data as CSV

To export the data from a panel as a CSV file:

1. Open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar from your project's [dashboard](/dashboard)
2. From the bottom of the panel you want to export data from, click the three-dot menu
3. Select the **Export as CSV** button

The export will include up to 250 entries from the panel, not just the top entries.

## Disabling Web Analytics

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Remove the `@vercel/analytics` package from your codebase and dependencies in order to prevent your app from sending analytics events to Vercel.
3. If events have been collected, click on the ellipsis on the top-right of the **Web Analytics** page and select **Disable Web Analytics**. If no data has been collected yet then you will see an **Awaiting Data** popup. From here you can click the **Disable Web Analytics** button:

![Image](`/docs-assets/static/docs/concepts/web-analytics/getting-started-light.png`)


---

[View full sitemap](/docs/sitemap)
