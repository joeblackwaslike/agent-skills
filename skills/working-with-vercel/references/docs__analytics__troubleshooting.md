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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/analytics/troubleshooting.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4230682493cf920a97dbfd1aca413537a6e77b827f704fab770d4df777a40052"
---

# Vercel Web Analytics Troubleshooting

## No data visible in Web Analytics dashboard

**Issue**: If you are experiencing a situation where data is not visible in the analytics dashboard or a 404 error occurs while loading `script.js`, it could be due to deploying the tracking code before enabling Web Analytics.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Web Analytics is now generally available](https://vercel.com/blog/vercel-web-analytics-is-now-generally-available)
- [Query Web Analytics from the Vercel CLI](https://vercel.com/changelog/query-web-analytics-from-the-vercel-cli)
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [Privacy and Compliance](https://vercel.com/docs/analytics/privacy-policy) — Learn how Vercel supports privacy and data compliance standards with Vercel Web Analytics.
- [Troubleshooting Vercel Speed Insights](https://vercel.com/docs/speed-insights/troubleshooting) — Learn about common issues and how to troubleshoot Vercel Speed Insights.
- [Filtering Analytics](https://vercel.com/docs/analytics/filtering) — Learn how filters allow you to explore insights about your website's visitors.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Web Analytics metrics from your terminal.

Full cross-link map for this page: [/docs/analytics/troubleshooting.graph.md](/docs/analytics/troubleshooting.graph.md)
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
