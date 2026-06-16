---
title: Vercel Web Analytics Troubleshooting
product: vercel
url: /docs/analytics/troubleshooting
canonical_url: "https://vercel.com/docs/analytics/troubleshooting"
last_updated: 2026-03-18
type: reference
prerequisites:
  - /docs/analytics
related:
  - /docs/analytics/quickstart
summary: Learn how to troubleshoot common issues with Vercel Web Analytics.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/troubleshooting.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "da0356fe57b454ca6352c92ac6b7d0e48b734a6ce12d94f34c6118812b734152"
---

# Vercel Web Analytics Troubleshooting

## No data visible in Web Analytics dashboard

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
