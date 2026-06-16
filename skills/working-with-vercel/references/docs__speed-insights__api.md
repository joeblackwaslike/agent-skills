---
title: Speed Insights Intake API
product: vercel
url: /docs/speed-insights/api
canonical_url: "https://vercel.com/docs/speed-insights/api"
last_updated: 2026-03-17
type: reference
prerequisites:
  []
related:
  - /docs/speed-insights/package
summary: Learn how to use Speed Insights in Vercel with any frontend framework or project through the Speed Insights intake API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/api.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "817bbeeb8f1a83d5f584fe27da57aeef2b9d485434c445f316c0762d87e9e7c0"
---

# Speed Insights Intake API

> **⚠️ Warning:** This API is deprecated. Use the
> [@vercel/speed-insights](/docs/speed-insights/package) framework agnostic
> package instead.

Vercel Speed Insights supports Next.js, Nuxt, and Gatsby with zero configuration through build plugins. You can use Speed Insights with any frontend framework or project through the Speed Insights API as shown below.

## Getting Started

To use the Speed Insights API, you'll need to retrieve the analytics ID for your Vercel project. This value is exposed during the build and can be accessed by `process.env.VERCEL_ANALYTICS_ID` inside Node.js.

Inside your framework or Node.js script, you can then use this value in the `body` of your request to the Vercel Speed Insights API.

> **💡 Note:** `vercel pull` does not pull
> `VERCEL_ANALYTICS_ID` as the Vercel Analytics ID
> environment variable is inlined during the build process. It is not part of your
> project Environment Variables, which can be pulled locally using Vercel CLI.

## Example

You can view an example of the following code implemented inside our [Create React App](https://github.com/vercel/vercel/tree/main/examples/create-react-app) and [SvelteKit](https://github.com/vercel/vercel/tree/main/examples/sveltekit) starters.

```javascript filename="vitals.js"
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in navigator['connection']
    ? navigator['connection']['effectiveType']
    : '';
}

function sendToAnalytics(metric, options) {
  const page = Object.entries(options.params).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path,
  );

  const body = {
    dsn: options.analyticsId, // qPgJqYH9LQX5o31Ormk8iWhCxZO
    id: metric.id, // v2-1653884975443-1839479248192
    page, // /blog/[slug]
    href: location.href, // https://{my-example-app-name-here}/blog/my-test
    event_name: metric.name, // TTFB
    value: metric.value.toString(), // 60.20000000298023
    speed: getConnectionSpeed(), // 4g
  };

  if (options.debug) {
    console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
}

export function webVitals(options) {
  try {
    getFID((metric) => sendToAnalytics(metric, options));
    getTTFB((metric) => sendToAnalytics(metric, options));
    getLCP((metric) => sendToAnalytics(metric, options));
    getCLS((metric) => sendToAnalytics(metric, options));
    getFCP((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    console.error('[Analytics]', err);
  }
}
```


---

[View full sitemap](/docs/sitemap)
