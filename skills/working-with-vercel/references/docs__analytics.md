---
title: Vercel Web Analytics
product: vercel
url: /docs/analytics
canonical_url: "https://vercel.com/docs/analytics"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  []
related:
  - /docs/analytics/quickstart
  - /docs/speed-insights
  - /docs/analytics/custom-events
  - /docs/flags
  - /docs/analytics/using-web-analytics
summary: "With Web Analytics, you can get detailed insights into your website's visitors with new metrics like top pages, top referrers, and demographics."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "5d5a24f14adb3e6c2cbecb4d3a6704748687a0d6b26799295a9aa842c6adcb07"
---

# Vercel Web Analytics

> **🔒 Permissions Required**: Web Analytics

- To set up Web Analytics for your project, see the [Quickstart](/docs/analytics/quickstart).
- To monitor your site's performance, use [Speed Insights](/docs/speed-insights).

![Image](https://vercel.com/front/docs/analytics/visitor-chart-light.png)


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deployments](https://v0.app/docs/deployments?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related) — Preview and publish v0 projects on Vercel, then manage domains, visibility, and production updates.
- [Device type support and improved breakdowns in Web Analytics](https://vercel.com/changelog/device-type-support-and-improved-breakdowns-in-web-analytics?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related)
- [Export traces, web analytics events, and speed insights datapoints to any destination](https://vercel.com/changelog/export-more-data-with-vercel-drains?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related)
- [Filter by custom date ranges in Web Analytics](https://vercel.com/changelog/filter-by-custom-date-ranges-in-web-analytics?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related)
- [Improved data collection for Web Analytics and Speed Insights with resilient intake](https://vercel.com/changelog/improved-data-collection-for-web-analytics-and-speed-insights-with-resilient?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related)
- [Nuxt analytics available on Vercel Analytics](https://vercel.com/changelog/nuxt-analytics-available-on-vercel-analytics?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related)
- [Astro on Vercel vs Webflow Cloud](https://vercel.com/kb/guide/astro-on-vercel-vs-webflow-cloud?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related) — Compare running Astro on Vercel Functions with Fluid compute against Webflow Cloud on Cloudflare Workers. Learn how Astr
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related) — A practical checklist for keeping your storefront fast and your checkout path healthy through Black Friday and Cyber Mon
- [Deploy a headless BigCommerce storefront with Vercel](https://vercel.com/kb/guide/deploy-headless-bigcommerce-storefront-with-vercel?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related) — Deploy a headless BigCommerce storefront using Catalyst and Next.js on Vercel
- [How Splits Work in Vercel Flags](https://vercel.com/kb/guide/how-splits-work-in-vercel-flags?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related) — Use weighted splits in Vercel Flags to deterministically bucket users into variants by percentage for gradual rollouts a
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [How Core Web Vitals Will Impact Google Rankings in 2021](https://vercel.com/blog/core-web-vitals?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/analytics.graph.md](/docs/analytics.graph.md?from=related&source_path=%2Fdocs%2Fanalytics&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Web Analytics provides comprehensive insights into your website's visitors, allowing you to track the top visited pages, referrers for a specific page, and demographics like location, operating systems, and browser information. Vercel's Web Analytics offers:

- **Privacy**: Web Analytics only stores anonymized data and [does not use cookies](#how-visitors-are-determined), providing data for you while respecting your visitors' privacy and web experience.
- **Integrated Infrastructure**: Web Analytics is built into the Vercel platform and accessible from your project's dashboard so there's no need for third-party services for detailed visitor insights.
- **Customizable**: You can configure Web Analytics to track custom events and feature flag usage to get a better understanding of how your visitors are using your website.

## Visitors

The **Visitors** tab displays all your website's unique visitors within a selected timeframe. You can adjust the timeframe by
selecting a value from the dropdown in the top right hand corner.

You can use the [panels](#panels) section to view a breakdown of specific information, organized by the total number of visitors.

### How visitors are determined

Instead of relying on cookies like many analytics products, visitors are identified by a hash created from the incoming request. Using a generated hash provides a privacy-friendly experience for your visitors and means visitors can't be tracked between different days or different websites.

The generated hash is valid for a single day, at which point it is automatically reset.

If a visitor loads your website for the first time, we immediately track this visit as a page view. Subsequent page views are tracked through the native browser API.

## Page views

The **Page Views** tab, like the **Visitors** tab, shows a breakdown of every page loaded on your website during a certain time period.
Vercel counts page views by the **total number of views** on a page. For page views, the same visitor can view the same page multiple times resulting in multiple events.

You can use the [panels](#panels) section to view a breakdown of specific information, organized by the total number of page views.

## Bounce rate

The **Bounce rate** is the percentage of visitors who land on a page and leave without taking any further action.

The higher the bounce rate, the less engaging the page is.

### How bounce rate is calculated

> **💡 Note:** Bounce Rate (%) = (Single-Page Sessions / Total Sessions) × 100

Web Analytics defines a session as a group or page views by the same visitor. Custom events don't count towards the bounce rate.

For that reason, when filtering the dashboard for a given custom event, the bounce rate will always be 0%.

## Panels

Panels provide a way to view detailed analytics for Visitors and Page Views, such as top pages and referrers. They'll also show additional information such as the country, OS, and device or browser of your visitors, and configured options such as [custom events](/docs/analytics/custom-events) and [feature flag](/docs/flags) usage.

By default, panels provide you with a list of top entries, categorized by the number of visitors. Depending on the panel, the information is displayed either as a number or percentage of the total visitors. You can click **View All** to see all the data:

![Image](https://vercel.com/front/docs/observability/panels-light-mode.png)

*Panels showing a breakdown of page view data.*

You can export up to 250 entries from the panel as a CSV file. See [Exporting data as CSV](/docs/analytics/using-web-analytics#exporting-data-as-csv) for more information.

## Bots

Web Analytics doesn't count traffic that comes from automated processes or accounts. Vercel determines this by inspecting the [User Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) header for incoming requests.


---

[View full sitemap](/docs/sitemap)
