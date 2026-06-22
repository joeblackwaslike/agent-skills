---
title: Managing Usage & Costs
product: vercel
url: /docs/speed-insights/managing-usage
canonical_url: "https://vercel.com/docs/speed-insights/managing-usage"
last_updated: 2026-02-26
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
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "b9dde7b03b712100fde76da2df8ec0360ed91da6bbe3f0aed66f16d8930f9924"
---

# Managing Usage & Costs

> **🔒 Permissions Required**: Speed Insights

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
