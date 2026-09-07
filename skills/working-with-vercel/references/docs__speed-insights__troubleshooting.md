---
title: Troubleshooting Vercel Speed Insights
product: vercel
url: /docs/speed-insights/troubleshooting
canonical_url: "https://vercel.com/docs/speed-insights/troubleshooting"
last_updated: 2026-03-18
type: reference
prerequisites:
  - /docs/speed-insights
related:
  []
summary: Learn about common issues and how to troubleshoot Vercel Speed Insights.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/troubleshooting.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "9ec9b82ca032179f93cc79148ff3f4ef2b879c6416aab074327f290292568241"
---

# Troubleshooting Vercel Speed Insights

> **🔒 Permissions Required**: Speed Insights

## No data visible in Speed Insights dashboard

If you are experiencing a situation where data is not visible in the Speed Insights dashboard, it could be due to a couple of reasons.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query Speed Insights from the Vercel CLI](https://vercel.com/changelog/query-speed-insights-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=related)
- [Investigate latency issues and slowness on Vercel](https://vercel.com/kb/guide/investigate-latency-issues-and-slowness?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how to use Observability to investigate latency issues and slowness on Vercel.
- [Vercel Speed Insights Privacy & Compliance](https://vercel.com/docs/speed-insights/privacy-policy?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how Vercel follows the latest privacy and data compliance standards with its Speed Insights feature.
- [Vercel Web Analytics Troubleshooting](https://vercel.com/docs/analytics/troubleshooting?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot common issues with Vercel Web Analytics.
- [Speed Insights Configuration with @vercel/speed-insights](https://vercel.com/docs/speed-insights/package?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how to configure your application to capture and send web performance metrics to Vercel using the @vercel/speed-in
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how to use Speed Insights to analyze your application's performance data.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.

Full cross-link map for this page: [/docs/speed-insights/troubleshooting.graph.md](/docs/speed-insights/troubleshooting.graph.md?from=related&source_path=%2Fdocs%2Fspeed-insights%2Ftroubleshooting&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**How to fix**:

1. Double check if you followed the quickstart instructions correctly
2. Check if your adblocker is interfering with the Speed Insights script. If so, consider disabling it

## Requests are not getting called

If `/<unique-path>/script.js` is correctly loading but not sending any data (e.g. no `vitals` request), ensure that you're checking for the request after navigating to a different page, or switching tabs. Speed Insights data is only sent on window blur or unload events.

## Speed Insights is not working with proxy

We do not recommend placing a reverse proxy in front of Vercel, as it may interfere with the proper functioning of Speed Insights.

**How to fix**:

1. Check your proxy configuration to make sure that all desired pages are correctly proxied to the deployment
2. Additionally, forward all requests to `/<unique-path>/*` to the deployments so Speed Insights works through the proxy


---

[View full sitemap](/docs/sitemap)
