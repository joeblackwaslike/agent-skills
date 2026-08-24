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
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "39c97ba6e0e79f8ff0d97d9d41a96cdf7aa8fe0f23f1d444d7ef80ff5d90909e"
---

# Troubleshooting Vercel Speed Insights

> **🔒 Permissions Required**: Speed Insights


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Investigate latency issues and slowness on Vercel](https://vercel.com/kb/guide/investigate-latency-issues-and-slowness?from=related) — Learn how to use Observability to investigate latency issues and slowness on Vercel.
- [Privacy](https://vercel.com/docs/speed-insights/privacy-policy?from=related) — Learn how Vercel follows the latest privacy and data compliance standards with its Speed Insights feature.
- [Troubleshooting](https://vercel.com/docs/analytics/troubleshooting?from=related) — Learn how to troubleshoot common issues with Vercel Web Analytics.
- [Getting Started](https://vercel.com/docs/speed-insights/quickstart?from=related) — Vercel Speed Insights provides you detailed insights into your website's performance. This quickstart guide will help yo
- [@vercel/speed-insights](https://vercel.com/docs/speed-insights/package?from=related) — Learn how to configure your application to capture and send web performance metrics to Vercel using the @vercel/speed-in
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.

Full cross-link map for this page: [/docs/speed-insights/troubleshooting.graph.md](/docs/speed-insights/troubleshooting.graph.md)
<!-- /docsgraph:related -->

## No data visible in Speed Insights dashboard

If you are experiencing a situation where data is not visible in the Speed Insights dashboard, it could be due to a couple of reasons.

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
