---
title: Vercel Speed Insights Privacy & Compliance
product: vercel
url: /docs/speed-insights/privacy-policy
canonical_url: "https://vercel.com/docs/speed-insights/privacy-policy"
last_updated: 2026-03-18
type: reference
prerequisites:
  - /docs/speed-insights
related:
  - /docs/speed-insights/metrics
  - /docs/speed-insights/migrating-from-legacy
  - /docs/speed-insights/package
summary: Learn how Vercel follows the latest privacy and data compliance standards with its Speed Insights feature.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/privacy-policy.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "117e4a77462a14f976025c7732dd99a9127cb59b6b006b49265be921f2a7c4f7"
---

# Vercel Speed Insights Privacy & Compliance

> **🔒 Permissions Required**: Speed Insights


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Privacy](https://vercel.com/docs/analytics/privacy-policy?from=related) — Learn how Vercel supports privacy and data compliance standards with Vercel Web Analytics.
- [Troubleshooting](https://vercel.com/docs/speed-insights/troubleshooting?from=related) — Learn about common issues and how to troubleshoot Vercel Speed Insights.
- [Getting Started](https://vercel.com/docs/speed-insights/quickstart?from=related) — Vercel Speed Insights provides you detailed insights into your website's performance. This quickstart guide will help yo
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights?from=related) — Learn how to use Speed Insights to analyze your application's performance data.

Full cross-link map for this page: [/docs/speed-insights/privacy-policy.graph.md](/docs/speed-insights/privacy-policy.graph.md)
<!-- /docsgraph:related -->

To ensure that the Speed Insights feature can be used despite many different regulatory limitations around the world, we've designed it in such a way that it provides you with information without being tied to, or associated with, any individual visitor or IP address.

## Data collected

The recording of data points is anonymous and the Speed Insights feature does not collect or store information that would enable us to reconstruct a browsing session across pages or identify a user.

The following information is stored with every data point:

| Collected Value              | Example Value                |
| ---------------------------- | ---------------------------- |
| Route                        | /blog/\[slug]                 |
| URL                          | /blog/nextjs-10              |
| Network Speed                | 4g (or slow-2g, 2g, 3g)      |
| Browser                      | Chrome 86 (Blink)            |
| Device Type                  | Mobile (or Desktop/Tablet)   |
| Device OS                    | Android 10                   |
| Country (ISO 3166-1 alpha-2) | US                           |
| Web Vital                    | FCP 1.0s                     |
| Web Vital Attribution        | html>body img.header         |
| SDK Information              | @vercel/speed-insights 0.1.0 |
| Server-Received Event Time   | 2023-10-29 09:06:30          |

See our [Privacy Notice](/legal/privacy-policy) for more information, including how Vercel Speed Insights complies with the GDPR.

## How the data points are tracked

Once you've followed the dashboard's instructions for enabling Speed Insights and installed the `@vercel/speed-insights` package, it will automatically start tracking data points for your project.

The package injects a script that retrieves the visitor's [Web Vitals](/docs/speed-insights/metrics) by invoking native browser APIs and reporting them to Vercel's servers on every page load.

Learn more about the [first-party intake data ingestion method](/docs/speed-insights/migrating-from-legacy#first-party-intake), which enables a faster and more reliable experience.

## Resilient Intake

In version 2, Vercel generates a random seed at build time and passes it through dynamic configuration. `@vercel/speed-insights` uses this seed to build the injected script URL and intake URLs.

The Resilient Intake does not depend on a single predictable URL path for data collection, enhancing reliability and increasing data collection efficiency.

> **💡 Note:** Resilient Intake requires version 2 of the `@vercel/speed-insights` [package](/docs/speed-insights/package#whats-new-in-version-2).


---

[View full sitemap](/docs/sitemap)
