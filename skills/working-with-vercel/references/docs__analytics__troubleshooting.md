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
  - /docs/security/reverse-proxy
summary: Learn how to troubleshoot common issues with Vercel Web Analytics.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/troubleshooting.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "e063690410e80950070a99031c43ce25f1dcb84cdbfc96d2b862fba46be00ed7"
---

# Vercel Web Analytics Troubleshooting

## No data visible in Web Analytics dashboard

**Issue**: If you are experiencing a situation where data is not visible in the analytics dashboard or a 404 error occurs while loading `script.js`, it could be due to deploying the tracking code before enabling Web Analytics.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Web Analytics is now generally available](https://vercel.com/blog/vercel-web-analytics-is-now-generally-available?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related)
- [Query Web Analytics from the Vercel CLI](https://vercel.com/changelog/query-web-analytics-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related)
- [How to troubleshoot stale content returned from the Vercel CDN when using an external proxy or CDN](https://vercel.com/kb/guide/how-to-troubleshoot-stale-content-returned-from-the-edge-network-when-using-an-external-proxy-or-cdn?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how to diagnose and fix stale content issues when using external proxies or CDNs with Vercel. Understand troublesh
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [Web Analytics](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Vercel MCP tools for web analytics.
- [Troubleshooting Vercel Speed Insights](https://vercel.com/docs/speed-insights/troubleshooting?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn about common issues and how to troubleshoot Vercel Speed Insights.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Filtering Analytics](https://vercel.com/docs/analytics/filtering?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=related) — Learn how filters allow you to explore insights about your website's visitors.

Full cross-link map for this page: [/docs/analytics/troubleshooting.graph.md](/docs/analytics/troubleshooting.graph.md?from=related&source_path=%2Fdocs%2Fanalytics%2Ftroubleshooting&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**How to fix**:

1. Make sure that you have [enabled Analytics](/docs/analytics/quickstart#enable-web-analytics-in-vercel) in the dashboard.
2. Re-deploy your app to Vercel.
3. Promote your latest deployment to production. To do so, visit the project in your [dashboard](/dashboard), and open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar. From there, select the three dots to the right of the most recent deployment and select **Promote to Production**.

## Web Analytics behind a reverse proxy

We do not recommend placing a reverse proxy in front of Vercel. A proxy can affect IP-based data, including **country**. It can also affect visitor identification, which uses a hash created from the incoming request.

It can also prevent Web Analytics from receiving events if it does not forward the requests.

Point your domain directly to Vercel. If you must use a proxy, review the [reverse proxy guidance](/docs/security/reverse-proxy) for supported options and requirements. Make sure your proxy forwards all pages you want to track, plus requests to `/_vercel/insights/*` and `/<unique-path>/*`, to your Vercel deployment.

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
