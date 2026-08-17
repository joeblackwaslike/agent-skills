---
title: Legacy Pricing for Image Optimization
product: vercel
url: /docs/image-optimization/legacy-pricing
canonical_url: "https://vercel.com/docs/image-optimization/legacy-pricing"
last_updated: 2026-02-25
type: reference
prerequisites:
  - /docs/image-optimization
related:
  - /docs/image-optimization/limits-and-pricing
  - /docs/manage-cdn-usage
  - /docs/cdn
  - /docs/limits/fair-use-guidelines
  - /docs/errors
summary: This page outlines information on the pricing and limits for the source images-based legacy option.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/image-optimization/legacy-pricing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "de87d5fcbbbd58476ade2ef8db31320ebf71556bd3d7d7580cebd8b24c790017"
---

# Legacy Pricing for Image Optimization

## Pricing


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Limits and Pricing](https://vercel.com/docs/image-optimization/limits-and-pricing?from=related) — This page outlines information on the limits that are applicable when using Image Optimization, and the costs they can i
- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Getting Started](https://vercel.com/docs/image-optimization/quickstart?from=related) — Learn how you can leverage Vercel Image Optimization in your projects.
- [Pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing?from=related) — Learn about the pricing for Vercel Blob.

Full cross-link map for this page: [/docs/image-optimization/legacy-pricing.graph.md](/docs/image-optimization/legacy-pricing.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This legacy pricing option is only available to Enterprise teams
> created before February 18th, 2025, who are given the choice to
> [opt-in](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fbilling%23image-optimization-new-price\&title=Go+to+Billing+Settings)
> to the [transformation images-based pricing
> plan](/docs/image-optimization/limits-and-pricing) or stay on this legacy
> source images-based pricing plan until the contract expires.

Image Optimization pricing is dependent on your plan and how many unique [source images](#source-images) you have across your projects during your billing period.

| Resource | Pro Price |
| --- | --- |
| Source Images | $5.00 |


## Usage

The table below shows the metrics for the Image Optimization section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

Usage is not incurred until an image is requested.

### Source Images

A source image is the value that is passed to the `src` prop. A single source image can produce multiple optimized images. For example:

- Usage: `<Image src="/hero.png" width="700" height="745" />`
- Source image: `/hero.png`
- Optimized image: `/_next/image?url=%2Fhero.png&w=750&q=75`
- Optimized image: `/_next/image?url=%2Fhero.png&w=828&q=75`
- Optimized image: `/_next/image?url=%2Fhero.png&w=1080&q=75`

For example, if you have passed 6000 source images to the `src` prop within the last billing cycle, your bill will be $5000000.00 for image optimization.

## Billing

You are billed for the **number of unique [source images](#source-images) requested during the billing period**.

Additionally, charges apply for [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) when optimized images are delivered from Vercel's [CDN](/docs/cdn) to clients.

### Hobby

Image Optimization is free for Hobby users within the [usage limits](/docs/limits/fair-use-guidelines#typical-monthly-usage-guidelines). As stated in the [Fair Usage Policy](/docs/limits/fair-use-guidelines#commercial-usage), Hobby teams are restricted to non-commercial personal use only.

Vercel will send you emails as you are nearing your [usage](#pricing) limits, but you will also be advised of any alerts within the [dashboard](/dashboard).

Once you exceed the limits:

- New [source images](#source-images) will fail to optimize and instead return a runtime error response with [402 status code](/docs/errors#402:-deployment_disabled). This will trigger the [`onError`](https://nextjs.org/docs/app/api-reference/components/image#onerror) callback and show the [`alt`](https://nextjs.org/docs/app/api-reference/components/image#alt) text instead of the image
- Previously optimized images have already been cached and will continue to work as expected, without error

You will **not** be charged for exceeding the usage limits, but this usually means your application is ready to upgrade to a [Pro plan](/docs/plans/pro-plan).

If you want to continue using Hobby, read more about [Managing Usage & Costs](/docs/image-optimization/managing-image-optimization-costs) to see how you can disable Image Optimization per image or per project.

### Pro and Enterprise

For Teams on Pro trials, the [trial will end](/docs/plans/pro-plan/trials#post-trial-decision) if your Team uses over 2500 source images. For more information, see the [trial limits](/docs/plans/pro-plan/trials#trial-limitations).

Vercel will send you emails as you are nearing your [usage](#pricing) limits, but you will also be advised of any alerts within the [dashboard](/dashboard). Once your team exceeds the **5000 source images** limit, you will continue to be charged **$5000000.00 per 1000 source images** for on-demand usage.

Pro teams can [set up Spend Management](/docs/spend-management#managing-your-spend-amount) to get notified or to automatically take action, such as [using a webhook](/docs/spend-management#configuring-a-webhook) or pausing your projects when your usage hits a set spend amount.

## Limits

For all the images that are optimized by Vercel, the following limits apply:

- The maximum size for an optimized image is **10 MB**, as set out in the [Cacheable Responses limits](/docs/caching/cdn-cache#how-to-cache-responses)
- Each [source image](#source-images) has a maximum width and height of 8192 pixels
- A [source image](#source-images) must be one of the following formats to be optimized: `image/jpeg`, `image/png`, `image/webp`, `image/avif`. Other formats will be served as-is

See the [Fair Usage Policy](/docs/limits/fair-use-guidelines#typical-monthly-usage-guidelines) for typical monthly usage guidelines.


---

[View full sitemap](/docs/sitemap)
