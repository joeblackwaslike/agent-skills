---
title: Speed Insights Configuration with @vercel/speed-insights
product: vercel
url: /docs/speed-insights/package
canonical_url: "https://vercel.com/docs/speed-insights/package"
last_updated: 2026-03-18
type: reference
prerequisites:
  - /docs/speed-insights
related:
  - /docs/speed-insights/quickstart
  - /docs/speed-insights/privacy-policy
summary: Learn how to configure your application to capture and send web performance metrics to Vercel using the @vercel/speed-insights npm package.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/package.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "042a5c31ca9e1ed9c51964c6c44c9e990402ce4485c441b7e3a928694aefb46f"
---

# Speed Insights Configuration with @vercel/speed-insights

With the `@vercel/speed-insights` npm package, you're able to configure your application to capture and send web performance metrics to Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Optimize Next.js + Sitecore JSS](https://vercel.com/kb/guide/how-to-optimize-next.js-sitecore-jss?from=related) — This guide covers performance and usage considerations when building and deploying your Next.js and Sitecore JSS applica
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights?from=related) — Learn how to use Speed Insights to analyze your application's performance data.
- [Troubleshooting](https://vercel.com/docs/speed-insights/troubleshooting?from=related) — Learn about common issues and how to troubleshoot Vercel Speed Insights.
- [Limits and Pricing](https://vercel.com/docs/speed-insights/limits-and-pricing?from=related) — Learn about our limits and pricing when using Vercel Speed Insights. Different limitations are applied depending on your
- [Speed Insights](https://vercel.com/docs/drains/reference/speed-insights?from=related) — Learn about Speed Insights Drains - data formats and performance metrics configuration.

Full cross-link map for this page: [/docs/speed-insights/package.graph.md](/docs/speed-insights/package.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with Speed Insights, refer to our [Quickstart](/docs/speed-insights/quickstart) guide which will walk you through the process of setting up Speed Insights for your project.

## What's new in version 2.x

- `@vercel/speed-insights` is now distributed under the MIT license.
- It can use Vercel's [Resilient Intake](/docs/speed-insights/privacy-policy#resilient-intake) for script loading and data collection.
- For Nuxt applications: install with the new module system.

## `sampleRate`

> **💡 Note:** In prior versions of Speed Insights this was managed in the UI. This option is
> now managed through code with the package.

This parameter determines the percentage of events that are sent to the server. By default, all events are sent. Lowering this parameter allows for cost savings but may result in a decrease in the overall accuracy of the data being sent. For example, a `sampleRate` of `0.5` would mean that only 50% of the events will be sent to the server.

To learn more about how to configure the `sampleRate` option, see the [Sending a sample of events to Speed Insights](/kb/guide/sending-sample-to-speed-insights) recipe.

## `beforeSend`

With the `beforeSend` function, you can modify or filter out the event data before it's sent to Vercel. You can use this to redact sensitive data or to avoid sending certain events.

For instance, if you wish to ignore events from a specific URL or modify them, you can do so with this option.

```tsx
// Example usage of beforeSend
beforeSend: (data) => {
  if (data.url.includes('/sensitive-path')) {
    return null; // this will ignore the event
  }
  return data; // this will send the event as is
};
```

## `debug`

With the debug mode, you can view all Speed Insights events in the browser's console. This option is especially useful during development.

This option is **automatically enabled** if the `NODE_ENV` environment variable is available and either `development` or `test`.

You can manually disable it to prevent debug messages in your browsers console.

## `route`

Use the `route` option to specify the current dynamic route (such as `/blog/[slug]`). This is particularly beneficial when you need to aggregate performance metrics for similar routes.

This option is **automatically set** when using a framework specific import such as for Next.js, Nuxt, SvelteKit and Remix.

## `endpoint`

Use the `endpoint` option to report the collected metrics to a different URL than the default.

This is useful when deploying several projects under the same domain, as it allows you to keep each application isolated.

For example, when `yourdomain.com` is managed outside of Vercel:

1. "alice-app" is deployed under `yourdomain.com/alice/*` and the vercel alias is `alice-app.vercel.sh`
2. "bob-app" is deployed under `yourdomain.com/bob/*` and the vercel alias is `bob-app.vercel.sh`
3. You route `yourdomain.com/_vercel/*` to `alice-app.vercel.sh`

Both applications send their metrics to `alice-app.vercel.sh`. To restore the isolation, "bob-app" should use:

```tsx
<SpeedInsights endpoint="https://bob-app.vercel.sh/<unique-path>/vitals" />
```

## `scriptSrc`

The `scriptSrc` option allows you to load the Speed Insights script from a different URL than the default one.

```tsx
<SpeedInsights scriptSrc="https://bob-app.vercel.sh/<unique-path>/script.js" />
```

## Dynamic configuration

In version 2, Vercel passes default client options at build time with a JSON string under a `speedInsights` key:

```json
{
  "speedInsights": {
    "scriptSrc": "/<unique-path>/script.js",
    "endpoint": "/<unique-path>/vitals"
  }
}
```

Vercel configures this for you so you don't need to pass this dynamic configuration.

To change configured values, you can:

- Pass individual properties (for example, `scriptSrc`, `endpoint`) to your React or Vue `<SpeedInsights />` component.
- Pass individual properties to the `injectSpeedInsights()` function.
- Provide your own value for the `VERCEL_OBSERVABILITY_CLIENT_CONFIG` build configuration variable.


---

[View full sitemap](/docs/sitemap)
