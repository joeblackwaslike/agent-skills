---
title: Managing Usage & Costs
product: vercel
url: /docs/image-optimization/managing-image-optimization-costs
canonical_url: "https://vercel.com/docs/image-optimization/managing-image-optimization-costs"
last_updated: 2026-02-26
type: reference
prerequisites:
  - /docs/image-optimization
related:
  - /docs/image-optimization/legacy-pricing
summary: Learn how to measure and manage Image Optimization usage with this guide to avoid any unexpected costs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/image-optimization/managing-image-optimization-costs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "63c3aab0326370153bd92244649e67c20176d1262f303f7790ef3d43ee84896e"
---

# Managing Usage & Costs

## Measuring usage


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Limits and Pricing](https://vercel.com/docs/image-optimization/limits-and-pricing?from=related) — This page outlines information on the limits that are applicable when using Image Optimization, and the costs they can i
- [How to reduce ISR revalidation costs](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs?from=related) — Reduce ISR costs by analyzing Incremental Static Regeneration \(ISR\) behavior to find pages and tags that revalidate to
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Pricing & Usage](https://vercel.com/docs/manage-cdn-usage?from=related) — Understand CDN pricing resources, monitor usage from your dashboard, and optimize Fast Data Transfer, Fast Origin Transf
- [Getting Started](https://vercel.com/docs/image-optimization/quickstart?from=related) — Learn how you can leverage Vercel Image Optimization in your projects.

Full cross-link map for this page: [/docs/image-optimization/managing-image-optimization-costs.graph.md](/docs/image-optimization/managing-image-optimization-costs.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This document describes usage for the default pricing option.
> Enterprise teams created before February 18th, 2025 have the choice to
> [opt-in](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fbilling%23image-optimization-new-price\&title=Go+to+Billing+Settings)
> to this pricing plan or stay on the [legacy source images-based pricing plan](/docs/image-optimization/legacy-pricing)
> until the contract expires.

Your Image Optimization usage over time is displayed under the **Image Optimization** section of the [Usage](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fusage%23image-optimization-image-transformations\&title=Go%20to%20Usage) section in the sidebar on your dashboard.

You can also view detailed information in the **Image Optimization** section of the [Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fobservability%2Fimage-optimization\&title=Go%20to%20Observability) section in the sidebar on your dashboard.

## Reducing usage

To help you minimize Image Optimization usage costs, consider implementing the following suggestions:

- **Cache Max Age**: If your images do not change in less than a month, set `max-age=2678400` (31 days) in the `Cache-Control` header or set [`images.minimumCacheTTL`](https://nextjs.org/docs/app/api-reference/components/image#minimumcachettl) to `minimumCacheTTL:2678400` to reduce the number of transformations and cache writes. Using static imports can also help as they set the `Cache-Control` header to 1 year.

- **Formats**: Check if your Next.js configuration is using [`images.formats`](https://nextjs.org/docs/app/api-reference/components/image#formats) with multiple values and consider removing one. For example, change `['image/avif', 'image/web']` to `['image/webp']` to reduce the number of transformations.

- **Remote and local patterns**: Configure [`images.remotePatterns`](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns) and [`images.localPatterns`](https://nextjs.org/docs/app/api-reference/components/image#localpatterns) allowlist which images should be optimized so that you can limit unnecessary transformations and cache writes.

- **Qualities**: Configure the [`images.qualities`](https://nextjs.org/docs/app/api-reference/components/image#qualities) allowlist to reduce possible transformations. Lowering the quality will make the transformed image smaller resulting in fewer cache reads, cache writes, and fast data transfer.

- **Image sizes**: Configure the [`images.imageSizes`](https://nextjs.org/docs/app/api-reference/components/image#imagesizes) and [`images.deviceSizes`](https://nextjs.org/docs/app/api-reference/components/image#devicesizes) allowlists to match your audience and reduce the number of transformations and cache writes.

- **Unoptimized**: For source images that do not benefit from optimization such as small images (under 10 KB), vector images (SVG) and animated images (GIF), use the [`unoptimized` property](https://nextjs.org/docs/app/api-reference/components/image#unoptimized) on the Image component to avoid transformations, cache reads, and cache writes. Use sparingly since `unoptimized` on every image could increase fast data transfer cost.


---

[View full sitemap](/docs/sitemap)
