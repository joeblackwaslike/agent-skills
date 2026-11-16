---
title: Using Web Analytics
product: vercel
url: /docs/analytics/using-web-analytics
canonical_url: "https://vercel.com/docs/analytics/using-web-analytics"
last_updated: 2026-09-16
type: how-to
prerequisites:
  - /docs/analytics
related:
  - /docs/analytics/web-analytics-api
  - /docs/analytics/accessing-metrics-with-vercel-cli
  - /docs/analytics/filtering
  - /docs/analytics/limits-and-pricing
  - /docs/deployments/environments
summary: "Learn how to use Vercel's Web Analytics to understand how visitors are using your website."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/analytics/using-web-analytics.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4feb02a197e7e84c62c405394493a8e85690c0a99406c5b88b7faa4c3e9360cd"
---

# Using Web Analytics

> **💡 Note:** You can also [use the Web Analytics API](/docs/analytics/web-analytics-api)
> to build reports, embed metrics, or combine Web Analytics with your own
> business data. You can also [access Web Analytics metrics with Vercel
> CLI](/docs/analytics/accessing-metrics-with-vercel-cli) to query production
> metrics, filter events, and compare projects from your terminal.

## Accessing Web Analytics

To access Web Analytics:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Web Analytics is now generally available](https://vercel.com/blog/vercel-web-analytics-is-now-generally-available)
- [Web Analytics is now generally available](https://vercel.com/changelog/web-analytics-is-now-generally-available)
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge
- [get_web_analytics](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics) — Use get_web_analytics with Vercel MCP.
- [Vercel Web Analytics Troubleshooting](https://vercel.com/docs/analytics/troubleshooting) — Learn how to troubleshoot common issues with Vercel Web Analytics.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Manage and optimize usage for Observability](https://vercel.com/docs/manage-and-optimize-observability) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize

Full cross-link map for this page: [/docs/analytics/using-web-analytics.graph.md](/docs/analytics/using-web-analytics.graph.md)
<!-- /docsgraph:related -->

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

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/observability/page-panel-light.png)

## Specifying a timeframe

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Select the timeframe dropdown in the top-right of the page to choose a predefined timeframe. Alternatively, select the Calendar icon to specify a custom timeframe.

## Viewing environment-specific data

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Select the environments dropdown in the top-right of the page to choose **Production**, **Preview**, **All Environments**, or any of your project's [custom environments](/docs/deployments/environments#custom-environments), such as `staging`. Production is selected by default.

Custom environments are available on the Pro and Enterprise plans. Data that
arrives without an environment is attributed to **Production**.

## Exporting data as CSV

To export the data from a panel as a CSV file:

1. Open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar from your project's [dashboard](/dashboard)
2. From the bottom of the panel you want to export data from, click the three-dot menu
3. Select the **Export as CSV** button

The export will include up to 250 entries from the panel, not just the top entries.

## Disabling Web Analytics

1. Select a project from your [dashboard](/dashboard) and open [**Analytics**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fanalytics\&title=Go+to+Analytics) in the sidebar.
2. Remove the `@vercel/analytics` package from your codebase and dependencies to prevent your app from sending analytics events to Vercel.
3. Click on the ellipsis on the top-right of the **Web Analytics** page and select **Disable Web Analytics**.

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
