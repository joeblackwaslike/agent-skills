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
  - /docs/security/reverse-proxy
summary: Learn about common issues and how to troubleshoot Vercel Speed Insights.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/troubleshooting.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "8d2c4c04eb09b4b53287a70c55271a747efc90cd4e5e1624c12b3a99a2d41a67"
---

# Troubleshooting Vercel Speed Insights

> Speed Insights is available on all plans

## No data visible in Speed Insights dashboard

If you are experiencing a situation where data is not visible in the Speed Insights dashboard, it could be due to a couple of reasons.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query Speed Insights from the Vercel CLI](https://vercel.com/changelog/query-speed-insights-from-the-vercel-cli)
- [Vercel Speed Insights Privacy & Compliance](https://vercel.com/docs/speed-insights/privacy-policy) — Learn how Vercel follows the latest privacy and data compliance standards with its Speed Insights feature.
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights) — Learn how to use Speed Insights to analyze your application's performance data.
- [Vercel Web Analytics Troubleshooting](https://vercel.com/docs/analytics/troubleshooting) — Learn how to troubleshoot common issues with Vercel Web Analytics.
- [Getting started with Speed Insights](https://vercel.com/docs/speed-insights/quickstart) — Vercel Speed Insights provides you detailed insights into your website's performance. This quickstart guide will help yo
- [Speed Insights Configuration with @vercel/speed-insights](https://vercel.com/docs/speed-insights/package) — Learn how to configure your application to capture and send web performance metrics to Vercel using the @vercel/speed-in

Full cross-link map for this page: [/docs/speed-insights/troubleshooting.graph.md](/docs/speed-insights/troubleshooting.graph.md)
<!-- /docsgraph:related -->

**How to fix**:

1. Double check if you followed the quickstart instructions correctly
2. Check if your adblocker is interfering with the Speed Insights script. If so, consider disabling it

## Requests are not getting called

If `/<unique-path>/script.js` is correctly loading but not sending any data (e.g. no `vitals` request), ensure that you're checking for the request after navigating to a different page, or switching tabs. Speed Insights data is only sent on window blur or unload events.

## Speed Insights behind a reverse proxy

We do not recommend placing a reverse proxy in front of Vercel. A proxy can affect IP-based data, including the **country** breakdown and geographic map. It can also prevent Speed Insights from receiving events if it does not forward the requests.

Point your domain directly to Vercel. If you must use a proxy, review the [reverse proxy guidance](/docs/security/reverse-proxy) for supported options and requirements. Make sure your proxy forwards all pages you want to track, plus requests to `/_vercel/speed-insights/*` and `/<unique-path>/*`, to your Vercel deployment.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
