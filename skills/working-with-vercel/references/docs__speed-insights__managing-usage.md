---
title: Managing Usage & Costs
product: vercel
url: /docs/speed-insights/managing-usage
canonical_url: "https://vercel.com/docs/speed-insights/managing-usage"
last_updated: 2026-06-16
type: reference
prerequisites:
  - /docs/speed-insights
related:
  - /docs/speed-insights/metrics
  - /docs/speed-insights/package
  - /docs/speed-insights/migrating-from-legacy
  - /docs/speed-insights/limits-and-pricing
summary: Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/managing-usage.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5c76186ac4a20532d725b59489207699f4c070759d799fa5d0a99fff3d8c022b"
---

# Managing Usage & Costs

> **🔒 Permissions Required**: Speed Insights


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage & Optimize](https://vercel.com/docs/manage-and-optimize-observability?from=related) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights?from=related) — Learn how to use Speed Insights to analyze your application's performance data.
- [Privacy](https://vercel.com/docs/speed-insights/privacy-policy?from=related) — Learn how Vercel follows the latest privacy and data compliance standards with its Speed Insights feature.
- [Getting Started](https://vercel.com/docs/speed-insights/quickstart?from=related) — Vercel Speed Insights provides you detailed insights into your website's performance. This quickstart guide will help yo

Full cross-link map for this page: [/docs/speed-insights/managing-usage.graph.md](/docs/speed-insights/managing-usage.graph.md)
<!-- /docsgraph:related -->

Use the [`@vercel/speed-insights`](https://www.npmjs.com/package/@vercel/speed-insights) package to measure and reduce your Speed Insights usage.

## Understanding usage

The **Speed Insights** section of [Usage](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fusage%23speed-insights\&title=Go%20to%20Usage) in your dashboard sidebar shows your Speed Insights usage over time.

Vercel bills Speed Insights usage in events. To learn more about the underlying data points and how Vercel calculates them, see [Understanding data points](/docs/speed-insights/metrics#understanding-data-points).

## Reducing usage

To reduce the number of events collected, you can configure the `@vercel/speed-insights` package with the following options. First, install the package if you haven't already:

```bash
npm i @vercel/speed-insights
```

Then configure one or both of the following options:

### Adjusting `sampleRate`

The [`sampleRate`](/docs/speed-insights/package#samplerate) option determines the percentage of events sent to Vercel. By default, all events are sent. Lowering this value reduces the number of events collected, which can lower costs while still providing statistically meaningful performance data.

For example, setting `sampleRate` to `0.5` sends performance metrics for 50% of page views:

> **💡 Note:** Lower sample rates reduce costs but may decrease data accuracy for low-traffic pages.

### Filtering pages with `beforeSend`

The [`beforeSend`](/docs/speed-insights/package#beforesend) option lets you filter or modify events before they reach Vercel. You can use this to exclude specific pages from tracking, which reduces the total number of events collected.

Common use cases include:

- Excluding internal or admin pages that don't need performance monitoring
- Excluding pages that aren't user-facing

#### Excluding specific pages

To exclude events from specific paths, return `null` from the `beforeSend` function:

```tsx
<SpeedInsights
  beforeSend={(data) => {
    // Exclude admin pages
    if (data.url.includes('/admin')) {
      return null;
    }
    // Exclude internal tools
    if (data.url.includes('/internal')) {
      return null;
    }
    return data;
  }}
/>
```

#### Including only specific pages

If you want to track only certain pages, you can invert the logic to create an allowlist:

```tsx
<SpeedInsights
  beforeSend={(data) => {
    // Only track the homepage and product pages
    const allowedPaths = ['/', '/products', '/pricing'];
    const currentPath = new URL(data.url).pathname;

    if (allowedPaths.some((path) => currentPath.startsWith(path))) {
      return data;
    }
    return null;
  }}
/>
```

#### Combining `sampleRate` and `beforeSend`

For maximum cost control, you can combine both options. The `sampleRate` determines at page load whether to collect vitals, then `beforeSend` filters events before sending:

```tsx
<SpeedInsights
  sampleRate={0.5}
  beforeSend={(data) => {
    // Exclude admin pages entirely
    if (data.url.includes('/admin')) {
      return null;
    }
    // Of the 50% of page views sampled, admin pages will be excluded
    return data;
  }}
/>
```

## More resources

- [@vercel/speed-insights configuration](/docs/speed-insights/package)
- [Migrating from legacy Speed Insights](/docs/speed-insights/migrating-from-legacy)
- [Limits and pricing](/docs/speed-insights/limits-and-pricing)
- [Understanding data points](/docs/speed-insights/metrics#understanding-data-points)


---

[View full sitemap](/docs/sitemap)
