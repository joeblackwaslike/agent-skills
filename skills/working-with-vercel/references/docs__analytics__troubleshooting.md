---
title: Vercel Web Analytics Troubleshooting
product: vercel
url: /docs/analytics/troubleshooting
canonical_url: "https://vercel.com/docs/analytics/troubleshooting"
last_updated: 2026-06-26
type: reference
prerequisites:
  - /docs/analytics
related:
  - /docs/analytics/quickstart
summary: Learn how to troubleshoot common issues with Vercel Web Analytics.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/troubleshooting.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b0c96aafd2a3385a82bda5ea7589c544c45ed706f768c6dfece20bc05cf7291c"
---

# Vercel Web Analytics Troubleshooting

## No data visible in Web Analytics dashboard


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics?from=related) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [Troubleshooting](https://vercel.com/docs/speed-insights/troubleshooting?from=related) — Learn about common issues and how to troubleshoot Vercel Speed Insights.
- [Privacy](https://vercel.com/docs/analytics/privacy-policy?from=related) — Learn how Vercel supports privacy and data compliance standards with Vercel Web Analytics.
- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Filtering](https://vercel.com/docs/analytics/filtering?from=related) — Learn how filters allow you to explore insights about your website's visitors.

Full cross-link map for this page: [/docs/analytics/troubleshooting.graph.md](/docs/analytics/troubleshooting.graph.md)
<!-- /docsgraph:related -->

**Issue**: If you are experiencing a situation where data is not visible in the analytics dashboard or a 404 error occurs while loading `script.js`, it could be due to deploying the tracking code before enabling Web Analytics.

**How to fix**:

1. Make sure that you have [enabled Analytics](/docs/analytics/quickstart#enable-web-analytics-in-vercel) in the dashboard.
2. Re-deploy your app to Vercel.
3. Promote your latest deployment to production. To do so, visit the project in your [dashboard](/dashboard), and open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar. From there, select the three dots to the right of the most recent deployment and select **Promote to Production**.

## Web Analytics is not working with a proxy (e.g., Cloudflare)

**Issue**: Web Analytics may not function when using a proxy, such as Cloudflare.

**How to fix**:

1. Check your proxy configuration to make sure that all desired pages are correctly proxied to the deployment.
2. Additionally, forward all requests to `/_vercel/insights/*` and `/<unique-path>` to the deployments so Web Analytics works through the proxy.

## Routes are not visible in Web Analytics dashboard

**Issue**: Not all data is visible in the Web Analytics dashboard

**How to fix**:

1. Verify that you are using the latest version of the `@vercel/analytics` package.
2. Make sure you are using the correct import statement.

```tsx
import { Analytics } from '@vercel/analytics/next'; // Next.js import
```

```tsx
import { Analytics } from '@vercel/analytics/react'; // Generic React import
```


---

[View full sitemap](/docs/sitemap)
